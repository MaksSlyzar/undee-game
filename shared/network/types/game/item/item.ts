import { ClassicBowServer, ClassicSwordServer } from "./weapon";

export type ItemServer = {
  id: string;
  name: string;
  amount: number;
};

export type ItemBaseServer = ClassicSwordServer | ClassicBowServer;

