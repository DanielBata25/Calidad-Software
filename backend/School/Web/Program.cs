using Data;
using Business.Services;
using Microsoft.EntityFrameworkCore;
using Web.Mapping; // importa tu perfil de AutoMapper

var builder = WebApplication.CreateBuilder(args);

// 🔹 Registrar servicios ANTES del Build
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Conexión a SQL Server
builder.Services.AddDbContext<SchoolDbContext>(opt =>
    opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Servicios de negocio
builder.Services.AddScoped<ColegioService>();
builder.Services.AddScoped<NotaService>();
builder.Services.AddScoped<AsignaturaService>();
builder.Services.AddScoped<PeriodoService>();

// AutoMapper también antes del Build
builder.Services.AddAutoMapper(typeof(AutoMapperProfile));

// 🔹 Agregar CORS libre (rápido para dev local)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// 🔹 Pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "API Colegio v1");
        c.RoutePrefix = "swagger"; // acceso en https://localhost:7232/swagger
    });
}

app.UseHttpsRedirection();

// activar CORS ANTES de Authorization
app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();
app.Run();
