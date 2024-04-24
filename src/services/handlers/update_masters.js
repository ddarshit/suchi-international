import { toast } from "react-toastify";
import apiHandler from "../apiHandler";

export async function updateDimensionMaster(data) {
    try {
        const response = await apiHandler("PUT", `/master/dimension-master/${data.id}`, data);
        toast.success("Dimension modified successfuly")
        return response;
    } catch (error) {
        toast.error("Something went wrong")
    }
}

export async function updateDimensionUnitMaster(data) {
    try {
        const response = await apiHandler("PUT", `/master/dimension-unit-master/${data.id}`, data);
        toast.success("Dimension unit modified successfuly")
        return response;
    } catch (error) {
        toast.error("Something went wrong")
    }
}

export async function updateContact(data) {
    try {
        const response = await apiHandler("PUT", `/master/contact/${data.id}`, data);
        toast.success("Contact modified successfuly")
        return response;
    } catch (error) {
        toast.error("Something went wrong")
    }
}

export async function updateProductCategory(data) {
    try {
        const response = await apiHandler("PUT", `/master/product/categories/${data.id}`, data);
        toast.success("Category modified successfuly")
        return response;
    } catch (error) {
        toast.error("Something went wrong")
    }
}

export async function updateRawCategory(data) {
    try {
        const response = await apiHandler("PUT", `/master/raw-material/categories/${data.id}`, data);
        toast.success("Category modified successfuly")
        return response;
    } catch (error) {
        toast.error("Something went wrong")
    }
}

export async function updateRawMaterial(data) {
    try {
        const response = await apiHandler("PUT", `/master/raw-material/update/${data.id}`, data);
        toast.success("modified successfuly")
        return response;
    } catch (error) {
        toast.error("Something went wrong")
    }
}

export async function updateStage(data) {
    try {
        const response = await apiHandler("PUT", `/master/stage/${data.id}`, data);
        toast.success("Stage modified successfuly")
        return response;
    } catch (error) {
        toast.error("Something went wrong")
    }
}

export async function updateSubStage(data) {
    try {
        const response = await apiHandler("PUT", `/master/substage/${data.id}`, data);
        toast.success("Sub Stage modified successfuly")
        return response;
    } catch (error) {
        toast.error("Something went wrong")
    }
}

export async function updateMachine(data) {
    try {
        const response = await apiHandler("PUT", `/master/machine/${data.id}`, data);
        toast.success("Machine modified successfuly")
        return response;
    } catch (error) {
        toast.error("Something went wrong")
    }
}

export async function updateSupplier(data) {
    try {
        const response = await apiHandler("PUT", `/master/supplier/${data.id}`, data);
        toast.success("Supplier modified successfuly")
        return response;
    } catch (error) {
        toast.error("Something went wrong")
    }
}
