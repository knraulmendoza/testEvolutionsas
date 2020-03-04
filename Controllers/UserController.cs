using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using testEvolution.Models.Entities;
using testEvolution.Services;

namespace testEvolution.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;
        public UserController()
        {
            _userService = new UserService();
        }
        [HttpPost("authenticate")]
        public ActionResult<User> Authenticate(User user)
        {
            Console.WriteLine("usuario " + user.Username);
            if (user.Username == null || user.Username.Length < 4) return BadRequest("Username is empty ó no cumple");
            User model = _userService.Find(user);
            if(model==null) return BadRequest(model);
            return Ok(model);
        }

        [HttpGet("{id}")]
        public ActionResult<User> Get(int id)
        {
            return _userService.Find(id);
        }

        [HttpPost("register")]
        public ActionResult<User> Register(User user)
        {
            if (user.Username == null || user.Username.Length < 4) return BadRequest("Username is empty ó no cumple");
            User model = _userService.Add(user);
            if (model == null) return BadRequest(model);
            Console.WriteLine("bueno bueno que paso aqui vale");
            return Ok(model);
        }

        [HttpPut("{id:int}")]
        public ActionResult<User> Update(int id, [FromBody]User user)
        {
            Console.WriteLine(user.Username);
            if (_userService.Find(id) == null) return BadRequest("user is empty ó no cumple");
            User model = _userService.Edit(id, user);
            if (model == null) return BadRequest(model);
            return Ok(model);
        }
    }
}