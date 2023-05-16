import React from 'react'
import styles from '@/styles/SearchedUserCard.module.css'
import Link from 'next/link';


function SearchUserCard({ User }) {
    return (
        <>
            <Link href={{
                pathname: '/useroverview',
                query: { username: User.username },
            }}>

                <div className={styles.profilecontainer}>
                    <div>
                        <img className={styles.profile} src="profile.jpeg" alt="Profile" />
                    </div>
                    <h1>{User.username}</h1><br />
                    Owned Maps: {"TEMP"}
                </div>
            </Link>
        </>
    )
}

export default SearchUserCard