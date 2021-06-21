const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const sendEmail = require("./../utils/email");
const crypto = require("crypto");
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createAndSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signUp = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    createAndSendToken(newUser, 201, res);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next("no email or password");
  }
  const user = await User.findOne({ email }).select("+password -__v");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next("invalid email or password");
  }
  createAndSendToken(user, 200, res);
};

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return next("you are not logged in please login to access");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const freshUser = await User.findById(decoded.id);
    if (!freshUser) {
      next("the user belonging the token no longer exist");
    }
    if (freshUser.changedPasswordAfter(decoded.iat)) {
      return next("please login again");
    }
    req.user = freshUser;
    next();
  } catch (err) {
    next(err);
  }
  // grant access
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      new Error("no user found");
    }

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/users/resetpassword/${resetToken}`;

    const message = `forgot your password? Submit a patch request with your new password and password confirm to ${resetURL}`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Reset Pasword",
        message,
      });

      res.status(200).json({
        status: "success",
        message: "token sent to the email",
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
      return next(new Error("error sending mail to the user"));
    }
  } catch (err) {
    return next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new Error("token is invalid or expired"));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  user.save();
  createAndSendToken(newUser, 200, res);
};

exports.updatePassword = async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new Error("invalid  current password"));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  createAndSendToken(user, 200, res);
};
