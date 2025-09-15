# Testing Instructions for Multer File Upload Fix

## Objective
Verify that the MulterError: Unexpected field is resolved by ensuring the file upload field name matches between frontend and backend.

## Prerequisites
- Backend server running (`npm run dev` in `backend` folder)
- Frontend server running (`npm run dev` in `frontend` folder)
- Browser to access the frontend UI

## Test Steps

1. Open the frontend application in the browser (usually at http://localhost:5173).
2. Login to the application if required.
3. Navigate to the Edit Profile modal/component.
4. In the Resume file input, select a PDF file to upload.
5. Fill in or update other profile fields as needed.
6. Click the Save button to submit the form.
7. Observe the response:
   - The form should submit successfully without any MulterError.
   - The profile should update with the new resume file.
   - No error messages related to file upload should appear.
8. Check backend logs for any errors related to multer or file upload.
9. Optionally, verify the uploaded file is stored or processed as expected.

## Expected Result
- File upload works without MulterError.
- Profile updates successfully with the uploaded resume.

## Notes
- If errors occur, capture the error messages and logs for troubleshooting.
- Test with different file sizes and types if applicable.

---

Please follow these steps and report the results.
