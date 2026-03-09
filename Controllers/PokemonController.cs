using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PF_Q2.Models;
using PF_Q2.Models.Data;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System.Runtime.CompilerServices;

namespace PF_Q2.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PokemonController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PokemonController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PokemonProjectionModel>>> GetPokemons()
        {
            var sql = "SELECT Id, Name, Height, Weight, SpriteFrontDefault FROM Pokemons ORDER BY Id";
            
            var result = await _context.Database
                .SqlQueryRaw<PokemonProjectionModel>(sql)
                .ToListAsync();
                
            return Ok(result);
        }

        [HttpGet("{idOrName}")]
        public async Task<ActionResult<PokemonProjectionModel>> GetPokemon(string idOrName)
        {
            string sql;
            List<PokemonProjectionModel> result;

            // Try to parse the input as an integer ID
            if (int.TryParse(idOrName, out int id))
            {
                sql = "SELECT Id, Name, Height, Weight, SpriteFrontDefault FROM Pokemons WHERE Id = {0}";
                result = await _context.Database
                    .SqlQuery<PokemonProjectionModel>(FormattableStringFactory.Create(sql, id))
                    .ToListAsync();
            }
            else
            {
                // Otherwise search by Name (case-insensitive)
                sql = "SELECT Id, Name, Height, Weight, SpriteFrontDefault FROM Pokemons WHERE LOWER(Name) = LOWER({0})";
                result = await _context.Database
                    .SqlQuery<PokemonProjectionModel>(FormattableStringFactory.Create(sql, idOrName))
                    .ToListAsync();
            }

            var pokemon = result.FirstOrDefault();

            if (pokemon == null)
            {
                return NotFound();
            }

            return pokemon;
        }
    }
}
