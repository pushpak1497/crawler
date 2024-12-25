import mongoose from 'mongoose';

const productUrlSchema = new mongoose.Schema({
  domain: { type: String, required: true },
  urls: [{ type: String }],
});

export const ProductUrl= mongoose.model('ProductUrl', productUrlSchema);
