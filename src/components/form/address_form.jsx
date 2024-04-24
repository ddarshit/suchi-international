import React, { useState, useEffect } from "react";
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
  Box,
  InputLabel,
} from "@mui/material";
import { getState, getCities } from "../../services/handlers/get_dropdowns";
import { toast } from "react-toastify";


const AddressForm = (props) => {
  const [states, setStates] = useState([]);

  const [cities, setCities] = useState([]);

  const [formValues, setFormValues] = useState({
    address_line_one: props.data?.address_line_one ?? "",
    address_line_two: props.data?.address_line_two ?? "",
    address_line_three: props.data?.address_line_three ?? "",
    city_id: props.data?.city_id ?? "",
    state_id: props.data?.state_id ?? "",
    state_code: props.data?.state_code ?? "",
  });

  // const [st, setSt] = useState("");
  // const [ct, setCt] = useState("");
  // const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const data = await getState();
        setStates(data);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStates(); 
  }, []);

  useEffect(()=>{
    const fetchCities = async () => {
      try {
        const data = await getCities(formValues.state_id);
        setCities(data);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if(formValues.state_id !== ""){
      fetchCities();
    } else {
      setCities([]);
    }
  }, [formValues.state_id]);

  const handleChange = (e) => {
    const chandeForm = {
      ...formValues,
      [e.target.name]: e.target.value,
    };

    setFormValues(chandeForm);

    props.handleChange(props.field, chandeForm);
    
  };

  const handleClick = () => {
    if(formValues.state_id === ""){
      toast.warning("Please select State first")
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    // You can perform additional actions like sending the form data to the server
  };
console.log(props,"props")
  return (
    <Box sx={{ ml: 2, mt: 2, gridColumn: "span 2" }}>
      <span className="font-semibold text-2xl underline underline-offset-2 decoration-2 decoration-suchi">{props.name} :</span>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          // gridAutoColumns: '1fr',
        }}
      >
        <Box>
          <TextField
            label="Address Line 1..."
            name="address_line_one"
            value={formValues.address_line_one}
            onChange={handleChange}
            fullWidth
            margin="normal"
            inputProps={{
              readOnly: props.readonly,
            }}
            required
          />
          <TextField
            label="Address Line 2..."
            name="address_line_two"
            value={formValues.address_line_two}
            onChange={handleChange}
            fullWidth
            margin="normal"
            inputProps={{
              readOnly: props.readonly,
            }}
            required={props.required}
          />
          <TextField
            label="Address Line 3..."
            name="address_line_three"
            value={formValues.address_line_three}
            onChange={handleChange}
            fullWidth
            margin="normal"
            inputProps={{
              readOnly: props.readonly,
            }}
            required={props.required}
          />
        </Box>

        <Box>
          <FormControl fullWidth  margin="normal">
            <InputLabel id="demo-simple-select-label">State</InputLabel>
            <Select
              label="State"
              name="state_id"
              value={states.length>0 ?  formValues.state_id : ""}
              fullWidth
              inputProps={{
                readOnly: props.readonly,
              }}
              onChange={handleChange}
              required            >
              
              {
                states && states.map(e => <MenuItem key={e.id} value={e.id}>{e.state_name}</MenuItem>)
              }
            </Select>
          </FormControl>

          <FormControl fullWidth  margin="normal">
            <InputLabel id="demo-simple-select-label">City</InputLabel>
            <Select
              label="City"
              name="city_id"
              value={cities.length >0 ?  formValues.city_id : ""}
              fullWidth
              inputProps={{
                readOnly: props.readonly,
              }}
              onOpen={handleClick}
              onChange={handleChange}
              required
            >
              {cities.map(e => <MenuItem key={e.id} value={e.id}>{e.city_name}</MenuItem>)}
              {/* {
                isSelected && cities.map((city) => {
                  return <MenuItem value={city}>{city}</MenuItem>
                })
              } */}

            </Select>
          </FormControl>

          <TextField
            label="State Code"
            name="state_code"
            type="number"
            value={formValues.state_code}
            onChange={handleChange}
            fullWidth
            margin="normal"
            inputProps={{
              readOnly: props.readonly,
            }}
            required={props.required}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AddressForm;
