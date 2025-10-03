namespace Entity.Entities;

public class Colegio
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public int MaxEstudiantes { get; set; }

    public ICollection<Estudiante> Estudiantes { get; set; } = new List<Estudiante>();
}
