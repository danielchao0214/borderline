import React from 'react'
import styles from '@/styles/MapPostCard.module.css'

// Temp date Change and thumbnail change

function MapPostCard({ map }) {
    return (
        <div>
            <img className={styles.map} src={"map.png"} alt="Map" />
            <h3>{map.title}</h3>
            <p>{map.author}</p>
            <p>{map.likes} Likes ⋅ {map.dislikes} Dislikes ⋅ {"Date Need Fix"}</p>
        </div>
    )
}

export default MapPostCard