import { AppBar, Toolbar, IconButton, Typography, useTheme, SwipeableDrawer, Box, List } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import GameClock from './GameClock';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import NavListItem from './NavListItem';
import TimerIcon from '@mui/icons-material/Timer';
import { useLocation } from 'react-router-dom';

function MenuBar() {
  const [navOpen, setNavOpen] = React.useState(false);
  const {pathname} = useLocation();

  React.useEffect(() => {
    setNavOpen(false); // Close the navigation panel
  }, [ pathname ]);

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ backgroundColor: '#212121'}}>
          <IconButton
            size="large"
            edge="start"
            color="primary"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setNavOpen(!navOpen)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" color="primary" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <GameClock full/>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <SwipeableDrawer open={navOpen} onClose={() => setNavOpen(false)} onOpen={() => setNavOpen(true)} disableSwipeToOpen={false}>
        <Toolbar />
        <List sx={{ overflow: 'auto' }}>
          <NavListItem to='/' primary='Home' icon={<HomeIcon />}/>
          <NavListItem to='/jumpTimer' primary='Jump Timer' icon={<TimerIcon />}/>
          <NavListItem to='/settings' primary='Settings' icon={<SettingsIcon />}/>
        </List>
      </SwipeableDrawer>
    </>
  );
}

export default MenuBar;