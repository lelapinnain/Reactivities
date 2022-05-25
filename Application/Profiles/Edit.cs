using Application.Core;
using Application.Interfaces;
using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>{
            public string DisplayName { get; set; }
            public string? Bio { get; set; }
        }
           public class CommadValidator : AbstractValidator<Command>
        {
            // public CommadValidator()
            // {
            //     RuleFor(x=> x.Activity).SetValidator(new ActivityValidator());
            // }
        }
        public class Handler : IRequestHandler<Command,Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context , IUserAccessor   userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x=> x.UserName ==_userAccessor.GetUserName()) ;

                user.Bio = request.Bio??user.Bio;
                user.DisplayName = request.DisplayName??user.DisplayName;

                var Success =await _context.SaveChangesAsync()>0;
                if(Success) return Result<Unit>.Success(Unit.Value);
                return Result<Unit>.Failure("Failed to update profile");
            
            }
        }
    }
}