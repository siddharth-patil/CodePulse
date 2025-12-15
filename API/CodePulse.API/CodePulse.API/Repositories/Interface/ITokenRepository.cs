using Microsoft.AspNetCore.Identity;

namespace CodePulse.API.Repositories.Interface
{
    public interface ITokenRepository
    {
        string CreateJetToken(IdentityUser user, List<string> roles);
    }
}
