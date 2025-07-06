"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Upload,
  Download,
  Calendar,
  MapPin,
  Briefcase,
  GraduationCap,
} from "lucide-react";

interface ResumeItem {
  id: string;
  type: "experience" | "education";
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
}

export default function ResumeEditor() {
  const [resumeItems, setResumeItems] = useState<ResumeItem[]>([
    {
      id: "1",
      type: "experience",
      title: "Senior Full-Stack Developer",
      company: "Tech Innovations Inc.",
      location: "San Francisco, CA",
      period: "2022 - Present",
      description: [
        "Led development of microservices architecture serving 1M+ users",
        "Mentored junior developers and established coding standards",
        "Implemented CI/CD pipelines reducing deployment time by 60%",
      ],
    },
    {
      id: "2",
      type: "experience",
      title: "Full-Stack Developer",
      company: "Digital Solutions LLC",
      location: "New York, NY",
      period: "2020 - 2022",
      description: [
        "Developed and maintained 15+ client web applications",
        "Collaborated with design team to implement pixel-perfect UIs",
        "Optimized application performance improving load times by 40%",
      ],
    },
    {
      id: "3",
      type: "education",
      title: "Master of Science in Computer Science",
      company: "Stanford University",
      location: "Stanford, CA",
      period: "2017 - 2019",
      description: [
        "Specialized in Software Engineering and Human-Computer Interaction",
      ],
    },
    {
      id: "4",
      type: "education",
      title: "Bachelor of Science in Computer Science",
      company: "University of California, Berkeley",
      location: "Berkeley, CA",
      period: "2013 - 2017",
      description: ["Magna Cum Laude, Dean's List for 6 semesters"],
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ResumeItem | null>(null);
  const [activeTab, setActiveTab] = useState<"experience" | "education">(
    "experience"
  );
  const [formData, setFormData] = useState({
    type: "experience" as "experience" | "education",
    title: "",
    company: "",
    location: "",
    period: "",
    description: "",
  });

  const openModal = (item?: ResumeItem, type?: "experience" | "education") => {
    if (item) {
      setEditingItem(item);
      setFormData({
        type: item.type,
        title: item.title,
        company: item.company,
        location: item.location,
        period: item.period,
        description: item.description.join("\n"),
      });
    } else {
      setEditingItem(null);
      setFormData({
        type: type || "experience",
        title: "",
        company: "",
        location: "",
        period: "",
        description: "",
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.company || !formData.period) {
      toast.error("Please fill in all required fields");
      return;
    }

    const itemData: ResumeItem = {
      id: editingItem?.id || Date.now().toString(),
      type: formData.type,
      title: formData.title,
      company: formData.company,
      location: formData.location,
      period: formData.period,
      description: formData.description
        .split("\n")
        .filter((line) => line.trim()),
    };

    if (editingItem) {
      setResumeItems((prev) =>
        prev.map((item) => (item.id === editingItem.id ? itemData : item))
      );
      toast.success(
        `${
          formData.type === "experience" ? "Experience" : "Education"
        } updated successfully!`
      );
    } else {
      setResumeItems((prev) => [...prev, itemData]);
      toast.success(
        `${
          formData.type === "experience" ? "Experience" : "Education"
        } added successfully!`
      );
    }

    closeModal();
  };

  const deleteItem = (id: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setResumeItems((prev) => prev.filter((item) => item.id !== id));
      toast.success("Item deleted successfully!");
    }
  };

  const experienceItems = resumeItems.filter(
    (item) => item.type === "experience"
  );
  const educationItems = resumeItems.filter(
    (item) => item.type === "education"
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Resume Editor
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your work experience and education
          </p>
        </div>
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <Upload size={18} />
            Upload PDF
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Download size={18} />
            Download PDF
          </motion.button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveTab("experience")}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-colors ${
            activeTab === "experience"
              ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
          }`}
        >
          <Briefcase size={18} />
          Work Experience ({experienceItems.length})
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveTab("education")}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-colors ${
            activeTab === "education"
              ? "bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 shadow-sm"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
          }`}
        >
          <GraduationCap size={18} />
          Education ({educationItems.length})
        </motion.button>
      </div>

      {/* Add Button */}
      <div className="flex justify-end">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => openModal(undefined, activeTab)}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors shadow-lg hover:shadow-xl text-white ${
            activeTab === "experience"
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          <Plus size={20} />
          Add {activeTab === "experience" ? "Experience" : "Education"}
        </motion.button>
      </div>

      {/* Timeline */}
      <div className="space-y-6">
        <AnimatePresence>
          {(activeTab === "experience" ? experienceItems : educationItems).map(
            (item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="relative pl-8 border-l-2 border-blue-600 dark:border-blue-400"
              >
                <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {item.title}
                      </h3>
                      <div
                        className={`font-semibold mb-2 ${
                          item.type === "experience"
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-green-600 dark:text-green-400"
                        }`}
                      >
                        {item.company}
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar size={16} />
                          {item.period}
                        </div>
                        {item.location && (
                          <div className="flex items-center gap-1">
                            <MapPin size={16} />
                            {item.location}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => openModal(item)}
                        className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                      >
                        <Edit size={16} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => deleteItem(item.id)}
                        className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </motion.button>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {item.description.map((desc, i) => (
                      <li
                        key={i}
                        className="text-gray-600 dark:text-gray-300 flex items-start"
                      >
                        <span
                          className={`mr-2 ${
                            item.type === "experience"
                              ? "text-blue-600 dark:text-blue-400"
                              : "text-green-600 dark:text-green-400"
                          }`}
                        >
                          •
                        </span>
                        {desc}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {editingItem
                    ? `Edit ${
                        formData.type === "experience"
                          ? "Experience"
                          : "Education"
                      }`
                    : `Add ${
                        formData.type === "experience"
                          ? "Experience"
                          : "Education"
                      }`}
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-500 dark:text-gray-400" />
                </motion.button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="experience">Work Experience</option>
                    <option value="education">Education</option>
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {formData.type === "experience" ? "Job Title" : "Degree"}{" "}
                      *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 dark:bg-gray-700 dark:text-white hover:border-blue-400 dark:hover:border-blue-500"
                      placeholder={
                        formData.type === "experience"
                          ? "Senior Developer"
                          : "Bachelor of Science"
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {formData.type === "experience"
                        ? "Company"
                        : "Institution"}{" "}
                      *
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 dark:bg-gray-700 dark:text-white hover:border-blue-400 dark:hover:border-blue-500"
                      placeholder={
                        formData.type === "experience"
                          ? "Company Name"
                          : "University Name"
                      }
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 dark:bg-gray-700 dark:text-white hover:border-blue-400 dark:hover:border-blue-500"
                      placeholder="City, State"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Period *
                    </label>
                    <input
                      type="text"
                      name="period"
                      value={formData.period}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 dark:bg-gray-700 dark:text-white hover:border-blue-400 dark:hover:border-blue-500"
                      placeholder="2020 - Present"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description (one item per line)
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 dark:bg-gray-700 dark:text-white hover:border-blue-400 dark:hover:border-blue-500 resize-none"
                    placeholder="• Led development of microservices architecture&#10;• Mentored junior developers&#10;• Implemented CI/CD pipelines"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <Save size={18} />
                    {editingItem ? "Update" : "Add"}{" "}
                    {formData.type === "experience"
                      ? "Experience"
                      : "Education"}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={closeModal}
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
