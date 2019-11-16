import React, { useState, useEffect } from "react";
import DataTable from "./DataTable";
import Nav from "./Nav";
import API from "../utils/API";
import "../styles/DataArea.css";

const DataArea = () => {

  const [users, setUsers] = useState([{}]);
  const [order, setOrder] = useState("descend");
  const [filteredUsers, setFilteredUsers] = useState([{}]);
  const [headings, setHeadings] = useState([
    { name: "Image", width: "10%" },
    { name: "Name", width: "10%" },
    { name: "Phone", width: "20%" },
    { name: "Email", width: "20%" },
    { name: "DOB", width: "10%" }
  ])

const handleSort = heading => {
  console.log(heading);
  if (order === "descend") {
    setOrder({
      order: "ascend"
    })
  } else {
    setOrder({
      order: "descend"
    })
  }

  const compareFnc = (a, b) => {
    if (order === "ascend") {
      // account for missing values
      if (a[heading] === undefined) {
        return 1;
      } else if (b[heading] === undefined) {
        return -1;
      }
      // numerically
      else if (heading === "name") {
        return a[heading].first.localeCompare(b[heading].first);
      } else {
        return a[heading] - b[heading];
      }
    } else {
      // account for missing values
      if (a[heading] === undefined) {
        return 1;
      } else if (b[heading] === undefined) {
        return -1;
      }
      // numerically
      else if (heading === "name") {
        return b[heading].first.localeCompare(a[heading].first);
      } else {
        return b[heading] - a[heading];
      }
    }

  }
    const sortedUsers = filteredUsers.sort(compareFnc);
    setFilteredUsers({ filteredUsers: sortedUsers });
  };

const handleSearchChange = event => {
  console.log(event.target.value);
  const filter = event.target.value;
  const filteredList = users.filter(item => {
    // merge data together, then see if user input is anywhere inside
    let values = Object.values(item)
      .join("")
      .toLowerCase();
    return values.indexOf(filter.toLowerCase()) !== -1;
  });
  setFilteredUsers({ filteredUsers: filteredList });
  };


  useEffect(() => {
    API.getUsers().then(results => {
      // console.log(results);
      setUsers({
        users: results.data.results,
      });
      setFilteredUsers({
        filteredUsers: results.data.results
      });
    });
  }, []);

  return (
    <>
    <Nav handleSearchChange={handleSearchChange} />
    <div className="data-area">
      <DataTable
        headings={headings}
        users={filteredUsers}
        handleSort={handleSort}
      />
    </div>
    </>
  );
}

export default DataArea;
