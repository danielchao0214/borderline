import React from 'react'
import SearchUserCard from './SearchUserCard'

function SearchedUserList({ searchUserList }) {
    return (
        searchUserList.map(user => {
            return (
                <SearchUserCard
                    key={user._id}
                    User={user}
                />
            )
        })
    )
}

export default SearchedUserList