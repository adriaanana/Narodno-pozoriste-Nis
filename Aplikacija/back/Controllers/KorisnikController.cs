using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Models;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;

namespace proba1.Controllers
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

                byte[] salt = new byte[128 / 8];
                using (var rngCsp = new RNGCryptoServiceProvider())
                {
                    rngCsp.GetNonZeroBytes(salt);
                }
                string saltStr = Encoding.Default.GetString(salt);
                salt = Encoding.ASCII.GetBytes(saltStr);

                string hashedLozinka = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                    password: lozinka,
                    salt: salt,
                    prf: KeyDerivationPrf.HMACSHA256,
                    iterationCount: 100000,
                    numBytesRequested: 256 / 8)
                );
                var korisnik= new Korisnik();
                korisnik.Ime=Ime;
                korisnik.Prezime=Prezime;
                korisnik.KorisnickoIme=korisnickoIme;
                korisnik.Lozinka=hashedLozinka;
                korisnik.SALT = saltStr;
                korisnik.Aplikacija= ap;

                Context.Korisnici.Add(korisnik);
                await Context.SaveChangesAsync();
                return Ok(korisnik);
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
                byte[] salt = new byte[128 / 8];
                using (var rngCsp = new RNGCryptoServiceProvider())
                {
                    rngCsp.GetNonZeroBytes(salt);
                }
                string saltStr = Encoding.Default.GetString(salt);
                salt = Encoding.ASCII.GetBytes(saltStr);

                string hashedLozinka = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                    password: lozinka,
                    salt: salt,
                    prf: KeyDerivationPrf.HMACSHA256,
                    iterationCount: 100000,
                    numBytesRequested: 256 / 8)
                );
                var korisnik = Context.Korisnici.Where(k => k.KorisnickoIme == korisnickoIme).FirstOrDefault();
                if (korisnik != null)
                {
                    korisnik.Lozinka= hashedLozinka;
                    korisnik.SALT = saltStr;
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
                
                var slt = k.SALT;

                byte[] salt = new byte[128 / 8];
                salt = Encoding.ASCII.GetBytes(slt);
                string hashedLozinka = Convert.ToBase64String(KeyDerivation.Pbkdf2(

                    password: lozinka,

                    salt: salt,

                    prf: KeyDerivationPrf.HMACSHA256,

                    iterationCount: 100000,

                    numBytesRequested: 256 / 8)
                    

                );
                if (k.Lozinka!= hashedLozinka)
                {
                    return BadRequest("Uneta je pogresna lozinka! ");
                }


                var korisnikPravi = await Context.Korisnici.Where(p => p.KorisnickoIme == korisnickoIme && p.Lozinka == hashedLozinka).FirstOrDefaultAsync();

                if (korisnikPravi.KorisnickoIme == "admin1")
                {
                    var claims = new List<Claim>
                    {
                        new Claim(ClaimTypes.Name,korisnikPravi.KorisnickoIme),
                        new Claim(ClaimTypes.Role,"Admin")
                    };
                    var identity = new ClaimsIdentity(claims, "KorisnikAuth");
                    ClaimsPrincipal claimsPrincipal = new ClaimsPrincipal(identity);
                    await HttpContext.SignInAsync("KorisnikAuth", claimsPrincipal);

                    return Ok(korisnikPravi);
                   
                }
                else 
                {
                    var claims = new List<Claim>
                    {
                        new Claim(ClaimTypes.Name,korisnikPravi.KorisnickoIme),
                        new Claim(ClaimTypes.Role,"Korisnik")
                    };
                    var identity = new ClaimsIdentity(claims, "KorisnikAuth");
                    ClaimsPrincipal claimsPrincipal = new ClaimsPrincipal(identity);
                    await HttpContext.SignInAsync("KorisnikAuth", claimsPrincipal);

                    return Ok(korisnikPravi);
                }
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