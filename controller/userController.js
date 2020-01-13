import passport from "passport";
import routes from "../routes"
import User from "../models/User";

export const getJoin = (req, res) => {
    res.render("join", { pageTitle: "Join"});
};

export const postJoin = async (req, res, next) => {
    const {
        body: { name, email, password, password2 }
    } = req;
    if(password !== password2){
        res.status(400);
        res.render("join", { pageTitle: "Join"});
    } else{
        const user = await User({
            name, email
        })
        try{
            await User.register(user, password);
            next();
        } catch(error){
            console.log(error);
            res.redirect(routes.home);
        }
    }
};

export const getLogin = (req, res) => {
    res.render("login", { pageTitle: "Login"});
}
export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});


export const logout = (req, res) => {
    // To So : process Log Out
    res.redirect(routes.home);
}

export const userDetail = (req, res) => res.render("userDetail", { pageTitle: "User Detail"});

export const editProfile = (req, res) => res.render("editProfile", { pageTitle: "Edit Profie"});

export const changePassword = (req, res) => res.render("changePassword", { pageTitle: "Chage Password"});
