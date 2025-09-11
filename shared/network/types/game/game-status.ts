// Client → Server
export type GameStatusClient = {
  type: "connect" | "disconnect";
};

// Server → Client
export type GameStatusServer = {
  type: "connected" | "disconnected";
  data: string;
};

