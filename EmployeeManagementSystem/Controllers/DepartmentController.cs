using System.Threading.Tasks;
using EmployeeManagementSystem.EntityFiles;
using EmployeeManagementSystem.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly IRepositry<Department> departmentRepositry;

        public DepartmentController(IRepositry<Department> departmentRepositry)
        {
            this.departmentRepositry = departmentRepositry;
        }

        [HttpPost("DepartmentNew")]
        public async Task<IActionResult> AddDepartment([FromBody] Department model)
        {
            await departmentRepositry.AddAsync(model);
            await departmentRepositry.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{Id}")]
        public async Task<IActionResult> UpdateDepartment([FromRoute] int Id, [FromBody] Department model)
        {
            //var department = await departmentRepositry.FindByIdAsync(Id);
            //department.Name = model.Name;
            //departmentRepositry.Update(department); // Removed 'await' as Update is a void method.
            //await departmentRepositry.SaveChangesAsync();
            //return Ok();
            var department = await departmentRepositry.FindByIdAsync(Id);

            if (department == null)
                return NotFound($"Department with Id={Id} not found.");  // 404 if not found

            if (model == null || string.IsNullOrWhiteSpace(model.Name))
                return BadRequest("Invalid department data.");  // Validate input

            department.Name = model.Name;
            departmentRepositry.Update(department);
            await departmentRepositry.SaveChangesAsync();

            return Ok(department);  // Return updated department

        }

        [HttpGet]
        public async Task<IActionResult> GetAllDepartment()
        {
            var list = await departmentRepositry.GetAll();
            return Ok(list);
        }

        [HttpDelete("{Id}")]

        public async Task<IActionResult> DeletDepartment([FromRoute]int Id) {

            await departmentRepositry.DeleteAsync(Id);
            await departmentRepositry.SaveChangesAsync();
            return Ok();

     }
        
    }
    





}
