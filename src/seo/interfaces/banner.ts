interface IBanner {
    id: string,
    siteUrl: string,
    pageUrl: string,
    position: string,
    isActive: Boolean,
    imageUrl: string,
    destinationUrl: string,
    startDate: number, // Unix Timestamp
    endDate: number, // Unix Timestamp
    createdAt: number, // Unix Timestamp
    updatedAt: number, // Unix Timestamp
}

export {
    IBanner
}