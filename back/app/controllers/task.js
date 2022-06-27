const { Task } = require('../models');

const taskController = {

    listTasks: async function (req, res) {
        try {
            // Récupérer la liste des taches
            const tasks = await Task.findAll()//{order:[['position', 'ASC']]}
            // Renvoyer la liste des taches en json             
            res.json(tasks)
        } catch (error) {
            // reponse sans détail structuel pour le consommateur de ma bdd
            res.status(500).json({
            message: 'Erreur lors de la récupération des tâches',
            });
        }
    },

    createTasks: async function(req, res) {
        try {
            // Création d'une liste de tâche
            const {name} = req.body;
            console.log(name);
            // on peut valider les données qu'on reçoit et prévoir une réponse custom
            if (!name) {
                res.status(400).json({
                message: 'Le champ name est obligatoire!',
                });
            }
            else {
                // j'utilise .creat pour une nouvelle entrie en BDD
                const newList = await Task.create({
                    name,                
                });
                
                res.json(newList);
            }
        } catch (error) {
            // reponse sans détail structuel pour le consommateur de ma bdd
            res.status(500).json({
            message: 'Erreur lors de la récupération des tâches',
            });
        }
    },

    updateTasks: async function (req, res) {
        const {id} = req.params;
        const {name} = req.body;
        try {
            const task = await Task.findByPk(id)            
            if(task){
                if(name){
                    task.name = name
                    await task.save()
                }
                res.status(204)
            }
        } catch (error) {
            res.status(500).json({
            message: 'Erreur lors de la modification de la tâche',
            });
        }
    },

    deleteTasks: async function (req, res) {
        const {id} = req.params;
        try {
            const taskById = await Task.findByPk(id)
            const destroyedTask = await taskById.destroy()
            res.json(destroyedTask)
          } catch (error) {
            res.status(500).json({
                message: 'Erreur lors de la suppression  de la tâche',
              });
          }
    }
};

module.exports = taskController;
