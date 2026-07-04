import { useState } from "react";
import { useLogic } from "../Logic";
import Tasksplace from "../layout/Tasksplace";
import { Link } from "react-router-dom";
import { Sun, Star, Calendar, CheckSquare, ChevronDown } from "lucide-react";

const CategoryCard = ({
  title,
  tasksList,
  doneFn,
  undoneFn,
  icon: Icon,
  colorClass,
  bgClass,
  to,
}) => {
  const total = tasksList.length;
  const completed = doneFn(tasksList).length;
  const uncompleted = undoneFn(tasksList).length;

  return (
    <>
      <Link
        to={to}
        className="group flex flex-col p-4 sm:p-5 rounded-3xl border border-gray-100 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-all duration-300"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-2xl ${bgClass} transition-colors`}>
              <Icon size={22} className={`${colorClass}`} />
            </div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors">
              {title}
            </h3>
          </div>
          <span className="text-2xl font-bold text-gray-800 dark:text-slate-100">
            {total}
          </span>
        </div>

        <div className="flex flex-col gap-2 mt-auto">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 dark:text-slate-400">Completed</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-500">
              {completed}
            </span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-slate-800 rounded-full h-1.5 mb-1">
            <div
              className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500"
              style={{
                width: total > 0 ? `${(completed / total) * 100}%` : "0%",
              }}
            ></div>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 dark:text-slate-400">
              Uncompleted
            </span>
            <span className="font-semibold text-amber-600 dark:text-amber-500">
              {uncompleted}
            </span>
          </div>
        </div>
      </Link>
    </>
  );
};

const Home = () => {
  const {
    tasks,
    doneValue,
    undoneValue,
    unassignedValue,
    myDayValue,
    importantValue,
    plannedValue,
    opencard,
    setOpenCard,
  } = useLogic();

  const [openUnassigned, setOpenUnassigned] = useState(true);
  const unassignedTasksList = unassignedValue(tasks);

  return (
    <div className="flex flex-col gap-6">
      {/* Cards section header with toggle */}
      <div className="px-2">
        <button
          onClick={() => setOpenCard(!opencard)}
          className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 group"
        >
          <div className="p-1 rounded-lg bg-gray-100 dark:bg-slate-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors">
            <ChevronDown
              size={16}
              className={`transition-transform duration-300 ${opencard ? "rotate-0" : "-rotate-90"}`}
            />
          </div>
          <span>Overview</span>
        </button>
      </div>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 px-2 transition-all duration-400 ease-in-out overflow-hidden ${
          opencard ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <CategoryCard
          title="My Day"
          tasksList={myDayValue(tasks)}
          doneFn={doneValue}
          undoneFn={undoneValue}
          icon={Sun}
          colorClass="text-amber-600 dark:text-amber-500"
          bgClass="bg-amber-50 dark:bg-amber-500/10 group-hover:bg-amber-100 dark:group-hover:bg-amber-500/20"
          to="/my-day"
        />
        <CategoryCard
          title="Important"
          tasksList={importantValue(tasks)}
          doneFn={doneValue}
          undoneFn={undoneValue}
          icon={Star}
          colorClass="text-red-600 dark:text-red-500"
          bgClass="bg-red-50 dark:bg-red-500/10 group-hover:bg-red-100 dark:group-hover:bg-red-500/20"
          to="/important"
        />
        <CategoryCard
          title="Planned"
          tasksList={plannedValue(tasks)}
          doneFn={doneValue}
          undoneFn={undoneValue}
          icon={Calendar}
          colorClass="text-emerald-600 dark:text-emerald-500"
          bgClass="bg-emerald-50 dark:bg-emerald-500/10 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-500/20"
          to="/planned"
        />
        <CategoryCard
          title="All Tasks"
          tasksList={tasks}
          doneFn={doneValue}
          undoneFn={undoneValue}
          icon={CheckSquare}
          colorClass="text-violet-600 dark:text-violet-500"
          bgClass="bg-violet-50 dark:bg-violet-500/10 group-hover:bg-violet-100 dark:group-hover:bg-violet-500/20"
          to="/all-tasks"
        />
      </div>

      <div className="flex flex-col gap-3 px-2 mt-2">
        <button
          onClick={() => setOpenUnassigned(!openUnassigned)}
          className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 group w-fit"
        >
          <div className="p-1 rounded-lg bg-gray-100 dark:bg-slate-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors">
            <ChevronDown
              size={16}
              className={`transition-transform duration-300 ${openUnassigned ? "rotate-0" : "-rotate-90"}`}
            />
          </div>
          <span className="text-lg font-bold text-gray-800 dark:text-slate-100">
             Tasks
          </span>
        </button>
        
        <div
          className={`transition-all duration-400 ease-in-out overflow-hidden ${
            openUnassigned ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <Tasksplace tasks={unassignedTasksList} />
        </div>
      </div>
    </div>
  );
};

export default Home;
