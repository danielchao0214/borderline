import React from 'react'
import Link from 'next/link';
import styles from '@/styles/MapPostCard.module.css'

// Temp date Change and thumbnail change

function MapPostCard({ map }) {
    
    let date = new Date(map.publish_date)

    map.publish_date = date.toDateString();
    
    return (
        <>
            <Link href={{
                pathname: '/mapoverview',
                query: {_id: map._id}
            }}>

                <div key={map._id}>
                    <img className={styles.map} src={"map.png"} alt="Map"/>
                    <h3>{map.title}</h3>
                    <p>{map.author}</p>
                    <p>{map.likes} Likes ⋅ {map.dislikes} Dislikes ⋅ {map.publish_date}</p>
                </div>
            </Link>
        </>
    )
}

export default MapPostCard