import React, { useState, useRef, useEffect } from "react";
import {
  Typography,
  MenuItem,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import styled from "@mui/system/styled";
import { v4 as uuid } from "uuid";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FormProvider from "../../components/hook-form/FormProvider";
import RHFSelect from "../../components/hook-form/RHFSelect";
import RHFTextField from "../../components/hook-form/RHFTextField";
import { Edit } from "@mui/icons-material";
import { chnageStage, getStages, getSubStages } from "../../services/handlers/get_masters";
import { toast } from "react-toastify";

const defaultValues = {stage:'',subStage:'',product:''};
const changeStage = Yup.object().shape({
  rowMaterial: Yup.string().trim().required("Required"),
  machine: Yup.string().trim().required("Required"),
  employee: Yup.string().trim().required("Required"),
});
const BorderBox = styled(Box)({
  color: "darkslategray",
  // backgroundColor: 'aliceblue',
  padding: 8,
  borderRadius: 4,
  marginTop: 25,
  border: "solid black 1px",
});

const ChangeStage = () => {
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [stage,setSage]=useState([])
  const [subStage,setSubSage]=useState([])

  const [rowMaterial,setRowMaterial]=useState([])
  const [employee,setEmployee]=useState([])
  const [machine,setMachine]=useState([])
  const methods = useForm({
    resolver: yupResolver(changeStage),
    defaultValues,
  });
  const {

    getValues,
    setValue,
    handleSubmit,
  } = methods;

  const onSubmit = (data) => console.log(data);

  const handleTableSubmit = () => {
    if (
      getValues("product") &&
      getValues("qty") &&
      getValues("stage") &&
      getValues("subStage")
    ) {
      const { employee, machine, rowMaterial, ...productDetail } = getValues();
      const newData = [...selectedProduct, productDetail];
      setSelectedProduct(newData);
      setValue("product", "");
      setValue("qty", "");
      setValue("stage", "");
      setValue("subStage", "");
    }
  };

  const fetchStage=async()=>{
    try{
      const response = await getStages();
      setSage(response)

    }catch(error){
      toast.error("Failed to fetch stage data")
    }
  }
  const fetchSubStage=async(id)=>{
    try{
      const response = await getSubStages();
      setSubSage(response)
     console.log(response,'substage')
    }catch(error){
      toast.error("Failed to fetch stage data")
    }
  }
  useEffect(()=>{
    fetchStage()
    fetchSubStage()
    chnageStage().then(({data})=>{
      console.log(data)
      setMachine(data[2].machine)
      setEmployee(data[1].employees)
      setRowMaterial(data[0].raw_material)
    })
  },[])



  return (
    <div style={{ marginTop: 14 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h5" component="h1">
          change stage
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={4} mt={0}>
            <Grid item xs={4}>
              <RHFSelect
                name="rowMaterial"
                label="Select Row Material"
                required
              >
                <MenuItem value=''>Select an option</MenuItem>
                {rowMaterial?.map((el,index)=>(
                  <MenuItem value={el.id} key={index}>{el.raw_material_name}</MenuItem>
                ))}
                
              </RHFSelect>
            </Grid>
            <Grid item xs={4}>
              <RHFSelect name="employee" label="Select Employee" required>
                <MenuItem value={""}>Select Emp</MenuItem>
                {employee?.map((el,index)=>(
                  <MenuItem value={el.id} key={index}>{el.employee_name}</MenuItem>
                ))}
                
              </RHFSelect>
            </Grid>
            <Grid item xs={4}>
              <RHFSelect name="machine" label="Select Machine" required>
                <MenuItem value={""}>Select Emp</MenuItem>
                {machine?.map((el,index)=>(
                  <MenuItem value={el.id} key={index}>{el.machine_name}</MenuItem>
                ))}
              </RHFSelect>
            </Grid>
          </Grid>
        </Box>

        {/* Border container in react for changes*/}
        <BorderBox sx={{ flexGrow: 1, marginBottom: 5 }}>
          <Grid container spacing={4} mt={0} sx={{ alignItems: "flex-end" }}>
            <Grid item md={4}>
              <RHFSelect name="product" label="Select product" required>
                <MenuItem value="Select product">Select Product</MenuItem>
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Milk Pot 6 Onz">Milk Pot 6 Onz</MenuItem>
                <MenuItem value="Milk Pot 125 ml">Milk Pot 125 ml</MenuItem>
              </RHFSelect>
            </Grid>
            <Grid item md={4}>
              <RHFTextField
                name="qty"
                label="Quantity"
                placeholder="Quantity"
              />
            </Grid>
            <Grid item md={4}>
              <RHFSelect name="stage" label="Select Stage" required >
                {stage?.map((el,index)=>(  
                <MenuItem value={el?.id} key={index}>{el?.stage_name}</MenuItem>
                ))}
      
              </RHFSelect>
            </Grid>
            <Grid item md={4}>
              <RHFSelect name="subStage" label="Select Sub stage" required>
                {subStage?.map((el,index)=>(
                  <MenuItem value={el?.id} key={index}>{el?.sub_stage_name}</MenuItem>

                ))}
                
                
              </RHFSelect>
            </Grid>

            <Grid item md={5} />
            <Grid item md={3}>
              <Button
                variant="contained"
                size="large"
                onClick={handleTableSubmit}
                fullWidth
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </BorderBox>

        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          mt={2}
        >
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Sr.No</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Stage</TableCell>
                  <TableCell>Sub-Stage</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedProduct.map((el, index) => (
                  <TableRow>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{el.product}</TableCell>
                    <TableCell>{el.qty}</TableCell>
                    <TableCell>{stage.find((item)=>item.id===+el.stage)?.stage_name || '-' }</TableCell>
                    <TableCell>{subStage.find((item)=>item.id=== +el.subStage)?.sub_stage_name|| '-' }</TableCell>
                    <TableCell>
                      <IconButton size="small" color="info">
                        <Edit />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          mt={2}
        >
          <Button
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            size="large"
            type="submit"
          >
            Save
          </Button>
        </Grid>
      </FormProvider>
    </div>
  );
};

export default ChangeStage;
