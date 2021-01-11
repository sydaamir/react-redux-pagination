import React from "react";
import "./App.css";

// local ui components
import CrudTable from "./crudtable";
import SideBar from "./sidebar";

function App() {
  return (
    <div className={`conatiner`}>
      {/* side bar */}
      <div style={{ flex: 1, height: "100%" }}>
        <SideBar />
      </div>
      {/* side bar */}
      {/* crud table */}
      <div
        style={{
          flex: 4,
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          background: "#f0f1f5",
          padding: "15px",
        }}
      >
        <CrudTable />
      </div>
      {/* crud table */}
    </div>
  );
}

export default App;
