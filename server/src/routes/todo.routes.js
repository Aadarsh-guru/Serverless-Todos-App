import { Router } from "express";
import prisma from "../config/dbConfig.js";
const router = Router();

router.post('/create-todo', async (req, res) => {
    try {
        const { content } = req.body;
        const todo = await prisma.todo.create({
            data: {
                content: content,
                userId: req.userId
            }
        });
        return res.status(201).json({
            message: 'Todo created successfully',
            success: true,
            todo: todo
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error while creating the todo',
            success: false,
            error: error.message
        });
    }
});

router.get('/get-todos', async (req, res) => {
    try {
        const todos = await prisma.todo.findMany({
            where: {
                userId: req.userId,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return res.status(200).json({
            message: 'Todos fetched successfully',
            success: true,
            todos: todos
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error while fetching todos',
            success: false,
            error: error.message
        });
    }
});

router.get('/get-todo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await prisma.todo.findUnique({
            where: {
                id: id
            }
        });
        return res.status(200).json({
            message: 'Todo fetched successfully',
            success: true,
            todo: todo
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error while fetching todo',
            success: false,
            error: error.message
        });
    }
});

router.put('/update-todo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const todo = await prisma.todo.update({
            where: {
                id: id
            },
            data: {
                content: content
            }
        });
        return res.status(200).json({
            message: 'Todo updated successfully',
            success: true,
            todo: todo
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error while updating todo',
            success: false,
            error: error.message
        });
    }
});

router.delete('/delete-todo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.todo.delete({
            where: {
                id: id
            }
        });
        return res.status(200).json({
            message: 'Todo deleted successfully',
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error while deleting todo',
            success: false,
            error: error.message
        });
    }
});


export default router;