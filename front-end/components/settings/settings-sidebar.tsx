"use client";

import { motion } from "framer-motion";
import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Settings,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

interface SettingsSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function SettingsSidebar({
  activeTab,
  setActiveTab,
}: SettingsSidebarProps) {
  const menuItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "about", label: "About Me", icon: FileText },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "resume", label: "Resume", icon: GraduationCap },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Settings className="text-blue-600 dark:text-blue-400" size={24} />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Settings
            </h1>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Portfolio
          </Link>
        </div>

        {/* Mobile Tabs */}
        <div className="flex overflow-x-auto gap-2 mt-4 pb-2">
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === item.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 z-40">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <Settings className="text-blue-600 dark:text-blue-400" size={28} />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Settings
            </h1>
          </div>

          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            Back to Portfolio
          </Link>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <item.icon size={20} />
                {item.label}
              </motion.button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
