import React from 'react';
import type { Pokemon } from '../types';

interface Props {
    pokemon: Pokemon;
}

export const PokemonCard: React.FC<Props> = ({ pokemon }) => {
    return (
        <div className="pokemon-card">
            <div className="pokemon-image-container">
                <img className="pokemon-image" src={pokemon.imageUrl} alt={pokemon.name} />
            </div>
            <div className="pokemon-info">
                <h2 className="pokemon-name">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
                <div className="pokemon-stats">
                    <div className="stat-pill">
                        <span className="stat-label">ID #</span>
                        <span className="stat-value">{pokemon.id}</span>
                    </div>
                    <div className="stat-pill">
                        <span className="stat-label">Height</span>
                        <span className="stat-value">{pokemon.height}</span>
                    </div>
                    <div className="stat-pill">
                        <span className="stat-label">Weight</span>
                        <span className="stat-value">{pokemon.weight}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
