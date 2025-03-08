interface IBrowser {
    name?: String,
    version?: String,
    major?: String,
}

interface IEngine {
    name?: String,
    version?: String
}

interface IOs {
    name?: String,
    version?: String
}

interface IDevice {
    model?: String,
    type?: String
}

interface ICpu {
    architecture?: String
}

interface IDemoGraphics {
    ua: String,
    browser: IBrowser,
    engine: IEngine,
    os: IOs,
    device: IDevice,
    cpu: ICpu
}

interface ILocation {
    range?: Array<number>,
    country?: String,
    region?: String,
    eu?: String,
    timezone?: String,
    city?: String,
    ll?: Array<number>,
    metro?: Number,
    area?: Number
}

interface ITracker {
    pageUrl: String,
    ipAddress: String,
    visitedAt: number,
    demoGraphic: IDemoGraphics,
    geoLocation: ILocation,
}

export {
    ITracker
}