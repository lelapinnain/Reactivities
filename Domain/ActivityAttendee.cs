
namespace Domain
{
    public class ActivityAttendee
    {
        public string AppUserId { get; set; }
        public AppUsers AppUser { get; set; }
        public Guid ActivityId { get; set; }
        public Activity Activity { get; set; }
        public bool IsHost { get; set; }
        
    }
}