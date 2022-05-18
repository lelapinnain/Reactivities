using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security
{
    public class IsHostRequirment : IAuthorizationRequirement
    {
        
    }

    public class IsHostRequirmentHandler : AuthorizationHandler<IsHostRequirment>
    {
        private readonly DataContext _dbContext;
        private readonly IHttpContextAccessor _httpContext;

        public IsHostRequirmentHandler(DataContext dbContext , IHttpContextAccessor httpContext)
        {
           _dbContext = dbContext;
           _httpContext = httpContext;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirment requirement)
        {
           var userId= context.User.FindFirstValue(ClaimTypes.NameIdentifier);
           if(userId==null) return Task.CompletedTask;
           var activityId = Guid.Parse(_httpContext.HttpContext?.Request.RouteValues.SingleOrDefault(x=> x.Key=="id").Value?.ToString()!); 
           
           var attendee = _dbContext.ActivityAttendees.AsNoTracking().SingleOrDefaultAsync( x=> x.AppUserId == userId && x.ActivityId== activityId).Result;

           if(attendee == null) return Task.CompletedTask;

           if(attendee.IsHost) context.Succeed(requirement);
           return Task.CompletedTask;
        }
    }
}