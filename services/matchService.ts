export interface MatchStats {
  goals: { player: string; teamId: number; minute: string }[];
  assists: { player: string; teamId: number; minute: string }[];
  cards: { player: string; teamId: number; minute: string; type: "yellow" | "red" }[];
}

export interface Match {
  id: number;
  homeTeamId: number;
  awayTeamId: number;
  date: string;
  status: "scheduled" | "finished";
  score: { home: number; away: number } | null;
  stats?: MatchStats;
}

const matches: Match[] = [
  {
    id: 1,
    homeTeamId: 2,
    awayTeamId: 5,
    date: "2025-10-12T18:00:00Z",
    status: "finished",
    score: { home: 2, away: 1 },
    stats: {
      goals: [
        { player: "Ousmane Dembélé", teamId: 2, minute: "45'" },
        { player: "Kylian Mbappé", teamId: 2, minute: "68'" },
        { player: "Alexandre Lacazette", teamId: 5, minute: "73'" },
      ],
      assists: [
        { player: "Achraf Hakimi", teamId: 2, minute: "45'" },
        { player: "Vitinha", teamId: 2, minute: "68'" },
      ],
      cards: [
        { player: "Lucas Hernández", teamId: 2, minute: "22'", type: "yellow" },
      ],
    },
  },
  {
    id: 2,
    homeTeamId: 2,
    awayTeamId: 6,
    date: "2025-10-14T20:00:00Z",
    status: "scheduled",
    score: null,
    stats: {
      goals: [],
      assists: [],
      cards: [],
    },
  },
  {
    id: 3,
    homeTeamId: 3,
    awayTeamId: 4,
    date: "2025-10-15T16:30:00Z",
    status: "scheduled",
    score: null,
    stats: {
      goals: [],
      assists: [],
      cards: [],
    },
  },
];

export const getMatches = () => matches.slice();

export const getMatchById = (id: number) => matches.find((match) => match.id === id) ?? null;

export const getMatchesForTeams = (teamIds: number[]) =>
  matches.filter(
    (match) => teamIds.includes(match.homeTeamId) || teamIds.includes(match.awayTeamId)
  );

export const getUpcomingMatchesForTeam = (teamId: number) =>
  matches.filter((match) => {
    const isTeamMatch = match.homeTeamId === teamId || match.awayTeamId === teamId;
    if (!isTeamMatch) return false;
    if (!match.date) return false;
    return new Date(match.date).getTime() >= Date.now();
  });
