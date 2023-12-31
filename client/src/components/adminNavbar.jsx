import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import {
  MdRestaurantMenu,
  MdTableRestaurant,
  MdBorderColor,
} from "react-icons/md";
import { TbDeviceAnalytics } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";

const AdminNavbar = ({ setPage }) => {
  const menuItems = [
    { label: "Menu", icon: "MdRestaurantMenu", to: "/admin-menu" },
    { label: "Orders", icon: "MdBorderColor", to: "/admin-orders" },
  ];

  return (
    <div className="bg-white flex flex-col h-screen">
      <div className="p-4 mx-auto text-4xl font-bold text-light-secondary">
        <Link to="/">115A's Diner</Link>
      </div>
      <div className="flex flex-col gap-8 p-7">
        {menuItems.map((item, index) => (
          <button
            className="flex items-center"
            onClick={() => setPage(item.label)}
            key={index}
          >
            <div className="flex gap-4 items-center">
              <span className="text-3xl">{getIcon(item.icon)}</span>
              <span className="text-2xl font-normal">{item.label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

const getIcon = (iconName) => {
  switch (iconName) {
    case "FaHome":
      return <FaHome />;
    case "MdRestaurantMenu":
      return <MdRestaurantMenu />;
    case "MdTableRestaurant":
      return <MdTableRestaurant />;
    case "MdBorderColor":
      return <MdBorderColor />;
    case "TbDeviceAnalytics":
      return <TbDeviceAnalytics />;
    case "CgProfile":
      return <CgProfile />;
    default:
      return null;
  }
};

export default AdminNavbar;
