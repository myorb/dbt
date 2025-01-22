const ProfileService = require('../services/profileService');

const depositById = async (req, res) => {
  try {
    const response = await ProfileService.depositById(req);
    if (response.success) {
      res.status(200).json(response);
    } else {
      res.status(400).json(response)
    }

  } catch (error) {
    console.trace(error)
    res
      .status(500)
      .json({
        success: false,
        message: 'Error occurred while depositing money. Please try again' + error
      });
  }
};

module.exports = {
  depositById,
};
