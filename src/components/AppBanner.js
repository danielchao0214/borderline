import * as React from 'react';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import { Button, TextField, Tabs, Tab, List, } from '@mui/material'
import SortIcon from '@mui/icons-material/Sort';
import ArrowDownwardSharpIcon from '@mui/icons-material/ArrowDownwardSharp';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import AppBar from '@mui/material/AppBar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import styles from '@/styles/AppBanner.module.css'
import { AppBannerContext } from './contexts/AppBannerContext';

export default function AppBanner() {

    const [anchorEl1, setAnchorEl1] = React.useState(null);
    const [anchorEl2, setAnchorEl2] = React.useState(null);
    const [anchorEl3, setAnchorEl3] = React.useState(null);

    const [search, setSearch] = React.useState();
    const { value, setValue } = React.useContext(AppBannerContext)

    const handleClick1 = (event) => {
        setAnchorEl1(event.currentTarget);
    };

    const handleClick2 = (event) => {
        setAnchorEl2(event.currentTarget);
    };

    const handleClick3 = (event) => {
        setAnchorEl3(event.currentTarget);
    }

    const handleClose1 = () => {
        setAnchorEl1(null);
    };

    const handleClose2 = () => {
        setAnchorEl2(null);
    };

    const handleClose3 = () => {
        setAnchorEl3(null);
    }

    const tagTextField = (
        <TextField
            id={styles.tagSearch}
            //label="Search" 
            //variant="outlined"
            defaultValue='Type Something To Search'

            sx={{ width: 200, backgroundColor: 'white', borderRadius: 5 }}
        //onKeyPress={handleSearch}
        />
    )

    function handleSearch(event) {
        //console.log(event.target.value); // Use Context
        //setSearch(event.target.value);
        setValue(event.target.value);
    }

    return (
        <div className={styles.homescreenheading}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" style={{ backgroundColor: "#AEAEAE", color: "000000" }}>
                    <Toolbar style={{ display: "block" }}>
                        <Typography
                            variant="h4"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block', minHeight: 82 } }}
                            style={{ display: "none" }}
                        >
                        </Typography>

                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <Link href="/" className={styles.home}>borderline</Link>

                            <p className={styles.p}>Dashboard</p>

                            <TextField
                                id={styles.outlinedbasic}
                                //label="Search" 
                                variant="outlined"
                                defaultValue='Type Something To Search'
                                style={{ padding: "10px", paddingTop: "15px", backgroundColor: "#AEAEAE" }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}

                                sx={{ width: 600, backgroundColor: 'white' }}
                                onChange={handleSearch}
                            />
                            <Button
                                size="large"
                                edge="end"
                                aria-label="sort by tag"
                                aria-controls='primary-search-tag-filter'
                                aria-haspopup="true"
                                onClick={handleClick3}
                                color="inherit"
                                endIcon={<ArrowDownwardSharpIcon />}
                                sx={{ fontSize: 20, fontWeight: 'bold' }}
                                style={{ marginRight: 0 }}
                            >
                            </Button>
                            <Button
                                size="large"
                                edge="end"
                                aria-label="sort by catagory"
                                aria-controls='primary-search-catagory'
                                aria-haspopup="true"
                                onClick={handleClick1}
                                color="inherit"
                                endIcon={<SortIcon />}
                                sx={{ fontSize: 20, mr: 10, fontWeight: 'bold' }}
                                style={{ marginRight: 0 }}
                            >

                            </Button>

                            <Link href="/dashboardmaps" className={styles.nav}>Maps</Link>

                            <Link href="/dashboardforums" className={styles.nav}>Forum</Link>


                            <Box sx={{ display: { xs: 'none', md: 'flex' }, p: 0 }}>
                                <IconButton
                                    id={styles.AccountIcon}
                                    size="large"
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-haspopup="true"
                                    onClick={handleClick2}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>

                                <Popover
                                    open={Boolean(anchorEl1)}
                                    anchorEl={anchorEl1}
                                    onClose={handleClose1}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}

                                >
                                    <Typography sx={{ width: 200 }}>
                                        <ul>
                                            <li target="Catagories" className="li">Sort Catagory 1</li>
                                            <li target="Catagories" className="li">Sort Catagory 2</li>
                                            <li target="Catagories" className="li">Sort Catagory 3</li>
                                            <li target="Catagories" className="li">Sort Catagory 4</li>
                                        </ul>
                                    </Typography>
                                </Popover>

                                <Popover

                                    open={Boolean(anchorEl2)}
                                    anchorEl={anchorEl2}
                                    onClose={handleClose2}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}

                                >
                                    <Typography sx={{ width: 150 }}>
                                        <ul>
                                            <li className="li"><Link href="/login" className={styles.list}>Login</Link></li>
                                            <li className="li"><Link href="/createaccount" className={styles.list}>Create Account</Link></li>
                                            <li className="li"><Link href="/userprofile" >View Account</Link></li>

                                        </ul>
                                    </Typography>
                                </Popover>

                                <Popover

                                    open={Boolean(anchorEl3)}
                                    anchorEl={anchorEl3}
                                    onClose={handleClose3}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}

                                >
                                    <Typography sx={{ width: 200 }}>
                                        <ul>
                                            <li className="li">{tagTextField}</li>
                                            <li className="li">Preset Tag 1</li>
                                            <li className="li">Preset Tag 2</li>
                                            <li className="li">Preset Tag 3</li>
                                        </ul>
                                    </Typography>
                                </Popover>

                            </Box>
                        </Box>

                    </Toolbar>
                </AppBar>
            </Box>
        </div>)
}
