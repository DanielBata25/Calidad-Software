using Microsoft.EntityFrameworkCore;
using Entity.Entities;

namespace Data;

public class SchoolDbContext : DbContext
{
    public SchoolDbContext(DbContextOptions<SchoolDbContext> options) : base(options) { }

    public DbSet<Colegio> Colegios => Set<Colegio>();
    public DbSet<Estudiante> Estudiantes => Set<Estudiante>();
    public DbSet<Asignatura> Asignaturas => Set<Asignatura>();
    public DbSet<Periodo> Periodos => Set<Periodo>();
    public DbSet<Nota> Notas => Set<Nota>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Nota>()
            .HasOne(n => n.Estudiante)
            .WithMany()
            .HasForeignKey(n => n.EstudianteId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Nota>()
            .HasOne(n => n.Asignatura)
            .WithMany()
            .HasForeignKey(n => n.AsignaturaId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Nota>()
            .HasOne(n => n.Periodo)
            .WithMany()
            .HasForeignKey(n => n.PeriodoId)
            .OnDelete(DeleteBehavior.Restrict);

        base.OnModelCreating(modelBuilder);
    }
}
