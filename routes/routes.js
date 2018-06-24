const routes = module.exports = require('next-routes')();

const definedRoutes = [
  {
    name: 'index',
    path: '/',
    page: 'index',
  },
];

definedRoutes.map((route) => {
  const { name, path, page } = route;
  routes.add({ name, pattern: path, page });
});
