using EmployeeManagementSystem.EntityFiles;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementSystem.DBFILE
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Emplyoees>  Emplyoes { get; set; }
        public DbSet<Department> Departments { get; set; }
    }
}


