using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Data;

public class SchoolDbContextFactory : IDesignTimeDbContextFactory<SchoolDbContext>
{
    public SchoolDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<SchoolDbContext>();
        optionsBuilder.UseSqlServer("Server=localhost,1433;Database=SchoolDb;User Id=sa;Password=Admin123.;TrustServerCertificate=true");
        return new SchoolDbContext(optionsBuilder.Options);
    }
}
