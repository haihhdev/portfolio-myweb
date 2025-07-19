"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import SettingsSidebar from "@/components/settings/settings-sidebar";
import ProfileEditor from "@/components/settings/profile-editor";
import AboutEditor from "@/components/settings/about-editor";
import ProjectsManager from "@/components/settings/projects-manager";
import ResumeEditor from "@/components/settings/resume-editor";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileEditor />;
      case "about":
        return <AboutEditor />;
      case "projects":
        return <ProjectsManager />;
      case "resume":
        return <ResumeEditor />;
      default:
        return <ProfileEditor />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content */}
        <div className="flex-1 lg:ml-64">
          <div className="p-6 lg:p-8">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              {renderContent()}
            </motion.div>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        aria-label="Toast notifications"
      />
    </div>
  );
}
