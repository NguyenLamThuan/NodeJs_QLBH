
let phone = (req, res, next) => {
    let { CompPhone } = req.body;
    if (CompPhone.length == 10) {
        next();
    }
    else {
        res.redirect('/admin');
    }
    return

}



export default {
    phone
}