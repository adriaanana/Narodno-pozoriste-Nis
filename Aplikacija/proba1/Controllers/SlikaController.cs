using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Models;

namespace proba1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SlikaController : ControllerBase
    {
        public AplikacijaContext Context { get; set; }
        public SlikaController(AplikacijaContext context)
        {
            Context = context;
        }/*
        [Route("Slike{id}")]
        [HttpGet]
        public async Task<ActionResult> Slike (int id)
        {
            
            try 
            {
                var m = await Context.Predstave.Where(a => a.ID == id).FirstOrDefaultAsync();
                var s = await Context.Slike
                .Include(p => p.Predstava).Where(a => a.ID == id).FirstOrDefaultAsync();
                var k = await Context.Slike.Where(acc => acc.Predstava == m).ToListAsync();
                
                if (k==null)
                {
                    return BadRequest("Greska! ");
                }
                return Ok(k);
                
            }
               
            
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }*/
    }
}