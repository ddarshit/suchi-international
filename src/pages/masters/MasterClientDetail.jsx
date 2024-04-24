import React, { useEffect, useState } from 'react';
import { getCategory } from '../../services/handlers/get_dropdowns';
import DynamicFormDialog from '../../components/dynamic_form_dialogue';
import MasterTable from '../../components/master_table';
import { addClientDetails } from '../../services/handlers/add_masters';
import { getClientDetails } from '../../services/handlers/get_masters';

const MasterClientDetail = () => {
  const formConfig = [
    { field: 'company_name', headerName: 'Company Name', flex: 0.5, minWidth: 200, active: true,required:true },
    { field: 'company_alias', headerName: 'Company Alias', width: 200, active: true,required:true  },
    { field: 'gst_code', hide: true, headerName: 'GST Code', width: 200, active: true,required:true  },
    { field: 'website_link', hide: true, headerName: 'Website Link', width: 200, active: true },
    { field: 'pan_number', hide: true, headerName: 'Pan Number', width: 200, type: "number", active: true },
    { field: 'tan_number', hide: true, headerName: 'Tan Number', width: 200, active: true },
    { field: 'image', hide: true, headerName: '', multiple: false, type: "image", width: 0, },
    { field: 'contact', hide: true, headerName: '', type: "contact", width: 0,required:true  },
    { field: 'company_address', hide: true, headerName: 'Company Address', type: "address", align: "start", headerAlign: 'start', width: 0,required:true  },
    // { field: 'checkbox', hide: true, headerName: '', type: "checkbox", align: "start", headerAlign: 'start', width: 100, },
    { field: 'delivery_address', hide: true, headerName: 'Delivery Address', type: "address", align: "start", headerAlign: 'start', width: 0,required:true  },

    // { field: 'raw_material', headerName: 'Select Raw Material', width: 180, type: "singleSelect", valueOptions: [], active: true },
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
      field: 'createdAt',
      headerName: 'Added Date',
      type: "date",
      width: 180,
    },
    {
      field: 'updatedAt',
      headerName: 'Modified Date',
      type: "date",
      width: 180,
    },

  ];

  const [loadformConfig, setFormConfig] = useState(formConfig);
  const [formState, setFormState] = useState({});
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("useeffect")
    fetchData();
  }, [reload]);

  async function fetchData() {
    const response = await getClientDetails();

    setData([...response]);
    console.log(response)
  }

  const handleChange = (field, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
    console.log("master", formState)
  };

  const handleCheckBox = (isChecked) => {
    if (isChecked) {
      // console.log(isChecked, 'ss');
      const companyAdd = formState['company_address'];
      setFormState((prevState) => ({
        ...prevState,
        delivery_address: companyAdd,
      }));
    }
    console.log("ater click", formState)
  }

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await addClientDetails(formState);
        // toggleForm();
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  };


  const handleDelete = async (id) => {
    try {
      //   const response = await deleteDimensions(id);
      //   console.log(response);
    } catch (error) {

    }
  }

  const handleUpdate = async (e,data) => {
    e.preventDefault()
    console.log("update", data)
    // const response = await updateDimensionMaster(data);
    // console.log("rest update", response);
    setReload(!reload);
  }

  const toggleForm = () => {
    setOpen(!open);
    setFormState({})
  }


  return (
    <div style={{width: "75%",position: "fixed"}}>
      <MasterTable
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
        toggleForm={toggleForm}
        column={formConfig}
        formState={formState}
        data={data}
        canView={true}
        handleCheckBox={handleCheckBox}
        title="Client Details"
      />
     
      <DynamicFormDialog
        title="Add Client Details"
        open={open}
        handleClose={toggleForm}
        formState={formState}
        handleChange={handleChange}
        handleSave={handleSave}
        formConfig={loadformConfig}
        fullScreen={true}
      />
      
    </div>
  );

}

export default MasterClientDetail