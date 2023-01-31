import express from "express";
import homeController from "../controller/homeController";
import homeMiddleware from "../middleware/homeMiddleware";
import multer from 'multer';
import path from 'path';
var appRoot = require('app-root-path');

let router = express.Router();

let upload = multer({ storage: homeMiddleware.storage, fileFilter: homeMiddleware.imageFilter });
const initWebRoute = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/company', homeController.getCompanyPage);
    router.get('/product/:CompID', homeController.getProductPage);
    router.get('/admin', homeController.getAdminPage);
    router.post('/create-new-product', upload.single('ProdImage'), homeController.createNewProduct);
    router.post('/create-new-company', homeMiddleware.phone, homeController.createNewCompany);
    router.post('/delete-product/:ProID', homeController.postDeleteProduct);
    router.get('/edit-company/:CompID', homeController.getEditCompany);
    router.post('/Update-company', homeMiddleware.updatephone, homeController.portUpdateCompany);
    router.get('/edit-product/:ProID', homeController.getEditProduct);
    router.post('/update-product', upload.single('ProdImage'), homeController.postUpdateProduct)

    router.get('/about', (req, res) => {
        res.send('Trang web bán hàng')
    })

    return app.use('/', router) // thêm tiền tố 
}
export default initWebRoute;