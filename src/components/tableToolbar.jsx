import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Button } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { toggleDialogue } from "../features/filterDialogue";

import Toolbar from "@mui/material/Toolbar";

import React from 'react';
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";

import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

export default function TableToolbar(props) {
    const { numSelected } = props;
    const dispatch = useDispatch();
  
    const handleFilter = () => {
      dispatch(toggleDialogue());
    };
  
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Purchase
          </Typography>
        )}
  
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton onClick={handleFilter}>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
  
        <Tooltip title="Add Purchase" sx={{ marginLeft: 5 }}>
          <Button variant="contained">Add Purchase Order</Button>
        </Tooltip>
      </Toolbar>
    );
  }
  
  TableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };