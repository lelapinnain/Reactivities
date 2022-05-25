using Application.Interfaces;
using Application.Photos;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace Infrastructure.Photos
{
    public class PhotoAccessor : IPhotoAccessor
    {
        private readonly Cloudinary _Cloudinary;

        public PhotoAccessor(IOptions<CloudinarySettings> opt)
        {
          var account = new Account(
              opt.Value.CloudName ,
              opt.Value.ApiKey,
              opt.Value.ApiSecret
          ) ;
          _Cloudinary = new Cloudinary(account);
        }

        public async Task<PhotoUploadResult> AddPhoto(IFormFile file)
        {
            if(file.Length>0){
                await using var stream = file.OpenReadStream();

                var uploadParams = new ImageUploadParams{
                    File = new FileDescription(file.FileName , stream),
                    Transformation = new Transformation().Height(500).Width(500).Crop("fill")
                };

                var uploadResult = await _Cloudinary.UploadAsync(uploadParams);

                if(uploadResult.Error !=null){
                    throw new Exception(uploadResult.Error.Message);
                }
                return new PhotoUploadResult{
                    PublicId = uploadResult.PublicId,
                    URL = uploadResult.SecureUrl.ToString()
                };
            }
            return null;
        }

        public async Task<string> DeletePhoto(string PublicId)
        {
           var deleteParams = new DeletionParams(PublicId);
           var result = await _Cloudinary.DestroyAsync(deleteParams);

          return result.Result=="ok"?result.Result:null;
        }
    }
}