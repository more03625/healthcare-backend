import * as yup from 'yup';

const get = yup.object({
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

const commonFields = {
    siteUrl: yup.string().matches(
        /^(https:\/\/[\w.-]+)\/?$/i,
        'Site URL must be in the format https://google.com (no trailing slash)'
    ).trim().required(),
    pageUrl: yup.string().url().trim().required(),
    position: yup.string().oneOf(['top', 'center', 'bottom']).required(),
    imageUrl: yup.string().url().trim().required(),
    destinationUrl: yup.string().url().trim().required(),
    isActive: yup.boolean().required(),
    startDate: yup
        .mixed()
        .required('Start date is required')
        .test('is-valid-date', 'Start date should be a valid UNIX timestamp', (value) => {
            if (typeof value === 'string') {
                // Check if it's a string representation of a number
                return !isNaN(Number(value));
            } else if (typeof value === 'number') {
                // Check if it's a number
                return !isNaN(value);
            }
            return false;
        }),
    endDate: yup
        .mixed()
        .required('End date is required')
        .test('is-valid-date', 'End date should be a valid UNIX timestamp', (value) => {
            if (typeof value === 'string') {
                // Check if it's a string representation of a number
                return !isNaN(Number(value));
            } else if (typeof value === 'number') {
                // Check if it's a number
                return !isNaN(value);
            }
            return false;
        })
        .test('not-equal', 'Start date and end date cannot be the same', function (value) {
            const startDate = this.parent.startDate;
            if (startDate !== undefined && value !== undefined) {
                return startDate !== value;
            }
            return true;
        }),
};

const add = yup.object({
    body: yup.object({
        ...commonFields
    })
});

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
