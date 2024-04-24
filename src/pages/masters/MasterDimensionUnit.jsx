import React, { useEffect, useState } from 'react';
import { getCategory } from '../../services/handlers/get_dropdowns';
import DynamicFormDialog from '../../components/dynamic_form_dialogue';
import MasterTable from '../../components/master_table';
import { getDimensionUnits } from '../../services/handlers/get_masters';
import { addDimensionUnits } from '../../services/handlers/add_masters';
import { deleteDimensionUnits } from '../../services/handlers/delete_masters';
import { updateDimensionUnitMaster } from '../../services/handlers/update_masters';

const MasterDimensionUnit = () => {
  const formConfig = [
    { field: 'dimension_unit_name', headerName: 'Dimension Unit Name', flex: 0.5, minWidth: 200, editable: true, active: true },
    { field: 'dimension_unit_alias', headerName: 'Dimension Unit Alias', flex: 0.4, minWidth: 200, editable: true, active: true },
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
     fetch();
  }, [reload]);

  async function fetch() {
    const response = await getDimensionUnits();

    setData([...response]);
    // console.log(response)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      await addDimensionUnits(formState);
      toggleForm();
      setReload(!reload);

    } catch (error) {
      console.log(error);
    }
  };


  const handleDelete = async (id) => {
    try {
      const response = await deleteDimensionUnits(id);
      // console.log(response);
    } catch (error) {

    }
  }

  const handleUpdate = async (e,data) => {
    e.preventDefault()
    const response = await updateDimensionUnitMaster(data);
    // console.log("rest update", response);
    setReload(!reload);
  }

  const toggleForm = () => {
    setOpen(!open);
    setFormState({})
  }

  return (
    <div style={{width: "75%",position: "fixed"}} >
      <MasterTable
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
        toggleForm={toggleForm}
        column={formConfig}
        formState={formState}
        data={data}
        title="Dimension Unit"
      />
      <DynamicFormDialog
        title="Add Dimension Unit"
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

export default MasterDimensionUnit