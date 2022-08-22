import { AppBar, Toolbar, IconButton, Typography, useTheme, SwipeableDrawer, Box, List } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
// import { ColorModeContext } from './theme';
import React from 'react';
// import Brightness4Icon from '@mui/icons-material/Brightness4';
// import Brightness7Icon from '@mui/icons-material/Brightness7';
import GameClock from './GameClock';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import NavListItem from './NavListItem';
// import { useSettings } from './Settings';

function MenuBar() {
  // const theme = useTheme();
  // const colorMode = React.useContext(ColorModeContext);
  // const [Settings, setSetting] = useSettings();

  // function toggleColorMode() {
  //   console.log('aaaa');
  //   setSetting({
  //     darkMode: Settings.darkMode === 'light' ? 'dark' : 'light'
  //   });
  // }

  const [navOpen, setNavOpen] = React.useState(false);
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
          {/* <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="primary">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton> */}
        </Toolbar>
      </AppBar>
      <Toolbar />
      <SwipeableDrawer open={navOpen} onClose={() => setNavOpen(false)} onOpen={() => setNavOpen(true)} disableSwipeToOpen={false}>
        <Toolbar />
        <List sx={{ overflow: 'auto' }}>
          <NavListItem to='/' primary='Home' icon={<HomeIcon />}/>
          <NavListItem to='/settings' primary='Settings' icon={<SettingsIcon />}/>
        </List>
      </SwipeableDrawer>
    </>
  );
}

export default MenuBar;