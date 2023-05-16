import React from 'react'
import ForumPostCard from './ForumPostCard'

function ForumPostList({ postList }) {
    return (
        postList.map(post => {
            return (
                <ForumPostCard
                    key={post.id}
                    post={post}
                />
            )
        })
    )
}

export default ForumPostList