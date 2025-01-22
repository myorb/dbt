const getAllUnpaidJobs = async (req) => {
  const { Job, Contract } = req.app.get('models');
  const profile = req.profile;
  const profileType =
    profile.type === 'client'
      ? { ClientId: profile.id }
      : { ContractorId: profile.id };

  const jobs = await Job.findAll({
    where: {
      paid: null,
    },
    include: [
      {
        model: Contract,
        where: {
          status: 'in_progress',
          ...profileType,
        },
      },
    ],
  });

  return jobs;
};

const payJob = async (req) => {
  const { sequelize } = require('../model');
  const { Contract, Job, Profile } = req.app.get('models');
  const { id, balance } = req.profile;
  const { job_id } = req.params;
  const job = await Job.findOne({
    where: {
      id: job_id,
      paid: null,
    },
    include: [
      {
        model: Contract,
        where: { ClientId: id },
      },
    ],
  });
  const jobPrice = job?.price;
  const contractorId = job?.Contract?.ContractorId;

  if (!job) return { success: false, message: 'No unpaid job found' };
  if (balance < jobPrice)
    return {
      success: false,
      message: 'The user does not have enough funds on their balance',
    };

  const transaction = await sequelize.transaction();
  try {
    await Profile.update(
      { balance: sequelize.literal(`balance - ${jobPrice}`) },
      { where: { id } },
      { transaction }
    ),
      await Profile.update(
        { balance: sequelize.literal(`balance + ${jobPrice}`) },
        { where: { id: contractorId } },
        { transaction }
      ),
      await Job.update(
        { paid: 1, paymentDate: new Date() },
        { where: { id: job_id } },
        { transaction }
      ),
      await transaction.commit();

    return { success: true, message: 'Payment sucessfull' };
  } catch (error) {
    await transaction.rollback();
    console.log('error', error);
    return { success: false, message: 'Error while paying for the job' };
  }
};

module.exports = {
  getAllUnpaidJobs,
  payJob,
};
