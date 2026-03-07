using Microsoft.AspNetCore.Mvc;

namespace PF_Q2.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            // For now, simple mock login
            if (!string.IsNullOrWhiteSpace(request.Username))
            {
                return Ok(new { Message = "Login successful", Username = request.Username });
            }
            return BadRequest(new { Message = "Username is required" });
        }
    }

    public class LoginRequest
    {
        public string Username { get; set; } = string.Empty;
    }
}
