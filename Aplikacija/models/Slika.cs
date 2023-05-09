using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Globalization;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    [Table("Slika")]
    public class Slika
    {

        [Key]
        [Column("ID")]
        public int ID { get; set; }
        [Required]
        public string Naziv { get; set; }
        [JsonIgnore]
        public Predstava Predstava { get; set; }
       
        

       
        
    }  
}