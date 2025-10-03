using AutoMapper;
using Entity.Dtos;
using Entity.Entities;

namespace Web.Mapping
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            // Colegio
            CreateMap<Colegio, ColegioResponseDto>()
                .ForMember(dest => dest.Estudiantes,
                    opt => opt.MapFrom(src => src.Estudiantes));

            // Solo mapea el Nombre desde el CreateDto -> Colegio
            CreateMap<ColegioCreateDto, Colegio>()
                .ForMember(dest => dest.MaxEstudiantes, opt => opt.Ignore());

            // Estudiante
            CreateMap<Estudiante, EstudianteResponseDto>()
                .ForMember(dest => dest.ColegioNombre,
                    opt => opt.MapFrom(src => src.Colegio.Nombre));
            CreateMap<EstudianteCreateDto, Estudiante>();

            // Nota
            CreateMap<Nota, NotaResponseDto>()
                .ForMember(dest => dest.EstudianteNombre,
                    opt => opt.MapFrom(src => src.Estudiante.Nombre))
                .ForMember(dest => dest.AsignaturaNombre,
                    opt => opt.MapFrom(src => src.Asignatura.Nombre))
                .ForMember(dest => dest.PeriodoNombre,
                    opt => opt.MapFrom(src => src.Periodo.Nombre));
            CreateMap<NotaCreateDto, Nota>();

            // Asignatura
            CreateMap<Asignatura, AsignaturaResponseDto>();
            CreateMap<AsignaturaCreateDto, Asignatura>();

            // Periodo
            CreateMap<Periodo, PeriodoResponseDto>();
            CreateMap<PeriodoCreateDto, Periodo>();
        }
    }
}
