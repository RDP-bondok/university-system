"use client";

import { faBars, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import ChangePasswordModal from "./ChangePasswordModal";
import { useRouter } from "next/navigation";

const UserNavbar = ({ id, toggleSidebar }) => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/user/${id}`);
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
      Swal.fire(
        "Error",
        "Failed to fetch user details. Please try again later.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

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

  const renderProfileContent = () => {
    if (loading) {
      return (
        <>
          <div className="flex flex-col items-center">
            <div className="animate-pulse skeleton-line w-40 h-4 mb-2 bg-slate-200 rounded"></div>
            <div className="animate-pulse skeleton-line w-56 h-3 mb-2 bg-slate-200 rounded"></div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="flex flex-col items-center">
            <p className="mb-0">{userData.userData?.fullName}</p>
            <p className="mb-0 font-normal text-s text-gray-500">
              {userData.userContactData?.email}
            </p>
          </div>
        </>
      );
    }
  };

  const handleToggleDropdown = () => {
    setDropDownOpen((prevState) => !prevState);
  };

  const handleShowModal = () => {
    setShowModal(true);
    setDropDownOpen(false);
  };

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
        <div className="middle-part flex flex-col items-center">
          <div className="name font-bold">{renderProfileContent()}</div>
        </div>

        <div className="right-part flex gap-2">
          <div className="relative">
            <button
              className="focus:outline-none hidden-arrow flex items-center"
              type="button"
              onClick={handleToggleDropdown}
            >
              {loading ? (
                <div className="animate-pulse rounded-full bg-slate-200 h-10 w-10"></div>
              ) : (
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img (31).webp"
                  className="rounded-full"
                  width="40"
                  height="40"
                  alt="Avatar"
                  loading="lazy"
                />
              )}

              <FontAwesomeIcon icon={faCaretDown} className="h-4 w-4 ml-2" />
            </button>
            {dropDownOpen && (
              <ul
                ref={dropdownRef}
                className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-lg"
              >
                <li>
                  <button
                    className="w-full text-left py-2 px-4 block whitespace-no-wrap hover:bg-gray-100"
                    onClick={handleShowModal}
                  >
                    Change Password
                  </button>
                </li>
                {/* <li>
                  <a
                    href="#"
                    className="w-full text-left py-2 px-4 block whitespace-no-wrap hover:bg-gray-100"
                  >
                    Settings
                  </a>
                </li> */}
                <li>
                  <button
                    className="w-full text-left py-2 px-4 block whitespace-no-wrap hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
      <div style={{ display: showModal ? "block" : "none" }}>
        <ChangePasswordModal
          id={id}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </div>
    </>
  );
};

export default UserNavbar;
