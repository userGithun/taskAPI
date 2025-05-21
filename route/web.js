const express = require('express')
const AdminController = require("../controller/AdminController");
const route = express.Router();




//admin
route.post('/phoneinsert', AdminController.phoneInsert)
route.get('/phonedisplay', AdminController.phoneDisplay)
route.get('/phoneview/:id', AdminController.phone_view)
route.delete('/phonedelete/:id', AdminController.phone_delete)
route.put('/phoneupdate/:id', AdminController.phone_update)

module.exports = route;