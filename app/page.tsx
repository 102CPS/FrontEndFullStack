"use client";
import { useEffect, useState } from "react";
import AuthPanel from "@components/AuthPanel";
import Dashboard from "@components/Dashboard";
import { getCurrentUser, logoutUser, UserProfile } from "@services/authService";

export default function Home() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isBootstrapped, setIsBootstrapped] = useState(false);

  useEffect(() => {
    const profile = getCurrentUser();
    if (profile) {
      setUser(profile);
    }
    setIsBootstrapped(true);
  }, []);

  const handleAuthenticated = (profile: UserProfile) => {
    setUser(profile);
  };

  const handleUserUpdate = (profile: UserProfile) => {
    setUser(profile);
  };

  const handleLogout = () => {
    logoutUser();
    setUser(null);
  };

  if (!isBootstrapped) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #0f172a, #1e3a8a)",
          color: "#fff",
          fontSize: "1.2rem",
        }}
      >
        Loading FootTrack...
      </div>
    );
  }

  const isAuthenticated = Boolean(user);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: isAuthenticated ? "40px 24px" : "80px 24px",
        background: isAuthenticated
          ? "linear-gradient(180deg, #0f172a, #1e3a8a 40%, #0f172a)"
          : "linear-gradient(160deg, #0f172a, #1d4ed8)",
        display: "flex",
        justifyContent: "center",
        alignItems: isAuthenticated ? "flex-start" : "center",
      }}
    >
      {isAuthenticated && user ? (
        <Dashboard user={user} onUserUpdate={handleUserUpdate} onLogout={handleLogout} />
      ) : (
        <AuthPanel onAuthenticated={handleAuthenticated} />
      )}
    </div>
  );
}
