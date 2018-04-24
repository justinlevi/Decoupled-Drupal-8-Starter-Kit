// const support = {
//   searchParams: 'URLSearchParams',
//   iterable: 'Symbol' && 'iterator' in Symbol,
//   blob: 'FileReader' && 'Blob' && (() => {
//     try {
//       new Blob();
//       return true;
//     } catch (e) {
//       return false;
//     }
//   })(),
//   formData: 'FormData',
//   arrayBuffer: 'ArrayBuffer',
// };

const parseHeaders = (rawHeaders) => {
  const headers = new Headers();
  // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
  // https://tools.ietf.org/html/rfc7230#section-3.2
  const preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
  preProcessedHeaders.split(/\r?\n/).forEach((line) => {
    const parts = line.split(':');
    const key = parts.shift().trim();
    if (key) {
      const value = parts.join(':').trim();
      headers.append(key, value);
    }
  });
  return headers;
};

export default (url, opts = {}, onProgress) => new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();

  xhr.onload = () => {
    const options = {
      status: xhr.status,
      statusText: xhr.statusText,
      headers: parseHeaders(xhr.getAllResponseHeaders() || ''),
    };
    options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
    const body = 'response' in xhr ? xhr.response : xhr.responseText;
    resolve(new Response(body, options));
  };

  // e.target only exists on the completion event -
  // this bypasses the ProgressEvent from triggering the promise
  // xhr.onload = e => resolve(e.target);

  xhr.onerror = () => {
    reject(new TypeError('Network request failed'));
  };

  xhr.ontimeout = () => {
    reject(new TypeError('Network request failed'));
  };

  xhr.open(opts.method, url, true);

  Object.keys(opts.headers).forEach((key) => {
    xhr.setRequestHeader(key, opts.headers[key]);
  });

  console.log(xhr.upload);

  // event.loaded / event.total * 100 ; //event.lengthComputable
  if (xhr.upload && onProgress) {
    console.log(onProgress);
    xhr.upload.onprogress = onProgress;
  }

  xhr.send(opts.body);
});
