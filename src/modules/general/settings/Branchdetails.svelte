<script>

    import {formValidator} from '../../../common/formvalidators/formvalidator';
    import {onMount, onDestroy} from 'svelte';
    import { http } from '../../../stores/services';
    import { Accordion, AccordionItem } from "../../../common/accordion/index";
    import { createEventDispatcher } from 'svelte';
    import { entityStore,enityVal, authStore, authVal } from "../../../stores/stores";
    import { goto } from '@roxi/routify';

    import { getNotificationsContext } from '../../../common/notifications';
const { addNotification } = getNotificationsContext();


const dd = {
            companyId: null,
            companyName: null,        
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

          if( branchdata_init.length > 0) {
            console.log("else if( branchdata_init.length > 0)");
            console.log(branchdata_init);
            branchdata_init = branchdata_init[0];
          } else if (branchdata_init.length < 1) {
            console.log("else if( branchdata_init.length >1)");
            console.log(authVal);
            if(mode === "new") {
              dd.companyId = authVal.activecompany.companyId;
              dd.companyName = authVal.activecompany.companyName;
              branchdata_init = dd;  
            } else {
              console.error("No branchdata go back to branch.svelete");
            }
          }

          if(JSON.stringify(refdata) === JSON.stringify({})) {
            console.error("No refdata go back to branch.svelete");
          }
          
          console.log(authVal);
          console.log(branchdata_init);
          $branchstore = branchdata_init;	

          console.log("init the dorp down values");

                // Populate the default values for the dropdown    
                console.log(JSON.stringify(branchdata));
                if (branchdata.branchId != null) {
                    if (typeof branchdata.branchCountry === 'string' || branchdata.branchCountry instanceof String) {
                      $branchstore.branchCountry = getvalue('branchCountry',branchdata.branchCountry);    
                    } else {
                      $branchstore.branchCountry = branchdata.branchCountry;    
                    }                
                    console.log(JSON.stringify(branchdata));
                    let mys = branchdata.branchState;
                    let myc = branchdata.branchCity;

                
                    countryselect();        
                    console.log(JSON.stringify(branchdata));   
                    console.log(myc);
                    if (typeof mys === 'string' || mys instanceof String) { 
                        $branchstore.branchState = getvalue('branchState', mys);
                    } else {
                        $branchstore.branchState = mys;
                    }
                  stateselect();      
                  if (typeof myc === 'string' || myc instanceof String) {          
                    $branchstore.branchCity = getvalue('branchCity', myc);
                  } else {
                        $branchstore.branchCity = myc;
                    }               
               
                }

              console.log("forming form");
            mform = document.getElementById("branchform");		
            branchform.initVal(mform);	
	
            if(mode === 'display') {
                branchform.disable(mform);
            } else {
              branchform.enable(mform);              
              branchform.eledisable([document.getElementById("cpyname")]);	              
              btntxt = "Save";
              if (mode === "edit") btntxt = "Update";
            }

           //mymodal.close();
           //mymodal=null;            
        });   
        

      export async function branchsave(){
        let respdata;
        if(["Save","Update"].includes(btntxt)) {
          console.log(branchdata);
          //toggle_btn_text();
          branchform.disable(mform);
          let formDatae = new FormData();
          console.log(JSON.stringify(branchdata));

          branchdata.branchCountry = branchdata.branchCountry.refvalue;
          branchdata.branchState = branchdata.branchState.refvalue;
          branchdata.branchCity = branchdata.branchCity.refvalue;          
          //branchdata.companyCategory = branchdata.companyCategory.refvalue;
          //branchdata.companyIndustry = branchdata.companyIndustry.refvalue;
          //branchdata.companyPinCode = Number(branchdata.companyPinCode);
          //branchdata.companyFiscalYear = Number(branchdata.companyFiscalYear); 

          
          if (!branchdata.branchCity === undefined) branchdata.branchCity = ""; 
         /*
          formDatae.append("text_field", JSON.stringify(branchdata));
          formDatae.append("text_action",JSON.stringify({"optype": btntxt}))
          formDatae.append("file_field", avatar);
          */
          //respdata = await http.postForm('upload',formDatae);
          respdata = await http.post('branchsave',branchdata);
          sendcardaction("save");
        } else {
          //toggle_btn_text();
          branchform.enable(mform);
        }
        
      }
    
      function toggle_btn_text(){
        (btntxt === "Edit")? btntxt = "Save" : btntxt = "Edit";
      }
    
    const dispatch = createEventDispatcher();

    const sendcardaction = (btnpressed) => {
		dispatch('editresult',{
			action: btnpressed
		});
	}

  
  function countryselect() {
    
    console.log($branchstore);
    console.log($branchstore.branchCountry.submenu);
    if($branchstore.branchCountry.submenu) {
      console.log("@@#$@#@#@#@#@#@#@#@#@#");
      states = $branchstore.branchCountry.submenu;      
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
    $branchstore.branchState = '';
    $branchstore.branchCity = '';  
  }


  function stateselect() {
    console.log("------State change start------");
    console.log($branchstore.branchState);
    if($branchstore.branchState.submenu) {
      citys = $branchstore.branchState.submenu;
    } else {
      citys = [];
    }

    //Reset the previously selected values
    $branchstore.branchCity = '';
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
    if ($branchstore.branchCountry.submenu !== undefined) {
      return match ($branchstore.branchCountry.submenu,matchstr); 
    } else {
      return {}
    }
  case 'branchCity':  
    if ($branchstore.branchState.submenu !== undefined) {  
    return match ($branchstore.branchState.submenu,matchstr); 
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
    </script>
    
    
    
    
<div class="shadow rounded-lg flex flex-col  bg-white">
    {#if mode !== 'display'}
        <div class="bg-blue-100 h-20 rounded-t-lg flex flex-row items-center px-7">
            <h2 class="text-2xl text-black text-gray-700 font-bold">{btntxt==="Save"?"Add New ":btntxt+" " } Branch</h2>
            <span class="flex-grow"></span>  
           <button class=" bg-indigo-700 rounded text-white font-semibold w-36 py-2 px-7 shadow" 
           on:click|preventDefault={branchsave}>
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
  
            <div class="pristine-form-group md:col-start-1 md:col-span-5">				  
                <label for="companyname">Company Name</label>
                <input required disabled
                        id="cpyname"  
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                        type = "text"
                        bind:value={$branchstore.companyName}
                        />
                <div class="pristine-error-group"></div>
              </div>
  
              <div class="pristine-form-group md:col-start-1 md:col-span-5">				  
                <label for="branchname">Branch Name</label>
                        <input required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                type = "text"
                bind:value={$branchstore.branchName}
                        />
                        <div class="pristine-error-group"></div>
                    </div>
       
              <div class="pristine-form-group md:col-start-6 md:col-span-5">				  
                <label for="branchname">Branch Short Name</label>
                        <input required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                type = "text"
                bind:value={$branchstore.branchShortName}

                        />
                        <div class="pristine-error-group"></div>
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
  
  
                <div class="pristine-form-group md:col-start-1 md:col-span-5">				  
                <label for="firstname">Address Line 1</label>
                        <textarea required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                type = "text"
                bind:value={$branchstore.branchAddLine1}
                        ></textarea>
                        <div class="pristine-error-group"></div>
                    </div>
       
              <div class="pristine-form-group md:col-start-6 md:col-span-5">				  
                <label for="Addressline2">Address Line 2</label>
                        <textarea required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                type = "text"
                bind:value={$branchstore.branchAddLine2}
                        ></textarea>
                        <div class="pristine-error-group"></div>
                    </div>
  
              <div class="pristine-form-group md:col-start-1 md:col-span-5 my-3">				  
                <label for="Country">Country</label>
                        <select required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                        bind:value={$branchstore.branchCountry} on:change={()=>countryselect()}
                        >
                        {#each refdata.country as country}
                        <option value={country}>
                          {country.refvalue}
                        </option>
                      {/each}
                      </select>
                        <div class="pristine-error-group"></div>
                    </div>
       

       
              <div class="pristine-form-group md:col-start-6 md:col-span-5  my-3">				  
                <label for="State">State</label>
                        <select required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                        bind:value={$branchstore.branchState}  on:change={stateselect}
                        >
          
                        {#each states as state}
                        <option value={state}>
                          {state.refvalue}
                        </option>
                      {/each}
                    </select>
                        <div class="pristine-error-group"></div>
                    </div>

                    <div class="pristine-form-group md:col-start-1 md:col-span-5  my-3">				  
                      <label for="City">City</label>
                              <select required 
                              class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                              bind:value={$branchstore.branchCity}
                              >
                              {#each citys as city}
                              <option value={city}>
                                {city.refvalue}
                              </option>
                            {/each}
                          </select>
                              <div class="pristine-error-group"></div>
                          </div>
       
                <div class="pristine-form-group md:col-start-6 md:col-span-5  my-3">				  
                <label for="firstname">Pin</label>
                        <input required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                type = "text"
                bind:value={$branchstore.branchPinCode}
                        />
                        <div class="pristine-error-group"></div>
                    </div>
              
  
  
   
       
  
       
              
       
              <div class="pristine-form-group md:col-span-5">				  
                <label for="Phone">Phone</label>
                        <input  required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                        type = "text"
                        bind:value={$branchstore.branchPhone}                        
                        />
                        <div class="pristine-error-group"></div>
                    </div>
              <div class="pristine-form-group md:col-span-5">				  
                <label for="Phone">Fax</label>
                        <input type="text" required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                        bind:value={$branchstore.companyFax}
                        />
                        <div class="pristine-error-group"></div>
                    </div>
              
       
              <div class="pristine-form-group  md:col-span-5">				  
                <label for="Phone">Mobile</label>
                        <input type="text" required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                        bind:value={$branchstore.companyMobile}
                        />
                        <div class="pristine-error-group"></div>
                    </div>
       
              <div class="pristine-form-group  md:col-span-5">				  
                <label for="Phone">email</label>
                        <input type="text" required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                        bind:value={$branchstore.companyEmail}
                        />
                        <div class="pristine-error-group"></div>
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
       
       
              <div class="pristine-form-group  md:col-span-5">				  
                <label for="Phone">Website</label>
                        <input type="text" required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                        bind:value={$branchstore.companyWebsite}
                        />
                        <div class="pristine-error-group"></div>
                    </div>     

                    <div class="pristine-form-group md:col-start-6 md:col-span-3">				  
                      <label for="firstname">Start Date</label>
                              <input required 
                              class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                      type = "date"
                      bind:value={$branchstore.branchStartDate}
                              />
                              <div class="pristine-error-group"></div>
                          </div>
  
        </div>
    </form> 
  </div>
    
    
    
    