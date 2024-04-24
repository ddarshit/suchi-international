import React, { useEffect, useState } from 'react';
import { getCategory } from '../../services/handlers/get_dropdowns';
import DynamicFormDialog from '../../components/dynamic_form_dialogue';
import MasterTable from '../../components/master_table';



export const MasterRawMaterialInventory = () => {
  const formConfig = [
    { field: 'raw_material', headerName: 'Select Raw Material', width: 180, type: "singleSelect", valueOptions: [], editable: true, active: true },
    { field: 'supplier', headerName: 'Select Supplier', width: 200, type: "singleSelect", valueOptions: [], editable: true, active: true },
    { field: 'date', headerName: 'Date', type: "date", width: 100, editable: true, active: true },
    { field: 'quantity', headerName: 'Quantity', width: 180, type: "number", editable: true, active: true },
    { field: 'quantity_weight', headerName: 'Total Weight', width: 180, type: "number", editable: true, active: true },
    { field: 'batch_number', headerName: 'Batch Number', width: 200, type: "number", active: true },
    { field: 'start_stage', headerName: 'Select Start Stage', width: 200, type: "singleSelect", valueOptions: [], editable: true, active: true },
    { field: 'start_substage', headerName: 'Select Start Substage', width: 200, type: "singleSelect", valueOptions: [], editable: true, active: true },

    {
      field: 'added_by',
      headerName: 'Added By',
      width: 180,
    },

    {
      field: 'modified_by',
      headerName: 'Modified By',
      width: 180,
    },
    {
      field: 'added_date',
      headerName: 'Added Date',
      type: "date",
      width: 180,

    },
    {
      field: 'modified_date',
      headerName: 'Modified Date',
      type: "date",
      width: 180,

    },

  ];

  const data = [
    {
      id: 1,
      raw_material: "wood",
      supplier: "sss",
      date: new Date(0),
      quantity: 5,
      quantity_weight: 6,
      batch_number: "12345",
      start_stage: "xyz",
      start_substage: "abc",
      added_by: "kssjsjjs",
      modified_by: "jjsjjd",
      added_date: new Date(0),
      modified_date: new Date(0),
    }
    ,
    {
      id: 2,
      raw_material: "wood",
      supplier: "sss",
      date: new Date(0),
      quantity: 5,
      quantity_weight: 6,
      batch_number: "12345",
      start_stage: "xyz",
      start_substage: "abc",
      added_by: "kssjsjjs",
      modified_by: "jjsjjd",
      added_date: new Date(0),
      modified_date: new Date(0),
    }
  ];


  const [loadformConfig, setFormConfig] = useState(formConfig);
  const initialFormState = {
    name: '',
    alias: '',
  };

  useEffect(() => {
    const fetchValueOptions = async () => {
      try {
        const updatedFormConfig = [...formConfig];

        const singleSelectFields = updatedFormConfig.filter(
          (field) => field.type === 'singleSelect'
        );

        for (const field of singleSelectFields) {
          const data = await getCategory();

          field.valueOptions = data.map((item) => ({
            value: item.id,
            label: item.value,
          }));
        }

        setFormConfig(updatedFormConfig);
      } catch (error) {
        console.error('Error fetching data:', error);
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
    console.log(formState)
  };

  const handleSave = (e) => {
    e.preventDefault()
    // Perform the save action with the formState data
    console.log(formState);
  };

  const toggleForm= ()=> {
    setOpen(!open);
  }
  
  return (
    <div style={{width: "75%",position: "fixed"}}>
      <MasterTable toggleForm={toggleForm} column={formConfig} data={data} title="Raw Material Inventory" />
      <DynamicFormDialog
        title="Add Raw Material Inventory"
        open={open}
        handleClose={() => { setOpen(!open) }}
        formState={formState}
        handleChange={handleChange}
        handleSave={handleSave}
        formConfig={loadformConfig}
      />
    </div>
  );
};
