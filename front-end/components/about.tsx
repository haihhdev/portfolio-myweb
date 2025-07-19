"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import Image from "next/image";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // State for about data
  const [about, setAbout] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAbout = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_ABOUT_API_URL + "/api/about"
        );
        if (!res.ok) throw new Error("Failed to fetch about data");
        const data = await res.json();
        setAbout(data);
      } catch (err: any) {
        setError(err.message || "Error fetching about data");
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-80 h-80 mx-auto lg:mx-0">
              <Image
                src="/images/hhh2.jpg"
                alt="Profile"
                fill
                className="rounded-2xl object-cover shadow-2xl"
              />
              <div className="absolute inset-0 rounded-2x"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : about ? (
              <>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {about.description}
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    Technical Skills
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {(about.skills || []).map(
                      (skill: string, index: number) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={
                            isInView
                              ? { opacity: 1, scale: 1 }
                              : { opacity: 0, scale: 0.8 }
                          }
                          transition={{
                            duration: 0.5,
                            delay: 0.6 + index * 0.1,
                          }}
                          whileHover={{ scale: 1.05 }}
                          className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors duration-200 cursor-default"
                        >
                          {skill}
                        </motion.span>
                      )
                    )}
                  </div>
                </div>
                {about.certifications && about.certifications.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 mt-6">
                      Certifications
                    </h3>
                    <ul className="list-disc pl-5">
                      {about.certifications.map((cert: any, idx: number) => (
                        <li
                          key={idx}
                          className="text-gray-600 dark:text-gray-300"
                        >
                          {cert.name} - {cert.issuer} ({cert.date})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : null}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
