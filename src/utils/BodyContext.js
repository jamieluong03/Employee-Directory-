import React from "react";

const BodyContext = React.createContext({
    users: {},
    order: "",
    filteredUsers: {},
    headings: []
});

export default BodyContext;