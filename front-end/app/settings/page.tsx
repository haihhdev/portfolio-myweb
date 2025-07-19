"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import { Sun, Moon } from "lucide-react";
import SettingsSidebar from "@/components/settings/settings-sidebar";
import ProfileEditor from "@/components/settings/profile-editor";
import AboutEditor from "@/components/settings/about-editor";
import ProjectsManager from "@/components/settings/projects-manager";
import ResumeEditor from "@/components/settings/resume-editor";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [darkMode, setDarkMode] = useState(false);

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const isDark =
      savedDarkMode !== null ? savedDarkMode === "true" : systemPrefersDark;
    setDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

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
      {/* Dark Mode Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleDarkMode}
          className="p-3 rounded-lg bg-white dark:bg-gray-800 shadow-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </motion.button>
      </div>

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
