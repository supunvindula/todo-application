import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/index.module.css";
import TodoList from "../components/to-do-list";
import Navbar from "../components/navigation-bar";
import TaskModal from "../components/task-modal";
import LoginModal from "../components/login-modal";
import SignupModal from "../components/signup-modal";
const { useAuth } = require("../context/auth-context");

export default function Home(props) {
  const [tasks, setTasks] = useState([]);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showLoginModal, setShowLoginsModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const { user } = useAuth();

  const fetchAllTasks = async () => {
    try {
      const res = await fetch(`${process.env.API_END_POINT}/todo`, {
        method: "GET",
        headers: {
          authorization: `bearer ${user.token.token}`,
        },
      });
      const data = await res.json();
      setTasks(data);
    } catch (err) {}
  };

  useEffect(() => {
    fetchAllTasks();
  }, [user]);

  return (
    <>
      <Head>
        <title>TODO</title>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <Navbar
        showAddTaskModal={setShowAddTaskModal}
        setShowLoginsModal={setShowLoginsModal}
        setShowSignupModal={setShowSignupModal}
      />
      {user !== undefined ? (
        tasks.length > 0 ? (
          <TodoList tasks={tasks} fetchTasks={fetchAllTasks} />
        ) : (
          <p className={styles.noTaskMessage} suppressHydrationWarning={true}>
            No tasks available. Please add tasks
          </p>
        )
      ) : (
        <p className={styles.loginErrorMessage}>Signup or Login first!!</p>
      )}
      {showAddTaskModal && (
        <TaskModal
          setShowModal={setShowAddTaskModal}
          fetchTasks={fetchAllTasks}
        />
      )}
      {showLoginModal && (
        <LoginModal
          setShowLoginsModal={setShowLoginsModal}
          fetchTasks={fetchAllTasks}
        />
      )}
      {showSignupModal && (
        <SignupModal
          setShowSignupModal={setShowSignupModal}
          fetchTasks={fetchAllTasks}
        />
      )}
    </>
  );
}
