import React from "react";
import moment from "moment";

function FormatDate(date) {
  return moment(date).format("DD/MM/YYYY");
}

function Capitalize(str) {
  str = str.toString();
  str = str.replace(/_/g, " ");
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const MasterDetails = ({ data }) => {
  // console.log("details", data)
  // const keyValueArray = Object.entries(data);
  return (
    <div className="grid grid-cols-3 text-gray-900 text-lg bg-white rounded-xl">
      {Object.entries(data).map(([key, val]) => {
        if (key === "createdAt" || key === "updatedAt") {
          return (
            <p className=" p-2" key={key}>
              <span className="font-bold">{Capitalize(key)} : </span>
              {FormatDate(val)}
            </p>
          );
        } else if (
          !key.includes("address") &&
          !key.includes("id") &&
          !key.includes("Id")
        ) {
          return (
            <p className="p-2" key={key}>
              <span className="font-bold">{Capitalize(key)} : </span>
              {val?.toString()}
            </p>
          );
        }

        return null;
      })}
    </div>
  );
};

export default MasterDetails;
