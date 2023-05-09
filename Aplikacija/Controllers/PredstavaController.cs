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
    public class PredstavaController : ControllerBase
    {
        public AplikacijaContext Context { get; set; }
        public PredstavaController(AplikacijaContext context)
        {
            Context = context;
        } 
        
        
        
        [Route("PreuzmiSlike{id}")]
        [HttpGet]
        public async Task<ActionResult>  PreuzmiSlike(int id)
        {
            try 
            {
                    var result = await Context.Predstave
                     .Where(p => p.ID == id)
                    .Select(p => new {
                    Slike = p.Slike.Select(s => new {s.Naziv })
                    }).ToListAsync();

                return Ok(result);
            }
            catch(Exception e)
            {
                 return BadRequest(e.Message);
            }
                    
        }
        [Route("Repertoar")]
        [HttpGet]
        public async Task<ActionResult>  Repertoar()
        {
            
            try 
            {
                var result = await Context.Predstave
                 .Select(p => new {
                
                    p.Naziv,
                    p.Datum,
                    p.Slika,
                    p.Zanr,
                }) .ToListAsync();
                
                return Ok(result);
            }
   
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("RezervacijaNazivDatum{id}")]
        [HttpGet]
        public async Task<ActionResult>  RezervacijaNazivDatum(int id)
        {
            
            try 
            {
                
                var k = await Context.Predstave.Where(acc=>acc.ID== id).FirstOrDefaultAsync();
                if (k==null)
                {
                    return BadRequest("Greska! ");
                }
                return Ok(new
                {
                    k.Naziv,
                    k.Datum
                
                });
               
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("ListaPredstava")]
        [HttpGet]
        public async Task<ActionResult>  ListaPredstava()
        {
            
            try 
            {
               var result = await Context.Predstave
                .Select(p => new {
                p.Naziv,
                p.Slika,
                p.Zanr,
                })
                .GroupBy(p => p.Naziv)
                .Select(g => g.First())
                .ToListAsync();
                
                return Ok(result);
            }
   
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("OPredstavi{id}")]
        [HttpGet]
        public async Task<ActionResult>  OPredstavi(int id)
        {
            
            try 
            {
                
                var k = await Context.Predstave.Where(acc=>acc.ID== id).FirstOrDefaultAsync();
                if (k==null)
                {
                    return BadRequest("Greska! ");
                }
                return Ok(new
                {
                    k.Naziv,
                    k.Slika,
                    k.Reditelj,
                    k.Opis,
                    k.Datum
                
                });
               
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("AdminPredstave")]
        [HttpGet]
        public async Task<ActionResult>  AdminPredstave()
        {
            
            try 
            {
                var result = await Context.Predstave
                 .Select(p => new {
                
                    p.Naziv,
                    p.Datum
                }) .ToListAsync();
                
                return Ok(result);
            }
   
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


    
        [Route("DodatiPredstavu")]
        [HttpPost]
        public async Task<ActionResult> DodatiPredstavu([FromBody] Predstava predstava)
        {
            try
            {       
                    Context.Predstave.Add(predstava);
                 
                    for (int i=1;i<8;i++)
                    {
                        for (int j=1;j<8;j++)
                        {
                            
                            var b = new Sediste{
                                Red=i,
                                Broj=j,
                                Slika = j == 1 ? "slika1.jpg" : (j == 7 ? "Slika2.jpg" : "slika3.jpg"),
                                Zauzeto= false,
                                Predstava=predstava
                                
                            };
                            Context.Sedista.Add(b);
                        }
                    }
                     await Context.SaveChangesAsync();
                    return Ok("Predstava je dodata! ");
               
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        
        [Route("IzbrisatiPredstavu/{id}")]
        [HttpDelete]
        public async Task<ActionResult> IzbrisatiPredstavu(int id)
        {
            
            try
            {
                
                {
                var predstava = await Context.Predstave
                .Include(p => p.Rezervacija)
                .Include (p=>p.Slike)
                .Include (p=>p.Sediste) 
                .FirstOrDefaultAsync(p => p.ID == id);
                Context.Rezervacije.RemoveRange(predstava.Rezervacija);
                Context.Sedista.RemoveRange(predstava.Sediste);
                Context.Slike.RemoveRange(predstava.Slike);
                Context.Predstave.Remove(predstava); 
                await Context.SaveChangesAsync();

                }
                return Ok($"Uspesno izbrisana predstava !");
            }
            catch(Exception e)
            {
                
                return BadRequest(e.Message);
            }
        } 
    }
}