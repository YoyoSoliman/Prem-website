import React, { useState, useEffect } from "react";
import axios from "axios";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

const Compare = () => {
    const [players, setPlayers] = useState([]);
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [spiderGraphData, setSpiderGraphData] = useState(null);

    // Fetch player names from the backend
    useEffect(() => {
        axios.get("/api/players").then((response) => {
            setPlayers(response.data);
        });
    }, []);

    // Fetch spider graph data when selected players change
    useEffect(() => {
        if (selectedPlayers.length === 2) {
            axios
                .post("/api/spider-graph", { players: selectedPlayers })
                .then((response) => {
                    setSpiderGraphData(response.data);
                });
        } else {
            setSpiderGraphData(null);
        }
    }, [selectedPlayers]);

    // Handle player selection
    const handlePlayerSelect = (player) => {
        if (selectedPlayers.includes(player)) {
            setSelectedPlayers(selectedPlayers.filter((p) => p !== player));
        } else if (selectedPlayers.length < 2) {
            setSelectedPlayers([...selectedPlayers, player]);
        }
    };

    // Render the component
    return (
        <div>
            <h1>Compare different players</h1>
            <div>
                <h3>Select players:</h3>
                {players.map((player) => (
                    <button
                        key={player}
                        onClick={() => handlePlayerSelect(player)}
                        style={{
                            backgroundColor: selectedPlayers.includes(player)
                                ? "green"
                                : "white",
                        }}
                    >
                        {player}
                    </button>
                ))}
            </div>
            {spiderGraphData && <SpiderGraph data={spiderGraphData} />}
        </div>
    );
};

const SpiderGraph = ({ data }) => {
    const { players, stats } = data;

    return (
        <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={stats}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis />
            {players.map((player, index) => (
                <Radar
                    key={player}
                    name={player}
                    dataKey={`player${index}`}
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                />
            ))}
        </RadarChart>
    );
};

export default Compare;