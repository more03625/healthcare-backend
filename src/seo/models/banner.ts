import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema({
    siteUrl: {
        type: String,
        required: true,
    },
    pageUrl: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    destinationUrl: {
        type: String,
        required: true,
    },
    startDate: {
        type: Number, // Unix Timestamp
        required: true,
    },
    endDate: {
        type: Number, // Unix Timestamp
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
    },
    updatedBy: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
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

const Banner = mongoose.model('Banner', bannerSchema, 'banner');
export default Banner;