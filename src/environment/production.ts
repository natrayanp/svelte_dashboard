export const apiurls = {
    // Common routes for all
    all_api_url:
        //'http://127.0.0.1:8000/v1/',
        'http://127.0.0.1:8080/',
    // 'https://e294sbftrc.execute-api.ap-south-1.amazonaws.com/acdev',
    // Individual routes
    url_regis: 'http://127.0.0.1:8081',
    url_acsignupcallbk: 'http://127.0.0.1:8081',
    url_login: 'http://127.0.0.1:8081',
    url_aclogincallbk: 'http://127.0.0.1:8081',
};

export const environment = {
    production: false,
    firebase: {
        apiKey: "AIzaSyB0Shy7aNh93SuDGFSOky_0Znt4W-nUVd4",
        authDomain: "natauth-c532d.firebaseapp.com",
        databaseURL: "https://natauth-c532d.firebaseio.com",
        projectId: "natauth-c532d",
        storageBucket: "natauth-c532d.appspot.com",
        messagingSenderId: "824531220934",
        appId: "1:824531220934:web:62b1b0f2bc7c3b9346dac7"
    },
    // url_<screen + Functionality>
    url_auth_signup: apiurls.all_api_url,
    //endpt_auth_signup: 'signup',
    endpt_auth_signup: 'third_singup',
    url_auth_login: apiurls.all_api_url,
    endpt_auth_login: 'login',    
    url_auth_loginks: apiurls.all_api_url,
    endpt_auth_loginks: 'loginks',
    url_auth_logout: apiurls.all_api_url,
    endpt_auth_logout: 'logout',
    url_auth_userregchk: apiurls.all_api_url,
    endpt_auth_userregchk: 'userregchk',
    url_gold_price: apiurls.all_api_url,
    endpt_gold_price: 'bullionprice',
    url_admin_entity: apiurls.all_api_url,
    url_admin_branch: apiurls.all_api_url,
    url_auth_tdam: 'https://nawalapi.herokuapp.com' ,
    endpt_auth_tdam: 'receive',
    url_auth_ologin: apiurls.all_api_url,
    endpt_auth_ologin : 'token',    
    url_auth_osignup: apiurls.all_api_url,
    endpt_auth_osignup : 'salone_singup',
    /*
    url_auth_ologin: apiurls.all_api_url,
    endpt_auth_ologin : 'ologin'
    */
   endpt_signuptoken:'auth/signuptoken',
   endpt_logintoken:'auth/logintoken',
   endpt_regisdomain:'auth/regisdomain',
   endpt_getmenus:'auth/getmenus',
   //endpt_getbranch:'auth/getbranch',
   endpt_upload:'auth/savecompany',
   endpt_setplan:'auth/regisplan',  
   endpt_getcompany:'auth/getcompany',
   endpt_getbranch:'auth/getbranch',   
   endpt_branchsave: 'auth/savebranch',
   endpt_getrefdata: 'auth/getrefdata',
};


export const installation = {
    standaloneinstall: true,  // This decisides the login screen to be shown If standalone True ===> No Public
    thirpartyauth: false,      // This decisides the authentication flow (whether to use firebase or use own database)
    siteid: 'ac',  // uh -> universal hotel solution, ng -> for nawalgold
    // usertype:''               // This is mandatory.  "" for thirdpartyauth and "S" only for standalone installations
    // This is mandatory only for standalone installations
};

export const noAuthToken_endpt = ['signupemail'];