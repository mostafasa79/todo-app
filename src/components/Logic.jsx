import { useState, createContext, useContext, useReducer, useEffect } from "react";

const LogicContext = createContext();

function tasksReducer(tasks, action) {
  switch (action.type) {
    case "ADD_TASK": {
      const newId = Math.max(...tasks.map((t) => t.id), 0) + 1;
      return [...tasks, { id: newId, ...action.payload }];
    }

    case "DELETE_TASK":
      return tasks.filter((task) => task.id !== action.payload.id);
      
    case "DELETE_MULTIPLE_TASKS":
      return tasks.filter((task) => !action.payload.ids.includes(task.id));

    case "UPDATE_TASK":
      return tasks.map((task) => 
        task.id === action.payload.id ? { ...task, ...action.payload.updates } : task
      );

    case "TOGGLE_COMPLETE":
      return tasks.map((task) =>
        task.id === action.payload.id
          ? { ...task, completed: !task.completed }
          : task,
      );

    default:
      return tasks;
  }
}

export const LogicProvider = ({ children }) => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [Iscom, setCom] = useState(false);
  const [isday, setIsday] = useState(false);
  const [isImp, setIpm] = useState(false);
  const [dueDate, setDueDate] = useState("");
  const [opencard, setOpenCard] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // New states for selection mode and editing
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const [tasks, dispatch] = useReducer(tasksReducer, []);

  // Initialize bar based on screen size
  const [bar, setbar] = useState(window.innerWidth > 768);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Handle resize events
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setbar(true);
        setIsMobileMenuOpen(false); // Close mobile menu when resizing to desktop
      } else {
        setbar(false);
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [pan, setPan] = useState(false);

  function undoneValue(tasks) {
    return tasks.filter((task) => task.completed === false);
  }

  function doneValue(tasks) {
    return tasks.filter((task) => task.completed === true);
  }

  function plannedValue(tasks) {
    return tasks.filter((task) => task.dueDate && task.dueDate !== "");
  }

  function unassignedValue(tasks) {
    return tasks.filter(
      (task) =>
        !task.MyDay &&
        !task.important &&
        (!task.dueDate || task.dueDate === ""),
    );
  }

  function myDayValue(tasks) {
    return tasks.filter((task) => task.MyDay === true);
  }

  function importantValue(tasks) {
    return tasks.filter((task) => task.important === true);
  }

  return (
    <LogicContext.Provider
      value={{
        bar,
        setbar,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        pan,
        setPan,
        tasks,
        dispatch,
        title,
        setTitle,
        note,
        setNote,
        Iscom,
        setCom,
        isday,
        setIsday,
        isImp,
        setIpm,
        dueDate,
        setDueDate,
        undoneValue,
        doneValue,
        plannedValue,
        unassignedValue,
        myDayValue,
        importantValue,
        opencard,
        setOpenCard,
        searchQuery,
        setSearchQuery,
        isSelectionMode,
        setIsSelectionMode,
        selectedTasks,
        setSelectedTasks,
        selectedTaskId,
        setSelectedTaskId,
      }}
    >
      {children}
    </LogicContext.Provider>
  );
};

export function useLogic() {
  return useContext(LogicContext);
}
