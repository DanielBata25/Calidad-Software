namespace Entity.Dtos
{
    public class NotaCreateDto
    {
        public decimal Score { get; set; }
        public int EstudianteId { get; set; }
        public int AsignaturaId { get; set; }
        public int PeriodoId { get; set; }
    }

    public class NotaResponseDto
    {
        public int Id { get; set; }
        public decimal Score { get; set; }
        public string EstudianteNombre { get; set; } = default!;
        public string AsignaturaNombre { get; set; } = default!;
        public string PeriodoNombre { get; set; } = default!;
    }
}
