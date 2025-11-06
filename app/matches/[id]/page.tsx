"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { getMatchById } from "@services/matchService";
import { getTeamById } from "@services/teamService";

export default function MatchDetailsPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const matchId = Number(params?.id);

  const match = useMemo(() => getMatchById(matchId), [matchId]);

  const homeTeam = match ? getTeamById(match.homeTeamId) : null;
  const awayTeam = match ? getTeamById(match.awayTeamId) : null;

  if (!match || !homeTeam || !awayTeam) {
    return (
      <div className="match-page">
        <div className="match-page__card">
          <h1 className="match-page__missing-title">Match not found</h1>
          <button onClick={() => router.push("/")} className="match-page__primary-btn">
            Back to dashboard
          </button>
        </div>
      </div>
    );
  }

  const formatScore = match.score ? `${match.score.home} - ${match.score.away}` : "TBD";

  return (
    <div className="match-page">
      <div className="match-page__card">
        <div>
          <button onClick={() => router.back()} className="match-page__back-btn">
            Back
          </button>
          <h1 className="match-page__title">
            {homeTeam.name} vs {awayTeam.name}
          </h1>
          <p className="match-page__meta">
            {new Date(match.date).toLocaleString(undefined, {
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p className="match-page__score">Result: {formatScore}</p>
        </div>

        <section>
          <h2 className="match-page__section-title">Goals</h2>
          {match.stats?.goals.length ? (
            <ul className="match-page__list">
              {match.stats.goals.map((goal, index) => {
                const team = getTeamById(goal.teamId);
                return (
                  <li key={`${goal.player}-${index}`} className="match-page__list-item">
                    {goal.player} ({team?.name}) — {goal.minute}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="match-page__empty">No goals recorded.</p>
          )}
        </section>

        <section>
          <h2 className="match-page__section-title">Assists</h2>
          {match.stats?.assists.length ? (
            <ul className="match-page__list">
              {match.stats.assists.map((assist, index) => {
                const team = getTeamById(assist.teamId);
                return (
                  <li key={`${assist.player}-${index}`} className="match-page__list-item">
                    {assist.player} ({team?.name}) — {assist.minute}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="match-page__empty">No assists recorded.</p>
          )}
        </section>

        <section>
          <h2 className="match-page__section-title">Cards</h2>
          {match.stats?.cards.length ? (
            <ul className="match-page__list">
              {match.stats.cards.map((card, index) => {
                const team = getTeamById(card.teamId);
                return (
                  <li key={`${card.player}-${index}`} className="match-page__list-item">
                    {card.player} ({team?.name}) — {card.minute} {card.type.toUpperCase()}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="match-page__empty">No cards shown.</p>
          )}
        </section>

        <button onClick={() => router.push("/")} className="match-page__primary-btn">
          Back to dashboard
        </button>
      </div>
    </div>
  );
}
