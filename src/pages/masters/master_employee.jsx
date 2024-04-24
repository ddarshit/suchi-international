import React, { useEffect, useState } from "react";
import { getCategory } from "../../services/handlers/get_dropdowns";
import DynamicFormDialog from "../../components/dynamic_form_dialogue";
import MasterTable from "../../components/master_table";

// import {MdPreview

export const MasterEmployee = () => {
  


  const formConfig = [
    {
      field: "name",
      headerName: "Name",
      width: 100,
      editable: true,
      active: true,
    },
    {
      field: "alias",
      headerName: "Employee Alias",
      width: 200,
      editable: true,
      active: true,
    },
    
    {
      field: "employee_code",
      headerName: "Employee Code",
      width: 200,
      editable: true,
      active: true,
    },
    {
      field: "aadhar_number",
      headerName: "Aadhar Number",
      width: 200,
      editable: true,
      active: true,
    },
    {
      field: "pan_number",
      headerName: "Pan Number",
      width: 200,
      hide:true,
    
     
      active: true,
    },
    { field: 'image', headerName: 'Employee Image', multiple: false, type: "image", width: 0,hide:true, editable: true },
    { field: 'contact', headerName: 'Employee Contact', type: 'contact', width: 0, hide:true,editable: true },
    {
      field: "employee_address",
      headerName: "Employee Address",
      type: "address",
      width: 200,
      hide:true,
      editable: true,
      active: true,
    },

    {
      field: "added_by",
      headerName: "Added By",
      width: 180,
      hide:true,
    },

    {
      field: "modified_by",
      headerName: "Modified By",
      width: 180,
      hide:true,
    },
    {
      field: "added_date",
      headerName: "Added Date",
      type: "date",
      width: 180,
    },
    {
      field: "modified_date",
      headerName: "Modified Date",
      type: "date",
      width: 180,
      hide:true,
    },
    
  ];

  const data = [
    {
      id: 1,
      name: "psr",
      alias: "Fancy Bowl",
      employee_address: "djkshdjihsaaskaksjdhasdjhakdaskjhdkjashdahsdjkkasdahjs",
      
      aadhar_number: "bdkjabsh",
      pan_number: "oihsfusen",
      added_by: "kssjsjjs",
      modified_by: "jjsjjd",
      // added_date: new Date(0),
      // modified_date: new Date(0),
    },
    {
      id: 2,
      name: "psr",
      alias: "Fancy Bowl",
      employee_address: "djkshdjihsaaskaksjdhasdjhakdaskjhdkjashdahsdjkkasdahjs",
      email: "jdcs",
      phone: 26266262,
      aadhar_number: "bdkjabsh",
      pan_number: "oihsfusen",
      added_by: "kssjsjjs",
      modified_by: "jjsjjd",
      // added_date: new Date(0),
      // modified_date: new Date(0),
    },
  ];

  const [loadformConfig, setFormConfig] = useState(formConfig);
  const initialFormState = {
    name: "",
    alias: "",
  };
  const [usedata, setdata] = useState(null);

  useEffect(() => {
    const fetchValueOptions = async () => {
      try {
        const updatedFormConfig = [...formConfig];

        const singleSelectFields = updatedFormConfig.filter(
          (field) => field.type === "singleSelect"
        );

        for (const field of singleSelectFields) {
          const data = await getCategory();

          field.valueOptions = data.map((item) => ({
            value: item.id,
            label: item.value,
          }));
        }

        setFormConfig(updatedFormConfig);
        setdata(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchValueOptions();
  }, []);

  const [formState, setFormState] = useState(initialFormState);
  const [open, setOpen] = useState(false);
  const handleChange = (field, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
    console.log(formState);
  };

 
  const handleSave = (e) => {
    e.preventDefault()
    // Perform the save action with the formState data
    console.log(formState);
  };

  const toggleForm = () => {
    setOpen(!open);
  }

  return (
    <>
      

      <div style={{width: "75%",position: "fixed"}}>
        {usedata && (
          <MasterTable
            column={formConfig}
            data={usedata}
            title="Employees"
            toggleForm={toggleForm}
            canView={true}
          />
        )}
        <DynamicFormDialog
          title="Add Employee"
          open={open}
          handleClose={() => { setOpen(!open) }}
          formState={formState}
          handleChange={handleChange}
          handleSave={handleSave}
          formConfig={loadformConfig}
        />
      </div>
    </>

  );
};
