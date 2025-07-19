"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  Save,
  Upload,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Eye,
  FileText,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";

export default function ProfileEditor() {
  const [formData, setFormData] = useState({
    name: "John Doe",
    tagline: "Full-Stack Developer & UI/UX Designer",
    bio: "Creating digital experiences that matter",
    avatar: "/placeholder.svg?height=200&width=200",
    cvUrl: "",
    socialLinks: {
      github: "https://github.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
      twitter: "https://twitter.com/johndoe",
      email: "john.doe@example.com",
    },
  });

  const [previewMode, setPreviewMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch dữ liệu user hiện tại từ API khi mount
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_USER_PROJECT_API_URL + "/api/users/")
      .then((res) => res.json())
      .then((data) => {
        setFormData((prev) => ({
          ...prev,
          name: data.name || prev.name,
          tagline: data.title || prev.tagline,
          bio: data.description || prev.bio,
          avatar: data.avatarUrl || prev.avatar,
          cvUrl: data.cvUrl || prev.cvUrl,
          socialLinks: {
            ...prev.socialLinks,
            github: data.socials?.github || prev.socialLinks.github,
            linkedin: data.socials?.linkedin || prev.socialLinks.linkedin,
            email: data.socials?.email || prev.socialLinks.email,
          },
        }));
      })
      .catch(() => {});
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("social.")) {
      const socialKey = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialKey]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          avatar: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Chuẩn bị dữ liệu đúng định dạng backend
      const payload = {
        socials: {
          github: formData.socialLinks.github,
          linkedin: formData.socialLinks.linkedin,
          email: formData.socialLinks.email,
        },
        name: formData.name,
        title: formData.tagline,
        description: formData.bio,
        avatarUrl: formData.avatar,
        cvUrl: formData.cvUrl,
      };
      const response = await fetch(
        process.env.NEXT_PUBLIC_USER_PROJECT_API_URL + "/api/users/",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) throw new Error("Failed to update profile");
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Profile Settings
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your personal information and social links
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

      {previewMode ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 p-8 rounded-xl"
        >
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <Image
                src={formData.avatar || "/hhh.jpg"}
                alt="Profile"
                fill
                sizes="(max-width: 768px) 100vw, 128px"
                className="rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {formData.name}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
              {formData.tagline}
            </p>
            <p className="text-blue-600 dark:text-blue-400">{formData.bio}</p>
            {formData.cvUrl && (
              <div className="mt-4">
                <motion.a
                  href={formData.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <FileText size={16} />
                  View CV
                  <ExternalLink size={14} />
                </motion.a>
              </div>
            )}
          </div>
        </motion.div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Basic Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Basic Information
            </h3>

            <div className="space-y-6">
              {/* Avatar Upload */}
              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <Image
                    src={formData.avatar || "/placeholder.svg"}
                    alt="Profile"
                    fill
                    sizes="(max-width: 768px) 100vw, 96px"
                    className="rounded-full object-cover border-4 border-gray-200 dark:border-gray-600"
                  />
                </div>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                  >
                    <Upload size={16} />
                    Upload Avatar
                  </motion.div>
                </label>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 dark:bg-gray-700 dark:text-white hover:border-blue-400 dark:hover:border-blue-500"
                  placeholder="Your full name"
                />
              </div>

              {/* Tagline */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tagline
                </label>
                <input
                  type="text"
                  name="tagline"
                  value={formData.tagline}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 dark:bg-gray-700 dark:text-white hover:border-blue-400 dark:hover:border-blue-500"
                  placeholder="Your professional tagline"
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 dark:bg-gray-700 dark:text-white hover:border-blue-400 dark:hover:border-blue-500 resize-none"
                  placeholder="Short bio or description"
                />
              </div>

              {/* CV URL */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <FileText size={16} />
                  CV/Resume URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    name="cvUrl"
                    value={formData.cvUrl}
                    onChange={handleInputChange}
                    className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 dark:bg-gray-700 dark:text-white hover:border-blue-400 dark:hover:border-blue-500"
                    placeholder="https://example.com/cv.pdf"
                  />
                  {formData.cvUrl && (
                    <motion.a
                      href={formData.cvUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
                    >
                      <ExternalLink size={16} />
                      View
                    </motion.a>
                  )}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Enter the URL to your CV/Resume PDF file
                </p>
              </div>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Social Links
            </h3>

            <div className="space-y-6">
              {/* GitHub */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Github size={16} />
                  GitHub
                </label>
                <input
                  type="url"
                  name="social.github"
                  value={formData.socialLinks.github}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 dark:bg-gray-700 dark:text-white hover:border-blue-400 dark:hover:border-blue-500"
                  placeholder="https://github.com/username"
                />
              </div>

              {/* LinkedIn */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Linkedin size={16} />
                  LinkedIn
                </label>
                <input
                  type="url"
                  name="social.linkedin"
                  value={formData.socialLinks.linkedin}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 dark:bg-gray-700 dark:text-white hover:border-blue-400 dark:hover:border-blue-500"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              {/* Twitter */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Twitter size={16} />
                  Twitter
                </label>
                <input
                  type="url"
                  name="social.twitter"
                  value={formData.socialLinks.twitter}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 dark:bg-gray-700 dark:text-white hover:border-blue-400 dark:hover:border-blue-500"
                  placeholder="https://twitter.com/username"
                />
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Mail size={16} />
                  Email
                </label>
                <input
                  type="email"
                  name="social.email"
                  value={formData.socialLinks.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 dark:bg-gray-700 dark:text-white hover:border-blue-400 dark:hover:border-blue-500"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
