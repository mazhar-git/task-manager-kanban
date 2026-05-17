using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManagerAPI.Data;
using TaskManagerAPI.Models;

namespace TaskManagerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BacklogsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BacklogsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetBacklogs()
        {
            var backlogs = await _context.Backlogs
                .OrderByDescending(x => x.CreatedAt)
                .ToListAsync();

            return Ok(backlogs);
        }

        [HttpPost("{id}/convert-to-task")]
        public async Task<IActionResult> ConvertToTask(int id)
        {
            var backlog = await _context.Backlogs.FindAsync(id);

            if (backlog == null)
            {
                return NotFound();
            }

            // Prevent duplicate conversion
            if (backlog.IsImportedToTask)
            {
                return BadRequest("Already converted");
            }

            var task = new TaskItem
            {
                Title = backlog.Title,
                Description = backlog.Description,
                Priority = backlog.Priority,
                Status = "Todo",
                AssignedTo = backlog.AssignedTo,
                DueDate = backlog.DueDate,
                EstimatedHours = backlog.EstimatedHours.HasValue ? (int)backlog.EstimatedHours.Value : 0,
                CreatedAt = DateTime.Now
            };

            _context.Tasks.Add(task);

            backlog.IsImportedToTask = true;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Task created successfully"
            });
        }
    }
}