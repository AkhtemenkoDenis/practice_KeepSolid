// Головна сторінка, на якій розташовані всі доступні ігри

import React from 'react'
import { motion } from 'framer-motion'
import NavigationCard from '../components/NavigationCard'


export default function HomePage({ setTheme }) {
    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ marginBottom: '1rem' }}
            >
                Гральний Центр
            </motion.h1>

            <div style={{ marginBottom: '1rem' }}>
                <button
                    onClick={() => setTheme('blue')}
                    style={{
                        marginRight: '0.5rem',
                        padding: '0.5rem 1rem',
                        backgroundColor: '#42a5f5',
                        border: 'none',
                        borderRadius: '4px',
                        color: '#fff',
                        cursor: 'pointer',
                        fontSize: '1rem'
                    }}
                >
                    Синя Тема
                </button>
                <button
                    onClick={() => setTheme('yellow')}
                    style={{
                        marginRight: '0.5rem',
                        padding: '0.5rem 1rem',
                        backgroundColor: '#ffd54f',
                        border: 'none',
                        borderRadius: '4px',
                        color: '#333',
                        cursor: 'pointer',
                        fontSize: '1rem'
                    }}
                >
                    Жовта Тема
                </button>
                <button
                    onClick={() => setTheme('pink')}
                    style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#ff9a9e',
                        border: 'none',
                        borderRadius: '4px',
                        color: '#fff',
                        cursor: 'pointer',
                        fontSize: '1rem'
                    }}
                >
                    Рожева Тема
                </button>
            </div>

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap'

            }}>
                <NavigationCard
                    title="Вгадай число"
                    link="/guess-number"
                    description="Спробуйте вгадати число від 1 до 100!"

                />
                <NavigationCard
                    title="Хрестики-Нулики"
                    link="/tic-tac-toe"
                    description="Позмагайтеся з комп'ютером або другом!"
                />
                <NavigationCard
                    title="Камінь, Ножиці, Папір"
                    link="/rock-paper-scissors"
                    description="Швидка партія з класичну гру!"
                />
            </div>

            <div style={{ marginTop: '10rem', fontWeight: 'bold' }}>
                ПІБ: Ахтеменко Денис Вікторович
            </div>
        </div>
    )
}
