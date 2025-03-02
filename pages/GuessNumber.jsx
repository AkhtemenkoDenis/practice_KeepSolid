// Реалізує гру "Вгадай число". Генерує випадкове число від 1 до 100 і користувач повинен вгадати

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function GuessNumber() {
    const [target, setTarget] = useState(null)
    const [guess, setGuess] = useState('')
    const [message, setMessage] = useState('')
    const [attempts, setAttempts] = useState(0)
    const [winAnimation, setWinAnimation] = useState(false)

    useEffect(() => {
        // Генеруємо випадкове число 1-100 при першому завантаженні
        setTarget(Math.floor(Math.random() * 100) + 1)
    }, [])

    const handleGuess = () => {
        const num = parseInt(guess)
        if (isNaN(num)) {
            setMessage("Будь ласка, введіть коректне число.")
            return
        }
        setAttempts(attempts + 1)
        if (num === target) {
            setMessage(`Ви вгадали! Кількість спроб: ${attempts + 1}.`)
            setWinAnimation(true)
        } else if (num < target) {
            setMessage("Занадто маленьке! Спробуйте більше.")
        } else {
            setMessage("Занадто велике! Спробуйте менше.")
        }
    }

    const resetGame = () => {
        setTarget(Math.floor(Math.random() * 100) + 1)
        setGuess('')
        setMessage('')
        setAttempts(0)
        setWinAnimation(false)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                maxWidth: '400px',
                margin: '2rem auto',
                padding: '2rem',
                backgroundColor: 'rgba(255,255,255,0.8)',
                border: '3px solid #ff7043',
                borderRadius: '16px',
                boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                textAlign: 'center'
            }}
        >
            <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                Вгадай число
            </motion.h2>

            <p>Загадав число від 1 до 100. Чи зможете ви його вгадати?</p>
            <div>
                <input
                    type="number"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    style={{
                        padding: '0.5rem',
                        fontSize: '1rem',
                        marginRight: '0.5rem',
                        borderRadius: '4px',
                        border: '1px solid #ccc'
                    }}
                />
                <button
                    onClick={handleGuess}
                    style={{
                        padding: '0.5rem 1rem',
                        fontSize: '1rem',
                        backgroundColor: '#42a5f5',
                        border: 'none',
                        borderRadius: '4px',
                        color: '#fff',
                        cursor: 'pointer'
                    }}
                >
                    Спробувати
                </button>
            </div>

            <motion.div
                animate={winAnimation ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
                transition={{ duration: 1, repeat: winAnimation ? Infinity : 0 }}
                style={{ marginTop: '1rem' }}
            >
                {message && <p>{message}</p>}
            </motion.div>

            <div style={{ marginTop: '1rem' }}>
                <button
                    onClick={resetGame}
                    style={{
                        padding: '0.5rem 1rem',
                        fontSize: '1rem',
                        backgroundColor: '#66bb6a',
                        border: 'none',
                        borderRadius: '4px',
                        color: '#fff',
                        cursor: 'pointer'
                    }}
                >
                    Почати заново
                </button>
            </div>
            <div style={{ marginTop: '2rem' }}>
                <Link to="/" style={{ color: '#42a5f5', fontWeight: 'bold' }}>
                    Повернутися на головну
                </Link>
            </div>
        </motion.div>
    )
}
