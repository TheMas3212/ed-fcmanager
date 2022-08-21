import { AppBar, Toolbar, IconButton, Typography, useTheme, SwipeableDrawer, Box, List } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
// import { ColorModeContext } from './theme';
import React from 'react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import GameClock from './components/GameClock';
import HomeIcon from '@mui/icons-material/Home';
import RocketIcon from '@mui/icons-material/Rocket';
import NavListItem from './components/NavListItem';

function MenuBar() {
  // const theme = useTheme();
  // const colorMode = React.useContext(ColorModeContext);
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
          {/* <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="primary">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton> */}
        </Toolbar>
      </AppBar>
      <Toolbar />
      <SwipeableDrawer open={navOpen} onClose={() => setNavOpen(false)} onOpen={() => setNavOpen(true)} disableSwipeToOpen={false}>
        <Toolbar />
        <List sx={{ overflow: 'auto' }}>
          <NavListItem to='/' primary='Home' icon={<HomeIcon />}/>
          <NavListItem to='/example' primary='Example' icon={<RocketIcon />}/>
        </List>
      </SwipeableDrawer>
    </>
  );
}

export default MenuBar;