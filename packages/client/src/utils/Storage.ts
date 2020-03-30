export default class Storage {
  public static async get<T>(key: string): Promise<T | null> {
    let item: T | null = null;

    const raw: string | null = localStorage.getItem(key);

    if (raw) {
      try {
        item = JSON.parse(raw) as T;
      } catch (e) {
      }
    }

    return item;
  }

  public static async set<T>(key: string, item: T | null): Promise<void> {
    try {
      localStorage.setItem(key, JSON.stringify(item));
    } catch (e) {
    }
  }

  public static async remove<T>(key: string): Promise<void> {
    localStorage.removeItem(key);
  }

  public static async clear(): Promise<void> {
    await localStorage.clear();
  }
}
