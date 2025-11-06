export interface Credentials {
  email: string;
  password: string;
}

export interface UserProfile {
  email: string;
  favorites: number[];
}

const USERS_KEY = "foottrack_users";
const SESSION_KEY = "foottrack_session";

interface StoredUser extends Credentials {
  favorites: number[];
}

type UserStore = Record<string, StoredUser>;

const hasWindow = () => typeof window !== "undefined";

const readStore = (): UserStore => {
  if (!hasWindow()) return {};
  try {
    const raw = window.localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as UserStore) : {};
  } catch (error) {
    console.error("Unable to read user store", error);
    return {};
  }
};

const writeStore = (store: UserStore) => {
  if (!hasWindow()) return;
  window.localStorage.setItem(USERS_KEY, JSON.stringify(store));
};

const setSession = (email: string | null) => {
  if (!hasWindow()) return;
  if (email) {
    window.localStorage.setItem(SESSION_KEY, email);
  } else {
    window.localStorage.removeItem(SESSION_KEY);
  }
};

export const registerUser = async ({ email, password }: Credentials) => {
  const trimmedEmail = email.trim().toLowerCase();
  if (!trimmedEmail || !password) {
    throw new Error("Email and password are required.");
  }
  const store = readStore();
  if (store[trimmedEmail]) {
    throw new Error("An account with this email already exists.");
  }
  store[trimmedEmail] = { email: trimmedEmail, password, favorites: [] };
  writeStore(store);
  return { email: trimmedEmail, favorites: [] } satisfies UserProfile;
};

export const loginUser = async ({ email, password }: Credentials) => {
  const trimmedEmail = email.trim().toLowerCase();
  const store = readStore();
  const user = store[trimmedEmail];
  if (!user || user.password !== password) {
    throw new Error("Invalid email or password.");
  }
  setSession(trimmedEmail);
  return { email: user.email, favorites: user.favorites.slice() } satisfies UserProfile;
};

export const getCurrentUser = (): UserProfile | null => {
  if (!hasWindow()) return null;
  const store = readStore();
  const email = window.localStorage.getItem(SESSION_KEY) ?? "";
  const user = store[email];
  return user ? { email: user.email, favorites: user.favorites.slice() } : null;
};

export const saveFavorites = (email: string, favorites: number[]) => {
  const store = readStore();
  const user = store[email];
  if (!user) return null;
  user.favorites = [...new Set(favorites)];
  writeStore(store);
  setSession(email);
  return { email: user.email, favorites: user.favorites.slice() } satisfies UserProfile;
};

export const logoutUser = () => {
  setSession(null);
};
