import { addApplicant, getAllJobs, getJob, getAllRecruiterJobs, deleteJob, addJob, updateJob, searchJob, searchRecruiterJob } from "../Models/job.model.js";

export const getHomeView = (req, res)=>{
    res.render('home', {recruiterEmail: req.session.recruiterEmail, recruiterName: req.session.recruiterName});
}
export const getJobView = (req, res)=>{
    let jobList;
    if(req.session.recruiterEmail){
        jobList= getAllRecruiterJobs(req.session.recruiterEmail);
    }
    else{
      jobList = getAllJobs();
    }
    res.render('jobView', { jobList, recruiterEmail: req.session.recruiterEmail, recruiterName: req.session.recruiterName });
}
export const getJobDetail = (req, res)=>{
    const id = req.params.id
    const result = getJob(id);
    if(result){
        res.render('jobDetailView', {job:result, recruiterEmail: req.session.recruiterEmail, recruiterName: req.session.recruiterName});
    }else{
        res.send('Job Not Found');
    }
}
export const getLoginPage = (req, res)=>{
    res.render('loginPageView');
}
export const postApplyJob = (req, res)=>{
    const {name, email, contact} = req.body;
    const id = req.params.id;
    const resumeAdd = 'resume/' + req.file.filename;
    const result = addApplicant({name, email, contact, resumeAdd} , id);
    if(result){
        res.redirect('/jobs');
    }else{
        res.send('Application Failed');
    }
}
export const handleDeleteJob = (req, res) => {
    const id = req.params.id;
    const result = deleteJob(id);
    if(result){
        res.redirect('/jobs');
    }
    else{
        res.send('job not deleted');
    }
}
export const getJobUpdateView = (req, res)=>{
    const id = req.params.id;
    const job = getJob(id);
    if(job){
        res.render('updateJobView', {job, recruiterEmail: req.session.recruiterEmail, recruiterName: req.session.recruiterName});
    }else{
        res.send('Job Not Found');
    }
}
export const addNewJob = (req, res) => {
    const {job_category, job_designation, job_location, company_name, salary, number_of_openings, skills_required, apply_by} = req.body;
    const result = addJob(job_category, job_designation, job_location, company_name, salary, number_of_openings, skills_required, apply_by, req.session.recruiterEmail);
    if(result){
        res.redirect('/jobs');
    }else{
        res.send('job not added');
    }
}
export const updateJobDetail = (req, res)=>{
    const id = req.params.id;
    const {job_category, job_designation, job_location, company_name, salary, number_of_openings, skills_required, apply_by} = req.body;
    const result = updateJob(job_category, job_designation, job_location, company_name, salary, number_of_openings, skills_required, apply_by, id);
    if(result){
        res.redirect('/jobs');
    }else{
        res.send('Job Not Updated');
    }
}
export const getApplicantsView = (req, res)=>{
    const id = req.params.id;
    const job = getJob(id);
    if(job){
        res.render('applicantsView', {job, recruiterEmail: req.session.recruiterEmail, recruiterName: req.session.recruiterName});
    }
    else{
        res.send('Error Applicants Not Found');
    }
}
export const getSearchView = (req, res) => {
    const {searchQuery} = req.body;
    let jobList;
    if(req.session.recruiterEmail){
        jobList= searchRecruiterJob(req.session.recruiterEmail, searchQuery);
    }
    else{
        jobList = searchJob(searchQuery);
    }
    res.render('jobSearchView', { jobList, recruiterEmail: req.session.recruiterEmail, recruiterName: req.session.recruiterName });

}