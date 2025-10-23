import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  googleId: string;
  email: string;
  name?: string;
  phone?: string;
  refreshTokenEnc?: string; // encrypted
  calledEvents: string[];
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  googleId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  name: String,
  phone: String,
  refreshTokenEnc: String,
  calledEvents: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
