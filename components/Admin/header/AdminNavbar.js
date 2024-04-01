"use client";

import { faBars, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const UserNavbar = ({ id, toggleSidebar }) => {
  const [loading] = useState(true);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest(".relative")
      ) {
        setDropDownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const handleLogout = () => {
    Swal.fire({
      title: "Logout",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem("userData");
        router.push("/");
      }
    });
  };

  return (
    <>
      <nav className="bg-white shadow w-full fixed top-0 flex justify-between items-center h-[70px] px-2 z-50">
        <button
          className="focus:outline-none md:hidden"
          onClick={toggleSidebar}
        >
          <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
        </button>
        <div className="brand hidden md:inline-block">
          <h3>NINU</h3>
          <h6 className="text-body-secondary">university system</h6>
        </div>
          <div className="name font-bold">Admin Panel</div>
        <button
          className="rounded border border-red-500 py-2 px-4 block whitespace-no-wrap hover:bg-red-600 hover:text-white"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>
    </>
  );
};

export default UserNavbar;
