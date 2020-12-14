import HttpClient from '../httpservice/Httpclientservice';
import {environment as env} from '../../environment/production';

let http = HttpClient(req_int);


export const authapi_services = {
    

    signupApiwemail: () => {
        // This is to handle scenario where user crated in FB not in DB.
        http.get('http://127.0.0.1:8000/v1/test',{headers: new Headers({'content-type': 'application/json'})})
        .then((d)=>console.log(d))
        .catch(err => console.log(err));
        
    },
    signupDBUpdate: () => {},    
    loginDBUpdate: () =>  {}
    
};



function req_int(req) {
    console.log('insdie interceptor');
    console.log(req);   
    if(!env.production) allowCrossDomain(req);
    return req;
}

let allowCrossDomain = req => {
    console.log(req.headers);  
    req.headers.append('Access-Control-Allow-Origin', "*");
    req.headers.append('Access-Control-Allow-Headers', "*");
    req = {...req, mode:'cors' };
    console.log("@@@@@@@@@@@@@@@@@@@@@@")
    console.log(req);  
    //return req;    
  }


/*

window.fetch = (originalFetch => {
    return (...args) => {
  
      //REQUEST Intercepter STARTS
      console.log(args[0]);
      console.log(args[1]);    
      const options = [args[0],{          
        headers: new Headers({'content-type': 'application/json','Accept': 'application/json'}),
        ...args[1]
      }];
      console.log('request sent');
  
      //REQUEST Intercepter END
  
      //const result = originalFetch.apply(this, args);
      
      return  new Promise((resolve, reject) => {
          originalFetch.apply(this, options)
          .then((resp) => {
            //RESPONSE Intercepter START
            console.log('response');
  
            
            //RESPONSE Intercepter END
            resolve(resp);
          })
          .catch((err) => reject(err));
        });
    };
  })(window.fetch);

  */