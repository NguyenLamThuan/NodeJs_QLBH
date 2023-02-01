import express from "express";
import homeController from "../controller/homeController";
import compController from "../controller/compController";
import prodController from "../controller/prodController";
import homeMiddleware from "../middleware/homeMiddleware";
import multer from 'multer';
import path from 'path';
var appRoot = require('app-root-path');

let router = express.Router();

let upload = multer({ storage: homeMiddleware.storage, fileFilter: homeMiddleware.imageFilter });
const initWebRoute = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/company', homeController.getCompanyPage);
    router.get('/product/:CompID', homeMiddleware.CookieUser, homeController.getProductPage);
    router.get('/admin', homeMiddleware.CookieUser, homeController.getAdminPage);
    router.post('/create-new-product', upload.single('ProdImage'), prodController.createNewProduct);
    router.post('/create-new-company', homeMiddleware.phone, compController.createNewCompany);
    router.post('/delete-product/:ProID', homeMiddleware.CookieUser, prodController.postDeleteProduct);
    router.get('/edit-company/:CompID', homeMiddleware.CookieUser, compController.getEditCompany);
    router.post('/Update-company', homeMiddleware.updatephone, compController.portUpdateCompany);
    router.get('/edit-product/:ProID', homeMiddleware.CookieUser, prodController.getEditProduct);
    router.post('/update-product', upload.single('ProdImage'), prodController.postUpdateProduct);
    router.get('/login', homeMiddleware.LogIn, homeController.getLogin);
    router.post('/login-user', homeController.postUserLogin);
    router.get('/sign-up-user', homeMiddleware.LogIn, homeController.getSignUp);
    router.post('/signup-user', homeController.postSignUpUser);
    router.get('/log-out', homeMiddleware.LogOut);

    router.get('/about', (req, res) => {
        res.send('Web Product ')

    })

    return app.use('/', router) // thêm tiền tố 
}
export default initWebRoute;