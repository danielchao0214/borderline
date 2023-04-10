import * as React from 'react';
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


export default function AppBanner() {

    const [anchorEl1, setAnchorEl1] = React.useState(null);
    const [anchorEl2, setAnchorEl2] = React.useState(null);
    const [anchorEl3, setAnchorEl3] = React.useState(null);

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
            id="tagSearch"
            //label="Search" 
            //variant="outlined"
            defaultValue='Type Something To Search'

            sx={{ width: 200, backgroundColor: 'white', borderRadius: 5 }}
        //onKeyPress={handleSearch}
        />
    )


    return (
        <div class='homescreen-heading'>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography
                            variant="h4"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block', minHeight: 82 } }}
                        >
                        </Typography>

                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <a href="/" target='Home'>borderline</a>

                            <p>Dashboard</p>

                            <TextField
                                id="outlined-basic"
                                //label="Search" 
                                variant="outlined"
                                defaultValue='Type Something To Search'

                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}


                                sx={{ width: 600, backgroundColor: 'white' }}
                            //onKeyPress={handleSearch}
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
                            >

                            </Button>

                            <a href="/dashboardmaps" target='Nav'>Maps</a>

                            <a href="/dashboardforums" target='Nav'>Forum</a>


                            <Box sx={{ display: { xs: 'none', md: 'flex' }, p: 0 }}>
                                <IconButton
                                    id="AccountIcon"
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
                                            <li target="Catagories">Sort Catagory 1</li>
                                            <li target="Catagories">Sort Catagory 2</li>
                                            <li target="Catagories">Sort Catagory 3</li>
                                            <li target="Catagories">Sort Catagory 4</li>
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
                                            <li><a href="/login" target='list'>Login</a></li>
                                            <li><a href="/createaccount" target='list'>Create Account</a></li>
                                            <li><a href="/userprofile" target='list'>View Account</a></li>
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
                                            <li>{tagTextField}</li>
                                            <li>Preset Tag 1</li>
                                            <li>Preset Tag 2</li>
                                            <li>Preset Tag 3</li>
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
