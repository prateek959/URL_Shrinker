import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
    urlId: { type: mongoose.Schema.Types.ObjectId, ref:"url"},
    browser: { type: String },
    last_click:{type:Date,default:Date.now},
    total_count:{type:Number,default:1}
  });

  const Analytics = mongoose.model("analytics", analyticsSchema);

  export { Analytics };