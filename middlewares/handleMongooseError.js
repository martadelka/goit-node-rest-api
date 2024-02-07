const handleMongooseError = (error, _, next) => {
    const { name, code } = error;
  
    if (name === "MongoServerError" && code === 11000) {
      error.status = 409;
    } else {
      error.status = 400;
    }
    next();
  };
  
  export default handleMongooseError;