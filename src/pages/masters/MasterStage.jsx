import React, { useEffect, useState } from 'react';
import { getCategory, getRawMaterial } from '../../services/handlers/get_dropdowns';
import DynamicFormDialog from '../../components/dynamic_form_dialogue';
import MasterTable from '../../components/master_table';
import { getStages } from '../../services/handlers/get_masters';
import { addStage } from '../../services/handlers/add_masters';
import { deleteStage } from '../../services/handlers/delete_masters';
import { updateStage } from '../../services/handlers/update_masters';

const MasterStage = () => {

    const formConfig = [
        { field: 'stage_name', headerName: 'Stage Name', width: 200, editable: true, active: true },
        { field: 'stage_alias', headerName: 'Stage Alias', width: 200, editable: true, active: true },
        { field: 'sequence_number', headerName: 'Sequence Number', width: 150, type: "number", editable: true, active: true },
        { field: 'raw_material_id_fk', headerName: 'Selected Raw Material', width: 180, type: "singleSelect", valueOptions: [], editable: true, active: true },
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
            const data = await getRawMaterial();
            const updatedFormConfig = formConfig.map((config) => {
                if (config.type === "singleSelect") {
                    return {
                        ...config,
                        valueOptions: data,
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
        const response = await getStages();

        setData([...response]);
        console.log("get stage", response)
    }

    const handleSave = async (e) => {
        e.preventDefault()
        try {
            await addStage(formState);

            toggleForm();
            setReload(!reload);

        } catch (error) {
            console.log(error);
        }
    };


    const handleDelete = async (id) => {
        try {
            const response = await deleteStage(id);
            console.log(response);
        } catch (error) {

        }
    }

    const handleUpdate = async (e,data) => {
        e.preventDefault()
        console.log("update", data)
        const response = await updateStage(data);
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
                title="Stages"
            />
            <DynamicFormDialog
                title="Add Stage"
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

export default MasterStage