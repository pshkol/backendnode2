const db = {
  'user': [
    { id: 1, name: 'Carlos' },
    { id: 2, name: 'Pablo'}
  ]
};

async function list(table) {
  return await db[table] || [];
}

async function get(table, id) {
  let col = await list(table);
  return col.filter(item => {
    item.id === id;
  })[0] || null;
}

async function upsert(table, data) {
  if (!db[table]) {
    db[table] = [];
  }

  db[table].push(data);
}

async function _find(table, id) {
  return await db[table].find(function (element) {
    return element.id === id;
  })
}

async function remove(table, id) {
  const el = await _find(table, id);
  const index = db[table].indexOf(el);

  return db[table].splice(index, 1);
}

async function query(table, q) {
  let col = await list(table);
  let keys = Object.keys(q);
  let key = keys[0];
  return col.find(item => item[key] === q[key]) || null;
}

module.exports = {
    list,
    get,
    upsert,
    remove,
    query
}
