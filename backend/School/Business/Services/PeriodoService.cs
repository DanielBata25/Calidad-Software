using Data;
using Entity.Entities;
using Microsoft.EntityFrameworkCore;

namespace Business.Services;

public class PeriodoService
{
    private readonly SchoolDbContext _ctx;
    public PeriodoService(SchoolDbContext ctx) => _ctx = ctx;

    public async Task<List<Periodo>> GetAll() => await _ctx.Periodos.AsNoTracking().ToListAsync();
    public async Task<Periodo?> GetById(int id) => await _ctx.Periodos.FindAsync(id);

    public async Task<Periodo> Create(Periodo periodo)
    {
        _ctx.Periodos.Add(periodo);
        await _ctx.SaveChangesAsync();
        return periodo;
    }

    public async Task<Periodo?> Update(int id, Periodo periodo)
    {
        var existing = await _ctx.Periodos.FindAsync(id);
        if (existing == null) return null;

        existing.Nombre = periodo.Nombre;
        existing.Porcentaje = periodo.Porcentaje;
        await _ctx.SaveChangesAsync();
        return existing;
    }

    public async Task<bool> Delete(int id)
    {
        var periodo = await _ctx.Periodos.FindAsync(id);
        if (periodo == null) return false;

        _ctx.Periodos.Remove(periodo);
        await _ctx.SaveChangesAsync();
        return true;
    }
}
