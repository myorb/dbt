const ContractService = require('../services/contractService');

const getContractById = async (req, res) => {
  try {
    const contract = await ContractService.getContractById(req);
    if (contract) {
      res.status(200).json({
        success: true,
        data: contract
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'contract not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error
    });
  }
};

const getAllContracts = async (req, res) => {
  try {
    const contracts = await ContractService.getAllContracts(req);
    if (contracts) {
      res.status(200).json({
        success: true,
        data: contracts
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'contract not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error
    });
  }
};

module.exports = {
  getContractById,
  getAllContracts,
};
