const express = require("express");
const router = express.Router();
const Program = require("../models/program");

// Index Route

router.get("/", async (req, res) => {
const programDetails = await Program.find()

 res.render("admin/admin.ejs", {programDetails : programDetails });
  
})    

module.exports = router;
