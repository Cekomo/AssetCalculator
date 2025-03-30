import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import './App.css'
import Navbar from './navbar/Navbar'
import Home from "./pages/Home";
import Wealth from "./pages/wealth/Wealth";
import Market from "./pages/market/Market";
import Weather from "./pages/weather/Weather";
import About from "./pages/About";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="wealth" element={<Wealth />} />
          <Route path="market" element={<Market />} />
          <Route path="weather" element={<Weather />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;


const Layout = () => {
  return (
    <div id="layout">
      <div id="body">
        <Navbar />
        <div id="content">
          <Outlet /> {/* Will take the rest of the space */}
        </div>
      </div>
    </div>
  );
};