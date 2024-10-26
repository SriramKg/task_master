const teamsModel = require('../database/Models/teams.model');
const userModel = require('../database/Models/users.model');

async function createNewTeam(req) {
    try {
        const { name, members } = req.body;
        if (!name || !members) {
            return {
                message: "Please provide all required fields",
                status: 400,
            };
        }

        const memberIds = await Promise.all(members.map(async (member) => {
            const user = await userModel.findOne({email : member});
            if (!user) {
                throw new Error(`User with id ${member} not found`);
            }
            return user._id;
        }));
        console.log(memberIds);
        const newTeam = new teamsModel({
            name,
            members: memberIds,
            createdBy: req.userInfo._id,
        });
        await newTeam.save();
        return {
            message: "Team created successfully",
            status: 201,
        };
    } catch (error) {
        throw new Error("Team not created ! " + error);
    }
}

module.exports = { createNewTeam };