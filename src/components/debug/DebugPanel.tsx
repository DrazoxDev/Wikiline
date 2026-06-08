import {
  useDebugActions,
  useDebugEnabled,
  useDebugLoadingProgress,
  useDebugLoadingStep,
  useDebugLogs,
} from "../../stores/debug/debug.selectors";

const LEVEL_STYLES = {
  info: "text-blue-700 bg-blue-50 border-blue-200",
  success: "text-green-700 bg-green-50 border-green-200",
  warn: "text-amber-700 bg-amber-50 border-amber-200",
  error: "text-red-700 bg-red-50 border-red-200",
};

export default function DebugPanel() {
  const logs = useDebugLogs();
  const enabled = useDebugEnabled();
  const loadingStep = useDebugLoadingStep();
  const loadingProgress = useDebugLoadingProgress();
  const { clear, toggle } = useDebugActions();

  if (!enabled) {
    return (
      <button
        type="button"
        onClick={toggle}
        className="fixed bottom-4 right-4 z-50 bg-gray-800 text-white text-xs px-3 py-2 rounded-lg shadow-lg"
      >
        Afficher debug
      </button>
    );
  }

  const progressPercent = loadingProgress
    ? Math.round((loadingProgress.current / loadingProgress.target) * 100)
    : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t-2 border-gray-800 bg-gray-900 text-white shadow-2xl max-h-[45vh] flex flex-col">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700 shrink-0">
        <div className="flex items-center gap-4">
          <span className="font-bold text-sm">Debug WikiLine</span>
          {loadingStep && (
            <span className="text-amber-300 text-xs animate-pulse">
              {loadingStep}
              {loadingProgress &&
                ` (${loadingProgress.current}/${loadingProgress.target})`}
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={clear}
            className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded"
          >
            Effacer
          </button>
          <button
            type="button"
            onClick={toggle}
            className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded"
          >
            Masquer
          </button>
        </div>
      </div>

      {loadingProgress && (
        <div className="px-4 py-2 bg-gray-850 shrink-0">
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#21897E] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      <div className="overflow-y-auto flex-1 p-2 space-y-1 font-mono text-xs">
        {logs.length === 0 && (
          <p className="text-gray-500 px-2 py-4 text-center">
            Aucun log pour l'instant. Lancez une partie pour voir les appels API.
          </p>
        )}
        {logs.map((entry) => (
          <div
            key={entry.id}
            className={`border rounded px-2 py-1 ${LEVEL_STYLES[entry.level]}`}
          >
            <div className="flex gap-2 flex-wrap">
              <span className="text-gray-500">{entry.time}</span>
              <span className="font-bold">[{entry.source}]</span>
              <span>{entry.message}</span>
            </div>
            {entry.detail && (
              <pre className="mt-1 text-[10px] whitespace-pre-wrap break-all opacity-80">
                {entry.detail}
              </pre>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
