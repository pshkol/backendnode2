const express = require('express');

const secure = require('./secure');
const response = require('../../../network/response');
const controller = require('./index');

const router = express.Router();

router.get('/', list);
router.get('/:id', get);
router.post('/', upsert);
router.delete('/', remove);
router.put('/', secure('update'), upsert);

function list(req, res) {
  controller.list()
    .then(function (lista) {
      response.success(req, res, lista, 200);
    })
    .catch(function (error) {
      response.error(req, res, error.message, 500);
    })
}

function get (req, res) {
  controller.get(req.params.id)
  .then(function (user) {
    response.success(req, res, user, 200);
  })
  .catch(function (error) {
    response.error(req, res, error.message, 500);
  })
}

function upsert(req, res) {
  controller.upsert(req.body)
    .then(function () {
      response.success(req, res, '[network] Usario creado', 200);
    })
    .catch(function (error) {
      response.error(req, res, `[network] Usuario no creado: ${error}`, 500);
    })
}

function remove(req, res) {
  controller.remove(req.body.id)
    .then(function () {
      response.success(req, res, 'Usuario eliminado', 200);
    })
    .catch(function (error) {
      response.error(req, res, '[network] Hubo un problema al eliminar el usuario');
    })
}

module.exports = router;
