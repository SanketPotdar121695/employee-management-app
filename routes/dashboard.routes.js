const { Router } = require('express');
const { auth } = require('../middlewares/auth.middleware');
const { DashboardModel } = require('../models/dashboard.model');

const dashboardRouter = Router();

dashboardRouter.use(auth);

dashboardRouter.post('/employees', async (req, res) => {
  try {
    let employee = new DashboardModel(req.body);
    await employee.save();

    return res
      .status(200)
      .send({ message: 'A new employee has been added to the DB.' });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});

module.exports = { dashboardRouter };
