const express = require('express');

const server = express();


server.use(express.json());

let numeroRequisicoes = 0;

function checkProjectExists(req,res,next) {

    const { id }    = req.params;
    const project   = projects.find(p => p.id == id);
    
    if(!project){
        return res.status(400).json({error:'Projeto não existe'});
    }

    return next();
}


server.use( (req, res, next) => {
    numeroRequisicoes++;

    console.log(`Número de requisições: ${numeroRequisicoes}`);

    next();
});

const projects = [];

server.get('/projects', (req, res) => {
    return res.json(projects);
});

server.post('/projects',  (req, res) => {
    
    const { id, title } = req.body;

    const newProjet = {
        id,
        title,
        tasks:[]
    };

    newProjet.id    = id;
    newProjet.title = title;

    projects.push(newProjet);
    return res.json(projects);

});

server.put('/projects/:id', checkProjectExists,  (req, res) => {

    const { id } = req.params;
    
    const { title } = req.body;

    const project = projects.find(p => p.id == id);

    project.title = title;

    return res.json(projects);
});

server.delete('/projects/:id', checkProjectExists,  (req,res) => {
    const { id } = req.params;

    const project = projects.find(p => p.id == id);

    projects.splice(project,1);
    return res.send({message:'Projeto deletado com sucesso'});
});

server.post('/projects/:id/tasks', checkProjectExists,  (req, res) => {

    const { id } = req.params;
    
    const { title } = req.body;

    const project = projects.find(p => p.id == id);

    project.tasks.push(title);

    return res.json(projects);

});


server.listen(3000);