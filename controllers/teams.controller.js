const { createNewTeam } = require("../services/teams.service");

async function createTeam(req, res) {
    try {
        const { message, status } = await createNewTeam(req);
        res.status(status).send({
            message,
        });
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error " + error.message,
        });
    }
}

module.exports = createTeam;