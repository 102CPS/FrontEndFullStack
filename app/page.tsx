"use client";

import { useMemo, useState } from "react";
import AuthPanel, { AuthResult, Credentials } from "@components/AuthPanel";
import MatchList from "@components/MatchList";
import TeamSelector from "@components/TeamSelector";
import styles from "./page.module.css";

interface User {
  id: string;
  email: string;
  password: string;
  favorites: number[];
}

const createUserId = () =>
  (typeof crypto !== "undefined" && crypto.randomUUID)
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2, 11);

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [activeUserId, setActiveUserId] = useState<string | null>(null);

  const activeUser = useMemo(
    () => users.find((user) => user.id === activeUserId) ?? null,
    [users, activeUserId]
  );

  const handleRegister = ({ email, password }: Credentials): AuthResult => {
    const normalizedEmail = email.trim().toLowerCase();

    if (users.some((user) => user.email === normalizedEmail)) {
      return { success: false, message: "Email is already registered." };
    }

    const user: User = {
      id: createUserId(),
      email: normalizedEmail,
      password,
      favorites: [],
    };

    setUsers((prev) => [...prev, user]);
    setActiveUserId(user.id);
    return { success: true, message: "Account created. Redirecting to dashboard." };
  };

  const handleLogin = ({ email, password }: Credentials): AuthResult => {
    const normalizedEmail = email.trim().toLowerCase();
    const user = users.find(
      (candidate) =>
        candidate.email === normalizedEmail && candidate.password === password
    );

    if (!user) {
      return { success: false, message: "Invalid email or password." };
    }

    setActiveUserId(user.id);
    return { success: true, message: "Login successful. Redirecting to dashboard." };
  };

  const handleSaveFavorites = (favorites: number[]) => {
    if (!activeUser) {
      return;
    }

    setUsers((prev) =>
      prev.map((user) =>
        user.id === activeUser.id ? { ...user, favorites } : user
      )
    );
  };

  const handleLogout = () => {
    setActiveUserId(null);
  };

  return (
    <div className={styles.page}>
      <div className={styles.gradient} />
      <div className={styles.content}>
        {activeUser ? (
          <main className={styles.dashboard}>
            <header className={styles.dashboardHeader}>
              <div>
                <span className={styles.welcome}>Welcome back</span>
                <h1 className={styles.dashboardTitle}>{activeUser.email}</h1>
              </div>
              <button type="button" className={styles.logout} onClick={handleLogout}>
                Log out
              </button>
            </header>

            <TeamSelector
              favorites={activeUser.favorites}
              onSave={handleSaveFavorites}
            />
            <MatchList favorites={activeUser.favorites} />
          </main>
        ) : (
          <AuthPanel onLogin={handleLogin} onRegister={handleRegister} />
        )}
      </div>
    </div>
  );
}
