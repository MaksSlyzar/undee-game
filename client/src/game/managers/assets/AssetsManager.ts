import { Assets, Sprite, Texture } from "pixi.js";

export default class AssetManager {
  private assets = new Map<string, any>();
  private bundles = new Map<string, Record<string, any>>();

  async loadAsset(key: string, url: string): Promise<any> {
    if (this.assets.has(key)) return this.assets.get(key);
    const asset = await Assets.load(url);
    this.assets.set(key, asset);
    return asset;
  }

  async loadBundle(bundleName: string, assetMap: Record<string, string>): Promise<Record<string, any>> {
    if (this.bundles.has(bundleName)) return this.bundles.get(bundleName)!;
    Assets.addBundle(bundleName, assetMap);
    const loaded = await Assets.loadBundle(bundleName);
    Object.entries(loaded).forEach(([key, value]) => {
      this.assets.set(key, value);
    });
    this.bundles.set(bundleName, loaded);
    return loaded;
  }

  get<T = any>(key: string): T | undefined {
    return this.assets.get(key);
  }

  getSprite(key: string): Sprite {
    const tex = this.assets.get(key);
    if (!tex || !(tex instanceof Texture)) throw new Error(`Asset '${key}' is not a Texture.`);
    return new Sprite(tex);
  }

  clear(): void {
    this.assets.clear();
    this.bundles.clear();
  }
}

