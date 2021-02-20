import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { IUserDocument } from '../../interfaces/IUser';

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, trim: true, required: true },
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, trim: true, required: true },
    companyId: { type: String, trim: true },
    companyName: { type: String, trim: true, required: true },
    activeToken: { type: String, trim: true, default: null },
    salt: { type: String, trim: true },
    ip: { type: String, trim: true },
    userAgent: { type: String, trim: true, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.pre('save', function (this: IUserDocument, next: (err?: Error | undefined) => void) {
  if (!this.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err: Error, salt: string) => {
    bcrypt.hash(this.password, salt, (err: Error, hash: string) => {
      if (err) return next(err);
      this.password = hash;
      this.salt = salt;
      next();
    });
  });
});

const userModel = mongoose.model<IUserDocument>('user', userSchema);
export default userModel;
