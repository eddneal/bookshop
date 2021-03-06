const routes = module.exports = require('next-routes')();

const definedRoutes = [
  {
    name: 'index',
    path: '/',
    page: 'index',
  },
  {
    name: 'about',
    path: '/about',
    page: 'about',
  },
  {
    name: 'search',
    path: '/search',
    page: 'search',
  },
];

definedRoutes.map((route) => {
  const { name, path, page } = route;
  routes.add({ name, pattern: path, page });
});
