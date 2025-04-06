import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import GameWindow from './GameWindow.tsx'
import Game from "./game_files/Game.js";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GameWindow  game={new Game()}/>
  </StrictMode>,
)
