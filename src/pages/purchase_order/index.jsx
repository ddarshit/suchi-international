import * as React from "react";
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import { Button, Grid } from "@mui/material";

import AddPurchaseOrder from "./AddPurchaseOrder";
import TableComponent from "../../components/Table";

export default function PurchaseOrder() {
  const [openPurchaseOrder, setOpenPurchaseOrder] = React.useState(false);
  const columns = [
    {
      field: "Company",
      headerName: "Company Name",
      width: 200,
    },
    {
      field: "Date",
      headerName: "Date",
      width: 200,
    },
    {
      field: "Vendor",
      headerName: "Vendor",
      width: 200,
    },
    {
      field: "amount",
      headerName: "Total amount",
      width: 200,
    },
    {
      field: "status",
      headerName: "Payment Status",
      width: 200,
    },
  ];

  return (
    <>
      {openPurchaseOrder && (
        <AddPurchaseOrder onClose={() => setOpenPurchaseOrder(false)} />
      )}
      <Box sx={{ mb: 2, mt: 3 }} elevation={5} component={Paper}>
        <Paper sx={{ width: "100%", pt: 2 }} elevation={0}>
          <Grid
            container
            spacing={0}
            justifyContent="space-between"
            sx={{ paddingInline: "14px", mb: 3 }}
          >
            <Typography variant="h6" fontWeight={600}>
              Purchase Order
            </Typography>
            <Button
              variant="contained"
              onClick={() => setOpenPurchaseOrder(true)}
            >
              Add Data
            </Button>
          </Grid>
          <div style={{ width: "100%" }}>
            <TableComponent rows={[]} columns={columns} />
          </div>
        </Paper>
      </Box>
    </>
  );
}
