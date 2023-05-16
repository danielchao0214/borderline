import React from 'react'
import styles from '@/styles/RecentMapCard.module.css'

function RecentMapCard({ map }) {
    return (
        <div className={styles.recentmapdiv}>
            <img className={styles.recentmap} src={map.piclink} alt="Map" />
            <p>{map.title}</p>
            <p>{map.author}</p>
        </div>
    )
}

export default RecentMapCard