import { useState } from 'react';
import styles from '@/pages/dashboardmaps/DashboardMaps.module.css'
import Button from '@mui/material/Button';
import ImportMapModal from '@/components/ImportMapModal';
import MapPostList from '@/components/MapPostList';
import RecentMapList from '@/components/RecentMapList';
import SearchUserCard from '@/components/SearchUserCard';


export default function DashboardMaps() {
  const [openImportMapModal, setOpenImportMapModal] = useState(false);
  const [mapPostList, setMapPostList] = useState([{ id: 1, piclink: "map.png", title: "TITLE", author: "AUTHOR", likes: 5, dislikes: 4, date: "4/07/2023" }])
  const [recentMapList, setRecentMapList] = useState([{ id: 1, piclink: "map.png", title: "title", author: "author" }])
  //Temp value of usercard doesnt matter just if not null then show
  let usercard = true;

  const handleCloseImportMapModal = () => {
    setOpenImportMapModal(false);
  };

  //If Search result has value then set usercard
  //This if statment is temporary and should get a better implementation
  if (usercard !== null) {
    usercard = <SearchUserCard User="Username" link="link" ownedmaps={5} />
  }


  return (
    <>
      <ImportMapModal
        open={openImportMapModal}
        handleClose={handleCloseImportMapModal}
      />
      <div className={styles.mainContainer}>
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
          <div className={styles.recentmapcontainer}>
            <h2 className={styles.recentmaptitle} >Recently Viewed</h2>
            <div className={styles.flexcontainer}>
              <RecentMapList recentMapList={recentMapList} />
            </div>
          </div>
        </div>
        <div>
          {usercard}
          <div className={styles.mapcontainer}>
            <div className={styles.mapsflexcontainer}>
              <MapPostList mapPostList={mapPostList} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
