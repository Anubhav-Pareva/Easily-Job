import { getAllJobs, getAllRecruiterJobs } from "../Models/job.model.js";
import { recruiterRegistration, verifyLogin } from "../Models/recruiter.model.js";

export const postNewJob = (req, res)=>{
    res.render('postNewJobView', {recruiterEmail: req.session.recruiterEmail, recruiterName: req.session.recruiterName});
}
export const loginRecruiter = (req, res)=>{
    const {email, password} = req.body;
    const result = verifyLogin(email, password);
    if(result){
        req.session.recruiterEmail = email;
        req.session.recruiterName = result.recruiterName;
        const jobList = getAllRecruiterJobs(req.session.recruiterEmail);
        res.render('jobView', { jobList, recruiterEmail: req.session.recruiterEmail, recruiterName: req.session.recruiterName });
    }
    else{
        res.send('not a registered user');
    }
}
export const registerRecruiter = (req, res)=>{
    const {name, email, password} = req.body;
    const result = recruiterRegistration(name, email, password);
    if(result){
        res.redirect('/login');
    }else{
        res.send('error in registration');
    }
}
export const logoutRecruiter = (req, res)=>{
    req.session.destroy((err)=>{
        if(err){
            res.send(err);
        }
        else{
            res.redirect('/');
        }
    });
}