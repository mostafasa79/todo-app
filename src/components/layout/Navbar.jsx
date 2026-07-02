// components/Navbar.jsx
import { Search, Moon, Sun, X, Trash2, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { useLogic } from "../Logic";

export default function Navbar() {
  const {
    dispatch,
    searchQuery,
    setSearchQuery,
    isSelectionMode,
    setIsSelectionMode,
    selectedTasks,
    setSelectedTasks,
    setIsMobileMenuOpen
  } = useLogic();

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "system";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else if (theme === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      root.classList.remove("dark", "light");
      localStorage.removeItem("theme");
    }
  }, [theme]);

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("dark");
    } else {
      const isSystemDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      setTheme(isSystemDark ? "light" : "dark");
    }
  };

  const isDarkResolved =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const handleCancelSelection = () => {
    setIsSelectionMode(false);
    setSelectedTasks([]);
  };

  const handleDeleteSelected = () => {
    if (selectedTasks.length > 0) {
      dispatch({
        type: "DELETE_MULTIPLE_TASKS",
        payload: { ids: selectedTasks },
      });
      handleCancelSelection();
    }
  };

  if (isSelectionMode) {
    return (
      <div className="h-12 bg-blue-50 dark:bg-blue-900/30 w-full flex items-center justify-between px-3 sm:px-6 transition-colors duration-300 border-b border-blue-100 dark:border-blue-800/50">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleCancelSelection}
            className="p-1.5 rounded-full hover:bg-blue-100 dark:hover:bg-blue-800/50 text-blue-600 dark:text-blue-400 transition-colors"
          >
            <X size={18} />
          </button>
          <span className="font-semibold text-sm sm:text-base text-blue-700 dark:text-blue-300">
            {selectedTasks.length} <span className="hidden sm:inline">selected</span>
          </span>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={handleCancelSelection}
            className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800/50 rounded-lg transition-colors"
          >
            Clear
          </button>
          <button
            onClick={handleDeleteSelected}
            disabled={selectedTasks.length === 0}
            className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors ${
              selectedTasks.length > 0
                ? "bg-red-500 hover:bg-red-600 text-white shadow-sm"
                : "bg-gray-200 dark:bg-slate-700 text-gray-400 dark:text-slate-500 cursor-not-allowed"
            }`}
          >
            <Trash2 size={14} className="sm:w-4 sm:h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-12 bg-white dark:bg-slate-900 w-full flex items-center px-2 sm:px-4 gap-2 sm:gap-3 transition-colors duration-300">
      {/* Mobile Hamburger Button */}
      <button 
        onClick={() => setIsMobileMenuOpen(true)}
        className="md:hidden p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors shrink-0"
      >
        <Menu size={20} />
      </button>

      {/* وسط - Search */}
      <div
        className={`flex-1 shrink-[2] flex items-center rounded-3xl p-2 sm:p-4 gap-2 h-8 ml-0 md:ml-5 max-w-3xl mx-auto transition-all duration-300 ${
          searchQuery
            ? "bg-blue-50 dark:bg-blue-900/20 ring-1 ring-blue-200 dark:ring-blue-800"
            : "bg-[#F5F5F5] dark:bg-slate-800"
        }`}
      >
        <Search
          size={16}
          className={`shrink-0 transition-colors duration-300 ${searchQuery ? "text-blue-500" : "text-[#616161] dark:text-slate-400"}`}
        />
        <input
          className="bg-transparent outline-none text-sm text-[#1A1A1A] dark:text-slate-200 w-full placeholder:text-[#A0A0A0] dark:placeholder:text-slate-500 min-w-0"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="p-0.5 shrink-0 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-400 hover:text-gray-600 dark:hover:text-slate-300 transition-colors"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* يمين - أيقونات */}
      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={toggleTheme}
          className="relative p-2 rounded-lg hover:bg-[#F0F0F0] dark:hover:bg-slate-800 text-[#616161] dark:text-slate-400 transition-colors duration-300 overflow-hidden flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9"
        >
          <div
            className={`absolute transition-all duration-500 ease-in-out ${isDarkResolved ? "translate-y-8 opacity-0 rotate-90" : "translate-y-0 opacity-100 rotate-0"}`}
          >
            <Sun size={18} className="sm:w-5 sm:h-5" />
          </div>
          <div
            className={`absolute transition-all duration-500 ease-in-out ${isDarkResolved ? "translate-y-0 opacity-100 rotate-0" : "-translate-y-8 opacity-0 -rotate-90"}`}
          >
            <Moon size={18} className="sm:w-5 sm:h-5" />
          </div>
        </button>
      </div>
    </div>
  );
}
