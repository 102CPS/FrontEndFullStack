import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./page.module.css";
import { getMatchById } from "@services/matchService";
import { getTeamMap, Team } from "@services/teamService";

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));

interface MatchPageProps {
  params: { id: string };
}

const resolveTeamName = (
  teamMap: Map<number, Team>,
  teamId?: number,
  fallback?: string
) => {
  if (teamId) {
    return teamMap.get(teamId)?.name ?? fallback ?? "Unknown team";
  }

  return fallback ?? "Unknown team";
};

const MatchDetailPage = ({ params }: MatchPageProps) => {
  const matchId = Number(params.id);

  if (Number.isNaN(matchId)) {
    notFound();
  }

  const match = getMatchById(matchId);

  if (!match) {
    notFound();
  }

  const teamMap = getTeamMap();
  const homeTeam = teamMap.get(match.homeTeamId);
  const awayTeamName = resolveTeamName(teamMap, match.away.teamId, match.away.name);
  const score = match.score
    ? `${match.score.home} - ${match.score.away}`
    : "TBD";

  const renderStat = <T extends { minute: string; player: string; teamId?: number; teamName?: string }>(
    title: string,
    empty: string,
    items: T[],
    formatter?: (item: T) => string | null
  ) => (
    <section className={styles.section}>
      <h3>{title}</h3>
      {items.length === 0 ? (
        <p className={styles.empty}>{empty}</p>
      ) : (
        <ul>
          {items.map((item, index) => {
            const extra = formatter?.(item);

            return (
              <li key={`${title}-${index}`}>
                <span className={styles.minute}>{item.minute}</span>
                <span className={styles.player}>{item.player}</span>
                <span className={styles.team}>
                  {resolveTeamName(teamMap, item.teamId, item.teamName)}
                </span>
                {extra && <span className={styles.extra}>{extra}</span>}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <p className={styles.date}>{formatDate(match.date)}</p>
        <h1 className={styles.title}>
          {homeTeam?.name ?? ""} vs {awayTeamName}
        </h1>
        <p className={styles.score}>Score: {score}</p>
        <p className={styles.meta}>
          {match.competition} • {match.venue}
        </p>
      </header>

      <div className={styles.links}>
        <Link className={styles.teamLink} href="/">
          Back to matches
        </Link>
        {homeTeam && (
          <Link className={styles.teamLink} href={`/teams/${homeTeam.id}`}>
            {homeTeam.name} details
          </Link>
        )}
        {match.away.teamId && (
          <Link className={styles.teamLink} href={`/teams/${match.away.teamId}`}>
            {awayTeamName} details
          </Link>
        )}
      </div>

      {renderStat("Goals", "No goals recorded yet.", match.stats.goals)}
      {renderStat("Assists", "No assists recorded yet.", match.stats.assists)}
      {renderStat(
        "Cards",
        "No cards shown.",
        match.stats.cards,
        (card) =>
          "card" in card && card.card
            ? `${card.card === "yellow" ? "Yellow" : "Red"} card`
            : null
      )}
    </div>
  );
};

export default MatchDetailPage;
