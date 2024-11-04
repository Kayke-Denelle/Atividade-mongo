const express = require('express');
const Aluno = require('../models/Aluno');
const Disciplina = require('../models/Disciplina');
const router = express.Router();

// GET: Listar todos os alunos com suas disciplinas
router.get('/aluno', async (req, res) => {
    try {
        const alunos = await Aluno.find().populate('fk_idTurma');
        res.json(alunos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET by ID: Buscar um aluno pelo ID
router.get('/aluno:id', async (req, res) => {
    try {
        const aluno = await Aluno.findById(req.params.id).populate('fk_idTurma');
        if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado' });
        res.json(aluno);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST: Adicionar um novo aluno
router.post('/aluno', async (req, res) => {
    const aluno = new Aluno(req.body);
    try {
        const novoAluno = await aluno.save();
        res.status(201).json(novoAluno);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PATCH: Atualizar informações do aluno
router.patch('/aluno:id', async (req, res) => {
    try {
        const aluno = await Aluno.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado' });
        res.json(aluno);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE: Remover um aluno
router.delete('/aluno:id', async (req, res) => {
    try {
        const aluno = await Aluno.findByIdAndDelete(req.params.id);
        if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado' });
        res.json({ message: 'Aluno removido' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
