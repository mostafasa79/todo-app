import AddTask from "./layout/AddTask";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./layout/Sidebar";
import Navbar from "./layout/Navbar";
import Panel from "./layout/Panel";
import TaskCard from "./layout/TaskCard";
import { useLogic } from "./Logic";
import { Home, Sun, Star, Calendar, CheckSquare, ListTodo, Search } from "lucide-react";

const PageHeader = () => {
  const location = useLocation();
  const path = location.pathname;

  let title = "Tasks";
  let Icon = ListTodo;
  let colorClass = "text-gray-800 dark:text-slate-100";

  if (path === "/") {
    title = "Home";
    Icon = Home;
    colorClass = "text-blue-600 dark:text-blue-500";
  } else if (path === "/my-day") {
    title = "My Day";
    Icon = Sun;
    colorClass = "text-amber-600 dark:text-amber-500";
  } else if (path === "/important") {
    title = "Important Tasks";
    Icon = Star;
    colorClass = "text-red-600 dark:text-red-500";
  } else if (path === "/planned") {
    title = "Planned Tasks";
    Icon = Calendar;
    colorClass = "text-emerald-600 dark:text-emerald-500";
  } else if (path === "/all-tasks") {
    title = "All Tasks";
    Icon = CheckSquare;
    colorClass = "text-violet-600 dark:text-violet-500";
  }

  const dateOptions = { weekday: "long", month: "long", day: "numeric" };
  const today = new Date().toLocaleDateString("en-US", dateOptions);

  return (
    <div className="px-4 sm:px-8 pt-4 sm:pt-6 pb-2 flex flex-col">
      <div className="flex items-center gap-2 sm:gap-3">
        <Icon
          className={`w-6 h-6 sm:w-8 sm:h-8 ${colorClass} transition-colors duration-300`}
        />
        <h1
          className={`text-2xl sm:text-3xl font-bold transition-colors text-gray-800 dark:text-slate-100 duration-300 tracking-tight`}
        >
          {title}
        </h1>
      </div>
      <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 mt-1 font-medium pl-1 sm:pl-2">
        {today}
      </p>
    </div>
  );
};

const SearchResults = ({ query, tasks }) => {
  const lowerQuery = query.toLowerCase();
  const results = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(lowerQuery) ||
      (task.note && task.note.toLowerCase().includes(lowerQuery))
  );

  return (
    <div className="px-4 sm:px-8 pt-4 sm:pt-6 pb-2 flex flex-col">
      <div className="flex items-center gap-2 sm:gap-3">
        <Search className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 transition-colors duration-300" />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-slate-100 tracking-tight">
          Search Results
        </h1>
      </div>
      <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 mt-1 font-medium pl-1 sm:pl-2">
        {results.length} result{results.length !== 1 ? "s" : ""} for "{query}"
      </p>
    </div>
  );
};

const SearchResultsList = ({ query, tasks }) => {
  const lowerQuery = query.toLowerCase();
  const results = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(lowerQuery) ||
      (task.note && task.note.toLowerCase().includes(lowerQuery))
  );

  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Search size={48} className="text-gray-300 dark:text-slate-700 mb-4" />
        <p className="text-lg font-semibold text-gray-400 dark:text-slate-500">
          No tasks found
        </p>
        <p className="text-sm text-gray-400 dark:text-slate-600 mt-1">
          Try a different search term
        </p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {results.map((task) => (
        <li key={task.id}>
          <TaskCard task={task} />
        </li>
      ))}
    </ul>
  );
};

const Layout = () => {
  const { searchQuery, tasks } = useLogic();
  const isSearching = searchQuery && searchQuery.trim() !== "";

  return (
    <div className="bg-slate-50 dark:bg-slate-950 transition-colors duration-300 w-full h-screen">
      <div className="flex h-full w-full max-w-[1800px] mx-auto overflow-hidden relative">
        <Sidebar />
        <div className="flex flex-1 overflow-hidden p-2 sm:p-4 md:gap-4 min-w-0 w-full relative">
          <div className="bg-white flex-1 min-w-0 dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-sm flex flex-col transition-colors duration-300 border border-slate-200 dark:border-slate-800/60 overflow-hidden w-full relative z-0">
            <Navbar />
            <div id="switch">
              {isSearching ? (
                <SearchResults query={searchQuery} tasks={tasks} />
              ) : (
                <>
                  <PageHeader />
                  <AddTask />
                </>
              )}
            </div>
            <div className="mt-2 p-4 sm:p-6 pt-2 flex flex-col gap-3 overflow-y-auto flex-1">
              {isSearching ? (
                <SearchResultsList query={searchQuery} tasks={tasks} />
              ) : (
                <Outlet />
              )}
            </div>
          </div>
          <Panel />
        </div>
      </div>
    </div>
  );
};
export default Layout;
