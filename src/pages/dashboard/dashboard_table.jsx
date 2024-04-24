import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import { Modal, TableFooter } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import { TablePaginationActions } from "./pagination";
import Filters from "../../components/filterUi";
import DataLoader from "../../components/dataLoader";
import { MdPreview } from "react-icons/md";
import MaterialStage from "../../components/MaterialStage";
import { Link } from "react-router-dom";

function createData(no, item, circle_size, point, order_pcs) {
  return {
    no,
    item,
    circle_size,
    point,
    order_pcs,

    history: [
      {
        No: "1",
        stage: "Rolling",
        substage: "Roll-2",
        quantity: 200,
        employee: "Parbat",
        machine: "Roller-345",
        remarks: "NA",
      },
    ],
  };
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#673ab7",
    // border: 4 solid,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    border: "1px solid",
    borderColor: "#909090",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // hide last border
  "&:last-child th": {
    borderColor: "	#909090",
    background: "#fff",
    color: "#673ab7",
  },
}));

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [openMaterial, setOpenMaterial] = React.useState(false);

  const handleRawMaterial = () => {
    setOpenMaterial(true);
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <StyledTableCell align="center" component="th" scope="row">
          {row.no}
        </StyledTableCell>
        <StyledTableCell align="center">{row.item}</StyledTableCell>
        <StyledTableCell align="center">{row.circle_size}</StyledTableCell>
        <StyledTableCell align="center">{row.point}</StyledTableCell>
        <StyledTableCell align="center">{row.order_pcs}</StyledTableCell>

        <StyledTableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <Remove /> : <Add />}
          </IconButton>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => handleRawMaterial()}
          >
            <MdPreview size={25} className="text-suchi" />
          </IconButton>
        </StyledTableCell>
      </TableRow>

      <StyledTableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0, background: "#fff" }}
          colSpan={12}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ marginTop: 2, marginBottom: 2 }}>
              <Table size="small" aria-label="purchases">
                <TableHead sx={{ border: "1px solid" }}>
                  <StyledTableRow>
                    <TableCell sx={{ fontWeight: "600" }} align="center">
                      No
                    </TableCell>
                    <TableCell sx={{ fontWeight: "600" }} align="center">
                      Stage
                    </TableCell>
                    <TableCell sx={{ fontWeight: "600" }} align="center">
                      Sub Stage
                    </TableCell>
                    <TableCell sx={{ fontWeight: "600" }} align="center">
                      Quantity
                    </TableCell>
                    <TableCell sx={{ fontWeight: "600" }} align="center">
                      Employee
                    </TableCell>
                    <TableCell sx={{ fontWeight: "600" }} align="center">
                      Machine
                    </TableCell>
                    <TableCell sx={{ fontWeight: "600" }} align="center">
                      Remarks
                    </TableCell>
                    {/* <TableCell sx={{ fontWeight: "600" }} align="center">Packed</TableCell> */}
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <StyledTableRow key={historyRow.date}>
                      <StyledTableCell align="center" scope="row">
                        {historyRow.No}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {historyRow.stage}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {historyRow.substage}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {historyRow.quantity}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {historyRow.employee}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {historyRow.machine}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {historyRow.remarks}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </StyledTableRow>

      <Modal
        open={openMaterial}
        // onClose={()=>{setOpenDetail(false)}}
      >
        <Box>
          <MaterialStage
            open={openMaterial}
            handleClose={() => {
              setOpenMaterial(false);
            }}
          />
        </Box>
      </Modal>
    </React.Fragment>
  );
}

const rows = [
  createData(1, "steel", "steel sheet", 40, "ft.", 1000, 2987),
  createData(2, "aluminium", "aluminium bars", 20, "m", 1500, 2987),
];

const DashBoardTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <React.Fragment>
      <Box>
        <Filters />
        <Link to="/dashboard/change-stage">
          <Button
            fullWidth
            sx={{ alignItems: "center", maxWidth: 200, mb: 3 }}
            variant="contained"
          >
            Add Stage
          </Button>
        </Link>
        <TableContainer component={Paper} elevation={5}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <StyledTableCell>No</StyledTableCell>
                <StyledTableCell align="center">Raw Material</StyledTableCell>
                <StyledTableCell align="center">
                  Raw Material Alias
                </StyledTableCell>
                <StyledTableCell align="center">Dimensions</StyledTableCell>
                <StyledTableCell align="center">Dimension unit</StyledTableCell>
                {/* <StyledTableCell align="center">Total Pcs</StyledTableCell>
                <StyledTableCell align="center">Circle Req'd</StyledTableCell> */}
                <StyledTableCell>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows
              ).map((row) => (
                <Row key={row.name} row={row} />
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={8}
                  count={rows.length}
                  rowsPerPage={10}
                  page={page}
                  align="right"
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </React.Fragment>
  );
};

export default DataLoader(DashBoardTable);
