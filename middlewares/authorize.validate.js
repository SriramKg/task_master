
async function authorizeUser(req, res, next) {
    if (req.roles.includes('ScrumMaster') || req.roles.includes('ProductOwner')) {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden. You are not authorized to do this action.' });
    }
}

module.exports = authorizeUser;