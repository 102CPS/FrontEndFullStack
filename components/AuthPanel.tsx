"use client";
import { FormEvent, useState, type CSSProperties } from "react";
import { Credentials, loginUser, registerUser, UserProfile } from "@services/authService";

interface AuthPanelProps {
  onAuthenticated: (user: UserProfile) => void;
}

type ViewMode = "login" | "register";

const baseInputStyles: CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid #cbd5f5",
  background: "rgba(255,255,255,0.9)",
};

const baseButtonStyles: CSSProperties = {
  border: "none",
  borderRadius: "10px",
  padding: "12px 16px",
  fontWeight: 600,
  cursor: "pointer",
};

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
    <section
      style={{
        width: "100%",
        maxWidth: "420px",
        borderRadius: "24px",
        padding: "32px",
        background: "linear-gradient(160deg, rgba(255,255,255,0.92), rgba(236,244,255,0.92))",
        boxShadow: "0 18px 40px rgba(15, 23, 42, 0.16)",
        display: "flex",
        flexDirection: "column",
        gap: "18px",
      }}
    >
      <div>
        <h1 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a" }}>FootTrack</h1>
        <p style={{ color: "#475569", marginTop: "8px" }}>
          Register or log in to access your personalized football dashboard.
        </p>
      </div>

      <div style={{ display: "flex", gap: "12px", background: "#e0e7ff", borderRadius: "12px", padding: "6px" }}>
        <button
          type="button"
          onClick={() => toggleMode("login")}
          style={{
            ...baseButtonStyles,
            flex: 1,
            background: mode === "login" ? "#1d4ed8" : "transparent",
            color: mode === "login" ? "#fff" : "#1d4ed8",
          }}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => toggleMode("register")}
          style={{
            ...baseButtonStyles,
            flex: 1,
            background: mode === "register" ? "#1d4ed8" : "transparent",
            color: mode === "register" ? "#fff" : "#1d4ed8",
          }}
        >
          Register
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "16px" }}>
        <label style={{ display: "grid", gap: "6px" }}>
          <span style={{ fontWeight: 600, color: "#1e293b" }}>Email</span>
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            style={baseInputStyles}
          />
        </label>

        <label style={{ display: "grid", gap: "6px" }}>
          <span style={{ fontWeight: 600, color: "#1e293b" }}>Password</span>
          <input
            type="password"
            required
            minLength={4}
            placeholder="Your password"
            value={form.password}
            onChange={(event) => updateField("password", event.target.value)}
            style={baseInputStyles}
          />
        </label>

        {error && <p style={{ color: "#dc2626", fontWeight: 600 }}>{error}</p>}
        {message && <p style={{ color: "#059669", fontWeight: 600 }}>{message}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            ...baseButtonStyles,
            background: "linear-gradient(120deg, #2563eb, #10b981)",
            color: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {isSubmitting ? "Please wait..." : mode === "login" ? "Login" : "Create account"}
        </button>
      </form>
    </section>
  );
}
