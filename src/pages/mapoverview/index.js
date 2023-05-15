import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from "next/router";
import styles from '@/styles/Mapoverview.module.css'
import Link from 'next/link';



export default function Home() {

  const router = useRouter();
  const query = router.query;
  const _id = query._id;

  const [post, setPost] = useState([{ title: "Temp", author: "Temp", tags: "Temp", file_size: 0, likes: 0, dislikes: 0, publish_date: "Temp", description: "Temp", map: {}, tags: "Temp", comments: [{}], graphics: [{}], thumbnail: undefined }]);


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
    getMapPost()
  }, []);



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
      //console.log(data.forumPosts)
      //console.log(data.message)

      //Change state !!!!!!!!
      //console.log(data.forumPost)
      setPost(data.mapPost)

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
                <Link href="mapedit">
                  <button className={styles.option_button}>
                    Edit Map
                  </button>
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
                <button className={styles.like_dislike_button}>
                  Like
                </button>
                <button className={styles.like_dislike_button}>
                  Dislike
                </button>
              </div>
            </div>
            <div name="middlesection" className={styles.middle_container}>
              <div name="title" className={styles.title}>
                <div>
                  <span>
                    {post[0].title}
                  </span>
                  {/* <span className="material-symbols-outlined">
                    edit THIS IS TO EDIT MAP NAME WHICH IS LIMITED TO VIEWING OWN MAPS
                  </span> */}
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
                  <div name="comment" className={styles.comment_card}>
                    <div>
                      <span style={{ fontWeight: "bold" }}>
                        PizzaHater
                      </span>
                    </div>
                    <div>
                      <span>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                        dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                      </span>
                    </div>
                  </div>
                  <div name="comment" className={styles.comment_card}>
                    <div>
                      <span style={{ fontWeight: "bold" }}>
                        PizzaHater
                      </span>
                    </div>
                    <div>
                      <span>
                        Lorem ipsum dolor sit amet, consectetur
                      </span>
                    </div>
                  </div>
                  <div name="comment" className={styles.comment_card}>
                    <div>
                      <span style={{ fontWeight: "bold" }}>
                        PizzaHater
                      </span>
                    </div>
                    <div>
                      <span>
                        Lorem ipsum dolor sit amet, consectetur
                      </span>
                    </div>
                  </div>
                  <div name="comment" className={styles.comment_card}>
                    <div>
                      <span style={{ fontWeight: "bold" }}>
                        PizzaHater
                      </span>
                    </div>
                    <div>
                      <span>
                        Lorem ipsum dolor sit amet, consectetur
                      </span>
                    </div>
                  </div>
                  <div name="comment" className={styles.comment_card}>
                    <div>
                      <span style={{ fontWeight: "bold" }}>
                        PizzaHater
                      </span>
                    </div>
                    <div>
                      <span>
                        Lorem ipsum dolor sit amet, consectetur
                      </span>
                    </div>
                  </div>
                  <div name="comment" className={styles.comment_card}>
                    <div>
                      <span style={{ fontWeight: "bold" }}>
                        PizzaHater
                      </span>
                    </div>
                    <div>
                      <span>
                        Lorem ipsum dolor sit amet, consectetur
                      </span>
                    </div>
                  </div>
                </div>
                <div name="create comment" className={styles.create_comment_container}>
                  <textarea placeholder="Comment?" name="create comment textbox" className={styles.comment_textbox}>
                  </textarea>
                  <button className={styles.submit_comment}>
                    Submit
                  </button>
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
