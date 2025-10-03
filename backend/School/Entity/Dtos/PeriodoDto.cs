namespace Entity.Dtos
{
    public class PeriodoCreateDto
    {
        public string Nombre { get; set; } = default!;
        public int Porcentaje { get; set; }
    }

    public class PeriodoResponseDto
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = default!;
        public int Porcentaje { get; set; }
    }
}
