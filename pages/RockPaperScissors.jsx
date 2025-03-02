// Реалізує гру "Камінь, Ножиці, Папір" зі змаганням з комп'ютером

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import rockImg from '../assets/rock.png'
import paperImg from '../assets/paper.png'
import scissorsImg from '../assets/scissors.png'

const choices = ['Rock', 'Paper', 'Scissors']
const icons = {
    Rock: rockImg,
    Paper: paperImg,
    Scissors: scissorsImg
}

export default function RockPaperScissors() {
    const [userChoice, setUserChoice] = useState(null)
    const [computerChoice, setComputerChoice] = useState(null)
    const [result, setResult] = useState('')

    const randomComputerChoice = () => {
        return choices[Math.floor(Math.random() * choices.length)]
    }

    const handleUserChoice = (choice) => {
        const compChoice = randomComputerChoice()
        setUserChoice(choice)
        setComputerChoice(compChoice)
        setResult(getResult(choice, compChoice))
    }

    const getResult = (user, comp) => {
        if (user === comp) return "Нічия!"
        if (
            (user === 'Rock' && comp === 'Scissors') ||
            (user === 'Paper' && comp === 'Rock') ||
            (user === 'Scissors' && comp === 'Paper')
        ) {
            return "Ви перемогли!"
        }
        return "Ви програли!"
    }

    const resetGame = () => {
        setUserChoice(null)
        setComputerChoice(null)
        setResult('')
    }

    const resultAnim = result === "Ви перемогли!"
        ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }
        : {}

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
                style={{ marginBottom: '1rem' }}
            >
                Камінь, Ножиці, Папір
            </motion.h2>

            <p>Натисніть на іконку, щоб зробити свій вибір:</p>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '1rem',
                    margin: '1rem 0'
                }}
            >
                {choices.map((choice) => (
                    <motion.button
                        key={choice}
                        onClick={() => handleUserChoice(choice)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        style={{
                            backgroundColor: 'transparent',
                            border: '2px solid #ff7043',
                            borderRadius: '50%',
                            padding: '0.5rem',
                            cursor: 'pointer',
                            outline: 'none'
                        }}
                    >
                        <img
                            src={icons[choice]}
                            alt={choice}
                            style={{ width: '60px', height: '60px' }}
                        />
                    </motion.button>
                ))}
            </div>

            {userChoice && (
                <div style={{ marginTop: '1rem' }}>
                    <p>Ваш вибір: <strong>{translateChoice(userChoice)}</strong></p>
                    <p>Вибір комп'ютера: <strong>{translateChoice(computerChoice)}</strong></p>
                </div>
            )}

            {result && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0, ...resultAnim }}
                    transition={{ duration: 1, repeat: result === "Ви перемогли!" ? Infinity : 0 }}
                    style={{
                        marginTop: '1rem',
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        color: '#d32f2f'
                    }}
                >
                    Результат: {result}
                </motion.div>
            )}

            {result && (
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
                        Зіграти ще
                    </button>
                </div>
            )}

            <div style={{ marginTop: '1rem' }}>
                <Link
                    to="/"
                    style={{
                        color: '#42a5f5',
                        fontWeight: 'bold',
                        textDecoration: 'none'
                    }}
                >
                    Повернутися на головну
                </Link>
            </div>
        </motion.div>
    )
}

function translateChoice(choice) {
    switch (choice) {
        case 'Rock': return 'Камінь'
        case 'Paper': return 'Папір'
        case 'Scissors': return 'Ножиці'
        default: return ''
    }
}
