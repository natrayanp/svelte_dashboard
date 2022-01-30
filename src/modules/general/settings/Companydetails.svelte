<script>

    import {formValidator} from '../../../common/formvalidators/formvalidator';
    import {disableform,enableform,disableelement,enableelement}from '../../../common/formvalidators/formdisable';
    import {onMount, onDestroy} from 'svelte';
    import { http } from '../../../stores/services';
    import { Accordion, AccordionItem } from "../../../common/accordion/index";
    import { createEventDispatcher } from 'svelte';
    import { entityStore,enityVal,authStore } from "../../../stores/stores";
    import { goto } from '@roxi/routify';
    import * as yup from "yup";
    import Alerts from '../../../common/notifications/components/alerts/Alerts.svelte';
    import { getNotificationsContext } from '../../../common/notifications';
  const { addNotification } = getNotificationsContext();


    import { createForm } from "svelte-forms-lib";

const dd = {
        companyId: null,
        companyName: null,
        companyShortName: null,
        companyCategory: null,
        
        companyStatus: null,                
        companyLogoUrl: null,
        companyLogo: null,

        companyIndustry: null,
        companyTaxID: null,
        companyStartDate: null,
        companyAddLine1: null,
        companyAddLine2: null,
        companyCountry: null,
        companyCity: null,
        companyState: null,        
        companyPinCode: null,
        companyPhone: null,
        companyFax: null,
        companyMobile: null,
        companyEmail: null,
        companyWebsite: null,
        companyFiscalYear: null,
        companyTimeZone: null,
        companyBaseCurency:null,
        companysParent:null,
        companyFiscalYear:null,
        entityid:null,
}

    let  avatar, fileinput;
    let mymodal = null;

      let btntxt;
      let mform;	

       // let companyform;	
       // let companystore;
        let companydatacpy;
        let respdata;

        export let companydata_init;	
        export let refdata;
        export let mode = 'display';
        export let firstvisit = false;

        	

        console.log("firstvisit de",firstvisit);
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
        if (!refdata.timezone) refdata.timezone = [];
        if (!refdata.currency) refdata.currency = [];
        if (!refdata.finyear) refdata.finyear = [];

  /*       $: companydata;
       console.log("companydata_init");
        console.log(companydata_init);
        console.log(Array.isArray(companydata_init));
        console.log(companydata_init.length);
        
        if(!(Array.isArray(companydata_init) && companydata_init.length > 0 )) {  
          companydata_init = dd; 
          console.log("companydata_init inside if");
          //companydata = JSON.parse(JSON.stringify(companydata_init[0]));
        } else {
          console.log("companydata_init why else" );
          //companydata_init = dd;       
         // companydata = dd;   
        }
     console.log(companydata);
        //companydata = dd;
        //companyform = formValidator(companydata);
        //companystore = companyform.data;	
        //$companystore = companydata;
        //console.log("companydata");
*/
        const { form, errors,state, handleChange, handleSubmit } = createForm({
          initialValues: companydata_init,
          validationSchema: yup.object().shape({
              companyName: yup.string().required("Required field"),
              companyShortName: yup.string().required("Required field"),              
              companyCategory: yup.object().test(
                                                'category',
                                                'Please select Category',
                                                  val => !val.refvalue ? false : true,
                                                ),
              //companyLogoUrl: null,
              //companyLogo: null,
              companyIndustry: yup.object().test(
                                                'industry',
                                                'Please select Industry',
                                                  val => !val.refvalue ? false : true,
                                                ),
              companyTaxID: yup.string().required("Required field"),
              companyStartDate: yup.date().required("Required field")
                                          .default(() => new Date().toLocaleDateString('en-CA')),                                          
              companyAddLine1: yup.string().required("Required field"),
              companyAddLine2: yup.string().required("Required field"),
              companyCountry: yup.object().test(
                                                'country',
                                                'Please select Country',
                                                  val => !val.refvalue ? false : true,
                                                ),
              companyCity: yup.object().test(
                                                'city',
                                                'Please select city',
                                                  val => !val.refvalue ? false : true,
                                                ),
              companyState: yup.object().test(
                                                'state',
                                                'Please select State',
                                                  val => !val.refvalue ? false : true,
                                                ),
              companyPinCode: yup.string().required("Required field"),
              companyPhone: yup.string(),
              companyFax: yup.string(),
              companyMobile: yup.number().required("Required field"),
              companyEmail: yup.string().email().required("Required field"),
              companyWebsite: yup.string().required("Required field"),
              companyFiscalYear: yup.object().test(
                                                'finacialyear',
                                                'Please Financial year type',
                                                  val => !val.refvalue ? false : true,
                                                ),
              companyTimeZone: yup.object().test(
                                                'timezone',
                                                'Please select Timezone',
                                                  val => !val.refvalue ? false : true,
                                                ),
              companyBaseCurency: yup.object().test(
                                                'currency',
                                                'Please select Base Currency',
                                                  val => !val.refvalue ? false : true,
                                                ),
              companysParent: yup.string(),
              //entityid:null,
            }),
          onSubmit: async values => {  
            console.log(values)          ;
            await companysave(values);            
          }
        });
/*
        const companyunsub = companystore.subscribe(value => {		
            console.log(value)	;
            companydata = value;		
        });
  */  
        const loginprogressmodal = () => {
		return addNotification({
				title : 'Checking your account',
				text: 'hi i am custom notification why it cant be sol long so i can test it before using it' ,
				notificationtype: 'modal',            
				modaltype:'modal-loading',  	
        //comp : Circularprogress,				
			});
	}
    
  console.log("+++++++++++++++++ END company details ++++++++++++++++++++++");

        onMount(async() => {	
          console.log("_____________-going inside onmount 232-____________________")  ;
          console.log(mode);
          //mymodal =loginprogressmodal(); 
          mform = document.getElementById("companyform");	


          // This is edit mode
          /*
          if (companydata_init.length != 1) {
            console.log("select company to load");
          } else if(JSON.stringify(refdata) === JSON.stringify({})) {
            console.log("Refdata load error");
            //await getCompany1(); 
            console.log("inside onmoung inner after get");            
          } else if( companydata_init.length ===  1) {
            console.log("else if( companydata_init.length === 1)");
            console.log(companydata_init);
            companydata_init = companydata_init[0];
            companydata_init.companyStartDate = new Date(companydata_init.companyStartDate).toLocaleDateString('en-CA');
          } else {
            companydata_init = dd; 
          }
          */
          if( Array.isArray(companydata_init) && companydata_init.length ===  1) {
            console.log("else if( companydata_init.length === 1)");
            console.log(companydata_init);
            companydata_init = companydata_init[0];
            companydata_init.companyStartDate = new Date(companydata_init.companyStartDate).toLocaleDateString('en-CA');
          } else {
            companydata_init = dd; 
          }

          $form = JSON.parse(JSON.stringify(companydata_init));
          companydatacpy = JSON.parse(JSON.stringify($form));
          console.log(companydatacpy);
          //$companydata = JSON.parse(JSON.stringify(companydata_init));
          //$companystore = companydata_init;	

          if(JSON.stringify(refdata) === JSON.stringify({})) {
            console.error("No refdata go back to branch.svelete");
          }
          
          console.log("init the dorp down values");
                // Populate the default values for the dropdown    
                console.log(JSON.stringify(companydata_init));
                init_all_Dropdowns();

             /*   if (companydata_init.companyId != null) {
                    if (typeof companydata_init.companyCountry === 'string' || companydata_init.companyCountry instanceof String) {
                      $form.companyCountry = getvalue('companyCountry',companydata_init.companyCountry);    
                    } else {
                      $form.companyCountry = companydata_init.companyCountry;    
                    }                
                    let mys = companydata_init.companyState;
                    let myc = companydata_init.companyCity;

                
                    countryselect();        
                    console.log(JSON.stringify(companydata_init));   
                    console.log(myc);
                    if (typeof mys === 'string' || mys instanceof String) { 
                        $form.companyState = getvalue('companyState', mys);
                    } else {
                        $form.companyState = mys;
                    }
                  stateselect();      
                  if (typeof myc === 'string' || myc instanceof String) {          
                    $form.companyCity = getvalue('companyCity', myc);
                  } else {
                        $form.companyCity = myc;
                    }                
                    if (typeof companydata_init.companyCategory === 'string' || companydata_init.companyCategory instanceof String) {          
                      $form.companyCategory=getvalue('companyCategory',companydata_init.companyCategory);  
                  } else {
                    $form.companyCategory = companydata_init.companyCategory;
                    }  

                    if (typeof companydata_init.companyIndustry === 'string' || companydata_init.companyIndustry instanceof String) {          
                      $form.companyIndustry =   getvalue('companyIndustry',companydata_init.companyIndustry); 
                  } else {
                    $form.companyIndustry=companydata_init.companyIndustry;
                    }  


                    if (typeof companydata_init.companyTimeZone === 'string' || companydata_init.companyTimeZone instanceof String) {          
                      $form.companyTimeZone =   getvalue('companyTimeZone',companydata_init.companyTimeZone); 
                  } else {
                    $form.companyTimeZone=companydata_init.companyTimeZone;
                    }  

                    if (typeof companydata_init.companyBaseCurency === 'string' || companydata_init.companyBaseCurency instanceof String) {          
                      $form.companyBaseCurency =   getvalue('companyBaseCurency',companydata_init.companyBaseCurency); 
                  } else {
                    $form.companyBaseCurency=companydata_init.companyBaseCurency;
                    }  

                    if (typeof companydata_init.companyFiscalYear === 'string' || companydata_init.companyFiscalYear instanceof String) {          
                      $form.companyFiscalYear =   getvalue('companyFiscalYear',companydata_init.companyFiscalYear); 
                  } else {
                    $form.companyFiscalYear=companydata_init.companyFiscalYear;
                    }  
                }*/

            if(mode === 'display') {
                disableform(mform);
            } else {
              enableform(mform);
              if(mode === "edit") disableelement([document.getElementById("companyName")]);	              
              btntxt = "Save";
              if (mode === "edit") btntxt = "Update";
              console.log()
            }
           //mymodal.close();
           //mymodal=null;   
           console.log("firstvisit de send",firstvisit);
         
        });   
        

      export async function companysave(formdata){
        disableform(mform);
        console.log(btntxt);
        let formdatacpy = JSON.parse(JSON.stringify(formdata));
        if(["Save","Update"].includes(btntxt)) {
          let formDatae = new FormData();          
         // console.log(JSON.stringify(companydata));
          formdata.companyCountry = formdata.companyCountry.refvalue;
          formdata.companyState = formdata.companyState.refvalue;
          formdata.companyCity = formdata.companyCity.refvalue;          
          formdata.companyCategory = formdata.companyCategory.refvalue;
          formdata.companyIndustry = formdata.companyIndustry.refvalue;
          formdata.companyTimeZone = formdata.companyTimeZone.refvalue;
          formdata.companyFiscalYear = formdata.companyFiscalYear.refvalue;
          formdata.companyBaseCurency = formdata.companyBaseCurency.refvalue;
          
          //companydata.companyPinCode = Number(companydata.companyPinCode);
          //companydata.companyFiscalYear = Number(companydata.companyFiscalYear); 
          
          if (!formdata.companyCity === undefined) formdata.companyCity = ""; 
          console.log(JSON.stringify(formdata));
          console.log(JSON.stringify(companydatacpy));
          console.log(JSON.stringify(formdata)=== JSON.stringify(companydatacpy));
          if(JSON.stringify(formdata) !== JSON.stringify(companydatacpy)) {
            formdata.companyStartDate = new Date(formdata.companyStartDate).toISOString();
            formDatae.append("text_field", JSON.stringify(formdata));
            formDatae.append("text_action",JSON.stringify({"optype": btntxt}))
            formDatae.append("file_field", avatar);
  
            respdata = await http.postForm('upload',formDatae).catch(e=>{
              //TODO Error handling
              console.error(e);
            });


            console.log(respdata);
            console.log(respdata.data.company.length);
            console.log(respdata.data.company[0]);
            if(!firstvisit) {
              if(respdata.data.company.length == 1 ) {
                respdata.data.company[0].companyStartDate = new Date(respdata.data.company[0].companyStartDate).toLocaleDateString('en-CA');
                console.log("after conversion");
                console.log(respdata.data.company[0]);
                authStore.setCompany(JSON.parse(JSON.stringify(respdata.data.company[0])));
                console.log("after update");
              } else {
              //TODO: Throw error
              } 
            }
            console.log("sendcaraction");
            sendcardaction(btntxt);
          } else {
            console.log("No Change in values to update");   
            let s = allAlerts({tgt:"sudo3",text:"No data changed for "+btntxt,type:'warning'});    
            $form = JSON.parse(JSON.stringify(formdatacpy));       
            init_all_Dropdowns();
            enableform(mform);
          }

        } else {
          //toggle_btn_text();
          //companyform.enable(mform);
          enableform(mform);
          
        }
        
      }
    /*
      function toggle_btn_text(){
        (btntxt === "Edit")? btntxt = "Save" : btntxt = "Update";
      }
    */
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

    const sendcardaction = async (btnpressed) => {		
      let cpy;
      if(firstvisit) {
        $goto('/login');
        return;
      }else if(['Save','Update'].includes(btnpressed)) {
        console.log(respdata);
        cpy =  respdata.data.company[0];
      } else {
        cpy = "";
      }
		//Dispatch the favorite event with object data
		dispatch('editresult',{
			action: btnpressed,
      company: cpy
		});
	}


  function init_all_Dropdowns(){
    console.log("init the dorp down values");
                // Populate the default values for the dropdown    
                console.log(JSON.stringify(companydata_init));
                if (companydata_init.companyId != null) {
                    if (typeof companydata_init.companyCountry === 'string' || companydata_init.companyCountry instanceof String) {
                      $form.companyCountry = getvalue('companyCountry',companydata_init.companyCountry);    
                    } else {
                      $form.companyCountry = companydata_init.companyCountry;    
                    }                
                    let mys = companydata_init.companyState;
                    let myc = companydata_init.companyCity;

                
                    countryselect();        
                    console.log(JSON.stringify(companydata_init));   
                    console.log(myc);
                    if (typeof mys === 'string' || mys instanceof String) { 
                        $form.companyState = getvalue('companyState', mys);
                    } else {
                        $form.companyState = mys;
                    }
                  stateselect();      
                  if (typeof myc === 'string' || myc instanceof String) {          
                    $form.companyCity = getvalue('companyCity', myc);
                  } else {
                        $form.companyCity = myc;
                    }                
                    if (typeof companydata_init.companyCategory === 'string' || companydata_init.companyCategory instanceof String) {          
                      $form.companyCategory=getvalue('companyCategory',companydata_init.companyCategory);  
                  } else {
                    $form.companyCategory = companydata_init.companyCategory;
                    }  

                    if (typeof companydata_init.companyIndustry === 'string' || companydata_init.companyIndustry instanceof String) {          
                      $form.companyIndustry =   getvalue('companyIndustry',companydata_init.companyIndustry); 
                  } else {
                    $form.companyIndustry=companydata_init.companyIndustry;
                    }  


                    if (typeof companydata_init.companyTimeZone === 'string' || companydata_init.companyTimeZone instanceof String) {          
                      $form.companyTimeZone =   getvalue('companyTimeZone',companydata_init.companyTimeZone); 
                  } else {
                    $form.companyTimeZone=companydata_init.companyTimeZone;
                    }  

                    if (typeof companydata_init.companyBaseCurency === 'string' || companydata_init.companyBaseCurency instanceof String) {          
                      $form.companyBaseCurency =   getvalue('companyBaseCurency',companydata_init.companyBaseCurency); 
                  } else {
                    $form.companyBaseCurency=companydata_init.companyBaseCurency;
                    }  

                    if (typeof companydata_init.companyFiscalYear === 'string' || companydata_init.companyFiscalYear instanceof String) {          
                      $form.companyFiscalYear =   getvalue('companyFiscalYear',companydata_init.companyFiscalYear); 
                  } else {
                    $form.companyFiscalYear=companydata_init.companyFiscalYear;
                    }  
                }
  }
  

  function countryselect() {
    console.log("------Country change start------");
    console.log($form.companyCountry);
    console.log($form.companyCountry.submenu);
    if($form.companyCountry.submenu) {
      console.log("@@#$@#@#@#@#@#@#@#@#@#");
      states = $form.companyCountry.submenu;      
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
    $form.companyState = '';
    $form.companyCity = '';  
  }


  function stateselect() {
    console.log("------State change start------");
    console.log($form.companyState);
    if($form.companyState.submenu) {
      citys = $form.companyState.submenu;
    } else {
      citys = [];
    }

    //Reset the previously selected values
    $form.companyCity = '';
    console.log("------State change End------");
  }
    
  let selecteds;
    
/*
  function testchange(){
    console.log("in test");

                $companystore.companyCategory=getvalue('companyCategory','Food');

  }
*/

function getvalue(type,matchstr) {  
  switch(type) {
  case 'companyCategory':    
    return match (refdata.compcat,matchstr);    
  case 'companyIndustry':    
    return match (refdata.industype,matchstr);    
  case 'companyTimeZone':    
    return match (refdata.timezone,matchstr);   
  case 'companyBaseCurency':    
    return match (refdata.currency,matchstr);  
  case 'companyFiscalYear':    
    return match (refdata.finyear,matchstr);   
  case 'companyCountry':    
    return match (refdata.country,matchstr);  
  case 'companyState':    
    if ($form.companyCountry.submenu !== undefined) {
      return match ($form.companyCountry.submenu,matchstr); 
    } else {
      return {}
    }
  case 'companyCity':  
    if ($form.companyState.submenu !== undefined) {  
    return match ($form.companyState.submenu,matchstr); 
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


/*
const getCompany1 = async() => {
  console.log("inside onmoung inner if companydetails");  
  console.log("inside onmoung inner if companydetails");
    console.log(JSON.stringify(enityVal));
    mymodal =loginprogressmodal();  
    let respdata;

    if(enityVal.company.length === 0 || JSON.stringify(enityVal.refdata) === JSON.stringify({})) {
      console.log("after getcompany set store start detail"); 
      respdata = await http.get('getcompany'); 

      entityStore.setCompany(JSON.parse(JSON.stringify(respdata.data.company))); 
      entityStore.setRef(JSON.parse(JSON.stringify(respdata.data.refdata))); 
           
      console.log("after getcompany set store end details");
    }
    
    if(enityVal.company.length <1) {
      companydata_init = dd;      
    } else {
      companydata_init = JSON.parse(JSON.stringify(enityVal.company[0]));      
    }
    refdata = JSON.parse(JSON.stringify(enityVal.refdata)); 

    mymodal.close();
    mymodal=null;
    console.log("inside onmoung inner if end of getcompany companydetails");
  };
*/

const allAlerts = (val) => {
    console.log(val);
		return addNotification({
				targetid: val.tgt,
				title : 'Alert',				
				//text: 'dkdkdk',
				text: val.text,
				type:val.type,								
				notificationtype: 'alert',     
				disableClose: false,       
        //position:'top-right' 
				//modaltype:'modal-no-action',  	
				//comp:Modals				
			});	
	}



    </script>
    
    
    
    <!--
    {firstvisit}
    {JSON.stringify($form)}
    --> 
    <Alerts targetid="sudo3"/>
    <div class="shadow rounded-lg flex flex-col flex-auto pb-7 bg-white">
      
    {#if mode !== 'display'}
        <div class="bg-blue-100 h-20 rounded-t-lg flex flex-row items-center px-7">
            <h2 class="text-2xl text-black text-gray-700 font-bold">{btntxt==="Save"?"Add New ":btntxt+" " } Company</h2>  
            

            <span class="flex-grow"></span>  
            {#if !firstvisit}
            <button class="bg-red-600 rounded text-white font-semibold w-36 py-2 px-7  shadow" on:click={()=>sendcardaction('cancel')}>Cancel</button>  
            {/if}    

           <span class="flex w-5"></span>
           <button class=" bg-indigo-700 rounded text-white font-semibold w-36 py-2 px-7 shadow" 
           on:click={handleSubmit}>
             {btntxt}
            </button>
          
          
        </div>
    {/if}
        <form id="companyform" class="px-10 py-1 rounded w-full my-5 inputs space-y-6" on:submit|preventDefault={handleSubmit}>
            <div class="grid grid-cols-1 auto-rows-auto md:grid-cols-9 md:grid-rows-6 md:gap-x-10  gap-y-5 md:gap-y-0	">
    
    
                <!--div class="pristine-form-group md:col-start-1 md:col-span-3"-->
                <div class="md:col-start-1 md:col-span-3">				  
                  
                    <label for="companyName">Name</label>
                    <input  required
                            id="companyName"
                            name = "companyName"
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                            type = "text"    
                            bind:value={$form.companyName}
                            on:blur ={handleChange}
                            on:change ={handleChange}
                            />
                    
                    {#if $errors.companyName && (JSON.stringify($errors.companyName)!= '{}') }
                      <small style="color:red">{$errors.companyName}</small>
                    {/if}
                  </div>
    
                  <div class="md:col-start-4 md:col-span-3">				  
                    <label for="companyShortName">Short Name</label>
                            <input required
                            name = "companyShortName"
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                            type = "text"
                            bind:value={$form.companyShortName}
                            on:blur ={handleChange}
                            on:change ={handleChange}
                            />
                    {#if $errors.companyShortName && (JSON.stringify($errors.companyShortName)!= '{}') }
                      <small style="color:red">{$errors.companyShortName}</small>
                    {/if}
                  </div>
           
           
                  <div class="md:row-span-3 md:col-start-7 md:col-span-3  place-self-center  justify-self-center w-full h-full border-2 border-gray-400 border-dashed md:order-none order-first">            
                      <div class="flex flex-col h-full  justify-center justify-self-center">
                        {#if avatar}
                        <img class="avatar" src="{avatar}" alt="d" />
                        {/if}
                        <button class="self-center text-gray-500 text-4xl rounded-xl px-4" on:click|preventDefault={()=>{fileinput.click();}}>+</button>                    
                        <h5 class="self-center text-gray-400" on:click={()=>{fileinput.click();}}>Add your company Logo</h5>      
                        <input style="display:none" type="file" accept=".jpg, .jpeg, .png" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >                   
                      </div>
                      <!--div class="pristine-error-group"></div-->

                </div>
           
                  <div class="md:col-start-1 md:col-span-3">				  
                    <label for="companyCategory">Category</label>
                            <select required 
                            id = "companyCategory"
                            name = "companyCategory"
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                            bind:value={$form.companyCategory}                            
                            
                            >  
                            {#each refdata.compcat as indusca}
                              <option value={indusca}>
                                {indusca.refvalue}
                              </option>
                            {/each}
     <!--
                          
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                            -->
                            </select>
                            <!--div class="pristine-error-group"></div-->
                            {#if $errors.companyCategory && (JSON.stringify($errors.companyCategory)!= '{}') }
                              <small style="color:red">{$errors.companyCategory}</small>
                            {/if}
                        </div>
           
                    <div class="md:col-start-4 md:col-span-3">				  
                    <label for="companyIndustry">Industry</label>
                            <select required 
                            name = "companyIndustry"
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                            bind:value={$form.companyIndustry}
                            >
                          
                            {#each refdata.industype as industyp}
                            <option value={industyp}>
                              {industyp.refvalue}
                            </option>
                           {/each}

                          </select>
                            <!--div class="pristine-error-group"></div-->
                            {#if $errors.companyIndustry && (JSON.stringify($errors.companyIndustry)!= '{}') }
                              <small style="color:red">{$errors.companyIndustry}</small>
                            {/if}
                        </div>
           
                    <div class="md:col-start-1 md:col-span-3">				  
                    <label for="companyTaxID">Tax ID</label>
                            <input required 
                            name = "companyTaxID"
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                            type = "text"
                            bind:value={$form.companyTaxID}
                            on:blur ={handleChange}
                            on:change ={handleChange}
                            />
                            <!--div class="pristine-error-group"></div-->
                            {#if $errors.companyTaxID && (JSON.stringify($errors.companyTaxID)!= '{}') }
                              <small style="color:red">{$errors.companyTaxID}</small>
                            {/if}
                        </div>
           
                    <div class="md:col-start-4 md:col-span-3">				  
                    <label for="companyStartDate">Start Date</label>
                            <input required 
                            name = "companyStartDate"
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                            type = "date"
                            bind:value={$form.companyStartDate}
                            on:blur ={handleChange}
                            on:change ={handleChange}
                            />
                            {$form.companyStartDate}
                            <!--div class="pristine-error-group"></div-->
                            {#if $errors.companyStartDate && (JSON.stringify($errors.companyStartDate)!= '{}') }
                              <small style="color:red">{$errors.companyStartDate}</small>
                            {/if}
                        </div>
           
                    <div class="md:col-start-1 md:col-span-5">				  
                    <label for="companyAddLine1">Address Line 1</label>
                            <textarea required 
                            name = "companyAddLine1"
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                            type = "text"
                            bind:value={$form.companyAddLine1}
                            on:blur ={handleChange}
                            on:change ={handleChange}
                            ></textarea>
                            <!--div class="pristine-error-group"></div-->
                            {#if $errors.companyAddLine1 && (JSON.stringify($errors.companyAddLine1)!= '{}') }
                            <small style="color:red">{$errors.companyAddLine1}</small>
                          {/if}
                        </div>
           
                  <div class="md:col-start-6 md:col-span-4">				  
                    <label for="companyAddLine2">Address Line 2</label>
                            <textarea required 
                            name = "companyAddLine2"
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                            type = "text"
                            bind:value={$form.companyAddLine2}
                            on:blur ={handleChange}
                            on:change ={handleChange}
                            ></textarea>
                            <!--div class="pristine-error-group"></div-->
                            {#if $errors.companyAddLine2 && (JSON.stringify($errors.companyAddLine2)!= '{}') }
                            <small style="color:red">{$errors.companyAddLine2}</small>
                          {/if}
                        </div>
           
                  
                  <div class="md:col-start-1 md:col-span-2 my-3">				  
                    <label for="companyCountry">Country</label>
                            <!-- svelte-ignore a11y-no-onchange -->
                            <select required 
                            name = "companyCountry"
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                            bind:value={$form.companyCountry} on:change={()=>countryselect()} >
                            {#each refdata.country as country}
                            <option value={country}>
                              {country.refvalue}
                            </option>
                          {/each}
                        </select>
                            <!--div class="pristine-error-group"></div-->
                            {#if $errors.companyCountry && (JSON.stringify($errors.companyCountry)!= '{}') }
                            <small style="color:red">{$errors.companyCountry}</small>
                          {/if}
                        </div>
                        <div class="md:col-start-3 md:col-span-3  my-3">				  
                          <label for="companyState">State</label>
                                  <!-- svelte-ignore a11y-no-onchange -->
                                  <select required 
                                  name = "companyState"
                                  class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                                  bind:value={$form.companyState}  on:change={stateselect}                                                               
                                  >
                    
                                  {#each states as state}
                                  <option value={state}>
                                    {state.refvalue}
                                  </option>
                                {/each}
                    
                                </select>
                                  <!--div class="pristine-error-group"></div-->
                                  {#if $errors.companyState && (JSON.stringify($errors.companyState)!= '{}') }
                                  <small style="color:red">{$errors.companyState}</small>
                                {/if}
                              </div>
           
                  <div class="md:col-start-6 md:col-span-3  my-3">				  
                    <label for="companyCity">City</label>
                            <select required 
                            name = "companyCity"
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                            bind:value={$form.companyCity}                            
                            >
                            {#each citys as city}
                            <option value={city}>
                              {city.refvalue}
                            </option>
                          {/each}
                            /select>
                            <!--div class="pristine-error-group"></div-->
                            {#if $errors.companyCity && (JSON.stringify($errors.companyCity)!= '{}') }
                            <small style="color:red">{$errors.companyCity}</small>
                          {/if}
                        </div>
           

           
                    <div class="md:col-start-9 md:col-span-1  my-3">				  
                    <label for="companyPinCode">Pin</label>
                            <input required 
                            name = "companyPinCode"
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                            type = "text"
                            bind:value={$form.companyPinCode}
                            on:blur ={handleChange}
                            on:change ={handleChange}
                            />
                            <!--div class="pristine-error-group"></div-->
                            {#if $errors.companyPinCode && (JSON.stringify($errors.companyPinCode)!= '{}') }
                            <small style="color:red">{$errors.companyPinCode}</small>
                          {/if}
                        </div>
                  
           
                  <div class="md:col-span-2">				  
                    <label for="companyPhone">Phone</label>
                            <input type="text" required 
                            name = "companyPhone"
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                            bind:value={$form.companyPhone}
                            on:blur ={handleChange}
                            on:change ={handleChange}
                            />
                            <!--div class="pristine-error-group"></div-->
                            {#if $errors.companyPhone && (JSON.stringify($errors.companyPhone)!= '{}') }
                            <small style="color:red">{$errors.companyPhone}</small>
                          {/if}
                        </div>
                  <div class="md:col-span-2">				  
                    <label for="companyFax">Fax</label>
                            <input type="text" required 
                            name = "companyFax"
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                            bind:value={$form.companyFax}
                            on:blur ={handleChange}
                            on:change ={handleChange}
                            />
                            <!--div class="pristine-error-group"></div-->
                            {#if $errors.companyFax && (JSON.stringify($errors.companyFax)!= '{}') }
                            <small style="color:red">{$errors.companyFax}</small>
                          {/if}
                        </div>
                  
           
                  <div class="md:col-span-2">				  
                    <label for="companyMobile">Mobile</label>
                            <input type="text" required 
                            name = "companyMobile"
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                            bind:value={$form.companyMobile}
                            on:blur ={handleChange}
                            on:change ={handleChange}
                            />
                            <!--div class="pristine-error-group"></div-->
                            {#if $errors.companyMobile && (JSON.stringify($errors.companyMobile)!= '{}') }
                            <small style="color:red">{$errors.companyMobile}</small>
                          {/if}
                        </div>
           
                  <div class="md:col-span-3">				  
                    <label for="companyEmail">email</label>
                            <input type="text" required 
                            name = "companyEmail"
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                            bind:value={$form.companyEmail}
                            on:blur ={handleChange}
                            on:change ={handleChange}
                            />
                            <!--div class="pristine-error-group"></div-->
                            {#if $errors.companyEmail && (JSON.stringify($errors.companyEmail)!= '{}') }
                            <small style="color:red">{$errors.companyEmail}</small>
                          {/if}
                        </div>
           
           
                  <div class="md:col-span-4">				  
                    <label for="companyWebsite">Website</label>
    
                            <input type="text" required 
                            name = "companyWebsite"
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                            bind:value={$form.companyWebsite}
                            on:blur ={handleChange}
                            on:change ={handleChange}
                            />
                            <!--div class="pristine-error-group"></div-->
                            {#if $errors.companyWebsite && (JSON.stringify($errors.companyWebsite)!= '{}') }
                            <small style="color:red">{$errors.companyWebsite}</small>
                          {/if}
                      </div>
           
           
                  <div class="md:col-span-1">				  
                    <label for="companyTimeZone">Timezone</label>

                            <select required 
                            name = "companyTimeZone"
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                            bind:value={$form.companyTimeZone}
                            >
                          
                            {#each refdata.timezone as timezonev}
                            <option value={timezonev}>
                              {timezonev.refvalue}
                            </option>
                           {/each}

                          </select>

                            <!--div class="pristine-error-group"></div-->
                            {#if $errors.companyTimeZone && (JSON.stringify($errors.companyTimeZone)!= '{}') }
                            <small style="color:red">{$errors.companyTimeZone}</small>
                          {/if}
                        </div>
           
                  <div class="md:col-span-1">				  
                    <label for="companyBaseCurency">Currency</label>               
                            <select required 
                            name = "companyBaseCurency"
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                            bind:value={$form.companyBaseCurency}
                            >                          
                            {#each refdata.currency as currencyv}
                            <option value={currencyv}>
                              {currencyv.refvalue}
                            </option>
                           {/each}

                          </select>

                            <!--div class="pristine-error-group"></div-->
                            {#if $errors.companyBaseCurency && (JSON.stringify($errors.companyBaseCurency)!= '{}') }
                            <small style="color:red">{$errors.companyBaseCurency}</small>
                          {/if}
                        </div>
           
                  <div class="md:col-span-1">				  
                    <label for="companyFiscalYear">Fiscal Year</label>
                             <select required 
                            name = "companyFiscalYear"
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                            bind:value={$form.companyFiscalYear}
                            >
                          
                            {#each refdata.finyear as finyearv}
                            <option value={finyearv}>
                              {finyearv.refvalue}
                            </option>
                           {/each}

                          </select>


                            <!--div class="pristine-error-group"></div-->
                            {#if $errors.companyFiscalYear && (JSON.stringify($errors.companyFiscalYear)!= '{}') }
                            <small style="color:red">{$errors.companyFiscalYear}</small>
                          {/if}
                        </div>
           
                  <div class="md:col-span-2">				  
                    <label for="companysParent">Paren Company</label>
                            <select type="text" required 
                            name = "companysParent"
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                            bind:value={$form.companyParent}
                            on:blur ={handleChange}
                            on:change ={handleChange}
                            ></select>
                            <option >                              
                            </option>
                            <!--div class="pristine-error-group"></div-->
                            {#if $errors.companysParent && (JSON.stringify($errors.companysParent)!= '{}') }
                              <small style="color:red">{$errors.companysParent}</small>
                            {/if}
                        </div>
            </div>
        </form> 
    </div>
    
    
    
    
    <style>
          .upload{
            display:flex;
        height:50px;
            width:50px;
            cursor:pointer;
        }
    
      .avatar{
            height:200px;
            width:200px;
        }
    </style>