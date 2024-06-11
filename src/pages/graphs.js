import React, { useEffect, useState } from "react";

const Graphs = () => {
    const [graphs, setGraphs] = useState([]);

    useEffect(() => {
        const fetchGraphs = async () => {
            // List of graph configurations you want to fetch
            const graphConfigs = [
                { x: "xAG", y: "xG" },
                { x: "Starts", y: "G+A" },
                { x: "xG", y: "Gls" },
                { x: "Starts", y: "Gls" }
            ];

            const graphPromises = graphConfigs.map(async (config) => {
                const response = await fetch(`/api/plot/${config.x}/${config.y}`);
                const blob = await response.blob();
                return {
                    ...config,
                    url: URL.createObjectURL(blob)
                };
            });

            const graphs = await Promise.all(graphPromises);
            setGraphs(graphs);
        };

        fetchGraphs();
    }, []);

    return (
        <div style={{ textAlign: "center" }}>
            <h1>Graphs</h1>
            {graphs.map((graph, index) => (
                <div key={index} style={{ marginBottom: "20px" }}>
                    <h2>{`${graph.x} vs ${graph.y}`}</h2>
                    <img src={graph.url} alt={`${graph.x} vs ${graph.y}`} style={{ width: "80%", height: "auto" }} />
                </div>
            ))}
        </div>
    );
};

export default Graphs;
