namespace Domain
{
    public class Comment
    {
        public int Id { get; set; }
        public string Body { get; set; }
        public AppUsers Author { get; set; }
        public Activity Activity { get; set; }
        public DateTime CreatedAt { get; set; }= DateTime.UtcNow;
    }
}