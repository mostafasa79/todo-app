import { ClipboardList } from "lucide-react";

const EmptyState = ({
  message = "No tasks here yet",
  subMessage = "Enjoy your day or add a new task above!",
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-16 h-16 bg-gray-100 dark:bg-slate-800/50 rounded-full flex items-center justify-center mb-4 border border-gray-300 dark:border-slate-800">
        <ClipboardList
          size={32}
          className="text-gray-600 dark:text-slate-600"
        />
      </div>
      <h3 className="text-lg font-bold text-gray-700 dark:text-slate-300 mb-1">
        {message}
      </h3>
      <p className="text-sm text-gray-500 dark:text-slate-500 max-w-sm">
        {subMessage}
      </p>
    </div>
  );
};

export default EmptyState;
