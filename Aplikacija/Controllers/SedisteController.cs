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
    public class SedisteController : ControllerBase
    {
        public AplikacijaContext Context { get; set; }
        public SedisteController(AplikacijaContext context)
        {
            Context = context;
        }
         [Route("SlikaSedista{id}")]
        [HttpGet]
        public async Task<ActionResult> SlikaSedista (int id)
        {
            
            try 
            {
                var k = await Context.Sedista.Where(acc=>acc.ID== id).FirstOrDefaultAsync();
                if (k==null)
                {
                    return BadRequest("Greska! ");
                }
                return Ok(new
                {
                    k.Slika
                });
               
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("PregledRezervacije{id}")]
        [HttpGet]
        public async Task<ActionResult>  PregledRezervacije(int id)
        { 
             var result = Context.Sedista
                    .Include(p => p.Predstava);
                    

            var pregled = await result.Where(p => p.ID == id).ToListAsync();
            try 
            {
                    return Ok
                    (
                          pregled.Select(p =>
                        new{
                            Predstava = new{
                                
                                cena = p.Predstava.Cena
                            },
                            Broj=p.Broj,
                            Red=p.Red
                        })
                        .ToList()
                    );
            }
            
           /* try 
            {
                
                var k = await Context.Sedista.Where(acc=>acc.ID== id).FirstOrDefaultAsync();
                if (k==null)
                {
                    return BadRequest("Greska! ");
                }
                return Ok(new
                {
                    k.Red,
                    k.Broj,
                
                });
               
            }*/
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("ZauzetoSediste{id}")]
        [HttpGet]
        public async Task<ActionResult>  ZauzetoSediste(int id)
        {
            
            try 
            {
                
                var k = await Context.Sedista.Where(acc=>acc.ID== id).FirstOrDefaultAsync();
                if (k==null)
                {
                    return BadRequest("Greska! ");
                }
                return Ok(new
                {
                    k.Zauzeto
                
                });
               
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("AzuriranjeSedista{id}")]
        [HttpPut]
        public async Task<ActionResult>  AzuriranjeSedista(int id)
        {
            
            try 
            {
                
                var k = await Context.Sedista.Where(acc=>acc.ID== id).FirstOrDefaultAsync();
                if (k!=null)
                {
                    k.Zauzeto= true;
                    await Context.SaveChangesAsync();
                    return Ok($"Mesto je rezervisano!");
                }
                else
                {
                    return BadRequest("Greska!");
                }
                
               
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        
        
    }
}