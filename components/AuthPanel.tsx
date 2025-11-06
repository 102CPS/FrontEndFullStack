"use client";
import { FormEvent, useState } from "react";
import { Credentials, loginUser, registerUser, UserProfile } from "@services/authService";

interface AuthPanelProps {
  onAuthenticated: (user: UserProfile) => void;
}

type ViewMode = "login" | "register";

export default function AuthPanel({ onAuthenticated }: AuthPanelProps) {
  const [mode, setMode] = useState<ViewMode>("login");
  const [form, setForm] = useState<Credentials>({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof Credentials, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleMode = (nextMode: ViewMode) => {
    setMode(nextMode);
    setError("");
    setMessage("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setIsSubmitting(true);
    const action = mode === "login" ? loginUser : registerUser;
    try {
      const user = await action(form);
      if (mode === "register") {
        setMessage("Account created. You can log in now.");
        setMode("login");
        setForm({ email: form.email, password: "" });
      } else {
        onAuthenticated(user);
      }
    } catch (err) {
      const reason = err instanceof Error ? err.message : "Something went wrong.";
      setError(reason);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="auth-panel">
      <div>
        <h1 className="auth-panel__title">FootTrack</h1>
        <p className="auth-panel__description">
          Register or log in to access your personalized football dashboard.
        </p>
      </div>

      <div className="auth-panel__toggle">
        <button
          type="button"
          onClick={() => toggleMode("login")}
          className={
            mode === "login"
              ? "auth-panel__toggle-btn auth-panel__toggle-btn--active"
              : "auth-panel__toggle-btn"
          }
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => toggleMode("register")}
          className={
            mode === "register"
              ? "auth-panel__toggle-btn auth-panel__toggle-btn--active"
              : "auth-panel__toggle-btn"
          }
        >
          Register
        </button>
      </div>

      <form onSubmit={handleSubmit} className="auth-panel__form">
        <label className="auth-panel__field">
          <span className="auth-panel__label">Email</span>
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            className="auth-panel__input"
          />
        </label>

        <label className="auth-panel__field">
          <span className="auth-panel__label">Password</span>
          <input
            type="password"
            required
            minLength={4}
            placeholder="Your password"
            value={form.password}
            onChange={(event) => updateField("password", event.target.value)}
            className="auth-panel__input"
          />
        </label>

        {error && <p className="auth-panel__error">{error}</p>}
        {message && <p className="auth-panel__success">{message}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="auth-panel__submit"
        >
          {isSubmitting ? "Please wait..." : mode === "login" ? "Login" : "Create account"}
        </button>
      </form>
    </section>
  );
}
