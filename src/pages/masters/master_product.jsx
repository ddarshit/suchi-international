import React, { useEffect, useState } from "react";
import { getCategory } from "../../services/handlers/get_dropdowns";
import DynamicFormDialog from "../../components/dynamic_form_dialogue";
import MasterTable from "../../components/master_table";
import {
  getAllProduct,
  getAllProductCategory,
  getDimensionUnits,
  getDimensions,
  getRawMaterials,
  getStages,
  getSubStages,
} from "../../services/handlers/get_masters";
import { toast } from "react-toastify";

export const MasterProduct = () => {
  const [formState, setFormState] = useState({});
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [dimension, setDimension] = useState([]);
  const [dimensionUnit, setDimensionUnit] = useState([]);
  const [rawMaterial, setRawMaterial] = useState([]);
  const [stage, setStage] = useState([]);
  const [subStage, setSubStage] = useState([]);

  const fetchData = async () => {
    try {
      const data = await getAllProduct();
      setData(data);
    
    } catch (error) {
      console.log(error);
      toast.error("Failed to get Product");
    }
  };
  useEffect(() => {
    fetchData();
    Promise.allSettled([
      getAllProduct(),
      getAllProductCategory(),
      getDimensions(),
      getDimensionUnits(),
      getRawMaterials(),
      getStages(),
      getSubStages(),
    ])
      .then((data) => {
        setData(data[0]?.value || []);
        setCategory(data[1]?.value || []);
        setDimension(data[2]?.value || []);
        setDimensionUnit(data[3]?.value || []);
        setRawMaterial(data[4].value);
        setStage(data[5]?.value || []);
        setSubStage(data[6]?.value || []);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to get data");
      });
  }, []);
  const formConfig = [
    {
      field: "product_name",
      headerName: "Product Name",
      width: 200,
      editable: true,
      active: true,
      required: true,
    },
    {
      field: "product_alias",
      headerName: "Product Alias",
      width: 200,
      editable: true,
      active: true,
      required: true,
    },
    {
      field: "tax_percentage_id_fk",
      headerName: "Tax Percentage",
      type: "singleSelect",
      valueOptions: [],
      width: 200,
      editable: true,
      active: true,
      required: true,
    },

    {
      field: "dimension_id",
      headerName: "Dimension",
      valueOptions: dimension,
      type: "singleSelect",
      width: 200,
      editable: true,
      hide: true,
      active: true,
      required: true,
    },
    {
      field: "dimension_unit_id",
      headerName: "Dimension Unit",

      valueOptions: dimensionUnit,
      type: "singleSelect",
      hide: true,
      width: 200,
      editable: true,
      active: true,
      required: true,
    },
    {
      field: "value",
      headerName: "value",
      width: 200,
      editable: true,
      hide: true,
      active: true,
      required: true,
    },
    {
      field: "product_category_id",
      headerName: "Product Category",
      valueOptions: category,
      type: "singleSelect",
      hide: true,
      width: 200,
      editable: true,
      active: true,
      required: true,
    },
    {
      field: "raw_material_id_fk",
      headerName: "Row Material",
      valueOptions: rawMaterial,
      type: "singleSelect",
      hide: true,
      width: 200,
      editable: true,
      active: true,
      required: true,
    },
    {
      field: "stage_id_fk",
      headerName: "Stage",
      valueOptions: stage,
      type: "singleSelect",
      hide: true,
      width: 200,
      editable: true,
      active: true,
      required: true,
    },
    {
      field: "sub_stage_id_fk",
      headerName: "Sub Stage",
      valueOptions: subStage,
      type: "singleSelect",
      hide: true,
      width: 200,
      editable: true,
      active: true,
      required: true,
    },
    {
      field: "stage_sequence_number",
      headerName: "Stage Sequence",
      valueOptions: stage,
      multiple: true,
      type: "singleSelect",
      hide: true,
      width: 200,
      editable: true,
      active: true,
      required: true,
    },
    {
      field: "image",
      headerName: "Products Images",
      multiple: true,
      type: "image",
      width: 0,
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

  const handleChange = (field, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
    console.log(formState);
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Perform the save action with the formState data
    console.log(formState);
  };

  const toggleForm = () => {
    setOpen(!open);
  };

  return (
    <div style={{width: "75%",position: "fixed"}}>
      <MasterTable
        column={formConfig}
        toggleForm={toggleForm}
        data={data}
        title="Products"
      />
      <DynamicFormDialog
        title="Add Product"
        open={open}
        handleClose={() => {
          setOpen(!open);
        }}
        formState={formState}
        handleChange={handleChange}
        handleSave={handleSave}
        formConfig={formConfig}
        maxWidth="md"
        fullWidth
      />
    </div>
  );
};
