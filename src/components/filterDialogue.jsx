import React from 'react';
import {Button,} from '@mui/material'
import { useDispatch,useSelector } from 'react-redux';
import { toggleDialogue } from '../features/filterDialogue';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Grid,} from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const FilterDialogue = () => {

    const dispatch = useDispatch();
    const isOpen= useSelector((state)=> state.filterDialogue.value);
const handleClose=() => {
    dispatch(toggleDialogue())
}

  return (
    <div>
      
      <Dialog open={isOpen} keepMounted onClose={handleClose}>
        <DialogTitle>Filters</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Select Filters to be applied on the Table
          </DialogContentText>
          <Grid container spacing={2}>
  <Grid item xs={8}>
    <h2>xs=8</h2>
  </Grid>
  <Grid item xs={4}>
    <h2>xs=4</h2>
  </Grid>
  
</Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">Cancel</Button>
          <Button onClick={handleClose} variant='contained'>Apply</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
  
}

export default FilterDialogue