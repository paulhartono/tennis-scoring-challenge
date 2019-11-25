
import { PlayerScore } from "./player-score";
import Player from "../player";

export type SetScore = {
  winner?: Player,
  scoreA: PlayerScore
  scoreB: PlayerScore
}