import React from 'react'
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';

export function GetStarted() {
    const darkMode = useSelector(state => state.mode.darkMode)
    return (
        <section className="flex flex-col items-center text-center px-6 py-20">
            <motion.h2
                className="text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Effortless Collaboration, Seamless Task Management
            </motion.h2>
            <p className="text-lg max-w-2xl">
                A powerful project management tool that keeps your team aligned, efficient, and on track.
            </p>
            <div className="mt-6 flex gap-4">
                <NavLink to="/signup">
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        Get Started
                    </button>
                </NavLink>
                <NavLink to="/login">
                    <button className="px-6 py-3 border rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
                        Login
                    </button>
                </NavLink>
            </div>
        </section>
    )
}


export function AppFeatures() {
    const darkMode = useSelector(state => state.mode.darkMode)

    return (
        <section className={`py-16 ${darkMode ? "bg-gray-800" : "bg-gray-100"} transition-colors duration-300`}>
            <h3 className={`text-3xl font-bold text-center mb-10 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Why Use This Tool?
            </h3>
            <div className="grid md:grid-cols-3 gap-8 px-6 max-w-6xl mx-auto">
                {[
                    { title: "Task & Project Management", desc: "Create, assign, and track tasks easily." },
                    { title: "Real-time Collaboration", desc: "Team discussions and updates in one place." },
                    { title: "Progress Tracking", desc: "Visual timelines and analytics." },
                    { title: "Role-Based Access", desc: "Different permissions for admins, managers, and members." },
                    { title: "Instant Notifications", desc: "Stay updated on deadlines and comments." },
                    { title: "File Sharing & Integrations", desc: "Share docs, integrate with Google Drive, etc." },
                ].map((feature, index) => (
                    <motion.div
                        key={index}
                        className={`p-6 shadow-md rounded-xl transition-colors duration-300
                        ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <h4 className="text-xl font-semibold">{feature.title}</h4>
                        <p className={`mt-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                            {feature.desc}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

export function HowItWorks() {
    const darkMode = useSelector(state => state.mode.darkMode)

    return (
        <section className={`py-16 px-6 text-center transition-colors duration-300 ${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"}`}>
            <h3 className="text-3xl font-bold mb-10">How It Works</h3>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {["Create a Project", "Track & Communicate", "Deliver On Time"].map((step, index) => (
                    <motion.div
                        key={index}
                        className={`p-6 shadow-md rounded-xl transition-colors duration-300
                        ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                    >
                        <h4 className="text-xl font-semibold">Step {index + 1}</h4>
                        <p className={`mt-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                            {step}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

export function Dashboard() {
    const darkMode = useSelector(state => state.mode.darkMode)

    return (
        <section 
            className={`py-16 text-center transition-colors duration-300 
            ${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"}`}
        >
            <h3 className="text-3xl font-bold mb-6">Live Dashboard Preview</h3>
            <p className="mb-6 max-w-3xl mx-auto">
                Get a glimpse of how our task management tool can help you organize, collaborate, and track progress effortlessly.
            </p>
            <motion.img
                src="/dashboard-preview.png"
                alt="Dashboard Preview"
                className={`max-w-4xl mx-auto shadow-lg rounded-xl transition-all duration-300
                ${darkMode ? "shadow-gray-700" : "shadow-gray-400"}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
            />
        </section>
    );
}

