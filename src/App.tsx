import { useState } from 'react';
import { PokemonCard } from './components/PokemonCard';
import { PokemonSelector } from './components/PokemonSelector';
import { Login } from './components/Login';
import type { Pokemon } from './types';
import './App.css';

function App() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [trainerName, setTrainerName] = useState<string | null>(null);

  const handleSelect = (name: string) => {
    setLoading(true);
    setError(null);

    fetch(`http://localhost:5000/pokemon/${name}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: any) => {
        const cleanPokemon: Pokemon = {
          id: data.id,
          name: data.name,
          height: data.height,
          weight: data.weight,
          imageUrl: data['sprite.frontdefault'],
        };
        setPokemon(cleanPokemon);
      })
      .catch((err) => {
        console.error("Failed to fetch pokemon:", err);
        setError("Failed to fetch pokemon data.");
        setPokemon(null);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (!trainerName) {
    return (
      <div className="app-container">
        <header className="app-header">
           <h1 className="title">
            <span className="title-highlight">Poké</span>DB
          </h1>
        </header>
        <Login onLogin={setTrainerName} />
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="title">
          <span className="title-highlight">Welcome, </span>{trainerName}!
        </h1>
        <p className="subtitle">Manage and discover amazing Pokémon stats!</p>
        <button className="logout-button" onClick={() => setTrainerName(null)}>Logout</button>
      </header>

      <main className="app-main">
        <PokemonSelector onSelect={handleSelect} />

        {loading && <p className="loading-text">Loading...</p>}
        {error && <p className="error-text">{error}</p>}

        {!loading && !error && pokemon && (
          <PokemonCard pokemon={pokemon} />
        )}
      </main>

      <footer className="app-footer">
        <p>Built with Typescript & React Props mapped to .NET Minimal API</p>
      </footer>
    </div>
  );
}

export default App;
