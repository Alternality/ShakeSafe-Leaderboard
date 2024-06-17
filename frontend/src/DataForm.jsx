import React, { useState, useEffect } from "react";
import axios from "axios";

function Leaderboard() {
    const [selectedMode, setSelectedMode] = useState(null);
    const [leaderboardData, setLeaderboardData] = useState(null);

    useEffect(() => {
        const fetchLeaderboardData = async () => {
            try {
                const response = await axios.get(`/api/leaderboard/${selectedMode}`);
                setLeaderboardData(response.data);
            } catch (error) {
                console.error('Error fetching leaderboard data:', error.message);
            }
        };

        if (selectedMode) {
            fetchLeaderboardData();
        }
    }, [selectedMode]);

    const styles = {
        container: {
            backgroundColor: '#121212',
            color: '#ffffff',
            fontFamily: 'Arial, sans-serif',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            textAlign: 'center'
        },
        heading: {
            fontSize: '2em',
            marginBottom: '10px'
        },
        paragraph: {
            fontSize: '1.2em',
            marginBottom: '20px'
        },
        button: {
            backgroundColor: '#1f1f1f',
            color: '#ffffff',
            border: '2px solid #ffffff',
            padding: '10px 20px',
            borderRadius: '5px',
            fontSize: '1em',
            cursor: 'pointer',
            transition: 'background-color 0.3s, color 0.3s',
            margin: '10px'
        },
        buttonHover: {
            backgroundColor: '#ffffff',
            color: '#000000'
        },
        leaderboard: {
            marginTop: '20px',
            textAlign: 'left'
        },
        leaderboardItem: {
            padding: '10px',
            borderBottom: '1px solid #444'
        }
    };

    const handleModeSelect = (mode) => {
        setSelectedMode(mode);
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Game Modes</h2>
            <button
                style={styles.button}
                onMouseOver={e => e.target.style = styles.buttonHover}
                onMouseOut={e => e.target.style = styles.button}
                onClick={() => handleModeSelect('survival')}
            >
                Survival
            </button>
            <button
                style={styles.button}
                onMouseOver={e => e.target.style = styles.buttonHover}
                onMouseOut={e => e.target.style = styles.button}
                onClick={() => handleModeSelect('timeAttack')}
            >
                Time Attack
            </button>
            {selectedMode && leaderboardData && (
                <div style={styles.leaderboard}>
                    <h3 style={styles.heading}>{selectedMode === 'survival' ? 'Survival Leaderboard' : 'Time Attack Leaderboard'}</h3>
                    {leaderboardData.map((entry, index) => (
                        <div key={index} style={styles.leaderboardItem}>
                            {index + 1}. {entry.user} - {entry.score}
                        </div>
                    ))}
                </div>
            )}
            <button
                style={styles.button}
                onMouseOver={e => e.target.style = styles.buttonHover}
                onMouseOut={e => e.target.style = styles.button}
                onClick={() => window.location.href = 'https://docs.google.com/forms/d/e/your_form_id/viewform'}
            >
                Take Quiz
            </button>
        </div>
    );
}

export default Leaderboard;
