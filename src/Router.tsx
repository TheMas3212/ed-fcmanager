import App from './pages/App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import SettingsPage from './pages/Settings';
import JumpTimerPage from './pages/JumpTimer';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='jumpTimer' element={<JumpTimerPage />}/>
          <Route path='settings' element={<SettingsPage />}/>
          <Route index element={<HomePage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;