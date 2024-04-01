"use client";

import {
  faMoneyBill,
  faRankingStar,
  faSquarePollVertical,
  faTableList,
  faTriangleExclamation,
  faUser,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

const UserSideNav = ({ sidebarOpen, setSidebarOpen }) => {
  const pathname = usePathname();
  const router = useRouter();

  const [activePage, setActivePage] = useState(
    pathname.split("/")[3] ? pathname.split("/")[3] : "/"
  );
  const [activeIcon, setActiveIcon] = useState(faUser);
  const activeTextColor = "text-white";
  const activeBgColor = "bg-blue-600";
  const activeBgHoverColor = "hover:bg-blue-700";

  const handleNavigation = (route) => {
    router.push(route);
    setSidebarOpen(false);
  };

  const sideNavLinks = [
    {
      id: "/",
      name: "Students",
      icon: faUser,
    },
    {
      id: "exams",
      name: "Exams",
      icon: faTableList,
    },
    {
      id: "survey",
      name: "Survey",
      icon: faSquarePollVertical,
    },
    {
      id: "payments",
      name: "Payments",
      icon: faMoneyBill,
    },
    {
      id: "ranking",
      name: "Ranking",
      icon: faRankingStar,
    },
    {
      id: "results",
      name: "Results",
      icon: faTriangleExclamation,
    },
    {
      id: "wallet",
      name: "Wallet",
      icon: faWallet,
    },
  ];

  return (
    <aside
      className={`bg-white shadow-sm relative md:fixed top-0 w-full h-full md:w-[240px] mt-[70px] md:flex ${
        sidebarOpen ? "flex" : "hidden"
      }`}
    >
      <div className="container mx-auto py-4 px-2">
        {sideNavLinks.map((link) => (
          <button
            className={`w-full text-start py-2 px-4 mb-2 rounded-md 
            ${activePage === link.id ? activeBgColor : ""}
             ${activePage === link.id ? activeTextColor : "text-gray-900 "}
             ${
               activePage === link.id ? activeBgHoverColor : "hover:bg-blue-100"
             }
            `}
            onClick={() => {
              handleNavigation(`/admin/${link.id}`);
              setActivePage(link.id);
              setActiveIcon(link.icon);
            }}
            key={link.id}
          >
            <FontAwesomeIcon
              icon={link.icon}
              className={`h-5 w-5 mr-2 ${
                activeIcon === link.icon ? activeTextColor : "text-gray-900"
              }`}
            />
            <span className="ml-2">{link.name}</span>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default UserSideNav;
