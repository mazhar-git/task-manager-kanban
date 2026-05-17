using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManagerAPI.Data;
using TaskManagerAPI.DTO;
using TaskManagerAPI.Models;

[Route("api/[controller]")]
[ApiController]
public class TasksController : ControllerBase
{
    private readonly AppDbContext _context;

    public TasksController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/tasks
    [HttpGet]
    public async Task<IActionResult> GetTasks()
    {
        var tasks = await _context.Tasks
            .Include(t => t.AssignedUser)
            .ToListAsync();


        return Ok(tasks);
    }
    [HttpGet("my/{userId}")]
    public async Task<IActionResult> GetMyTasks(int userId)
    {
        var tasks = await _context.Tasks
            .Include(t => t.AssignedUser)
            .Where(t => t.AssignedTo == userId)
            .ToListAsync();

        return Ok(tasks);
    }

    [HttpPost]
    public async Task<IActionResult> CreateTask(CreateTaskDto dto)
    {


        var task = new TaskItem
        {
            Title = dto.Title,
            Description = dto.Description,
            Status = dto.Status,
            Priority = dto.Priority,
            AssignedTo = dto.AssignedTo,
            DueDate = dto.DueDate,
            EstimatedHours = dto.EstimatedHours,
            CreatedAt = DateTime.UtcNow
        };

        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();

        return Ok(task);
    }

    // PUT: api/tasks/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTask(int id, TaskItem updatedTask)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task == null) return NotFound();

        task.Title = updatedTask.Title;
        task.Description = updatedTask.Description;
        task.Status = updatedTask.Status;
        task.Priority = updatedTask.Priority;
        task.AssignedTo = updatedTask.AssignedTo;
        task.DueDate = updatedTask.DueDate;
        task.EstimatedHours = updatedTask.EstimatedHours;

        await _context.SaveChangesAsync();
        return Ok(task);
    }

    // DELETE: api/tasks/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTask(int id, [FromQuery] int userId)
    {
        var user = await _context.Users.FindAsync(userId);
        if (user == null)
            return Unauthorized();
        if (user.Role != "Admin")
            return Unauthorized();

        var task = await _context.Tasks.FindAsync(id);
        if (task == null) return NotFound();

        _context.Tasks.Remove(task);
        await _context.SaveChangesAsync();

        return Ok();
    }
}