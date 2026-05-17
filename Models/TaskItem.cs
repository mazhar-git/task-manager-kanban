using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManagerAPI.Models
{
    public class TaskItem
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Status { get; set; } // Todo, InProgress, Done
        public string Priority { get; set; } // Low, Medium, High
        public int? AssignedTo { get; set; }

        [ForeignKey("AssignedTo")]
        public User? AssignedUser { get; set; }
        public DateTime? DueDate { get; set; }
        public int EstimatedHours { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        // DUPLICATE FEATURE

        public bool IsDuplicate { get; set; } = false;

        public int? DuplicateOfTaskId { get; set; }

        [ForeignKey("DuplicateOfTaskId")]
        public TaskItem? DuplicateOfTask { get; set; }

    }
}
