const validateIsClient = async (req, res, next ) => {
    if (!req.profile){
        console.error("PROFILE NOT RETRIEVED");
        return res.status(401).end()
    } 
    const {dataValues: profileData } = req.profile;
    if (profileData.type === 'client') return next();

    return res.status(401).send("YOU ARE NOT A CLIENT").end();
}

const validateIsContractor = async (req, res, next ) => {
    if (!req.profile){
        console.error("PROFILE NOT RETRIEVED");
        return res.status(401).end()
    } 
    const {dataValues: profileData } = req.profile;
    if (profileData.type === 'contractor') return next();
    
    return res.status(401).send("YOU ARE NOT A CONTRACTOR").end();
}

module.exports = {validateIsClient, validateIsContractor}