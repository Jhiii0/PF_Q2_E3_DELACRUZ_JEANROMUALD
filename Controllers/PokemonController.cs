using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PF_Q2.Models;
using PF_Q2.Models.Data;
using System.Collections.Generic;
using System.Threading.Tasks;

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
        public async Task<ActionResult<IEnumerable<Pokemon>>> GetPokemons()
        {
            return await _context.Pokemons.Include(p => p.Trainer).OrderBy(p => p.Id).ToListAsync();
        }

        [HttpGet("{idOrName}")]
        public async Task<ActionResult<Pokemon>> GetPokemon(string idOrName)
        {
            Pokemon? pokemon;
            
            // Try to parse the input as an integer ID
            if (int.TryParse(idOrName, out int id))
            {
                pokemon = await _context.Pokemons.Include(p => p.Trainer).FirstOrDefaultAsync(p => p.Id == id);
            }
            else
            {
                // Otherwise search by Name (case-insensitive)
                pokemon = await _context.Pokemons.Include(p => p.Trainer).FirstOrDefaultAsync(p => p.Name.ToLower() == idOrName.ToLower());
            }

            if (pokemon == null)
            {
                return NotFound();
            }

            return pokemon;
        }
    }
}
