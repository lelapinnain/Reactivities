using Microsoft.EntityFrameworkCore;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUsers>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Activity> Activities { get; set; }
        public DbSet<ActivityAttendee> ActivityAttendees {get; set;}
        public DbSet<Photo>Photos {get;set;}
        public DbSet<Comment>Comments {get;set;}


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
      

            builder.Entity<ActivityAttendee>(x=> x.HasKey(aa=> new {aa.AppUserId, aa.ActivityId}));

            builder.Entity<ActivityAttendee>()
            .HasOne(u=> u.AppUser)
            .WithMany(a=> a.Activities).HasForeignKey(aa=> aa.AppUserId);    

             builder.Entity<ActivityAttendee>(x=> x.HasKey(aa=> new {aa.AppUserId, aa.ActivityId}));
            builder.Entity<ActivityAttendee>()
            .HasOne(u=> u.Activity)
            .WithMany(a=> a.Attendees).HasForeignKey(aa=> aa.ActivityId);     

            builder.Entity<Comment>()
            .HasOne(a=> a.Activity)
            .WithMany(b=> b.Comments).OnDelete(DeleteBehavior.Cascade); //to delete the comments if the activity deleted automatically    

        }
    }
}