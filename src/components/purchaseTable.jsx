import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";

import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";

import { KeyboardArrowDown, KeyboardArrowRight } from "@mui/icons-material";
import TableHeader from "./tableHeader";
import TableToolbar from "./tableToolbar";
import { DataGrid } from "@mui/x-data-grid";
import { Collapse } from "@mui/material";

const childRow = [
  {
    id: 1,
    product: "abc",
    orderQty: "3",
    deliveredQty: "4",
    remainingQty: "5",
    price: "566",
    notes: "ufsduisgfverer",
  },
  {
    id: 2,
    product: "abc",
    orderQty: "3",
    deliveredQty: "4",
    remainingQty: "5",
    price: "566",
    notes: "ufsduisgfverer",
  },
];
const childCols = [
  { field: "id" },
  { field: "product", headerName: "Product" },
  { field: "orderQty", headerName: "Order Qty" },
  { field: "deliveredQty", headerName: "Delivered Qty" },
  { field: "remainingQty", headerName: "Remaining Qty" },
  { field: "price", headerName: "Price" },
  { field: "notes", headerName: "Notes" },
];

function createData(
  name,
  date,
  ownCompany,
  total,
  packaging,
  tax,
  totalAmount
) {
  return {
    name,
    date,
    ownCompany,
    total,
    packaging,
    tax,
    totalAmount,
  };
}

const rows = [
  createData("Cupcake", 305, 3.7, 67, 4.3, 67, 4.3),
  createData("Donut", 452, 25.0, 51, 4.9, 67, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0, 67, 4.3),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 67, 4.3),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "date",
    numeric: true,
    disablePadding: false,
    label: "Date",
  },
  {
    id: "ownCompany",
    numeric: true,
    disablePadding: false,
    label: "Own Company",
  },
  {
    id: "total",
    numeric: true,
    disablePadding: false,
    label: "Total Amount",
  },
  {
    id: "packaging",
    numeric: true,
    disablePadding: false,
    label: "Packaging",
  },
  {
    id: "tax",
    numeric: true,
    disablePadding: false,
    label: "Tax",
  },
  {
    id: "totalAmount",
    numeric: true,
    disablePadding: false,
    label: "Total Amount",
  },
];

export default function EnhancedTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [expandedRows, setExpandedRows] = React.useState([]);

  const handleExpand = (rowId) => {
    if (expandedRows.includes(rowId)) {
      setExpandedRows(expandedRows.filter((id) => id !== rowId));
    } else {
      setExpandedRows([...expandedRows, rowId]);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    console.log(event.target.closest("button"));
    if (event.target.closest("button")) {

      return;
    }
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );



  return (
    <Box sx={{ width: "100%", mb: 2 }} elevation={5} component={Paper}>
      <Paper sx={{ width: "100%", pt: 2 }} elevation={0}>
        <TableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            size="small"
            sx={{ minWidth: 750 }}

          >
            <TableHeader
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={headCells}
            />
            <TableBody>
              {visibleRows.map((row, index) => {


                return (
                  <Row row={row} isSelected={isSelected} handleClick={handleClick} index={index} />
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}

            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

function Row(props) {
  const { row, isSelected, handleClick, index } = props;
  const [open, setOpen] = React.useState(false);

  const showChild = () => {
    setOpen(!open);
  }

  const isItemSelected = isSelected(row.name);
  const labelId = `enhanced-table-checkbox-${index}`;

  return (
    <React.Fragment>
      <TableRow
        hover
        onClick={(event) => handleClick(event, row.name)}
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={row.name}
        selected={isItemSelected}
        sx={{ cursor: "pointer" }}
      >
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            checked={isItemSelected}
            inputProps={{
              "aria-labelledby": labelId,
            }}
          />
        </TableCell>
        <TableCell>
          <IconButton
            onClick={(event) => {
              handleClick(event, "BUTTON");
              showChild();
            }}
          >

            {!open ? <KeyboardArrowRight /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          padding="none"
        >
          <Typography>{row.name}</Typography>

          <Typography sx={{ fontSize: 14, color: "grey" }}>
            ABC Company
          </Typography>
        </TableCell>
        <TableCell align="right">{row.date}</TableCell>
        <TableCell align="right">{row.ownCompany}</TableCell>
        <TableCell align="right">{row.total}</TableCell>
        <TableCell align="right">{row.packaging}</TableCell>
        <TableCell align="right">{row.tax}</TableCell>
        <TableCell align="right">{row.totalAmount}</TableCell>
      </TableRow>
      <TableRow sx={{ p: open ? 3 : 0 }}>
        <TableCell sx={{ p: open ? 3 : 0 }} colSpan={9} align="right">
          <Collapse in={open} timeout="auto" unmountOnExit>
            <ChildTable rows={childRow} columns={childCols} />
          </Collapse>
        </TableCell>
      </TableRow>

    </React.Fragment>
  );
  //             })}
  //             {emptyRows > 0 && (
  //               <TableRow
  //                 style={{
  //                   height: 53 * emptyRows,
  //                 }}
  //               >
  //                 <TableCell colSpan={6} />
  //               </TableRow>
  //             )}

  //           </TableBody>
  //         </Table>
  //       </TableContainer>
  //       <TablePagination
  //         rowsPerPageOptions={[5, 10, 25]}
  //         component="div"
  //         count={rows.length}
  //         rowsPerPage={rowsPerPage}
  //         page={page}
  //         onPageChange={handleChangePage}
  //         onRowsPerPageChange={handleChangeRowsPerPage}
  //       />
  //     </Paper>
  //   </Box>
  // );
}

function ChildTable(props) {

  return (
    <Box>
      <DataGrid
        rows={props.rows}
        columns={props.columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        autoHeight
        pageSizeOptions={[5, 10]}
      />
    </Box>
  );
}
