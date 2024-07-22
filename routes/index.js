var express = require('express');
var router = express.Router();
const User = require("../models/user");
const Expense = require("../models/expense");
const passport = require("passport");
const LocalStrategy = require("passport-local");
passport.use(new LocalStrategy(User.authenticate()));



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Express' });
});

router.post("/signup", async function (req, res, next) {
    try {
        await User.register(
            { username: req.body.username, email: req.body.email },
            req.body.password
        );
        res.redirect("/signin");
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});
router.get('/signin', function(req, res, next) {
  res.render('signin', { title: 'Express' });
});
router.post("/signin",passport.authenticate("local", {
      successRedirect: "/profile",
      failureRedirect: "/signin",
  }),
  function (req, res, next) {}
);
router.get('/profile',isLoggedIn,async function(req, res, next) {
  try {
    const { expenses } = await req.user.populate("expenses");
    // console.log(req.user,expenses);
    res.render("profile", { admin: req.user, expenses: expenses });
  } catch (error) {
    res.send(error);
  }
});
// router.get("/filter", isLoggedIn, async function (req, res, next) {
//   try {
//     const { expenses } = await req.user.populate("expenses");
//     // console.log(req.user,expenses);
//     res.render("filter", { admin: req.user, expenses: expenses });
//   } catch (error) {
//     res.send(error);
//   }
// });
router.get("/filter", isLoggedIn, async function (req, res, next) {
  try {
    let { expenses } = await req.user.populate("expenses");
    expenses = expenses.filter((e) => e[req.query.key] == req.query.value);
    res.render("filter", { admin: req.user, expenses });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.get("/signout", isLoggedIn, function (req, res, next) {
  req.logout(() => {
    res.redirect("/signin");
  });
});
router.get("/add-expense", isLoggedIn, function (req, res, next) {
  res.render("add-expense", { title: "Express" });
});
router.post("/add-expense", isLoggedIn, async function (req, res, next) {
  try {
    const expense = new Expense(req.body);
    req.user.expenses.push(expense._id);
    expense.user = req.user._id;
    await expense.save();
    await req.user.save();
    res.redirect("/profile");
  } catch (error) {
    res.send(error);
  }
});
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
      next();
  } else {
      res.redirect("/signin");
  }
}



module.exports = router;
