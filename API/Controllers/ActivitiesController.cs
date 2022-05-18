using Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Domain;
using MediatR;
using Application.Activities;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
       
        [HttpGet]
        
        public async Task<IActionResult> getActivities()
        {
            return HandleResult( await Mediator.Send(new List.Query()));
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> getActivityByID(Guid id)
        {
            var result = await Mediator.Send(new Details.Query{Id=id});
          return HandleResult(result);

        }
        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return HandleResult(await Mediator.Send(new Create.Command{Activity=activity}));
        }
        [Authorize(policy:"IsActivityHost")]
       [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id ,Activity activity)
        {
            activity.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Activity=activity}));
        }

        [Authorize(policy:"IsActivityHost")]
         [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id )
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id=id}));
        }

         [HttpPost("{id}/attend")]
        public async Task<IActionResult> attend(Guid id)
        {
            return HandleResult(await Mediator.Send(new UpdateAttendance.Command{Id=id}));
        }
    }
}