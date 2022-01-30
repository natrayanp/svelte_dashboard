<script>

    import {formValidator} from '../../../common/formvalidators/formvalidator';
    import {onMount, onDestroy} from 'svelte';
    import {disableform,enableform,disableelement,enableelement}from '../../../common/formvalidators/formdisable';
    import * as yup from "yup";
    import { http } from '../../../stores/services';
    import { Accordion, AccordionItem } from "../../../common/accordion/index";
    import { createEventDispatcher } from 'svelte';
    import { entityStore,enityVal, authStore, authVal } from "../../../stores/stores";
    import { goto } from '@roxi/routify';
    import Alerts from '../../../common/notifications/components/alerts/Alerts.svelte';
    import { createForm } from "svelte-forms-lib";
    import { getNotificationsContext } from '../../../common/notifications';
const { addNotification } = getNotificationsContext();


const dd = {
            companyId: null,
            companyName: null,        
            branchId: null,
            branchName: null,
            branchShortName: null,
            branchStatus: null,
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
            isdefault: 'Y',
            entityId: null,
        };
        

    console.log("+++++++++++++++++ start Branch details ++++++++++++++++++++++");
   // let  avatar, fileinput;
    let mymodal = null;

      let btntxt;
      let mform;	

       // let branchform;	
        //let branchstore;
        let branchdatacpy;
        let yes = true;
        let respdata;


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
        //if (!refdata.induscat)  refdata.induscat = [];
        //if (!refdata.industype) refdata.industype = [];
        //if (!refdata.compcat) refdata.compcat = [];

      /*  $: branchdata;
        console.log(branchdata_init);
        if(branchdata_init.isArray && branchdata_init.length > 0 ) {  
          branchdata= JSON.parse(JSON.stringify(branchdata_init[0]));
        } 
        branchdata= dd;
        branchform = formValidator(branchdata);
        branchstore = branchform.data;	
        $branchstore = branchdata;
*/

const { form, errors,state,  handleChange, handleSubmit } = createForm({
          initialValues: branchdata_init,
          validationSchema: yup.object().shape({
              companyName: yup.string().required("Required field"),
              branchName: yup.string().required("Required field"),    
              branchShortName: yup.string().required("Required field"),                        
             /* branchCategory: yup.object().test(
                                                'category',
                                                'Please select Category',
                                                  val => !val.refvalue ? false : true,
                                                ),
              //companyLogoUrl: null,
              //companyLogo: null,
              
              branchDescription: yup.string().required("Required field"), */
              branchStartDate: yup.date().required("Required field")
                                          .default(() => new Date().toLocaleDateString('en-CA')),                                          
              branchAddLine1: yup.string().required("Required field"),
              branchAddLine2: yup.string().required("Required field"),
              branchCountry: yup.object().test(
                                                'country',
                                                'Please select Country',
                                                  val => !val.refvalue ? false : true,
                                                ),
              branchCity: yup.object().test(
                                                'city',
                                                'Please select city',
                                                  val => !val.refvalue ? false : true,
                                                ),
              branchState: yup.object().test(
                                                'state',
                                                'Please select State',
                                                  val => !val.refvalue ? false : true,
                                                ),
              branchPinCode: yup.string().required("Required field"),
              branchPhone: yup.string(),
              branchFax: yup.string(),
              branchMobile: yup.number().required("Required field"),
              branchEmail: yup.string().email().required("Required field"),
              branchWebsite: yup.string().required("Required field"),
              
              //entityid:null,
            }),
          onSubmit:  async values => {  
            console.log(values);
            await branchsave(values);            
          }
        });





    /*
        const branchunsub = branchstore.subscribe(value => {		
            console.log(value)	;
            branchdata= value;		
        });

        */
    

        
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
          mform = document.getElementById("branchform");	

         
          if( Array.isArray(branchdata_init) && branchdata_init.length > 0) {
            console.log("else if( branchdata_init.length > 0)");
            console.log(branchdata_init);
            branchdata_init = branchdata_init[0];
            branchdata_init.branchStartDate = new Date(branchdata_init.branchStartDate ).toLocaleDateString('en-CA');            
            branchdata_init.companyName = authVal.activecompany.companyName;
          //} else if (branchdata_init.length < 1) {
          } else {
            console.log("else if( branchdata_init.length >1)");
            console.log(authVal);
            if(mode === "new") {
              dd.companyId = authVal.activecompany.companyId;
              dd.companyName = authVal.activecompany.companyName;
              if(authVal.allbranch && authVal.allbranch.length > 0) {
                let defbr = authVal.allbranch.filter((x) => x.isdefault === 'Y');
                
                if(defbr.length > 0) {
                  dd.isdefault='N';
                }
              }
              branchdata_init = dd;  
            } else {
              console.error("No branchdata go back to branch.svelete");
            }
          }

          $form = JSON.parse(JSON.stringify(branchdata_init));
          console.log(branchdata_init.isdefault==='Y'?true:false);
          branchdata_init.isdefault==='Y'?yes=true:yes=false; 
          branchdatacpy = JSON.parse(JSON.stringify($form));
          console.log(branchdatacpy);
          console.log(yes);


          if(JSON.stringify(refdata) === JSON.stringify({})) {
            console.error("No refdata go back to branch.svelete");
          }
          
          console.log(authVal);
          console.log(branchdata_init);
          //$branchstore = branchdata_init;	

          init_all_Dropdowns();

              console.log("forming form");
            //mform = document.getElementById("branchform");		
            //branchform.initVal(mform);	
	
            if(mode === 'display') {
                //branchform.disable(mform);
                disableform(mform);
            } else {
              enableform(mform);           
              disableelement([document.getElementById("companyName")]);	              
              if(mode === "edit") disableelement([document.getElementById("branchName")]);	              
              btntxt = "Save";
              if (mode === "edit") btntxt = "Update";
            }
           // console.log(JSON.stringify(enityVal));
           //mymodal.close();
           //mymodal=null;            
        });   
        

    function init_all_Dropdowns(){
      console.log("init the dorp down values");

// Populate the default values for the dropdown    
console.log(JSON.stringify(branchdata_init));
if (branchdata_init.branchId != null) {
    if (typeof branchdata_init.branchCountry === 'string' || branchdata_init.branchCountry instanceof String) {
      $form.branchCountry = getvalue('branchCountry',branchdata_init.branchCountry);    
    } else {
      $form.branchCountry = branchdata.branchCountry;    
    }                
    console.log(JSON.stringify(branchdata_init));
    let mys = branchdata_init.branchState;
    let myc = branchdata_init.branchCity;


    countryselect();        
    console.log(JSON.stringify(branchdata_init));   
    console.log(myc);
    if (typeof mys === 'string' || mys instanceof String) { 
        $form.branchState = getvalue('branchState', mys);
    } else {
        $form.branchState = mys;
    }
  stateselect();      
  if (typeof myc === 'string' || myc instanceof String) {          
    $form.branchCity = getvalue('branchCity', myc);
  } else {
        $form.branchCity = myc;
    }               

  branchdata_init.isdefault === 'Y'?yes =true:yes =false;                  
  $form.isdefault =  yes?'Y':'N';
}
    }

       async function branchsave(formdata){
        disableform(mform);
        let formdatacpy = JSON.parse(JSON.stringify(formdata));
        console.log(btntxt);
        console.log(["Save","Update"].includes(btntxt));

        if(["Save","Update"].includes(btntxt)) {
          console.log("test");
        }
        if(["Save","Update"].includes(btntxt)) {
          console.log("dldls1");
          //console.log(branchdata);

          //toggle_btn_text();
         // branchform.disable(mform);
          //let formDatae = new FormData();
          //console.log(JSON.stringify(branchdata));

          formdata.companyName = authVal.activecompany.companyName;
          formdata.branchCountry = formdata.branchCountry.refvalue;
          formdata.branchState = formdata.branchState.refvalue;
          formdata.branchCity = formdata.branchCity.refvalue;       
         
          
          //branchdata.companyCategory = branchdata.companyCategory.refvalue;
          //branchdata.companyIndustry = branchdata.companyIndustry.refvalue;
          //branchdata.companyPinCode = Number(branchdata.companyPinCode);
          //branchdata.companyFiscalYear = Number(branchdata.companyFiscalYear); 

          console.log("dldls");
          if (!formdata.branchCity === undefined) formdata.branchCity = ""; 
         /*
          formDatae.append("text_field", JSON.stringify(branchdata));
          formDatae.append("text_action",JSON.stringify({"optype": btntxt}))
          formDatae.append("file_field", avatar);
          */
          //respdata = await http.postForm('upload',formDatae);


          let senddata = {}
          if(JSON.stringify(formdata) !== JSON.stringify(branchdatacpy)) {
          formdata.branchStartDate = new Date(formdata.branchStartDate).toISOString();   
          senddata = {'optype': btntxt,'branchdata':formdata}
          console.log(senddata);
          respdata = await http.post('branchsave',senddata).catch(e=>{
            //TODO Error handling
            console.error(e);
          });

          console.log(respdata);
            console.log(respdata.data.branch.length);
            console.log(respdata.data.branch[0]);
            console.log(firstvisit);

          if(!firstvisit) {
          if(respdata.data.branch.length == 1 ) {
            console.log("entering update");
            respdata.data.branch[0].branchStartDate = new Date(respdata.data.branch[0].branchStartDate).toLocaleDateString('en-CA');
            console.log("entering update1");
            authStore.setBranch(JSON.parse(JSON.stringify(respdata.data.branch[0])));
            console.log("after update");

          } else {
          //TODO: Throw error
          console.log("in else after update");

          } 
        }
        console.log("sendcaraction");

          console.log(respdata);
          sendcardaction(btntxt);
        } else{
          console.log("No Change in values to update");   
            let s = allAlerts({tgt:"sudo4",text:"No data changed for "+btntxt,type:'warning'});    
            $form = JSON.parse(JSON.stringify(formdatacpy));       
            init_all_Dropdowns();
            enableform(mform);
            disableelement([document.getElementById("companyName")]);	
        }
        } else {
          //toggle_btn_text();
          //branchform.enable(mform);
          console.log("going else");
          enableform(mform);
          disableelement([document.getElementById("companyName")]);	
        }
        
      }

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
  
    const dispatch = createEventDispatcher();

    const sendcardaction = async (btnpressed) => {
      let cpy;
      if(firstvisit) {
        $goto('/login');
        return;
      }else if(['Save','Update'].includes(btnpressed)) {
        console.log(respdata);
        cpy =  respdata.data.branch[0];
        } else {
          cpy = "";
        }
		//Dispatch the favorite event with object data
		dispatch('editresult',{
			action: btnpressed,
      branch: cpy
		});
	}

  
  function countryselect() {
    
    console.log($form);
    console.log($form.branchCountry.submenu);
    if($form.branchCountry.submenu) {
      console.log("@@#$@#@#@#@#@#@#@#@#@#");
      states = $form.branchCountry.submenu;      
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
    $form.branchState = '';
    $form.branchCity = '';  
  }


  function stateselect() {
    console.log("------State change start------");
    console.log($form.branchState);
    if($form.branchState.submenu) {
      citys = $form.branchState.submenu;
    } else {
      citys = [];
    }

    //Reset the previously selected values
    $form.branchCity = '';
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
  case 'branchCountry':    
    return match (refdata.country,matchstr);  
  case 'branchState':    
    if ($form.branchCountry.submenu !== undefined) {
      return match ($form.branchCountry.submenu,matchstr); 
    } else {
      return {}
    }
  case 'branchCity':  
    if ($form.branchState?.submenu !== undefined) {  
    return match ($form.branchState.submenu,matchstr); 
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




function checkchange(e) {
  console.log(e);
  console.log("inside chkec change");
  
  $form.isdefault = e.target.checked?'Y':'N';

  if(e.target.checked) {
    //Check there are no other default branches exists    
  } else {
    // Before removing ensure we have other branches as default
  }
}

function chkcllick(){
  console.log("clicked button");
  handleSubmit();
  console.log($state.isSubmitting);

}

    </script>
    
<Alerts targetid="sudo4"/>
<div class="shadow rounded-lg flex flex-col  bg-white">
    {#if mode !== 'display'}
        <div class="bg-blue-100 h-20 rounded-t-lg flex flex-row items-center px-7">
            <h2 class="text-2xl text-black text-gray-700 font-bold">{btntxt==="Save"?"Add New ":btntxt+" " } Branch</h2>
            
            <span class="flex-grow"></span>  
            {#if !firstvisit}
            <button class="bg-red-600 rounded text-white font-semibold w-36 py-2 px-7  shadow" on:click={()=>sendcardaction('cancel')}>Cancel</button>  
            {/if}      
        
           <span class="flex w-5"></span>
           <button class="bg-indigo-700 rounded text-white font-semibold w-36 py-2 px-7 shadow" 
           on:click ={handleSubmit}>
             {btntxt}
            </button>
          
            
          
        </div>
    {/if}




    <form id="branchform" class="px-10 py-1 rounded w-full my-5 inputs space-y-6" on:submit|preventDefault={handleSubmit}>
        <div class="grid grid-cols-1 auto-rows-auto md:grid-cols-9 md:grid-rows-6 md:gap-x-10  gap-y-5 md:gap-y-0	">
  
            <div class=" md:col-start-1 md:col-span-5">				  
                <label for="companyname">Company Name</label>
                <input required disabled
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


              <div class="md:col-start-8 md:col-span-4">				
              <label for="default">Default Branch?</label>
                <input type=checkbox bind:checked={yes} on:change= {e=>checkchange(e)}>   
                {yes?'Yes':'No'}
                {#if $errors.isdefault && (JSON.stringify($errors.isdefault)!= '') }
                <small style="color:red">{$errors.isdefault}</small>
              {/if}
              </div>
  
              <div class=" md:col-start-1 md:col-span-5">				  
                <label for="branchname">Branch Name</label>
                        <input required 
                        id="branchName"  
                        name = "branchName"
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                type = "text"
                bind:value={$form.branchName}
                on:blur ={handleChange}
                on:change ={handleChange}
                        />
                        {#if $errors.branchName && (JSON.stringify($errors.branchName)!= '{}') }
                        <small style="color:red">{$errors.branchName}</small>
                      {/if}      
                                  </div>
       
              <div class="md:col-start-6 md:col-span-5">				  
                <label for="branchShortName">Branch Short Name</label>
                        <input required 
                        id="branchShortName"  
                        name = "branchShortName"
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                type = "text"
                bind:value={$form.branchShortName}
                on:blur ={handleChange}
                on:change ={handleChange}

                        />
                        {#if $errors.branchShortName && (JSON.stringify($errors.branchShortName)!= '{}') }
                        <small style="color:red">{$errors.branchShortName}</small>
                      {/if} 
                    </div>
  
  
       
              <!--div class="pristine-form-group md:col-start-1 md:col-span-3">				  
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
  
                <div class="pristine-form-group md:col-start-1 md:col-span-3">				  
                <label for="firstname">Start Date</label>
                        <input required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                type = "date"
                bind:value={$branchstore.branchStartDate}
                        />
                        <div class="pristine-error-group"></div>
                    </div-->
  
  
                <div class="md:col-start-1 md:col-span-5">				  
                <label for="branchAddLine1">Address Line 1</label>
                        <textarea required 
                        id="branchAddLine1"  
                        name = "branchAddLine1"
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                type = "text"
                bind:value={$form.branchAddLine1}
                on:blur ={handleChange}
                on:change ={handleChange}
                        ></textarea>
                        {#if $errors.branchAddLine1 && (JSON.stringify($errors.branchAddLine1)!= '{}') }
                        <small style="color:red">{$errors.branchAddLine1}</small>
                      {/if} 
                    </div>
       
              <div class="md:col-start-6 md:col-span-5">				  
                <label for="branchAddLine2">Address Line 2</label>
                        <textarea required 
                        id="branchAddLine2"  
                        name = "branchAddLine2"
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                type = "text"
                bind:value={$form.branchAddLine2}
                on:blur ={handleChange}
                on:change ={handleChange}
                        ></textarea>
                        {#if $errors.branchAddLine2 && (JSON.stringify($errors.branchAddLine2)!= '{}') }
                        <small style="color:red">{$errors.branchAddLine2}</small>
                      {/if} 
                    </div>
  
              <div class="md:col-start-1 md:col-span-3 my-3">				  
                <label for="branchCountry">Country</label>
                        <select required 
                        id="branchCountry"  
                        name = "branchCountry"
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                        bind:value={$form.branchCountry} 
                        on:change={()=>countryselect()}

                        >
                        {#each refdata.country as country}
                        <option value={country}>
                          {country.refvalue}
                        </option>
                      {/each}
                      </select>
                      {#if $errors.branchCountry && (JSON.stringify($errors.branchCountry)!= '{}') }
                      <small style="color:red">{$errors.branchCountry}</small>
                    {/if} 
                    </div>
       

       
              <div class="md:col-start-4 md:col-span-3  my-3">				  
                <label for="branchState">State</label>
                        <select required 
                        id="branchState"  
                        name = "branchState"
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                        bind:value={$form.branchState}  
                        on:change={stateselect}
                        >
          
                        {#each states as state}
                        <option value={state}>
                          {state.refvalue}
                        </option>
                      {/each}
                    </select>
                    {#if $errors.branchState && (JSON.stringify($errors.branchState)!= '{}') }
                    <small style="color:red">{$errors.branchState}</small>
                  {/if} 
                    </div>

                    <div class="md:col-start-7 md:col-span-3  my-3">				  
                      <label for="branchCity">City</label>
                              <select required 
                              id="branchCity"  
                              name = "branchCity"
                              class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                              bind:value={$form.branchCity}
                              >
                              {#each citys as city}
                              <option value={city}>
                                {city.refvalue}
                              </option>
                            {/each}
                          </select>
                          {#if $errors.branchCity && (JSON.stringify($errors.branchCity)!= '{}') }
                          <small style="color:red">{$errors.branchCity}</small>
                        {/if} 
                          </div>
       
                <div class="md:col-start-1 md:col-span-3  my-3">				  
                <label for="branchPinCode">Pin</label>
                        <input required 
                        id="branchPinCode"  
                        name = "branchPinCode"
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                type = "text"
                bind:value={$form.branchPinCode}
                on:blur ={handleChange}
                on:change ={handleChange}
                        />
                        {#if $errors.branchPinCode && (JSON.stringify($errors.branchPinCode)!= '{}') }
                        <small style="color:red">{$errors.branchPinCode}</small>
                      {/if} 
                    </div>
              
  
  
   
       
  
       
              
       
              <div class="md:col-start-1 md:col-span-3">				  
                <label for="branchPhone">Phone</label>
                        <input  required 
                        id="branchPhone"  
                        name = "branchPhone"
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                        type = "text"
                        bind:value={$form.branchPhone}      
                        on:blur ={handleChange}
                        on:change ={handleChange}                  
                        />
                        {#if $errors.branchPhone && (JSON.stringify($errors.branchPhone)!= '{}') }
                        <small style="color:red">{$errors.branchPhone}</small>
                      {/if} 
                    </div>
              <div class="md:col-start-4 md:col-span-3">				  
                <label for="branchFax">Fax</label>
                        <input type="text" required 
                        id="branchFax"  
                        name = "branchFax"
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                        bind:value={$form.branchFax}
                        on:blur ={handleChange}
                        on:change ={handleChange}
                        />
                        {#if $errors.branchFax && (JSON.stringify($errors.branchFax)!= '{}') }
                        <small style="color:red">{$errors.branchFax}</small>
                      {/if} 
                    </div>
              
       
              <div class="md:col-start-7 md:col-span-3">				  
                <label for="branchMobile">Mobile</label>
                        <input type="text" required 
                        id="branchMobile"  
                        name = "branchMobile"
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                        bind:value={$form.branchMobile}
                        on:blur ={handleChange}
                        on:change ={handleChange}
                        />
                        {#if $errors.branchMobile && (JSON.stringify($errors.branchMobile)!= '{}') }
                        <small style="color:red">{$errors.branchMobile}</small>
                      {/if} 
                    </div>
       
              <div class="md:col-span-5">				  
                <label for="branchEmail">email</label>
                        <input type="text" required 
                        id="branchEmail"  
                        name = "branchEmail"
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                        bind:value={$form.branchEmail}
                        on:blur ={handleChange}
                        on:change ={handleChange}
                        />
                        {#if $errors.branchEmail && (JSON.stringify($errors.branchEmail)!= '{}') }
                        <small style="color:red">{$errors.branchEmail}</small>
                      {/if}
                    </div>
       
       
                <!--div class="pristine-form-group md:col-start-1 md:col-span-3">				  
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
                        bind:value={$branchstore.companyTimeZone}
                        />
                        <div class="pristine-error-group"></div>
                    </div-->
       
       
              <div class="md:col-span-5">				  
                <label for="branchWebsite">Website</label>
                        <input type="text" required 
                        id="branchWebsite"  
                        name = "branchWebsite"
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                        bind:value={$form.branchWebsite}
                        on:blur ={handleChange}
                        on:change ={handleChange}
                        />
                        {#if $errors.branchWebsite && (JSON.stringify($errors.branchWebsite)!= '{}') }
                        <small style="color:red">{$errors.branchWebsite}</small>
                      {/if}
                    </div>     

                    <div class="md:col-start-1 md:col-span-3">				  
                      <label for="branchStartDate">Start Date</label>
                              <input required 
                              id="branchStartDate"  
                              name = "branchStartDate"
                              class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                      type = "date"
                      bind:value={$form.branchStartDate}
                      on:blur ={handleChange}
                      on:change ={handleChange}
                              />
                              {#if $errors.branchStartDate && (JSON.stringify($errors.branchStartDate)!= '{}') }
                              <small style="color:red">{$errors.branchStartDate}</small>
                            {/if}
                          </div>
  
        </div>
    </form> 
  </div>
    
    
    
    