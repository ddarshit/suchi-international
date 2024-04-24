import apiHandler from "../apiHandler";
import { toast } from "react-toastify";

export async function deleteDimensions(id) {
    try {
        const response = await apiHandler("DELETE", `/master/dimension-master/${id}`);
        toast.success("Dimesion deleted Successfully");
        return response;
    } catch (error) {
        toast.error("Something went wrong");
    }
}

export async function deleteDimensionUnits(id) {
    try {
        const response = await apiHandler("DELETE", `/master/dimension-unit-master/${id}`);
        toast.success("Dimesion Unit deleted Successfully");
        return response;
    } catch (error) {
        toast.error("Something went wrong");
    }
}

export async function deleteContact(id) {
    try {
        const response = await apiHandler("DELETE", `/master/contact/${id}`);
        toast.success("Contact deleted Successfully");
        return response;
    } catch (error) {
        toast.error("Something went wrong");
    }
}

export async function deleteProductCategory(id) {
    try {
        const response = await apiHandler("DELETE", `/master/product/categories/${id}`);
        toast.success("Category deleted Successfully");
        return response;
    } catch (error) {
        toast.error("Something went wrong");
    }
}

export async function deleteRawCategory(id) {
    try {
        const response = await apiHandler("DELETE", `/master/raw-material/categories/${id}`);
        toast.success("Category deleted Successfully");
        return response;
    } catch (error) {
        toast.error("Something went wrong");
    }
}

export async function deleteRawMaterial(id) {
    try {
        const response = await apiHandler("DELETE", `/master/raw-material/delete/${id}`);
        toast.success("Deleted Successfully");
        return response;
    } catch (error) {
        toast.error("Something went wrong");
    }
}

export async function deleteStage(id) {
    try {
        const response = await apiHandler("DELETE", `/master/stage/${id}`);
        toast.success("Stage deleted Successfully");
        return response;
    } catch (error) {
        toast.error("Something went wrong");
    }
}

export async function deleteSubStage(id) {
    try {
        const response = await apiHandler("DELETE", `/master/substage/${id}`);
        toast.success("Sub Stage deleted Successfully");
        return response;
    } catch (error) {
        toast.error("Something went wrong");
    }
}

export async function deleteMachine(id) {
    try {
        const response = await apiHandler("DELETE", `/master/machine/${id}`);
        toast.success("Machine deleted Successfully");
        return response;
    } catch (error) {
        toast.error("Something went wrong");
    }
}

export async function deleteSupplier(id) {
    try {
        const response = await apiHandler("DELETE", `/master/supplier/${id}`);
        toast.success("Supplier deleted Successfully");
        return response;
    } catch (error) {
        toast.error("Something went wrong");
    }
}
