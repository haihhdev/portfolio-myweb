"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Save, Plus, X, Eye, Trash2 } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_ABOUT_API_URL + "/api/about";

export default function AboutEditor() {
  const [formData, setFormData] = useState({
    description: "",
    skills: [],
    certifications: [],
  } as any);
  const [aboutId, setAboutId] = useState<string | null>(null);
  const [newSkill, setNewSkill] = useState("");
  const [previewMode, setPreviewMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  // Fetch about data on mount
  useEffect(() => {
    const fetchAbout = async () => {
      setIsFetching(true);
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch about data");
        const data = await res.json();
        if (data && data._id) {
          setFormData({
            description: data.description || "",
            skills: data.skills || [],
            certifications: data.certifications || [],
          });
          setAboutId(data._id);
        } else {
          setFormData({ description: "", skills: [], certifications: [] });
          setAboutId(null);
        }
      } catch (error) {
        toast.error("Failed to fetch about data");
      } finally {
        setIsFetching(false);
      }
    };
    fetchAbout();
  }, []);

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData((prev: any) => ({ ...prev, description: e.target.value }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData((prev: any) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData((prev: any) => ({
      ...prev,
      skills: prev.skills.filter((skill: string) => skill !== skillToRemove),
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      let res, data;
      if (aboutId) {
        // Update
        res = await fetch(API_URL, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        data = await res.json();
        if (!res.ok) throw new Error(data.message || "Update failed");
        toast.success("About section updated successfully!");
      } else {
        // Create
        res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        data = await res.json();
        if (!res.ok) throw new Error(data.message || "Create failed");
        setAboutId(data._id);
        toast.success("About section created successfully!");
      }
      setFormData({
        description: data.description || "",
        skills: data.skills || [],
        certifications: data.certifications || [],
      });
    } catch (error: any) {
      toast.error(error.message || "Failed to save about section");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!aboutId) return;
    if (!window.confirm("Are you sure you want to delete the About section?"))
      return;
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/${aboutId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setFormData({ description: "", skills: [], certifications: [] });
      setAboutId(null);
      toast.success("About section deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete about section");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            About Me
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Edit your biography and technical skills
          </p>
        </div>
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setPreviewMode(!previewMode)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            <Eye size={18} />
            {previewMode ? "Edit" : "Preview"}
          </motion.button>
          {aboutId && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDelete}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg transition-colors"
            >
              <Trash2 size={18} />
              Delete
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            disabled={isLoading}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save size={18} />
            )}
            Save Changes
          </motion.button>
        </div>
      </div>

      {isFetching ? (
        <div className="text-gray-500">Loading...</div>
      ) : previewMode ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
        >
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              About Me
            </h3>
            <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
              {formData.description
                .split("\n")
                .map((paragraph: string, index: number) => (
                  <p
                    key={index}
                    className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4"
                  >
                    {paragraph}
                  </p>
                ))}
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Technical Skills
              </h4>
              <div className="flex flex-wrap gap-3">
                {formData.skills.map((skill: string) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Biography Editor */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Biography
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                About Me Description
              </label>
              <textarea
                value={formData.description}
                onChange={handleDescriptionChange}
                rows={12}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 dark:bg-gray-700 dark:text-white hover:border-blue-400 dark:hover:border-blue-500 resize-none"
                placeholder="Write your biography here..."
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {formData.description.length} characters
              </p>
            </div>
          </motion.div>

          {/* Skills Editor */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Technical Skills
            </h3>

            {/* Add New Skill */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Add New Skill
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 dark:bg-gray-700 dark:text-white hover:border-blue-400 dark:hover:border-blue-500"
                  placeholder="Enter skill name"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={addSkill}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <Plus size={16} />
                  Add
                </motion.button>
              </div>
            </div>

            {/* Skills List */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                Current Skills ({formData.skills.length})
              </label>
              <div className="flex flex-wrap gap-2 max-h-80 overflow-y-auto">
                {formData.skills.map((skill: string) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium group hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                  >
                    {skill}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeSkill(skill)}
                      className="text-blue-600 dark:text-blue-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                    >
                      <X size={14} />
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
