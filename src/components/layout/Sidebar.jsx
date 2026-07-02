import { Link } from "react-router-dom";
import { useLogic } from "../Logic";
import {
  Home as HomeIcon,
  Sun,
  Star,
  Calendar,
  CheckSquare,
  ListTodo,
  PanelLeft,
} from "lucide-react";

const Sidebar = () => {
  const { bar, setbar, isMobileMenuOpen, setIsMobileMenuOpen } = useLogic();

  const sidebar = [
    {
      icon: HomeIcon,
      name: "Home",
      to: "/",
      hoverColorClass:
        "group-hover:text-blue-600 dark:group-hover:text-blue-500",
      id: 1,
    },
    {
      icon: Sun,
      name: "My Day",
      to: "/my-day",
      hoverColorClass:
        "group-hover:text-amber-600 dark:group-hover:text-amber-500",
      id: 2,
    },
    {
      icon: Star,
      name: "Important",
      to: "/important",
      hoverColorClass: "group-hover:text-red-600 dark:group-hover:text-red-500",
      id: 3,
    },
    {
      icon: Calendar,
      name: "Planned",
      to: "/planned",
      hoverColorClass:
        "group-hover:text-emerald-600 dark:group-hover:text-emerald-500",
      id: 4,
    },
    {
      icon: CheckSquare,
      name: "AllTask",
      to: "/all-tasks",
      hoverColorClass:
        "group-hover:text-violet-600 dark:group-hover:text-violet-500",
      id: 5,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      <nav
        className={`
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          fixed md:relative inset-y-0 left-0 z-50
          ${bar ? "w-65" : "w-20"}
          bg-white dark:bg-slate-900 h-full flex flex-col shadow-sm border-r border-slate-200 dark:border-slate-800 transition-all duration-400 ease-in-out overflow-hidden shrink-0
        `}
      >
        {/* Header section (logo + toggle) */}
        <div className="flex items-center h-20 w-full px-5 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div
            className={`flex items-center gap-3 overflow-hidden transition-all duration-300 ease-in-out ${
              bar ? "w-40 opacity-100" : "w-0 opacity-0"
            }`}
          >
            <ListTodo
              size={28}
              className="text-indigo-600 dark:text-indigo-500 shrink-0"
            />
            <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-wide whitespace-nowrap">
              todo app
            </h1>
          </div>

          <button
            onClick={() => setbar(!bar)}
            className="p-2 ml-auto rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400 shrink-0 hidden md:block"
          >
            <PanelLeft size={24} />
          </button>
        </div>

        {/* pages */}
        <div className="flex flex-col gap-1.5 p-3 mt-2 overflow-y-auto overflow-x-hidden">
          {sidebar.map((info) => {
            return (
              <div
                key={info.name}
                className="group rounded-xl transition-all duration-300 hover:bg-gray-50 dark:hover:bg-slate-800/50 border border-transparent hover:border-gray-200 dark:hover:border-slate-700"
              >
                <Link
                  to={`${info.to}`}
                  className="block w-full"
                  title={!bar ? info.name : ""}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div
                    className={`flex items-center h-12 w-full text-slate-600 dark:text-slate-400 font-medium transition-colors ${info.hoverColorClass}`}
                  >
                    <div className="flex items-center justify-center shrink-0 w-14 h-full">
                      <info.icon
                        size={22}
                        className={`text-slate-400 dark:text-slate-500 transition-all duration-300 group-hover:scale-110 ${info.hoverColorClass}`}
                      />
                    </div>
                    <span
                      className={`whitespace-nowrap transition-opacity duration-300 ease-in-out ${
                        bar ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {info.name}
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
