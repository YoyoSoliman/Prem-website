import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PlayerSearch = () => {
    const [players, setPlayers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        // Fetch the player names from the backend API
        fetch('/api/players')
            .then(response => response.json())
            .then(data => setPlayers(data))
            .catch(error => console.error('Error fetching player names:', error));
    }, []);

    // Filter players based on search query
    const filteredPlayers = players.filter(player =>
        player.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100vh",
            padding: "20px",
            boxSizing: "border-box"
        }}>
            <h1>Search for Players</h1>
            
            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                    padding: "10px",
                    fontSize: "16px",
                    width: "300px",
                    marginBottom: "20px"
                }}
            />
            <ul style={{
                listStyleType: "none",
                padding: 0,
                width: "300px"
            }}>
                {filteredPlayers.length > 0 ? (
                    filteredPlayers.map((player, index) => (
                        <li key={index} style={{
                            padding: "10px",
                            borderBottom: "1px solid #ddd"
                        }}>
                            {/* Pass playerName as a prop to PlayerStats component */}
                            <Link to={{ pathname: "/player-stats", state: { playerName: player } }} style={{ textDecoration: 'none', color: 'inherit' }}>
                                {player}
                            </Link>
                        </li>
                    ))
                ) : (
                    <li style={{ padding: "10px", textAlign: "center" }}>No players found</li>
                )}
            </ul>
        </div>
    );
};

export default PlayerSearch;
