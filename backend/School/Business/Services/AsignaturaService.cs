using Data;
using Entity.Entities;
using Microsoft.EntityFrameworkCore;

namespace Business.Services;

public class AsignaturaService
{
    private readonly SchoolDbContext _ctx;
    public AsignaturaService(SchoolDbContext ctx) => _ctx = ctx;

    public async Task<List<Asignatura>> GetAll() => await _ctx.Asignaturas.AsNoTracking().ToListAsync();
    public async Task<Asignatura?> GetById(int id) => await _ctx.Asignaturas.FindAsync(id);

    public async Task<Asignatura> Create(Asignatura asignatura)
    {
        _ctx.Asignaturas.Add(asignatura);
        await _ctx.SaveChangesAsync();
        return asignatura;
    }

    public async Task<Asignatura?> Update(int id, Asignatura asignatura)
    {
        var existing = await _ctx.Asignaturas.FindAsync(id);
        if (existing == null) return null;

        existing.Nombre = asignatura.Nombre;
        await _ctx.SaveChangesAsync();
        return existing;
    }

    public async Task<bool> Delete(int id)
    {
        var asignatura = await _ctx.Asignaturas.FindAsync(id);
        if (asignatura == null) return false;

        _ctx.Asignaturas.Remove(asignatura);
        await _ctx.SaveChangesAsync();
        return true;
    }
}
