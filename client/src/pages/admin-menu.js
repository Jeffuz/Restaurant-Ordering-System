import React, { useEffect } from "react";
import MenuManager from "../components/admin-menu/MenuManager";
import AdminNavbar from "../components/adminNavbar";

import WebSocketService from "../WebSocketService";

const Admin_Menu = (props) => {
  /*useEffect(() => {
        if (!WebSocketService.socket){
            WebSocketService.connect('127.0.0.1', '8080', true)
            .then(
        }
    }, []);*/

  const { WebSocketService, setPage } = props;

  return (
    <div>
      <div className="flex flex-row">
        <div className="w-[20%]">
          <AdminNavbar setPage={setPage} />
        </div>
        <div className="w-[80%] px-8">
          {" "}
          {/* Adjust the width as needed */}
          <MenuManager WebSocketService={WebSocketService} />
        </div>
      </div>
    </div>
  );
};

export default Admin_Menu;
