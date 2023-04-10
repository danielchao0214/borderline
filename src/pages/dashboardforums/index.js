import styles from '@/pages/dashboardforums/DashboardForums.module.css'
import Button from '@mui/material/Button';

export default function App() {
  return (
    <>
      {/* <main> */}
      {/* <div className={styles.flexcontainer}> */}
        <div className={styles.createcontainer}>
          {
            <Button className={styles.createbutton} variant="outlined">Create Post</Button>
          }
        </div>

        <div className={styles.forumcontainer}>
          <div className={styles.forumflexcontainer}>
            <div className={styles.forumdiv}>
              <h1>Title</h1>
              <p>Posted by: User</p>
              <br />
              <p>Lorem ipsum dolor sit amet, docendi urbanitas te eum, dolore explicari mei eu. Mandamus democritum necessitatibus an nec. In sit alia libris docendi, cu omittam sapientem definitiones his. Neglegentur voluptatibus interpretaris ei has, eos at exerci audiam.

                Mel an viderer eleifend intellegebat. Ne duo nihil dolorum habemus, iuvaret eleifend prodesset sea ad. Eu quodsi graecis efficiendi per, sea at veri accusam. Quo ferri nobis sadipscing ut, vel suas sint ut.</p>
            </div>
            <div className={styles.forumdiv}>
            <h1>Title</h1>
              <p>Posted by: User</p>
              <br />
              <p>Lorem ipsum dolor sit amet, docendi urbanitas te eum, dolore explicari mei eu. Mandamus democritum necessitatibus an nec. In sit alia libris docendi, cu omittam sapientem definitiones his. Neglegentur voluptatibus interpretaris ei has, eos at exerci audiam.

                Mel an viderer eleifend intellegebat. Ne duo nihil dolorum habemus, iuvaret eleifend prodesset sea ad. Eu quodsi graecis efficiendi per, sea at veri accusam. Quo ferri nobis sadipscing ut, vel suas sint ut.</p>
            </div>
            <div className={styles.forumdiv}>
            <h1>Title</h1>
              <p>Posted by: User</p>
              <br />
              <p>Lorem ipsum dolor sit amet, docendi urbanitas te eum, dolore explicari mei eu. Mandamus democritum necessitatibus an nec. In sit alia libris docendi, cu omittam sapientem definitiones his. Neglegentur voluptatibus interpretaris ei has, eos at exerci audiam.

                Mel an viderer eleifend intellegebat. Ne duo nihil dolorum habemus, iuvaret eleifend prodesset sea ad. Eu quodsi graecis efficiendi per, sea at veri accusam. Quo ferri nobis sadipscing ut, vel suas sint ut.</p>
            </div>
            <div className={styles.forumdiv}>
            <h1>Title</h1>
              <p>Posted by: User</p>
              <br />
              <p>Lorem ipsum dolor sit amet, docendi urbanitas te eum, dolore explicari mei eu. Mandamus democritum necessitatibus an nec. In sit alia libris docendi, cu omittam sapientem definitiones his. Neglegentur voluptatibus interpretaris ei has, eos at exerci audiam.

                Mel an viderer eleifend intellegebat. Ne duo nihil dolorum habemus, iuvaret eleifend prodesset sea ad. Eu quodsi graecis efficiendi per, sea at veri accusam. Quo ferri nobis sadipscing ut, vel suas sint ut.</p>
            </div>
          </div>
        </div>

        <div className={styles.recentforumcontainer}>
          <h1 className={styles.recentforumtitle} >Recently Viewed</h1>
          <div className={styles.flexcontainer}>
            <div className={styles.recentforumdiv}>
              <h2>Title</h2>
              Posted by: User
            </div>
            <div className={styles.recentforumdiv}>
              <h2>Title</h2>
              Posted by: User
            </div>
            <div className={styles.recentforumdiv}>
              <h2>Title</h2>
              Posted by: User
            </div>
            <div className={styles.recentforumdiv}>
              <h2>Title</h2>
              Posted by: User
            </div>
            <div className={styles.recentforumdiv}>
              <h2>Title</h2>
              Posted by: User
            </div>
          </div>
        </div>
      {/* </div> */}
      {/* </main> */}
    </>
  )
}
