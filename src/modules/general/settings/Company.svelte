<script>

import {formValidator} from '../../../common/formvalidators/formvalidator';
import {onMount, onDestroy} from 'svelte';
import { http } from '../../../stores/services';



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

  let  avatar, fileinput;

  let my = true;
  let btntxt;
  let mform;	
	let companyform;	
	let companystore;
	let companydata;
	let companydata_init;	
	$: companydata;
	companydata_init = dd;
	companydata = JSON.parse(JSON.stringify(companydata_init));
	
	companyform = formValidator(companydata);
	companystore = companyform.data;	
	$companystore = companydata;

	console.log(companystore);	

	const companyunsub = companystore.subscribe(value => {		
		console.log(value)	;
		companydata = value;		
	});


	onMount(async() => {		
		mform = document.getElementById("companyform");		
		companyform.initVal(mform);		
    companyform.disable(mform);
    btntxt = "Edit";
	});

  export async function companysave(){
    if(btntxt === "Save") {
      console.log(companydata);
      toggle_btn_text();
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


</script>


<!--
<div class="flex flex-col" >


    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <caption class="bg-blue-100 rounded-t-lg divide-y divide-gray-300">                                
                <div class="flex md:flex-row flex-col items-center md:h-20 px-7">
                  <h2 class="text-2xl  text-gray-700 font-bold">Company Settings</h2>
                  <span class = "flex px-7"></span>
                  <button class=" flex bg-indigo-700 rounded text-white font-semibold w-36 py-2 px-7 shadow-md">Add New</button>      
                  <span class = "flex flex-grow"></span>                         
                  
                </div>              
                <div></div>
              </caption>
            <thead class="bg-blue-100">
              <tr>
                
                <th on:click={()=> dt1=true} on:focusout={()=> dt1=false} scope="col" class="px-6 py-6 text-left text-xs font-medium text-black uppercase tracking-wider">
                    <span >Name</span>
                -->              <!--
                    {#if !dt1}
                        <span>Name</span>
                    {:else}

                    <div class="relative text-gray-600 focus-within:text-gray-400">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                          <button type="submit" class="p-1 focus:outline-none focus:shadow-outline">
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                          </button>
                        </span>
                        
                        <input type="text" name="q" class:autofocus={dt1} class="py-1.5 text-sm pl-10 w-full outline-none bg-blue-100 text-gray-900  border-0 border-b-2 border-blue-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b" placeholder="Name" autocomplete="off">
                        <span class="absolute inset-y-0 -ml-6 -mt-4">
                        <button type="submit" class="p-1 focus:outline-none focus:shadow-outline" on:click|stopPropagation={()=> dt1=false}>
                           <svg fill="red" stroke="red" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path d="M7.004 23.087l7.08-7.081-7.07-7.071L8.929 7.02l7.067 7.069L23.084 7l1.912 1.913-7.089 7.093 7.075 7.077-1.912 1.913-7.074-7.073L8.917 25z"></path></svg>
                       
                          </button>
                        </span>
                      </div>
                    {/if}
                -->
<!--                </th>

  

                <th scope="col" on:click={()=> dt2=true} on:focusout={()=> dt2=false} class="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                    <span>Address</span>
    -->            <!--
                    {#if !dt2}
                    <span>Title</span>
                {:else}

                <div class="relative text-gray-600 focus-within:text-gray-400">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                      <button type="submit" class="p-1 focus:outline-none focus:shadow-outline">
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                      </button>
                    </span>
               
                    <input type="text" name="q" class:autofocus={dt2} class="py-1.5 text-sm pl-10 w-full outline-none bg-blue-100 text-gray-900  border-0 border-b-2 border-blue-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b" placeholder="Title" autocomplete="off">
                    <span class="absolute inset-y-0 -ml-6 -mt-4">
                    <button type="submit" class="p-1 focus:outline-none focus:shadow-outline" on:click|stopPropagation={()=> dt2=false}>
                       <svg fill="red" stroke="red" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path d="M7.004 23.087l7.08-7.081-7.07-7.071L8.929 7.02l7.067 7.069L23.084 7l1.912 1.913-7.089 7.093 7.075 7.077-1.912 1.913-7.074-7.073L8.917 25z"></path></svg>
                   
                      </button>
                    </span>
                  </div>
                {/if}
            -->

 <!--               </th>
  

                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                  Status
                </th>
                
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                    Phone/Mobile/email
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium  text-black  uppercase tracking-wider">
                  <span >Action</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60" alt="">
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        Jane Cooper
                      </div>
                      <div class="text-sm text-gray-500">
                        jane.cooper@example.com
                      </div>
                    </div>
                  </div>
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">Regional Paradigm Technician</div>
                  <div class="text-sm text-gray-500">Optimization</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Admin
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <a href="#" class="text-red-600 hover:text-red-900 mr-5"><i class="far fa-trash-alt fa-lg"/></a>
                  <a href="#" class="text-green-600 hover:text-green-900"><i class="far fa-edit fa-lg"/></a>
                </td>
              </tr>
  

              
              <tr class:hidden={my} >
                <td>
  
                  </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60" alt="">
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        Jane Cooper
                      </div>
                      <div class="text-sm text-gray-500">
                        jane.cooper@example.com
                      </div>
                    </div>
                  </div>
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">Regional Paradigm Technician</div>
                  <div class="text-sm text-gray-500">Optimization</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Admin
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <a href="#" class="text-red-600 hover:text-red-900 mr-5"><i class="far fa-trash-alt fa-lg"/></a>
                  <a href="#" class="text-green-600 hover:text-green-900"><i class="far fa-edit fa-lg"/></a>
                </td>
              </tr>


            -->

              <!-- More rows... -->
  <!--          </tbody>
          </table>
        </div>
      </div>
    </div>
</div>

<div class="py-10"></div>
-->

<div class="shadow rounded-lg flex flex-col flex-auto pb-7 bg-white">
    <div class="bg-blue-100 h-20 rounded-t-lg flex flex-row items-center px-7">
        <h2 class="text-2xl text-black text-gray-700 font-bold">Company Settings</h2>  
        <span class="flex-grow"></span>  
       <button class=" bg-indigo-700 rounded text-white font-semibold w-36 py-2 px-7 shadow" 
       on:click|preventDefault={companysave}>
         {btntxt}
        </button>
       <span class="flex w-5"></span>
      <button class="bg-red-600 rounded text-white font-semibold w-36 py-2 px-7  shadow">Cancel</button>      
    </div>
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
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
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
                        bind:value={$companystore.companysParent}
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