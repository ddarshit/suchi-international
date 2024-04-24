import React from "react";
import Imageslider from "./Imageslider";
import AddressForm from "../form/address_form";
import MasterDetails from "./MasterDetails";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ContactCard from "../form/contact_card";

function Capitalize(str) {
  str = str.toString();
  str = str.replace(/_/g, " ");
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const MasterDisplay = ({ handleClose, data }) => {
  console.log("view Data", data);

  return (
    <div className="flex flex-col h-[100%] ">
      <div className="bg-[#f5f5f5] relative overflow-x-hidden w-full ">
        <AppBar sx={{ position: "sticky" }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h7" component="div">
              {data.name} Details
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <div className="mt-5">
          {/* <span>Images : </span> */}
          <Imageslider />
        </div>
        <div className="my-6 mx-16 py-3 bg-white rounded-lg">
          <div className="mx-8">
            <MasterDetails data={data} />
          </div>

          {Object.entries(data).map(([key, val]) => {
            if (key.includes("address")) {
              console.log("address", val);
              return (
                <div className="mx-6" key={key}>
                  <AddressForm
                    name={Capitalize(key)}
                    data={val}
                    readonly={true}
                  />
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default MasterDisplay;
