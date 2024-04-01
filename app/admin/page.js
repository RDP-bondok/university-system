"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Link from "next/link";
import { useRouter } from "next/navigation";

import AdminNavbar from "@/components/Admin/header/AdminNavbar";
import UsersTable from "@/components/UsersTable";
import LoadingButton from "@/components/LoadingButton";
import Search from "@/components/Admin/Search";

const page = () => {
  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [, setDeletedUser] = useState(null);

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    const adminData = sessionStorage.getItem("adminData");
    if (!adminData) {
      await Swal.fire({
        icon: "warning",
        title: "Please login first",
        text: "You need to login to access the admin page",
        didClose: () => {
          router.push("/");
        },
      });
    } else {
      getUsers();
    }
  };

  const getUsers = async () => {
    try {
      const response = await axios.get("api/users");
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch users. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (id) => {
    let deletedUser;

    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`/api/admin/delete-user/${id}`).then(async () => {
          const userToDelete = await users.find((user) => user._id === id);
          deletedUser = userToDelete;
          setDeletedUser(userToDelete);
          getUsers();
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "User deleted successfully!",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Undo",
          }).then(async (result) => {
            if (result.isConfirmed) {
              await axios
                .post("/api/admin/add-user", deletedUser)
                .then(() => {
                  setDeletedUser(null);
                  getUsers();
                  Swal.fire({
                    icon: "success",
                    title: "Undo Successful",
                    text: "User has been restored!",
                  });
                })
                .catch((error) => {
                  console.error("Error adding user:", error);
                  Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to undo deletion. Please try again later.",
                  });
                });
            }
          });
        });
      }
    });
  };

  return (
    <div className="admin-page h-full">
      <div className="container mx-auto sm:px-4 max-w-full p-6">
        <div className="flex flex-wrap ">
          <div className="relative flex-grow max-w-full flex-1 px-4">
            <div className="header flex items-center justify-between mb-5">
              <h3 className="font-bold">Registered Users</h3>
              <div className="flex gap-2">
                <Search users={users} setFilteredUsers={setFilteredUsers} />
                <Link
                  href="/admin/add-user"
                  className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-blue-600 text-white hover:bg-blue-600"
                >
                  Add User
                </Link>
              </div>
            </div>
            {isLoading ? (
              <LoadingButton />
            ) : (
              <UsersTable users={filteredUsers} deleteUser={deleteUser} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
