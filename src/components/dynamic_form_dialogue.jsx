import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DynamicForm } from "./form/dynamic_form";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";

export default function DynamicFormDialog({
  open,
  handleClose,
  title,
  formState,
  handleChange,
  handleSave,
  formConfig,
  fullScreen,
  handleCheckBox,
}) {
  return (
   
    <Dialog fullScreen={fullScreen} open={open} onClose={handleClose}>
      <form onSubmit={handleSave}>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h7" component="div">
            {title}
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <DialogContent>
        <DynamicForm
          formState={formState}
          handleChange={handleChange}
          handleSave={handleSave}
          formConfig={formConfig}
          handleCheckBox={handleCheckBox}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3 }}>
        <Button
          sx={{ minWidth: 100 }}
          type="submit"
          variant="contained"
          color="primary"
        >
          Save
        </Button>
        <Button variant="outlined" sx={{ minWidth: 100 }} onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
      </form>
    </Dialog>
    
  );
}
