const depositById = async (req, res) => {
  const sequelize = req.app.get('sequelize');
  const { Profile, Contract, Job } = req.app.get('models');

  const { userId } = req.params;
  const { amount } = req.body;

  if (!amount)
    return { success: false, message: 'request doest not have amount' };

  const totalUnpaidAmount = await Job.sum('price', {
    where: {
      paid: null,
    },
    include: [
      {
        model: Contract,
        where: {
          status: 'in_progress',
          ClientId: userId,
        },
      },
    ],
  });

  const maxDeposit = totalUnpaidAmount / 4;

  if (amount >= maxDeposit)
    return {
      success: false,
      message: 'Cannot deposit more than 25% your total of jobs to pay',
    };

  const client = await Profile.findOne({
    where: {
      id: userId,
    },
  });

  if (!client) return res.status(404).end();

  const t = await sequelize.transaction();

  try {
    client.balance += amount;
    await client.save({ transaction: t });
    await t.commit();

    return { success: true, data: client };
  } catch (error) {
    await t.rollback();
    console.log('error', error);

    return { success: false, message: 'Error while depositing money' };
  }
};

module.exports = { depositById };
