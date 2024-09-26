import { openDB, IDBPDatabase } from "idb";

class IndexedDBTileCache {
  private db: IDBPDatabase | null = null;

  async init() {
    this.db = await openDB("map-tiles-cache", 1, {
      upgrade(db) {
        db.createObjectStore("tiles");
      },
    });
  }

  async getTile(url: string): Promise<Blob | null> {
    if (!this.db) await this.init();
    return this.db!.get("tiles", url);
  }

  async setTile(url: string, tileBlob: Blob) {
    if (!this.db) await this.init();
    await this.db!.put("tiles", tileBlob, url);
  }
}

export default new IndexedDBTileCache();
