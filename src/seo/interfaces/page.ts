interface IPage {
    id: string,
    siteUrl: string,
    name: string,
    isActive: Boolean,
    description: string,
    createdAt: number, // Unix Timestamp
    updatedAt: number, // Unix Timestamp
}

export {
    IPage
}