import React, { useState, useEffect, useContext } from 'react'
import styles from '@/pages/dashboardforums/DashboardForums.module.css'
import ForumPostList from '@/components/ForumPostList';
import RecentPostList from '@/components/RecentPostList';
import CreatePostModal from '@/components/CreatePostModal';
import Button from '@mui/material/Button';
import { AppBannerContext } from '@/components/contexts/AppBannerContext';

export default function DashboardForums() {

  const [openCreatePostModal, setOpenCreatePostModal] = useState(false);
  // Data loaded in these useStates is testing data and should be empty at start and use
  // IE  const [postList, setPost] = useState([]);
  const [postList, setPost] = useState([{}]);
  const [recentPostList, setRecentPostList] = useState([{ id: 2, title: "title", user: "user" }]);
  const { value, setValue } = React.useContext(AppBannerContext)

  useEffect(() => {
    // inital fire of getForumPost
    console.log(value)
    getForumPost()
  }, [value]);

  async function getForumPost() {
    const search = { value } // this will be the search in text field
    let url = "/api/getForumPost"
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        search,
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
      console.log(data.forumPosts)
      console.log(data.message)

      //Change state !!!!!!!!
      setPost(data.forumPosts)

    }
  };async function getForumPost() {
    const search =  value.Searched  // this will be the search in text field
    const sortby = value.sortBy
    let url = "/api/getForumPost"
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        search,
        sortby
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
      setPost(data.forumPosts)
    };
  }

  const handleCloseCreatePostModal = () => {
    setOpenCreatePostModal(false);
  };

  return (
    <>
      <CreatePostModal
        open={openCreatePostModal}
        handleClose={handleCloseCreatePostModal}
      />
      <div className={styles.mainContainer}>
        <div className={styles.createcontainer}>
          <div className={styles.createButtonContainter}>
            {
              // <Button className={styles.createbutton} variant="outlined" onClick={getForumPost}>Create Post</Button>
              <Button className={styles.createbutton} variant="outlined" onClick={() => setOpenCreatePostModal(true)}>Create Post</Button>
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
