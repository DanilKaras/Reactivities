using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Activities;
using Application.Core;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities([FromQuery]PagingParams param)
        {
            var result = await Mediator.Send(new List.Query{Params = param});
            return HandlePagedResult(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivity(Guid id)
        {
            var result = await Mediator.Send( new Details.Query{Id = id});
            return HandleResult(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity([FromBody]Activity activity)
        {
            var result = await Mediator.Send(new Create.Command { Activity = activity});
            return HandleResult(result);
        }

        [Authorize(Policy = "IsActivityHost")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, [FromBody]Activity activity)
        {
            activity.Id = id;
            var result = await Mediator.Send(new Edit.Command{Activity = activity});
            return HandleResult(result);
        }
        
        [Authorize(Policy = "IsActivityHost")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {       
            var result = await Mediator.Send(new Delete.Command{Id = id});
            return HandleResult(result);
        }


        [HttpPost("{id}/attend")]
        public async Task<IActionResult> Attend(Guid id)
        {
            var result = await Mediator.Send(new UpdateAttendance.Command{Id = id});
            return HandleResult(result);
        }
    }
}