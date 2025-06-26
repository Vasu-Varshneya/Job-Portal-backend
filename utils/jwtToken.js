export const sendToken = (user, statusCode, res, message) => {
  const token = user.getJWTToken();
  
  // Set cookie options
  const options = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000), // Cookie expiration based on the environment variable
    httpOnly: true, // Ensures the cookie is not accessible via JavaScript
  };
  
  // Send response with token, user data, and message
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    message,
    token,
  });
};

