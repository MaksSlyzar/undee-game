export type GameStatusRecv = {
  type: "connect" | "disconnect"
};

export type GameStatusEmi = {
  type: "connected" | "disconnected",
  data: string,
};


