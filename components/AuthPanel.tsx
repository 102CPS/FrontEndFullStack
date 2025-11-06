"use client";

import { FormEvent, useState } from "react";
import styles from "./AuthPanel.module.css";

export interface Credentials {
  email: string;
  password: string;
}

export interface AuthResult {
  success: boolean;
  message?: string;
}

interface AuthPanelProps {
  onLogin: (credentials: Credentials) => AuthResult;
  onRegister: (credentials: Credentials) => AuthResult;
}

const AuthPanel = ({ onLogin, onRegister }: AuthPanelProps) => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState<Credentials>({ email: "", password: "" });
  const [feedback, setFeedback] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const action = mode === "login" ? onLogin : onRegister;
    const result = action(form);

    if (result.success) {
      setError("");
      setFeedback(result.message ?? (mode === "login" ? "Logged in." : "Account created."));
      setForm({ email: "", password: "" });
    } else {
      setFeedback("");
      setError(result.message ?? "Unable to process request.");
    }
  };

  const changeMode = (nextMode: "login" | "register") => {
    setMode(nextMode);
    setError("");
    setFeedback("");
  };

  return (
    <div className={styles.panel}>
      <h1 className={styles.title}>FootTrack</h1>
      <p className={styles.subtitle}>Stay close to every match and team update.</p>

      <div className={styles.toggle}>
        <button
          type="button"
          className={mode === "login" ? styles.activeToggle : styles.toggleButton}
          onClick={() => changeMode("login")}
        >
          Login
        </button>
        <button
          type="button"
          className={mode === "register" ? styles.activeToggle : styles.toggleButton}
          onClick={() => changeMode("register")}
        >
          Register
        </button>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Email
          <input
            className={styles.input}
            type="email"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            required
          />
        </label>
        <label className={styles.label}>
          Password
          <input
            className={styles.input}
            type="password"
            value={form.password}
            onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
            required
            minLength={6}
          />
        </label>
        <button type="submit" className={styles.submit}>
          {mode === "login" ? "Login" : "Create Account"}
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>}
      {feedback && <p className={styles.feedback}>{feedback}</p>}
    </div>
  );
};

export default AuthPanel;
