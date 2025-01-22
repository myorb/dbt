const JobService = require('../services/jobService');

const getAllUnpaidJobs = async (req, res) => {
  try {
    const jobs = await JobService.getAllUnpaidJobs(req);
    if (jobs) {
      res.status(200).json({
        success: true,
        data: jobs
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'no upaid job found'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error
    });
  }
};

const payJob = async (req, res) => {
  try {
    const response = await JobService.payJob(req);
    if (response.success) {
      res.status(200).json(response);
    } else {
      res.status(400).json(response);
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Error occurred while paying for a job',
      error
    });
  }
};

module.exports = {
  getAllUnpaidJobs,
  payJob,
};
