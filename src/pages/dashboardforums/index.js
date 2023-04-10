import styles from '@/pages/dashboardforums/DashboardForums.module.css'
import Button from '@mui/material/Button';

export default function App() {
  return (
    <>
      <main>
        <div className={styles.flexcontainer}>
          <div className={styles.importcontainer}>
            {
              <Button className={styles.importbutton} variant="outlined">Import File</Button>
            }
          </div>

          <div className={styles.profilecontainer}>
            <div>
              <img className={styles.profile} src="profile.jpeg" alt="Profile" />
            </div>
            <h1>User</h1><br />
            Owned Maps: 5
          </div>

          <div className={styles.recentmapcontainer}>
            <h2 className={styles.recentmaptitle} >Recently Viewed</h2>
            <div className={styles.flexcontainer}>
              <div className={styles.recentmapdiv}>
                <img className={styles.recentmap} src="map.png" alt="Map" />
                Title
                Author
                
              </div>
              <div className={styles.recentmapdiv}>
                <img className={styles.recentmap} src="map.png" alt="Map" />
                Title
                Author
              </div>
              <div className={styles.recentmapdiv}>
                <img className={styles.recentmap} src="map.png" alt="Map" />
                Title
                Author
              </div>
              <div className={styles.recentmapdiv}>
                <img className={styles.recentmap} src="map.png" alt="Map" />
                Title
                Author
              </div>
              <div className={styles.recentmapdiv}>
                <img className={styles.recentmap} src="map.png" alt="Map" />
                Title
                Author
              </div>
            </div>
          </div>

          <div className={styles.mapcontainer}>
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
      {/* <RecentMapList /> */}
      {/* <MapList /> */}
    </>
  )
}
