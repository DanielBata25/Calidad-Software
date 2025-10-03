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
    public class PeriodoController : ControllerBase
    {
        private readonly SchoolDbContext _context;
        private readonly IMapper _mapper;

        public PeriodoController(SchoolDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PeriodoResponseDto>>> GetPeriodos()
        {
            var periodos = await _context.Periodos.ToListAsync();
            return Ok(_mapper.Map<IEnumerable<PeriodoResponseDto>>(periodos));
        }

        [HttpPost]
        public async Task<ActionResult<PeriodoResponseDto>> CrearPeriodo([FromBody] PeriodoCreateDto dto)
        {
            var periodo = _mapper.Map<Periodo>(dto);
            _context.Periodos.Add(periodo);
            await _context.SaveChangesAsync();

            return Ok(_mapper.Map<PeriodoResponseDto>(periodo));
        }
    }
}
