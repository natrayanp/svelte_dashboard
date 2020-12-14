/*  HTTP Client takes two functions, one for request interceptor and the second for response interceptor
 *  REQUEST interceptor function receives request data which can be operated upon
 *  RESPONSE interceptor function receives response data which can be operated upon 
 *  This client provides get, delete, post, put and patch
 */


const HttpClient = (req_interceptor_fn?,resp_interceptor_fn?) => {
   

  const apiRequest = (method, url, data?, opts?) => {    
      /*  method = http method (get, post, etc...)
       *  url = url of api ('http:/example.com/v1/login)
       *  opts = object of properties   {  body: '{"foo": "bar"}', 
       *                                   headers: new Headers({'content-type': 'application/json'}),
       *                                 } 
       */  
    
      //Create a request object      
      //let dd={mode:'no-cors'}      
      const request = new Request(url,{
                                        method,
                                        ...opts,
                                        //...dd
                                      });

      function handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        console.log(response.ok);
        console.log('handlerror ok');
        return response;
      }

                                      
      return fetch(request)
        .then(handleErrors)
        .then(res => Promise.resolve(res.json()))
        .catch(err => {
          return Promise.reject(err);
        });
  };

  
  // function to execute the http get request
  const get = (url, options?) => apiRequest("get",url,options);
  
  // function to execute the http delete request
  const deleteRequest = (url, options) =>  apiRequest("delete", url, options);
  
  // function to execute the http post request
  const post = (url, data, options) => apiRequest("post", url, data, options);
  
  // function to execute the http put request
  const put = (url, options) => apiRequest("put", url, options);
  
  // function to execute the http path request
  const patch = (url, options) =>  apiRequest("patch", url, options);





  //Override windows fetch to implement inceptor functionality

  window.fetch = (originalFetch => {
      return (request) => {
    
        // REQUEST Intercepter STARTS
        /*    request object examples
         *    const url = request.url;
         *    const method = request.method;
         *    const credentials = request.credentials;
         *    var myHeaders = new Headers();
         *    myHeaders.append('Content-Type', 'image/jpeg');
         */

         
       let req_post_intercept = null;
       console.log(typeof req_interceptor_fn );
       console.log(typeof req_interceptor_fn === 'function');
       if(typeof req_interceptor_fn === 'function')  req_post_intercept = req_interceptor_fn(request);
       if(!req_post_intercept) req_post_intercept = request;
       console.log(req_post_intercept);

        //REQUEST Intercepter END
        console.log('request sent-------------------');
        //const result = originalFetch.apply(this, args);
        
        return  new Promise((resolve, reject) => {
            originalFetch.apply(this, [req_post_intercept])
            .then((response) => {
              //RESPONSE Intercepter START
              console.log('response-----------------------');                
              let resp_post_intercept = null;
              if(typeof resp_interceptor_fn === 'function')  resp_post_intercept = resp_interceptor_fn(response);
              if(!resp_post_intercept) resp_post_intercept = response;
              console.log(resp_post_intercept);                 
              
              //RESPONSE Intercepter END
              resolve(resp_post_intercept);
            })
            .catch((err) => reject(err));
          });
      };
    })(window.fetch);


  // return the HTTP methods
  return {
      get,
      delete: deleteRequest,
      post,
      put,
      patch
  };
};

export default HttpClient;














// Api.js
import axios from "axios";
//import {req_interceptor} from './Httpinterceptor';
import {environment as env} from '../../environment/production';

// Create a instance of axios to use the same base url.
//export const axiosApiInstance = axios.create();

//Interceptor function
/*axiosApiInstance.interceptors.request.use(
  async req => await req_interceptor(req),
      error => {Promise.reject(error)}
  );
*/

/*
// implement a method to execute all the request from here.
const apiRequest = (method, scr_nd_func, request) => {    
    //let url = env['url_' + scr_nd_func] + '/' + env['endpt_' + scr_nd_func];
    let url = scr_nd_func;
    console.log(request);
    //new myAxioInstance
    //using the axios instance to perform the request that received from each http method
    
    //return axiosApiInstance({
    return fetch(url,{
        method,        
        body: request
        //headers
      }).then(res => {
        return Promise.resolve(res.json());
      })
      .catch(err => {
        return Promise.reject(err);
      });
};

// function to execute the http get request
const get = (url, request?) => apiRequest("get",url,request);

// function to execute the http delete request
const deleteRequest = (url, request) =>  apiRequest("delete", url, request);

// function to execute the http post request
const post = (url, request) => apiRequest("post", url, request);

// function to execute the http put request
const put = (url, request) => apiRequest("put", url, request);

// function to execute the http path request
const patch = (url, request) =>  apiRequest("patch", url, request);

// expose your method to other services or actions
const Httpclient ={
    get,
    delete: deleteRequest,
    post,
    put,
    patch
};

export default Httpclient;


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



/*
window.fetch = (function (originalFetch) {
  return function (){  
    
    console.log(arguments);
    

    const options = [arguments[0],{          
      headers: new Headers({'content-type': 'application/json','Accept': 'application/json'}),
      ...arguments[1]
    }];
    console.log(options);
    const result = originalFetch.apply(this, options);
    return result.then(console.log('Request was sent'));

  };
})(fetch);
*/

/*
window.fetch = (originalFetch => {
  return (...args) => {    
      
    const options = [args[0],{          
      headers: new Headers({'content-type': 'application/json','Accept': 'application/json'}),
      ...args[1]
    }];
    
    const result = originalFetch.apply(this, args);
      return result.then(console.log('Request was sent'));
  };
})(window.fetch);


const constantMock = window.fetch;
 window.fetch = function() {
    return new Promise((resolve, reject) => {
        constantMock.apply(this, arguments)
            .then((response) => {
                if(response.url.indexOf("/me") > -1 && response.type != "cors"){
                    console.log(response);
                    // do something for specificconditions
                }
                console.log('response');
                resolve(response.json());
            })
            .catch((error) => {
              console.log('response rejected');
                reject(error);
            })
    });
 }

*/

 
