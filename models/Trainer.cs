using System.Collections.Generic;

namespace PF_Q2.Models
{
    public class Trainer
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        
        public ICollection<Pokemon> Pokemons { get; set; } = new List<Pokemon>();
    }
}
