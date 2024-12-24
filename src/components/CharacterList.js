import axios from "axios";
import { useState, useEffect } from "react";

const CharacterList = () => {
  const [character, setCharacter] = useState([]);
  const [loading, setLoading] = useState(true); //track loading state
  const [error, setError] = useState(null); //handle errors

  // Fetch data from the /character endpoint using Axios
  const fetchCharacterData = async () => {
    try {
      const response = await axios.get(
        "https://rickandmortyapi.com/api/character"
      );
      const characterData = response.data.results; // Assuming we want the 'results' array
      setCharacter(characterData); // Update the 'character' state with fetched data
      setLoading(false); // Set loading state to false after successful fetch. Process is done.
    } catch (error) {
      console.error("Error fetching character data:", error);
      setError("Failed to load character data");
      setLoading(false); // Set loading state to false after failed fetch
    }
  };

  useEffect(() => {
    fetchCharacterData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {character.map((char) => (
        <div key={char.id}>
          <h2>Character name: {char.name}</h2>
          <img src={char.image} alt={char.name} />
          <p>Status: {char.status}</p>
        </div>
      ))}
    </div>
  );
};

export default CharacterList;
