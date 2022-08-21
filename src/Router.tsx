import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Example from './pages/Example';
import HomePage from './pages/Home';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          {/* <Route path='example' element={<Example />}/> */}
          <Route index element={<HomePage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;