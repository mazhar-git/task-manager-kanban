using System.ComponentModel.DataAnnotations;

namespace TaskManagerAPI.Models
{
    public class Backlog
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string Priority { get; set; }

        public string Status { get; set; }

        public string App { get; set; }

        public string Module { get; set; }

        public string FormName { get; set; }

        public string Epic { get; set; }

        public string Notes { get; set; }

        public string ReleaseNumber { get; set; }

        public int? AssignedTo { get; set; }

        public decimal? EstimatedHours { get; set; }

        public DateTime? DueDate { get; set; }

        public DateTime CreatedAt { get; set; }

        public bool IsImportedToTask { get; set; }
    }
}
