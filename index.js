import express from 'express';
import path from 'path';
import expressEjsLayouts from 'express-ejs-layouts';
import { addNewJob, getApplicantsView, getHomeView, getJobDetail, getJobUpdateView, getJobView, getLoginPage, getSearchView, handleDeleteJob, postApplyJob, updateJobDetail } from './src/Controllers/job.controller.js';
import handleUpload from './src/Middlewares/applicationUpload.middleware.js';
import session from 'express-session';
import { loginRecruiter, logoutRecruiter, postNewJob, registerRecruiter } from './src/Controllers/recruiter.controller.js';
import { loginAuth } from './src/Middlewares/loginAuth.middleware.js';

export const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(),'src','Views'));
app.use(expressEjsLayouts);
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));
app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true,
    cookie: {extended:false}
}));
app.get('/', getHomeView);
app.get('/login', getLoginPage);
app.post('/login', loginRecruiter);
app.get('/jobs', getJobView);
app.get('/jobs/:id', getJobDetail);
app.post('/apply/:id', handleUpload.single('resume'), postApplyJob);
app.post('/register', registerRecruiter);
app.get('/postjob', loginAuth, postNewJob );
app.get('/logout', loginAuth, logoutRecruiter);
app.get('/job/delete/:id', loginAuth, handleDeleteJob);
app.get('/job/update/:id', loginAuth, getJobUpdateView);
app.post('/job/update/:id', loginAuth, updateJobDetail);
app.post('/job', loginAuth, addNewJob);
app.get('/job/applicants/:id', getApplicantsView);
app.post('/search', getSearchView);