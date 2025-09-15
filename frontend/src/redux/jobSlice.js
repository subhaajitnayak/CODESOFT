import {createSlice} from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        singleJob: null,
        appliedJobs: [],
        allAdminJobs: [],
        searchTextByJob: "",
        allAppliedJobs: [],
        searchQuery: "",
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setAppliedJobs: (state, action) => {
            state.appliedJobs = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchTextByJob: (state, action) => {
            state.searchTextByJob = action.payload;
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        }
    }
});



export const {setAllJobs, setSingleJob, setAppliedJobs, setAllAdminJobs, setSearchTextByJob, setAllAppliedJobs, setSearchQuery} = jobSlice.actions;
export default jobSlice.reducer;