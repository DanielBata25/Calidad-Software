namespace Entity.Entities;

public class Nota
{
    public int Id { get; set; }
    public decimal Score { get; set; }

    public int EstudianteId { get; set; }
    public Estudiante Estudiante { get; set; } = default!;

    public int AsignaturaId { get; set; }
    public Asignatura Asignatura { get; set; } = default!;

    public int PeriodoId { get; set; }
    public Periodo Periodo { get; set; } = default!;
}
