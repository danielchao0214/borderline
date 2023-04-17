import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Mapoverview.module.css'
import Link from 'next/link';
import AppBanner from '@/components/AppBanner';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
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
  return (
    <><AppBanner />
    <Head>
      <title>Create Next App</title>
      <meta name="description" content="Generated by create next app" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      <link rel="icon" href="/favicon.ico" />
    </Head><main className={styles.main}>
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
                    Map of the United States
                  </span>
                  <span className="material-symbols-outlined">
                    edit
                  </span>
                </div>
                <span style={{ fontSize: "1.2rem" }}>
                  PizzaLover
                </span>
              </div>
              <div name="image" className={styles.image}>
                <img src="map_overview_US.jpg" className={styles.img}></img>
              </div>
              <div name="description" className={styles.description}>
                <div>
                  <span style={{ fontSize: "1.5rem" }}>
                    Publish Date · 4/10/2023
                  </span>
                </div>
                <br />
                <div>
                  <span>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                    dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
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
                      <p style={{ fontWeight: "bolder", fontSize: "15px" }}>
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
                      fork
                    </button>
                  </div>
                  <div name="Graphic" className={styles.graphic}>
                    <div name="image graphic" className={styles.image_graphic}>
                      <img src="map_overview_US.jpg" className={styles.img_graphic}></img>
                    </div>
                    <div name="graphic description" className={styles.graphic_description}>
                      <p style={{ fontWeight: "bolder", fontSize: "15px" }}>
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
                      fork
                    </button>
                  </div>
                  <div name="Graphic" className={styles.graphic}>
                    <div name="image graphic" className={styles.image_graphic}>
                      <img src="map_overview_US.jpg" className={styles.img_graphic}></img>
                    </div>
                    <div name="graphic description" className={styles.graphic_description}>
                      <p style={{ fontWeight: "bolder", fontSize: "15px" }}>
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
                      fork
                    </button>
                  </div>
                  <div name="Graphic" className={styles.graphic}>
                    <div name="image graphic" className={styles.image_graphic}>
                      <img src="map_overview_US.jpg" className={styles.img_graphic}></img>
                    </div>
                    <div name="graphic description" className={styles.graphic_description}>
                      <p style={{ fontWeight: "bolder", fontSize: "15px" }}>
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
                      fork
                    </button>
                  </div>
                  <div name="Graphic" className={styles.graphic}>
                    <div name="image graphic" className={styles.image_graphic}>
                      <img src="map_overview_US.jpg" className={styles.img_graphic}></img>
                    </div>
                    <div name="graphic description" className={styles.graphic_description}>
                      <p style={{ fontWeight: "bolder", fontSize: "15px" }}>
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
                      fork
                    </button>
                  </div>
                  <div name="Graphic" className={styles.graphic}>
                    <div name="image graphic" className={styles.image_graphic}>
                      <img src="map_overview_US.jpg" className={styles.img_graphic}></img>
                    </div>
                    <div name="graphic description" className={styles.graphic_description}>
                      <p style={{ fontWeight: "bolder", fontSize: "15px" }}>
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
                      fork
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
