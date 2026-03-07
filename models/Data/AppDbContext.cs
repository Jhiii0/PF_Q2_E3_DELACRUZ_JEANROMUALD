using Microsoft.EntityFrameworkCore;
using PF_Q2.Models;

namespace PF_Q2.Models.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Pokemon> Pokemons { get; set; } = null!;
        public DbSet<Trainer> Trainers { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Seed 1 trainer and some Pokémon based on the frontend expectations, specifically Squirtle since the frontend dropdown shows it
            modelBuilder.Entity<Trainer>().HasData(
                new Trainer { Id = 1, Name = "Jhiz" }
            );

            // Fetch pokemon code expects id, name, height, weight, SpriteFrontDefault (mapped from sprite.frontdefault in JSON)
            modelBuilder.Entity<Pokemon>().HasData(
                new Pokemon { Id = 1, Name = "bulbasaur", Height = 7, Weight = 69, SpriteFrontDefault = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png", Type = "Grass", Level = 5, TrainerId = 1 },
                new Pokemon { Id = 2, Name = "charmander", Height = 6, Weight = 85, SpriteFrontDefault = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png", Type = "Fire", Level = 5, TrainerId = 1 },
                new Pokemon { Id = 3, Name = "squirtle", Height = 5, Weight = 90, SpriteFrontDefault = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png", Type = "Water", Level = 5, TrainerId = 1 },
                new Pokemon { Id = 4, Name = "pikachu", Height = 4, Weight = 60, SpriteFrontDefault = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png", Type = "Electric", Level = 5, TrainerId = 1 },
                new Pokemon { Id = 5, Name = "jigglypuff", Height = 5, Weight = 55, SpriteFrontDefault = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png", Type = "Normal", Level = 5, TrainerId = 1 },
                new Pokemon { Id = 6, Name = "gengar", Height = 15, Weight = 405, SpriteFrontDefault = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png", Type = "Ghost", Level = 5, TrainerId = 1 },
                new Pokemon { Id = 7, Name = "eevee", Height = 3, Weight = 65, SpriteFrontDefault = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png", Type = "Normal", Level = 5, TrainerId = 1 },
                new Pokemon { Id = 8, Name = "snorlax", Height = 21, Weight = 4600, SpriteFrontDefault = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png", Type = "Normal", Level = 5, TrainerId = 1 },
                new Pokemon { Id = 9, Name = "mewtwo", Height = 20, Weight = 1220, SpriteFrontDefault = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png", Type = "Psychic", Level = 5, TrainerId = 1 }
            );

            base.OnModelCreating(modelBuilder);
        }
    }
}
