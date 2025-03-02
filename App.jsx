import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import GuessNumber from './pages/GuessNumber'
import TicTacToe from './pages/TicTacToe'
import RockPaperScissors from './pages/RockPaperScissors'

export default function App() {
    const themes = {
        blue:  'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
        yellow:'linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)',
        pink:  'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)'
    }

    const [theme, setTheme] = useState('blue')

    const containerStyle = {
        minHeight: '100vh',
        background: themes[theme],
        transition: 'background 0.5s ease'
    }

    return (
        <div style={containerStyle}>
            <Routes>
                <Route path="/" element={<HomePage setTheme={setTheme} />} />
                <Route path="/guess-number" element={<GuessNumber />} />
                <Route path="/tic-tac-toe" element={<TicTacToe />} />
                <Route path="/rock-paper-scissors" element={<RockPaperScissors />} />
            </Routes>
        </div>
    )
}
