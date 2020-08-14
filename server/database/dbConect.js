import mongoose from 'mongoose'


const connetionDB = (url) => {
  mongoose.connect(url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error) => {
      if (error) console.log(error);
      else
        console.log("DB connected");
    }
  )
}

export default connetionDB