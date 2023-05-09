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
    public class KorisnikController : ControllerBase
    {
        public AplikacijaContext Context { get; set; }
        public KorisnikController(AplikacijaContext context)
        {
            Context = context;
        }
        [Route("PreuzmiKorisnika{idKorisnika}")]
        [HttpGet]
         public async Task<ActionResult> PreuzmiKorisnika(int idKorisnika)
         {
             try 
                {
                
                var k = await Context.Korisnici.Where(acc=>acc.ID== idKorisnika).FirstOrDefaultAsync();
                if (k==null)
                {
                    return BadRequest("Greska! ");
                }
                return Ok(new
                {
                    k.Ime,
                    k.Prezime,
                    k.KorisnickoIme
                
                });
               
                }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
         }

        [Route("RegistrujSe/{Ime}/{Prezime}/{korisnickoIme}/{lozinka}/{idAplikacije}")]
        [HttpPost]
        public async Task<ActionResult> RegistrujSe(string Ime, string Prezime, string korisnickoIme,string lozinka, int idAplikacije)
        {
            
            if(String.IsNullOrEmpty(Ime))
            {
                return BadRequest("Ime je obavezno");
            }
            if(String.IsNullOrEmpty(Prezime))
            {
                return BadRequest("Prezime je obavezno");
            }
             if(String.IsNullOrEmpty(korisnickoIme))
            {
                return BadRequest("Korisnicko ime je obavezno");
            }
            if(String.IsNullOrEmpty(lozinka))
            {
                return BadRequest("Lozinka je obavezna");
            }
            if (lozinka.Length<5)
            {
                return BadRequest("Sifra mora imati minimum 5 karaktera! ");
            }

            try
            {
                var ap=Context.Aplikacije.Where(p=> p.ID==idAplikacije).FirstOrDefault();
                if (ap==null)
                return BadRequest("Nema aplikacije");
                var num=Context.Korisnici.Where(k=>k.KorisnickoIme==korisnickoIme).Count();
                if (num>0)
                {
                    return BadRequest("Korisnik sa datim korisnickim imenom vec postoji! ");
                }
                var korisnik= new Korisnik();
                korisnik.Ime=Ime;
                korisnik.Prezime=Prezime;
                korisnik.KorisnickoIme=korisnickoIme;
                korisnik.Lozinka=lozinka;
                korisnik.Aplikacija= ap;

                Context.Korisnici.Add(korisnik);
                await Context.SaveChangesAsync();
                return Ok($"Korisnik je dodat!");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("AzuriranjeNaloga/{korisnickoIme}/{lozinka}")]
        [HttpPut]
        public async Task<ActionResult> AzuriranjeNaloga(string korisnickoIme, string lozinka )
        {
            if (lozinka.Length<5)
            {
                return BadRequest("Sifra mora imati minimum 5 karaktera!");
            }
            try
            {
                var korisnik = Context.Korisnici.Where(k => k.KorisnickoIme == korisnickoIme).FirstOrDefault();
                if (korisnik != null)
                {
                    korisnik.Lozinka= lozinka;
                    await Context.SaveChangesAsync();
                    return Ok($"Uspesno azuriran  nalog!");
                }
                else
                {
                    return BadRequest("Korisnik  nije pronadjen!");
                }
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("UlogujSe/{korisnickoIme}/{lozinka}")]
        [HttpGet]
        public async Task<ActionResult> UlogujSe (string korisnickoIme,string lozinka)
        {
            if(String.IsNullOrEmpty(korisnickoIme))
            {
                return BadRequest("Unesite korisnicko ime! ");
            }
            if (String.IsNullOrEmpty(lozinka))
            {
                return BadRequest("Unesite lozinku! ");
            }
            try 
            {
                var k = await Context.Korisnici.Where(acc=>acc.KorisnickoIme== korisnickoIme).FirstOrDefaultAsync();
                if (k==null)
                {
                    return BadRequest("Korisnik ne postoji! ");
                }
                if (k.Lozinka!= lozinka)
                {
                    return BadRequest("Uneta je pogresna lozinka! ");
                }
                return Ok(k);
               
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        /*[Route("PreuzmiRezervacijuKorinsika{id}")]
        [HttpGet]
        public async Task<ActionResult>  PreuzmiRezervacijuKorinsika(int id)
        {
            var result = Context.Korisnici
                    .Include(p => p.Rezervacija)
                    .ThenInclude(p => p.Predstava)
                    .Include(p => p.Rezervacija)
                    .ThenInclude(p => p.Sediste);

            var korisnik = await result.Where(p => p.ID == id).ToListAsync();
            try 
            {
                    return Ok
                    (
                        await korisnik.Select(p =>
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
                        }).ToListAsync
                    );
                    var result = await Context.Korisnici
                     .Where(p => p.ID == id)
                    .Select(p => new {
                    Rezervacija = p.Rezervacija.Select(s => new {
                        Predstava = s.Predstava.Select(a => new { a.Naziv, a.Datum, a.Cena})
                     })
                    }).ToListAsync();
                    
                    .Select(p => new {
                        p.Red,
                        p.Broj,


                     })
                     .Include(p => p.Rezervacija)
                     .ThenInclude(p => p.Predstava)
                     .Select(p => new {
                        p.Naziv,
                        p.Datum,
                        p.Cena
                        Sediste = p.Sediste.Select(s => new { s.Red, s.Broj })

                     }).ToListAsync();

                     .Include(p => p.Rezervacija)
                     .ThenInclude(p => p.Predstava)
                     .Select(p => new { 
                        p.Naziv,
                        p.Datum,
                        p.Cena,
                    //Rezervacija = p.Rezervacija.Select(s => new { s.Sediste, s.Predstava })
                    }).ToListAsync();

                //return Ok(result);
            }
            catch(Exception e)
            {
                 return BadRequest(e.Message);
            }
                    
        }
*/
        
        
    }
}