using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using testEvolution.Models.Base;

namespace testEvolution.Models.Entities
{
    public class RoleUser : Model<RoleUser>
    {
        [Required]
        public int Role_id { get; set; }
        [Required]
        public int User_id { get; set; }
    }
}
