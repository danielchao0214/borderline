import * as React from 'react';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import { Button, TextField, Tabs, Tab, List, } from '@mui/material'
import { Link } from 'react-router-dom'
import { Inter } from 'next/font/google';
import SortIcon from '@mui/icons-material/Sort';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ArrowDownwardSharpIcon from '@mui/icons-material/ArrowDownwardSharp';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AppBar from '@mui/material/AppBar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';





export default function AppBanner() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };
    
      const open = Boolean(anchorEl);
      const id = open ? 'simple-popover' : undefined;
    
    return (
    <div class = 'homescreen-heading'>
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
                                    onClick={handleClick}
                                    color="inherit"
                                    endIcon={<SortIcon />}
                                    sx={{ fontSize: 20, mr: 10, fontWeight: 'bold' }}
                                >
                                
                                
                                
                                </Button>

                                <a href="/" target='Nav'>Maps</a>

                                <a href="/" target='Nav'>Forum</a>


                                <Box sx={{ display: { xs: 'none', md: 'flex' },p:0 }}>
                                    <IconButton
                                        size="large"
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-haspopup="true"
                                        onClick={handleClick}
                                        color="inherit"
                                    >
                                        <AccountCircle />
                                    </IconButton>

                                    <Popover
                                        id={id}
                                        open={open}
                                        anchorEl={anchorEl}
                                        onClose={handleClose}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        
                                    >
                                    <Typography sx={{width:150 }}>
                                        <ul>
                                            <li><a href="/login" target='list'>Login</a></li>
                                            <li><a href="/createaccount" target='list'>Create Account</a></li>
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
