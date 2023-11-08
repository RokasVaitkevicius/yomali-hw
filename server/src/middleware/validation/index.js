export default function validateSchema(schema) {
  return async (req, res, next) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (error) {
      res.status(400).json({ message: error.errors });
    }
  };
}
