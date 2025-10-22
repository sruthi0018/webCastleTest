const axios = require("axios");
const User = require("../model/user");
const { getAuthUrl, getTokens } = require("../services/googleServices");

exports.googleLogin = (req, res) => {
  res.redirect(getAuthUrl());
};

exports.googleCallback = async (req, res) => {
  try {
    const { code } = req.query;
    const tokens = await getTokens(code);

  
    const { data: profile } = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });

    let user = await User.findOne({ googleId: profile.sub });
    if (!user) {
      user = new User({
        googleId: profile.sub,
        name: profile.name,
        email: profile.email,
        refreshToken: tokens.refresh_token,
      });
    } else {
      user.refreshToken = tokens.refresh_token || user.refreshToken;
    }
    await user.save();

    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
  } catch (err) {
    console.log(err);
    res.status(500).send("Google login failed");
  }
};

exports.savePhone = async (req, res) => {
  const { email, phone } = req.body;
  const user = await User.findOneAndUpdate({ email }, { phone }, { new: true });
  res.json({ message: "Phone number saved", user });
};
