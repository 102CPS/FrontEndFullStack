"use client";
import Link from "next/link";
import { useMemo } from "react";
import TeamSelector from "@components/TeamSelector";
import MatchList from "@components/MatchList";
import { saveFavorites, UserProfile } from "@services/authService";
import { getTeamById } from "@services/teamService";

interface DashboardProps {
  user: UserProfile;
  onUserUpdate: (updated: UserProfile) => void;
  onLogout: () => void;
}

export default function Dashboard({ user, onUserUpdate, onLogout }: DashboardProps) {
  const favoriteTeams = useMemo(
    () =>
      user.favorites
        .map((teamId) => getTeamById(teamId))
        .filter((team): team is NonNullable<typeof team> => Boolean(team)),
    [user.favorites]
  );

  const handleFavoritesSave = (teamIds: number[]) => {
    const updated = saveFavorites(user.email, teamIds);
    if (updated) {
      onUserUpdate(updated);
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard__hero">
        <div>
          <h1 className="dashboard__hero-title">Welcome back</h1>
          <p className="dashboard__hero-subtitle">{user.email}</p>
        </div>
        <button onClick={onLogout} className="dashboard__logout">
          Logout
        </button>
      </header>

      <TeamSelector selectedFavorites={user.favorites} onSave={handleFavoritesSave} />

      <section className="dashboard__favorites">
        <h2 className="dashboard__favorites-title">Favorite teams</h2>
        {favoriteTeams.length === 0 ? (
          <p className="dashboard__favorites-empty">Save at least one team to start tracking updates.</p>
        ) : (
          <ul className="dashboard__favorites-list">
            {favoriteTeams.map((team) => (
              <li key={team.id} className="dashboard__favorites-item">
                <Link href={`/teams/${team.id}`} className="dashboard__favorites-link">
                  <span>{team.name}</span>
                  <span className="dashboard__favorites-league">{team.league}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <MatchList favoriteTeamIds={user.favorites} />
    </div>
  );
}
