import Link from 'next/link';
import styles from '@/styles/ForumPostCard.module.css';


function ForumPostCard({ post }) {

    return (
        <>
            <Link href={{
                pathname: '/forumview',
                query: { _id: post._id },
            }}>
                <div className={styles.forumdiv} key={post._id}>
                    {/* temp link need  to change */}

                    <h1>{post.title}</h1>
                    <p>Posted by: {post.postby}</p>
                    <br></br>
                    <p>{post.postmessage}</p>

                </div>
            </Link>
        </>
    )
}

export default ForumPostCard