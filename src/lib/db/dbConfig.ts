import mongoose from 'mongoose';

export async function mongoInit() {
  try {
    mongoose.connect(process.env.MONGO_URI as string);
    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log('MongoDB connected successfully For the TMA');
    });

    connection.on('error', (err) => {
      console.log(
        'MongoDB connection error. Please make sure MongoDB is running. ' + err,
      );
      process.exit();
    });
  } catch (error) {
    console.log('Something went wrong!');
    console.log(error);
  }
}
