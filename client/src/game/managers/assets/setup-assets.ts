import AssetManager from "./AssetsManager";

export default async function setupAssets(manager: AssetManager) {
  await manager.loadBundle("game", {
    tile: "/assets/justtile.png"
  });
}
