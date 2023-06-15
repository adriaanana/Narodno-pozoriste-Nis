using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Globalization;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    [Table("Korisnik")]
    public class Korisnik
    {   

        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Ime")]
        [DataType(DataType.Text)]
        public string Ime { get; set; }


        [Column("Prezime")]
        [DataType(DataType.Text)]
        public string Prezime { get; set; }

        [Column("KorisnickoIme")]
        public string KorisnickoIme { get; set; }
    

        [Column("Lozinka")]
        public string Lozinka { get; set; }
        [JsonIgnore]
        public Aplikacija Aplikacija{get; set;}
        [JsonIgnore]
        public List<Rezervacija> Rezervacija {get; set;}
        public string SALT {get; set;}


    }
}