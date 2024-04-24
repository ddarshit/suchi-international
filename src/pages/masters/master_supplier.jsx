import React, { useEffect, useState } from "react";
import DynamicFormDialog from "../../components/dynamic_form_dialogue";
import MasterTable from "../../components/master_table";
import { getSupplier } from "../../services/handlers/get_masters";
import { addSupplier } from "../../services/handlers/add_masters";
import { deleteSupplier } from "../../services/handlers/delete_masters";
import { updateSupplier } from "../../services/handlers/update_masters";

export const MasterSupplier = () => {
  const formConfig = [
    {
      field: "supplier_name",
      headerName: "Supplier Name",
      flex: 0.5,
      minWidth: 200,
      editable: true,
      active: true,
    },
    {
      field: "supplier_alias",
      headerName: "Supplier Alias",
      width: 200,
      editable: true,
      active: true,
    },
    {
      field: "gst_code",
      headerName: "GST Code",
      width: 200,
      hide: true,
      editable: true,
      active: true,
    },
    {
      field: "website_link",
      headerName: "Website Link",
      type: "url",
      width: 200,
      hide: true,
      editable: true,
      active: true,
    },
    {
      field: "pan_number",
      headerName: "Pan Number",
      width: 200,
      hide: true,
      editable: true,
      active: true,
    },
    {
      field: "tan_number",
      headerName: "Tan Number",
      hide: true,
      width: 200,
      editable: true,
      active: true,
    },
    { field: 'supplier_address', hide: true, headerName: 'Supplier Address', type: "address", width: 0, editable: true },
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

  // const data = [
  //   {
  //     id: 1,
  //     name: "psr",
  //     alias: "Fancy Bowl",
  //     supplier_address: "djkshdjihsaaskaksjdhasdjhakdaskjhdkjashdahsdjkkasdahjs",
  //     gst_code: "jdcs",
  //     website_link: "https://google.com",
  //     pan_number: "bdkjabsh",
  //     tan_number: "oihsfusen",
  //     added_by: "kssjsjjs",
  //     modified_by: "jjsjjd",
  //     added_date: new Date(0),
  //     modified_date: new Date(0),
  //   },
  //   {
  //     id: 2,
  //     name: "psr",
  //     alias: "ssss",
  //     supplier_address: "djkshdj",
  //     gst_code: "jdcs",
  //     website_link: "https://google.com",
  //     pan_number: "bdkjabsh",
  //     tan_number: "oihsfusen",
  //     added_by: "kssjsjjs",
  //     modified_by: "jjsjjd",
  //     added_date: new Date(0),
  //     modified_date: new Date(0),
  //   },
  // ];

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
    const response = await getSupplier();

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

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      await addSupplier(formState);

      toggleForm();
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteSupplier(id);
      console.log(response);
    } catch (error) { }
  };

  const handleUpdate = async (e,data) => {
    e.preventDefault()
    console.log("update", data);
    data = { ...data, ...formState }
    const response = await updateSupplier(data);
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
        column={formConfig}
        formState={formState}
        data={data}
        canView={true}
        title="Suppliers Details"
      />
      <DynamicFormDialog
        title="Add Supplier"
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
};
