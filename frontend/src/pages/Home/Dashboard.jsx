import React, { useEffect, useState } from "react";
import { LuCirclePlus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import Modal from "../../components/Modal";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import ResumeSummaryCard from "../../components/Cards/ResumeSummaryCard";
import CreateResumeForm from "./CreateResumeForm";

import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const Dashboard = () => {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
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
      console.error("Error creating resume:", error);
    }
  };

  return (
    <DashboardLayout>
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-7 pt-5 pb-5 px-4 md:px-6">
      <div 
        className="h-[280px] flex flex-col gap-3 items-center justify-center bg-white border border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition"
        onClick={() => setOpenCreateModal(true)}
      >
        <div className="w-12 h-12 flex items-center justify-center bg-purple-200/50 rounded-full">
          <LuCirclePlus className="text-xl text-purple-500" />
        </div>
        
        <h3 className="font-medium text-gray-800">Add New Resume</h3>
      </div>

        {/* Resume Cards */}
        {allResumes?.map((resume) => (
          <ResumeSummaryCard
            key={resume._id}
            imgUrl={resume.thumbnailLink}
            title={resume.title}
            lastUpdated={
              resume.updatedAt
                ? moment(resume.updatedAt).format("Do MMM YYYY")
                : ""
            }
            onSelect={() => navigate(`/resume/${resume._id}`)}
          />
        ))}
      </div>

      <Modal 
        isOpen={openCreateModal} 
        onClose={() => setOpenCreateModal(false)}
        hideHeader
      >
        <div>
          <CreateResumeForm />
        </div>
      </Modal>
      
    </DashboardLayout>
  );
};

export default Dashboard;