const AdminService = require('../services/adminService');

const getBestProfession = async (req, res) => {
  try {
    const bestProfessions = await AdminService.getBestProfession(req);

    if (bestProfessions.success) {
      res.status(200).json(bestProfessions);
    } else {
      res.status(400).json(bestProfessions);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error occurred while finding best profession',
      error,
    });
  }
};

const getBestClients = async (req, res) => {
  try {
    const bestClients = await AdminService.getBestClients(req);

    if (bestClients.success) {
      res.status(200).json(bestClients);
    } else {
      res.status(400).json(bestClients);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error occurred while finding best Client',
      error,
    });
  }
};

module.exports = {
  getBestProfession,
  getBestClients,
};
