var express = require('express');
var router = express.Router();
var dao = require('../database/dao')

router.get('/', function(req, res) {
    dao.list().then(([rows]) => {
        res.render('autores/list', {autores: rows})
    }).catch(err => {
        console.log(err)
        res.render('autores/list', {autores: []})
    })
});

router.post('/delete', function (req, res) {
    dao.remove(req.body.id)
    .then(([result]) => {
        console.log(result)
        if (result.affectedRows > 0)
            req.flash('success', 'Autor excluído da base.')
        else
            req.flash('success', `Não foi encontrado autor com o id = ${req.body.id}`)
        res.redirect('/autores')
    }).catch(err => {
        console.log(err)
        req.flash('error', 'Não foi possível excluir o autor.')
        res.redirect('/autores')
    });
});

router.get('/form', async function(req, res) {
    let row = {
        id: '',
        nome: '',
        email:'',
        area: '',
        password:''
    }
    if(req.query.id){
        [result] = await dao.findById(req.query.id)
        row = result[0]
    }   
    res.render('autores/form', {autor: row})
});

router.post('/save', function(req, res) {
    if (req.body.id) {
        operacao = dao.update
        success = `Dados do autor atualizados com sucesso.`
    }else{
        operacao = dao.save
        success = `Autor cadastrado com sucesso.`
    }

    operacao(req.body)
    .then(([result]) => {
        req.flash('success', success)
        res.redirect('/autores') 
    }).catch(err => {
        console.log(err)
        req.flash('error', `Não foi possível cadastrar o autor.`)
        res.redirect('/autores')
    })
})

router.get('/search', function(req, res) {
    if (req.query.nome){
        dao.search(req.query.nome)
        .then(([rows])=>{
            res.render('autores/list', {autores: rows})
        }).catch( err => {
            console.log(err)
            req.flash('error', 'Não foi possível efetuar busca por nome.')
            res.redirect('/autores')
        })
    }else{
        res.redirect('/autores')
    }
})

module.exports = router