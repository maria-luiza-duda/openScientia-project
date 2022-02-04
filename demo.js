let bcrypt = require('bcryptjs')

var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("12345", salt);

console.log(bcrypt.compareSync("abcde", hash)); 
console.log(bcrypt.compareSync("12345", hash)); 