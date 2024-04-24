import React, { useState, useRef, useEffect } from "react";
import {

  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormControl,

  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { ChangeStageTable } from "./change_table";
import { v4 as uuid } from "uuid";
import { getCategory } from "../../services/handlers/get_dropdowns";
import { Close } from "@mui/icons-material";





const cols = [
  "Dimension",
  "value",
  "Dimension Unit",

]

const AddInventory = ({onClose}) => {

  const [inventoryData, setInventoryData] = useState({
    "material": undefined,
    "name": undefined,
    "stage": [],
    "supplier": undefined,
    "tax": "",
    "quantity": "",
    "weight": "",
    "subStage": [],
    "dQuantity": "",

  })

  const [tableItem, setTableItem] = useState({
    "dimension": undefined,
    "value": "",
    "dimension_unit": undefined,
    "id": uuid(),
  });

  const [category, setCategory] = useState([]);


  useEffect(() => {
    getCategory().then(value => {
      setCategory(value);
      console.log("effect data", value);
    });



  }, []);



  const addInventoryDetails = (e) => {
    setInventoryData({ ...inventoryData, [e.target.name]: e.target.value })
    console.log(inventoryData)



  }

  const addTableItem = (e) => {
    setTableItem({ ...tableItem, [e.target.name]: e.target.value });
    // console.log(tableItem);
  }

  const addStages = (e) => {

    const data = inventoryData.stage;
    data.push(e.target.value);
    setInventoryData({ ...inventoryData, stage: data });
    console.log(data)

  }

  const addSubStages = (e) => {

    const data = inventoryData.subStage;
    data.push(e.target.value);
    setInventoryData({ ...inventoryData, subStage: data });


  }

  const tableRef = useRef();

  const handleStageDelete = (stageIndexToDelete) => {
    setInventoryData((prevState) => {
      const updatedStage = [...prevState.stage];
      updatedStage.splice(stageIndexToDelete, 1);

      return {
        ...prevState,
        stage: updatedStage,
      };
    });
  };

  const handleSubStageDelete = (stageIndexToDelete) => {
    setInventoryData((prevState) => {
      const updatedStage = [...prevState.subStage];
      updatedStage.splice(stageIndexToDelete, 1);

      return {
        ...prevState,
        subStage: updatedStage,
      };
    });
  };

  const handleTableData = () => {
    tableRef.current.addData(tableItem);
    setTableItem({
      "value": "",
      "dimension_unit": undefined,
      "dimension": undefined,

      "id": uuid(),
    })

  }
  return (
    <Dialog
    open={true}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    fullScreen
  >
   <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
        
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Add Inventory Item
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={onClose}
              aria-label="close"
            >
              <Close />
            </IconButton>
          </Toolbar>
        </AppBar>
    <DialogContent>
    <div className="my-8">
      {/* <Typography variant="h6" mt={2} >
        Add Inventory Item
      </Typography> */}

      <span className="font-bold text-3xl underline underline-offset-2 decoration-2 decoration-[#673ab7]">
        Add Inventory Item
      </span>

      <Grid container spacing={4} mt={0}>
        <Grid item xs={4}>
          <InputLabel id="select_raw_material">
            Select Raw Material <span style={{ color: "red" }}>*</span>
          </InputLabel>
          <Select name="material" fullWidth value={inventoryData.material ?? 1} onChange={addInventoryDetails}>
            <MenuItem value={10}>Soil</MenuItem>
            <MenuItem value={1} style={{ display: "none" }}>Select Raw Material</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={4}>
          <InputLabel id="select_raw_category">
            Select Raw Material Category <span style={{ color: "red" }}>*</span>
          </InputLabel>
          <Select name="name" fullWidth value={inventoryData.name ?? -1} onChange={addInventoryDetails}>
            {category.map(e => <MenuItem key={e.id} value={e.id}>{e.value}</MenuItem>)}

            <MenuItem value={-1} style={{ display: "none" }}>Select Raw Material Category</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={4}>
          <InputLabel id="select stage">
            Select Stage
          </InputLabel>
          <Select fullWidth value={1} onChange={addStages} name="stage">
            <MenuItem value={10}>Stage 1</MenuItem>
            <MenuItem value={30}>Stage 2</MenuItem>
            <MenuItem value={1} sx={{ display: "none" }}>Select Stage</MenuItem>

          </Select>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={4}
        mt={0}
        sx={{ alignItems: "flex-end" }}
      >
        <Grid item xs={4}>
          <InputLabel id="select_supplier">
            Select Supplier <span style={{ color: "red" }}>*</span>
          </InputLabel>
          <Select fullWidth value={inventoryData.supplier ?? 1} onChange={addInventoryDetails} name="supplier">
            <MenuItem value="Supplier 1">Supplier 1</MenuItem>
            <MenuItem value={1} style={{ display: "none" }}>Select Raw Material Category</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <TextField
              fullWidth
              type="number"
              label="select Tax Percentage"
              name="tax"
              value={inventoryData.tax}
              onChange={addInventoryDetails}
            ></TextField>
          </FormControl>
        </Grid>

        <Grid item md={4}>
          <Box>

            <InputLabel id="select sub stage">
              Select Sub Stage
            </InputLabel>
            <Select fullWidth value={1} onChange={addSubStages} name="subStage">
              <MenuItem value={10}>Sub Stage 1</MenuItem>
              <MenuItem value={20}>Sub Stage 2</MenuItem>
              <MenuItem value={1} sx={{ display: "none" }}>Select Sub Stage </MenuItem>
            </Select>

            {inventoryData.subStage.map((e, index) => <Chip label={e} key={index} onDelete={() => handleSubStageDelete(index)} sx={{ mt: 2 }} />)}

          </Box>

        </Grid>
        
        <Grid item xs={4} maxHeight={120} sx={{ overflowY: 'auto' }}>

          {inventoryData.stage.map((e, index) => <Chip label={e} key={index} onDelete={() => handleStageDelete(index)} sx={{ mt: 2 }} />)}

        </Grid>
      </Grid>
      <Box sx={{ flextGrow: 1 }}>
        <Grid item container spacing={4} md={10} mt={0}>
          <Grid item md={4}>
            <Box
              sx={{
                borderRadius: 2,
                border: "solid black 1px",
                backgroundColor: 'accentblue',
                padding: 1,
              }}
            >

              <FormControl fullWidth >
                <TextField
                  fullWidth
                  type="number"
                  label="Quantity"
                  name="quantity"
                  value={inventoryData.quantity}
                  onChange={addInventoryDetails}
                ></TextField>
              </FormControl>

              <FormControl fullWidth sx={{ marginTop: 3 }}>
                <TextField
                  fullWidth
                  type="number"
                  label="Weight"
                  name="weight"
                  value={inventoryData.weight}
                  onChange={addInventoryDetails}

                ></TextField>
              </FormControl>

            </Box>
          </Grid>

          <Grid item md={4} xs={12}>
            <FormControl fullWidth>
              <TextField
                fullWidth
                type="number"
                label="Defective Quantity"
                name="dQuantity"
                value={inventoryData.dQuantity}
                onChange={addInventoryDetails}
              ></TextField>
            </FormControl>

          </Grid>


        </Grid>
      </Box>

      {/* <Typography variant="h6" sx={{ marginTop: 5 }}>
        Add Dimension
      </Typography> */}
      <p className="mt-10 text-3xl">
        <span className="font-bold underline underline-offset-2 decoration-2 decoration-[#673ab7]">
          Add Dimension
        </span>
      </p>

      <Grid container item spacing={4} md={10}>

        <Grid container item md={4} mt={2}>
          <Grid item xs={12} >
            <InputLabel id="select_dimension">
              Select Dimension
            </InputLabel>
            <Select fullWidth value={tableItem.dimension ?? 1} onChange={addTableItem} name="dimension">
              <MenuItem value={10}>Dimension</MenuItem>
              <MenuItem value={1}>Select Dimension</MenuItem>

            </Select>
          </Grid>
          <Grid item xs={12} mt={2}>

            <TextField
              fullWidth
              type="number"
              label="Value"
              name="value"
              value={tableItem.value}
              onChange={addTableItem}
            ></TextField>

          </Grid>
          <Grid item xs={12} mt={2}>
            <InputLabel id="select_dimension_unit">
              Select Dimension Unit
            </InputLabel>
            <Select fullWidth value={tableItem.dimension_unit ?? 1} name="dimension_unit" onChange={addTableItem}>
              <MenuItem value={10}>gms</MenuItem>
              <MenuItem value={1}>Select Dimension Unit</MenuItem>

            </Select>
          </Grid>
          <Grid item xs={12} mt={2}>
            <Button variant="contained" onClick={handleTableData} fullWidth mt={3} size="large" type="lg">Add Dimension</Button>
          </Grid>
        </Grid>
        <Grid item md={3} mt={3} ml={5}>
          <ChangeStageTable ref={tableRef} cols={cols} />
        </Grid>
      </Grid>
      {/* <Grid item container md={7.5} spacing={3} sx={{ justifyContent: "right", marginTop: '1px' }}>
        <Grid item md={3}>
          <Button variant="outlined" fullWidth mt={3} size="large" type="lg">Clear All</Button>
        </Grid>
        <Grid item md={3}>
          <Button variant="contained" fullWidth mt={3} size="large" type="lg">Save</Button>
        </Grid>
      </Grid> */}

    </div>
    </DialogContent>
        <DialogActions>
          
          <Button onClick={onClose} variant="outlined" size="large">
            Cancel
          </Button>
          <Button variant="contained" size="large" >Save</Button>
        </DialogActions>
      </Dialog>
  );
};

export default AddInventory;
