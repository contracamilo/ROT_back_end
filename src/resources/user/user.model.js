import mongoose from 'mongoose';

let validRoles = {
  values: ['ADMIN_ROLE', 'USER_ROLE'],
  message: '{VALUE} must be a valid user role',
};

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required'] },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: { type: String, required: [true, 'password is required'] },
    role: {
      type: String,
      default: 'USER_ROLE',
      enum: validRoles,
    },
    img: String,
    google: { type: Boolean, default: false },
    state: { type: Boolean, default: true },
  },
  { timestamps: true }
);

userSchema.index({ name: 1 }, { unique: true });

// Delete password from response
userSchema.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;

  return userObject;
};

const Item = mongoose.model('user', userSchema);
export default Item;
