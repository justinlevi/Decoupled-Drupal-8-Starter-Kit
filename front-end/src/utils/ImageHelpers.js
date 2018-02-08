export function readFile(file, maxWidth, maxHeight, fn) {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function (event) {
    var dataUrl = event.target.result;

    var image = new Image();
    image.src = dataUrl;
    image.onload = () => {
      var resizedDataUrl = resizeImage(image, maxWidth, maxHeight, 0.7);
      fn(resizedDataUrl);
    };
  }
}

export function resizeImage(image, maxWidth, maxHeight, quality) {
  var canvas = document.createElement('canvas');

  var width = image.width;
  var height = image.height;

  if (width > height) {
    if (width > maxWidth) {
      height = Math.round(height * maxWidth / width);
      width = maxWidth;
    }
  } else {
    if (height > maxHeight) {
      width = Math.round(width * maxHeight / height);
      height = maxHeight;
    }
  }

  canvas.width = width;
  canvas.height = height;

  var ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0, width, height);
  return canvas.toDataURL("image/jpeg", quality);
}

export function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, {type: contentType});
  return blob;
}