namespace Entity.Dtos
{
    // Para crear (sin MaxEstudiantes porque lo pone el sistema)
    public class ColegioCreateDto
    {
        public string Nombre { get; set; } = default!;
    }

    // Para consultar
    public class ColegioResponseDto
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = default!;
        public int MaxEstudiantes { get; set; }
        public List<EstudianteResponseDto> Estudiantes { get; set; } = new();
    }
}
