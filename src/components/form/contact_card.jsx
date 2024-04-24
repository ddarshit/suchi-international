import React, { useState } from 'react';
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import { Edit } from '@mui/icons-material';
import DynamicForm from './contact_form';

const ContactCard = ({onSave,updateData}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState({
    name:updateData?.name ?? '',
    alias:updateData?.alias ?? '',
    designation:updateData?.designation ?? '',
    phone:updateData?.phone ?? [''], // Initialize with one empty phone field
    email:updateData?.email ?? [''], // Initialize with one empty email field
  });
  
  const handleEditClick = () => {
    setIsEditing(true);
  };

  

  
  const handleClose=()=> {
    setIsEditing(false);
  }

  const handleSaved=(data)=> {
    console.log(data)
    setData(data);
    setIsEditing(false);
    onSave("contact",data);
  }

  
  return (
    <Card>
      <CardContent>
        {isEditing ? (
          <DynamicForm open={isEditing} handleClose={handleClose} updateData={data} onSaved={handleSaved}/>
        ) : (
          <>
            <Typography variant="h5" gutterBottom>
              {`Name: ${data.name}`}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {`Alias: ${data.alias}`}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {`Designation: ${data.designation}`}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Phone Numbers:</strong>
            </Typography>
            {data.phone.map((phone, index) => (
              <Typography key={index} variant="body1" gutterBottom>
                {`Phone ${index + 1}: ${phone}`}
              </Typography>
            ))}
            <Typography variant="body1" gutterBottom>
              <strong>Email Addresses:</strong>
            </Typography>
            {data.email.map((email, index) => (
              <Typography key={index} variant="body1" gutterBottom>
                {`Email ${index + 1}: ${email}`}
              </Typography>
            ))}
          </>
        )}
      </CardContent>

      {!updateData && <CardActions>
        
          <Button onClick={handleEditClick} color="primary" startIcon={<Edit />}>
            Edit
          </Button>
        
      </CardActions>}
    </Card>
  );
};

export default ContactCard;
