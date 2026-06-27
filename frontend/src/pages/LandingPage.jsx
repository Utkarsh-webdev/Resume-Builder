import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroSection from "../assets/hero-section.jpg";

const LandingPage = () => {
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    navigate("/dashboard");
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-16">
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          Resume Builder
        </h1>

        <button
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={() => {
            setCurrentPage("login");
            setOpenAuthModal(true);
          }}
        >
          Login / Sign Up
        </button>
      </header>

      {/* Hero Section */}
      <section className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-5xl font-bold leading-tight">
            Build Your Professional Resume in Minutes
          </h2>

          <p className="text-gray-600 mt-5">
            Create beautiful ATS-friendly resumes with modern templates and
            download them instantly.
          </p>

          <button
            onClick={handleCTA}
            className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Get Started
          </button>
        </div>

        <div>
          <img
            src={heroSection}
            alt="Resume Builder"
            className="w-full max-w-lg mx-auto"
          />
        </div>
      </section>

      {/* Auth Modal Placeholder */}
      {openAuthModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-3">
              {currentPage === "login" ? "Login" : "Sign Up"}
            </h2>

            <button
              onClick={() => setOpenAuthModal(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;