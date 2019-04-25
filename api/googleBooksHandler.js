const request = require('request');

export default params => new Promise((resolve, reject) => {
  const  searchParams = new URLSearchParams();
  Object.entries(params).forEach(param => (param[0] !== 'filter' || param[1] !== 'none') && searchParams.set(param[0], param[1]));
  const url = `https://www.googleapis.com/books/v1/volumes?q=${searchParams.toString()}`;
  request(url, (err, resp, body) => {
    if (err) return reject(err);
    if (resp.statusCode === 200) {
      const data = JSON.parse(body);
      if ('items' in data) return resolve(data);
      return reject(new Error('No books found'));
    }
    return reject(new Error('Server error (non 200 status code)'));
  });
});
