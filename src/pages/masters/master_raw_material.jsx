import React, { useEffect, useState } from "react";

import DynamicFormDialog from "../../components/dynamic_form_dialogue";
import MasterTable from "../../components/master_table";
import { addRawMaterialMaster } from "../../services/handlers/add_masters";
import { getRawMaterials } from "../../services/handlers/get_masters";
import { deleteRawMaterial } from "../../services/handlers/delete_masters";
import { updateRawMaterial } from "../../services/handlers/update_masters";
import { getTax } from "../../services/handlers/get_dropdowns";

export const MasterRawMaterialMaster = () => {
  const formConfig = [
    {
      field: "raw_material_name",
      headerName: "Raw Material Name",
      minWidth: 200,
      flex: 0.5,
      editable: true,
      active: true,
    },
    {
      field: "raw_material_alias",
      headerName: "Raw Material Alias",
      width: 200,
      editable: true,
      active: true,
    },
    {
      field: "tax_percentage_id_fk",
      headerName: "Tax Percentage",
      type: "singleSelect",
      valueOptions: [],
      width: 200,
      editable: false,
      active: true,
    },
    {
      field: "is_consumable",
      hide: true,
      headerName: "is Consumable",
      type: "checkbox",
      headerAlign: "start",
      width: 0,
      editable: true,
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

  useEffect(() => {
    fetchValueOptions();
  }, []);

  const fetchValueOptions = async () => {
    try {
      const data = await getTax();
      const updatedFormConfig = formConfig.map((config) => {
        if (config.type === "singleSelect") {
          return {
            ...config,
            valueOptions: data,
          };
        }
        return config;
      });
      console.log("config", updatedFormConfig);
      setFormConfig(updatedFormConfig);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [formState, setFormState] = useState({});
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const [data, setData] = useState([]);

  const handleChange = (field, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
    // console.log(formState);
  };

  useEffect(() => {
    fetch();
  }, [reload]);

  async function fetch() {
    const response = await getRawMaterials();

    setData([...response]);
    console.log(response);
  }

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      await addRawMaterialMaster(formState);
      toggleForm();
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteRawMaterial(id);
      // console.log(response);
    } catch (error) {}
  };

  const handleUpdate = async (e,data) => {
    e.preventDefault()
    // console.log("update", data);
    data={...data,...formState}
    const response = await updateRawMaterial(data);
    console.log("rest update", response);
    setReload(!reload);
  };

  const toggleForm = () => {
    setOpen(!open);
    setFormState({});
  };

  const handleCheckBox = (isChecked) => {
    
      console.log(isChecked, "check");

      setFormState((prevState) => ({
        ...prevState,
        is_consumable: isChecked,
      }));
    
    console.log("after click", formState);
  };

  return (
    <div style={{width: "75%",position: "fixed"}}>
      <MasterTable
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
        toggleForm={toggleForm}
        column={loadformConfig}
        handleCheckBox={handleCheckBox}
        formState={formState}
        data={data}
        title="Raw Material"
      />
      <DynamicFormDialog
        title="Add Raw Material"
        open={open}
        handleClose={toggleForm}
        formState={formState}
        handleChange={handleChange}
        handleCheckBox={handleCheckBox}
        handleSave={handleSave}
        formConfig={loadformConfig}
      />
    </div>
  );
};
