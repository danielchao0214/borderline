import styles from '@/pages/userprofile/userprofile.module.css'
import Button from '@mui/material/Button';

export default function App() {
  return (
    <>
      <main>
        <div className={styles.flexcontainer}>
          <div className={styles.recentmapcontainer}>
            <h2 className={styles.recentmaptitle} >Your Forum Posts</h2>
            <div className={styles.flexcontainer}>
              <div className={styles.forumTitle}>
                <p class={styles.forumTitleName}>Title</p>
                <p>Forum Post Forum Post Forum Post Forum Post Forum PostForum Post</p>
                
              </div>
              <div className={styles.forumTitle}>
                <p class={styles.forumTitleName}>Title</p>
                <p>Forum Post Forum Post Forum Post Forum Post Forum PostForum Post</p>
                
              </div>
              <div className={styles.forumTitle}>
                <p class={styles.forumTitleName}>Title</p>
                <p>Forum Post Forum Post Forum Post Forum Post Forum PostForum Post</p>
                
              </div>
              <div className={styles.forumTitle}>
                <p class={styles.forumTitleName}>Title</p>
                <p>Forum Post Forum Post Forum Post Forum Post Forum PostForum Post</p>
                
              </div>
              <div className={styles.forumTitle}>
                <p class={styles.forumTitleName}>Title</p>
                <p>Forum Post Forum Post Forum Post Forum Post Forum PostForum Post</p>
                
              </div>
            </div>
          </div>

          <div className={styles.mapcontainer}>
            <div className={styles.recentmaptitle}>
              <h2>
                Your Maps
              </h2>
            </div>
            <div className={styles.mapsflexcontainer}>
              <div>
                <img className={styles.map} src="map.png" alt="Map" />
                <h3>Title</h3>
                Author
                <p>5 Likes ⋅ 5 Dislikes ⋅ 04/10/2023</p>
              </div>
              <div>
                <img className={styles.map} src="map.png" alt="Map" />
                <h3>Title</h3>
                Author
                <p>5 Likes ⋅ 5 Dislikes ⋅ 04/10/2023</p>
              </div>
              <div>
                <img className={styles.map} src="map.png" alt="Map" />
                <h3>Title</h3>
                Author
                <p>5 Likes ⋅ 5 Dislikes ⋅ 04/10/2023</p>
              </div>
              <div>
                <img className={styles.map} src="map.png" alt="Map" />
                <h3>Title</h3>
                Author
                <p>5 Likes ⋅ 5 Dislikes ⋅ 04/10/2023</p>
              </div>
              <div>
                <img className={styles.map} src="map.png" alt="Map" />
                <h3>Title</h3>
                Author
                <p>5 Likes ⋅ 5 Dislikes ⋅ 04/10/2023</p>
              </div>
              <div>
                <img className={styles.map} src="map.png" alt="Map" />
                <h3>Title</h3>
                Author
                <p>5 Likes ⋅ 5 Dislikes ⋅ 04/10/2023</p>
              </div><div>
                <img className={styles.map} src="map.png" alt="Map" />
                <h3>Title</h3>
                Author
                <p>5 Likes ⋅ 5 Dislikes ⋅ 04/10/2023</p>
              </div>
              <div>
                <img className={styles.map} src="map.png" alt="Map" />
                <h3>Title</h3>
                Author
                <p>5 Likes ⋅ 5 Dislikes ⋅ 04/10/2023</p>
              </div>
              <div>
                <img className={styles.map} src="map.png" alt="Map" />
                <h3>Title</h3>
                Author
                <p>5 Likes ⋅ 5 Dislikes ⋅ 04/10/2023</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
