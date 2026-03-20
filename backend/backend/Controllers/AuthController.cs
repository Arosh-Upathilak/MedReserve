using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        [Authorize]
        [HttpGet("verify")]
        public IActionResult VerifyToken()
        {
            return Ok(new { message = "Valid token" });
        }
    }
}