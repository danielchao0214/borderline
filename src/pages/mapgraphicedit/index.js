import Head from 'next/head';
import { Inter } from 'next/font/google';
import dynamic from 'next/dynamic';
import React from 'react';
import styles from '@/pages/mapgraphicedit/MapGraphicEdit.module.css'
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import NearMeIcon from '@mui/icons-material/NearMe';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import ColorizeIcon from '@mui/icons-material/Colorize';
import TocIcon from '@mui/icons-material/Toc';
import BrushIcon from '@mui/icons-material/Brush';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import SaveIcon from '@mui/icons-material/Save';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ColorWheel from '@/components/ColorWheel';

const inter = Inter({ subsets: ['latin'] })

export default function MapGraphicEdit() {
  const MapGraphic = React.useMemo(() => dynamic(
    () => import('@/components/MapGraphic.js'), // replace '@components/map' with your component's location
    {
      loading: () => <p>A map is loading</p>,
      ssr: false // This line is important. It's what prevents server-side render
    }
  ), [/* list variables which should trigger a re-render here */])
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.left}>
          <div className={styles.toolbar}>
            <IconButton aria-label='select region' className={styles.toolbarbutton}>
              <NearMeIcon />
            </IconButton>
            <IconButton aria-label='text box' className={styles.toolbarbutton}>
              <TextFieldsIcon />
            </IconButton>
            <IconButton aria-label='color fill ' className={styles.toolbarbutton}>
              <FormatColorFillIcon />
            </IconButton>
            <IconButton aria-label='legend' className={styles.toolbarbutton}>
              <TocIcon />
            </IconButton>
            <IconButton aria-label='color edge' className={styles.toolbarbutton}>
              <BrushIcon />
            </IconButton>
            <IconButton aria-label='color select' className={styles.toolbarbutton}>
              <ColorizeIcon />
            </IconButton>
            <IconButton aria-label='undo' className={styles.toolbarbutton}>
              <UndoIcon />
            </IconButton>
            <IconButton aria-label='redo' className={styles.toolbarbutton}>
              <RedoIcon />
            </IconButton>
          </div>
          <div className={styles.actionbuttons}>
            <Button variant="contained" startIcon={<SaveIcon />} style={{ backgroundColor: "green" }} className={styles.actionbutton}>
              Save
            </Button>
            <Button variant="contained" startIcon={<FileDownloadIcon />} style={{ backgroundColor: "red" }} className={styles.actionbutton}>
              Export
            </Button>
            <Button variant="contained" startIcon={<CheckCircleIcon />} style={{ backgroundColor: "blue" }} className={styles.actionbutton}>
              Publish
            </Button>
          </div>
        </div>
        <div className={styles.center}>
          <MapGraphic />
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
          <div className={styles.colorPickerSection}>
            <ColorWheel />
          </div>
        </div>
      </main>
    </>
  )
}