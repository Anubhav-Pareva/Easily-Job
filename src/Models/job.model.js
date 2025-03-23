import { updateNumberofJobPosted } from "./recruiter.model.js";

const jobList = [
    {
        jobId: 1,
        companyName: 'Coding Ninjas',
        tech: 'SDE',
        jobLocation: 'Gurgaon HR IND Remote',
        salary: '14-20lpa',
        skills: ['React', 'NodeJS', 'SQL', 'JS', 'MongoBD', 'Express', 'AWS' ],
        applicants:[],
        recruiterEmail: 'ravikumar427rr@gmail.com',
        jobCategory: 'Tech',
        numberOfOpenings: 5,
        applyBy: '2024-07-04'
    },
    {
        jobId: 2,
        companyName: 'Go Digit',
        tech: 'Angular Developer',
        jobLocation: 'Pune IND On-Site',
        salary: '6-10lpa',
        skills: ['Angular', 'SQL', 'JS', 'MongoBD', 'Express', 'AWS' ],
        applicants:[],
        recruiterEmail: 'anubhavparevaji@gmail.com',
        jobCategory: 'Tech',
        numberOfOpenings: 6,
        applyBy: '2024-06-15'
    },
    {
        jobId: 3,
        companyName: 'Juspay',
        tech: 'SDE',
        jobLocation: 'Bangalore IND',
        salary: '20-26lpa',
        skills: ['React', 'NodeJS', 'SQL', 'JS', 'MongoBD', 'Express', 'AWS' ],
        applicants:[],
        recruiterEmail: 'ravikumar427rr@gmail.com',
        jobCategory: 'Tech',
        numberOfOpenings: 2,
        applyBy: '2024-06-02'
    }
];
export const getAllJobs = ()=>{
    return jobList;
}
export const getJob = (id)=>{
    return jobList.find((job)=> job.jobId == id);
}
export const addApplicant = (applicant, id)=>{
    const index = jobList.findIndex((job)=>job.jobId == id);
    if(index != -1){
    jobList[index].applicants.push(applicant);
    return true;
    }
    return false
}
export const getAllRecruiterJobs = (recruiterEmail) =>{
    return jobList.filter((job)=>job.recruiterEmail == recruiterEmail);
}
export const deleteJob = (id) => {
    const index = jobList.findIndex((job)=>job.jobId == id);
    jobList.splice(index, 1);
    return true;
}
export const addJob = (jobCategory, tech, jobLocation, companyName, salary, numberOfOpenings, skills, applyBy, recruiterEmail)=>{
    const jobId = jobList[jobList.length - 1].jobId+1;
    const jobOBJ = {
        jobId: jobId,
        jobCategory: jobCategory,
        tech: tech,
        jobLocation: jobLocation,
        companyName: companyName,
        salary: salary,
        numberOfOpenings: numberOfOpenings,
        skills: skills,
        applyBy: applyBy,
        applicants:[],
        recruiterEmail: recruiterEmail
    }
    jobList.push(jobOBJ);
    updateNumberofJobPosted(recruiterEmail, jobId);
    return true;
}
export const updateJob = (jobCategory, tech, jobLocation, companyName, salary, numberOfOpenings, skills, applyBy, id)=>{
    jobList.forEach((job, index) => {
        if (job.jobId == id) {
            jobList[index] = {
                ...job,
                jobCategory: jobCategory,
                tech: tech,
                jobLocation: jobLocation,
                companyName: companyName,
                salary: salary,
                numberOfOpenings: numberOfOpenings,
                skills: skills,
                applyBy: applyBy
            };
        }
    });
    return true;
}
export const searchJob = (searchQuery) => {
    const query = searchQuery.toLowerCase();
    return jobList.filter(job => 
        job.companyName.toLowerCase().includes(query)
      );
}
export const searchRecruiterJob = (recruiterEmail, searchQuery) => {
    const query = searchQuery.toLowerCase();
    return jobList.filter(job => 
        job.recruiterEmail == recruiterEmail &&
        job.companyName.toLowerCase().includes(query)
      );
}