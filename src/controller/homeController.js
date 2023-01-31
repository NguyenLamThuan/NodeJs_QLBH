import pool from '../configs/connectDB';

let getHomePage = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM product')
    return res.render("index.ejs", { dataPro: rows })
}


let getCompanyPage = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM company')

    return res.render("vCompany.ejs", { dataComp: rows })
}
let getProductPage = async (req, res) => {
    let CompID = req.params.CompID;
    let [prod] = await pool.execute('SELECT * FROM product where CompID = ?', [CompID]);
    return res.render('vProduct.ejs', { dataProd: prod });

}
let getAdminPage = async (req, res) => {
    const [comp] = await pool.execute('SELECT * FROM company');
    return res.render("admin.ejs", { dataComp: comp })
}
///
let createNewProduct = async (req, res) => {

    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');
    }
    let { ProName, ProPrice, CompID } = req.body;
    let ProdImage = req.file.filename;
    await pool.execute('insert into product(ProName,ProPrice,ProdImage,CompID) values (?,?,?,?)',
        [ProName, ProPrice, ProdImage, CompID]);
    return res.redirect('/')
}
///
let createNewCompany = async (req, res) => {
    let { CompName, CompEmail, CompAddress, CompPhone } = req.body;
    await pool.execute('insert into company(CompName,CompEmail,CompAddress,CompPhone) values (?,?,?,?)',
        [CompName, CompEmail, CompAddress, CompPhone])
    return res.redirect('/company');

}
let postDeleteProduct = async (req, res) => {
    let ProID = req.params.ProID;
    let CompID = req.body.CompID;
    await pool.execute('delete from product where ProID =?', [ProID]);
    return res.redirect(`/product/${CompID}`);
}
let getEditCompany = async (req, res) => {
    let CompID = req.params.CompID;
    const [rows, fields] = await pool.execute('SELECT * FROM company where CompID = ?',
        [CompID]);
    return res.render("editCompany.ejs", { dataComp: rows });
}

let portUpdateCompany = async (req, res) => {
    let { CompName, CompEmail, CompAddress, CompPhone, CompID } = req.body;
    await pool.execute("update company set CompName = ? , CompEmail= ? , CompAddress= ? , CompPhone= ? where CompID = ? ",
        [CompName, CompEmail, CompAddress, CompPhone, CompID]);
    return res.redirect('/company');
}

let getEditProduct = async (req, res) => {
    let ProID = req.params.ProID;
    const [rows, fields] = await pool.execute('select * from product where ProID = ?', [ProID]);
    const [comp] = await pool.execute('SELECT * FROM company');
    return res.render('editproduct.ejs', { dataProd: rows, dataComp: comp });
}

let postUpdateProduct = async (req, res) => {
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');
    }
    let { ProName, ProPrice, CompID, ProID } = req.body;
    let ProdImage = req.file.filename;
    await pool.execute('update product set ProName = ? , ProPrice = ? , ProdImage= ? , CompID= ? where ProID = ?',
        [ProName, ProPrice, ProdImage, CompID, ProID]);
    return res.redirect(`/product/${CompID}`);

}

module.exports = {
    getCompanyPage, getHomePage, getProductPage, getAdminPage, createNewProduct, createNewCompany,
    postDeleteProduct, getEditCompany, portUpdateCompany, getEditProduct, postUpdateProduct
}