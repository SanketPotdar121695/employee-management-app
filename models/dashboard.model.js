const mongoose = require('mongoose');

const dashboardSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    department: {
      type: String,
      enum: ['Tech', 'Marketing', 'Operations'],
      required: true
    },
    salary: { type: String, required: true },
    userID: String
  },
  {
    versionKey: false
  }
);

const DashboardModel = mongoose.model('dashboard', dashboardSchema, "dashboard");

module.exports = { DashboardModel };
