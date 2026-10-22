import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
    issueType: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        latitude: {
            type: Number,
            required: true,
            min: -90,
            max: 90
        },
        longitude: {
            type: Number,
            required: true,
            min: -180,
            max: 180
        }        
    }
    }, {
            timestamps: true
});
//expire reports after 30 days
reportSchema.index(
    { createdAt: 1},
    { expireAfterSeconds: 30 * 24 * 60 * 60 }
);

const Report = mongoose.model("Report", reportSchema);

export default Report;