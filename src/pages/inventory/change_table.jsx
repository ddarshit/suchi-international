import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#673ab7",
    // backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(id, item, quantity, stage, sub_stages) {
  return { id, item, quantity, stage, sub_stages };
}

export const ChangeStageTable = React.forwardRef((props, ref) => {
  const [data, setData] = React.useState([]);

  console.log("cols", props);

  React.useImperativeHandle(ref, () => ({
    addData(row) {
      try {
        const newData = row;
        setData((data) => [...data, newData]);
      } catch (error) {
        console.error(`Error adding data: ${error.message}`);
      }
    },

    getData() {
      return data;
    },
  }));

  return (
    <TableContainer
      component={Paper}
      elevation={5}
      sx={{
        maxWidth: 700,
        minWidth: 700,
        maxHeight: 270,
        border: "1px solid ",
      }}
    >
      <Table stickyHeader aria-label="customized table">
        <TableHead>
          <TableRow>
            {props.cols.map((e, index) => (
              <StyledTableCell key={index}>{e}</StyledTableCell>
            ))}

            {/* <StyledTableCell>Item</StyledTableCell>
            <StyledTableCell align="right">Quantity</StyledTableCell>
            <StyledTableCell align="right">Stage</StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.id}>
              {Object.keys(row).map((e, index) => {
                if (e === "id") return null;
                return <StyledTableCell key={index}>{row[e]}</StyledTableCell>;
              })}

              {/* <StyledTableCell align="right">{row.stage}</StyledTableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});
