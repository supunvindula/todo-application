import { useState } from "react";
import styles from "../styles/task-modal.module.css";
const { useAuth } = require("../context/auth-context");

const TaskModal = ({ setShowModal, fetchTasks }) => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const { user, setUser } = useAuth();
  const [error, setError] = useState(undefined);

  const addNewTask = async () => {
    try {
      const res = await fetch(`${process.env.API_END_POINT}/todo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${user.token.token}`,
        },
        body: JSON.stringify({
          title: title,
          description: description,
        }),
      });
      const data = await res.json();
      if (res.status === 201) {
        fetchTasks();
        setShowModal(false);
      } else {
        setError("Error occurred");
        setTimeout(() => {
          setShowModal(false);
        }, 1000);
      }
    } catch (err) {
      setError("Error occurred");
      setTimeout(() => {
        setShowModal(false);
      }, 1000);
    }
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.addItemContainer}>
        <span className={styles.addItemTitle}>Add New Todo Item</span>
        <input
          placeholder="Add new task"
          className={styles.addItemInput}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          placeholder="Add new task description"
          className={styles.addItemInput}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        {error && <span className={styles.errorMessage}>{error}</span>}
        <div className={styles.addItemButtonDiv}>
          <button
            disabled={!title}
            onClick={() => addNewTask()}
            className={styles.addItemButton}
          >
            ADD
          </button>
          <button
            onClick={() => setShowModal(false)}
            className={styles.addItemButton}
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
