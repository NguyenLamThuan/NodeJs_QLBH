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
    let { ProName, ProPrice, ProdImage, CompID } = req.body
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
    let ProID = req.body.ProID;
    let CompID = req.body.CompID;
    await pool.execute('delete from product where ProID =?', [ProID]);
    return res.redirect(`/product/${CompID}`);
}

module.exports = {
    getCompanyPage, getHomePage, getProductPage, getAdminPage, createNewProduct, createNewCompany,
    postDeleteProduct
}