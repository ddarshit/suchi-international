import { toast } from "react-toastify";
import apiHandler from "../apiHandler";


export async function addClientDetails(data) {
    try {
        const formData = new FormData();
        if (data.image) {
            console.log(data.image)
            formData.append('image', data['image']);
            delete data.image;
        }
        data['is_active'] = true;
        formData.append('data', JSON.stringify(data));
        console.log("formData", formData)
        const response = await apiHandler("POST", '/master/client-details/add', formData);
        toast.success("Client Details added successfully");
        return response;
    } catch (error) {
        toast.error("Error adding cient data")
    }
}


export async function addDimensions(data) {
    try {
        const response = await apiHandler("POST", '/master/dimension-master/add', data);
        toast.success("Dimension added successfully");
        return response;
    } catch (error) {
        toast.error("Cannot add data");
    }
    return [];
}

export async function addProductCategory(data) {
    try {
        const response = await apiHandler("POST", '/master/product/categories/add', data);
        toast.success("Category added successfully");
        return response;
    } catch (error) {
        toast.error("Cannot add data");
    }
    return [];
}

export async function addDimensionUnits(data) {

    try {
        const response = await apiHandler("POST", '/master/dimension-unit-master/add', data);
        toast.success("Dimension Unit added successfully");
        return response;
    } catch (error) {
        toast.error("Cannot add data");
    }
    return [];
}

export async function addContact(data) {
    data = { ...data, is_active: true };
    try {
        const response = await apiHandler("POST", '/master/contact/add', data);
        toast.success("Contact added successfully");
        return response;
    } catch (error) {
        toast.error("Cannot add data");
    }
    return [];
}

export async function addRawMaterialCategory(data) {
    data = { ...data, is_active: true };
    try {
        const response = await apiHandler("POST", '/master/raw-material/categories/add', data);
        toast.success("Contact added successfully");
        return response;
    } catch (error) {
        toast.error("Cannot add data");
    }
    return [];
}

export async function addRawMaterialMaster(data) {
    data = { ...data, is_active: true };
    try {
        const response = await apiHandler("POST", '/master/raw-material/add', data);
        toast.success("Raw Material added successfully");
        return response;
    } catch (error) {
        toast.error("Cannot add data");
    }
    return [];
}

export async function addStage(data) {
    data = { ...data, is_active: true };
    try {
        const response = await apiHandler("POST", '/master/stage/add', data);
        toast.success("Stage added successfully");
        return response;
    } catch (error) {
        toast.error("Cannot add data");
    }
    return [];
}

export async function addSubStage(data) {
    data = { ...data, is_active: true };
    try {
        const response = await apiHandler("POST", '/master/substage/add', data);
        toast.success("Sub Stage added successfully");
        return response;
    } catch (error) {
        toast.error("Cannot add data");
    }
    return [];
}

export async function addMachine(data) {
    data = { ...data, is_active: true };
    try {
        const response = await apiHandler("POST", '/master/machine/add', data);
        toast.success("Machine added successfully");
        return response;
    } catch (error) {
        toast.error("Cannot add data");
    }
    return [];
}

export async function addSupplier(data) {
    data = { ...data, is_active: true };
    try {
        const response = await apiHandler("POST", '/master/supplier/add', data);
        toast.success("Supplier added successfully");
        return response;
    } catch (error) {
        toast.error("Cannot add data");
    }
    return [];
}