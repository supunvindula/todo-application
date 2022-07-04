import styles from "../styles/to-do-list.module.css";
import TodoItem from "../components/to-do-item";
const { useAuth } = require("../context/auth-context");

const TodoList = ({ tasks, fetchTasks }) => {
  const { user } = useAuth();

  const TODOLIST = tasks.filter((task) => task.status === "todo");
  const INGOINGLIST = tasks.filter((task) => task.status === "inprogress");
  const DONELIST = tasks.filter((task) => task.status === "done");

  const deletetask = async (taskId) => {
    try {
      const res = await fetch(`${process.env.API_END_POINT}/todo/${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${user.token.token}`,
        },
      });
      const data = await res.json();
      if (res.status === 200) fetchTasks();
    } catch (err) {}
  };

  const changeTaskStatus = async (taskId, newStatus) => {
    try {
      const res = await fetch(`${process.env.API_END_POINT}/todo/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${user.token.token}`,
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });
      const data = await res.json();
      if (res.status === 200) fetchTasks();
    } catch (err) {}
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.section} ${styles.todo}`}>
        <p className={styles.sectionTitle}>TODO</p>
        {TODOLIST.map((item) => (
          <TodoItem
            key={item.id}
            item={item}
            deletetask={deletetask}
            changeTaskStatus={changeTaskStatus}
            fetchTasks={fetchTasks}
          />
        ))}
      </div>
      <div className={styles.section}>
        <p className={styles.sectionTitle}>INPROGRESS</p>
        {INGOINGLIST.map((item) => (
          <TodoItem
            key={item.id}
            item={item}
            deletetask={deletetask}
            changeTaskStatus={changeTaskStatus}
            fetchTasks={fetchTasks}
          />
        ))}
      </div>
      <div className={styles.section}>
        <p className={styles.sectionTitle}>DONE</p>
        {DONELIST.map((item) => (
          <TodoItem
            key={item.id}
            item={item}
            deletetask={deletetask}
            changeTaskStatus={changeTaskStatus}
            fetchTasks={fetchTasks}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
