export type DebugLevel = "info" | "success" | "warn" | "error";

export type DebugLogEntry = {
  id: string;
  time: string;
  level: DebugLevel;
  source: string;
  message: string;
  detail?: string;
};

export type DebugStore = {
  enabled: boolean;
  logs: DebugLogEntry[];
  loadingStep: string | null;
  loadingProgress: { current: number; target: number } | null;
  actions: {
    log: (
      source: string,
      level: DebugLevel,
      message: string,
      detail?: string,
    ) => void;
    setLoadingProgress: (
      step: string | null,
      progress?: { current: number; target: number } | null,
    ) => void;
    clear: () => void;
    toggle: () => void;
  };
};
