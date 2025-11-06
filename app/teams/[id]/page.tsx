"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getTeamById } from "@services/teamService";
import { getUpcomingMatchesForTeam, Match } from "@services/matchService";

export default function TeamDetailsPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const teamId = Number(params?.id);
  const team = useMemo(() => getTeamById(teamId), [teamId]);
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([]);

  useEffect(() => {
    if (!team) return;
    const loadMatches = () => {
      setUpcomingMatches(getUpcomingMatchesForTeam(team.id));
    };
    loadMatches();
    const interval = setInterval(loadMatches, 30000);
    return () => clearInterval(interval);
  }, [team]);

  if (!team) {
    return (
      <div className="team-page">
        <div className="team-page__card">
          <h1 className="team-page__missing-title">Team not found</h1>
          <button onClick={() => router.push("/")} className="team-page__primary-btn">
            Back to dashboard
          </button>
        </div>
      </div>
    );
  }

  const { wins, draws, losses } = team.performance;

  return (
    <div className="team-page">
      <div className="team-page__card">
        <div>
          <button onClick={() => router.push("/")} className="team-page__back-btn">
            Back
          </button>
          <h1 className="team-page__title">{team.name}</h1>
          <p className="team-page__meta">
            {team.league} · {team.country}
          </p>
        </div>

        <section>
          <h2 className="team-page__section-title">Performance</h2>
          <div className="team-page__stats-grid">
            <div className="team-page__stat">
              <span className="team-page__stat-value team-page__stat-value--wins">{wins}</span>
              <p className="team-page__stat-label">Wins</p>
            </div>
            <div className="team-page__stat">
              <span className="team-page__stat-value team-page__stat-value--draws">{draws}</span>
              <p className="team-page__stat-label">Draws</p>
            </div>
            <div className="team-page__stat">
              <span className="team-page__stat-value team-page__stat-value--losses">{losses}</span>
              <p className="team-page__stat-label">Losses</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="team-page__section-title">Upcoming fixtures</h2>
          {upcomingMatches.length === 0 ? (
            <p className="team-page__empty">No upcoming fixtures scheduled.</p>
          ) : (
            <ul className="team-page__fixtures">
              {upcomingMatches.map((match) => {
                const opponentId = match.homeTeamId === team.id ? match.awayTeamId : match.homeTeamId;
                const opponent = getTeamById(opponentId);
                return (
                  <li key={match.id} className="team-page__fixture-item">
                    <span className="team-page__fixture-opponent">
                      vs {opponent?.name ?? "TBD"}
                    </span>
                    <span className="team-page__fixture-date">
                      {new Date(match.date).toLocaleString(undefined, {
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
