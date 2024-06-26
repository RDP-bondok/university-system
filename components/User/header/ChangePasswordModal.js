"use client";

import PasswordInput from "@/components/PasswordInput";
import LoadingSpinner from "@/components/LoadingSpinner";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";

const ChangePasswordModal = ({ id, showModal, setShowModal }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
    setOldPassword("");
    setNewPassword("");
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (loading || submitDisabled) return;

    setLoading(true);
    setSubmitDisabled(true);

    try {
      const response = await axios.put(`/api/user/${id}/change-password`, {
        oldPassword,
        newPassword,
      });
      if (response.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Password changed successfully",
          icon: "success",
        });
        setOldPassword("");
        setNewPassword("");
        setLoading(false);
        setShowModal(false);
      }
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : "Network error occurred";
      Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error",
      });
    } finally {
      setLoading(false);
      setSubmitDisabled(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-10 ${
        showModal ? "" : "hidden"
      }`}
    >
      <div
        className="absolute inset-0 bg-black opacity-25"
        onClick={handleCloseModal}
      ></div>
      <div className="bg-white rounded-lg p-6 z-50">
        {loading && <LoadingSpinner />}
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Change Password</h2>
          <form>
            <div className="mb-4">
              <label className="block mb-2">Old Password</label>
              <PasswordInput
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">New Password</label>
              <PasswordInput
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-gray-500 hover:bg-gray-700 text-white rounded-lg px-4 py-2 mr-2"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white rounded-lg px-4 py-2"
                onClick={handleChangePassword}
                disabled={submitDisabled}
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
