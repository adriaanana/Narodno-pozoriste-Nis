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
    public class PozoristeController : ControllerBase
    {
        public  AplikacijaContext Context { get; set; }
        public PozoristeController(AplikacijaContext context)
        {
            Context = context;
        }
        
        [Route("OPozoristu{naziv}")]
        [HttpGet]
        public async Task<ActionResult> OPozoristu (string naziv)
        {
            
            try 
            {
                var k = await Context.Pozorista.Where(acc=>acc.Naziv== naziv).FirstOrDefaultAsync();
                if (k==null)
                {
                    return BadRequest("Greska! ");
                }
                return Ok(new
                {
                    k.Opis,
                    k.Slika

                });
               
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        
    }
    
}