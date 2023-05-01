import { useState, useContext, useEffect } from 'react';
import styles from '@/pages/dashboardmaps/DashboardMaps.module.css'
import Button from '@mui/material/Button';
import ImportMapModal from '@/components/ImportMapModal';
import MapPostList from '@/components/MapPostList';
import RecentMapList from '@/components/RecentMapList';
import { AppBannerContext } from '@/components/contexts/AppBannerContext';
import SearchedUserList from '@/components/SearchedUserList';


export default function DashboardMaps() {
  const [openImportMapModal, setOpenImportMapModal] = useState(false);
  const [mapPostList, setMapPostList] = useState([{}])
  const [recentMapList, setRecentMapList] = useState([{ id: 1, piclink: "map.png", title: "title", author: "author" }])
  const [searchUserList, setSearchUserList] = useState([{}])
  
  const { value, setValue } = useContext(AppBannerContext)

  useEffect(() => {
    // inital fire of getForumPost
    //console.log(value);
    getMapPost()
  }, [value]);

  async function getMapPost() {
    const search = { value } // this will be the search in text field
    let url = "/api/getMapPost"
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
      //console.log(data.mapPosts)
      //console.log(data.message)

      //Change state !!!!!!!!
      setMapPostList(data.mapPosts)      
      setSearchUserList(data.user)
      
    };
  }

  const handleCloseImportMapModal = () => {
    setOpenImportMapModal(false);
  };

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
          <SearchedUserList searchUserList={searchUserList} />
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
