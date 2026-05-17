using ClosedXML.Excel;
using Microsoft.AspNetCore.Mvc;
using TaskManagerAPI.Data;
using TaskManagerAPI.Models;

namespace TaskManagerAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BacklogImportController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BacklogImportController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("import")]
        public async Task<IActionResult> ImportExcel(IFormFile file)
        {
            try
            {
                if (file == null || file.Length == 0)
                {
                    return BadRequest("No file uploaded");
                }

                using var stream = new MemoryStream();

                await file.CopyToAsync(stream);

                using var workbook = new XLWorkbook(stream);

                var worksheet = workbook.Worksheet(1);

                var rows = worksheet.RowsUsed().Skip(1);

                foreach (var row in rows)
                {
                    var app =
                        row.Cell(3).GetValue<string>();

                    var module =
                        row.Cell(4).GetValue<string>();

                    var formName =
                        row.Cell(5).GetValue<string>();

                    var description =
                        row.Cell(6).GetValue<string>();

                    var priority =
                        row.Cell(7).GetValue<string>();

                    var epic =
                        row.Cell(8).GetValue<string>();

                    var assigned =
                        row.Cell(9).GetValue<string>();

                    var status =
                        row.Cell(10).GetValue<string>();

                    var notes =
                        row.Cell(11).GetValue<string>();

                    var eta =
                        row.Cell(12).GetValue<string>();

                    var release =
                        row.Cell(13).GetValue<string>();

                    var backlog = new Backlog
                    {
                        // Auto-generated title
                        Title = $"{module} - {formName}",

                        Description = description,

                        Priority = NormalizePriority(priority),

                        Status = NormalizeStatus(status),

                        App = app,

                        Module = module,

                        FormName = formName,

                        Epic = epic,

                        Notes = notes,

                        ReleaseNumber = release,

                        CreatedAt = DateTime.Now,

                        IsImportedToTask = false
                    };
                    // Assigned user mapping
                    var user = _context.Users
                        .FirstOrDefault(x => x.Name == assigned);

                    if (user != null)
                    {
                        backlog.AssignedTo = user.Id;
                    }

                    // ETA Parsing
                    if (DateTime.TryParse(eta, out var dueDate))
                    {
                        backlog.DueDate = dueDate;
                    }

                    _context.Backlogs.Add(backlog);
                }

                await _context.SaveChangesAsync();

                return Ok(new
                {
                    message = "Excel imported successfully"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        private string NormalizePriority(string priority)
        {
            priority = priority?.Trim().ToLower();

            if (priority.Contains("high"))
                return "High";

            if (priority.Contains("medium"))
                return "Medium";

            return "Low";
        }

        private string NormalizeStatus(string status)
        {
            status = status?.Trim().ToLower();

            if (status.Contains("progress"))
                return "InProgress";

            if (status.Contains("done") ||
                status.Contains("completed"))
                return "Done";

            return "Todo";
        }
    }
}