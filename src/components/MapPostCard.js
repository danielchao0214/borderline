import React from 'react'
import styles from '@/styles/MapPostCard.module.css'

function MapPostCard({ map }) {
    return (
        <div>
            <img className={styles.map} src={map.piclink} alt="Map" />
            <h3>{map.title}</h3>
            <p>{map.author}</p>
            <p>{map.likes} Likes ⋅ {map.dislikes} Dislikes ⋅ {map.date}</p>
        </div>
    )
}

export default MapPostCard