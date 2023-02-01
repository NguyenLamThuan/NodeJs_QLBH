import pool from '../configs/connectDB';
import md5 from 'md5';

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
let getLogin = (req, res) => {
    return res.render('login.ejs');

}

let postUserLogin = async (req, res) => {
    let User = req.body.UserName;
    let Pass = md5(req.body.PassWord);

    let [users] = await pool.execute('select * from users where UserName =? and Password = ?',
        [User, Pass]);
    if (users == '') {
        res.redirect("/login");
    } else {
        res.cookie('Cookie', users[0].UserID);
        res.redirect("/admin");
    }
    return;

}
let getSignUp = (req, res) => {
    return res.render('signup.ejs');
}
let postSignUpUser = async (req, res) => {
    let { UserName, PassWord, RePassWord } = req.body

    if (PassWord !== RePassWord) {
        res.redirect("/sign-up-user");
    } else {
        let [users] = await pool.execute('select * from users where UserName =?',
            [UserName]);
        if (users != '') {
            res.redirect("/sign-up-user");
        } else {
            let Pass = md5(PassWord);
            await pool.execute('insert into users(UserName,Password) values (?,?)',
                [UserName, Pass]);
            res.redirect('/login');
        }

    } return;
}


module.exports = {
    getCompanyPage, getHomePage, getProductPage, getAdminPage, getLogin, postUserLogin,
    getSignUp, postSignUpUser
}