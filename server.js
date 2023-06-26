if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }
  
  const express = require("express");
  const app = express();
  const passport = require("passport");
  const flash = require("express-flash");
  const session = require("express-session");
  const methodOverride = require("method-override");
  const db = require("./config/db");
  const User = require("./models/users");
  
  
  
  const indexRouter = require("./routes/index");
  const adminRouter = require("./routes/admin");
  
  db();
  
  //ejs setup 
  // app.use(expressLayouts)
  // app.set('layout', './layouts/full-width')
  app.set("view-engine", "ejs");
  
  
  
  app.use(express.urlencoded({ extended: false }));
  app.use(flash());
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );
  
  app.use(passport.initialize());
  app.use(passport.session());
  
  passport.use(User.createStrategy());
  
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
  app.use(methodOverride("_method"));
  
  
  
  
  
  app.use("/", indexRouter);
  app.use("/admin", adminRouter);
  
  
  const PORT = process.env.PORT || 6040;
  app.listen(PORT, () => console.log("server is up and running on port " + PORT));
  
