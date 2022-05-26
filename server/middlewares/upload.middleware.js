const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

exports.uploadFiles = async (req, l) => {
  let photos = [];
  if (req.files !== null) {
    for (let j = 0; j < req.files.length; j++) {
      if (req.files[j] !== null) {
        try {
          if (
            req.files[j].detectedMimeType != "image/jpg" &&
            req.files[j].detectedMimeType != "image/png" &&
            req.files[j].detectedMimeType != "image/jpeg" &&
            req.files[j].detectedMimeType != "image/webp"
          ) {
            throw Error("invalid file");
          }

          if (req.files[j].size > 5000000) throw Error("max size");
        } catch (err) {
          throw Error(err);
        }
        const filename = req.params.id + `(${j + 1 + l})` + ".jpg";

        await pipeline(
          req.files[j].stream,
          fs.createWriteStream(
            `${__dirname}/../client/uploads/products/${filename}`
          )
        );
        photos.push("./uploads/products/" + filename);
      }
    }
    return photos;
  }
  return null;
};

exports.deleteFile = async (file) => {
  const filename = `${__dirname}/../client/public/` + file;
  fs.unlink(filename, (err) => {
    if (err) {
      throw Error(err);
    }
  });
};