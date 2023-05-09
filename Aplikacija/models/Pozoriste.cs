using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Globalization;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    [Table("Pozoriste")]
    public class Pozoriste
    {

        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Naziv")]
        [DataType(DataType.Text)]
        public string Naziv { get; set; }

        [Required]
        public string Opis{get; set;}

        
        public string Slika{get; set;}
        
        public Aplikacija Aplikacija { get; set; }
    }  
    
}