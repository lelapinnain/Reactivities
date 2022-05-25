using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUsers:IdentityUser
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public ICollection<ActivityAttendee> Activities { get; set; }

        public ICollection<Photo> Photos    {get;set;}

        
    }
}