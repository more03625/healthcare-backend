import * as yup from 'yup';

const getHospital = yup.object({
    query: yup.object({
        s: yup.string().trim(),
        page: yup.number().default(1),
        limit: yup.number().default(10),
    })
});


const addHospital = yup.object({
    body: yup.object({
        name: yup.string().max(255).trim().required("Hospital name is required"),
        email: yup.string().email("Invalid email format").max(255).trim().required("Email is required"),
        phone: yup.string().max(20).trim().required("Phone number is required"),
        address: yup.string().trim().required("Address is required"),
        city: yup.string().max(100).trim().required("City is required"),
        state: yup.string().max(100).trim().required("State is required"),
        country: yup.string().max(100).trim().required("Country is required"),
        pincode: yup.string().max(10).trim().required("Pincode is required"),
        admin_id: yup.number().integer().required("Admin ID is required"), // Hospital Admin (Owner)
    })
});

const updateHospital = yup.object({
    body: yup.object({
        name: yup.string().max(255),
        email: yup.string().email().max(255),
        phone: yup.string().max(20),
        address: yup.string(),
        city: yup.string().max(100),
        state: yup.string().max(100),
        country: yup.string().max(100),
        pincode: yup.string().max(10),
        admin_id: yup.number().integer(),
    }),
    params: yup.object({
        id: yup.number().integer(),
    }),
});

const deleteHospital = yup.object({
    params: yup.object({
        id: yup.string().trim().required(),
    })
});

export default {
    getHospital,
    addHospital,
    updateHospital,
    deleteHospital
};