import mongoose from "mongoose";

const personalRecordSchema = new mongoose.Schema({
  exerciseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exercise",
    required: true,
  },
  oneRepMax: {
    value: Number,
    date: Date,
  },
  maxWeight: {
    value: Number,
    reps: Number,
    date: Date,
  },
  maxVolume: {
    value: Number,
    date: Date,
  },
});

export default mongoose.model("PersonalRecord", personalRecordSchema);
