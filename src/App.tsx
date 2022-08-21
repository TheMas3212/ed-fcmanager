import './App.css';
import { Box } from '@mui/material';
import MenuBar from './MenuBar';
import { Outlet } from 'react-router-dom';
import { CarrierStoreProvider } from './CarrierStore';

function App() {
  const carriers = {
    'KBL-8TM': {
      id: 'KBL-8TM',
      name: 'TSUKIKO',
      location: 'HIP 58832'
    },
    'HNG-N0W': {
      id: 'HNG-N0W',
      name: 'Toredo-Maru',
      location: 'HIP 58832'
    },
    'KNW-92W': {
      id: 'KNW-92W',
      name: 'Komahashi',
      location: 'Panoi'
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <CarrierStoreProvider initialState={carriers}>
        <MenuBar/>
        <Outlet/>
      </CarrierStoreProvider>
    </Box>
  );
}

export default App;
