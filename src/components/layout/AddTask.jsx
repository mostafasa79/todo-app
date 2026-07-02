import { useLogic } from "../Logic";
import { Plus } from "lucide-react";

const AddTask = () => {
  const { 
    dispatch,
    pan, 
    setPan, 
    title, 
    setTitle,
    note,
    setNote,
    isday,
    setIsday,
    isImp,
    setIpm,
    dueDate,
    setDueDate
  } = useLogic();

  const handleAddTask = () => {
    if (!title || title.trim() === "") return;

    dispatch({
      type: "ADD_TASK",
      payload: {
        title: title.trim(),
        note: note ? note.trim() : "",
        completed: false,
        MyDay: isday,
        important: isImp,
        dueDate: dueDate,
      },
    });

    setTitle("");
    setNote("");
    setIsday(false);
    setIpm(false);
    setDueDate("");
    setPan(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    <div className="px-4 sm:px-8 py-2 shrink-0">
      <div className="flex items-center bg-gray-50/50 dark:bg-slate-800/40 hover:bg-gray-50 dark:hover:bg-slate-800/60 border border-gray-100 dark:border-slate-800/80 focus-within:bg-white dark:focus-within:bg-slate-900 focus-within:border-[#0078D4] dark:focus-within:border-blue-500 focus-within:shadow-sm focus-within:ring-4 focus-within:ring-[#0078D4]/10 rounded-2xl p-1.5 sm:p-2 gap-2 sm:gap-3 transition-all duration-300 group">
        <div className="p-2 rounded-xl text-gray-400 group-focus-within:text-[#0078D4] dark:group-focus-within:text-blue-500 transition-colors hidden sm:block">
          <Plus size={20} />
        </div>
        <input
          className="flex-1 bg-transparent outline-none text-sm font-medium text-gray-800 dark:text-slate-200 placeholder:text-gray-400 dark:placeholder:text-slate-500 px-2 sm:px-0 min-w-0"
          type="text"
          placeholder="Add a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => setPan(true)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleAddTask}
          disabled={!title || title.trim() === ""}
          className={`px-3 sm:px-5 py-2 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 shrink-0 flex items-center justify-center gap-1 ${
            title && title.trim() !== ""
              ? "bg-[#0078D4] hover:bg-[#006cc0] text-white shadow-md shadow-blue-500/20 active:scale-[0.98]"
              : "bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-500 cursor-not-allowed"
          }`}
        >
          <span className="sm:hidden"><Plus size={16} /></span>
          <span className="hidden sm:inline">Add</span>
        </button>
      </div>
    </div>
  );
};

export default AddTask;
