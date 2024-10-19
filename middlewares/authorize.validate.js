
async function authorizeUser(req, res, next) {
    if (req.userInfo.role.includes('ScrumMaster') || req.userInfo.role.includes('ProductOwner')) {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden. You are not authorized to do this action.' });
    }
}

async function authorizeUserForUpdate(req, res, next) {
    if (req.userInfo.role.includes('ScrumMaster') || req.userInfo.role.includes('ProductOwner') || req.userInfo.role.includes('Developer') || req.userInfo.role.includes('QA')) {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden. You are not authorized to do this action.' });
    }
}

module.exports = {authorizeUser, authorizeUserForUpdate};