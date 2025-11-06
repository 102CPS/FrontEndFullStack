export interface MatchScore {
  home: number;
  away: number;
}

export interface MatchStat {
  minute: string;
  player: string;
  teamId?: number;
  teamName?: string;
}

export interface CardStat extends MatchStat {
  card: "yellow" | "red";
}

export interface Match {
  id: number;
  date: string;
  competition: string;
  venue: string;
  homeTeamId: number;
  away: {
    teamId?: number;
    name: string;
  };
  score: MatchScore | null;
  stats: {
    goals: MatchStat[];
    assists: MatchStat[];
    cards: CardStat[];
  };
}

const matches: Match[] = [
  {
    id: 1,
    date: "2024-10-12",
    competition: "Ligue 1",
    venue: "Parc des Princes",
    homeTeamId: 2,
    away: { name: "Lyon" },
    score: { home: 2, away: 1 },
    stats: {
      goals: [
        { minute: "34'", player: "Kylian Mbappé", teamId: 2 },
        { minute: "68'", player: "Ousmane Dembélé", teamId: 2 },
        { minute: "74'", player: "Alexandre Lacazette", teamName: "Lyon" },
      ],
      assists: [
        { minute: "34'", player: "Achraf Hakimi", teamId: 2 },
        { minute: "68'", player: "Warren Zaïre-Emery", teamId: 2 },
        { minute: "74'", player: "Corentin Tolisso", teamName: "Lyon" },
      ],
      cards: [
        { minute: "59'", player: "Marquinhos", teamId: 2, card: "yellow" },
        { minute: "77'", player: "Anthony Lopes", teamName: "Lyon", card: "yellow" },
      ],
    },
  },
  {
    id: 2,
    date: "2024-10-14",
    competition: "Ligue 1",
    venue: "Parc des Princes",
    homeTeamId: 2,
    away: { name: "Nice" },
    score: null,
    stats: { goals: [], assists: [], cards: [] },
  },
  {
    id: 3,
    date: "2024-10-15",
    competition: "La Liga",
    venue: "Estadi Olímpic Lluís Companys",
    homeTeamId: 1,
    away: { name: "Real Madrid" },
    score: { home: 3, away: 2 },
    stats: {
      goals: [
        { minute: "12'", player: "Robert Lewandowski", teamId: 1 },
        { minute: "38'", player: "Ferran Torres", teamId: 1 },
        { minute: "71'", player: "Gavi", teamId: 1 },
        { minute: "44'", player: "Jude Bellingham", teamName: "Real Madrid" },
        { minute: "79'", player: "Vinícius Jr.", teamName: "Real Madrid" },
      ],
      assists: [
        { minute: "12'", player: "João Cancelo", teamId: 1 },
        { minute: "38'", player: "İlkay Gündoğan", teamId: 1 },
        { minute: "71'", player: "Pedri", teamId: 1 },
        { minute: "44'", player: "Rodrygo", teamName: "Real Madrid" },
        { minute: "79'", player: "Toni Kroos", teamName: "Real Madrid" },
      ],
      cards: [
        { minute: "52'", player: "Ronald Araújo", teamId: 1, card: "yellow" },
        { minute: "83'", player: "Dani Carvajal", teamName: "Real Madrid", card: "yellow" },
      ],
    },
  },
  {
    id: 4,
    date: "2024-10-18",
    competition: "Premier League",
    venue: "Anfield",
    homeTeamId: 3,
    away: { name: "Everton" },
    score: { home: 1, away: 0 },
    stats: {
      goals: [{ minute: "65'", player: "Mohamed Salah", teamId: 3 }],
      assists: [{ minute: "65'", player: "Trent Alexander-Arnold", teamId: 3 }],
      cards: [
        { minute: "24'", player: "Virgil van Dijk", teamId: 3, card: "yellow" },
        { minute: "73'", player: "Abdoulaye Doucouré", teamName: "Everton", card: "yellow" },
      ],
    },
  },
  {
    id: 5,
    date: "2024-10-19",
    competition: "Süper Lig",
    venue: "Şükrü Saracoğlu Stadium",
    homeTeamId: 4,
    away: { name: "Galatasaray" },
    score: null,
    stats: { goals: [], assists: [], cards: [] },
  },
  {
    id: 6,
    date: "2024-10-23",
    competition: "Champions League",
    venue: "Estadi Olímpic Lluís Companys",
    homeTeamId: 1,
    away: { teamId: 2, name: "PSG" },
    score: null,
    stats: { goals: [], assists: [], cards: [] },
  },
];

export const getMatches = (): Match[] => matches;

export const getMatchById = (id: number): Match | undefined =>
  matches.find((match) => match.id === id);

export const getMatchesByTeam = (teamId: number): Match[] =>
  matches.filter(
    (match) =>
      match.homeTeamId === teamId || match.away.teamId === teamId
  );
