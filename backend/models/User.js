// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';

// const { Schema, model } = mongoose;

// const userSchema = new Schema({
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ['superuser', 'user'], default: 'user' },
// });

// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) {
//     return next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// const User = model('User', userSchema);

// export default User;


import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['user', 'superuser', 'admin'] }
});

const User = model('User', userSchema);

export default User;
