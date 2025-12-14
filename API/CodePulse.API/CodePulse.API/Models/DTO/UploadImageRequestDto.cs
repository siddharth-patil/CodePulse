namespace CodePulse.API.Models.DTO
{
    public class UploadImageRequestDto
    {
        public IFormFile File { get; set; } = default!;
        public string FileName { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
    }
}
