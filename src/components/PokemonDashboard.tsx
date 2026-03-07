import React, { useEffect, useState } from 'react';
import './PokemonDashboard.css';

interface Trainer {
  id: number;
  name: string;
}

interface LocalPokemon {
  id: number;
  name: string;
  type: string;
  level: number;
  trainerId: number;
  trainer: Trainer | null;
}

export const PokemonDashboard: React.FC = () => {
  const [pokemons, setPokemons] = useState<LocalPokemon[]>([]);
  const [searchId, setSearchId] = useState('');
  const [searchedPokemon, setSearchedPokemon] = useState<LocalPokemon | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = async () => {
    try {
      setError(null);
      const res = await fetch('http://localhost:5000/pokemon');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setPokemons(data);
      setSearchedPokemon(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId) return fetchAll();
    
    try {
      setError(null);
      const res = await fetch(`http://localhost:5000/pokemon/${searchId}`);
      if (!res.ok) throw new Error('Pokemon not found');
      const data = await res.json();
      setSearchedPokemon(data);
    } catch (err: any) {
      setError(err.message);
      setSearchedPokemon(null);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="dashboard">
      <h2>Database Explorer</h2>
      
      <form onSubmit={handleSearch} className="search-form">
        <input 
          type="number" 
          placeholder="Search by ID..." 
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
        <button type="button" onClick={fetchAll} className="clear-button">Clear</button>
      </form>

      {error && <p className="error">{error}</p>}

      {searchedPokemon ? (
        <div className="pokemon-grid">
           <PokemonCard data={searchedPokemon} />
        </div>
      ) : (
        <div className="pokemon-grid">
          {pokemons.map(p => (
            <PokemonCard key={p.id} data={p} />
          ))}
        </div>
      )}
    </div>
  );
};

const PokemonCard: React.FC<{data: LocalPokemon}> = ({ data }) => (
  <div className="poke-card">
    <div className="poke-header">
      <span className="poke-id">#{data.id}</span>
      <h3>{data.name}</h3>
    </div>
    <div className="poke-body">
      <p><strong>Type:</strong> {data.type}</p>
      <p><strong>Level:</strong> {data.level}</p>
      <p><strong>Trainer:</strong> {data.trainer?.name || 'Unknown'}</p>
    </div>
  </div>
);
