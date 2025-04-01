import * as yup from "yup";

const create = yup.object({
    name: yup.string().max(255).required("Name is required"),
    email: yup.string().email().max(255).required("Valid email is required"),
    phone: yup.string().matches(/^\d{10,20}$/, "Phone number must be between 10-20 digits").required("Phone is required"),
    role: yup.string().oneOf(["Doctor", "Nurse", "Other Staff"]).required("Role is required"),
    department: yup.string().max(100).nullable(),
    specialization: yup.string().max(100).nullable(),
});

const update = yup.object({
    name: yup.string().max(255),
    email: yup.string().email().max(255),
    phone: yup.string().matches(/^\d{10,20}$/, "Phone number must be between 10-20 digits"),
    role: yup.string().oneOf(["Doctor", "Nurse", "Other Staff"]),
    department: yup.string().max(100).nullable(),
    specialization: yup.string().max(100).nullable(),
});

const getById = yup.object({
    id: yup.string().uuid("Invalid UUID format").required("ID is required"),
});

const deleteStaff = yup.object({
    id: yup.string().uuid("Invalid UUID format").required("ID is required"),
});

export default {
    create,
    update,
    getById,
    deleteStaff,
}