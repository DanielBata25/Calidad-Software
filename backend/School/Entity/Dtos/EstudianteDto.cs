namespace Entity.Dtos
{
    public class EstudianteCreateDto
    {
        public string Nombre { get; set; } = default!;
        public int ColegioId { get; set; }
    }

    public class EstudianteResponseDto
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = default!;
        public int ColegioId { get; set; }
        public string ColegioNombre { get; set; } = default!;
    }
}
