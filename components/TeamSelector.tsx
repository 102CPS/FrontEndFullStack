"use client";
import { useEffect, useMemo, useState } from "react";
import { getTeams } from "@services/teamService";

interface TeamSelectorProps {
  selectedFavorites: number[];
  onSave: (selected: number[]) => void;
}

export default function TeamSelector({ selectedFavorites, onSave }: TeamSelectorProps) {
  const teams = useMemo(() => getTeams(), []);
  const [selected, setSelected] = useState<number[]>(selectedFavorites);
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState("");

  useEffect(() => {
    setSelected(selectedFavorites);
  }, [selectedFavorites]);

  const toggleTeam = (teamId: number) => {
    setSelected((prev) =>
      prev.includes(teamId) ? prev.filter((id) => id !== teamId) : [...prev, teamId]
    );
  };

  const handleSave = () => {
    if (selected.length === 0) {
      setConfirmation("");
      setError("Select at least one team.");
      return;
    }
    setError("");
    onSave(selected);
    setConfirmation("Favorite teams saved to your profile.");
  };

  return (
    <section className="team-selector">
      <header className="team-selector__header">
        <h2 className="team-selector__title">
          Select your team(s)
        </h2>
        <p className="team-selector__subtitle">
          Choose the clubs you want to follow in your FootTrack dashboard.
        </p>
      </header>

      <div className="team-selector__options">
        {teams.map((team) => {
          const isSelected = selected.includes(team.id);
          return (
            <label
              key={team.id}
              className={
                isSelected
                  ? "team-selector__option team-selector__option--selected"
                  : "team-selector__option"
              }
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleTeam(team.id)}
                className="team-selector__checkbox"
              />
              <div>
                <div className="team-selector__option-name">{team.name}</div>
                <div className="team-selector__option-meta">
                  {team.league} · {team.country}
                </div>
              </div>
            </label>
          );
        })}
      </div>

      {error && <p className="team-selector__error">{error}</p>}
      {confirmation && <p className="team-selector__confirmation">{confirmation}</p>}

      <button onClick={handleSave} className="team-selector__submit">
        Save favorites
      </button>
    </section>
  );
}
