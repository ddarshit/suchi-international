import * as React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { MdPreview } from "react-icons/md";
import MasterDisplay from "../components/view-master/MasterDisplay";
import { Button, Modal } from "@mui/material";
import { KeyboardArrowLeft } from "@mui/icons-material";
import {
  GridRowModes,
  DataGrid,
  // GridToolbarContainer,
  GridActionsCellItem,
} from "@mui/x-data-grid";

import DynamicFormDialog from "./dynamic_form_dialogue";

export default function MasterTable(props) {
  const [rows, setRows] = React.useState(props.data);
  console.log("tb row", rows);
  const [rowModesModel, setRowModesModel] = React.useState({});
  // const [updateData, setUpdateData] = React.useState({});

  const [open, setOpen] = React.useState(false);
  const [updateForm, setUpdateForm] = React.useState({});
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [openDetail, setOpenDetail] = React.useState(false);
  const [masterData, setMasterData] = React.useState({});

  React.useEffect(() => {
    setRows(props.data);
  }, [props.data]);

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id) => () => {
    const updateData = rows.filter((row) => row.id === id);

    const newData = updateData[0];
    setUpdateForm(newData);
    setOpen(true);
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
    props.handleDelete(id);
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleOtherDetails = (id) => () => {
    console.log(id);
    const showData = rows.filter((item) => item.id === id);
    const newData = showData[0];
    setMasterData(newData);
    setOpenDetail(true);
  };

  const columns = [
    ...props.column,

    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 110,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon sx={{ color: "#673ab7" }} />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon sx={{ color: "red" }} />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  if (props.canView) {
    const len = columns.length;
    const obj = {
      field: "view_details",
      type: "actions",
      headerName: "View Details",
      width: 150,
      cellClassName: "actions",
      getActions: ({ id }) => [
        <Button onClick={handleOtherDetails(id)}>
          <MdPreview size={25} />
        </Button>,
      ],
    };
    columns.splice(len - 1, 0, obj);
  }

  const handleChange = (field, value) => {
    setUpdateForm((prevState) => ({
      ...prevState,
      [field]: value,
    }));
    console.log("change");
  };

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      await props.handleUpdate(e,updateForm);
      setOpen(false);
    } catch (error) { }
  };

  const filteredList = columns.filter((item) => item.hide === true);

  const hiddenCols = filteredList.reduce((acc, item) => {
    acc[item.field] = false;
    return acc;
  }, {});

  return (
    <>
      <div>
        <Modal
          open={openDetail}
        // onClose={()=>{setOpenDetail(false)}}
        >
          <React.Fragment>
            <MasterDisplay
              handleClose={() => {
                setOpenDetail(false);
              }}
              data={masterData}
            />
          </React.Fragment>
        </Modal>
      </div>
      <div>

        <Box>
          <DynamicFormDialog
            open={open}
            title="Edit Data"
            handleClose={handleClose}
            formState={updateForm}
            handleCheckBox={props.handleCheckBox}
            handleChange={handleChange}
            handleSave={handleUpdate}
            formConfig={props.column}
          />
        </Box>

      </div>

      <div className="mx-12">
        <Link to="/Masters">
          {/* <button className="text-white bg-suchi hover:bg-suchi-hover focus:ring-1 focus:ring-purple-300 font-medium rounded-md text-base px-5 py-2 mb-2 mt-6">
            <KeyboardArrowLeft />
          </button> */}
        </Link>
        <div className="mt-20 flex justify-between mx-2">
          <h1 className="font-bold text-3xl underline underline-offset-2 decoration-2 decoration-[#673ab7]">
            {props.title}
          </h1>
          <button
            type="button"
            onClick={props.toggleForm}
            className="text-white bg-suchi hover:bg-suchi-hover focus:ring-1 focus:ring-purple-300 font-medium rounded-md text-base px-5 py-2"
          >
            ADD DATA
          </button>
        </div>
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              height: 550,
              mt: 3,
              width: "100%",
              background: "#fff",

              "& .actions": {
                color: "text.secondary",
              },
              "& .textPrimary": {
                color: "text.primary",
              },

              flex: 1,
            }}
          >
            <DataGrid
              initialState={{
                columns: {
                  columnVisibilityModel: hiddenCols,
                },
              }}
              rows={rows}
              columns={columns}
              editMode="row"
              rowModesModel={rowModesModel}
              onRowModesModelChange={handleRowModesModelChange}
              onRowEditStart={handleRowEditStart}
              onRowEditStop={handleRowEditStop}
              processRowUpdate={processRowUpdate}
              slotProps={{
                toolbar: { setRows, setRowModesModel },
              }}
              sx={{
                width: "auto",
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#673ab7",
                  color: "#fff",
                  // fontSize: 16
                },
                // '.MuiDataGrid-colCell': {
                //   '& .centeredHeaderText': {
                //     textAlign: 'center',
                //   },
                // },
                "& .MuiDataGrid-columnHeaders .MuiDataGrid-withBorderColor": {
                  borderRight: 0.5,
                  borderLeft: 0.5,
                },
                "& .MuiDataGrid-cell": {
                  borderColor: "gray",
                  borderRight: 0.5,
                  borderLeft: 0.5,
                },
              }}
            />
          </Box>
        </Box>
      </div>
    </>
  );
}
