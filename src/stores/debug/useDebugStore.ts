import { create } from "zustand";
import type { DebugLevel, DebugStore } from "./debug.types";

const MAX_LOGS = 200;

function formatTime(): string {
  return new Date().toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export const useDebugStore = create<DebugStore>((set, get) => ({
  enabled: true,
  logs: [],
  loadingStep: null,
  loadingProgress: null,
  actions: {
    log: (source, level, message, detail) => {
      const entry = {
        id: crypto.randomUUID(),
        time: formatTime(),
        level,
        source,
        message,
        detail,
      };

      const prefix = `[${source}] ${message}`;
      if (level === "error") console.error(prefix, detail ?? "");
      else if (level === "warn") console.warn(prefix, detail ?? "");
      else console.log(prefix, detail ?? "");

      if (!get().enabled) return;

      set((state) => ({
        logs: [entry, ...state.logs].slice(0, MAX_LOGS),
      }));
    },

    setLoadingProgress: (step, progress = null) => {
      set({ loadingStep: step, loadingProgress: progress });
    },

    clear: () =>
      set({ logs: [], loadingStep: null, loadingProgress: null }),

    toggle: () => set((state) => ({ enabled: !state.enabled })),
  },
}));

export function debugLog(
  source: string,
  level: DebugLevel,
  message: string,
  detail?: string,
) {
  useDebugStore.getState().actions.log(source, level, message, detail);
}
