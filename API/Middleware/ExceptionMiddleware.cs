using System.Net;
using System.Text.Json;
using Application.Core;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        public RequestDelegate Next { get; set; }
        public ILogger<Exception> Logger { get; set; }
        public IHostEnvironment Env { get; set; }
        public ExceptionMiddleware(RequestDelegate next, ILogger<Exception> logger, IHostEnvironment env)
        {
            Env = env;
            Logger = logger;
            Next = next;

        }

        public async Task InvokeAsync(HttpContext context){
            try
            {
                await Next(context);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.Message);

                context.Response.ContentType="application/json";
                context.Response.StatusCode = (int) HttpStatusCode.InternalServerError;

                var res = Env.IsDevelopment()? new AppExceptions(context.Response.StatusCode , ex.Message , ex.StackTrace.ToString()):
                 new AppExceptions(context.Response.StatusCode , "Server Error" );
                 var options = new JsonSerializerOptions{
                     PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                 };
                 var Json = JsonSerializer.Serialize(res ,options );
                 await context.Response.WriteAsync(Json);
            }
        }
    }
}