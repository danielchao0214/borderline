import React from 'react'
import styles from '@/styles/CommentCard.module.css'

function CommentCard({ comment }) {
    return (
        <>
            <div className={styles.comment} key={comment.key}>
                <div className={styles.user}>{comment.author}</div>
                <div className={styles.body}>{comment.body}</div>
            </div>
        </>
    )
}

export default CommentCard