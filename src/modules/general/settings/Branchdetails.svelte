<script>

    import {formValidator} from '../../../common/formvalidators/formvalidator';
    import {onMount, onDestroy} from 'svelte';
    import { http } from '../../../stores/services';
    import { Accordion, AccordionItem } from "../../../common/accordion/index";
    import { createEventDispatcher } from 'svelte';
    import { entityStore,enityVal } from "../../../stores/stores";
    import { goto } from '@roxi/routify';

    import { getNotificationsContext } from '../../../common/notifications';
const { addNotification } = getNotificationsContext();


const dd = {
            companyId: null,
            companyname: null,        
            branchId: null,
            branchName: null,
            branchShortName: null,
            branchCategory: null,
            branchStatus: null,
            branchDescription: null,
            branchImageUrl: null,
            branchAddLine1: null,
            branchAddLine2: null,
            branchCity: null,
            branchState: null,
            branchCountry: null,
            branchPinCode: null,
            branchPhone: null,
            branchFax: null,
            branchMobile: null,
            branchWebsite: null,
            branchEmail: null,
            branchStartDate: null,
            entityId: null,
        };
        

    console.log("+++++++++++++++++ start Branch details ++++++++++++++++++++++");
    let  avatar, fileinput;
    let mymodal = null;

      let btntxt;
      let mform;	

        let branchform;	
        let branchstore;
        let branchdata;

        export let branchdata_init;	
        export let refdata;
        export let mode = 'display';
        export let firstvisit = false;
        
        let myc = [];
        let mys = [];
        $: states = mys;
        $: citys = myc;
        if (!refdata.country) {
          refdata.country = [];
          mys = [];
          myc  = [];
        }

        // This is required as the data is loaded only after onmount
        if (!refdata.induscat)  refdata.induscat = [];
        if (!refdata.industype) refdata.industype = [];
        if (!refdata.compcat) refdata.compcat = [];

        $: branchdata;
        console.log(branchdata_init);
        if(branchdata_init.isArray && branchdata_init.length > 0 ) {  
          branchdata= JSON.parse(JSON.stringify(branchdata_init[0]));
        } 
        branchdata= dd;
        branchform = formValidator(branchdata);
        branchstore = branchform.data;	
        $branchstore = branchdata;
    
        const branchunsub = branchstore.subscribe(value => {		
            console.log(value)	;
            branchdata= value;		
        });
    
        const brnchdetfetchprogressmodal = () => {
		return addNotification({
				title : 'Checking your account',
				text: 'hi i am custom notification why it cant be sol long so i can test it before using it' ,
				notificationtype: 'modal',            
				modaltype:'modal-loading',  	
        //comp : Circularprogress,				
			});
	}
    
  console.log("+++++++++++++++++ END branch details ++++++++++++++++++++++");

        onMount(async() => {	
          console.log("_____________-going inside onmount 232-____________________")  ;
          console.log(mode);
          //mymodal =brnchdetfetchprogressmodal(); 

       

          // This is edit mode
          if(mode === 'edit' && (JSON.stringify(refdata) === JSON.stringify({}) || branchdata_init.length < 1)) {
            console.log("inside onmoung inner before get");
            await getBranch1(); 
            console.log("inside onmoung inner after get");            
          } else if( branchdata_init.length > 0) {
            console.log("else if( branchdata_init.length > 0)");
            console.log(branchdata_init);
            branchdata_init = branchdata_init[0];
          }

          //if (branchdata_init.companyFiscalYear.Int) branchdata_init.companyFiscalYear = branchdata_init.companyFiscalYear.Int;
          //if (branchdata_init.companyPinCode.Int) branchdata_init.companyPinCode = branchdata_init.companyPinCode.Int;

          $branchstore = branchdata_init;	
          console.log("init the dorp down values");
                // Populate the default values for the dropdown    
                console.log(JSON.stringify(branchdata));
                if (branchdata.companyId != null) {
                    if (typeof branchdata.companyCountry === 'string' || branchdata.companyCountry instanceof String) {
                      $branchstore.companyCountry = getvalue('companyCountry',branchdata.companyCountry);    
                    } else {
                      $branchstore.companyCountry = branchdata.companyCountry;    
                    }                
                    console.log(JSON.stringify(branchdata));
                    let mys = branchdata.companyState;
                    let myc = branchdata.companyCity;

                
                    countryselect();        
                    console.log(JSON.stringify(branchdata));   
                    console.log(myc);
                    if (typeof mys === 'string' || mys instanceof String) { 
                        $branchstore.companyState = getvalue('companyState', mys);
                    } else {
                        $branchstore.companyState = mys;
                    }
                  stateselect();      
                  if (typeof myc === 'string' || myc instanceof String) {          
                    $branchstore.companyCity = getvalue('companyCity', myc);
                  } else {
                        $branchstore.companyCity = myc;
                    }                
                    if (typeof branchdata.companyCategory === 'string' || branchdata.companyCategory instanceof String) {          
                      $branchstore.companyCategory=getvalue('companyCategory',branchdata.companyCategory);  
                  } else {
                    $branchstore.companyCategory = branchdata.companyCategory;
                    }  

                    if (typeof branchdata.companyIndustry === 'string' || branchdata.companyIndustry instanceof String) {          
                      $branchstore.companyIndustry =   getvalue('companyIndustry',branchdata.companyIndustry); 
                  } else {
                    $branchstore.companyIndustry=branchdata.companyIndustry;
                    }  
                                 

                }

                mform = document.getElementById("branchform");		
            branchform.initVal(mform);	
	
            if(mode === 'display') {
                branchform.disable(mform);
            } else {
              branchform.enable(mform);              
              if(mode === "edit") branchform.eledisable([document.getElementById("cpyname")]);	              
              btntxt = "Save";
              if (mode === "edit") btntxt = "Update";
            }
           //mymodal.close();
           //mymodal=null;            
        });   
        

      export async function companysave(){
        let respdata;
        if(btntxt === "Save") {
          console.log(branchdata);
          //toggle_btn_text();
          branchform.disable(mform);
          let formDatae = new FormData();
          console.log(JSON.stringify(branchdata));

          branchdata.companyCountry = branchdata.companyCountry.refvalue;
          branchdata.companyState = branchdata.companyState.refvalue;
          branchdata.companyCity = branchdata.companyCity.refvalue;          
          branchdata.companyCategory = branchdata.companyCategory.refvalue;
          branchdata.companyIndustry = branchdata.companyIndustry.refvalue;
          //branchdata.companyPinCode = Number(branchdata.companyPinCode);
          //branchdata.companyFiscalYear = Number(branchdata.companyFiscalYear); 

          
          if (!branchdata.companyCity === undefined) branchdata.companyCity = ""; 
          formDatae.append("text_field", JSON.stringify(branchdata));
          formDatae.append("text_action",JSON.stringify({"optype": btntxt}))
          formDatae.append("file_field", avatar);
 
          respdata = await http.postForm('upload',formDatae);
          sendcardaction("save");
        } else {
          toggle_btn_text();
          branchform.enable(mform);
        }
        
      }
    
      function toggle_btn_text(){
        (btntxt === "Edit")? btntxt = "Save" : btntxt = "Edit";
      }
    
      let dt2 = false 
      let dt1 = false
    
        
        const onFileSelected =(e)=>{
                let image = e.target.files[0];    
                let reader = new FileReader();
                reader.readAsDataURL(image);
                reader.onload = e => {
                    console.log('kdkdkkd');
                     avatar = e.target.result;
                     console.log(avatar);
                };
    }

    const dispatch = createEventDispatcher();

    const sendcardaction = (btnpressed) => {
        /*		
      if(firstvisit) {
        $goto('/landing');
        return;
      }  
      */
		//Dispatch the favorite event with object data
		dispatch('editresult',{
			action: btnpressed
		});
	}

  

  function countryselect() {
    console.log($branchstore.companyCountry);
    console.log($branchstore.companyCountry.submenu);
    if($branchstore.companyCountry.submenu) {
      console.log("@@#$@#@#@#@#@#@#@#@#@#");
      states = $branchstore.companyCountry.submenu;      
    } else {
      console.log("@@#$@#@#@#@#@#@#@#@#@#    NUILL");
      states = [];      
    }
    citys = [];
    console.log(states.length);
    if(states.length > 0) {
      if(states[0].submenu) {
        citys = states[0].submenu;    
      } 
    }

    //Reset the previously selected values
    $branchstore.companyState = '';
    $branchstore.companyCity = '';  
  }


  function stateselect() {
    console.log("------State change start------");
    console.log($branchstore.companyState);
    if($branchstore.companyState.submenu) {
      citys = $branchstore.companyState.submenu;
    } else {
      citys = [];
    }

    //Reset the previously selected values
    $branchstore.companyCity = '';
    console.log("------State change End------");
  }
    
  let selecteds;
    
/*
  function testchange(){
    console.log("in test");

                $branchstore.companyCategory=getvalue('companyCategory','Food');

  }
*/

function getvalue(type,matchstr) {  
  switch(type) {
  case 'companyCategory':    
    return match (refdata.compcat,matchstr);    
  case 'companyIndustry':    
    return match (refdata.industype,matchstr);    
  case 'companyCountry':    
    return match (refdata.country,matchstr);  
  case 'companyState':    
    if ($branchstore.companyCountry.submenu !== undefined) {
      return match ($branchstore.companyCountry.submenu,matchstr); 
    } else {
      return {}
    }
  case 'companyCity':  
    if ($branchstore.companyState.submenu !== undefined) {  
    return match ($branchstore.companyState.submenu,matchstr); 
    } else {
      return {}
    }
  
    default:
    return dd;  
    // code block
  
 
}
}


function match (arrval,matchstr) {
  let dds = {};
  console.log(arrval);
  console.log(matchstr);
  if (arrval!=[]) {
    arrval.forEach( x => {
        console.log(x);
        console.log(x.refvalue === matchstr);
        if (x.refvalue === matchstr) dds = x;
      });
    }  
    console.log(dds);
  return dds;
}



const getBranch1 = async() => {
  console.log("inside onmoung inner if companydetails");  
  console.log("inside onmoung inner if companydetails");
    console.log(JSON.stringify(enityVal));
    mymodal =brnchdetfetchprogressmodal();  
    let respdata;

    if(enityVal.branch.length === 0 || JSON.stringify(enityVal.refdata) === JSON.stringify({})) {
      console.log("after getBranch1 set store start detail"); 
      respdata = await http.get('getBranch1'); 

      entityStore.setCompany(JSON.parse(JSON.stringify(respdata.data.branch))); 
      entityStore.setRef(JSON.parse(JSON.stringify(respdata.data.refdata))); 
           
      console.log("after getBranch1 set store end details");
    }
    
    if(enityVal.branch.length <1) {
      branchdata_init = dd;      
    } else {
      branchdata_init = JSON.parse(JSON.stringify(enityVal.branch[0]));      
    }
    refdata = JSON.parse(JSON.stringify(enityVal.refdata)); 

    mymodal.close();
    mymodal=null;
    console.log("inside onmoung inner if end of getBranch1 companydetails");
  };


    </script>
    
    
    
    
<div class="shadow rounded-lg flex flex-col  bg-white">
    {#if mode !== 'display'}
        <div class="bg-blue-100 h-20 rounded-t-lg flex flex-row items-center px-7">
            <h2 class="text-2xl text-black text-gray-700 font-bold">{btntxt==="Save"?"Add New ":btntxt+" " } Branch</h2>
            <span class="flex-grow"></span>  
           <button class=" bg-indigo-700 rounded text-white font-semibold w-36 py-2 px-7 shadow" 
           on:click|preventDefault={companysave}>
             {btntxt}
            </button>
          {#if !firstvisit}
           <span class="flex w-5"></span>
          <button class="bg-red-600 rounded text-white font-semibold w-36 py-2 px-7  shadow" on:click={()=>sendcardaction('cancel')}>Cancel</button>  
          {/if}    
          
        </div>
    {/if}




    <form id="branchform" class="px-10 py-1 rounded w-full my-5 inputs space-y-6">
        <div class="grid grid-cols-1 auto-rows-auto md:grid-cols-9 md:grid-rows-6 md:gap-x-10  gap-y-5 md:gap-y-0	">
  
            <div class="pristine-form-group md:col-start-1 md:col-span-3">				  
                <label for="companyname">Company Name</label>
                <input required disabled
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                        type = "text"
                        />
                <div class="pristine-error-group"></div>
              </div>
  
              <div class="pristine-form-group md:col-start-4 md:col-span-3">				  
                <label for="branchname">Branch Name</label>
                        <input required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                type = "text"
                        />
                        <div class="pristine-error-group"></div>
                    </div>
       
              <div class="pristine-form-group md:col-start-7 md:col-span-3">				  
                <label for="branchname">Branch Short Name</label>
                        <input required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                type = "text"
                        />
                        <div class="pristine-error-group"></div>
                    </div>
  
  
       
              <div class="pristine-form-group md:col-start-1 md:col-span-3">				  
                <label for="firstname">Branch Category</label>
                        <select required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                        >dasdfasdf</select>
                        <div class="pristine-error-group"></div>
                    </div>
       
                <div class="pristine-form-group md:col-start-4 md:col-span-3">				  
                <label for="status">Status</label>
                        <select required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                        >dasdfasdf</select>
                        <div class="pristine-error-group"></div>
                    </div>
  
                <div class="pristine-form-group md:col-start-7 md:col-span-3">				  
                <label for="firstname">Start Date</label>
                        <input required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                type = "date"
                        />
                        <div class="pristine-error-group"></div>
                    </div>
  
  
                <div class="pristine-form-group md:col-start-1 md:col-span-5">				  
                <label for="firstname">Address Line 1</label>
                        <textarea required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                type = "text"
                        ></textarea>
                        <div class="pristine-error-group"></div>
                    </div>
       
              <div class="pristine-form-group md:col-start-6 md:col-span-4">				  
                <label for="Addressline2">Address Line 2</label>
                        <textarea required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                type = "text"
                        ></textarea>
                        <div class="pristine-error-group"></div>
                    </div>
  
              <div class="pristine-form-group md:col-start-1 md:col-span-2 my-3">				  
                <label for="Country">Country</label>
                        <select required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                        >dasdfasdf</select>
                        <div class="pristine-error-group"></div>
                    </div>
       
              <div class="pristine-form-group md:col-start-3 md:col-span-3  my-3">				  
                <label for="City">City</label>
                        <select required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                        >dasdfasdf</select>
                        <div class="pristine-error-group"></div>
                    </div>
       
              <div class="pristine-form-group md:col-start-6 md:col-span-3  my-3">				  
                <label for="State">State</label>
                        <select required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                        >dasdfasdf</select>
                        <div class="pristine-error-group"></div>
                    </div>
       
                <div class="pristine-form-group md:col-start-9 md:col-span-1  my-3">				  
                <label for="firstname">Pin</label>
                        <input required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                type = "text"
                        />
                        <div class="pristine-error-group"></div>
                    </div>
              
  
  
   
       
  
       
              
       
              <div class="pristine-form-group md:col-span-2">				  
                <label for="Phone">Phone</label>
                        <input type="text" required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                        />
                        <div class="pristine-error-group"></div>
                    </div>
              <div class="pristine-form-group md:col-span-2">				  
                <label for="Phone">Fax</label>
                        <input type="text" required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                        />
                        <div class="pristine-error-group"></div>
                    </div>
              
       
              <div class="pristine-form-group  md:col-span-2">				  
                <label for="Phone">Mobile</label>
                        <input type="text" required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                        />
                        <div class="pristine-error-group"></div>
                    </div>
       
              <div class="pristine-form-group  md:col-span-3">				  
                <label for="Phone">email</label>
                        <input type="text" required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                        />
                        <div class="pristine-error-group"></div>
                    </div>
       
       
                <div class="pristine-form-group md:col-start-1 md:col-span-3">				  
                <label for="firstname">Tax ID</label>
                        <input required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                type = "text"
                        />
                        <div class="pristine-error-group"></div>
                    </div>
       
       
              <div class="pristine-form-group  md:col-span-1">				  
                <label for="Timezone">Timezone</label>
                        <input type="text" required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                        />
                        <div class="pristine-error-group"></div>
                    </div>
       
       
              <div class="pristine-form-group  md:col-span-3">				  
                <label for="Phone">Website</label>
                        <input type="text" required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                        />
                        <div class="pristine-error-group"></div>
                    </div>     
  
        </div>
    </form> 
  </div>
    
    
    
    