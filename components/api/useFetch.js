import { useCallback, useEffect, useState } from "react";
import { api } from "./client.js";

/**
 * @param {string | null} path
 * @param {{ deps?: unknown[]; enabled?: boolean }} [options]
 */
export function useFetch(path, options = {}) {
  const { deps = [], enabled = true } = options;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(path && enabled));
  const [error, setError] = useState(null);

  const reload = useCallback(async () => {
    if (!path || !enabled) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const result = await api.get(path);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка загрузки");
    } finally {
      setLoading(false);
    }
  }, [path, enabled]);

  useEffect(() => {
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload, ...deps]);

  return { data, loading, error, reload, setData };
}
