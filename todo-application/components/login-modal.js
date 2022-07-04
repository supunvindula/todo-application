import { useState } from "react";
import styles from "../styles/task-modal.module.css";
const { useAuth } = require("../context/auth-context");

const LoginModal = ({ setShowLoginsModal }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { user, setUser } = useAuth();
  const [error, setError] = useState(undefined);

  const userLogin = async () => {
    try {
      const res = await fetch(`${process.env.API_END_POINT}/user/log-in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await res.json();

      if (res.status === 200) {
        setUser({ token: data });
        setShowLoginsModal(false);
      } else {
        if (res.status === 401)
          setError("Please check your username and password");
        else setError("Error occurred");
        return;
      }
    } catch (err) {
      setError("Error occurred");
    }
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.addItemContainer}>
        <span className={styles.addItemTitle}>Login</span>
        <input
          placeholder="Enter Email"
          className={styles.addItemInput}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Enter Password"
          className={styles.addItemInput}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <span className={styles.errorMessage}>{error}</span>}
        <div className={styles.addItemButtonDiv}>
          <button
            disabled={!email || !password}
            onClick={() => userLogin()}
            className={styles.addItemButton}
          >
            LOGIN
          </button>
          <button
            onClick={() => setShowLoginsModal(false)}
            className={styles.addItemButton}
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
