const { Op } = require("sequelize");

const getBestProfession = async (req) => {
    const { Contract, Profile, Job } = req.app.get('models');
    const { start, end } = req.query;

    const startDate = new Date(start);
    const endDate = new Date(end);

    if (startDate == 'Invalid Date' || endDate == 'Invalid Date') return { success: false, message: "start and end date should be in valid format" };

    const paidJobs = await Job.findAll({
        where: {
            paid: true,
            [Op.or]: [
                {
                    createdAt: {
                        [Op.between]: [startDate, endDate]
                    }
                },
                {
                    updatedAt: {
                        [Op.between]: [startDate, endDate]
                    }
                }
            ]
        },
        include: [
            {
                model: Contract,
                include: [
                    {
                        model: Profile,
                        as: 'Contractor',
                        where: { type: 'contractor' }
                    }
                ]
            }
        ]
    });

    if (paidJobs.length == 0) return { success: false, message: 'No paid jobs performed in that period of time' };

    const professionMap = paidJobs.reduce((result, job) => {
        const profession = job.Contract.Contractor.profession;
        if (result[profession]) {
            result[profession] += job.price;
        } else {
            result[profession] = job.price;
        }
        return result;
    }, {});
    let bestProfession = 0;
    let maxMoney = 0;
    for (let profession in professionMap) {
        if (professionMap[profession] > maxMoney) {
            maxMoney = professionMap[profession];
            bestProfession = profession;
        }
    }
    return { success: true, data: { bestProfession, total: maxMoney } };
};

const getBestClients = async (req, res) => {
    const { sequelize } = require('../model');
    const { Contract, Profile, Job } = req.app.get('models');
    const { start, end, limit } = req.query;

    const startDate = new Date(start);
    const endDate = new Date(end);
    const countLimit = parseInt(limit ? limit : 2);

    if (startDate == 'Invalid Date' || endDate == 'Invalid Date') return { success: false, message: "start and end date should be in valid format" };
    if (isNaN(countLimit)) return { success: false, message: "Limit is not a number" };

    const paidJobs = await Job.findAll({
        attributes: [[sequelize.fn('sum', sequelize.col('price')), 'totalPaid'],],
        order: [[sequelize.fn('sum', sequelize.col('price')), 'DESC']],
        where: {
            paid: true,
            paymentDate: {
                [Op.between]: [startDate, endDate]
            }
        },
        include: [
            {
                model: Contract,
                include: [
                    {
                        model: Profile,
                        as: 'Client',
                        where: { type: 'client' },
                        attributes: ['firstName', 'lastName']
                    }
                ],
                attributes: ['ClientId']
            }
        ],
        group: 'Contract.ClientId',
        limit: countLimit
    });

    const paidPerClient = paidJobs.map(function (pc) {
        return {
            id: pc.Contract.ClientId,
            fullName: pc.Contract.Client.firstName + ' ' + pc.Contract.Client.lastName,
            paid: pc.dataValues.totalPaid
        };
    });

    return { success: true, data: paidPerClient };
};

module.exports = { getBestClients, getBestProfession };