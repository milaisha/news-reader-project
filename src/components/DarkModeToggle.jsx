import React, { useEffect, useState } from "react";

const DarkModeToggle = () => {
  const getInitialMode = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  };

  const [darkMode, setDarkMode] = useState(getInitialMode);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleToggle = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    setToastMsg(newMode ? "🌙 Dark mode enabled" : "☀️ Light mode enabled");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="relative flex justify-end">
      <button
        onClick={handleToggle}
        className="mb-4 px-4 py-2 text-sm font-medium bg-gray-200 dark:bg-gray-800 dark:text-white rounded-full shadow-sm hover:bg-gray-300 dark:hover:bg-gray-700 transition"
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* Toast Notification */}
      {showToast && (
        <div className="absolute top-12 right-0 bg-gray-800 text-white text-sm px-4 py-2 rounded shadow-md animate-fade-in-out">
          {toastMsg}
        </div>
      )}
    </div>
  );
};

export default DarkModeToggle;

