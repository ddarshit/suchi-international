import { toast } from "react-toastify";
import apiHandler from "../apiHandler";

export async function getDimensions() {
  try {
    const response = await apiHandler("GET", "/master/dimension-master");
    const convertedData = response.map((item) => ({
      ...item,
      createdAt: new Date(item.createdAt), // Convert added_date to Date object
      updatedAt: new Date(item.updatedAt), // Convert modified_date to Date object
      value:item?.dimension_name
    }));
    return convertedData;
  } catch (error) {}
  return [];
}

export async function getDimensionUnits() {
  try {
    const response = await apiHandler("GET", "/master/dimension-unit-master");
    const convertedData = response.map((item) => ({
      ...item,
      createdAt: new Date(item.createdAt), // Convert added_date to Date object
      updatedAt: new Date(item.updatedAt), // Convert modified_date to Date object
      value:item?.dimension_unit_name
    }));
    return convertedData;
  } catch (error) {}
  return [];
}

export async function getContacts() {
  try {
    const response = await apiHandler("GET", "/master/contact");
    const convertedData = response.map((item) => ({
      ...item,
      createdAt: new Date(item.createdAt), // Convert added_date to Date object
      updatedAt: new Date(item.updatedAt), // Convert modified_date to Date object
    }));
    return convertedData;
  } catch (error) {}
  return [];
}

export async function getProductCategories() {
  try {
    const response = await apiHandler("GET", "/master/product/categories");
    const convertedData = response.map((item) => ({
      ...item,
      createdAt: new Date(item.createdAt), // Convert added_date to Date object
      updatedAt: new Date(item.updatedAt), // Convert modified_date to Date object
    }));
    return convertedData;
  } catch (error) {}
  return [];
}

export async function getRawCategories() {
  try {
    const response = await apiHandler("GET", "/master/raw-material/categories");
    const convertedData = response.map((item) => ({
      ...item,
      createdAt: new Date(item.createdAt), // Convert added_date to Date object
      updatedAt: new Date(item.updatedAt), // Convert modified_date to Date object
    }));
    return convertedData;
  } catch (error) {}
  return [];
}

export async function getRawMaterials() {
  try {
    const response = await apiHandler("GET", "/master/raw-material/get");
    const convertedData = response.map((item) => ({
      ...item,
      createdAt: new Date(item.createdAt), // Convert added_date to Date object
      updatedAt: new Date(item.updatedAt), // Convert modified_date to Date object
      value:item?.raw_material_name
    }));
    return convertedData;
  } catch (error) {}
  return [];
}

export async function getClientDetails() {
  try {
    const response = await apiHandler("GET", "/master/client-details/");
    const convertedData = response.map((item) => ({
      ...item,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt),
    }));
    return convertedData;
  } catch (error) {}
  return [];
}

export async function getStages() {
  try {
    const response = await apiHandler("GET", "/master/stage/");
    const convertedData = response.map((item) => ({
      ...item,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt),
      value:item?.stage_name
    }));
    return convertedData;
  } catch (error) {}
  return [];
}

export async function getSubStages() {
  try {
    const response = await apiHandler("GET", "/master/substage/");
    const convertedData = response.map((item) => ({
      ...item,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt),
      value:item?.sub_stage_name
    }));
    return convertedData;
  } catch (error) {}
  return [];
}

export async function getMachine() {
  try {
    const response = await apiHandler("GET", "/master/machine/");
    const convertedData = response.map((item) => ({
      ...item,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt),
    }));
    return convertedData;
  } catch (error) {}
  return [];
}

export async function getSupplier() {
  try {
    const response = await apiHandler("GET", "/master/supplier/");
    const convertedData = response.map((item) => ({
      ...item,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt),
    }));
    return convertedData;
  } catch (error) {}
  return [];
}

export const chnageStage = async () => {
  try {
    const response = await apiHandler("GET", "/addstage");
    return response;
  } catch (error) {
    toast.error("Something Went Wrong");
  }
  return [];
};
export const getAllProduct = async () => {
  try {
    const response = await apiHandler("GET", "/masters/product_masters");
   
    const mappedData = response?.data[0]?.map((item) => ({
      ...item,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt),
    }));
    return mappedData;
  } catch (error) {
    toast.error("Something Went Wrong");
  }
  return [];
};

export const getAllProductCategory = async () => {
  try {
    const response = await apiHandler("GET", "/masters/product_category_masters");
   
    const mappedData = response?.data[0]?.map((item) => ({
      ...item,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt),
      value:item?.category_name
    }));
    return mappedData;
  } catch (error) {
    toast.error("Something Went Wrong");
  }
  return [];
};