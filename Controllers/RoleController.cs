using System;
using evolutionPrueba.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using testEvolution.Models.Entities;

namespace evolutionPrueba.Controllers
{
    
    [Authorize]
    [Route("api/role")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly RoleService _roleService;
        public RoleController()
        {
            _roleService = new RoleService();
        }
        [HttpGet("{id}")]
        public ActionResult<Role> Get(int id)
        {
            return _roleService.Find(id);
        }

        [HttpPost("register")]
        public ActionResult<Role> Register([FromBody]Role role)
        {
            Console.WriteLine($"name {role.Name} description: {role.Description}");
            if (role.Name == null || role.Name.Length < 4) return BadRequest("role is empty ó no cumple");
            Role model = _roleService.Add(role);
            if (model == null) return BadRequest(model);
            return Ok(model);
        }
        [HttpPut("{id}")]
        public ActionResult<Role> Update(int id, [FromBody]Role role)
        {
            if (_roleService.Find(id) == null) return BadRequest("role is empty ó no cumple");
            Role model = _roleService.Edit(id, role);
            if (model == null) return BadRequest(model);
            return Ok(model);
        }
    }
}