"use client";
import { useState } from "react";
import ChangePasswordModal from "@/components/User/header/ChangePasswordModal";
import AdminNavbar from "@/components/Admin/header/AdminNavbar";
import AdminSideNav from "@/components/Admin/header/AdminSideNav";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header>
        <AdminNavbar
          toggleSidebar={() =>
            setSidebarOpen((prevSidebarOpen) => !prevSidebarOpen)
          }
        />
        <AdminSideNav
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      </header>
      <main>
        <div className={`md:ps-[240px] ${sidebarOpen ? "" : "pt-[70px]"} `}>
          {children}
        </div>
      </main>
    </>
  );
};

export default Layout;
