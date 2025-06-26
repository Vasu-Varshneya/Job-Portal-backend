export const sendToken = (user, statusCode, res, message) => {
  const token = user.getJWTToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,            // ✅ Cookie only over HTTPS
    sameSite: "None",        // ✅ Needed for cross-site cookies
  };

  res.status(statusCode)
  .cookie("token", token, {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,           // ✅ Required on HTTPS (Render)
    sameSite: "None"        // ✅ Required for cross-origin
  })
  .json({
    success: true,
    user,
    message,
    token,
  });

};

