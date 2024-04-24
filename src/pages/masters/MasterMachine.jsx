import React,{useEffect, useState} from 'react';
import { getCategory } from '../../services/handlers/get_dropdowns';
import DynamicFormDialog from '../../components/dynamic_form_dialogue';
import MasterTable from '../../components/master_table';
import { getMachine } from '../../services/handlers/get_masters';
import { addMachine } from '../../services/handlers/add_masters';
import { deleteMachine } from '../../services/handlers/delete_masters';
import { updateMachine } from '../../services/handlers/update_masters';

const MasterMachine = () => {
    const formConfig = [
        { field: 'machine_name', headerName: 'Machine Name', flex: 0.5, minWidth: 200, active: true },
        { field: 'machine_alias', headerName: 'Machine Alias', width: 200, active: true },
        { field: 'remark', headerName: 'Remark', width: 200, active: true },
        { field: 'isActive', headerName: '', type: "number", align: "start", headerAlign: 'start', width: 0, hide: true },
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
        const response = await getMachine();

        setData([...response]);
        console.log("get Machine", response)
    }

    const handleSave = async (e) => {
        e.preventDefault()
        try {
            await addMachine(formState);

            toggleForm();
            setReload(!reload);

        } catch (error) {
            console.log(error);
        }
    };


    const handleDelete = async (id) => {
        try {
            const response = await deleteMachine(id);
            console.log(response);
        } catch (error) {

        }
    }

    const handleUpdate = async (e,data) => {
        e.preventDefault()
        console.log("update", data)
        const response = await updateMachine(data);
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
                title="Machine" 
            />
            <DynamicFormDialog
                title="Add Machine"
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

export default MasterMachine