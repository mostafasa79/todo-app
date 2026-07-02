import TaskCard from "./TaskCard";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

const Tasksection = ({ text, done, undone }) => {
  const value = text === "undone" ? undone : done;
  const [isOpen, setIsOpen] = useState(true);

  if (!value || value.length === 0) return null;

  return (
    <div className="flex flex-col gap-3 p-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-slate-300 capitalize transition-colors duration-300 hover:text-[#0078D4] dark:hover:text-blue-500 w-fit group"
      >
        <div className="p-1 rounded-lg bg-gray-100 dark:bg-slate-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors">
          {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </div>
        <span>{text}</span>
        <span className="text-xs bg-gray-100 dark:bg-slate-800 px-2 py-0.5 rounded-full text-gray-500 dark:text-slate-400 ml-1 font-medium border border-gray-200 dark:border-slate-700">
          {value.length}
        </span>
      </button>

      <div
        className={`transition-all duration-300 ease-in-out origin-top ${
          isOpen ? "opacity-100 scale-y-100 max-h-[40vh]" : "opacity-0 scale-y-0 max-h-0 overflow-hidden"
        }`}
      >
        <ul className="flex flex-col gap-2 overflow-y-auto max-h-[40vh] pr-2 pb-2 scroll-smooth">
          {value.map((task) => (
            <li key={task.id}>
              <TaskCard task={task} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Tasksection;
