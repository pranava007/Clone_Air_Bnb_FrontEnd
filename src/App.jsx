import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import ForgetPasswords from "./Pages/ForgetPasswords";
import ResetPassword from "./Pages/ResetPassword";
import HostprivetRouter from "./Components/HostprivetRouter";
import PropertyForm from "./Pages/PropertyForm";
import Dashboard from "./Pages/Dashboard";
import PrivetRouter from "./Components/PrivetRouter";
import PreviousPost from "./Components/PreviousPost";
import HomePage from "./Pages/HomePage";

// fileter pages

import Trending from "./Components/Trending";
import Filterpage from './Components/Filterpage'
import All from "./Components/All";
import Countryside from "./Components/Countryside";
import Islands from "./components/Islands";

import Containers from "./components/Containers";
import Camping from "./components/Camping";
import AmazingPools from "./components/AmazingPools";
import Beachfront from "./components/Beachfront";
import AmazingViews from "./components/AmazingViews";
import Farmhouses from "./components/Farmhouses";
import Cabins from "./components/Cabins";
import Luxe from "./components/Luxe";
import Rooms from "./components/Rooms";
import EarthHomes from "./components/EarthHomes";
import NationalParks from "./components/NationalParks";
import HistoricalHomes from "./components/HistoricalHomes";
import OffTheGrid from "./components/OffTheGrid";
import Mansion from "./components/Mansion";
import New from "./components/New";
import TopOfTheWorld from "./components/TopOfTheWorld";
import TopCities from "./components/TopCities";
import Tropical from "./components/Tropical";
import Play from "./components/Play";
import Houseboats from "./components/Houseboats";
import Boats from "./components/Boats";
import Lake from "./components/Lake";
import Cave from "./components/Cave";
import CamperVans from "./components/CamperVans";
import TinyHomes from "./components/TinyHomes";
import Design from "./components/Design";
import Surfing from "./components/Surfing";
import AFrames from "./components/AFrames";
import Golfing from "./components/Golfing";
import BedAndBreakfast from "./components/BedAndBreakfast";
import Vineyards from "./components/Vineyards";
import Hanoks from "./components/Hanoks";
import Skiing from "./components/Skiing";
import CycladicHomes from "./components/CycladicHomes";
import ChefsKitchens from "./components/ChefsKitchens";
import Windmill from "./components/Windmill";
import CasesParticulares from "./components/CasesParticulares";
import Minsus from "./components/Minsus";
import Roykans from "./components/Roykans";
import ShepherdsHuts from "./components/ShepherdsHuts";
import Towers from "./components/Towers";
import Desert from "./components/Desert";
import Yurts from "./components/Yurts";
import Barns from "./components/Barns";
import SkiInOut from "./components/SkiInOut";
import Adapted from "./components/Adapted";
import GrandPianos from "./components/GrandPianos";
import CreativeSpace from "./components/CreativeSpace";
import Dammusi from "./components/Dammusi";
import Riads from "./components/Riads";
import Trulli from "./components/Trulli";
import Beach from "./components/Beach";

import CartDetails from "./Pages/CartDetails";
import Cart from "./Components/Cart";
import { useSelector } from "react-redux";
import { Datalistout } from "./Components/Datalistout";



function App() {

  const { properties } = useSelector((state) => state.properties);
  return (
    <>
      <BrowserRouter>
        <Header />
        {/* <Filterpage/> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/forgetpassword" element={<ForgetPasswords />} />
          <Route path="/resetpassword/:id/:token" element={<ResetPassword />} />

          {/* Host router */}

          <Route element={<HostprivetRouter />}>
            <Route path="/create-post" element={<PropertyForm />} />
          </Route>

          {/* privete Router only allowed login user */}
          <Route element={<PrivetRouter />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route path="/get-post" element={<PreviousPost />} />

          <Route path="/cart/:index" element={<CartDetails items={properties} />} />


          {/* Fileter pages */}
         

        
          <Route path="/datalist" element={<Datalistout />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/countryside" element={<Countryside />} />
          <Route path="/islands" element={<Islands />} />
          <Route path="/containers" element={<Containers />} />
          <Route path="/camping" element={<Camping />} />
          <Route path="/amazingpools" element={<AmazingPools />} />
          <Route path="/beachfront" element={<Beachfront />} />
          <Route path="/amazingviews" element={<AmazingViews />} />
          <Route path="/farmhouses" element={<Farmhouses />} />
          <Route path="/cabins" element={<Cabins />} />
          <Route path="/luxe" element={<Luxe />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/earthhomes" element={<EarthHomes />} />
          <Route path="/nationalparks" element={<NationalParks />} />
          <Route path="/historicalhomes" element={<HistoricalHomes />} />
          <Route path="/offthegrid" element={<OffTheGrid />} />
          <Route path="/mansion" element={<Mansion />} />
          <Route path="/new" element={<New />} />
          <Route path="/topoftheworld" element={<TopOfTheWorld />} />
          <Route path="/topcities" element={<TopCities />} />
          <Route path="/tropical" element={<Tropical />} />
          <Route path="/play" element={<Play />} />
          <Route path="/houseboats" element={<Houseboats />} />
          <Route path="/boats" element={<Boats />} />
          <Route path="/lake" element={<Lake />} />
          <Route path="/cave" element={<Cave />} />
          <Route path="/campervans" element={<CamperVans />} />
          <Route path="/tinyhomes" element={<TinyHomes />} />
          <Route path="/design" element={<Design />} />
          <Route path="/surfing" element={<Surfing />} />
          <Route path="/aframes" element={<AFrames />} />
          <Route path="/golfing" element={<Golfing />} />
          <Route path="/bedandbreakfast" element={<BedAndBreakfast />} />
          <Route path="/vineyards" element={<Vineyards />} />
          <Route path="/hanoks" element={<Hanoks />} />
          <Route path="/skiing" element={<Skiing />} />
          <Route path="/cycladichomes" element={<CycladicHomes />} />
          <Route path="/chefskitchens" element={<ChefsKitchens />} />
          <Route path="/windmill" element={<Windmill />} />
          <Route path="/casesparticulares" element={<CasesParticulares />} />
          <Route path="/minsus" element={<Minsus />} />
          <Route path="/roykans" element={<Roykans />} />
          <Route path="/shepherdshuts" element={<ShepherdsHuts />} />
          <Route path="/towers" element={<Towers />} />
          <Route path="/desert" element={<Desert />} />
          <Route path="/yurts" element={<Yurts />} />
          <Route path="/barns" element={<Barns />} />
          <Route path="/skiinout" element={<SkiInOut />} />
          <Route path="/adapted" element={<Adapted />} />
          <Route path="/grandpianos" element={<GrandPianos />} />
          <Route path="/creativespace" element={<CreativeSpace />} />
          <Route path="/dammusi" element={<Dammusi />} />
          <Route path="/riads" element={<Riads />} />
          <Route path="/trulli" element={<Trulli />} />
          <Route path="/beach" element={<Beach />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
