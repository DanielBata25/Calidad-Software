namespace Entity.Dtos
{
    public class AsignaturaCreateDto
    {
        public string Nombre { get; set; } = default!;
    }

    public class AsignaturaResponseDto
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = default!;
    }
}
