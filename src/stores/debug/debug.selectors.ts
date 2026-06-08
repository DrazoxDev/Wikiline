import { useDebugStore } from "./useDebugStore";

export const useDebugLogs = () => useDebugStore((state) => state.logs);

export const useDebugEnabled = () => useDebugStore((state) => state.enabled);

export const useDebugLoadingStep = () =>
  useDebugStore((state) => state.loadingStep);

export const useDebugLoadingProgress = () =>
  useDebugStore((state) => state.loadingProgress);

export const useDebugActions = () => useDebugStore((state) => state.actions);
