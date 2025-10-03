using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Data;
using Entity.Entities;
using Entity.Dtos;
using AutoMapper;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotaController : ControllerBase
    {
        private readonly SchoolDbContext _context;
        private readonly IMapper _mapper;

        public NotaController(SchoolDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<NotaResponseDto>>> GetNotas()
        {
            var notas = await _context.Notas
                .Include(n => n.Estudiante)
                .Include(n => n.Asignatura)
                .Include(n => n.Periodo)
                .ToListAsync();

            return Ok(_mapper.Map<IEnumerable<NotaResponseDto>>(notas));
        }

        [HttpPost]
        public async Task<ActionResult<NotaResponseDto>> CrearNota([FromBody] NotaCreateDto dto)
        {
            var nota = _mapper.Map<Nota>(dto);
            _context.Notas.Add(nota);
            await _context.SaveChangesAsync();

            return Ok(_mapper.Map<NotaResponseDto>(nota));
        }
    }
}
