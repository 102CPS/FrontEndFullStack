"use client";

import { useEffect, useState } from "react";
import AuthPanel from "@components/AuthPanel";
import Dashboard from "@components/Dashboard";
import { getCurrentUser, logoutUser, UserProfile } from "@services/authService";

export default function HomeShell() {
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
    return <div className="app-loading">Loading FootTrack...</div>;
  }

  const isAuthenticated = Boolean(user);

  return (
    <div className={isAuthenticated ? "app-shell app-shell--authenticated" : "app-shell"}>
      {isAuthenticated && user ? (
        <Dashboard user={user} onUserUpdate={handleUserUpdate} onLogout={handleLogout} />
      ) : (
        <AuthPanel onAuthenticated={handleAuthenticated} />
      )}
    </div>
  );
}
