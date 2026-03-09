import { useState, useRef, useEffect } from 'react';
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
  const [bgmEnabled, setBgmEnabled] = useState(false);
  const bgmRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize BGM with working Littleroot Town Theme
    bgmRef.current = new Audio('https://raw.githubusercontent.com/Arunanshu-Bhattacharya/Pokemon-Game/master/assets/audio/littleroot_town_theme.mp3');
    bgmRef.current.loop = true;
    bgmRef.current.volume = 0.2;

    return () => {
      if (bgmRef.current) {
        bgmRef.current.pause();
        bgmRef.current = null;
      }
    };
  }, []);

  const toggleBGM = () => {
    if (bgmRef.current) {
      if (bgmEnabled) {
        bgmRef.current.pause();
      } else {
        bgmRef.current.play().catch(e => console.log('BGM blocked:', e));
      }
      setBgmEnabled(!bgmEnabled);
      playSelectSound();
    }
  };

  const playSelectSound = () => {
    // Authentic Emerald "Crisp" Digital Click (Verified working)
    const audio = new Audio('https://www.myinstants.com/media/sounds/pokemon-a-button.mp3');
    audio.volume = 0.6;
    audio.play().catch(e => console.log('Sound blocked by browser policy:', e));
  };

  const playCursorSound = () => {
    // Authentic Emerald "Move/Cursor" sound (using verified click for consistent feel)
    const audio = new Audio('https://www.myinstants.com/media/sounds/pokemon-a-button.mp3');
    audio.volume = 0.5;
    audio.play().catch(e => console.log('Sound blocked by browser policy:', e));
  };

  const playCancelSound = () => {
    // Authentic Emerald "Cancel" sound (using verified click or back sound)
    const audio = new Audio('https://www.myinstants.com/media/sounds/pokemon-a-button.mp3');
    audio.volume = 0.5;
    audio.play().catch(e => console.log('Sound blocked by browser policy:', e));
  };

  const playHealSound = () => {
    // Pokémon Center healing fanfare for login
    const audio = new Audio('https://www.myinstants.com/media/sounds/pokemon-healing-sound-effect.mp3');
    audio.volume = 0.4;
    audio.play().catch(e => console.log('Sound blocked by browser policy:', e));
  };

  const handleSelect = (name: string) => {
    setLoading(true);
    setError(null);
    playSelectSound();

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
        // Removed playPokemonCry - now manual only
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

  const handleLogin = (name: string) => {
    setTrainerName(name);
    playHealSound();
  };

  const handleLogout = () => {
    setTrainerName(null);
    playCancelSound();
  };

  if (!trainerName) {
    return (
      <div className="app-container">
        <header className="app-header">
          <h1 className="title">
            <span className="title-highlight">EMERALD</span>DB
          </h1>
          <p className="subtitle">ACCESS GRANTED TO REGIONAL DATA</p>
        </header>
        <Login onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="title">
          <span className="title-highlight">WELCOME, </span>{trainerName.toUpperCase()}!
        </h1>
        <p className="subtitle">POKEMON EMERALD SUMMARY SYSTEM v1.0</p>
        <div className="header-controls">
          <button className="bgm-toggle" onClick={toggleBGM}>
            {bgmEnabled ? 'MUSIC: ON' : 'MUSIC: OFF'}
          </button>
          <button className="logout-button" onClick={handleLogout}>Log Out</button>
        </div>
      </header>

      <main className="app-main">
        <PokemonSelector
          onSelect={handleSelect}
          onHover={playCursorSound}
        />

        {loading && <p className="loading-text">COMMUNICATING WITH PC...</p>}
        {error && <p className="error-text">ERROR: {error.toUpperCase()}</p>}

        {!loading && !error && pokemon && (
          <PokemonCard
            pokemon={pokemon}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>REPLICA GBA INTERFACE - PROJECT EMERALD</p>
      </footer>
    </div>
  );
}

export default App;
