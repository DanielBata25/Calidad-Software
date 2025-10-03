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
    public class AsignaturaController : ControllerBase
    {
        private readonly SchoolDbContext _context;
        private readonly IMapper _mapper;

        public AsignaturaController(SchoolDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AsignaturaResponseDto>>> GetAsignaturas()
        {
            var asignaturas = await _context.Asignaturas.ToListAsync();
            return Ok(_mapper.Map<IEnumerable<AsignaturaResponseDto>>(asignaturas));
        }

        [HttpPost]
        public async Task<ActionResult<AsignaturaResponseDto>> CrearAsignatura([FromBody] AsignaturaCreateDto dto)
        {
            var asignatura = _mapper.Map<Asignatura>(dto);
            _context.Asignaturas.Add(asignatura);
            await _context.SaveChangesAsync();

            return Ok(_mapper.Map<AsignaturaResponseDto>(asignatura));
        }
    }
}
