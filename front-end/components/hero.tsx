"use client";

import { motion } from "framer-motion";
import {
  Download,
  Mail,
  Github,
  Linkedin,
  Mail as MailIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Hero() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/users/")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <span className="text-gray-700 dark:text-gray-300">Loading...</span>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <span className="text-red-500">Failed to load user data.</span>
      </section>
    );
  }

  const { name, title, description, avatarUrl, socials, cvUrl } = user;

  const scrollToAbout = () => {
    const element = document.querySelector("#about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col md:flex-row items-center justify-between relative bg-white dark:bg-gray-900 px-4 sm:px-8 lg:px-16"
    >
      {/* Left: Text Content */}
      <div className="flex-1 flex flex-col justify-center items-start md:items-start pt-16 md:pt-0 max-w-2xl w-full ml-[20vh] mr-[20vh]">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-4">
          Hi, I'm <span className="text-blue-600">{name}</span>
        </h1>
        <h2 className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 mb-6 font-medium">
          {title}
        </h2>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-xl">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full">
          <a
            href="#contact"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors duration-200 shadow-lg w-full sm:w-auto"
          >
            <Mail size={20} /> Get In Touch
          </a>
          {cvUrl && (
            <a
              href={cvUrl}
              download
              className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-600 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg font-semibold transition-colors duration-200 w-full sm:w-auto"
            >
              <Download size={20} /> Download CV
            </a>
          )}
        </div>
        <div className="flex gap-6 mt-2">
          {socials?.github && (
            <a
              href={socials.github}
              aria-label="Github"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={20} />
            </a>
          )}
          {socials?.linkedin && (
            <a
              href={socials.linkedin}
              aria-label="LinkedIn"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={20} />
            </a>
          )}
          {socials?.email && (
            <a
              href={`mailto:${socials.email}`}
              aria-label="Email"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <MailIcon size={20} />
            </a>
          )}
        </div>
      </div>

      {/* Right: Avatar + Wave Button */}
      <div className="flex-1 flex flex-col items-center justify-center relative mt-12 md:mt-0">
        <div className="w-72 h-72 md:w-96 md:h-96 rounded-full border-8 border-white dark:border-gray-900 shadow-xl flex items-center justify-center relative overflow-hidden bg-gray-200 dark:bg-gray-800">
          <img
            src={avatarUrl || "/images/j97.jpg"}
            alt={name + " Avatar"}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>
    </section>
  );
}
