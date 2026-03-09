using Microsoft.EntityFrameworkCore;

namespace PF_Q2.Models.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    }
}
