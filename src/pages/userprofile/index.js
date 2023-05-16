import React, { useState, useEffect, useContext } from 'react'
import styles from '@/pages/userprofile/userprofile.module.css'

export default function App() {

  const [forumPostList, setforumPostList] = useState([{}]);

  useEffect(() => {
    // inital fire of getForumPost
    getForumPostByUser()
  }, []);


  async function getForumPostByUser() {

    let username = "MongoDB USER"  // this will be the search in text field


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


  return (
    <>
      <main>
        <div className={styles.flexcontainer}>
          <div className={styles.recentmapcontainer}>
            <h2 className={styles.recentmaptitle} >Your Forum Posts</h2>
            <div className={styles.flexcontainer}>



              {/* <div className={styles.forumTitle}>
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
                
              </div> */}
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
