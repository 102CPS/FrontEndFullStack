export interface Match {
  id: number;
  home: string;
  away: string;
  date: string;
  score: string | null;
}

export const getMatches = (): Match[] => [
  // 🕓 Past Matches
  { id: 1, home: "Barcelona", away: "Real Madrid", date: "2025-10-30", score: "3-2" },
  { id: 2, home: "Real Madrid", away: "Valencia", date: "2025-11-02", score: "4-1" },
  { id: 3, home: "Liverpool", away: "Chelsea", date: "2025-11-05", score: "1-0" },
  { id: 4, home: "Bayern Munich", away: "Dortmund", date: "2025-11-07", score: "2-2" },

  // 🟢 Upcoming Matches (Nov 2025 – Jun 2026)
  { id: 5, home: "Barcelona", away: "Atletico Madrid", date: "2025-11-12", score: null },
  { id: 6, home: "Real Madrid", away: "Athletic Bilbao", date: "2025-11-14", score: null },
  { id: 7, home: "Liverpool", away: "Manchester United", date: "2025-11-20", score: null },
  { id: 8, home: "Bayern Munich", away: "Leipzig", date: "2025-12-01", score: null },
  { id: 9, home: "Barcelona", away: "Sevilla", date: "2025-12-10", score: null },
  { id: 10, home: "Liverpool", away: "Arsenal", date: "2026-01-15", score: null },
  { id: 11, home: "Bayern Munich", away: "Stuttgart", date: "2026-02-05", score: null },
  { id: 12, home: "Real Madrid", away: "Atletico Madrid", date: "2026-03-08", score: null },
  { id: 13, home: "Liverpool", away: "Tottenham", date: "2026-04-17", score: null },
  { id: 14, home: "Barcelona", away: "Villarreal", date: "2026-05-21", score: null },
  { id: 15, home: "Bayern Munich", away: "Frankfurt", date: "2026-06-02", score: null },
];
