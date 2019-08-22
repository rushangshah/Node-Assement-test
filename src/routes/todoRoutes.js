import express from 'express';
import { todoController } from '../controllers';
import { verifyToken } from '../lib/auth';

const routes = express.Router();
// Token verify
routes.all('/todoOpration', verifyToken);

// Insert Data route
routes.post('/todoOpration', async (req, res, next) => {
    try {
            const record = await todoController
    .create(req.body, req.decoded.data._id);

        res.status(201).json({ success: true, record });
    }
    catch (error) {
        console.log(error.message);
        next(error);
    }
});


// get all data route
routes.get('/todoOpration', async (req, res, next) => {
    try {
        const record = await todoController.getAll(req.decoded.data._id);
        res.status(200).json({ success: true, record });
    }
    catch (error) {
        next(error);
    }
});

// get data by id route
routes.get('/todoOpration/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const record = await todoController.get(id);
        res.status(200).json({ success: true, record });
    }
    catch (error) {
        next(error);
    }
});

//Update data by id route
routes.put('/todoOpration/:id', async (req, res, next) => {
    try {
        const id = req.params.id;

        const record = await todoController.update(id, req.body);

        res.status(200).json({ success: true, record });
    }
    catch (error) {
        next(error);
    }
});


// Delete data by id route
routes.delete('/todoOpration/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        console.log(`body: ${JSON.stringify(req.body, null, 2)} params: ${id}`);

        const record = await todoController.remove(id);

        res.status(200).json({ success: true, record });
    }
    catch (error) {
        next(error);
    }
});

export default routes;