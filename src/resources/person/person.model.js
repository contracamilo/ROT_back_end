import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
      unique: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['entertainment', 'sports', 'politics', 'business', 'social media', 'science'],
      default: 'active',
    },
    imgUrl: String,
    description: String,
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
    },
    meta: {
      likes: Number,
      dislikes: Number,
    },
  },
  { timestamps: true }
);

itemSchema.index({ name: 1 }, { unique: true });

const Item = mongoose.model('person', itemSchema);
export default Item;
