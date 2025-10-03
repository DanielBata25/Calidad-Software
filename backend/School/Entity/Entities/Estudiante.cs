namespace Entity.Entities;

public class Estudiante
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;

    public int ColegioId { get; set; }
    public Colegio Colegio { get; set; } = default!;
}
