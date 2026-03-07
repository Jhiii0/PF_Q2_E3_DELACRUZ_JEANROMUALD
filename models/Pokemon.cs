using System.Text.Json.Serialization;

namespace PF_Q2.Models
{
    public class Pokemon
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Height { get; set; }
        public int Weight { get; set; }

        [JsonPropertyName("sprite.frontdefault")]
        public string? SpriteFrontDefault { get; set; }
        
        [JsonIgnore]
        public string Type { get; set; } = string.Empty;
        
        [JsonIgnore]
        public int Level { get; set; }
        
        // Foreign Key
        [JsonIgnore]
        public int TrainerId { get; set; }
        
        [JsonIgnore]
        public Trainer? Trainer { get; set; }
    }
}
