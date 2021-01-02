import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: { type: String, required: [true, 'password is required'] },
  },
  { timestamps: true }
);

itemSchema.index({ email: 1 }, { unique: true });

const Item = mongoose.model('email', itemSchema);
export default Item;
