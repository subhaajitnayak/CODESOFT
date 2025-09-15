import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { APPLICATION_API_ENDPOINT } from "../../utils";

const applicationSlice = createSlice({
    name: "application",
    initialState: {
        applicants: null,
    },
    reducers: {
        setApplicants: (state, action) => {
            state.applicants = action.payload;
        },
        updateApplicationStatus: (state, action) => {
            const { id, status } = action.payload;
            if (state.applicants?.application) {
                const application = state.applicants.application.find(app => app._id === id);
                if (application) {
                    application.status = status;
                }
            }
        },
        updateApplicantProfile: (state, action) => {
            const { userId, profile } = action.payload;
            if (state.applicants?.application) {
                state.applicants.application.forEach(app => {
                    if (app.applicant._id === userId) {
                        app.applicant.profile = { ...app.applicant.profile, ...profile };
                    }
                });
            }
        },
    },
});

export const { setApplicants, updateApplicationStatus, updateApplicantProfile } = applicationSlice.actions;

export default applicationSlice.reducer;

export const applicationSliceReducer = applicationSlice.reducer;
