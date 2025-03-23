
export const loginAuth = (req, res, next)=>{
    if(req.session.recruiterEmail){
        next();
    }
    else{
        res.render('notARecruiter');
    }
}