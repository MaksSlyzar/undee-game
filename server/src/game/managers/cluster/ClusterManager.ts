import Cluster from "@core/cluster";
import Player from "@core/player";

export default class ClusterManager {
  private clusters: Record<string, Cluster> = {};

  constructor() {
    this.createCluster("Start");
  }

  createCluster(name: string): Cluster {
    const cluster = new Cluster(name);
    this.clusters[cluster.id] = cluster;
    return cluster;
  }

  getCluster(id: string): Cluster | undefined {
    return this.clusters[id];
  }

  deleteCluster(id: string): boolean {
    if (this.clusters[id]) {
      delete this.clusters[id];
      return true;
    }
    return false;
  }

  addPlayerToCluster(clusterId: string, player: Player): boolean {
    const cluster = this.clusters[clusterId];
    if (!cluster) return false;

    cluster.players[player.id] = player;
    cluster.addPlayer(player);
    return true;
  }

  removePlayerFromCluster(clusterId: string, playerId: string): boolean {
    const cluster = this.clusters[clusterId];
    if (!cluster || !cluster.players[playerId]) return false;

    delete cluster.players[playerId];
    return true;
  }

  getAllClusters(): Cluster[] {
    return Object.values(this.clusters);
  }

  update(delta: number): void {
    for (let clusterid in this.clusters) {
      this.clusters[clusterid].update(delta);
    }
  }
}

