const TABLA = 'user';
const nanoid = require('nanoid').nanoid;
const auth =  require('../auth');

module.exports = function (injectedStore) {
  let store = injectedStore;

  if (!store) {
    store = require('../../../store/dummy');
  }

  function list() {
    return store.list(TABLA);
  }

  function get(id) {
    return store.list(TABLA, id);
  }

  async function upsert(body) {
    const user = {
      id: nanoid(),
      name: body.name,
      username: body.username
    }

    if (body.password || body.username) {
      await auth.upsert({
        id: user.id,
        username: user.username,
        password: body.password
      })
    }

    store.upsert(TABLA, user);
  }

  function remove(id) {
    return store.remove(TABLA, id);
  }

  return {
    list,
    get,
    upsert,
    remove
  }
}
