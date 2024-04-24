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
  Paper,
  Dialog,
  AppBar,
  DialogContent,
  DialogActions,
  Toolbar,
  IconButton

} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Close } from "@mui/icons-material";


const AddPurchaseOrder = ({onClose}) => {

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
            Add Purchase Order
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
      <p className="text-3xl font-bold ">
        <span className="underline underline-offset-2 decoration-2 decoration-[#673ab7]">
          Add Dimension
        </span>
      </p>

      <Grid item container sx={{ alignSelf: "flex-start" }} columnSpacing={4} rowSpacing={2} mt={0} alignItems="flex-end">
        <Grid item xs={4}>
          <FormControl fullWidth>
            <TextField
              fullWidth
              type="number"
              label="Invoice number"
              name="invoiceNo"

            //   onChange={handleTableForm}
            ></TextField>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <Typography >Invoice Date</Typography>
            <TextField
              fullWidth
              type="date"
              name="invoiceDate"
            //   onChange={handleTableForm}
            ></TextField>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <TextField
              fullWidth
              type="number"
              label="PO number"
              name="invoicePO"

            //   onChange={handleTableForm}
            ></TextField>
          </FormControl>
        </Grid>
      </Grid>

      <Grid
        container

        columnSpacing={4} rowSpacing={2}
        mt={0}
        sx={{ alignItems: "flex-end" }}
      >
        <Grid item xs={4}>
          <InputLabel id="select_client">
            Select Client <span style={{ color: "red" }}>*</span>
          </InputLabel>
          <Select fullWidth value={10}>
            <MenuItem value={10}>ABC</MenuItem>
            <MenuItem value={20}>XYZ</MenuItem>

          </Select>
        </Grid>
        <Grid item xs={4}>
          <InputLabel id="select_company">
            Select Own Company <span style={{ color: "red" }}>*</span>
          </InputLabel>
          <Select fullWidth value={10}>
            <MenuItem value={10}>Suchi International</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={4} maxHeight={120} sx={{ overflowY: 'auto' }}>

          <FormControl fullWidth>
            <Typography >Expected Delivery Date</Typography>
            <TextField
              fullWidth
              type="date"

              name="invoiceDeliveryDate"

            //   onChange={handleTableForm}
            ></TextField>
          </FormControl>


        </Grid>
      </Grid>

      {/* <Typography variant="h6" component="h1" mt={2}>
        Add Items
      </Typography> */}
      
      <p className="mt-8 text-3xl font-bold ">
        <span className="underline underline-offset-2 decoration-2 decoration-[#673ab7]">
          Add Dimension
        </span>
      </p>

      <Grid
        container

        columnSpacing={4} rowSpacing={2}
        mt={0}
        sx={{ alignItems: "flex-end" }}
      >
        <Grid item xs={4}>
          <InputLabel id="select_product">
            Select Product
          </InputLabel>
          <Select fullWidth value={10}>
            <MenuItem value={10}>Milk Pot</MenuItem>

          </Select>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <TextField
              fullWidth
              type="number"
              label="Quantity"
              name="quantity"

            //   onChange={handleTableForm}
            ></TextField>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <TextField
              fullWidth
              type="number"
              label="Price"
              name="price"

            //   onChange={handleTableForm}
            ></TextField>
          </FormControl>
        </Grid>
      </Grid>

      <Grid
        container

        columnSpacing={4} rowSpacing={2}
        mt={0}
        sx={{ alignItems: "flex-end" }}
      >
        <Grid item xs={6}>
          <FormControl fullWidth>
            <TextField
              fullWidth
              type="text"
              label="Product Alias"
              name="product_alias"

            //   onChange={handleTableForm}
            ></TextField>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <TextField
              fullWidth
              type="text"
              label="Notes"
              name="notes"

            //   onChange={handleTableForm}
            ></TextField>
          </FormControl>
        </Grid>

      </Grid>

      <Grid
        container

        columnSpacing={4} rowSpacing={2}
        mt={0}
        sx={{ alignItems: "flex-end" }}
      >
        <Grid item md={3}>
          <Button variant="contained" fullWidth mt={3} pt={3} >Add Item</Button>
        </Grid>
      </Grid>

      <Grid
        container

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

            //   onChange={handleTableForm}
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

            //   onChange={handleTableForm}
            ></TextField>
          </FormControl>
        </Grid>

      </Grid>

      <Grid
        container

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

            //   onChange={handleTableForm}
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

            //   onChange={handleTableForm}
            ></TextField>
          </FormControl>
        </Grid>

      </Grid>
      <FormControl fullWidth sx={{ marginTop: 3 }}>
        <TextField
          fullWidth
          type="text"
          label="Amount in words"
          name="amount_in_words"

        //   onChange={handleTableForm}
        ></TextField>
      </FormControl>
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

export default AddPurchaseOrder;
