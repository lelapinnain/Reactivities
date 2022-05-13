namespace Application.Core
{
    public class Result<T>
    {
        public bool isSucess { get; set; }
        public T Value { get; set; } 
        public string Error { get; set; }   

        public static Result<T> Success (T value)=>new Result<T>{isSucess=true , Value = value};
        public static Result<T> Failure (string error)=>new Result<T>{isSucess=false , Error = error};
        
    }
}