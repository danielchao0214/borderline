import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from "next/router";
import styles from '@/styles/Forumview.module.css';
import CreatePostModal from '@/components/CreatePostModal';
import Button from '@mui/material/Button';
import RecentPostList from '@/components/RecentPostList';
import TextField from '@mui/material/TextField';


export default function Home() {
  const router = useRouter();
  const query = router.query;
  const _id = query._id;

  const [post, setPost] = useState([{ title: "Temp", postby: "Temp", postmessage: "Temp" }]);
  const [openCreatePostModal, setOpenCreatePostModal] = useState(false);
  const [recentPostList, setRecentPostList] = useState([{ id: 2, title: "title", user: "user" }]);

  const handleCloseCreatePostModal = () => {
    setOpenCreatePostModal(false);
  };

  useEffect(() => {
    // inital fire of getForumPost
    getForumPost()
  }, []);

  async function getForumPost() {

    let url = "/api/getForumPostBYID"
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        _id
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
      //console.log(data.forumPost)
      setPost(data.forumPost)
    };
  }

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
            <div className={styles.subContainer}>
              <div className={styles.subContainerTitle}>
                <p>{post[0].title}</p>
              </div>
              <div className={styles.subContainerPostedBy}>
                <p>Posted By: {post[0].postby}</p>
                <br></br>
              </div>
              <div className={styles.subContainerPostMessage}>
                <p>{post[0].postmessage}</p>
                <br></br>
                <hr></hr>
                <br></br>
              </div>
              <div className={styles.subContainerComment}>
              <TextField
                label=""
                placeholder="Comment Here"
                multiline
                variant="standard"
                size="medium"
                fullWidth
              ></TextField>
              <Button>Comment</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
