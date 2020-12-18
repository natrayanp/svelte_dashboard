


/*  HTTP Client takes two functions, one for request interceptor and the second for response interceptor
 *  REQUEST interceptor function receives request data which can be operated upon
 *  RESPONSE interceptor function receives response data which can be operated upon 
 *  This client provides get, delete, post, put and patch
 */

const DEFAULT_CONTENT_TYPE = 'application/json;charset=utf-8';

const HttpClient = (req_interceptor_fn?,resp_interceptor_fn?) => {
   
  let mysent_content_type:string = null;
  
  const apiRequest = (method, url, data?, opts={}) => {    
      /*  method = http method (get, post, etc...)
       *  url = url of api ('http:/example.com/v1/login)
       *  opts = object of properties   {  body: '{"foo": "bar"}', 
       *                                   headers: new Headers({'content-type': 'application/json'}),
       *                                 } 
       */  
    
        /* Check for return content type expected
         * If no return type is set by user default it to JSON
         */          
        
        opts = transformRequest(method,data,opts);
         
         /*
         if(!('headers' in opts)){
            let ct = opts['headers'];
            let ctv = ct.get('content-type');
            if(!ctv) {
                ct.append('content-type', "*");
                mysent_content_type = ctv;
            }
         } else {
            let myHeaders = new Headers(); 
            myHeaders.append('Content-Type', 'application/json');
            opts['headers'] = myHeaders;
            mysent_content_type = 'application/json';
         }*/

      //Create a request object      
      //let dd={mode:'no-cors'}      
      const request = new Request(url,{
                                        method,
                                        ...opts,                                        
                                      });


                                      
      return fetch(request)        
        .then(res => Promise.resolve(res.json()))
        .catch(err => {
          return Promise.reject(err);
        });
  };

  
  // function to execute the http get request
  const get = (url, options?) => apiRequest("get",url,null,options={});
  
  // function to execute the http delete request
  const deleteRequest = (url, options?) =>  apiRequest("delete", url, null, options={});
  
  // function to execute the http post request
  const post = (url, data, options?) => apiRequest("post", url, data, options={});
  
  // function to execute the http put request
  const put = (url, options?) => apiRequest("put", url, null, options={});
  
  // function to execute the http path request
  const patch = (url, options?) =>  apiRequest("patch", url, null, options={});





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

              
              handleErrors(resp_post_intercept);

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






function handleErrors(response) {
  if (!response.ok) {
      throw Error(response.statusText);
  }
  console.log(response.ok);
  console.log('handlerror ok');
  return response;
}


//transformRequest: [
  function transformRequest(method,data,opts) {       
    console.log('inside transform request $$$$$$$');
    //console.log(opts['headers']);
    let headers = opts['headers']?opts['headers']:undefined;
    // Don't add body for the get
    if(!['GET','HEAD'].includes(method)){        
      //normalizeHeaderName(headers, 'Accept');
      //normalizeHeaderName(headers, 'Content-Type');
      if (isArrayBuffer(data) ||
        isBuffer(data) ||
        isStream(data) ||
        isFile(data) ||
        isBlob(data)
      ) {
        opts['body'] = data;
        return opts;
      }
      if (isFormData(data)){
        opts['headers'] = setContentTypeIfUnset(headers, 'multipart/form-data');
        opts['body'] = data;
        return opts;
      }
      if (isArrayBufferView(data)) {
        opts['body'] = data.buffer;
        return opts;
      }
      if (isURLSearchParams(data)) {
        opts['headers'] = setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
        opts['body'] = data.toString();
        return opts;
      }
      if (isObject(data)) {
        opts['headers'] = setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
        opts['body'] =  JSON.stringify(data);
        return opts;
      } 
      opts['body'] = data;
      return opts;
  }
  //opts['headers'] = setContentTypeIfUnset(headers, DEFAULT_CONTENT_TYPE);
  return opts;
};

//transformResponse: [
  function transformResponse(data) {
  /*eslint no-param-reassign:0*/
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);
    } catch (e) { /* Ignore */ }
  }
  return data;
};
//],


function setContentTypeIfUnset(headers, value) {
  if (isUndefined(headers)){
      let myHeaders = new Headers(); 
      myHeaders.append('Content-Type', value);      
      return {headers: myHeaders};
   } else if (!(headers.get('content-type'))) {
      headers.append('content-type', value);      
      return {headers: headers}
  }  
}


/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

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

 
