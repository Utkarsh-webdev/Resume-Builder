import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const Dashboard = () => {
  const [allResumes, setAllResumes] = useState([]);

  const fetchAllResumes = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.RESUME.GET_ALL);

      if (response.data.success) {
        setAllResumes(response.data.resumes || []);
      }
    } catch (error) {
      console.error("Error fetching resumes:", error);
    }
  };

  useEffect(() => {
    fetchAllResumes();
  }, []);

  const handleCreateResume = async () => {
    try {
      const response = await axiosInstance.post(API_PATHS.RESUME.CREATE, {
        title: "Untitled Resume",
      });

      if (response.data.success) {
        fetchAllResumes();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-4 md:gap-7 pt-6 pb-6">

        {/* Create Resume Card */}
        <div
          onClick={handleCreateResume}
          className="h-[300px] flex flex-col gap-5 items-center justify-center bg-white rounded-lg border-2 border-dashed border-purple-200 cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-all"
        >
          <div className="w-12 h-12 flex items-center justify-center bg-purple-200 rounded-full">
            <LuPlus className="text-xl text-purple-500" />
          </div>

          <h3 className="font-medium text-gray-700">
            Add New Resume
          </h3>
        </div>

        {/* Resume Cards */}
        {allResumes.map((resume) => (
          <div
            key={resume._id}
            className="bg-white rounded-lg shadow border p-5"
          >
            <h2 className="text-lg font-semibold">
              {resume.title}
            </h2>

            <p className="text-gray-500 text-sm mt-2">
              Updated{" "}
              {new Date(resume.updatedAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;