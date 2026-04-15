using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Globalization;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    [Table("Umetnik")]
    public class Umetnik
    {

        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Ime")]
        [DataType(DataType.Text)]
        public string Ime { get; set; }
         
        [Column("Prezime")]
        [DataType(DataType.Text)]
        public string Prezime{get; set;}

        [Required]
        public string Opis{get; set;}
        [Required]
        public string Slika{get; set;}
        [JsonIgnore]
        public Aplikacija Aplikacija { get; set; }
    }  
    
}