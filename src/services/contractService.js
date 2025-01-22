const { Op } = require('sequelize');

const getContractById = async (req) => {
  const { Contract } = req.app.get('models');
  const profile = req.profile;
  const profileType = profile.type === 'client' ? { ClientId: profile.id } : { ContractorId: profile.id };
  const {id} = req.params;
  const contract = await Contract.findOne({
    where: {
      id,
      ...profileType,
    }
  });
  return contract;
};

const getAllContracts = async (req) => {
  const { Contract } = req.app.get('models');
  const profile = req.profile;
  const profileType = profile.type === 'client' ? { ClientId: profile.id } : { ContractorId: profile.id };

  const contracts = await Contract.findAll({
    where: {
      status: {
        [Op.ne]: 'terminated',
      },
      ...profileType
    },
  });
  return contracts;
};


module.exports = { getContractById, getAllContracts };
