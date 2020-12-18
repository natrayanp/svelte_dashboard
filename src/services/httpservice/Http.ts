import axios from 'axios';
import {apiurls,noAuthToken_endpt,installation, environment} from '../../environment/production';
import {authState} from '../authservice'

let unsub = null;
let tkn = null; 

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const HttpClient = () => {    

  const apiRequest = async (method, url, data?, opts={}) => {    
        let conf = {
          url: url,
          method: method,
          baseURL:apiurls.all_api_url,
          transformResponse: [function (data) {
            // Do whatever you want to transform the data
            console.log('inside transfeorm refs');
            console.log(data);
            //console.log(JSON.stringify(data));
            return (data);
          }],
          ...opts       
        };
        
        // Adding data to the request
        if (['PUT', 'POST', 'DELETE' ,'PATCH'].includes(method.toUpperCase())) conf['data'] = data;

               
        if (authState && !unsub) {
           unsub = authState.subscribe((val) => {  
            console.log(val.context);
            if(val.context.user){
              console.log(val.context.user);
              if(val.context.user.token) {            
                console.log(val.context.user.token);
                tkn = val.context.user.token;
              }
            }
            });
        }
        console.log(tkn);
        
        // Adding Authtoken to the header        
        let hdrs = conf['headers'] ? conf['headers']:{};

        if(!noAuthToken_endpt.includes(url)) {    
            console.log('enterer')          ;
            if(!tkn) {
            console.log("waiting start");
            await sleep(5000);
              console.log("waiting end");
            }
            hdrs = {...hdrs,'Authorization': 'Bearer '+tkn};                      
        }                
        hdrs = {...hdrs, 'siteid':installation.siteid};
        if (!environment.production){
          hdrs = {...hdrs, 'Access-Control-Allow-Origin': "*", 'Access-Control-Allow-Headers': "*"};
        }
        
        conf['headers'] = hdrs;       
        console.log(JSON.stringify(conf));  

        return axios(conf);
  };

  
  // function to execute the http get request
  const get = (url, options?) => apiRequest("get",url,null,options);
  
  // function to execute the http delete request
  const deleteRequest = (url, options?) =>  apiRequest("delete", url, null, options);
  
  // function to execute the http post request
  const post = (url, data, options?) => apiRequest("post", url, data, options={});
  
  // function to execute the http put request
  const put = (url, options?) => apiRequest("put", url, null, options={});
  
  // function to execute the http path request
  const patch = (url, options?) =>  apiRequest("patch", url, null, options={});


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