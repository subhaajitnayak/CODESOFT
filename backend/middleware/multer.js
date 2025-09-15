import multer from 'multer';

const storage = multer.memoryStorage();
export const singleUpload = multer({ storage }).single('file');
export const uploadFields = multer({ storage }).fields([
  { name: 'resume', maxCount: 1 },
  { name: 'profilePhoto', maxCount: 1 },
  { name: 'phoneNumberFile', maxCount: 5 }
]);
