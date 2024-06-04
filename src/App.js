//Yehia Soliman
//5.1.2024
// This is the hub of all the pages and routest them together


import React from "react";
import "./App.css";
import Navbar from "./components";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./pages/Home";
import Compare from "./pages/compare-players";
import Graphs from "./pages/graphs";
import PlayerSearch from "./pages/player-search";
import PlayerStats from "./pages/player-stats";

function App() {//sets up all the pages by routing them 
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Home" element={<Home />} />
                <Route
                    path="/compare-players"
                    element={<Compare />}
                />
                <Route
                    path="/graphs"
                    element={<Graphs />}
                />
                <Route
                    path="/player-search"
                    element={<PlayerSearch />}
                />
                <Route
                    path = "/player-stats"
                    element={<PlayerStats />}
                    />
            </Routes>
        </Router>
    );
}

export default App;