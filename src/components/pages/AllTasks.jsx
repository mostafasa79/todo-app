import { useLogic } from "../Logic";
import Tasksplace from "../layout/Tasksplace";

const AllTasks = () => {
  const { tasks } = useLogic();
  return (
    <>
      <Tasksplace tasks={tasks} />
    </>
  );
};

export default AllTasks;
