const express = require('express');
const router = express.Router();
const apiController = require('../controller/apiController');

router.get('/home', (req, res)=>{
    res.send('Bem vindo a api de cep');
})
router.post('/inserirCep', apiController.inserirCep);
router.get('/buscarCep/:cep', apiController.buscarCep);
router.get('/buscarPorid/:id', apiController.buscarPorid);
router.get('/filtrarPorCidade', apiController.filtrarPorCidade);
router.put('/updateEndereco/:id', apiController.updateEndereco);
router.delete('/deleteEndereco/:id', apiController.deleteEndereco);

module.exports = router;