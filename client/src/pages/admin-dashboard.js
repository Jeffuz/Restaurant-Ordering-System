import React, { useEffect } from "react";
import AdminNavbar from "../components/adminNavbar";
import { useState } from "react";
import Admin_Menu from "./admin-menu";
import Admin_analytics from "./admin-analytics";
import Admin_customer from "./admin-customer";
import Admin_table from "./admin-table";
import Admin_orders from "./admin-orders";

const Admin_dashboard = (props) => {
  const [page, setPage] = useState("Menu");
  const [loading, setLoading] = useState(true);

  const { WebSocketService } = props;

  useEffect(() => {
    if (!WebSocketService.socket) {
      WebSocketService.connect("127.0.0.1", "8080", true).then();
    }
    const orderUpdateHandler = () => {
      setLoading(false);
    };

    window.addEventListener("orderUpdate", orderUpdateHandler);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center item-center h-screen">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
          <radialGradient
            id="a12"
            cx=".66"
            fx=".66"
            cy=".3125"
            fy=".3125"
            gradientTransform="scale(1.5)"
          >
            <stop offset="0" stop-color="#FE0435"></stop>
            <stop offset=".3" stop-color="#FE0435" stop-opacity=".9"></stop>
            <stop offset=".6" stop-color="#FE0435" stop-opacity=".6"></stop>
            <stop offset=".8" stop-color="#FE0435" stop-opacity=".3"></stop>
            <stop offset="1" stop-color="#FE0435" stop-opacity="0"></stop>
          </radialGradient>
          <circle
            transform-origin="center"
            fill="none"
            stroke="url(#a12)"
            stroke-width="15"
            stroke-linecap="round"
            stroke-dasharray="200 1000"
            stroke-dashoffset="0"
            cx="100"
            cy="100"
            r="70"
          >
            <animateTransform
              type="rotate"
              attributeName="transform"
              calcMode="spline"
              dur="2"
              values="360;0"
              keyTimes="0;1"
              keySplines="0 0 1 1"
              repeatCount="indefinite"
            ></animateTransform>
          </circle>
          <circle
            transform-origin="center"
            fill="none"
            opacity=".2"
            stroke="#FE0435"
            stroke-width="15"
            stroke-linecap="round"
            cx="100"
            cy="100"
            r="70"
          ></circle>
        </svg>
      </div>
    );
  } else if (page === "Dashboard") {
    return (
      <>
        <div className="flex flex-row">
          <div className="w-[20%]">
            <AdminNavbar setPage={setPage} />
          </div>
          <div className="w-[80%] h-screen">
            <div className="flex flex-col">
              <div className="text-center mt-27 text-black font-Montserrat text-4xl font-bold py-6">
                Dashboard
              </div>
              <div>{/* Component */}</div>
            </div>
          </div>
        </div>
      </>
    );
  } else if (page === "Menu") {
    return <Admin_Menu WebSocketService={WebSocketService} setPage={setPage} />;
  } else if (page === "Orders") {
    return (
      <Admin_orders WebSocketService={WebSocketService} setPage={setPage} />
    );
  }
};

export default Admin_dashboard;
