import { useState } from "react";
import styles from "../styles/task-modal.module.css";

const SignupModal = ({ setShowSignupModal }) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(undefined);

  const userSignup = async () => {
    try {
      const res = await fetch(`${process.env.API_END_POINT}/user/sign-up`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });
      const data = await res.json();
      if (res.status === 201) {
        setSuccess(true);
        setTimeout(() => {
          setShowSignupModal(false);
        }, 1000);
      } else if (res.status === 400) {
        setError("Password strength is too low");
        return;
      } else if (res.status === 409) {
        setError("Email already exists! Please login");
        return;
      } else {
        if (data === "ERROR") setError("Error occurred");
        return;
      }
    } catch (err) {
      setError("Error occurred");
    }
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.addItemContainer}>
        <span className={styles.addItemTitle}>Signup</span>
        <input
          placeholder="Enter Name"
          className={styles.addItemInput}
          onChange={(e) => setName(e.target.value)}
        />
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
        <p className={styles.passwordDescription}>
          password must contain 8-20 characters including letter, numbers and
          symbols
        </p>
        {error && <span className={styles.errorMessage}>{error}</span>}
        {success && (
          <span className={styles.successMessage}>Signup Successfull</span>
        )}
        <div className={styles.addItemButtonDiv}>
          <button
            disabled={!name || !email || !password}
            onClick={() => userSignup()}
            className={styles.addItemButton}
          >
            SIGNUP
          </button>
          <button
            onClick={() => setShowSignupModal(false)}
            className={styles.addItemButton}
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
