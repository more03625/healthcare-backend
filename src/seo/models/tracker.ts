import mongoose from 'mongoose';

const browserSchema = new mongoose.Schema({
    name: String,
    version: String,
    major: String,
}, { _id: false });

const engineSchema = new mongoose.Schema({
    name: String,
    version: String,
}, { _id: false });

const osSchema = new mongoose.Schema({
    name: String,
    version: String
}, { _id: false });

const deviceSchema = new mongoose.Schema({
    model: String,
    type: String
}, { _id: false });

const cpuSchema = new mongoose.Schema({
    architecture: String
}, { _id: false });

const demoGraphicSchema = new mongoose.Schema({
    ua: String,
    browser: browserSchema,
    engine: engineSchema,
    os: osSchema,
    device: deviceSchema,
    cpu: cpuSchema
}, { _id: false });

const geoLocationSchema = new mongoose.Schema({
    range: Array,
    country: String,
    region: String,
    eu: String,
    timezone: String,
    city: String,
    ll: Array,
    metro: Number,
    area: Number
}, { _id: false });

const trackerSchema = new mongoose.Schema({
    pageUrl: {
        type: String,
        required: false,
    },
    ipAddress: {
        type: String,
        required: true,
    },
    visitedAt: {
        type: Number,
        default: Date.now,
    },
    demoGraphic: demoGraphicSchema,
    geoLocation: geoLocationSchema,
});

const TrackerData = mongoose.model('Tracker', trackerSchema, 'tracker');

export default TrackerData;