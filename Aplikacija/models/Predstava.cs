using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Globalization;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    [Table("Predstava")]
    public class Predstava
    {

        [Key]
        [Column("ID")]
        public int ID { get; set; }
        [Required]
        public string Naziv { get; set; }
        [Required]
        public DateTime Datum { get; set; }
        [Required]
       
        public string Slika { get; set; }
        public string Opis { get; set; }
        public string Zanr {get; set;}
        public string Reditelj {get; set;}
        public int Cena {get; set;}
        [JsonIgnore]
        public List<Slika> Slike {get; set;}
        [JsonIgnore]
        public List<Sediste> Sediste { get; set; }
        [JsonIgnore]
        public Aplikacija Aplikacija { get; set; }
         [JsonIgnore]
        public List<Rezervacija> Rezervacija { get; set; }
        
    }  
}