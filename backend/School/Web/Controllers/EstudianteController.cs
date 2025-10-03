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
    public class EstudianteController : ControllerBase
    {
        private readonly SchoolDbContext _context;
        private readonly IMapper _mapper;

        public EstudianteController(SchoolDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EstudianteResponseDto>>> GetEstudiantes()
        {
            var estudiantes = await _context.Estudiantes.Include(e => e.Colegio).ToListAsync();
            return Ok(_mapper.Map<IEnumerable<EstudianteResponseDto>>(estudiantes));
        }

        [HttpPost]
        public async Task<ActionResult<EstudianteResponseDto>> CrearEstudiante([FromBody] EstudianteCreateDto dto)
        {
            var estudiante = _mapper.Map<Estudiante>(dto);
            _context.Estudiantes.Add(estudiante);
            await _context.SaveChangesAsync();

            return Ok(_mapper.Map<EstudianteResponseDto>(estudiante));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditarEstudiante(int id, [FromBody] EstudianteCreateDto dto)
        {
            var estudiante = await _context.Estudiantes.FindAsync(id);
            if (estudiante == null) return NotFound();

            _mapper.Map(dto, estudiante);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> EliminarEstudiante(int id)
        {
            var estudiante = await _context.Estudiantes.FindAsync(id);
            if (estudiante == null) return NotFound();

            _context.Estudiantes.Remove(estudiante);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
