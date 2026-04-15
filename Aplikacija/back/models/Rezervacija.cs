using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Globalization;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    [Table("Rezervacija")]
    public class Rezervacija
    {

        [Key]
        [Column("ID")]
        public int ID { get; set; }
        
        public List<Sediste> Sediste { get; set; }
        
        public Predstava Predstava { get; set; }

        public Korisnik Korisnik { get; set; }

        
    }  
}