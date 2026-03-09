using Microsoft.EntityFrameworkCore;
using PF_Q2.Models.Data;
using PF_Q2.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Always use CORS for development with Vite on default port 5173
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Configure SQLite DbContext
var dbPath = Path.Join(Directory.GetCurrentDirectory(), "models", "Data", "Pokemon.db");
// Ensure Data directory exists
Directory.CreateDirectory(Path.GetDirectoryName(dbPath)!);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite($"Data Source={dbPath}"));

var app = builder.Build();

app.UseCors("AllowAll");

// Create and seed the database on startup
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    
    // Ensure the database is created
    dbContext.Database.EnsureCreated();

    // Manually create the Pokemons table if it doesn't exist
    var createTableSql = @"
        CREATE TABLE IF NOT EXISTS Pokemons (
            Id INTEGER PRIMARY KEY AUTOINCREMENT,
            Name TEXT NOT NULL,
            Height INTEGER NOT NULL,
            Weight INTEGER NOT NULL,
            SpriteFrontDefault TEXT
        );";
    dbContext.Database.ExecuteSqlRaw(createTableSql);

    // Check if table is empty and seed if necessary
    var count = dbContext.Database.SqlQueryRaw<int>("SELECT COUNT(*) FROM Pokemons").ToList().FirstOrDefault();
    if (count == 0)
    {
        var seedSql = @"
            INSERT INTO Pokemons (Name, Height, Weight, SpriteFrontDefault) VALUES 
            ('bulbasaur', 7, 69, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'),
            ('charmander', 6, 85, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png'),
            ('squirtle', 5, 90, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png'),
            ('pikachu', 4, 60, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'),
            ('jigglypuff', 5, 55, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png'),
            ('gengar', 15, 405, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png'),
            ('eevee', 3, 65, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png'),
            ('snorlax', 21, 4600, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png'),
            ('mewtwo', 20, 1220, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png');";
        dbContext.Database.ExecuteSqlRaw(seedSql);
    }
}

app.MapControllers();

app.Run();
