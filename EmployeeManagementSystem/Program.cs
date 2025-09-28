using EmployeeManagementSystem.DBFILE;
using EmployeeManagementSystem.Emplimentestion;
using EmployeeManagementSystem.EntityFiles;
using EmployeeManagementSystem.Interfaces;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
builder.Services.AddCors(Option =>
{
    Option.AddPolicy("AllowCorsOrigin", policy =>
    {
        policy.AllowAnyOrigin();
        policy.AllowAnyHeader();
        policy.AllowAnyMethod();
    });
});
builder.Services.AddScoped<IRepositry<Department>, Repositry<Department>>();
builder.Services.AddScoped<IRepositry<Emplyoees>, Repositry<Emplyoees>>();
builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}
app.UseCors("AllowCorsOrigin"); 
app.UseHttpsRedirection();

app.UseAuthorization();  

app.MapControllers();

app.Run();
