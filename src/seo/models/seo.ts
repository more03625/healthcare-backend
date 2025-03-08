import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    alt: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    width: {
        type: String,
        required: true,
    },
    height: {
        type: String,
        required: true,
    },
});

const ogSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    keywords: {
        type: String,
        required: true,
    },
    image: {
        type: imageSchema,
        required: true,
    }
});

const twitterSchema = new mongoose.Schema({
    card: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: imageSchema,
        required: true,
    },
});

const seoSchema = new mongoose.Schema({
    pageUrl: {
        type: String,
        required: true,
    },
    siteUrl: {
        type: String,
        required: true,
    },
    canonicalURL: {
        type: String,
        required: true,
    },
    robots: {
        type: String,
        required: true,
    },
    googleBot: {
        type: String,
        required: true,
    },
    openGraph: {
        type: ogSchema,
        required: true,
    },
    twitter: {
        type: twitterSchema,
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

const SeoData = mongoose.model('Seo', seoSchema, 'seo');

export default SeoData