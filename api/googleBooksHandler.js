const request = require('request');

export default (searchTerm = 'william+gibson') => {
  return new Promise((resolve, reject) => {
    request(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`, (err, resp, body) => {
      if (err) return reject(err);
      if (resp.statusCode === 200) {
        const data = JSON.parse(body);
        if ('items' in data) return resolve(data);
        return reject(new Error('No books found'));
      }
    });
  });
};
