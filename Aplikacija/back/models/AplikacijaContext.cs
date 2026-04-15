using Microsoft.EntityFrameworkCore;

namespace Models
{

    public class AplikacijaContext : DbContext
    {

        public DbSet<Korisnik> Korisnici { get; set; }
        public DbSet<Aplikacija> Aplikacije { get; set; }
        public DbSet<Pozoriste> Pozorista { get; set; }
        public DbSet<Rezervacija> Rezervacije { get; set; }
        public DbSet<Sediste> Sedista { get; set; }
        public DbSet<Umetnik> Umetnici {get; set;}
        public DbSet<Predstava> Predstave {get; set;}
        public DbSet<Slika> Slike {get; set;}
                public AplikacijaContext(DbContextOptions options) : base(options)
        {

        }

    }
}