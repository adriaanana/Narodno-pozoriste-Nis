using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace proba1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UmetnikController : ControllerBase
    {
        public AplikacijaContext Context { get; set; }
        public UmetnikController(AplikacijaContext context)
        {
            Context = context;
        }
        [Route("PreuzmiUmetnike")]
        [HttpGet]
        public async Task<ActionResult> preuzmiUmetnike()
        {
            return Ok(Context.Umetnici);
        }

        [Route("DodatiUmetnika")]
        [HttpPost]
        public async Task<ActionResult> DodajUmetnika([FromBody] Umetnik umetnik)
        {
            try
            {
                Context.Umetnici.Add(umetnik);
                await Context.SaveChangesAsync();
                return Ok("Umetnik je dodat!");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
       
        [Route("IzbrisatiUmetnika/{id}")]
        [HttpDelete]
        public async Task<ActionResult> Izbrisi(int id)
        {
            try
            {
                var umetnik = await Context.Umetnici.FindAsync(id);
                Context.Umetnici.Remove(umetnik);
                await Context.SaveChangesAsync();
                return Ok("Uspesno izbrisan umetnik");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}