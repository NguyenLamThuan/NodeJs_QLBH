import pool from '../configs/connectDB';

let createNewCompany = async (req, res) => {
    let { CompName, CompEmail, CompAddress, CompPhone } = req.body;
    await pool.execute('insert into company(CompName,CompEmail,CompAddress,CompPhone) values (?,?,?,?)',
        [CompName, CompEmail, CompAddress, CompPhone])
    return res.redirect('/company');

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

export default {
    createNewCompany, getEditCompany, portUpdateCompany,
}