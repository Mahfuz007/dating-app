using API.DTOs;
using API.Entities;
using API.Helper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUser user);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<AppUser>> GetUsersAsync();
        Task<AppUser> GetUserByIdAsync(int id);
        Task<AppUser> GetUserByNameAsync(string name);
        Task<MemberDto> GetMemberByNameAsync(string name);
        Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams);
    }
}
