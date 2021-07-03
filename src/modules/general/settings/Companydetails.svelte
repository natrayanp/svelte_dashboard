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

        $: companydata;
        //companydata_init=data;
         console.log(companydata_init);
        companydata = JSON.parse(JSON.stringify(companydata_init));
        
        companyform = formValidator(companydata);
        companystore = companyform.data;	
        $companystore = companydata;
    
        console.log(companystore);	
    
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
          mymodal =loginprogressmodal();  
          let respdata;
          if(mode === 'edit' && (refdata === {} || companydata_init.length < 1)) {
            respdata = await http.get('getcompany'); 
            refdata = respdata.data.refdata;            
            
            if(respdata.data.company.length == 0 ) {
              companydata_init = dd;
            } else {
              companydata_init = respdata.data.company[0];
            }

          } 

            console.log("inside onmoung");
            $companystore = companydata_init;	
            mform = document.getElementById("companyform");		
            companyform.initVal(mform);		
            if(mode === 'display') {
                companyform.disable(mform);
            } else {
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
          formDatae.append("file", avatar);
          console.log(JSON.stringify(companydata));
          formDatae.append("myjson", JSON.stringify(companydata));
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
                            bind:value={$companystore.companyshortname}
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
                            bind:value={$companystore.companyCategory}
                            >  
                              <!--
                            {#each questions as question}
                            <option value={question}>
                              {question.text}
                            </option>
                          {/each}


                          
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
                            >dasdfasdf</select>
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
                            <select required 
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                            bind:value={$companystore.companyCountry}
                            >dasdfasdf</select>
                            <div class="pristine-error-group"></div>
                        </div>
           
                  <div class="pristine-form-group md:col-start-3 md:col-span-3  my-3">				  
                    <label for="companyCity">City</label>
                            <select required 
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                            bind:value={$companystore.companyCity}
                            >dasdfasdf</select>
                            <div class="pristine-error-group"></div>
                        </div>
           
                  <div class="pristine-form-group md:col-start-6 md:col-span-3  my-3">				  
                    <label for="companyState">State</label>
                            <select required 
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                            bind:value={$companystore.companyState}
                            >dasdfasdf</select>
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