

//import Auth from './ Auth';
import {initAuth} from './auth';
//import {HttpClient} from '../httpservice/HttpClient';
import {authStore} from '../../stores/stores';
import {providertype} from './authModals';
import { http } from '../../stores/services';

let auth = null;
//let http = HttpClient();
let session_chk = false;

export async function authInit(){
    //await authStore.update(dd => ({...dd,stage:'redirectchkstart'}));  
    console.log('starting auth init');
    let respdata;
    if(!auth) auth = initAuth(true);

    try{       
        let user = await auth.redirectChecker();
        console.log('redirectchecker success');
        console.log(user);
    } catch(err) {
        console.log(' redirectchecker error');
        session_chk = true;        
    }    

    if(!session_chk){
        console.log('redirect  start');
        let myStorage = window.sessionStorage;
        //myStorage.setItem('acredirfor', (isSignup)?'singuup':'login');        
        let redirfor = sessionStorage.getItem('acredirfor');
        sessionStorage.removeItem('acredirfor');      
        console.log(redirfor)  ;
        
        try{        
            if (redirfor === 'signup') {        
                respdata = await http.post('signuptoken',{});   
                console.log(respdata);
                console.log(respdata.status === 'SUCCESS');
            } else if (redirfor === 'login'){
                console.log('print logintoken');
                respdata = await http.post('logintoken',{});
            }
        } catch(err) {
            authStore.update(dd => ({...dd,stage:'redirectFail'}));
            dosignout();
            return err;
        }
        let st = null;
        console.log(redirfor === 'signup')
        console.log(respdata.status)
        if(respdata.status === 'SUCCESS'){
            authStore.update(dd => ({...dd,stage:'redirect'+redirfor+'Suc',detail:respdata}));
        } else {
            authStore.update(dd => ({...dd,stage:'redirect'+redirfor+'Fail',detail:respdata}));            
        }   
        if(redirfor === 'signup')  dosignout();        
        return respdata;
    } 
    
    if(session_chk) {  
        session_chk = false;         
        console.log("inside session check");
        try {
            respdata = await auth.authChecker();
            authStore.update(dd => ({...dd,stage:'SessionConf'}));
        } catch(err) {
            respdata = err;
        }
        return respdata;        
    }
}


export async function dosignout() {
    console.log('signout');
    if(!auth) auth = initAuth();
    await auth.logout();
}


export const signupHandler = async (sign_up_mode,provider,data={}) => {
    //const { email, password } = event.target.elements;
    // send login event
    console.log(data);
    switch(provider) {
        case(providertype.EMAILPASSWORD):
        {
            if (sign_up_mode) {
                console.log("inside signup with email")
                await signupWithEmail(data);
            } else {
                console.log("inside login with email")
                await loginWithEmail(data);
            }
            break;
        }
        case(providertype.GOOGLE):
        {
        //    send(mcheve, {provider: provider});
            break;
        }
    }	
};


const signupWithEmail = async (data) => {
    console.log('signupwithemail')
    let resdet;
    let respdata;
    console.log(data);    
    try{
        resdet = await auth.signupWithEmailPassword(data.email, data.password);
        console.log(resdet);
        if (resdet.stage === 'FBUsrCrEmailExist') {
            respdata = await http.post('signupemail',{useremail:resdet.detail.message});              
        } else {
            respdata = await http.post('signuptoken',{});
            console.log(respdata);
        }       

    } catch(err) {
        console.log(err);
        authStore.update(dd => ({...dd,stage:'signupemailFail'}));
        dosignout();
        return err;
    }
    console.log(respdata);
    if (respdata.success) {
        authStore.update(dd => ({...dd,stage:'signupemailSuc',detail:respdata}));
    } else {
        authStore.update(dd => ({...dd,stage:'signupemailFail',detail:respdata}));        
    }

}



export const loginWithEmail = async (data) => {
    console.log('loginWithEmail')
    let resdet;
    let respdata;
    console.log(data);    
    try{
        resdet = await auth.loginWithEmailPassword(data.email, data.password);
        console.log(resdet); 
        await logintk();      
        //respdata = await http.post('logintoken',{});        
    } catch(err) {
        console.log(err);
        authStore.update(dd => ({...dd,stage:'loginemailFail'}));
        dosignout();
        return err;
    }
    /*
    console.log(respdata);
    if (respdata.success) {
        authStore.update(dd => ({...dd,stage:'loginemailFail',detail:respdata}));
    } else {
        authStore.update(dd => ({...dd,stage:'loginemailSuc',detail:respdata}));
    }
    */
}


export const providerlogin = async (sign_up_mode,prov) => {

    console.log('loginWithProvider')
    let resdet;
    let respdata;
    console.log(prov);    
    try{
        
        resdet = await auth.loginWithProviders(prov,sign_up_mode);        
        console.log(resdet); 
        if(!auth.useRedirect) {
            if(!sign_up_mode) await logintk();
            if(sign_up_mode) await signtk();
        }
        
        //respdata = await http.post('logintoken',{});        
    } catch(err) {
        console.log(err);
        let x = sign_up_mode?'signinProvFail':'loginProvFail';
        authStore.update(dd => ({...dd,stage:x}));
        dosignout();
        return err;
    }

}


export const sessionexist = async() => {
    await logintk();
}


const logintk = async() => {
    let respdata;
    try{
        respdata = await http.post('logintoken',{});
    } catch (err) {
        console.log(err);
        authStore.update(dd => ({...dd,stage:'loginFail'}));
        dosignout();
        return err;
    }
    
    //if (respdata.success) {
    if(respdata.status === 'SUCCESS'){
        authStore.update(dd => ({...dd,stage:'loginSuc',detail:respdata}));        
    } else {
        authStore.update(dd => ({...dd,stage:'loginFail',detail:respdata}));
    }
}


const signtk = async() => {
    let respdata;
    try{
        respdata = await http.post('signuptoken',{});
        console.log(respdata);
    } catch (err) {
        console.log(err);
        authStore.update(dd => ({...dd,stage:'signupFail'}));
        dosignout();
        return err;
    }

    if (respdata.success) {
        authStore.update(dd => ({...dd,stage:'signupSuc',detail:respdata}));
    } else {
        authStore.update(dd => ({...dd,stage:'signupFail',detail:respdata}));        
    }
}


export const activateListener = async () => {
    let tt = await auth.authStateListener();
    //authStore.update(dd => ({...dd,listener: tt}));
}  