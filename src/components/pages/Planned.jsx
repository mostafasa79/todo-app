import { useLogic } from "../Logic";
import Tasksplace from "../layout/Tasksplace";

const Planned = () => {
  const { tasks, plannedValue } = useLogic();
  const plannedTasks = plannedValue(tasks);

  return (
    <div className="flex flex-col gap-4">

      <Tasksplace tasks={plannedTasks} />
    </div>
  );
};

export default Planned;
