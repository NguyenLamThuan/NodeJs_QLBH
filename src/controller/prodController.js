import pool from '../configs/connectDB';

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

let postDeleteProduct = async (req, res) => {
    let ProID = req.params.ProID;
    let CompID = req.body.CompID;
    await pool.execute('delete from product where ProID =?', [ProID]);
    return res.redirect(`/product/${CompID}`);
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

export default {
    createNewProduct, postDeleteProduct, getEditProduct, postUpdateProduct
}