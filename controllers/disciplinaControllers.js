const express = require('express');
const Disciplina = require('../models/Disciplina');
const Aluno = require('../models/Aluno');
const router = express.Router();

router.get('/disciplina', async (req, res) => {
    try {
        const disciplinas = await Disciplina.find();
        res.json(disciplinas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/disciplina:id', async (req, res) => {
    try {
        const disciplina = await Disciplina.findById(req.params.id);
        if (!disciplina) return res.status(404).json({ message: 'Disciplina não encontrada' });

        const alunos = await Aluno.find({ fk_idTurma: disciplina._id });
        res.json({ disciplina, alunos });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/disciplina', async (req, res) => {
    const disciplina = new Disciplina(req.body);
    try {
        const novaDisciplina = await disciplina.save();
        res.status(201).json(novaDisciplina);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.patch('/disciplina:id', async (req, res) => {
    try {
        const disciplina = await Disciplina.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!disciplina) return res.status(404).json({ message: 'Disciplina não encontrada' });
        res.json(disciplina);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/disciplina:id', async (req, res) => {
    try {
        const disciplina = await Disciplina.findByIdAndDelete(req.params.id);
        if (!disciplina) return res.status(404).json({ message: 'Disciplina não encontrada' });

        await Aluno.deleteMany({ fk_idTurma: disciplina._id });
        res.json({ message: 'Disciplina e alunos associados removidos' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
