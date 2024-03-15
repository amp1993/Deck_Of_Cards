import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from "./Card";

const BASE_URL = "https://deckofcardsapi.com/api/deck/";


const Deck = () => {
    const [deck, setDeck] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}new/draw/?count=1`);
                setDeck(response.data);
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);



    const drawCard = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/${deck.deck_id}/draw/?count=5`);
            setDeck(response.data);
            console.log(`${response.data.remaining}, ${response.data.deck_id}`);
           
        } catch (e) {
            console.log(e);
        }
    };
    
    const shuffleCard = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/${deck.deck_id}/shuffle`);
            setDeck(deck); // Update deck to trigger re-render
            console.log(response.data)
                drawCard(); // Draw new cards if the deck ID hasn't changed
            
        } catch (e) {
            console.log(e);
        }
    }


    return (
        <div>
            {deck ? 
            <>
            { deck && deck.remaining === 0 ?    
                <p className="error-message">Error: no cards remaining!</p> : 
                <>
                <Card deck={deck} />
                 <button onClick={drawCard} className="draw-card-button">Draw Card</button>
                </>
                }
            <button onClick={shuffleCard} className="shuffle-cards">Shuffle Cards</button>
            </>
            : <i className="loading">loading...</i>}
        </div>
    );
};

export default Deck;
