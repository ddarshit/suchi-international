import React, { useEffect, useState } from 'react';
import DynamicFormDialog from '../../components/dynamic_form_dialogue';
import MasterTable from '../../components/master_table';
import { getContacts, getDimensionUnits } from '../../services/handlers/get_masters';
import { addDimensionUnits } from '../../services/handlers/add_masters';
import { deleteContact, deleteDimensionUnits } from '../../services/handlers/delete_masters';
import { updateContact, updateDimensionUnitMaster } from '../../services/handlers/update_masters';
import { addContact } from '../../services/handlers/add_masters';

const MasterContact = () => {
  const formConfig = [
    { field: 'contact_name', headerName: 'Name', width: 180, editable: true, active: true },
    { field: 'contact_alias', headerName: 'Alias', width: 200, editable: true, active: true },
    { field: 'contact_phone',type:"number", headerName: 'Phone No.', width: 200, editable: true, active: true },
    { field: 'contact_email',type:"email", headerName: 'Email', width: 200, editable: true, active: true },

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

  const [data, setData] = useState([]);

  


  const [loadformConfig, setFormConfig] = useState(formConfig);
  const [reload, setReload] = useState(false);
  const [formState, setFormState] = useState({});
  const [open, setOpen] = useState(false);
  
  const handleChange = (field, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
    // console.log(formState)
  };

  useEffect(() => {
    console.log("useeffect")

    fetch();
  }, [reload]);

  async function fetch() {
    const response = await getContacts();

    setData([...response]);
    console.log(response)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      await addContact(formState);
      toggleForm();
      setReload(!reload);

    } catch (error) {
      console.log(error);
    }
  };


  const handleDelete = async (id) => {
    try {
      const response = await deleteContact(id);
      console.log(response);
    } catch (error) {

    }
  }

  const handleUpdate = async (e,data) => {
    e.preventDefault()
    console.log("update", data)
    const response = await updateContact(data);
    console.log("rest update", response);
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
        title="Contacts"
      />
      <DynamicFormDialog
        title="Add Contacts"
        open={open}
        handleClose={toggleForm}
        formState={formState}
        handleChange={handleChange}
        handleSave={handleSave}
        formConfig={loadformConfig}
      />
    </div>
  );
}

export default MasterContact