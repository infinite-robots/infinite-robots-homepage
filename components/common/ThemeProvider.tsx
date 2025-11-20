"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type Theme = "light" | "dark";
type ThemePreference = Theme | "system";

interface ThemeContextValue {
  readonly isReady: boolean;
  readonly theme: Theme;
  readonly systemTheme: Theme;
  readonly userPreference: ThemePreference;
  toggleTheme: () => void;
  setThemePreference: (preference: ThemePreference) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = "ir-theme";
const MEDIA_QUERY = "(prefers-color-scheme: dark)";

const isTheme = (value: unknown): value is Theme =>
  value === "light" || value === "dark";

const applyThemeClass = (theme: Theme) => {
  if (typeof document === "undefined") {
    return;
  }

  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [systemTheme, setSystemTheme] = useState<Theme>("light");
  const [userPreference, setUserPreference] =
    useState<ThemePreference>("system");
  const [isReady, setIsReady] = useState(false);
  const userPreferenceRef = useRef<Theme | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia(MEDIA_QUERY);
    const storedPreference = window.localStorage.getItem(STORAGE_KEY);
    const storedTheme = isTheme(storedPreference) ? storedPreference : null;

    const initialSystemTheme: Theme = mediaQuery.matches ? "dark" : "light";
    const initialTheme = storedTheme ?? initialSystemTheme;

    // Initialize state synchronously on mount - this is intentional
    if (storedTheme) {
      userPreferenceRef.current = storedTheme;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUserPreference(storedTheme);
    } else {
      setUserPreference("system");
    }

    setSystemTheme(initialSystemTheme);

    setTheme(initialTheme);
    applyThemeClass(initialTheme);

    setIsReady(true);

    const handleChange = (event: MediaQueryListEvent) => {
      const nextSystemTheme: Theme = event.matches ? "dark" : "light";
      setSystemTheme(nextSystemTheme);

      if (!userPreferenceRef.current) {
        setTheme(nextSystemTheme);
        applyThemeClass(nextSystemTheme);
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const setThemePreference = useCallback(
    (preference: ThemePreference) => {
      if (typeof window === "undefined") {
        return;
      }

      if (preference === "system") {
        window.localStorage.removeItem(STORAGE_KEY);
        userPreferenceRef.current = null;
        setUserPreference("system");
        setTheme(systemTheme);
        applyThemeClass(systemTheme);
        return;
      }

      window.localStorage.setItem(STORAGE_KEY, preference);
      userPreferenceRef.current = preference;
      setUserPreference(preference);
      setTheme(preference);
      applyThemeClass(preference);
    },
    [systemTheme],
  );

  const toggleTheme = useCallback(() => {
    setThemePreference(theme === "dark" ? "light" : "dark");
  }, [setThemePreference, theme]);

  const contextValue = useMemo<ThemeContextValue>(
    () => ({
      isReady,
      theme,
      systemTheme,
      userPreference,
      toggleTheme,
      setThemePreference,
    }),
    [
      isReady,
      setThemePreference,
      systemTheme,
      theme,
      toggleTheme,
      userPreference,
    ],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
