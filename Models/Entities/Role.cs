using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using testEvolution.Models.Base;

namespace testEvolution.Models.Entities
{
    public class Role : Model<Role>
    {
        [Required]
        [MaxLength(30)]
        [MinLength(4)]
        public string Name { get; set; }
        [MaxLength(300)]
        public string Description { get; set; }
    }
}
