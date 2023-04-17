import styles from '@/pages/dashboardmaps/DashboardMaps.module.css'
import Button from '@mui/material/Button';
import AppBanner from '@/components/AppBanner';

export default function App() {


  const handleUpload = async(event) => {
    event.preventDefault();

    let db;
    var request = indexedDB.open("map", 1);

    request.onupgradeneeded = (event) => {
      // store the result of opening the database.
      db = request.result;
      const fileStore = db.createObjectStore("map");
    };

    request.onsuccess = (event) => {
      // store the result of opening the database.
      db = request.result;
      const file = document.getElementById("import").files[0];
      const transaction = db.transaction('map', 'readwrite');
      const fileStore = transaction.objectStore('map');
      const addRequest = fileStore.put(new Blob([file], { type: file.type }), 1);
      addRequest.onsuccess = event => {
        console.log('File added to object store success');
        window.location.replace("/mapedit");
      };
    };


    //console.log(`Submitted: ${email} ${password}`);
    // let url = "/api/importmap"
    // let file = document.getElementById("import").files[0];
    // let title = file.name.substring(0, file.name.lastIndexOf("."));
    // let author = "None";
    // let tags = "None";
    // let file_size = file.size;
    // let likes = 0;
    // let dislikes = 0;
    // let published = false;
    // let publish_date = Date();
    // let description = "None";
    // let map = await file.arrayBuffer();
    // let comments = "None";
    // let graphics = "None";
    // let thumbnail = null;
    // console.log({
    //   title,
    //   author,
    //   tags,
    //   file_size,
    //   likes,
    //   dislikes,
    //   published,
    //   publish_date,
    //   description,
    //   map,
    //   comments,
    //   graphics,
    //   thumbnail
    // })
    // const mapData = new FormData();
    // mapData.append("title", title);
    // mapData.append("author", author);
    // mapData.append("file_size", file_size);
    // fetch("http://localhost:3000/"+url, {
    //   method: "Post",
    //   body: {
    //     title,
    //     author,
    //     tags,
    //     file_size,
    //     likes,
    //     dislikes,
    //     published,
    //     publish_date,
    //     description,
    //     comments,
    //     graphics,
    //     thumbnail 
    //   },
    //   headers: {
    //     "content-type": "application/json"
    //   },
    // }).catch((e) =>console.log(e));

  };

  const handleImportClick = (event) => {
    document.getElementById("import").click();
  }

  return (
    <>
     <AppBanner />
      <main>
        <div className={styles.flexcontainer}>
          <div className={styles.importcontainer}>
            {
              <Button onClick={handleImportClick} className={styles.importbutton} variant="outlined">Import File</Button>
            }
          </div>
          <input id="import" onChange={handleUpload} type="file" style={{display:"none"}} />
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
    </>
  )
}
