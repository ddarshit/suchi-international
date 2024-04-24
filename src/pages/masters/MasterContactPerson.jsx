import React,{useEffect, useState} from 'react';
import { getCategory } from '../../services/handlers/get_dropdowns';
import DynamicFormDialog from '../../components/dynamic_form_dialogue';
import MasterTable from '../../components/master_table';

const MasterContactPerson = () => {
    const formConfig = [
        { field: 'name', headerName: 'Person Name', width: 200, editable: true, active: true },
        { field: 'alias', headerName: 'Person Alias', width: 200, editable: true, active: true },
        { field: 'table', headerName: 'Table Name', width: 200, editable: true, active: true },
        { field: 'person_designation', headerName: 'Person Designation', width: 200, editable: true, active: true },
        { field: 'contact_id', headerName: 'Select ID', width: 180, type: "singleSelect", valueOptions: [], editable: true, active: true },
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
            field: 'added_date',
            headerName: 'Added Date',
            type: "date",
            width: 180,
        },
        {
            field: 'modified_date',
            headerName: 'Modified Date',
            type: "date",
            width: 180,
        },

    ];

    const data = [
        {
            id: 1,
            name: "psr",
            alias: "Fancy Bowl",
            table: "Table1",
            contact_id: 10,
            person_designation: "abc",
            added_by: "kssjsjjs",
            modified_by: "jjsjjd",
            added_date: new Date(0),
            modified_date: new Date(0),
        },
        {
            id: 2,
            name: "ascx",
            alias: "Fancy Bowl",
            table: "Table2",
            contact_id: 10,
            person_designation: "abc",
            added_by: "kssjsjjs",
            modified_by: "jjsjjd",
            added_date: new Date(0),
            modified_date: new Date(0),
        },
    ]

    const [loadformConfig, setFormConfig] = useState(formConfig);
    const initialFormState = {
        name: '',
        alias: '',
        table: '',
        person_designation: ''
    };

    useEffect(() => {
        const fetchValueOptions = async () => {
            try {
                const updatedFormConfig = [...formConfig];

                const singleSelectFields = updatedFormConfig.filter(
                    (field) => field.type === 'singleSelect'
                );

                for (const field of singleSelectFields) {
                    const data = await getCategory();

                    field.valueOptions = data.map((item) => ({
                        value: item.id,
                        label: item.value,
                    }));
                }

                setFormConfig(updatedFormConfig);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchValueOptions();
    }, []);

    const [formState, setFormState] = useState(initialFormState);
    const [open, setOpen] = useState(false);
    const handleChange = (field, value) => {
        setFormState((prevState) => ({
            ...prevState,
            [field]: value,
        }));
        console.log(formState)
    };

    const handleSave = (e) => {
        e.preventDefault()
        // Perform the save action with the formState data
        console.log(formState);
    };

    

    const toggleForm= ()=> {
        setOpen(!open);
      }

    return (
        <div style={{width: "75%",position: "fixed"}}> 
            <MasterTable toggleForm={toggleForm} column={formConfig} data={data} title="Contact Person Mapping" />
            <DynamicFormDialog
                title="Add Contact Person Mapping"
                open={open}
                handleClose={()=>{setOpen(!open)}}
                formState={formState}
                handleChange={handleChange}
                handleSave={handleSave}
                formConfig={loadformConfig}
            />
        </div>
    )
}

export default MasterContactPerson