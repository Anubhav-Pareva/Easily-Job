import multer from "multer";
const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, 'public/resume/');
    },
    filename:(req, file, cb)=>{
        const fname = Date.now() + '-' + file.originalname;
        cb(null, fname);
    }
});
export default multer({storage});