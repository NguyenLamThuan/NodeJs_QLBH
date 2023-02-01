import pool from '../configs/connectDB';
import multer from 'multer';
import path from 'path';
var appRoot = require('app-root-path');

let CookieUser = async (req, res, next) => {
    let UserID = req.cookies.Cookie;

    if (!UserID) {
        res.redirect('/login');
    } else {
        let [user] = await pool.execute('select * from users where UserID= ?', [UserID]);
        if (user == '') {
            res.redirect('/login');
        } else {
            next();
        }
    }

    return;
}
let LogOut = (req, res) => {
    if (req.cookies.Cookie) {
        res.clearCookie('Cookie');
        res.redirect('/')
    }
    return;

}

let LogIn = (req, res, next) => {
    let UserID = req.cookies.Cookie;
    if (!UserID) {
        next();
    } else {
        res.redirect('/admin');
    }
}

let phone = (req, res, next) => {
    let { CompPhone } = req.body;
    if (CompPhone.length == 10) {
        next();
    }
    else {
        res.redirect('/admin')
    }
    return

}
let updatephone = (req, res, next) => {
    let { CompPhone } = req.body;
    if (CompPhone.length == 10) {
        next();
    }
    else {
        res.redirect('/company')
    }
    return

}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + "/src/public/image/");
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};



export default {
    CookieUser, LogOut, LogIn, updatephone, phone, imageFilter, storage
}