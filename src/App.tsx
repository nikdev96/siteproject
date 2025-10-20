import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Abrasives from './pages/Abrasives';
import Applications from './pages/Applications';
import Docs from './pages/Docs';
import Contacts from './pages/Contacts';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/abrasives" element={<Abrasives />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
