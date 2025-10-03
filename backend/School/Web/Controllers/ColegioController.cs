using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Data;
using Entity.Entities;
using Entity.Dtos;
using AutoMapper;
using Business.Services;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ColegioController : ControllerBase
    {
        private readonly ColegioService _service;
        private readonly IMapper _mapper;

        public ColegioController(SchoolDbContext context, IMapper mapper)
        {
            _mapper = mapper;
            _service = new ColegioService(context);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ColegioResponseDto>>> GetColegios()
        {
            var colegios = await _service.GetAll();
            return Ok(_mapper.Map<IEnumerable<ColegioResponseDto>>(colegios));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ColegioResponseDto>> GetColegio(int id)
        {
            var colegio = await _service.GetById(id);
            if (colegio == null) return NotFound();

            return Ok(_mapper.Map<ColegioResponseDto>(colegio));
        }

        [HttpPost]
        public async Task<ActionResult<ColegioResponseDto>> CrearColegio([FromBody] ColegioCreateDto dto)
        {
            var colegio = _mapper.Map<Colegio>(dto);

            var creado = await _service.Create(colegio);

            return CreatedAtAction(nameof(GetColegio),
                new { id = creado.Id },
                _mapper.Map<ColegioResponseDto>(creado));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditarColegio(int id, [FromBody] ColegioCreateDto dto)
        {
            var colegio = _mapper.Map<Colegio>(dto);
            var actualizado = await _service.Update(id, colegio);

            if (actualizado == null) return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> EliminarColegio(int id)
        {
            var eliminado = await _service.Delete(id);
            if (!eliminado) return NotFound();

            return NoContent();
        }
    }
}
