
using EmployeeManagementSystem.DBFILE;
using EmployeeManagementSystem.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementSystem.Emplimentestion
{
    public class Repositry<T> : IRepositry<T> where T : class
    {
        private readonly AppDbContext dbContext;

        protected Microsoft.EntityFrameworkCore.DbSet<T> dbset;


        public Repositry(AppDbContext appDbContext)
        {
            dbContext = appDbContext;
            dbset = appDbContext.Set<T>();
        }

        public async Task AddAsync(T entity)
        {
            // Fix for CS1002, CS1061, and CS4014
            await dbset.AddAsync(entity);
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await FindByIdAsync(id);
            dbset.Remove(entity);
            await dbContext.SaveChangesAsync();


              







        }

        public async Task<T> FindByIdAsync(int id)
        {
            var entity = await dbset.FindAsync(id);
            return entity;        
        }

        public async Task<List<T>> GetAll()
        {
            var List =  await dbset.ToListAsync();
            return List;
        }

        public async  Task<int> SaveChangesAsync()
        {
            return (await dbContext.SaveChangesAsync()); 
        }
        public void Update(T entity)
        {
            dbset.Update(entity);
        }

       

      
    }
}
