import React from 'react'
import styles from '@/styles/SearchedUserCard.module.css'

function SearchUserCard({ User, link, ownedmaps }) {
    return (

        <div className={styles.profilecontainer}>
            <div>
                <img className={styles.profile} src="profile.jpeg" alt="Profile" />
            </div>
            <h1>{User}</h1><br />
            Owned Maps: {ownedmaps}
        </div>
    )
}

export default SearchUserCard