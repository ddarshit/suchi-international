import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Box } from "@mui/material";
import AddressForm from "./address_form";
import UploadImage from "./UploadImage";
import moment from "moment/moment";
import ContactCard from "./contact_card";
import { CheckForm } from "./CheckForm";
// import ContactForm from "./form/contact_form";

function formatDate(date){
  return moment(date).format('YYYY-MM-DD');
}

export const DynamicForm = ({
  formState,
  handleChange,
  handleCheckBox,
  handleSave,
  formConfig,
}) => {

  console.log(formState)
  
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {formConfig.map((field) => {
          if (field.type === "singleSelect") {
            return (
              <TextField
                key={field.field}
                label={field.headerName}
                select
                required={field.required}
                value={field.valueOptions.length>0 ? formState[field.field] ?? "" : ""}
                onChange={(e) => handleChange(field.field, e.target.value)}
                sx={{ ml: 2 }}
                margin="normal"
                variant="outlined"
              >
                {field.valueOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id} sx={{color:"black"}}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
            );
          }

          // if(field.type==="contact"){
          //   return <ContactCard onSave={handleChange}/>
          // }

          // if (field.type === "address") {
          //   return (
          //     <AddressForm
          //       field={field.field}
          //       name={field.headerName}
          //       handleChange={handleChange}
          //       data={formState[field.field]}
          //     />
          //   );
          // }

          if (field.type === "image") {
            return (
              <UploadImage
                field={field.field}
                multiple={field.multiple}
                name={field.headerName}
                handleChange={handleChange}
                required={field.required}
              />
            );
          }
          
          if(field.type==="checkbox"){
            console.log("exval",formState)
            return <CheckForm key={field.field} value={formState[field.field]} name={field.headerName} handleCheckBox={handleCheckBox}  />
          }

          if (field.type === "address") {
            return (  
                <AddressForm
                  field={field.field}
                  name={field.headerName}
                  data={formState[field.field] ?? {}}
                  handleChange={handleChange}
                  readonly={false}
                />
              
            );
          }

          if (!field.active) {
            return <div key={field.field}/>;
          }
          return (
            <TextField
              key={field.field}
              label={field.headerName}
              type={field.type}
              value={
                field.type==='date' && formState[field.field] !=null  ? formatDate(formState[field.field]) :
                formState[field.field] ?? ""}
              onChange={(e) => handleChange(field.field, e.target.value)}
              sx={{ ml: 2 }}
              margin="normal"
              variant="outlined"
              inputProps={{ placeholder: " " }}
              required={field.required}
            />
          );
        })}
      </div>
      <Box sx={{ display: "flex", justifyContent: "right" }}></Box>
    </div>
  );
};
