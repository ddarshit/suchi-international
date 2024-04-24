import React from 'react'
import { Button, Box, InputAdornment, TextField } from '@mui/material'
import { KeyboardArrowUp, KeyboardArrowDown, FilterList } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDialogue } from '../features/filterDialogue';
import FilterDialogue from './filterDialogue';
import { Search } from '@mui/icons-material';

const Filters = () => {

  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.filterDialogue.value);

  const textColor = {
    color: "#673ab7"
  };

  const toggleArrow = () => {
    return isOpen ? (

      <KeyboardArrowUp sx={{ color: textColor.color }} />

    ) : (

      <KeyboardArrowDown sx={{ color: textColor.color }} />

    );
  };

  const handleToggle = () => {
    dispatch(toggleDialogue())
  }

  return (
    <React.Fragment>
      <Box
        sx={{ display: "flex", justifyContent: 'space-between', marginBottom: 3, marginTop: 3 }}
      >
        <TextField
          id="input-with-icon-textfield"
          fullWidth
          sx={{ maxWidth: 600 }}
          placeholder='Search'
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}

        />

        <Button
          fullWidth
          sx={{ alignItems: "center", maxWidth: 200 }}
          onClick={handleToggle}
          variant="outlined"
        >

          <FilterList sx={{ color: textColor.color }} />

          <span
            style={{ color: "#673ab7", marginLeft: 3, marginRight: 3 }}
          >
            Filters
          </span>
          {toggleArrow()}
        </Button>

      </Box>

      <FilterDialogue></FilterDialogue>
    </React.Fragment>
  )
}

export default Filters