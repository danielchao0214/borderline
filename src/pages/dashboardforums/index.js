import React, { useState, useEffect } from 'react'
import styles from '@/pages/dashboardforums/DashboardForums.module.css'
import ForumPostList from '@/components/ForumPostList';
import RecentPostList from '@/components/RecentPostList';
import Button from '@mui/material/Button';

export default function DashboardForums() {

  // Data loaded in these useStates is testing data and should be empty at start and use
  // IE  const [postList, setPost] = useState([]);
  const [postList, setPost] = useState([{ id: 1, title: "Title1", user: "user1", message: "message" }]);
  const [recentPostList, setRecentPostList] = useState([{ id: 2, title: "title", user: "user" }]);

  //Temporay fucnction that should called when search results are provided
  function temporaryOnClick (event){
    setPost(prevPostList => {
      return [...prevPostList, { id: 1, title: "Title1", user: "user1", message: "message" }]
    })
  }

  return (
    <>
    <div className={styles.mainContainer}>
      <div className={styles.createcontainer}>
        <div className = {styles.createButtonContainter}>
        {
          <Button className={styles.createbutton} variant="outlined" onClick={temporaryOnClick}>Create Post</Button>
        }
        </div>
        <div className={styles.recentforumcontainer}>
          <h1 className={styles.recentforumtitle} >Recently Viewed</h1>
          <div className={styles.flexcontainer}>
            <RecentPostList recentPostList={recentPostList} />
          </div>
        </div>
      </div>

      <div className={styles.forumcontainer}>
        <div className={'styles.forumflexcontainer'}>
          <ForumPostList postList={postList} />
        </div>
      </div>
    </div> 
    </>
  )
}
