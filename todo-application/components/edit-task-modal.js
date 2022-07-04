import { useState } from "react";
import styles from "../styles/task-modal.module.css";
const { useAuth } = require("../context/auth-context");

const EditTaskModal = ({ item, setShowModal, fetchTasks }) => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const { user } = useAuth();
  const [error, setError] = useState(undefined);

  const editTask = async (taskId, task) => {
    try {
      const res = await fetch(`${process.env.API_END_POINT}/todo/${taskId}`, {
        method: "PATCH",
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
      if (res.status === 200) {
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
          placeholder="Edit this todo title"
          className={styles.addItemInput}
          onChange={(e) => setTitle(e.target.value)}
          defaultValue={item.title}
        />
        <input
          placeholder="Edit this todo description"
          className={styles.addItemInput}
          onChange={(e) => setDescription(e.target.value)}
          defaultValue={item.description}
        />
        {error && <span className={styles.errorMessage}>{error}</span>}
        <div className={styles.addItemButtonDiv}>
          <button
            disabled={
              !title || title === item.title || description === item.description
            }
            onClick={() =>
              editTask(item.id, { title: title, description: description })
            }
            className={styles.addItemButton}
          >
            EDIT
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

export default EditTaskModal;
