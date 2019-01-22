const request = require('request');

export default params => new Promise((resolve, reject) => {
  const { searchTerm = '', perPage = 10, filter } = params;
  const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=${perPage}${filter !== 'none' ? `&filter=${filter}` : ''}`;
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

