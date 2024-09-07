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






import CartDetails from "./Pages/CartDetails";
import Cart from "./Components/Cart";
import { useSelector } from "react-redux";
import { Datalistout } from "./Components/Datalistout";



// fileter pages


import Adapted from "./Components/Adapted";
import AFrames from "./Components/AFrames";
import All from "./Components/All";
import AmazingPools from "./Components/AmazingPools";
import AmazingViews from "./Components/AmazingViews";
import Barns from "./Components/Barns";
import Beach from "./Components/Beach";
import Beachfront from "./Components/Beachfront";
import BedAndBreakfast from "./Components/BedAndBreakfast";
import Boats from "./Components/Boats";
import Cabins from "./Components/Cabins";
import CamperVans from "./Components/CamperVans";
import Camping from "./Components/Camping";
import CasesParticulares from "./Components/CasesParticulares";
import Cave from "./Components/Cave";
import ChefsKitchens from "./Components/ChefsKitchens";
import Containers from "./Components/Containers";
import Countryside from "./Components/Countryside";
import CreativeSpace from "./Components/CreativeSpace";
import CycladicHomes from "./Components/CycladicHomes";
import Dammusi from "./Components/Dammusi";
import Desert from "./Components/Desert";
import Design from "./Components/Design";
import EarthHomes from "./Components/EarthHomes";
import Farmhouses from "./Components/Farmhouses";
import Golfing from "./Components/Golfing";
import GrandPianos from "./Components/GrandPianos";
import Grate from "./Components/Grate";
import Hanoks from "./Components/Hanoks";
import HistoricalHomes from "./Components/HistoricalHomes";
import Houseboats from "./Components/Houseboats";
import Lake from "./Components/Lake";
import NationalParks from "./Components/NationalParks";
import New from "./Components/New";
import OffTheGrid from "./Components/OffTheGrid";
import Play from "./Components/Play";
import Riads from "./Components/Riads";
import Rooms from "./Components/Rooms";
import ShepherdsHuts from "./Components/ShepherdsHuts";
import SkiInOut from "./Components/SkiInOut";
import Surfing from "./Components/Surfing";
import TinyHomes from "./Components/TinyHomes";
import TopCities from "./Components/TopCities";
import TopOfTheWorld from "./Components/TopOfTheWorld";
import Towers from "./Components/Towers";
import Trending from "./Components/Trending";
import Tropical from "./Components/Tropical";
import Trulli from "./Components/Trulli";
import Vineyards from "./Components/Vineyards";
import Windmill from "./Components/Windmill";
import Yurts from "./Components/Yurts";
import Luxe from "./Components/Luxe";
import Mansion from "./Components/Mansion";
import Minsus from "./Components/Minsus";
import Roykans from "./Components/Roykans";
import Skiing from "./Components/Skiing";
import BookigData from "./Components/BookigData";
import ReviewForm from "./Components/ReviewForm";

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

          <Route
            path="/cart/:index"
            element={<CartDetails items={properties} />}
          />

          <Route path="/bookingdata" element={<BookigData/>}/>
          <Route path="/reviws" element={<ReviewForm/>}/>

          {/* Fileter pages */}

          <Route path="/adapted" element={<Adapted/>}/>
          <Route path="/aFrames" element={<AFrames/>}/>
          <Route path="/all" element={<All/>}/>
          <Route path="/amazingPools" element={<AmazingPools/>}/>
          <Route path="/amazingViews" element={<AmazingViews/>}/>
          <Route path="/barns" element={<Barns/>}/>
          <Route path="/beach" element={<Beach/>}/>
          <Route path="/beachfront" element={<Beachfront/>}/>
          <Route path="/bedAndBreakfast" element={<BedAndBreakfast/>}/>
          <Route path="/boats" element={<Boats/>}/>
          <Route path="/cabins" element={<Cabins/>}/>
          <Route path="/camperVans" element={<CamperVans/>}/>
          <Route path="/camping" element={<Camping/>}/>
          <Route path="/casesParticulares" element={<CasesParticulares/>}/>
          <Route path="/cave" element={<Cave/>}/>
          <Route path="/chefsKitchens" element={<ChefsKitchens/>}/>
          <Route path="/containers" element={<Containers/>}/>
          <Route path="/countryside" element={<Countryside/>}/>
          <Route path="/creativeSpace" element={<CreativeSpace/>}/>
          <Route path="/cycladicHomes" element={<CycladicHomes/>}/>
          <Route path="/dammusi" element={<Dammusi/>}/>
          <Route path="/desert" element={<Desert/>}/>
          <Route path="/design" element={<Design/>}/>
          <Route path="/earthHomes" element={<EarthHomes/>}/>
          <Route path="/farmhouses" element={<Farmhouses/>}/>
          <Route path="/golfing" element={<Golfing/>}/>
          <Route path="/grandPianos" element={<GrandPianos/>}/>
          <Route path="/grate" element={<Grate/>}/>
          <Route path="/hanoks" element={<Hanoks/>}/>
          <Route path="/historicalHomes" element={<HistoricalHomes/>}/>
          <Route path="/houseboats" element={<Houseboats/>}/>
          <Route path="/lake" element={<Lake/>}/>
          <Route path="/luxe" element={<Luxe/>}/>
          <Route path="/mansion" element={<Mansion />}/>
          <Route path="/minsus" element={<Minsus/>}/>
          <Route path="/nationalParks" element={<NationalParks/>}/>
          <Route path="/new" element={<New/>}/>
          <Route path="/offTheGrid" element={<OffTheGrid/>}/>
          <Route path="/play" element={<Play/>}/>
          <Route path="/riads" element={<Riads/>}/>
          <Route path="/rooms" element={<Rooms/>}/>
          <Route path="/roykans" element={<Roykans/>}/>
          <Route path="/shepherdsHuts" element={<ShepherdsHuts/>}/>
          <Route path="/skiing" element={<Skiing/>}/>
          <Route path="/skiInOut" element={<SkiInOut/>}/>
          <Route path="/surfing" element={<Surfing/>}/>
          <Route path="/tinyHomes" element={<TinyHomes/>}/>          
          <Route path="/topCities" element={<TopCities/>}/>         
          <Route path="/topOfTheWorld" element={<TopOfTheWorld/>}/>         
          <Route path="/towers" element={<Towers/>}/>         
          <Route path="/trending" element={<Trending/>}/>         
          <Route path="/tropical" element={<Tropical/>}/>         
          <Route path="/trulli" element={<Trulli/>}/>         
          <Route path="/vineyards" element={<Vineyards/>}/>         
          <Route path="/windmill" element={<Windmill/>}/>         
          <Route path="/yurts" element={<Yurts/>}/>         


          




     
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
