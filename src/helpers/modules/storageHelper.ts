const getStorageItem = (key: string) => {
  const storedValue = localStorage.getItem(key) ?? '';
  return typeof storedValue === 'string' ? storedValue : JSON.parse(localStorage.getItem(key) ?? '');
};

const storageHelper = {
  local: {
    get(key: string): string {
      return getStorageItem(key);
    },
    set(key: string, value: unknown): void {
      localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
    },
    remove(key: string) {
      localStorage.removeItem(key);
    },
    clean(startsWithArray: string[]) {
      Object.keys(localStorage).forEach((key) => {
        startsWithArray.forEach((item) => {
          const KEY = key.startsWith(item);
          if (KEY) {
            localStorage.removeItem(key);
          }
        });
      });
    },
  },
};

export default storageHelper;
