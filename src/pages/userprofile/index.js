import React, { useState, useEffect, useContext } from 'react'
import styles from '@/pages/userprofile/userprofile.module.css'
import AuthContext from '@/components/contexts/AuthContext';
import ForumPostList from '@/components/ForumPostList';
import MapPostList from '@/components/MapPostList';

export default function App() {

  const { isLoggedIn, user } = useContext(AuthContext);
  const [forumPostList, setforumPostList] = useState([{}]);
  const [mapPostList, setMapPostList] = useState([{}])

  useEffect(() => {
    // inital fire of getForumPost
    console.log(user.username);
    getForumPostByUser();
    getMapPostByUser();
  }, [isLoggedIn]);


  async function getForumPostByUser() {

    let username = user.username
    let url = "/api/getforumPostByUser"
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        username
      }),
      headers: {
        "content-type": "application/json"
      },
    }).catch((e) => console.log(e));

    // wait for the responce from request and get the body
    const data = await res.json();

    // If status code returns error print the code in the body
    if (res.status == 401) {
      console.log(data.errorMessage);
    }
    //If route is good then log the results
    if (res.status == 200) {
      //console.log(data.forumPosts)
      //console.log(data.message)

      //Change state !!!!!!!!
      setforumPostList(data.forumPosts)

      console.log(data.forumPosts);
    };
  }

  async function getMapPostByUser() {

    let username = user.username

    let url = "/api/getmapPostByUser"
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        username
      }),
      headers: {
        "content-type": "application/json"
      },
    }).catch((e) => console.log(e));

    // wait for the responce from request and get the body
    const data = await res.json();

    // If status code returns error print the code in the body
    if (res.status == 401) {
      console.log(data.errorMessage);
    }
    //If route is good then log the results
    if (res.status == 200) {
      //console.log(data.mapPosts)
      //console.log(data.message)

      //Change state !!!!!!!!
      setMapPostList(data.mapPosts)

    };
  }

  return (
    <>
      <main>
        <div className={styles.flexcontainer}>
          <div className={styles.recentmapcontainer}>
            <h2 className={styles.recentmaptitle} >Your Forum Posts</h2>
            <div className={styles.flexcontainer}>

              <ForumPostList postList={forumPostList}></ForumPostList>

            </div>
          </div>

          <div className={styles.mapcontainer}>
            <div className={styles.recentmaptitle}>
              <h2>
                Your Maps
              </h2>
            </div>
            <div className={styles.mapsflexcontainer}>
              
            <MapPostList mapPostList={mapPostList} />
              
              
              {/* <div>
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
              </div> */}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
