// Middleware to check the authorization token
const checkStudent = (req, res, next) => {
    console.log("user", req.user);
  
    try {
      const user = req.user;
  
      if (user.role !== "student") {
        return res.status(403).send("Permission denied: Admin access required");
      }
      next();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  module.exports = { checkStudent };
  