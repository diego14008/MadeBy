const express = require('express');
const router = express.Router();
const validationHandler = require('../../../utils/middlewares/validationHandler');
const checkjwt = require('../../../utils/middlewares/auth/checkJwt');
// eslint-disable-next-line no-unused-vars
const { projectIdSchema, createProjectSchema, editProjectSchema } = require('../../../utils/validations/schemas/project');
const controller = require('./controller');

router.get('/:id', validationHandler({id: projectIdSchema}, 'params'), async (req, res, next) => {
    const { id } = req.params;
    try {
        const project = await controller.getOneById(id);
        res.status(200).json({
            message: "Ok",
            project
        })
    } catch (error) {
        next(error);
    }
});

router.post('/', validationHandler(createProjectSchema), checkjwt, async (req, res, next) => {
    const { title, description, technologies, rol, repository, url } = req.body;
    const { userData } = req;
    try {
        const created = await controller.saveProject(title, description, technologies, rol, repository, url, userData);
        res.status(201).json({
            message: "ok",
            project: created
        })
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', validationHandler({id: projectIdSchema}, 'params'), checkjwt, async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await controller.deleteOne(id, req.userData);
        console.log(data)
        res.status(200).json({
            message:"Deleted success"
        })
    } catch (error) {
        next(error);
    }
});

router.put('/:id', validationHandler({id: projectIdSchema}, 'params'), validationHandler(editProjectSchema), checkjwt, async (req, res, next) => {
    
    const { id } = req.params;
    const { title, description, technologies, rol, repository, url } = req.body;

    try {
        const updated = await controller.updateProject(id, title, description, technologies, rol, repository, url, req.userData);

        res.status(200).json({
            message: 'Update success.',
            project: updated
        })
    } catch (error) {
        next(error);
    }
});

router.get('/user/:id', validationHandler({id: projectIdSchema}, 'params'), async (req, res, next) => {
    const { id } = req.params;
    try {
        const projects = await controller.getProjectsOf(id);
        res.status(200).json({
            message:'Your projects.',
            projects
        })
    } catch (error) {
        next(error);
    }
});

module.exports = router;