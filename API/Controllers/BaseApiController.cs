using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public abstract class BaseApiController : ControllerBase
    {
    private IMediator? _mediator;

        protected IMediator Mediator => _mediator
        ??= HttpContext.RequestServices.GetRequiredService<IMediator>()
        ?? throw new InvalidOperationException("The mediator service is unavailable");
    }
}
