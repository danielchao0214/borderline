import React from 'react'
import RecentMapCard from './RecentMapCard'

function RecentMapList({ recentMapList }) {
    return (
        recentMapList.map(map => {
            return (
                <RecentMapCard
                    key={map.id}
                    map={map}
                />
            )
        })
    )
}

export default RecentMapList