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
    public class ApiController : ControllerBase
    {
        public  AplikacijaContext Context { get; set; }
        public ApiController(AplikacijaContext context)
        {
            Context = context;
        }

        [Route("Aplikacija")]
        [HttpGet]
        public async Task<ActionResult> Aplikacija()
        {
           try
            {
                return Ok(await Context.Aplikacije.Select(p =>
                new
                {
                    p.ID,
                    p.Naziv,
                    p.Opis,
                    p.Slika

                }).ToListAsync());
            }
            catch (Exception e)
            {
                return BadRequest("Doslo je do greske: " + e.Message);
            }
        }

    }
}