import { ClassicBowServer, ClassicSwordServer } from "./weapon";

export type ItemServer = {
  id: string;
  name: string;
  amount: number;
};


export interface EmptyItemServer extends ItemServer {
  id: "empty";
  name: "Void";
  amount: number;
}

export type ItemBaseServer = ClassicSwordServer | ClassicBowServer | EmptyItemServer;

