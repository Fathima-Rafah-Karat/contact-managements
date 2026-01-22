 const imagelimit= ((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({error: err.message });
  }
  if (err) {
    return res.status(500).json({ error: err.message });
  }
  next();
});
export default imagelimit;