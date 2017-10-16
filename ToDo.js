require('mongoose-type-url');
var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
  id: String,
  image: mongoose.SchemaTypes.Url,
  categories: [String]
});

module.exports = mongoose.model('Todo', TodoSchema);
