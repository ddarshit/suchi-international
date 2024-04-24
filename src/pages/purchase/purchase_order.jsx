import React, { useState, useRef } from "react";
import {
  Typography,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  FormControl,
  
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { ChangeStageTable } from "../dashboard/change_table";
import { v4 as uuid } from 'uuid';

const cols=[
    "Product Alias",
    "HSN",
    "Value Qty",
    "Price"
  ]



const AddPurchaseOrder = () => {

  const [order,setOrder]= useState({
    "invoiceNo":"",
    "poDate":"",
    "poNumber":"",
    "client":undefined,
    "company":undefined,
    "amount_before_gst":"",
    "sgst":"",
    "cgst":"",
    "total_amount":"",
    "amount_in_words":"",
    
  })

  const addOrderDetails= (e)=> {
    setOrder({...order,[e.target.name]:e.target.value})
    
  }

  const [tableItem,setTableItem]= useState({
    "product_alias":undefined,
    "select_hsn":undefined,
    "quantity":"",
    "price":"",
    "id":uuid(),
  })

  const addTableItem=(e) => {
    setTableItem({...tableItem,[e.target.name]:e.target.value});
    console.log(tableItem);
  }

  const updateTable= () => {
    tableRef.current.addData(tableItem);
    setTableItem({
      "product_alias":undefined,
      "select_hsn":undefined,
      "quantity":"",
      "price":"",
      "id":uuid(),
    })
  }
  
    const tableRef= useRef();
 
  return (
    <React.Fragment>
      <Typography variant="h6" component="h7" mt={2}>
        Add New Purchase Order
      </Typography>

      <Grid container md={10} item columnSpacing={4} rowSpacing={2} mt={0} alignItems="flex-end">
        <Grid item xs={4}>
         <FormControl fullWidth>
            <TextField
              fullWidth
              type="number"
              label="Invoice number"
              name="invoiceNo"

                onChange={addOrderDetails}
            ></TextField>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
        <FormControl fullWidth>
        <Typography >PO Date</Typography>
            <TextField
              fullWidth
              type="date"
              
              name="poDate"

              onChange={addOrderDetails}
            ></TextField>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
        <FormControl fullWidth>
            <TextField
              fullWidth
              type="number"
              label="PO number"
              name="poNumber"

              onChange={addOrderDetails}
            ></TextField>
          </FormControl>
        </Grid>
      </Grid>

      <Grid
        container
        md={10}
        item
        columnSpacing={4} rowSpacing={2}
        mt={0}
        sx={{ alignItems: "flex-end" }}
      >
        <Grid item xs={4}>
        
          <InputLabel id="select_client">
            Select Client <span style={{ color: "red" }}>*</span>
          </InputLabel>
          <Select name="client" fullWidth value={order.client ?? 'Select Client'} onChange={addOrderDetails}>
          <MenuItem value="Select Client" style={{ display: "none" }}>Select Client</MenuItem>
            <MenuItem value={10}>ABC</MenuItem>
            <MenuItem value={20}>XYZ</MenuItem>
            
          </Select>
        
        </Grid>
        <Grid item xs={4}>
        <InputLabel id="select_company">
            Select Own Company <span style={{ color: "red" }}>*</span>
          </InputLabel>
          <Select name="company" fullWidth value={order.company ?? 'Select Company'} onChange={addOrderDetails}>
          <MenuItem value="Select Company" style={{ display: "none" }}>Select Company</MenuItem>
          <MenuItem value="Suchi International">Suchi International</MenuItem>
            
            
          </Select>
        </Grid>
        
      </Grid>

      <Grid
        container
        md={10}
        item
        columnSpacing={4} rowSpacing={2}
        mt={0}
        sx={{ alignItems: "flex-end" }}
      >
        <Grid item xs={4}>
         <FormControl fullWidth>
            <TextField
              fullWidth
              type="number"
              label="Amount Before GST"
              name="amount_before_gst"

              onChange={addOrderDetails}
            ></TextField>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
         <FormControl fullWidth>
            <TextField
              fullWidth
              type="number"
              label="SGST"
              name="sgst"

              onChange={addOrderDetails}
            ></TextField>
          </FormControl>
        </Grid>

      </Grid>

      <Grid
        container
        md={10}
        item
        columnSpacing={4} rowSpacing={2}
        mt={0}
        sx={{ alignItems: "flex-end" }}
      >
        <Grid item xs={4}>
         <FormControl fullWidth>
            <TextField
              fullWidth
              type="number"
              label="CGST"
              name="cgst"

              onChange={addOrderDetails}
            ></TextField>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
         <FormControl fullWidth>
            <TextField
              fullWidth
              type="number"
              label="Total Amount"
              name="total_amount"

              onChange={addOrderDetails}
            ></TextField>
          </FormControl>
        </Grid>

      </Grid>
      <FormControl fullWidth  sx={{marginTop:3,maxWidth:1200}}>
            <TextField
              fullWidth
             
              type="text"
              label="Amount in words"
              name="amount_in_words"

              onChange={addOrderDetails}
            ></TextField>
          </FormControl>

    
      <Typography variant="h6" component="h7" mt={2}>
        Add Items
      </Typography>

    <Grid 
    container
    md={12}
    item
    columnSpacing={4} rowSpacing={2}
    mt={0}
    sx={{ alignItems: "flex-end" }}
    >


    
      <Grid
        container
        item
        md={4}
        
        mt={0}
        sx={{ alignItems: "flex-end" }}
      >
        <Grid item xs={12}>
          <InputLabel id="product_alias">
            Product Alias 
          </InputLabel>
          <Select name="product_alias" fullWidth value={tableItem.product_alias ?? 'Product Alias'} onChange={addTableItem}>
            <MenuItem value={10}>Milk Pot</MenuItem>
            <MenuItem value="Product Alias" style={{ display: "none" }}>Product Alias</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} mt={4}>
          <InputLabel id="select_hsn">
            Select HSN 
          </InputLabel>
          <Select name="select_hsn" fullWidth value={tableItem.select_hsn ?? 'Select HSN'} onChange={addTableItem}>
            <MenuItem value={10}>123456</MenuItem>
            <MenuItem value="Select HSN" style={{ display: "none" }}>Select HSN</MenuItem>
            
          </Select>
        </Grid>
        <Grid item xs={12} mt={4}>
         <FormControl fullWidth>
            <TextField
              fullWidth
              type="number"
              label="Quantity"
              name="quantity"
              value={tableItem.quantity}
              onChange={addTableItem}
            ></TextField>
          </FormControl>
        </Grid>
        <Grid item xs={12} mt={4}>
         <FormControl fullWidth>
            <TextField
              fullWidth
              type="number"
              label="Price"
              name="price"
              value={tableItem.price}
              onChange={addTableItem}
            ></TextField>
          </FormControl>
        </Grid>
      </Grid>
      <Grid item xs={8} mt={2} sx={{alignSelf:'flex-start'}}>
      <ChangeStageTable ref={tableRef} cols={cols}/>
        </Grid>
      </Grid>
      
      <Grid
        container
        md={10}
        item
        columnSpacing={4} rowSpacing={2}
        mt={0}
        sx={{ alignItems: "flex-end" }}
      >
        <Grid item md={3}>
          <Button variant="contained" onClick={updateTable} fullWidth mt={3} pt={3} >Add Item</Button>
        </Grid>
        <Grid item md={3}>
          <Button variant="contained" fullWidth mt={3} pt={3} >Add Order</Button>
        </Grid>
      </Grid>
    
      
     
      
    </React.Fragment>
  );
};

export default AddPurchaseOrder;
