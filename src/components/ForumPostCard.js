import React, { useState } from 'react'
import styles from '@/styles/ForumPostCard.module.css'

function ForumPostCard({ post }) {

    return (
        <>
            <div className={styles.forumdiv} key={post._id}>
                {/* temp link need  to change */}
                
                    <h1>{post.title}</h1>
                    <p>Posted by: {post.postby}</p>
                    <br></br>
                    <p>{post.postmessage}</p>
                    
            </div>
        </>
    )
}

export default ForumPostCard