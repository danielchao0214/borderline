import React from 'react'
import CommentCard from './CommentCard'

function CommentList({ commentList }) {
    return (
        commentList.map(comment => {
            if (comment._id === undefined) {
                return (<></>)
            }
            else {
                return (
                    <CommentCard
                        key={comment._id}
                        comment={comment}
                    />
                )
            }
        })
    )
}

export default CommentList