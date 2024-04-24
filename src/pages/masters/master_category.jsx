import React, { useEffect, useState } from "react";
import { getCategory } from "../../services/handlers/get_dropdowns";
import DynamicFormDialog from "../../components/dynamic_form_dialogue";
import MasterTable from "../../components/master_table";
import { getProductCategories } from "../../services/handlers/get_masters";
import { addProductCategory } from "../../services/handlers/add_masters";
import { deleteProductCategory } from "../../services/handlers/delete_masters";
import { updateProductCategory } from "../../services/handlers/update_masters";

export const MasterProductCategory = () => {
  const formConfig = [
    {
      field: "category_name",
      headerName: "Name",
      width: 200,
      editable: true,
      active: true,
    },
    {
      field: "category_alias",
      headerName: "Category Alias",

      width: 200,
      editable: true,
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

  const [loadformConfig, setFormConfig] = useState(formConfig);
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    fetch();
  }, [reload]);

  async function fetch() {
    const response = await getProductCategories();

    setData([...response]);
    console.log(response);
  }

  const [formState, setFormState] = useState({});
  const [open, setOpen] = useState(false);
  const handleChange = (field, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
    console.log(formState);
  };

  const toggleForm = () => {
    setOpen(!open);
    setFormState({});
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteProductCategory(id);
      console.log(response);
    } catch (error) {}
  };

  const handleUpdate = async (e,data) => {
    e.preventDefault()
    console.log("update", data);
    const response = await updateProductCategory(data);
    console.log("rest update", response);
    setReload(!reload);
  };

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      await addProductCategory(formState);

      toggleForm();
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{width: "75%",position: "fixed"}}>
      <MasterTable
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
        toggleForm={toggleForm}
        column={formConfig}
        formState={formState}
        data={data}
        title="Product Categories"
      />
      <DynamicFormDialog
        title="Add Product Category"
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
