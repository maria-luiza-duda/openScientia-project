const pool = require('./config')

let operations = {
    list: function() {
        return pool.promise().query('select * from autores')
    },
    findById: function(id) {
        return pool.promise().query('select * from autores where id=?', [id])
    },
    findByNome: function(nome) {
        return pool.promise().query('select * from autores where nome=?', [nome])
    },
    save: function(autor) {
        return pool.promise().execute('INSERT INTO autores (nome, email, area, password) VALUES (?, ?, ?, ?)', [autor.nome, autor.email, autor.area, autor.password])
    },
    update: function(autor) {
        return pool.promise().execute('UPDATE autores set nome=?, email=?, area=?, password=? where id=?',
        [autor.nome, autor.email, autor.area, autor.password, autor.id])
    },
    remove: function(id) {
        return pool.promise().execute('delete from autores where id=?', [id])
    },
    search: function(nome) {
        return pool.promise().query('select * from autores where nome like ?', ['%'+nome+'%'])
    }
}

module.exports = operations