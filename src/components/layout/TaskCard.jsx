import { Trash2, Pencil, Sun, Star, Calendar, Check } from "lucide-react";
import { useLogic } from "../Logic";

const TaskCard = ({ task }) => {
  const { 
    dispatch, 
    isSelectionMode, 
    selectedTasks, 
    setSelectedTasks,
    setIsSelectionMode,
    setSelectedTaskId,
    setPan
  } = useLogic();
  
  const isSelected = selectedTasks.includes(task.id);

  const toggleSelection = () => {
    if (isSelected) {
      setSelectedTasks(selectedTasks.filter(id => id !== task.id));
    } else {
      setSelectedTasks([...selectedTasks, task.id]);
    }
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setIsSelectionMode(true);
    setSelectedTasks([task.id]);
  };
  
  const handleEditClick = (e) => {
    e.stopPropagation();
    setSelectedTaskId(task.id);
    setPan(true);
  };
  
  const handleToggleComplete = (e) => {
    e.stopPropagation();
    dispatch({ type: "TOGGLE_COMPLETE", payload: { id: task.id } });
  };
  
  return (
    <div 
      onClick={isSelectionMode ? toggleSelection : undefined}
      className={`group flex items-center justify-between p-3.5 sm:p-4 rounded-xl transition-all duration-300 border ${
        isSelectionMode ? "cursor-pointer" : ""
      } ${
        isSelected 
          ? "bg-blue-50/70 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800/60 shadow-sm" 
          : "border-transparent bg-white dark:bg-slate-900 hover:bg-gray-50 dark:hover:bg-slate-800/70 shadow-sm hover:shadow-md"
      }`}
    >
      <div className="flex items-center gap-3.5 flex-1 min-w-0">
        {isSelectionMode ? (
          <div className="shrink-0 flex items-center justify-center">
            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
              isSelected 
                ? "bg-blue-500 border-blue-500 text-white scale-110" 
                : "border-gray-300 dark:border-slate-600 bg-transparent"
            }`}>
              {isSelected && <Check className="w-3.5 h-3.5" />}
            </div>
          </div>
        ) : (
          <button 
            onClick={handleToggleComplete}
            className={`shrink-0 flex items-center justify-center w-5 h-5 rounded-full border transition-all ${
              task.completed 
                ? "bg-emerald-500 border-emerald-500 text-white" 
                : "border-gray-300 dark:border-slate-500 bg-transparent hover:border-emerald-400"
            }`}
          >
            {task.completed && <Check className="w-3.5 h-3.5" />}
          </button>
        )}
        
        <p
          className={`transition-colors duration-300 truncate ${
            task.completed 
              ? "line-through text-gray-400 dark:text-slate-500" 
              : "text-gray-700 dark:text-slate-200 font-medium"
          }`}
        >
          {task.title}
        </p>
        
        <div className="flex items-center gap-1.5 shrink-0 ml-auto">
          {task.MyDay && (
            <div className="flex items-center justify-center p-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" title="My Day">
              <Sun className="w-3.5 h-3.5" />
            </div>
          )}
          {task.important && (
            <div className="flex items-center justify-center p-1 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400" title="Important">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
          )}
          {task.dueDate && (
            <div className="flex items-center justify-center p-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" title="Planned">
              <Calendar className="w-3.5 h-3.5" />
            </div>
          )}
        </div>
      </div>
      
      {!isSelectionMode && (
        <div className="flex gap-1.5 items-center ml-4 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
          <button 
            onClick={handleEditClick}
            className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-slate-700 dark:text-slate-500 dark:hover:text-blue-400 rounded-lg transition-colors duration-300"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button 
            onClick={handleDeleteClick}
            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-slate-700 dark:text-slate-500 dark:hover:text-red-400 rounded-lg transition-colors duration-300"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
