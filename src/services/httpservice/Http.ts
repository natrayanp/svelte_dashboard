









const HttpClientsd = (req_interceptor_fn,resp_interceptor_fn) => {
   
  
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
  

    //Override windows fetch to implement inceptor functionality

    window.fetch = (originalFetch => {
        return (...req_args) => {
      
          //REQUEST Intercepter STARTS
          console.log(req_args[0]);
          console.log(req_args[1]);    
          let options = [req_args[0],{          
            headers: new Headers({'content-type': 'application/json','Accept': 'application/json'}),
            ...req_args[1]
          }];
          
          options = req_interceptor_fn(req_args);

          //REQUEST Intercepter END
          console.log('request sent');
          //const result = originalFetch.apply(this, args);
          
          return  new Promise((resolve, reject) => {
              originalFetch.apply(this, options)
              .then((resp) => {
                //RESPONSE Intercepter START
                console.log('response');                
                let resp_post_intercept= resp_interceptor_fn(resp);
                
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
  
  export default HttpClientsd;