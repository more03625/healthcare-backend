import * as yup from 'yup';

const get = yup.object({
    query: yup.object({
        siteUrl: yup.string().matches(
            /^(https:\/\/[\w.-]+)\/?$/i,
            'Site URL must be in the format https://google.com (no trailing slash)'
        ).trim(),
        pageUrl: yup.string().url().trim(),
        page: yup.number(),
        limit: yup.number(),
    })
});

const commonFields = {
    siteUrl: yup.string().matches(
        /^(https:\/\/[\w.-]+)\/?$/i,
        'Site URL must be in the format https://google.com (no trailing slash)'
    ).trim(),
    pageUrl: yup.string().url().trim(),
    isActive: yup.boolean().required(),
    name: yup.string().required().trim(),
    description: yup.string().required().trim(),
};

const add = yup.object({
    body: yup.object({
        ...commonFields
    })
})

const update = add.concat(
    yup.object({
        body: yup.object({
            ...commonFields,
            id: yup.string().required().trim()
        })
    })
)

const remove = yup.object({
    body: yup.object({
        id: yup.string().trim().required(),
    })
});

export default {
    get,
    add,
    update,
    remove,
};
