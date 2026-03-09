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
                <h2 className="pokemon-name">{pokemon.name.toUpperCase()}</h2>
                <div className="pokemon-stats">
                    <div className="stat-pill">
                        <span className="stat-label">ID NO.</span>
                        <span className="stat-value">{pokemon.id.toString().padStart(3, '0')}</span>
                    </div>
                    <div className="stat-pill">
                        <span className="stat-label">HT.</span>
                        <span className="stat-value">{pokemon.height / 10} m</span>
                    </div>
                    <div className="stat-pill">
                        <span className="stat-label">WT.</span>
                        <span className="stat-value">{pokemon.weight / 10} kg</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
