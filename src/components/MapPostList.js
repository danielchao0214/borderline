import React from 'react'
import MapPostCard from './MapPostCard'

function MapPostList({ mapPostList }) {
    return (
        mapPostList.map(map => {
            return (
                <MapPostCard
                    key={map._id}
                    map={map}
                />
            )
        })
    )
}

export default MapPostList