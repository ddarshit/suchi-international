import React, { useEffect, useState } from "react";
import DynamicFormDialog from "../../components/dynamic_form_dialogue";
import MasterTable from "../../components/master_table";
import { addDimensions } from "../../services/handlers/add_masters";
import { getDimensions } from "../../services/handlers/get_masters";
import { updateDimensionMaster } from "../../services/handlers/update_masters";
import { deleteDimensions } from "../../services/handlers/delete_masters";
import { toast } from "react-toastify";

const MasterDimension = () => {
  const formConfig = [
    {
      field: "dimension_name",
      headerName: "Dimension Name",
      flex: 0.5, 
      minWidth: 200,
      active: true,
    },
    {
      field: "dimension_alias",
      headerName: "Dimension Alias",
      flex: 0.4, 
      minWidth: 200,
      active: true,
    },

    {
      field: "added_by",
      headerName: "Added By",
      width: 180,
    },

    {
      field: "modified_by",
      headerName: "Modified By",
      width: 180,
    },
    {
      field: "createdAt",
      headerName: "Added Date",
      type: "date",
      width: 180,
    },
    {
      field: "updatedAt",
      headerName: "Modified Date",
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
  };

  useEffect(() => {
    fetch();
  }, [reload]);

  async function fetch() {
    const response = await getDimensions();

    setData([...response]);
    // console.log(response)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      await addDimensions(formState);

      toggleForm();
      setReload(!reload);

    } catch (error) {
      console.log(error);
    }
  };


  const handleDelete = async (id) => {
    try {
      const response = await deleteDimensions(id);
      // console.log(response);
    } catch (error) {

    }
  }

  const handleUpdate = async (e,data) => {
    e.preventDefault()
    // console.log("update", data)
    const response = await updateDimensionMaster(data);
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
        title="Dimension"
      />
      <DynamicFormDialog
        title="Add Dimension"
        open={open}
        handleClose={toggleForm}
        formState={formState}
        handleChange={handleChange}
        handleSave={handleSave}
        formConfig={loadformConfig}
      />
    </div>
  );
};

export default MasterDimension;
