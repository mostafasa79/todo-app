import Tasksplace from "../layout/Tasksplace";
import { useLogic } from "../Logic";

const MyDay = () => {
  const { tasks } = useLogic();
  const MyDaytasks = tasks.filter((task) => task.MyDay === true);

  return (
    <>
      <Tasksplace tasks={MyDaytasks} />
    </>
  );
};

export default MyDay;
