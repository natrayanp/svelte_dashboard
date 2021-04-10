
import { authVal } from "../../stores/stores";

import {apiurls,noAuthToken_endpt,installation, environment} from '../../environment/production';

let tkn = null; 

export const HttpClient = () => {    

  const apiRequest = async (method, url, data?, opts={},formdata=false) => {    
    console.log(url);
    let myurl = apiurls.all_api_url + environment['endpt_' + url];
    let conf = {          
          method: method.toUpperCase(),          
          ...opts       
        };
        console.log(typeof(data));
        // Adding data to the request
        if (['PUT', 'POST', 'DELETE' ,'PATCH'].includes(method.toUpperCase())) {
          if(formdata) {
            conf['body'] = data;
          } else {
            conf['body'] = JSON.stringify(data);
          }
        } 
        
        console.log(conf);
        // Adding Authtoken to the header        
        let hdrs = conf['headers'] ? conf['headers']:{};

        if(!noAuthToken_endpt.includes(url)) {    
            console.log('enterer');
            tkn = authVal.user.token;
            hdrs = {...hdrs,'Authorization': 'Bearer '+tkn};                      
        }                
        
        if(authVal.user.session !== null) {
          hdrs = {...hdrs, 'session': authVal.user.session};
        }
       // hdrs = {...hdrs, 'Content-Type': 'application/json'};
       
        

        //hdrs = {...hdrs, 'siteid':installation.siteid};
        
        if (!environment.production){
          hdrs = {...hdrs, 'Access-Control-Allow-Origin': "*", 'Access-Control-Allow-Headers': "*"};
        }        
        conf['headers'] = hdrs;       
        console.log(JSON.stringify(conf));  
       
        let resp = await fetch(myurl,conf).catch(handleErr);

        


        console.log(resp);
        let respdata = {};
        if(!resp.ok) {
          //console.log(resp);
          console.log("inside ok");
          if(resp.status === 500){
            //To capture internal server errors from server
            console.log("inside ok true");
            //let respd = await resp.text();
            //respdata = {error: true, message: respd};  
            let respd = await resp.json();
            respdata = respd;
            console.log(respd);
            console.log(respdata);
          } else {
            console.log("inside ok false");
            let respd = await resp.json();
            console.log(respd);
            //respdata = respd['detail'];
            respdata = respd;
            console.log(respdata);  
          }
        } else {
          console.log("inside else");
          let respd = await resp.json();
          console.log(respd);
          //respdata = respd['detail'];
          respdata = respd;
          console.log(respdata);
        }
        
        return respdata;
  };


  function handleErr(err) {
        console.warn(err);
        console.log(err);
        let resp = new Response(
          JSON.stringify({ 
            detail:{
              error:true,
              message:'Network error'
            }
          })          
        );
        return resp;
      }
  
  // function to execute the http get request
  const get = (url, options?) => apiRequest("get",url,null,options);
  
  // function to execute the http delete request
  const deleteRequest = (url, options?) =>  apiRequest("delete", url, null, options);
  
  // function to execute the http post request
  const post = (url, data, options?) => apiRequest("post", url, data, options={});
  const postForm = (url, data, options?) => apiRequest("post", url, data, options={},true);
  
  // function to execute the http put request
  const put = (url, options?) => apiRequest("put", url, null, options={});
  
  // function to execute the http path request
  const patch = (url, options?) =>  apiRequest("patch", url, null, options={});


  // return the HTTP methods
  return {
      get,
      delete: deleteRequest,
      post,
      postForm,
      put,
      patch
  };
};