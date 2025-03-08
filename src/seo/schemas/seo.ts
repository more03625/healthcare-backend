import * as yup from 'yup';

const getSeo = yup.object({
    query: yup.object({
        pageUrl: yup.string().url().trim(),
        siteUrl: yup.string().matches(
            /^(https:\/\/[\w.-]+)\/?$/i,
            'Site URL must be in the format https://google.com (no trailing slash)'
        ).trim(),
        page: yup.number(),
        limit: yup.number(),
    })
});

const addSeo = yup.object({
    body: yup.object({
        siteUrl: yup.string().matches(
            /^(https:\/\/[\w.-]+)\/?$/i,
            'Site URL must be in the format https://google.com (no trailing slash)'
        ).trim().required(),
        pageUrl: yup.string().url().trim().required(),
        canonicalURL: yup.string().url().trim(),
        robots: yup.string().trim(),
        googleBot: yup.string().trim(),
        isActive: yup.boolean().required(),
        openGraph: yup.object({
            type: yup.string().trim().required(),
            url: yup.string().url().trim().required(),
            title: yup.string().trim().required(),
            description: yup.string().trim().required(),
            keywords: yup.string().trim().required(),
            image: yup.object({
                url: yup.string().url().trim().required(),
                alt: yup.string().trim().required(),
                type: yup.string().trim().required(),
                width: yup.string().trim().required(),
                height: yup.string().trim().required(),
            }),
        }).required(),
        twitter: yup.object({
            card: yup.string().trim().required(),
            title: yup.string().trim().required(),
            description: yup.string().trim().required(),
            image: yup.object({
                url: yup.string().url().trim().required(),
                alt: yup.string().trim().required(),
                type: yup.string().trim().required(),
                width: yup.string().trim().required(),
                height: yup.string().trim().required(),
            }),
        }).required(),
    })
});

const updateSeo = addSeo.concat(
    yup.object({
        body: yup.object({
            id: yup.string().required().trim()
        })
    })
)

const deleteSeo = yup.object({
    body: yup.object({
        id: yup.string().trim().required(),
    })
});

export default {
    getSeo,
    addSeo,
    updateSeo,
    deleteSeo
};
