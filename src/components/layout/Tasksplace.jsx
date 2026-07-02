import { useLogic } from "../Logic";
import Tasksection from "./Tasksection";
import EmptyState from "./EmptyState";

const Tasksplace = ({ tasks, emptyMessage, emptySubMessage }) => {
  const { doneValue, undoneValue } = useLogic();
  
  if (!tasks || tasks.length === 0) {
    return <EmptyState message={emptyMessage} subMessage={emptySubMessage} />;
  }

  const done = doneValue(tasks);
  const undone = undoneValue(tasks);

  return (
    <>
      <Tasksection undone={undone} text="undone" />
      <Tasksection done={done} text="done" />
    </>
  );
};

export default Tasksplace;
