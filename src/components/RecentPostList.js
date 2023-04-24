import React from 'react'
import RecentPostCard from './RecentPostCard'

function RecentPostList({recentPostList}) {
  return (
    recentPostList.map(post =>{
        return (
        <RecentPostCard
            key={post.id}
            post={post}
        />
        )
    })
  )
}

export default RecentPostList