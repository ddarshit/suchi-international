import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function FixedSizeGrid({columns,rows}) {


  return (
    <div style={{ width: '100%' }}>
      <div style={{ height: 350, width: '100%' }}>
        <DataGrid rows={[]} columns={columns}  sx={{
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
              }}/>
      </div>
    </div>
  );
}