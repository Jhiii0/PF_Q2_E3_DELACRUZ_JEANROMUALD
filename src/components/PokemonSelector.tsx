import React from 'react';

interface PokemonSelectorProps {
    onSelect: (pokemonName: string) => void;
}

const POKEMON_OPTIONS = [
    'bulbasaur',
    'charmander',
    'squirtle',
    'pikachu',
    'jigglypuff',
    'gengar',
    'eevee',
    'snorlax',
    'mewtwo'
];

export const PokemonSelector: React.FC<PokemonSelectorProps> = ({ onSelect }) => {
    return (
        <div className="pokemon-selector">
            <label htmlFor="pokemon-select">Choose a Pokémon: </label>
            <select
                id="pokemon-select"
                onChange={(e) => onSelect(e.target.value)}
                defaultValue=""
            >
                <option value="" disabled>Select a Pokémon</option>
                {POKEMON_OPTIONS.map((name) => (
                    <option key={name} value={name}>
                        {name.charAt(0).toUpperCase() + name.slice(1)}
                    </option>
                ))}
            </select>
        </div>
    );
};
