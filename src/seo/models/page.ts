import mongoose from 'mongoose';

const pageSchema = new mongoose.Schema({
    siteUrl: {
        type: String,
        required: true,
    },
    pageUrl: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    isActive: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Number,
        default: Date.now,
    },
    updatedAt: {
        type: Number,
        default: Date.now,
    },
});

const Page = mongoose.model('Page', pageSchema, 'page');
export default Page;