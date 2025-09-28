using EmployeeManagementSystem.DBFILE;
using EmployeeManagementSystem.EntityFiles;
using EmployeeManagementSystem.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Scalar.AspNetCore;

namespace EmployeeManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase

    {
        private readonly IRepositry<Emplyoees> emplyoeeRepository;

        public EmployeeController(IRepositry<Emplyoees> emplyoeeRepository)
        {
            this.emplyoeeRepository = emplyoeeRepository;
        }
        [HttpGet]
        public async Task<IActionResult> GetEmplyoeeList()
        {
            return Ok(await emplyoeeRepository.GetAll());
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmplyoeeList([FromRoute]int id)
        {
            return Ok(await emplyoeeRepository.FindByIdAsync(id));
        }


        [HttpPost]
        public async Task<IActionResult> AddEmployee([FromBody] Emplyoees model)
        {
            await emplyoeeRepository.AddAsync(model);
            await emplyoeeRepository.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("{Id}")]
        public async Task<IActionResult> UpdateEmplyoee([FromRoute] int id, [FromBody] Emplyoees model)
        {
            var emplyoee = await emplyoeeRepository.FindByIdAsync(id);

            emplyoee.Name = model.Name;
            emplyoee.Email = model.Email;
            emplyoee.Phone = model.Phone;
            emplyoee.JobTitle = model.JobTitle;
            emplyoee.DepartmentId = model.DepartmentId;
            emplyoee.LastWorkingDate = model.LastWorkingDate;
            emplyoeeRepository.Update(emplyoee);
            await emplyoeeRepository.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("{Id}")]

        public async Task<IActionResult> DeleteEmplyoee([FromRoute] int id)
        {
            await emplyoeeRepository.DeleteAsync(id);
            await emplyoeeRepository.SaveChangesAsync();
            return Ok();

        }


    }

    
    
}
