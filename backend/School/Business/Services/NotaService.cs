using Data;
using Entity.Entities;
using Microsoft.EntityFrameworkCore;

namespace Business.Services;

public class NotaService
{
    private readonly SchoolDbContext _ctx;
    public NotaService(SchoolDbContext ctx) => _ctx = ctx;

    public async Task<List<Nota>> GetNotas(int? estudianteId, int? asignaturaId, int? periodoId)
    {
        var query = _ctx.Notas
            .Include(n => n.Estudiante)
            .Include(n => n.Asignatura)
            .Include(n => n.Periodo)
            .AsQueryable();

        if (estudianteId.HasValue) query = query.Where(n => n.EstudianteId == estudianteId);
        if (asignaturaId.HasValue) query = query.Where(n => n.AsignaturaId == asignaturaId);
        if (periodoId.HasValue) query = query.Where(n => n.PeriodoId == periodoId);

        return await query.AsNoTracking().ToListAsync();
    }

    public async Task<Nota?> GetById(int id) =>
        await _ctx.Notas.Include(n => n.Estudiante)
                        .Include(n => n.Asignatura)
                        .Include(n => n.Periodo)
                        .FirstOrDefaultAsync(n => n.Id == id);

    public async Task<Nota> Create(Nota nota)
    {
        _ctx.Notas.Add(nota);
        await _ctx.SaveChangesAsync();
        return nota;
    }

    public async Task<Nota?> Update(int id, Nota nota)
    {
        var existing = await _ctx.Notas.FindAsync(id);
        if (existing == null) return null;

        existing.Score = nota.Score;
        existing.AsignaturaId = nota.AsignaturaId;
        existing.PeriodoId = nota.PeriodoId;
        existing.EstudianteId = nota.EstudianteId;
        await _ctx.SaveChangesAsync();
        return existing;
    }

    public async Task<bool> Delete(int id)
    {
        var nota = await _ctx.Notas.FindAsync(id);
        if (nota == null) return false;

        _ctx.Notas.Remove(nota);
        await _ctx.SaveChangesAsync();
        return true;
    }
}
