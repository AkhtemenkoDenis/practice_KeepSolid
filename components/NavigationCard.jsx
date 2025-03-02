// Відповідає за відображення картки навігації з заголовком, описом та посиланням на гру.

import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NavigationCard({ title, link, description }) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '1rem',
                width: '220px',
                backgroundColor: '#fff',
                color: '#333',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                margin: '1rem',
            }}
        >
            <h3>{title}</h3>
            <p style={{ fontSize: '1.1rem' }}>{description}</p>
            <Link
                to={link}
                style={{
                    textDecoration: 'none',
                    color: '#42a5f5',
                    fontWeight: 'bold'

                }}
            >
                Play Now
            </Link>
        </motion.div>
    )
}
