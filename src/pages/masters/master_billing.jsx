import React, { useEffect, useState } from 'react';
import { getCategory } from '../../services/handlers/get_dropdowns';
import DynamicFormDialog from '../../components/dynamic_form_dialogue';
import MasterTable from '../../components/master_table';


export const MasterBilling = () => {

  const formConfig = [
    { field: 'client', headerName: 'Select Client', width: 180, type: "singleSelect", valueOptions: [], editable: true, active: true },
    { field: 'own_company', headerName: 'Select Own Company', width: 160, type: "singleSelect", valueOptions: [], editable: true, active: true },
    { field: 'lr_number', headerName: 'LR Number', align: "start", type: "number", headerAlign: 'center', width: 200, editable: true, active: true },
    { field: 'pi', headerName: 'Select PI', width: 180, type: "singleSelect", valueOptions: [], editable: true, active: true },
    { field: 'date', headerName: 'Date', type: "date", width: 100, editable: true, active: true },
    { field: 'invoice_number', headerName: 'Invoice Number', align: "start", type: "number", headerAlign: 'center', width: 200, editable: true, active: true },
    { field: 'total', headerName: 'Total', type: "number", align: "start", headerAlign: 'center', width: 200, editable: true, active: true },
    { field: 'cgst', headerName: 'CGST', type: "number", align: "start", headerAlign: 'center', width: 200, editable: true, active: true },
    { field: 'sgst', headerName: 'SGST', type: "number", align: "start", headerAlign: 'center', width: 200, editable: true, active: true },
    { field: 'igst', headerName: 'IGST', type: "number", align: "start", headerAlign: 'center', width: 200, editable: true, active: true },
    { field: 'discount', headerName: 'Discount', type: "number", align: "start", headerAlign: 'center', width: 200, editable: true, active: true },
    { field: 'packaging', headerName: 'Packaging', width: 100, align: "center", editable: true, active: true },
    { field: 'tds', headerName: 'TDS', type: "number", align: "start", headerAlign: 'center', width: 200, editable: true, active: true },
    { field: 'final_amount', headerName: 'Final Amount', width: 200, editable: true, active: true },
    { field: 'num_of_cartons', headerName: 'Number of Cartons', type: "number", align: "start", headerAlign: 'center', width: 200, editable: true, active: true },
    { field: 'cost_per_cartons', headerName: 'Cost Per Cartons', type: "number", align: "start", headerAlign: 'center', width: 200, editable: true, active: true },
    { field: 'print_bank_details', headerName: '', type: "number", align: "start", headerAlign: 'center', width: 0, editable: true },
    { field: 'isActive', headerName: '', type: "number", align: "start", headerAlign: 'center', width: 0, editable: true },
    { field: 'billing_address', headerName: 'Billing Address',  type: "address", align: "start", headerAlign: 'center', width: 0, editable: true },
    { field: 'contact', headerName: '',  type: "contact", align: "start", headerAlign: 'center', width: 0, editable: true },

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
      client: Math.random().toString(36).substring(7),
      own_company: Math.random().toString(36).substring(7),
      lr_number: Math.floor(Math.random() * 100000),
      pi: Math.random().toString(36).substring(7),
      date: new Date(0),
      invoice_number: Math.floor(Math.random() * 100000),
      total: Math.random() * 1000,
      cgst: Math.random() * 100,
      sgst: Math.random() * 100,
      igst: Math.random() * 100,
      discount: Math.random() * 100,
      packaging: Math.random() > 0.5 ? 'Yes' : 'No',
      tds: Math.random() * 100,
      final_amount: Math.random() * 1000,
      num_of_cartons: Math.floor(Math.random() * 100),
      cost_per_cartons: Math.random() * 1000,
      billing_address:{
        addressLine1:"oisdhsd",
        addressLine2:"hicndskc",
        addressLine3:"jksdjksd",
        city:"sdnc",
        state:"ndcds",
        stateCode: 123456
      },
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
    // const fetchValueOptions = async () => {
    //   try {
    //     const updatedFormConfig = [...formConfig];

    //     const singleSelectFields = updatedFormConfig.filter(
    //       (field) => field.type === 'singleSelect'
    //     );

    //     for (const field of singleSelectFields) {
    //       const data = await getCategory();

    //       field.valueOptions = data.map((item) => ({
    //         value: item.id,
    //         label: item.value,
    //       }));
    //     }

    //     setFormConfig(updatedFormConfig);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // };

    // fetchValueOptions();
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

  const handleSave = () => {
    // Perform the save action with the formState data
    console.log(formState);
  };

  const updateForm= (updateConfig) => {
    setFormState(updateConfig);
    setOpen(!open);
  }

  const toggleForm= ()=> {
    setFormState(initialFormState);
    setOpen(!open);
  }

  const handleClose= ()=> {
    
    setOpen(!open);
  }

  return (
    <div style={{width: "75%",position: "fixed"}}>
      {/* <ContactFormDialogue /> */}
      <MasterTable updateForm={updateForm} toggleForm={toggleForm} column={formConfig}  data={data} title="Billing" />
      <DynamicFormDialog
        title="Add Bill"
        fullScreen
        open={open}
        handleClose={handleClose}

        formState={formState}
        handleChange={handleChange}
        handleSave={handleSave}
        formConfig={loadformConfig}
      />
    </div>
  );
};
