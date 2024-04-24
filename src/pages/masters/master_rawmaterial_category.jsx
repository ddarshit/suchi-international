import React, { useEffect, useState } from "react";

import DynamicFormDialog from "../../components/dynamic_form_dialogue";
import MasterTable from "../../components/master_table";
import { addRawMaterialCategory } from "../../services/handlers/add_masters";
import { getRawCategories } from "../../services/handlers/get_masters";
import { deleteRawCategory } from "../../services/handlers/delete_masters";
import { updateRawCategory } from "../../services/handlers/update_masters";

export const MasterRawMaterialCategory = () => {
  const formConfig = [
    {
      field: "category_name",
      headerName: "Category Name",
      flex: 0.5,
      minWidth: 200,
      editable: true,
      active: true,
      required:true
    },
    {
      field: "category_alias",
      headerName: "Category Alias",
      flex: 0.4,
      minWidth: 200,
      editable: true,
      active: true,
      required:true
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

  const [loadformConfig] = useState(formConfig);


  const [formState, setFormState] = useState({});
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const [data, setData] = useState([]);

  const handleChange = (field, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  useEffect(() => {
    console.log("useeffect");

    fetch();
  }, [reload]);

  async function fetch() {
    const response = await getRawCategories();

    setData([...response]);
    console.log(response);
  }

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      await addRawMaterialCategory(formState);

      toggleForm();
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteRawCategory(id);
    } catch (error) {}
  };

  const handleUpdate = async (e,data) => {
    e.preventDefault()
    // console.log("update", data);
    const response = await updateRawCategory(data);
    console.log("rest update", response);
    setReload(!reload);
  };

  const toggleForm = () => {
    setOpen(!open);
    setFormState({});
  };

  return (
    <div style={{width: "75%",position: "fixed"}}>
      <MasterTable
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
        toggleForm={toggleForm}
        column={loadformConfig}
        formState={formState}
        data={data}
        title="Raw Material Category"
      />
      <DynamicFormDialog
        title="Add Raw Category"
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
