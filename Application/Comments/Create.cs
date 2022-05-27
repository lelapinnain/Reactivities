using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments
{
       public class Create
    {
        public class Command : IRequest<Result<CommentDto>>
        {
            public Guid ActivityId { get; set; }
            public string Body { get; set; }
        }
    public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Body).NotEmpty();
            }
        }
        public class Handler : IRequestHandler<Command, Result<CommentDto>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;


            public Handler(DataContext context, IUserAccessor userAccessor ,IMapper mapper)
            {
                _userAccessor = userAccessor;
                _context = context;
                _mapper=mapper;
            }

            public async Task<Result<CommentDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.Include(x=> x.Photos).FirstOrDefaultAsync(x=>x.UserName==_userAccessor.GetUserName());
                var activity = await _context.Activities.FirstOrDefaultAsync(x=> x.Id == request.ActivityId);
                if(activity==null) return null;
                var comment = new Comment{
                    Body = request.Body,
                    Author = user,
                    Activity = activity,
                   
                };
                activity.Comments.Add(comment);
                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<CommentDto>.Failure("Failed to create activity");

                return Result<CommentDto>.Success(_mapper.Map<CommentDto>(comment));
            }
        }
    }
}