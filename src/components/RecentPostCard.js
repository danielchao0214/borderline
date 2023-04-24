import React from 'react'
import styles from '@/styles/RecentPostCard.module.css'

function RecentPostCard({ post }) {
    return (
        <div className={styles.recentforumdiv}>
            <h2>{post.title}</h2>
            <p>Posted by: {post.user}</p>
        </div>
    )
}

export default RecentPostCard