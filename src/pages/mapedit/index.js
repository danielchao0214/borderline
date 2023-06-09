import Head from 'next/head';
import { Inter } from 'next/font/google';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from "next/router";
import { useState, useMemo, useEffect, useContext } from 'react';
import ExportMapModal from '@/components/ExportMapModal';
import PublishMapModal from '@/components/PublishMapModal';
import TagMapModal from '@/components/TagMapModal';
import styles from '@/pages/mapedit/MapEdit.module.css'
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import CompressIcon from '@mui/icons-material/Compress';
import NearMeIcon from '@mui/icons-material/NearMe';
import ClearIcon from '@mui/icons-material/Clear';
import MergeIcon from '@mui/icons-material/Merge';
import AddIcon from '@mui/icons-material/Add';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import BuildIcon from '@mui/icons-material/Build';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import DeleteIcon from '@mui/icons-material/Delete';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import SaveIcon from '@mui/icons-material/Save';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AuthContext from '@/components/contexts/AuthContext';


const inter = Inter({ subsets: ['latin'] })

export default function MapEdit() {

    const router = useRouter();
    const query = router.query;
    const _id = query._id;
    const title = query.title;

    const { isLoggedIn, user } = useContext(AuthContext);

    useEffect(() => {
        // inital fire of getForumPost
        //console.log(user.username);
        console.log(isLoggedIn);

    }, [isLoggedIn]);

    const Map = useMemo(() => dynamic(
        () => import('@/components/map.js'), // replace '@components/map' with your component's location
        {
            loading: () => <p>A map is loading</p>,
            ssr: false // This line is important. It's what prevents server-side render
        }
    ), [/* list variables which should trigger a re-render here */])

    const getID = () => {
        return _id;
    }

    const [openExportMapModal, setOpenExportMapModal] = useState(false);

    const handleCloseExportMapModal = () => {
        setOpenExportMapModal(false);
    };

    const [openPublishMapModal, setOpenPublishMapModal] = useState(false);

    const handleClosePublishMapModal = () => {
        setOpenPublishMapModal(false);
    };

    const [openTagMapModal, setOpenTagMapModal] = useState(false);

    const handleCloseTagMapModal = () => {
        setOpenTagMapModal(false);
    };

    const handleSave = async (event) => {
        event.preventDefault();

        console.log(_id)

        let db;
        var request = indexedDB.open("map", 1);

        request.onsuccess = async (event) => {
            db = request.result;

            const transaction = db.transaction('map', 'readwrite');
            const fileStore = transaction.objectStore('map');

            // First get operation
            const getRequest1 = fileStore.get(1);
            const firstResultPromise = new Promise(resolve => getRequest1.onsuccess = resolve);

            // Second get operation
            const getRequest2 = fileStore.get(2);
            const secondResultPromise = new Promise(resolve => getRequest2.onsuccess = resolve);

            // Wait for both promises to resolve
            const [response1, response2] = await Promise.all([firstResultPromise, secondResultPromise]);

            var file = response1.target.result;
            var filename = response2.target.result;
            if (file && isLoggedIn) {
                if (_id) {
                    if (file) {
                        var json = JSON.parse(await file.text());

                        console.log("saving")
                        let url = "/api/savemap";
                        let author = user.username;
                        let file_size = file.size;
                        let map = json;
                        const res = await fetch(url, {
                            method: "Post",
                            body: JSON.stringify({
                                _id,
                                author,
                                file_size,
                                map,
                            }),
                            headers: {
                                "content-type": "application/json"
                            },
                        }).catch((e) => console.log(e)); // Error for fetch request only

                        //If status code returns error print the code in the body
                        if (res.status == 400) {
                            console.log(data.errorMessage);
                        }
                    }
                } else {
                    if (file) {
                        var json = JSON.parse(await file.text());

                        console.log("creating")
                        let url = "/api/createmap";
                        let title = "Untitled";
                        let author = user.username;
                        let tags = [];
                        let file_size = file.size;
                        let likes = 0;
                        let dislikes = 0;
                        let likedDislikedmaps = [];
                        let published = false;
                        let publish_date = Date();
                        let description = "None";
                        let map = json;
                        let comments = [];
                        let graphics = "None";
                        let thumbnail = null;
                        const res = await fetch(url, {
                            method: "Post",
                            body: JSON.stringify({
                                title,
                                author,
                                tags,
                                file_size,
                                likes,
                                dislikes,
                                likedDislikedmaps,
                                published,
                                publish_date,
                                description,
                                map,
                                comments,
                                graphics,
                                thumbnail
                            }),
                            headers: {
                                "content-type": "application/json"
                            },
                        }).catch((e) => console.log(e)); // Error for fetch request only

                        //If status code returns error print the code in the body
                        if (res.status == 400) {
                            console.log(data.errorMessage);
                        }
                    }
                }

            }
        }

    }

    return (
        <>
            <ExportMapModal
                open={openExportMapModal}
                handleClose={handleCloseExportMapModal}
            />
            <PublishMapModal
                open={openPublishMapModal}
                handleClose={handleClosePublishMapModal}
                openTag={setOpenTagMapModal}
            />
            <TagMapModal
                open={openTagMapModal}
                handleClose={handleCloseTagMapModal}
                _id={getID()}
            />
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <div className={styles.left}>
                    <div className={styles.toolbar}>
                        <IconButton aria-label='compress' className={styles.toolbarbutton}>
                            <CompressIcon />
                        </IconButton>
                        <IconButton aria-label='select region' className={styles.toolbarbutton}>
                            <NearMeIcon />
                        </IconButton>
                        <IconButton aria-label='delete region' className={styles.toolbarbutton}>
                            <ClearIcon />
                        </IconButton>
                        <IconButton aria-label='merge regions ' className={styles.toolbarbutton}>
                            <MergeIcon />
                        </IconButton>
                        <IconButton aria-label='add region' className={styles.toolbarbutton}>
                            <AddIcon />
                        </IconButton>
                        <IconButton aria-label='split region' className={styles.toolbarbutton}>
                            <CallSplitIcon />
                        </IconButton>
                        <IconButton aria-label='select vertex' className={styles.toolbarbutton}>
                            <BuildIcon />
                        </IconButton>
                        <IconButton aria-label='add vertex' className={styles.toolbarbutton}>
                            <AddLocationIcon />
                        </IconButton>
                        <IconButton aria-label='remove vertex' className={styles.toolbarbutton}>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton aria-label='undo' className={styles.toolbarbutton}>
                            <UndoIcon />
                        </IconButton>
                        <IconButton aria-label='redo' className={styles.toolbarbutton}>
                            <RedoIcon />
                        </IconButton>
                    </div>
                    <div className={styles.actionbuttons}>
                        <Button onClick={handleSave} variant="contained" startIcon={<SaveIcon />} style={{ backgroundColor: "green" }} className={styles.actionbutton}>
                            Save
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<FileDownloadIcon />}
                            style={{ backgroundColor: "red" }}
                            className={styles.actionbutton}
                            onClick={() => setOpenExportMapModal(true)}
                        >
                            Export
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<CheckCircleIcon />}
                            style={{ backgroundColor: "blue" }}
                            className={styles.actionbutton}
                            onClick={() => setOpenPublishMapModal(true)}
                        >
                            Publish
                        </Button>
                    </div>
                </div>
                <div className={styles.center}>
                    <Map />
                </div>
                <div className={styles.right}>
                    <div className={styles.propertiesbar}>
                        <h1 style={{ textDecoration: "underline", margin: "0.1em" }}>Properties</h1>
                        <div className={styles.property}>asdf: asdf</div>
                        <div className={styles.property}>asdf: asdf</div>
                        <div className={styles.property}>asdf: asdf</div>
                        <div className={styles.property}>asdf: asdf</div>
                        <div className={styles.property}>asdf: asdf</div>
                        <div className={styles.property}>asdf: asdf</div>
                        <div className={styles.property}>asdf: asdf</div>
                        <div className={styles.property}>asdf: asdf</div>
                        <div className={styles.property}>asdf: asdf</div>
                        <div className={styles.property}>asdf: asdf</div>
                        <div className={styles.property}>asdf: asdf</div>
                        <div className={styles.property}>asdf: asdf</div>
                        <div className={styles.property}>asdf: asdf</div>
                        <div className={styles.property}>asdf: asdf</div>
                        <div className={styles.property}>asdf: asdf</div>
                        <div className={styles.property}>asdf: asdf</div>
                        <div className={styles.property}>asdf: asdf</div>
                        <div className={styles.property}>asdf: asdf</div>
                        <div className={styles.property}>asdf: asdf</div>
                        <div className={styles.property}>asdf: asdf</div>
                        <div className={styles.property}>asdf: asdf</div>
                        <div className={styles.property}>asdf: asdf</div>
                        <div className={styles.property}>asdf: asdf</div>
                        <div className={styles.property}>asdf: asdf</div>
                        <div className={styles.property}>asdf: asdf</div>
                        <div className={styles.property}>asdf: asdf</div>
                        <div className={styles.property}>asdf: asdf</div>
                        <div className={styles.property}>asdf: asdf</div>
                        <div className={styles.property}>asdf: asdf</div>
                        <div className={styles.property}>asdf: asdf</div>
                        <div className={styles.property}>asdf: asdf</div>
                        <div className={styles.property}>asdf: asdf</div>
                        <div className={styles.property}>asdf: asdf</div>
                        <div className={styles.property}>asdf: asdf</div>
                        <div className={styles.property}>asdf: asdf</div>
                        <div className={styles.property}>asdf: asdf</div>
                        <div className={styles.property}>asdf: asdf</div>
                        <div className={styles.property}>asdf: asdf</div>
                        <div className={styles.property}>asdf: asdf</div>
                        <div className={styles.property}>asdf: asdf</div>
                        <div className={styles.property}>asdf: asdf</div>
                        <div className={styles.property}>asdf: asdf</div>
                        <div className={styles.property}>asdf: asdf</div>
                        <div className={styles.property}>asdf: asdf</div>
                        <div className={styles.property}>asdf: asdf</div>
                        <div className={styles.property}>asdf: asdf</div>
                        <div className={styles.property}>asdf: asdf</div>
                        <div className={styles.property}>asdf: asdf</div>
                        <div className={styles.property}>asdf: asdf</div>
                        <div className={styles.property}>asdf: asdf</div>
                        <div className={styles.property}>asdf: asdf</div>
                        <div>
                            <Button variant="contained" className={styles.propertybutton}>Add</Button>
                            <Button variant="contained" className={styles.propertybutton}>Edit</Button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}