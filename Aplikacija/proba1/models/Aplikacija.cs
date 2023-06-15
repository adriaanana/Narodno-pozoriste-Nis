using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Globalization;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    [Table("Aplikacija")]
    public class Aplikacija
    {

        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Naziv")]
        [DataType(DataType.Text)]
        public string Naziv { get; set; }
        [Required]
        public string Opis{get; set;}
        [Required]
        public string Slika{get; set;}
        [JsonIgnore]
        public List<Korisnik> korisnik {get; set;}
        
        public List<Rezervacija> Rezervacija {get; set;}
        
        public List<Predstava> Predstava { get; set; }

        public List<Umetnik> Umetnik { get; set; }
        public List<Pozoriste> Pozoriste { get; set; }
    }  
    
}