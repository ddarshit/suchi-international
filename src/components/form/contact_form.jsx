import React from 'react';
import { Button, TextField, Box, IconButton, Typography } from '@mui/material';
import { AddCircleOutline, DeleteOutline } from '@mui/icons-material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Close } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ContactForm = ({ open, updateData, onSaved, handleClose }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    alias: Yup.string().required('Alias is required'),
    designation: Yup.string().required('Designation is required'),
    phone: Yup.array()
      .of(Yup.number().required('Phone is required'))
      .min(1, 'At least one phone is required'),
    email: Yup.array()
      .of(Yup.string().required('Email is required'))
      .min(1, 'At least one email is required'),
  });

  const initialValues = updateData ?? {
    name: '',
    alias: '',
    designation: '',
    phone: [''],
    email: [''],
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      onSaved(values);
    },
  });

  return (
    <Dialog open={open}>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h7" component="div">
            Contact Form
          </Typography>
          <IconButton edge="end" color="inherit" aria-label="close" onClick={handleClose}>
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>

      <DialogContent>
        <Box>
          <Box display="flex" >
            <TextField
              label="Name"
              fullWidth
              sx={{mr:2}}

              {...formik.getFieldProps('name')}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              label="Alias"
              fullWidth
             
              {...formik.getFieldProps('alias')}
              error={formik.touched.alias && Boolean(formik.errors.alias)}
              helperText={formik.touched.alias && formik.errors.alias}
            />
          </Box>
          <TextField
            label="Designation"
            fullWidth
            margin="normal"
            {...formik.getFieldProps('designation')}
            error={formik.touched.designation && Boolean(formik.errors.designation)}
            helperText={formik.touched.designation && formik.errors.designation}
          />
          {formik.values.phone.map((phoneField, index) => (
            <Box key={index} display="flex" alignItems="center" mb={1}>
              <TextField
                label={`Phone ${index + 1}`}
                fullWidth
                margin="normal"
                {...formik.getFieldProps(`phone.${index}`)}
                error={formik.touched.phone?.[index] && Boolean(formik.errors.phone?.[index])}
                helperText={formik.touched.phone?.[index] && formik.errors.phone?.[index]}
                type='number'
              />
              {index > 0 && (
                <IconButton onClick={() => formik.setFieldValue('phone', formik.values.phone.filter((_, i) => i !== index))}>
                  <DeleteOutline />
                </IconButton>
              )}
            </Box>
          ))}
          <Box display="flex" alignItems="center" mb={1}>
            <IconButton onClick={() => formik.setFieldValue('phone', [...formik.values.phone, ''])}>
              <AddCircleOutline />
            </IconButton>
            <Typography variant="body1">Add Phone</Typography>
          </Box>
          {formik.values.email.map((emailField, index) => (
            <Box key={index} display="flex" alignItems="center" mb={1}>
              <TextField
                label={`Email ${index + 1}`}
                fullWidth
                margin="normal"
                {...formik.getFieldProps(`email.${index}`)}
                error={formik.touched.email?.[index] && Boolean(formik.errors.email?.[index])}
                helperText={formik.touched.email?.[index] && formik.errors.email?.[index]}
                
              />
              {index > 0 && (
                <IconButton onClick={() => formik.setFieldValue('email', formik.values.email.filter((_, i) => i !== index))}>
                  <DeleteOutline />
                </IconButton>
              )}
            </Box>
          ))}
          <Box display="flex" alignItems="center" mb={1}>
            <IconButton onClick={() => formik.setFieldValue('email', [...formik.values.email, ''])}>
              <AddCircleOutline />
            </IconButton>
            <Typography variant="body1">Add Email</Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3 }}>
        <Button sx={{ minWidth: 100 }} onClick={formik.handleSubmit} variant="contained" color="primary">
          Save
        </Button>
        <Button variant="outlined" onClick={handleClose} sx={{ minWidth: 100 }}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ContactForm;
