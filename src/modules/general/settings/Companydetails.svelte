<script>

    import {formValidator} from '../../../common/formvalidators/formvalidator';
    import {onMount, onDestroy} from 'svelte';
    import { http } from '../../../stores/services';
    import { Accordion, AccordionItem } from "../../../common/accordion/index";
    import { createEventDispatcher } from 'svelte';

    
    import { getNotificationsContext } from '../../../common/notifications';
const { addNotification } = getNotificationsContext();


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

    /*
    let data    = {
        companyId: null,
        companyName: "Natrayan",
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

        entityid:null,
}*/

    
    let  avatar, fileinput;
    let mymodal = null;

      let btntxt;
      let mform;	

        let companyform;	
        let companystore;
        let companydata;

        export let companydata_init;	
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

        $: companydata;
        companydata = JSON.parse(JSON.stringify(companydata_init));        
        companyform = formValidator(companydata);
        companystore = companyform.data;	
        $companystore = companydata;
    
        const companyunsub = companystore.subscribe(value => {		
            console.log(value)	;
            companydata = value;		
        });
    
        const loginprogressmodal = () => {
		return addNotification({
				title : 'Checking your account',
				text: 'hi i am custom notification why it cant be sol long so i can test it before using it' ,
				notificationtype: 'modal',            
				modaltype:'modal-loading',  	
        //comp : Circularprogress,				
			});
	}
    
        onMount(async() => {	
          console.log("_____________-going inside onmount 232-____________________")  ;
          console.log(mode);
          mymodal =loginprogressmodal();  
          let respdata;

          // This is edit mode
          if(mode === 'edit' && (refdata === {} || companydata_init.length < 1)) {
            console.log("inside onmoung inner before get");
            respdata = await http.get('getcompany'); 
            refdata = respdata.data.refdata;            
            console.log("inside onmoung inner after get");

            if(respdata.data.company.length == 0 ) {
              companydata_init = dd;
              console.log("inside onmoung inner if");
            } else {
              companydata_init = respdata.data.company[0];
              console.log("inside onmoung inner else");
            }
            
          } else if( companydata_init.length > 0) {
            companydata_init = companydata_init[0];
            if (companydata_init.companyFiscalYear.Int) companydata_init.companyFiscalYear = companydata_init.companyFiscalYear.Int;
            if (companydata_init.companyPinCode.Int) companydata_init.companyPinCode = companydata_init.companyPinCode.Int;
          }

          $companystore = companydata_init;	

          console.log("init the dorp down values");
                // Populate the default values for the dropdown    
                console.log(JSON.stringify(companydata));

                if (typeof companydata.companyCountry === 'string' || companydata.companyCountry instanceof String) {
                  $companystore.companyCountry = getvalue('companyCountry',companydata.companyCountry);    
                } else {
                  $companystore.companyCountry = companydata.companyCountry;    
                }                
                console.log(JSON.stringify(companydata));
                let mys = companydata.companyState;
                let myc = companydata.companyCity;
                countryselect();        
                console.log(JSON.stringify(companydata));   
                console.log(myc);
                if (typeof mys === 'string' || mys instanceof String) { 
                    $companystore.companyState = getvalue('companyState', mys);
                } else {
                    $companystore.companyState = mys;
                }
               stateselect();      
               if (typeof myc === 'string' || myc instanceof String) {          
                $companystore.companyCity = getvalue('companyCity', myc);
               } else {
                    $companystore.companyCity = myc;
                }
                $companystore.companyCategory=getvalue('companyCategory',companydata.companyCategory);                
                $companystore.companyIndustry =   getvalue('companyIndustry',companydata.companyIndustry);

                mform = document.getElementById("companyform");		
            companyform.initVal(mform);	
	
            if(mode === 'display') {
                companyform.disable(mform);
            } else {
              companyform.enable(mform);
              btntxt = "Save";
            }
            mymodal.close();
            mymodal=null;            
        });
    
      export async function companysave(){
        if(btntxt === "Save") {
          console.log(companydata);
          //toggle_btn_text();
          companyform.disable(mform);
          let formDatae = new FormData();
          console.log(JSON.stringify(companydata));

          companydata.companyCountry = companydata.companyCountry.refvalue;
          companydata.companyState = companydata.companyState.refvalue;
          companydata.companyCity = companydata.companyCity.refvalue;          
          companydata.companyCategory = companydata.companyCategory.refvalue;
          companydata.companyIndustry = companydata.companyIndustry.refvalue;
          
          if (!companydata.companyCity === undefined) companydata.companyCity = ""; 
          formDatae.append("text_field", JSON.stringify(companydata));
          formDatae.append("file_field", avatar);
          respdata = await http.postForm('upload',formDatae);
        } else {
          toggle_btn_text();
          companyform.enable(mform);
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

    const sendcardaction = () => {		
		//Dispatch the favorite event with object data
		dispatch('editresult');
	}

  

  function countryselect() {
    console.log($companystore.companyCountry);
    console.log($companystore.companyCountry.submenu);
    if($companystore.companyCountry.submenu) {
      console.log("@@#$@#@#@#@#@#@#@#@#@#");
      states = $companystore.companyCountry.submenu;      
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
    $companystore.companyState = '';
    $companystore.companyCity = '';  
  }


  function stateselect() {
    console.log("------State change start------");
    console.log($companystore.companyState);
    if($companystore.companyState.submenu) {
      citys = $companystore.companyState.submenu;
    } else {
      citys = [];
    }

    //Reset the previously selected values
    $companystore.companyCity = '';
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
  case 'companyCountry':    
    return match (refdata.country,matchstr);  
  case 'companyState':    
    if ($companystore.companyCountry.submenu !== undefined) {
      return match ($companystore.companyCountry.submenu,matchstr); 
    } else {
      return {}
    }
  case 'companyCity':  
    if ($companystore.companyState.submenu !== undefined) {  
    return match ($companystore.companyState.submenu,matchstr); 
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
    
    
    
      
    
    
    <div class="shadow rounded-lg flex flex-col flex-auto pb-7 bg-white">
    {#if mode !== 'display'}
        <div class="bg-blue-100 h-20 rounded-t-lg flex flex-row items-center px-7">
            <h2 class="text-2xl text-black text-gray-700 font-bold">Company Settings</h2>  
            <span class="flex-grow"></span>  
           <button class=" bg-indigo-700 rounded text-white font-semibold w-36 py-2 px-7 shadow" 
           on:click|preventDefault={companysave}>
             {btntxt}
            </button>
            {#if !firstvisit}
           <span class="flex w-5"></span>
          <button class="bg-red-600 rounded text-white font-semibold w-36 py-2 px-7  shadow" on:click={sendcardaction}>Cancel</button>  
          {/if}    
          
        </div>
    {/if}
        <form id="companyform" class="px-10 py-1 rounded w-full my-5 inputs space-y-6">
            <div class="grid grid-cols-1 auto-rows-auto md:grid-cols-9 md:grid-rows-6 md:gap-x-10  gap-y-5 md:gap-y-0	">
    
    
                <div class="pristine-form-group md:col-start-1 md:col-span-3">				  
                  
                    <label for="companyname">Name</label>
                    <input  required 
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                            type = "text"
                            bind:value={$companystore.companyName}
                            />
                    <div class="pristine-error-group"></div>
                  </div>
    
                  <div class="pristine-form-group md:col-start-4 md:col-span-3">				  
                    <label for="companyshortname">Short Name</label>
                            <input required 
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                            type = "text"
                            bind:value={$companystore.companyShortName}
                            />
                            <div class="pristine-error-group"></div>
                        </div>
           
           
                  <div class="pristine-form-group md:row-span-3 md:col-start-7 md:col-span-3  place-self-center  justify-self-center w-full h-full border-2 border-gray-400 border-dashed md:order-none order-first">            
                      <div class="flex flex-col h-full  justify-center justify-self-center">
                        {#if avatar}
                        <img class="avatar" src="{avatar}" alt="d" />
                        {/if}
                        <button class="self-center text-gray-500 text-4xl rounded-xl px-4" on:click|preventDefault={()=>{fileinput.click();}}>+</button>                    
                        <h5 class="self-center text-gray-400" on:click={()=>{fileinput.click();}}>Add your company Logo</h5>      
                        <input style="display:none" type="file" accept=".jpg, .jpeg, .png" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >                   
                      </div>
                      <div class="pristine-error-group"></div>
                </div>
           
                  <div class="pristine-form-group md:col-start-1 md:col-span-3">				  
                    <label for="companyCategory">Category</label>
                            <select required 
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                            bind:value={$companystore.companyCategory}>  
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
                            <div class="pristine-error-group"></div>
                        </div>
           
                    <div class="pristine-form-group md:col-start-4 md:col-span-3">				  
                    <label for="companyIndustry">Industry</label>
                            <select required 
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                            bind:value={$companystore.companyIndustry}
                            >
                          
                            {#each refdata.industype as industyp}
                            <option value={industyp}>
                              {industyp.refvalue}
                            </option>
                           {/each}

                          </select>
                            <div class="pristine-error-group"></div>
                        </div>
           
                    <div class="pristine-form-group md:col-start-1 md:col-span-3">				  
                    <label for="companyTaxID">Tax ID</label>
                            <input required 
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                            type = "text"
                            bind:value={$companystore.companyTaxID}
                            />
                            <div class="pristine-error-group"></div>
                        </div>
           
                    <div class="pristine-form-group md:col-start-4 md:col-span-3">				  
                    <label for="companyStartDate">Start Date</label>
                            <input required 
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                            type = "date"
                            bind:value={$companystore.companyStartDate}
                            />
                            <div class="pristine-error-group"></div>
                        </div>
           
                    <div class="pristine-form-group md:col-start-1 md:col-span-5">				  
                    <label for="companyAddLine1">Address Line 1</label>
                            <textarea required 
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                            type = "text"
                            bind:value={$companystore.companyAddLine1}
                            ></textarea>
                            <div class="pristine-error-group"></div>
                        </div>
           
                  <div class="pristine-form-group md:col-start-6 md:col-span-4">				  
                    <label for="companyAddLine2">Address Line 2</label>
                            <textarea required 
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                            type = "text"
                            bind:value={$companystore.companyAddLine2}
                            ></textarea>
                            <div class="pristine-error-group"></div>
                        </div>
           
                  
                  <div class="pristine-form-group md:col-start-1 md:col-span-2 my-3">				  
                    <label for="companyCountry">Country</label>
                            <!-- svelte-ignore a11y-no-onchange -->
                            <select required 
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                            bind:value={$companystore.companyCountry} on:change={()=>countryselect()}
                            >
                            {#each refdata.country as country}
                            <option value={country}>
                              {country.refvalue}
                            </option>
                          {/each}
                        </select>
                            <div class="pristine-error-group"></div>
                        </div>
                        <div class="pristine-form-group md:col-start-3 md:col-span-3  my-3">				  
                          <label for="companyState">State</label>
                                  <!-- svelte-ignore a11y-no-onchange -->
                                  <select required 
                                  class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                                  bind:value={$companystore.companyState}  on:change={stateselect}
                                  >
                    
                                  {#each states as state}
                                  <option value={state}>
                                    {state.refvalue}
                                  </option>
                                {/each}
                    
                                </select>
                                  <div class="pristine-error-group"></div>
                              </div>
           
                  <div class="pristine-form-group md:col-start-6 md:col-span-3  my-3">				  
                    <label for="companyCity">City</label>
                            <select required 
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                            bind:value={$companystore.companyCity}
                            >
                            {#each citys as city}
                            <option value={city}>
                              {city.refvalue}
                            </option>
                          {/each}
                            /select>
                            <div class="pristine-error-group"></div>
                        </div>
           

           
                    <div class="pristine-form-group md:col-start-9 md:col-span-1  my-3">				  
                    <label for="companyPinCode">Pin</label>
                            <input required 
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                            type = "text"
                            bind:value={$companystore.companyPinCode}
                            />
                            <div class="pristine-error-group"></div>
                        </div>
                  
           
                  <div class="pristine-form-group md:col-span-2">				  
                    <label for="companyPhone">Phone</label>
                            <input type="text" required 
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                            bind:value={$companystore.companyPhone}
                            />
                            <div class="pristine-error-group"></div>
                        </div>
                  <div class="pristine-form-group md:col-span-2">				  
                    <label for="companyFax">Fax</label>
                            <input type="text" required 
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                            bind:value={$companystore.companyFax}
                            />
                            <div class="pristine-error-group"></div>
                        </div>
                  
           
                  <div class="pristine-form-group  md:col-span-2">				  
                    <label for="companyMobile">Mobile</label>
                            <input type="text" required 
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                            bind:value={$companystore.companyMobile}
                            />
                            <div class="pristine-error-group"></div>
                        </div>
           
                  <div class="pristine-form-group  md:col-span-3">				  
                    <label for="companyEmail">email</label>
                            <input type="text" required 
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                            bind:value={$companystore.companyEmail}
                            />
                            <div class="pristine-error-group"></div>
                        </div>
           
           
                  <div class="pristine-form-group  md:col-span-4">				  
                    <label for="companyWebsite">Website</label>
    
                            <input type="text" required 
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                            bind:value={$companystore.companyWebsite}
                            />
                            <div class="pristine-error-group"></div>
                      </div>
           
           
                  <div class="pristine-form-group  md:col-span-1">				  
                    <label for="companyTimeZone">Timezone</label>
                            <input type="text" required 
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                            bind:value={$companystore.companyTimeZone}
                            />
                            <div class="pristine-error-group"></div>
                        </div>
           
                  <div class="pristine-form-group  md:col-span-1">				  
                    <label for="companyBaseCurency">Currency</label>
                            <input type="text" required 
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                            bind:value={$companystore.companyBaseCurency}
                            />
                            <div class="pristine-error-group"></div>
                        </div>
           
                  <div class="pristine-form-group  md:col-span-1">				  
                    <label for="companyFiscalYear">Fiscal Year</label>
                            <input type="text" required 
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                            bind:value={$companystore.companyFiscalYear}
                            />
                            <div class="pristine-error-group"></div>
                        </div>
           
                  <div class="pristine-form-group  md:col-span-2">				  
                    <label for="companysParent">Paren Company</label>
                            <select type="text" required 
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                            bind:value={$companystore.companyParent}
                            ></select>
                            <div class="pristine-error-group"></div>
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