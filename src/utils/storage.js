const PREFIX = 'movie:v1:';

export const storage = {
  set(key, value) {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
      return true;
    } catch (err) {
      console.error('[storage.set] failed:', err);
      return false;
    }
  },

  get(key, defaultValue = null) {
    try {
      const raw = localStorage.getItem(PREFIX + key);
      if (raw === null) return defaultValue;
      return JSON.parse(raw);
    } catch (err) {
      console.error('[storage.get] failed:', err);
      return defaultValue;
    }
  },

  remove(key) {
    localStorage.removeItem(PREFIX + key);
  },

  clearAll() {
    Object.keys(localStorage)
      .filter((k) => k.startsWith(PREFIX))
      .forEach((k) => localStorage.removeItem(k));
  },
};
