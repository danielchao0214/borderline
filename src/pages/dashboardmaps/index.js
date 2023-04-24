import { useState } from 'react';
import styles from '@/pages/dashboardmaps/DashboardMaps.module.css'
import Button from '@mui/material/Button';
import ImportMapModal from '@/components/ImportMapModal';

import Box from '@mui/system/Box';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';


export default function DashboardMaps() {
  const [openImportMapModal, setOpenImportMapModal] = useState(false);

  const handleCloseImportMapModal = () => {
    setOpenImportMapModal(false);
  };

  return (
    <>
      {/* <Box className={styles.importbox}>
      <Button className={styles.importbutton} variant="outlined">Import File</Button>
    </Box>
    <AccountCircle></AccountCircle> */}
      <ImportMapModal
        open={openImportMapModal}
        handleClose={handleCloseImportMapModal}
      />
      <Box className={styles.importcontainer}>
        <Button
          variant="outlined"
          className={styles.importbutton}
          onClick={() => setOpenImportMapModal(true)}
        >
          Import File
        </Button>
      </Box>
      <Box sx={{ display: 'flex' }} className={styles.profilecontainer}>
        <AccountCircle className={styles.profilepic} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }} className={styles.profiletext}>
          <Typography variant="h4" className={styles.profileuser}>
            User
          </Typography>
          <Typography variant="h6" className={styles.profileownedmaps}>
            Owned Maps: 5
          </Typography>
        </Box>
      </Box>
      <Box className={styles.recentmapcontainer}>
        <Typography variant="h5" className={styles.recentmapheading}>
          Recently Viewed
        </Typography>
        <Box sx={{ display: 'flex' }} className={styles.recentmapsubcontainer}>
          <img className={styles.recentmap} src="map.png" alt="Map" />
          <Box sx={{ display: 'flex', flexDirection: 'column' }} className={styles.recentmaptext}>
            <Typography className={styles.recentmaptitle}>
              Title
            </Typography>
            <Typography className={styles.recentmapauthor}>
              Author
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex' }} className={styles.recentmapsubcontainer}>
          <img className={styles.recentmap} src="map.png" alt="Map" />
          <Box sx={{ display: 'flex', flexDirection: 'column' }} className={styles.recentmaptext}>
            <Typography className={styles.recentmaptitle}>
              Title
            </Typography>
            <Typography className={styles.recentmapauthor}>
              Author
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex' }} className={styles.recentmapsubcontainer}>
          <img className={styles.recentmap} src="map.png" alt="Map" />
          <Box sx={{ display: 'flex', flexDirection: 'column' }} className={styles.recentmaptext}>
            <Typography className={styles.recentmaptitle}>
              Title
            </Typography>
            <Typography className={styles.recentmapauthor}>
              Author
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex' }} className={styles.recentmapsubcontainer}>
          <img className={styles.recentmap} src="map.png" alt="Map" />
          <Box sx={{ display: 'flex', flexDirection: 'column' }} className={styles.recentmaptext}>
            <Typography className={styles.recentmaptitle}>
              Title
            </Typography>
            <Typography className={styles.recentmapauthor}>
              Author
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex' }} className={styles.recentmapsubcontainer}>
          <img className={styles.recentmap} src="map.png" alt="Map" />
          <Box sx={{ display: 'flex', flexDirection: 'column' }} className={styles.recentmaptext}>
            <Typography className={styles.recentmaptitle}>
              Title
            </Typography>
            <Typography className={styles.recentmapauthor}>
              Author
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box className={styles.mapcontainer}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}
          className={styles.mapflexcontainer}>
          <Box className={styles.mapbox}>
            <img className={styles.map} src="map.png" alt="Map" />
            <Typography className={styles.maptitle}>
              Title
            </Typography>
            <Typography className={styles.maptext}>
              Author
            </Typography>
            <Typography className={styles.maptext}>
              5 Likes ⋅ 5 Dislikes ⋅ 04/10/2023
            </Typography>
          </Box>
          <Box className={styles.mapbox}>
            <img className={styles.map} src="map.png" alt="Map" />
            <Typography className={styles.maptitle}>
              Title
            </Typography>
            <Typography className={styles.maptext}>
              Author
            </Typography>
            <Typography className={styles.maptext}>
              5 Likes ⋅ 5 Dislikes ⋅ 04/10/2023
            </Typography>
          </Box>
          <Box className={styles.mapbox}>
            <img className={styles.map} src="map.png" alt="Map" />
            <Typography className={styles.maptitle}>
              Title
            </Typography>
            <Typography className={styles.maptext}>
              Author
            </Typography>
            <Typography className={styles.maptext}>
              5 Likes ⋅ 5 Dislikes ⋅ 04/10/2023
            </Typography>
          </Box>
          <Box className={styles.mapbox}>
            <img className={styles.map} src="map.png" alt="Map" />
            <Typography className={styles.maptitle}>
              Title
            </Typography>
            <Typography className={styles.maptext}>
              Author
            </Typography>
            <Typography className={styles.maptext}>
              5 Likes ⋅ 5 Dislikes ⋅ 04/10/2023
            </Typography>
          </Box>
          <Box className={styles.mapbox}>
            <img className={styles.map} src="map.png" alt="Map" />
            <Typography className={styles.maptitle}>
              Title
            </Typography>
            <Typography className={styles.maptext}>
              Author
            </Typography>
            <Typography className={styles.maptext}>
              5 Likes ⋅ 5 Dislikes ⋅ 04/10/2023
            </Typography>
          </Box>
          <Box className={styles.mapbox}>
            <img className={styles.map} src="map.png" alt="Map" />
            <Typography className={styles.maptitle}>
              Title
            </Typography>
            <Typography className={styles.maptext}>
              Author
            </Typography>
            <Typography className={styles.maptext}>
              5 Likes ⋅ 5 Dislikes ⋅ 04/10/2023
            </Typography>
          </Box>
          <Box className={styles.mapbox}>
            <img className={styles.map} src="map.png" alt="Map" />
            <Typography className={styles.maptitle}>
              Title
            </Typography>
            <Typography className={styles.maptext}>
              Author
            </Typography>
            <Typography className={styles.maptext}>
              5 Likes ⋅ 5 Dislikes ⋅ 04/10/2023
            </Typography>
          </Box>
          <Box className={styles.mapbox}>
            <img className={styles.map} src="map.png" alt="Map" />
            <Typography className={styles.maptitle}>
              Title
            </Typography>
            <Typography className={styles.maptext}>
              Author
            </Typography>
            <Typography className={styles.maptext}>
              5 Likes ⋅ 5 Dislikes ⋅ 04/10/2023
            </Typography>
          </Box>
          <Box className={styles.mapbox}>
            <img className={styles.map} src="map.png" alt="Map" />
            <Typography className={styles.maptitle}>
              Title
            </Typography>
            <Typography className={styles.maptext}>
              Author
            </Typography>
            <Typography className={styles.maptext}>
              5 Likes ⋅ 5 Dislikes ⋅ 04/10/2023
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  )
}
{/* <main>

        <div className={styles.flexcontainer}>
          <div className={styles.importbox}>
            {
              <Button
                variant="outlined"
                className={styles.importbutton}
                onClick={() => setOpenImportMapModal(true)}
              >
                Import File
              </Button>
            }
          </div>

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
      </main> */}