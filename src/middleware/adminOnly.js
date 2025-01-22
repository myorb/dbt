
const adminOnly = async (req, res, next) => {
    const id = req.get('profile_id')

    if(id !== 'admin') return res.status(401).end()

    next()
}

module.exports = {adminOnly}