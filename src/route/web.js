import express from "express";
import homeController from "../controller/homeController";
import homeMiddleware from "../middleware/homeMiddleware";
let router = express.Router();

const initWebRoute = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/company', homeController.getCompanyPage);
    router.get('/product/:CompID', homeController.getProductPage);
    router.get('/admin', homeController.getAdminPage);
    router.post('/create-new-product', homeController.createNewProduct);
    router.post('/create-new-company', homeMiddleware.phone, homeController.createNewCompany);
    router.post('/delete-product/:ProID', homeController.postDeleteProduct)

    router.get('/about', (req, res) => {
        res.send('Trang web bán hàng')
    })

    return app.use('/', router) // thêm tiền tố 
}
export default initWebRoute;