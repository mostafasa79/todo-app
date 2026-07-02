import Tasksplace from "../layout/Tasksplace";
import { useLogic } from "../Logic";

const Important = () => {
  const { tasks } = useLogic();
  const Importanttasks = tasks.filter((task) => task.important === true);

  return (
    <>
      <Tasksplace tasks={Importanttasks} />
    </>
  );
};

export default Important;
