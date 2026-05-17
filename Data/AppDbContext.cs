using Microsoft.EntityFrameworkCore;
using TaskManagerAPI.Models;

namespace TaskManagerAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<TaskItem> Tasks { get; set; }
        public DbSet<Backlog> Backlogs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Task EstimatedHours precision
            modelBuilder.Entity<TaskItem>()
                .Property(t => t.EstimatedHours)
                .HasPrecision(10, 2);

            // Backlog EstimatedHours precision
            modelBuilder.Entity<Backlog>()
                .Property(b => b.EstimatedHours)
                .HasPrecision(10, 2);
        }
    }
}
