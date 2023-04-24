import { useState } from 'react';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import { Button, TextField, Tabs, Tab, List, } from '@mui/material'
import { Inter } from 'next/font/google';
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


export default function AppBanner() {

    const [anchorEl1, setAnchorEl1] = useState(null);
    const [anchorEl2, setAnchorEl2] = useState(null);
    const [anchorEl3, setAnchorEl3] = useState(null);

    const [searchText, setSearchText] = useState('');

    const handleSearchInputChange = (event) => {
        setSearchText(event.target.value);
    };

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


    return (
        <div className={styles.homescreenheading}>
            <AppBar className={styles.appbar}>
                <Toolbar className={styles.toolbar}>
                    <Link href="/" target='Home' className={styles.home}>borderline</Link>

                    <p className={styles.currentscreen}>Dashboard</p>

                    <div className={styles.searchArea}>
                        <TextField
                            placeholder='Search'
                            value={searchText}
                            onChange={handleSearchInputChange}
                            sx={{
                                "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { borderColor: "#ADB9C1" } },
                                "& .MuiOutlinedInput-root:hover": { "& > fieldset": { borderColor: "#ADB9C1" } },
                            }}
                            InputProps={{
                                className: styles.searchTextField,
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <IconButton
                            aria-label="sort by tag"
                            aria-controls='primary-search-tag-filter'
                            aria-haspopup="true"
                            onClick={handleClick3}
                            color="inherit"
                            style={{ marginRight: "0.125em" }}
                        >
                            <ArrowDownwardSharpIcon />
                        </IconButton>
                        <IconButton
                            aria-label="sort by category"
                            aria-controls='primary-search-category'
                            aria-haspopup="true"
                            onClick={handleClick1}
                            color="inherit"
                        >
                            <SortIcon />
                        </IconButton>
                    </div>

                    <Link href="/dashboardmaps" target='Nav' className={styles.nav}>Maps</Link>

                    <Link href="/dashboardforums" target='Nav' className={styles.nav}>Forum</Link>

                    <IconButton
                        className={styles.AccountIconButton}
                        aria-label="account of current user"
                        aria-haspopup="true"
                        onClick={handleClick2}
                        color="inherit"
                    >
                        <AccountCircle fontSize='large' />
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
                                <li target="Categories" className="li">Sort category 1</li>
                                <li target="Categories" className="li">Sort category 2</li>
                                <li target="Categories" className="li">Sort category 3</li>
                                <li target="Categories" className="li">Sort category 4</li>
                            </ul>
                        </Typography>
                    </Popover>

                    <Popover
                        open={Boolean(anchorEl2)}
                        anchorEl={anchorEl2}
                        onClose={handleClose2}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                    >
                        <Typography>
                            <ul>
                                <li className={styles.loginli}><Link href="/login">Login</Link></li>
                                <li className={styles.loginli}><Link href="/createaccount">Create Account</Link></li>
                                <li className={styles.loginli}><Link href="/userprofile">View Account</Link></li>
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
                </Toolbar>
            </AppBar>
        </div>)
}
