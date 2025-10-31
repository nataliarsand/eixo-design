import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import App from './App.jsx'
// import OfferingDetail from './pages/OfferingDetail.jsx' // Temporarily disabled - offering pages hidden
import './index.css'

function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppWrapper() {
  const [lang, setLang] = React.useState('en');

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App lang={lang} setLang={setLang} />} />
        {/* Temporarily disabled - offering detail pages hidden */}
        {/* <Route path="/offerings/:offeringKey" element={<OfferingDetail lang={lang} setLang={setLang} />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
)
