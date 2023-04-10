import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import { Button, TextField, Tabs, Tab, List, } from '@mui/material'
import SortIcon from '@mui/icons-material/Sort';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ArrowDownwardSharpIcon from '@mui/icons-material/ArrowDownwardSharp';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AppBar from '@mui/material/AppBar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


function AppBanner() {
    return (
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

                    <div id="homescreen">
                        <div id="homescreen-heading">

                            <Box sx={{ display: { xs: 'none', md: 'flex', marginRight: 'none' } }}>
                                <a href="/" target='Home'>borderline</a>

                                <p>name</p>

                                <TextField
                                    id="outlined-basic"
                                    //label="Search" 
                                    variant="outlined"
                                    defaultValue='Type Something To Search'
                                    sx={{ width: 600, backgroundColor: 'white' }}
                                //onKeyPress={handleSearch}
                                />
                                <Button
                                    size="large"
                                    edge="end"
                                    aria-label="sort by tag"
                                    aria-controls='primary-search-tag-filter'
                                    aria-haspopup="true"
                                    //onClick={handleMenuOpen}
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
                                    //onClick={handleMenuOpen}
                                    color="inherit"
                                    endIcon={<SortIcon />}
                                    sx={{ fontSize: 20, mr: 10, fontWeight: 'bold' }}
                                >
                                </Button>

                                <a href="/" target='Nav'>Maps</a>

                                <a href="/" target='Nav'>Forums</a>


                                <Box sx={{ display: { xs: 'none', md: 'flex', marginLeft: 'auto' } }}>
                                    <IconButton
                                        size="large"
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-haspopup="true"
                                        color="inherit"
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                </Box>
                            </Box>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default AppBanner