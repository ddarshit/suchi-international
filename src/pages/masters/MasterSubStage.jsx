import React, { useEffect, useState } from 'react';
import { getCategory, getRawMaterial, getStage } from '../../services/handlers/get_dropdowns';
import DynamicFormDialog from '../../components/dynamic_form_dialogue';
import MasterTable from '../../components/master_table';
import { getSubStages } from '../../services/handlers/get_masters';
import { addSubStage } from '../../services/handlers/add_masters';
import { deleteSubStage } from '../../services/handlers/delete_masters';
import { updateSubStage } from '../../services/handlers/update_masters';

const MasterSubStage = () => {
    const formConfig = [
        { field: 'sub_stage_name', headerName: 'Stage Name', width: 200, editable: true, active: true },
        { field: 'sub_stage_alias', headerName: 'Stage Alias', width: 200, editable: true, active: true },
        { field: 'raw_material_id_fk', headerName: 'Selected Raw Material', width: 180, type: "singleSelect", valueOptions: [], editable: true, active: true },
        { field: 'stage_id_fk', headerName: 'Selected Stage', width: 180, type: "singleSelect", valueOptions: [], editable: true, active: true },
        {
            field: 'added_by',
            headerName: 'Added By',
            width: 180,
        },

        {
            field: 'modified_by',
            headerName: 'Modified By',
            width: 180,
        },
        {
            field: 'createdAt',
            headerName: 'Added Date',
            type: "date",
            width: 180,
        },
        {
            field: 'updatedAt',
            headerName: 'Modified Date',
            type: "date",
            width: 180,
        },

    ];

    const [data, setData] = useState([]);

    const [loadformConfig, setFormConfig] = useState(formConfig);
    const [reload, setReload] = useState(false);
    const [formState, setFormState] = useState({});
    const [open, setOpen] = useState(false);


    useEffect(() => {
        fetchValueOptions();
    }, []);

    const fetchValueOptions = async () => {
        try {
            const StageData = await getStage();
            const rawData = await getRawMaterial();
            const updatedFormConfig = formConfig.map((config) => {
                if (config.type === "singleSelect" && config.field === 'stage_id_fk') {      
                    return {
                        ...config,
                        valueOptions: StageData,
                    };
                }
                else if (config.type === "singleSelect" && config.field === 'raw_material_id_fk') {                
                    return {
                        ...config,
                        valueOptions: rawData,
                    };
                }
                return config;
            });
            // console.log("config", updatedFormConfig);
            setFormConfig(updatedFormConfig);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleChange = (field, value) => {
        setFormState((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    useEffect(() => {
        fetchData();
    }, [reload]);

    async function fetchData() {
        const response = await getSubStages();

        setData([...response]);
        console.log("get Substage", response)
    }

    const handleSave = async (e) => {
        e.preventDefault()
        try {
            await addSubStage(formState);

            toggleForm();
            setReload(!reload);

        } catch (error) {
            console.log(error);
        }
    };


    const handleDelete = async (id) => {
        try {
            const response = await deleteSubStage(id);
            console.log(response);
        } catch (error) {

        }
    }

    const handleUpdate = async (e,data) => {
        e.preventDefault()
        console.log("update", data)
        const response = await updateSubStage(data);
        console.log("rest update", response);
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
                column={loadformConfig}
                formState={formState}
                data={data}
                title="Sub Stages"
             />
            <DynamicFormDialog
                title="Add Sub Stage"
                open={open}
                handleClose={toggleForm}
                formState={formState}
                handleChange={handleChange}
                handleSave={handleSave}
                formConfig={loadformConfig}
            />
        </div>
    )
}

export default MasterSubStage