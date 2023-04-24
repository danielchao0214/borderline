import React, { useState } from 'react'
import styles from '@/styles/ForumPostCard.module.css'

function ForumPostCard({ post }) {
    return (
        <>
            <div className={styles.forumdiv}>
                {/* temp link need  to change */}
                
                    <h1>{post.title}</h1>
                    <p>Posted by: {post.user}</p>
                    <br></br>
                    <p>{post.message}</p>
                
            </div>
        </>
    )
}

export default ForumPostCard