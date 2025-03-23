const recruiterList = [
    {
        recruiterId: 1,
        recruiterName: 'ravi',
        recruiterEmail: 'ravikumar427rr@gmail.com',
        recruiterPassword: 'ravikumar',
        jobPosted:[1, 2]
    }
];
export const verifyLogin = (email, password)=>{
    return recruiterList.find((recruiter)=>recruiter.recruiterEmail == email && recruiter.recruiterPassword == password);
}
export const recruiterRegistration = (recruiterName, recruiterEmail, recruiterPassword)=>{
    const recruiterId = recruiterList[recruiterList.length - 1].recruiterId + 1;
    const newRecruiter = {
        recruiterId: recruiterId,
        recruiterName: recruiterName,
        recruiterEmail: recruiterEmail,
        recruiterPassword: recruiterPassword,
        jobPosted:[]
    }
    recruiterList.push(newRecruiter);
    return true;
}
export const updateNumberofJobPosted = (recruiterEmail, jobId)=>{
    const index = recruiterList.findIndex((recruiter)=> recruiter.recruiterEmail == recruiterEmail);
    recruiterList[index].jobPosted.push(jobId);

}