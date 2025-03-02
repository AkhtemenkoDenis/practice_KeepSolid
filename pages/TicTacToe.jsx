// Реалізує гру "Хрестики-Нулики"
// Можливо грати проти комп'ютера та другого гравця

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function TicTacToe() {
    const initialBoard = Array(9).fill(null)
    const [board, setBoard] = useState(initialBoard)
    const [winner, setWinner] = useState(null)
    const [mode, setMode] = useState('single')
    const [userMark, setUserMark] = useState('X')
    const [currentPlayer, setCurrentPlayer] = useState('X')
    const [winAnim, setWinAnim] = useState(false)

    const lines = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ]

    const calculateWinner = (squares) => {
        for (let line of lines) {
            const [a, b, c] = line
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a]
            }
        }
        return null
    }

    const handleClick = (index) => {
        if (winner || board[index]) return
        const newBoard = [...board]

        if (mode === 'two') {
            newBoard[index] = currentPlayer
            const maybeWinner = calculateWinner(newBoard)
            setBoard(newBoard)
            if (maybeWinner) {
                setWinner(maybeWinner)
                setWinAnim(true)
            } else {
                setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
            }
        } else {
            newBoard[index] = userMark
            setBoard(newBoard)
            const maybeWinner = calculateWinner(newBoard)
            if (maybeWinner) {
                setWinner(maybeWinner)
                setWinAnim(true)
                return
            }
            computerMove(newBoard)
        }
    }

    const computerMove = (tempBoard) => {
        let emptyIndices = []
        for (let i = 0; i < tempBoard.length; i++) {
            if (!tempBoard[i]) emptyIndices.push(i)
        }
        if (emptyIndices.length === 0) return

        const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)]
        const compMark = userMark === 'X' ? 'O' : 'X'
        tempBoard[randomIndex] = compMark
        setBoard([...tempBoard])

        const maybeWinner = calculateWinner(tempBoard)
        if (maybeWinner) {
            setWinner(maybeWinner)
            setWinAnim(true)
        }
    }

    const resetGame = () => {
        setBoard(initialBoard)
        setWinner(null)
        setWinAnim(false)
        setCurrentPlayer('X')
    }

    const switchMode = (newMode) => {
        resetGame()
        setMode(newMode)
    }

    const chooseMark = (mark) => {
        resetGame()
        setUserMark(mark)
    }

    let statusMessage = ''
    if (winner) {
        statusMessage = `Переможець: ${winner}`
    } else {
        if (mode === 'two') {
            statusMessage = `Хід гравця: ${currentPlayer}`
        } else {
            statusMessage = `Ваш знак: ${userMark}`
            if (board.every((cell) => cell !== null) && !winner) {
                statusMessage = 'Нічия!'
            }
        }
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
            <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                Хрестики-Нулики
            </motion.h2>

            <div style={{ marginBottom: '1rem' }}>
                <button
                    onClick={() => switchMode('single')}
                    style={{
                        marginRight: '1rem',
                        padding: '0.5rem 1rem',
                        backgroundColor: mode === 'single' ? '#ffa726' : '#42a5f5',
                        border: 'none',
                        fontSize: '1rem',
                        borderRadius: '4px',
                        color: '#fff',
                        cursor: 'pointer'
                    }}
                >
                    Проти комп'ютера
                </button>
                <button
                    onClick={() => switchMode('two')}
                    style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: mode === 'two' ? '#ffa726' : '#42a5f5',
                        border: 'none',
                        fontSize: '1rem',
                        borderRadius: '4px',
                        color: '#fff',
                        cursor: 'pointer'
                    }}
                >
                    Два гравці
                </button>
            </div>

            {mode === 'single' && !winner && (
                <div style={{ marginBottom: '1rem' }}>
                    <span style={{ marginRight: '1rem' }}>Ваш знак:</span>
                    <button
                        onClick={() => chooseMark('X')}
                        style={{
                            marginRight: '0.5rem',
                            padding: '0.3rem 0.6rem',
                            backgroundColor: userMark === 'X' ? '#ff7043' : '#42a5f5',
                            border: 'none',
                            borderRadius: '4px',
                            color: '#fff',
                            fontSize: '1rem',
                            cursor: 'pointer'
                        }}
                    >
                        X
                    </button>
                    <button
                        onClick={() => chooseMark('O')}
                        style={{
                            padding: '0.3rem 0.6rem',
                            backgroundColor: userMark === 'O' ? '#ff7043' : '#42a5f5',
                            border: 'none',
                            borderRadius: '4px',
                            color: '#fff',
                            cursor: 'pointer',
                            fontSize: '1rem'
                        }}
                    >
                        O
                    </button>
                </div>
            )}

            <motion.div
                animate={winAnim ? { scale: [1, 1.2, 1], rotate: [0, 15, -15, 0] } : {}}
                transition={{ duration: 1, repeat: winAnim ? Infinity : 0 }}
                style={{
                    marginBottom: '1rem',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    color: winner ? '#d32f2f' : '#424242'
                }}
            >
                {statusMessage}
            </motion.div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 100px)',
                gap: '10px',
                justifyContent: 'center',
                margin: '1rem auto'
            }}>
                {board.map((cell, index) => (
                    <motion.button
                        key={index}
                        onClick={() => handleClick(index)}
                        whileTap={{ scale: 0.9 }}
                        style={{
                            width: '100px',
                            height: '100px',
                            fontSize: '2rem',
                            cursor: 'pointer',
                            borderRadius: '4px',
                            border: '2px solid #ccc',
                            backgroundColor: cell === 'X' ? '#fff9c4'
                                : cell === 'O' ? '#b2ebf2'
                                    : '#ffffff'
                        }}
                    >
                        {cell}
                    </motion.button>
                ))}
            </div>

            <div>
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
