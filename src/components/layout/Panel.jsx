import { useLogic } from "../Logic";
import { X, FileText, Sun, Star, Plus, Save } from "lucide-react";
import { useEffect } from "react";

const Panel = () => {
  const {
    tasks,
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
    setDueDate,
    selectedTaskId,
    setSelectedTaskId
  } = useLogic();

  useEffect(() => {
    if (selectedTaskId !== null) {
      const task = tasks.find(t => t.id === selectedTaskId);
      if (task) {
        setTitle(task.title);
        setNote(task.note || "");
        setIsday(task.MyDay || false);
        setIpm(task.important || false);
        setDueDate(task.dueDate || "");
      }
    } else {
      setTitle("");
      setNote("");
      setIsday(false);
      setIpm(false);
      setDueDate("");
    }
  }, [selectedTaskId, pan]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && pan) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pan]);

  const handleClose = () => {
    setPan(false);
    setSelectedTaskId(null);
    setTitle("");
    setNote("");
    setIsday(false);
    setIpm(false);
    setDueDate("");
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const handleSave = () => {
    if (!title || title.trim() === "") return;

    if (selectedTaskId !== null) {
      dispatch({
        type: "UPDATE_TASK",
        payload: {
          id: selectedTaskId,
          updates: {
            title: title.trim(),
            note: note ? note.trim() : "",
            MyDay: isday,
            important: isImp,
            dueDate: dueDate,
          }
        }
      });
    } else {
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
    }

    handleClose();
  };

  const isEditing = selectedTaskId !== null;

  return (
    <>
      {/* Mobile Backdrop */}
      {pan && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={handleClose}
        />
      )}
      
      <div
        className={`
          ${pan ? "translate-y-0 opacity-100 md:w-70" : "translate-y-full opacity-0 pointer-events-none md:translate-y-0 md:w-0"}
          fixed inset-x-0 bottom-0 z-50 h-[85vh]
          md:relative md:inset-auto md:z-auto md:h-full
          shrink-0 overflow-hidden transition-all duration-500 ease-in-out
        `}
      >
        <div className="w-full h-full flex flex-col shadow-2xl border border-gray-200 dark:border-slate-800/80 rounded-t-3xl md:rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-slate-800/60">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center">
                <FileText
                  size={16}
                  className="text-[#0078D4] dark:text-blue-400"
                />
              </div>
              <span className="text-sm font-semibold text-gray-800 dark:text-slate-200 tracking-tight">
                {isEditing ? "Edit Task" : "Task Details"}
              </span>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="p-1.5 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800/60 transition-all duration-200"
            >
              <X size={16} />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
            {/* Task Name Section */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider">
                Task Title
              </label>
              <input
                value={title}
                autoFocus={pan}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-1 py-2 bg-transparent text-lg font-semibold text-gray-800 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-600 outline-none border-b border-gray-200/80 dark:border-slate-800 focus:border-[#0078D4] dark:focus:border-blue-500 transition-all duration-300"
                placeholder="What needs to be done?"
              />
            </div>

            {/* Dynamic Action Controls */}
            <div className="flex flex-col gap-2 mt-2">
              <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider">
                Preferences
              </label>

              <div className="flex flex-col gap-3">
                {/* My Day Toggle */}
                <button
                  onClick={() => setIsday(!isday)}
                  className={`flex items-center justify-between w-full p-3.5 rounded-2xl border transition-all duration-300 group ${
                    isday
                      ? "bg-amber-50/70 border-amber-200/60 text-amber-800 dark:bg-amber-500/10 dark:border-amber-500/30 dark:text-amber-400"
                      : "bg-gray-50/50 hover:bg-gray-100/70 dark:bg-slate-800/20 dark:hover:bg-slate-800/50 border-gray-100/50 dark:border-slate-800/30 text-gray-600 dark:text-slate-350"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Sun
                      size={18}
                      className={`transition-transform duration-300 ${
                        isday
                          ? "text-amber-500 rotate-45 scale-110"
                          : "text-gray-400 dark:text-slate-500 group-hover:rotate-12"
                      }`}
                    />
                    <span className="font-medium text-sm">My Day</span>
                  </div>
                  <span
                    className={`text-xs ${isday ? "text-amber-600/80 dark:text-amber-400/80" : "text-gray-400 dark:text-slate-500"}`}
                  >
                    {isday ? "Added" : "Today"}
                  </span>
                </button>

                {/* Important Toggle */}
                <button
                  onClick={() => setIpm(!isImp)}
                  className={`flex items-center justify-between w-full p-3.5 rounded-2xl border transition-all duration-300 group ${
                    isImp
                      ? "bg-rose-50/70 border-rose-200/60 text-rose-800 dark:bg-rose-500/10 dark:border-rose-500/30 dark:text-rose-400"
                      : "bg-gray-50/50 hover:bg-gray-100/70 dark:bg-slate-800/20 dark:hover:bg-slate-800/50 border-gray-100/50 dark:border-slate-800/30 text-gray-600 dark:text-slate-350"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Star
                      size={18}
                      className={`transition-all duration-300 ${
                        isImp
                          ? "text-rose-500 fill-rose-500 scale-110"
                          : "text-gray-400 dark:text-slate-500 group-hover:scale-110"
                      }`}
                    />
                    <span className="font-medium text-sm">Important</span>
                  </div>
                  <span
                    className={`text-xs ${isImp ? "text-rose-600/80 dark:text-rose-400/80" : "text-gray-400 dark:text-slate-500"}`}
                  >
                    {isImp ? "Starred" : "Priority"}
                  </span>
                </button>

                {/* Due Date Picker */}
                <div className="flex flex-col gap-1 w-full p-3.5 rounded-2xl border transition-all duration-300 group bg-gray-50/50 hover:bg-gray-100/70 dark:bg-slate-800/20 dark:hover:bg-slate-800/50 border-gray-100/50 dark:border-slate-800/30 focus-within:border-blue-300 dark:focus-within:border-blue-700">
                  <span className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider pl-1">Planned Date</span>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full bg-transparent text-sm font-medium text-gray-700 dark:text-slate-200 outline-none cursor-pointer pl-1"
                  />
                </div>
              </div>
            </div>

            {/* Notes Section */}
            <div className="flex flex-col gap-2 flex-grow">
              <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider">
                Notes
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full flex-grow min-h-[140px] px-4 py-3 rounded-2xl bg-gray-50/30 dark:bg-slate-800/10 border border-gray-100 dark:border-slate-800/80 text-sm text-gray-700 dark:text-slate-300 placeholder:text-gray-400 dark:placeholder:text-slate-500 outline-none focus:border-[#0078D4] focus:ring-2 focus:ring-[#0078D4]/10 transition-all duration-300 resize-none leading-relaxed"
                placeholder="Add notes, descriptions, or details..."
              />
            </div>
          </div>

          {/* Footer / Submit Button */}
          <div className="p-6 border-t border-gray-100 dark:border-slate-800/60 bg-gray-50/30 dark:bg-slate-900/40 flex flex-col gap-4">
            <button
              type="button"
              onClick={handleSave}
              disabled={!title || title.trim() === ""}
              className={`flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-2xl font-semibold text-sm shadow-md transition-all duration-300 ${
                title && title.trim() !== ""
                  ? "bg-[#0078D4] hover:bg-[#006cc0] text-white cursor-pointer shadow-blue-500/10 active:scale-[0.98]"
                  : "bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-500 cursor-not-allowed shadow-none"
              }`}
            >
              {isEditing ? <Save size={16} /> : <Plus size={16} />}
              <span>{isEditing ? "Save Changes" : "Add Task"}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Panel;
