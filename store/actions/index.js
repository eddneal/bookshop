export const loadItems = (items = [], loaded = true) => ({
  type: 'DATA_LOADED',
  items,
  loaded,
});
