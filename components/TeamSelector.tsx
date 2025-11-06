"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "./TeamSelector.module.css";
import { getTeams, Team } from "@services/teamService";

interface TeamSelectorProps {
  favorites: number[];
  onSave: (selected: number[]) => void;
}

type Status = "idle" | "error" | "success";

const TeamSelector = ({ favorites, onSave }: TeamSelectorProps) => {
  const teams = useMemo<Team[]>(() => getTeams(), []);
  const [selected, setSelected] = useState<number[]>(favorites);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    setSelected(favorites);
    setStatus("idle");
    setMessage("");
  }, [favorites]);

  const toggleTeam = (teamId: number) => {
    setSelected((prev) =>
      prev.includes(teamId)
        ? prev.filter((id) => id !== teamId)
        : [...prev, teamId]
    );
  };

  const handleSave = () => {
    if (selected.length === 0) {
      setMessage("Select at least one team to continue.");
      setStatus("error");
      return;
    }

    onSave(selected);
    setStatus("success");
    setMessage("Favorite teams saved.");
  };

  const messageStyle = status === "error" ? styles.error : styles.success;

  return (
    <section className={styles.card}>
      <header className={styles.header}>
        <div>
          <h2 className={styles.title}>Favorite teams</h2>
          <p className={styles.subtitle}>Pick the clubs you want to follow.</p>
        </div>
      </header>

      <ul className={styles.list}>
        {teams.map((team) => (
          <li key={team.id} className={styles.item}>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={selected.includes(team.id)}
                onChange={() => toggleTeam(team.id)}
              />
              <span>
                <span className={styles.teamName}>{team.name}</span>
                <span className={styles.meta}>
                  {team.league} • {team.country}
                </span>
              </span>
            </label>
            <Link className={styles.detailLink} href={`/teams/${team.id}`}>
              Team details
            </Link>
          </li>
        ))}
      </ul>

      {message && <p className={messageStyle}>{message}</p>}

      <button type="button" className={styles.save} onClick={handleSave}>
        Save favorites
      </button>
    </section>
  );
};

export default TeamSelector;
