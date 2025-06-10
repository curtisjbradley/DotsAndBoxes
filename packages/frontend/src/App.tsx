import GameWindow from "./GameWindow.tsx";
import Game from "./game_files/Game.ts";

export function App(){
    
    return (
        <GameWindow game={new Game()}/>
    )
}