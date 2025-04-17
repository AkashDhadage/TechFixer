const express = require('express');
const router = express.Router();
const Order = require('../../model/order.model.js')

// GET: Electrician Dashboard (Task Stats)
router.get('/dashboard',  async (req, res) => {
  const electricianId = "67f10f5d80924c648e44016b";

  const allOrders = await Order.find({ electrician: electricianId });

  const stats = {
    total: allOrders.length,
    assigned: allOrders.filter(o => o.status === 'Assigned').length,
    inProgress: allOrders.filter(o => o.status === 'In Progress').length,
    completed: allOrders.filter(o => o.status === 'Completed').length,
    cancelled: allOrders.filter(o => o.status === 'Cancelled').length,
  };

  res.render('electrician/pages/electrician-dashboard', { stats });
});

// GET: Assigned tasks
router.get('/tasks', async (req, res) => {
    const filter = req.query.status;
    const query = { electrician: "67f10f5d80924c648e44016b" };
    if (filter && filter !== 'All') {
      query.status = filter;
    }
  
    const tasks = await Order.find(query)
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
  
    res.render('electrician/pages/electrician-tasks', { tasks, filter: filter || 'All' });
  });

// POST: Update task status
router.post('/tasks/:id/status',  async (req, res) => {
  const { status } = req.body;
  const order = await Order.findOne({ _id: req.params.id, electrician: "67f10f5d80924c648e44016b"  });
  if (!order) return res.status(403).send('Not authorized');
  order.status = status;
  await order.save();
  res.redirect('/electrician/tasks');
});

module.exports = router;
