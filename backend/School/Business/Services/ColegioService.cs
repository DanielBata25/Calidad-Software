using Data;
using Entity.Entities;
using Microsoft.EntityFrameworkCore;

namespace Business.Services;

public class ColegioService
{
    private readonly SchoolDbContext _ctx;
    private readonly Random _random = new Random();

    public ColegioService(SchoolDbContext ctx) => _ctx = ctx;

    public async Task<List<Colegio>> GetAll() =>
        await _ctx.Colegios.AsNoTracking().ToListAsync();

    public async Task<Colegio?> GetById(int id) =>
        await _ctx.Colegios.FindAsync(id);

    public async Task<Colegio> Create(Colegio colegio)
    {
        // Asigna automáticamente entre 20 y 40
        colegio.MaxEstudiantes = _random.Next(20, 41);

        _ctx.Colegios.Add(colegio);
        await _ctx.SaveChangesAsync();
        return colegio;
    }

    public async Task<Colegio?> Update(int id, Colegio colegio)
    {
        var existing = await _ctx.Colegios.FindAsync(id);
        if (existing == null) return null;

        existing.Nombre = colegio.Nombre;
        // ❌ No dejamos modificar MaxEstudiantes (solo al crear)

        await _ctx.SaveChangesAsync();
        return existing;
    }

    public async Task<bool> Delete(int id)
    {
        var colegio = await _ctx.Colegios.FindAsync(id);
        if (colegio == null) return false;

        _ctx.Colegios.Remove(colegio);
        await _ctx.SaveChangesAsync();
        return true;
    }
}
