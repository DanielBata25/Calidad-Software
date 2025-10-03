using Data;
using Entity.Entities;
using Microsoft.EntityFrameworkCore;

namespace Business.Services;

public class EstudianteService
{
    private readonly SchoolDbContext _ctx;
    public EstudianteService(SchoolDbContext ctx) => _ctx = ctx;

    public async Task<List<Estudiante>> GetAll(int? colegioId = null)
    {
        var query = _ctx.Estudiantes.Include(e => e.Colegio).AsQueryable();
        if (colegioId.HasValue) query = query.Where(e => e.ColegioId == colegioId);
        return await query.AsNoTracking().ToListAsync();
    }

    public async Task<Estudiante?> GetById(int id) =>
        await _ctx.Estudiantes.Include(e => e.Colegio).FirstOrDefaultAsync(e => e.Id == id);

    public async Task<Estudiante> Create(Estudiante estudiante)
    {
        _ctx.Estudiantes.Add(estudiante);
        await _ctx.SaveChangesAsync();
        return estudiante;
    }

    public async Task<Estudiante?> Update(int id, Estudiante estudiante)
    {
        var existing = await _ctx.Estudiantes.FindAsync(id);
        if (existing == null) return null;

        existing.Nombre = estudiante.Nombre;
        existing.ColegioId = estudiante.ColegioId;
        await _ctx.SaveChangesAsync();
        return existing;
    }

    public async Task<bool> Delete(int id)
    {
        var estudiante = await _ctx.Estudiantes.FindAsync(id);
        if (estudiante == null) return false;

        _ctx.Estudiantes.Remove(estudiante);
        await _ctx.SaveChangesAsync();
        return true;
    }
}
