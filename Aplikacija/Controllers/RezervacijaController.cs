using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Models;

namespace proba1Adriana.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RezervacijaController : ControllerBase
    {
        public AplikacijaContext Context { get; set; }
        public RezervacijaController(AplikacijaContext context)
        {
            Context = context;
        }
        [Route("PreuzmiRezervacije")]
        [HttpGet]
        public async Task<ActionResult> preuzmiRezervacije()
        {
            return Ok(Context.Rezervacije);
        }

        [Route("DodatiRezervaciju/{idSedista}/{idPredstave}/{idKorisnika}")]
        [HttpPost]
        public async Task<ActionResult> DodatiRezervaciju(int idSedista, int  idPredstave, int idKorisnika)
        {
            var result = Context.Rezervacije
                    .Include(p => p.Predstava)
                    .Include(p => p.Sediste)
                    .Include(p=>p.Korisnik);
            var predstava = await Context.Predstave.Where(p => p.ID == idPredstave).FirstOrDefaultAsync();
            var sediste2 = await Context.Sedista.Where(p => p.ID == idSedista).FirstOrDefaultAsync();
            var sediste = await Context.Sedista.Where(p => p.ID == idSedista).ToListAsync();
            var korisnik = await Context.Korisnici.Where(p => p.ID == idKorisnika).FirstOrDefaultAsync();
            try
            {
                
                sediste2.Zauzeto = true;
                var rezervacija= new Rezervacija();
                rezervacija.Predstava = predstava;
                rezervacija.Sediste = sediste;
                rezervacija.Korisnik = korisnik;
                sediste2.Rezervacija=rezervacija;

                Context.Rezervacije.Add(rezervacija);
                await Context.SaveChangesAsync();
                return Ok($"Rezervacija je dodata!");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("PreuzmiRezervacijuKorinsika{id}")]
        [HttpGet]
        public async Task<ActionResult>  PreuzmiRezervacijuKorinsika(int id)
        {
            var result = Context.Rezervacije
                    .Include(p => p.Predstava)
                    .Include(p => p.Sediste)
                    .Include(p=>p.Korisnik);

            var korisnik = await result.Where(p => p.Korisnik.ID == id).ToListAsync();
            try 
            {
                    return Ok
                    (
                          korisnik.Select(p =>
                        new{
                            Predstava = new{
                                naziv = p.Predstava.Naziv,
                                datum = p.Predstava.Datum,
                                cena = p.Predstava.Cena
                            },
                            Sediste = p.Sediste.Select(q =>
                            new{
                                broj = q.Broj,
                                red = q.Red
                            })
                        }).ToList()
                    );
            }
        
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        
        [Route("IzbrisatiRezervaciju/{id}")]
        [HttpDelete]
        public async Task<ActionResult> IzbrisiRezervaciju(int id)
        {
            
            try
            {
                var rezervacija = await Context.Rezervacije.FindAsync(id);
                var sediste = await Context.Sedista
                    .Include(p=>p.Rezervacija)
                    .Where(p => p.Rezervacija.ID == id).ToListAsync();
                foreach(var s in sediste)
                {
                    s.Rezervacija=null;
                    s.Zauzeto=false;
                }
                Context.Rezervacije.Remove(rezervacija);
                await Context.SaveChangesAsync();
                return Ok("Uspesno izbrisana rezervacija");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}