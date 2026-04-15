using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Globalization;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    [Table("Sediste")]
    public class Sediste
    {

        [Key]
        [Column("ID")]
        public int ID { get; set; }
        [Required]
        public int Red { get; set; }
        [Required]
        public int Broj { get; set; }

        public string Slika { get; set; }
        public bool Zauzeto {get; set;}
        
        public Predstava Predstava { get; set; }
        [JsonIgnore]
        public Rezervacija Rezervacija { get; set; }
        
    }  
}