import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        gender: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            requried: true,
        }

    }
);

export const User = mongoose.model('Janet', userSchema);