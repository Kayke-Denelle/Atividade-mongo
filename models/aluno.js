const mongoose = require('mongoose');

const AlunoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    idade: { type: Number, required: true },
    ra: { type: String, required: true, unique: true },
    fk_idTurma: { type: mongoose.Schema.Types.ObjectId, ref: 'Disciplina' }
});

module.exports = mongoose.model('Aluno', AlunoSchema);
