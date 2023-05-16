import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from "next/router";
import styles from '@/styles/Mapoverview.module.css'
import Link from 'next/link';
import CommentList from '@/components/CommentList';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AuthContext from '@/components/contexts/AuthContext';


export default function Home() {

  const router = useRouter();
  const query = router.query;
  const _id = query._id;

  const { isLoggedIn, user } = useContext(AuthContext);
  const [post, setPost] = useState([{ title: "Temp", author: "Temp", tags: "Temp", file_size: 0, likes: 0, dislikes: 0, publish_date: "Temp", description: "Temp", map: {}, tags: "Temp", comments: [{}], graphics: [{}], thumbnail: undefined }]);
  const [commentList, setCommentList] = useState([{ author: "Temp", body: "Temp", _id: "tempid" }]);
  const [commentTextField, setcommentTextField] = useState("");

  const [ChangeName, setChangeName] = useState("");
  const [ChangeDesc, setChangeDesc] = useState("");

  const showGraphics = () => {
    document.getElementById("comments").style.display = "none";
    document.getElementById("comments_button").style.backgroundColor = "rgb(104,104,104)";
    document.getElementById("graphics").style.display = "flex";
    document.getElementById("graphics_button").style.backgroundColor = "rgb(191,191,191)"
  }
  const showComments = () => {
    document.getElementById("comments").style.display = "flex";
    document.getElementById("comments_button").style.backgroundColor = "rgb(191,191,191)";
    document.getElementById("graphics").style.display = "none";
    document.getElementById("graphics_button").style.backgroundColor = "rgb(104,104,104)";
  }


  useEffect(() => {
    // inital fire of getForumPost
    getMapPost();
    
  }, []);

  useEffect(() => {
    // inital fire of getForumPost
    //console.log(user.username);

  }, [isLoggedIn]);

  useEffect(() => {
    console.log(user)
    if (user && user.username === post[0].author) {
      setChangeName(<Button onClick={handleChangeTitle}>Change Name</Button>);
      setChangeDesc(<Button onClick={handleChangeDesc}>Change Description</Button>)
    }
    storeMap();
  }, [post]);

  async function getMapPost() {

    let url = "/api/getMapPostBYID"
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

      setPost(data.mapPost)

      if (data.mapPost[0].comments !== "None") {
        setCommentList(data.mapPost[0].comments.reverse());
      }
      else {
        setCommentList([{}]);
      }

    };
  }

  const submitComment = async () => {
    //Temporary author variable
    let author = user.username

    let id = post[0]._id

    if (commentTextField !== "") {

      let url = "/api/addCommentMap"
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          id,
          commentTextField,
          author
        }),
        headers: {
          "content-type": "application/json"
        },
      }).catch((e) => console.log(e));

      // wait for the responce from request and get the body
      const data = await res.json();

      // If status code returns error print the code in the body
      if (res.status == 400) {
        console.log(data.errorMessage);
      }
      //If route is good then log the results
      if (res.status == 200) {
        getMapPost()
        setcommentTextField("");
      };
    };
  }

  const storeMap = () => {
    console.log(post[0].map)
    const jsonString = JSON.stringify(post[0].map);
    // Create a Blob from the JSON string    
    const blob = new Blob([jsonString], { type: 'application/json' });
    // Create a File from the Blob
    const file = new File([blob], "data.json");
    let db;
    var request = indexedDB.open("map", 1);
    var request_name;
    request.onupgradeneeded = (event) => {
      // store the result of opening the database.
      db = request.result;
      db.createObjectStore("map");
    };
    request.onsuccess = (event) => {
      // store the result of opening the database.
      db = request.result;
      const transaction = db.transaction('map', 'readwrite');
      const fileStore = transaction.objectStore('map');
      const addRequest = fileStore.put(new Blob([file], { type: file.type }), 1);
      addRequest.onsuccess = event => {
        console.log('File added to object store success');
      };
    }
  }

  const LikePost = async () => {
    //Temporary author variable
    let author = user.username
    let likedislike = true;
    let id = post[0]._id

    let url = "/api/addLikeDislikeMap"
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        id,
        author,
        likedislike
      }),
      headers: {
        "content-type": "application/json"
      },
    }).catch((e) => console.log(e));

    // wait for the responce from request and get the body
    const data = await res.json();

    // If status code returns error print the code in the body
    if (res.status == 400) {
      console.log(data.errorMessage);
    }
    //If route is good then log the results
    if (res.status == 200) {
      getMapPost()
    };

  }

  const DislikePost = async () => {
    //Temporary author variable
    let author = user.username
    let likedislike = false;
    let id = post[0]._id

    let url = "/api/addLikeDislikeMap"
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        id,
        author,
        likedislike
      }),
      headers: {
        "content-type": "application/json"
      },
    }).catch((e) => console.log(e));

    // wait for the responce from request and get the body
    const data = await res.json();

    // If status code returns error print the code in the body
    if (res.status == 400) {
      console.log(data.errorMessage);
    }
    //If route is good then log the results
    if (res.status == 200) {
      getMapPost()
    };

  }


  // onClick converstion to textfield TITLE
  const handleChangeTitle = async () => {

    setChangeName(<TextField
      margin="normal"
      required
      width='100%'
      onKeyPress={handleKeyPress}
      onChange={handleUpdateTitle}
      defaultValue={post[0].title}
      autoFocus
    />)

  }

  // onClick converstion to textfield DESCRIPTION
  const handleChangeDesc = async () => {
    setChangeDesc(<TextField
      margin="normal"
      required
      width='100%'
      onKeyPress={handleKeyPress}
      onChange={handleUpdateDesc}
      defaultValue={post[0].description}
      autoFocus
    />)
  }

  // handle key press for both Title and Desc
  function handleKeyPress(event) {
    if (event.code === "Enter") {
      updatePost()
    }
  }

  // updates the currrent state Title
  function handleUpdateTitle(event) {
    post[0].title = event.target.value;

  }

  //updates the current state description
  function handleUpdateDesc(event) {
    post[0].description = event.target.value;

  }

  // This can be called for both update Title and update Description
  const updatePost = async () => {

    let updatepost = post[0]

    let url = "/api/updateMapPost"
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        updatepost
      }),
      headers: {
        "content-type": "application/json"
      },
    }).catch((e) => console.log(e));

    // wait for the responce from request and get the body
    const data = await res.json();

    // If status code returns error print the code in the body
    if (res.status == 400) {
      console.log(data.errorMessage);
    }
    //If route is good then log the results
    if (res.status == 200) {
      getMapPost()
    };

  }


  return (
    <>
      <main className={styles.main}>
        <div name="underbanner" className={styles.under_banner}>
          <div name="leftside" className={styles.left_side}>
            <div name="left buttons" className={styles.left_buttons}>
              <div name="spacer" className={styles.button_spacer}>
              </div>
              <div name="option buttons" className={styles.option_buttons}>
                <Link href={{
                  pathname: '/mapedit',
                  query: {_id: post[0]._id}
                }}>
                  Edit Map
                </Link>
                <Link href="mapedit">
                  <button className={styles.option_button}>
                    Fork Map
                  </button>
                </Link>
                <Link href="mapgraphicedit">
                  <button className={styles.option_button}>
                    Edit Graphic
                  </button>
                </Link>
                <button className={styles.option_button}>
                  Publish Map
                </button>
              </div>
              <div name="like/dislike buttons" className={styles.like_dislike_buttons}>
                <Button className={styles.like_dislike_button} onClick={LikePost}>
                  Like
                </Button>
                <Button onClick={DislikePost} className={styles.like_dislike_button}>
                  Dislike
                </Button>
              </div>
            </div>
            <div name="middlesection" className={styles.middle_container}>
              <div name="title" className={styles.title}>
                <div style={{ width: "100%" }}>
                  <span>
                    {post[0].title}
                  </span>
                  {/*This is where the change title button is */}
                  {ChangeName}
                </div>
                <span style={{ fontSize: "20px" }}>
                  By:
                  {post[0].author} &nbsp;
                  Likes:
                  {post[0].likes} &nbsp;
                  Dislikes:
                  {post[0].dislikes}
                </span>
              </div>
              <div name="image" className={styles.image}>
                <img src="map_overview_US.jpg" className={styles.img}></img>
              </div>
              <div name="description" className={styles.description}>
                <div>
                  <span style={{ fontSize: "25px" }}>
                    Publish Date:{post[0].publish_date} &nbsp;  &nbsp;Size:
                    {post[0].file_size}
                  </span>
                </div>
                <br />
                {/*This is where the change title button is */}
                {ChangeDesc}
                <div>
                  <span>
                    {post[0].description}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div name="comments_graphics" className={styles.comments}>
            <div name="comment outside container" className={styles.comment_outside_container}>
              <div name="comment/graphic select" className={styles.select_comment_graphic}>
                <button id="comments_button" onClick={showComments} className={styles.comment_button}>
                  Comments
                </button>
                <button id="graphics_button" onClick={showGraphics} className={styles.graphics_button}>
                  Graphics
                </button>
              </div>
              <div id="comments" name="comment inside container" className={styles.comment_inside_container}>
                <div name="comment container" className={styles.comments_container}>

                  <CommentList commentList={commentList} />

                </div>
                <div name="create comment" className={styles.create_comment_container}>
                  <TextField
                    label=""
                    placeholder="Comment Here"
                    multiline
                    value={commentTextField}
                    variant="standard"
                    size="medium"
                    fullWidth
                    onChange={(e) => {
                      setcommentTextField(e.target.value);
                    }}
                  ></TextField>
                  <Button onClick={submitComment}>Comment</Button>

                </div>
              </div>

              <div id="graphics" name="comment inside container" className={styles.comment_inside_container} style={{ display: "none" }}>
                <div name="graphic container" className={styles.graphics_container}>
                  <div name="Graphic" className={styles.graphic}>
                    <div name="image graphic" className={styles.image_graphic}>
                      <img src="map_overview_US.jpg" className={styles.img_graphic}></img>
                    </div>
                    <div name="graphic description" className={styles.graphic_description}>
                      <p style={{ fontWeight: "bolder", fontSize: "20px" }}>
                        Graphic 1 Title
                      </p>
                      <p>
                        PizzaHater
                      </p>
                      <p>
                        Publish Date 4/10/23
                      </p>
                    </div>
                    <button name="fork graphic" className={styles.fork_graphic}>
                      Fork
                    </button>
                  </div>
                  <div name="Graphic" className={styles.graphic}>
                    <div name="image graphic" className={styles.image_graphic}>
                      <img src="map_overview_US.jpg" className={styles.img_graphic}></img>
                    </div>
                    <div name="graphic description" className={styles.graphic_description}>
                      <p style={{ fontWeight: "bolder", fontSize: "20px" }}>
                        Graphic 2 Title
                      </p>
                      <p>
                        PizzaHater
                      </p>
                      <p>
                        Publish Date 4/10/23
                      </p>
                    </div>
                    <button name="fork graphic" className={styles.fork_graphic}>
                      Fork
                    </button>
                  </div>
                  <div name="Graphic" className={styles.graphic}>
                    <div name="image graphic" className={styles.image_graphic}>
                      <img src="map_overview_US.jpg" className={styles.img_graphic}></img>
                    </div>
                    <div name="graphic description" className={styles.graphic_description}>
                      <p style={{ fontWeight: "bolder", fontSize: "20px" }}>
                        Graphic 3 Title
                      </p>
                      <p>
                        PizzaHater
                      </p>
                      <p>
                        Publish Date 4/10/23
                      </p>
                    </div>
                    <button name="fork graphic" className={styles.fork_graphic}>
                      Fork
                    </button>
                  </div>
                  <div name="Graphic" className={styles.graphic}>
                    <div name="image graphic" className={styles.image_graphic}>
                      <img src="map_overview_US.jpg" className={styles.img_graphic}></img>
                    </div>
                    <div name="graphic description" className={styles.graphic_description}>
                      <p style={{ fontWeight: "bolder", fontSize: "20px" }}>
                        Graphic 4 Title
                      </p>
                      <p>
                        PizzaHater
                      </p>
                      <p>
                        Publish Date 4/10/23
                      </p>
                    </div>
                    <button name="fork graphic" className={styles.fork_graphic}>
                      Fork
                    </button>
                  </div>
                  <div name="Graphic" className={styles.graphic}>
                    <div name="image graphic" className={styles.image_graphic}>
                      <img src="map_overview_US.jpg" className={styles.img_graphic}></img>
                    </div>
                    <div name="graphic description" className={styles.graphic_description}>
                      <p style={{ fontWeight: "bolder", fontSize: "20px" }}>
                        Graphic 5 Title
                      </p>
                      <p>
                        PizzaHater
                      </p>
                      <p>
                        Publish Date 4/10/23
                      </p>
                    </div>
                    <button name="fork graphic" className={styles.fork_graphic}>
                      Fork
                    </button>
                  </div>
                  <div name="Graphic" className={styles.graphic}>
                    <div name="image graphic" className={styles.image_graphic}>
                      <img src="map_overview_US.jpg" className={styles.img_graphic}></img>
                    </div>
                    <div name="graphic description" className={styles.graphic_description}>
                      <p style={{ fontWeight: "bolder", fontSize: "20px" }}>
                        Graphic 6 Title
                      </p>
                      <p>
                        PizzaHater
                      </p>
                      <p>
                        Publish Date 4/10/23
                      </p>
                    </div>
                    <button name="fork graphic" className={styles.fork_graphic}>
                      Fork
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main></>
  )
}
