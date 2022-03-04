<script>
import { createForm } from "svelte-forms-lib";
import * as yup from 'yup';

let fullinfo = false;
let futxt ="Show"


const {
      // observables state
      form,
      errors,
      state,
      touched,
      isValid,
      isSubmitting,
      isValidating,
      // handlers
      handleBlur,
      handleChange,
      handleSubmit
    } = createForm({
      initialValues:{},
      validationSchema: yup.object().shape({
        Usrprof_userid: yup.string().required(),
        Usrprof_firstname: yup.string().required(),
        Usrprof_lastname: yup.string().required(),
        Usrprof_designation: yup.string().required(),
        Usrprof_department: yup.string().required(),
        Usrprof_gender: yup.string().required(),
        Usrprof_dateofbirth: yup.string().required(),
        Usrprof_addline1: yup.string().required("Required field"),
        Usrprof_addline2: yup.string().required("Required field"),
        Usrprof_country: yup.object().test(
                                          'country',
                                          'Please select Country',
                                            val => !val.refvalue ? false : true,
                                          ),
        Usrprof_city: yup.object().test(
                                          'city',
                                          'Please select city',
                                            val => !val.refvalue ? false : true,
                                          ),
        Usrprof_state: yup.object().test(
                                          'state',
                                          'Please select State',
                                            val => !val.refvalue ? false : true,
                                          ),
        Usrprof_pinCode: yup.string().required("Required field"),        
        Usrprof_mobile: yup.number().required(),
        Usrprof_email: yup.string().required(),
        Usrprof_joiningdate: yup.date().required("Required field")
                                          .default(() => new Date().toLocaleDateString('en-CA')),  
        Usrprof_lastdate: yup.date().required("Required field")
                                          .default(() => new Date().toLocaleDateString('en-CA')),   
        Usrprof_taxid: yup.string().required(),
        Usrprof_status: yup.string().required(),    

      }),
      onSubmit: values => {
        console.log("inside onsubmit");
        saveaction(values);
      },
    });

function fullinf(){
    fullinfo = !fullinfo;
    fullinfo?futxt="Hide":futxt ="Show";
}


function countryselect() {
    
    console.log($form);
    console.log($form.Usrprof_branchCountry.submenu);
    if($form.Usrprof_branchCountry.submenu) {
      console.log("@@#$@#@#@#@#@#@#@#@#@#");
      states = $form.Usrprof_branchCountry.submenu;      
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
    $form.Usrprof_branchState = '';
    $form.Usrprof_branchCity = '';  
  }


  function stateselect() {
    console.log("------State change start------");
    console.log($form.Usrprof_branchState);
    if($form.Usrprof_branchState.submenu) {
      citys = $form.Usrprof_branchState.submenu;
    } else {
      citys = [];
    }

    //Reset the previously selected values
    $form.Usrprof_branchCity = '';
    console.log("------State change End------");
  }
    

function getvalue(type,matchstr) {  
  switch(type) {  
  case 'branchCountry':    
    return match (refdata.country,matchstr);  
  case 'branchState':    
    if ($form.Usrprof_branchCountry.submenu !== undefined) {
      return match ($form.Usrprof_branchCountry.submenu,matchstr); 
    } else {
      return {}
    }
  case 'branchCity':  
    if ($form.Usrprof_branchState?.submenu !== undefined) {  
    return match ($form.Usrprof_branchState.submenu,matchstr); 
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

<div class="flex flex-col md:flex-row flex-wrap items-stretch gap-4 leading-8 mx-5 my-5 ">
    <div class="p-3  basis-1/4   bg-white border-t-4 border-green-400 shadow rounded">
    <!-- 01 -->
    <div >
        <div class="image overflow-hidden">
            <img class="h-auto md:w-1/2 w-full mx-auto"
                src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                alt="">
        </div>
        <div class ="mx-5">
        <h1 class="text-gray-900 font-bold text-xl leading-8 mt-10">Natrayan Palani Appan</h1>
        <h3 class="text-gray-600 font-lg text-semibold leading-6 mt-5">Vice President - Band 5</h3>

        <ul
            class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
            <li class="flex items-center py-1">
                <span>Status</span>
                <span class="ml-auto"><span
                        class="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span></span>
            </li>
            <li class="flex items-center py-1">
                <span>Joined on</span>
                <span class="ml-auto">Nov 07, 2016</span>
            </li>

        </ul>
        </div>
    </div>
    </div>
    
    <div class="basis-7/12 grow bg-blue-100">
     <!-- 02 -->
      <!-- About Section -->
      <div class="bg-white p-3 shadow rounded">
        <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
            <span clas="text-green-500">
                <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            </span>
            <span class="tracking-wide">About</span>
        </div>
        <div class="text-gray-700">
          <form id="branchform" class="px-10 py-1  w-full inputs space-y-6" on:submit|preventDefault={handleSubmit}>
            <div class="grid md:grid-cols-4 md:gap-y-3.5 md:gap-x-4 text-sm leading-10">
                <div class="md:col-start-1 md:col-span-2">
                    <label for="Firstname">First Name</label>
                    <input required
                    id="Firstname"  
                    name = "Usrprof_firstname"
                    class="peer mt-0 block w-full px-0.5 py-1 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b-2"			
                    type = "text"
                    bind:value={$form.Usrprof_firstname}
                    on:blur ={handleChange}
                    on:change ={handleChange}
                    />
                  {#if $errors.Usrprof_firstname && (JSON.stringify($errors.Usrprof_firstname)!= '{}') }
                    <small style="color:red">{$errors.Usrprof_firstname}</small>
                  {/if}
                </div>

                <div class="md:col-start-3 md:col-span-2">
                    <label for="Lastname">Last Name</label>

                    <input required
                    id = "Lastname"
                    name = "Usrprof_lastname"
                    class="mt-0 block w-full px-0.5 py-1 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b-2"			
                    type = "text"
                    bind:value={$form.Usrprof_lastname}
                    on:blur ={handleChange}
                    on:change ={handleChange}
                    />
                  {#if $errors.Usrprof_lastname && (JSON.stringify($errors.Usrprof_lastname)!= '{}') }
                    <small style="color:red">{$errors.Usrprof_lastname}</small>
                  {/if}
                  
                </div>
                <div class="md:col-start-1 md:col-span-1">
                    <label for="Designation">Designation</label>
                    <input required
                    id = "Designation"
                    name = "Usrprof_designation"
                    class="mt-0 block w-full px-0.5 py-1 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b-2"			
                    type = "text"
                    bind:value={$form.Usrprof_designation}
                    on:blur ={handleChange}
                    on:change ={handleChange}
                    />
                  {#if $errors.Usrprof_designation && (JSON.stringify($errors.Usrprof_designation)!= '{}') }
                    <small style="color:red">{$errors.Usrprof_designation}</small>
                  {/if}
                
                </div>
                <div class="md:col-start-2 md:col-span-1">
                    <label for="Department">Department</label>
                    <select required 
                    id = "Department"
                    name = "Usrprof_department"
                    class="mt-0 block w-full px-0.5 py-1 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			                                     
                    bind:value={$form.Usrprof_department} 
                    on:change={handleChange}
                    >                            
                      <option>Marketing</option>
                      <option>HR</option>
                      <option>Delivery</option>
                      <option>Store</option>
                      <option>Frontdesk</option>

                    </select>
                    {#if $errors.Usrprof_department && (JSON.stringify($errors.Usrprof_department)!= '{}') }
                    <small style="color:red">{$errors.Usrprof_department}</small>
                  {/if} 
                </div>
                <div class="md:col-start-3 md:col-span-1 " >				  
                    <label for="Gender">Gender</label>
                            <select required 
                            id = "Gender"
                            name = "Usrprof_gender"
                            class="mt-0 block w-full px-0.5 py-1 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			                                     
                            bind:value={$form.Usrprof_gender} 
                            on:change={handleChange}
                            >                            
                            <option>Male</option>
                            <option>Female</option>                          


                            </select>
                            {#if $errors.Usrprof_gender && (JSON.stringify($errors.Usrprof_gender)!= '{}') }
                              <small style="color:red">{$errors.Usrprof_gender}</small>
                            {/if} 
                        </div>

                        <div class="md:col-start-4 md:col-span-1">				  
                            <label for="Dateofbirth">Date of Birth</label>
                            <input required 
                            id = "Dateofbirth"
                            name = "Usrprof_dateofbirth"
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                            type = "date"
                            bind:value={$form.Usrprof_dateofbirth}
                            on:blur ={handleChange}
                            on:change ={handleChange}
                            />
                            {#if $errors.Usrprof_dateofbirth && (JSON.stringify($errors.Usrprof_dateofbirth)!= '{}') }
                              <small style="color:red">{$errors.Usrprof_dateofbirth}</small>
                            {/if}
                        </div>

                        {#if fullinfo}
                        <div class="md:col-start-1 md:col-span-2">				  
                            <label for="Addline1">Address Line 1</label>

                            <textarea required 
                            id = "Addline1"
                            name = "Usrprof_addline1"
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                            type = "text"
                            bind:value={$form.Usrprof_addline1}
                            on:blur ={handleChange}
                            on:change ={handleChange}
                                    ></textarea>
                                    {#if $errors.Usrprof_addline1 && (JSON.stringify($errors.Usrprof_addline1)!= '{}') }
                                    <small style="color:red">{$errors.Usrprof_addline1}</small>
                                  {/if} 
                        </div>  

                        <div class="md:col-start-3 md:col-span-2">	
                            <label for="Addline2">Address Line 2</label>

                            <textarea required 
                            id = "Addline2"
                            name = "Usrprof_addline2"
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                            type = "text"
                            bind:value={$form.Usrprof_addline2}
                            on:blur ={handleChange}
                            on:change ={handleChange}
                                    ></textarea>
                                    {#if $errors.Usrprof_addline2 && (JSON.stringify($errors.Usrprof_addline2)!= '{}') }
                                    <small style="color:red">{$errors.Usrprof_addline2}</small>
                                  {/if} 
                        </div>

                        <div class="md:col-start-1 md:col-span-1">				  
                        
                            <label for="Country">Country</label>
                            <select required 
                            id = "Country"
                            name = "Usrprof_country"
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                            bind:value={$form.Usrprof_country} 
                            on:change={()=>countryselect()}
    
                            >
                                <option>India</option>
                                <option>Singapore</option> 
                    
                        </select>
                        {#if $errors.Usrprof_country && (JSON.stringify($errors.Usrprof_country)!= '{}') }
                         <small style="color:red">{$errors.Usrprof_country}</small>
                         {/if} 
                        </div>

                        
                        <div class="md:col-start-2 md:col-span-1">				  
                            <label for="State">State</label>
                            <select required 
                            id = "State"
                            name = "Usrprof_state"
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                            bind:value={$form.Usrprof_state}  
                            on:change={stateselect}
                            >
                                <option>TamilNadu</option>
                                <option>Karnataka</option>
                    
                        </select>
                        {#if $errors.Usrprof_state && (JSON.stringify($errors.Usrprof_state)!= '{}') }
                          <small style="color:red">{$errors.Usrprof_state}</small>
                        {/if} 
                        </div>

                        <div class="md:col-start-3 md:col-span-1">				  
                            <label for="City">City</label>
                            <select required 
                            id = "City"
                            name = "Usrprof_city"
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                            bind:value={$form.Usrprof_city}
                            >
                                <option>Chennai</option>
                                <option>Coibatore</option>
                    
                        </select>
                        {#if $errors.Usrprof_city && (JSON.stringify($errors.Usrprof_city)!= '{}') }
                          <small style="color:red">{$errors.Usrprof_city}</small>
                        {/if} 
                        </div>

                        
                        <div class="md:col-start-4 md:col-span-1">				  
                            <label for="PinCode">Pin</label>
                            <input required 
                            id="PinCode"  
                            name = "Usrprof_pinCode"
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                            type = "text"
                            bind:value={$form.Usrprof_pinCode}
                            on:blur ={handleChange}
                            on:change ={handleChange}
                            />
                            {#if $errors.Usrprof_pinCode && (JSON.stringify($errors.Usrprof_pinCode)!= '{}') }
                              <small style="color:red">{$errors.Usrprof_pinCode}</small>
                            {/if} 
                        </div>
                        {/if}


                        <div class="md:col-start-1 md:col-span-1">				  
                            <label for="Mobile">Mobile</label>
                            <input required 
                            id="Mobile"  
                            name = "Usrprof_mobile"
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                            type="text"
                            bind:value={$form.Usrprof_mobile}      
                            on:blur ={handleChange}
                            on:change ={handleChange} 
                            />
                            {#if $errors.Usrprof_mobile && (JSON.stringify($errors.Usrprof_mobile)!= '{}') }
                              <small style="color:red">{$errors.Usrprof_mobile}</small>
                            {/if} 
                        </div>

                        <div class="md:col-start-2 md:col-span-1">		
                            <label for="Email">email</label>
                            <input type="text" required 
                            id = "Email"
                            name = "Usrprof_email"
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			         
                            bind:value={$form.Usrprof_email}
                            on:blur ={handleChange}
                            on:change ={handleChange}
                            />		
                            {#if $errors.Usrprof_email && (JSON.stringify($errors.Usrprof_email)!= '{}') }
                              <small style="color:red">{$errors.Usrprof_email}</small>
                            {/if}   
                        </div>


                        <div class="md:col-start-1 md:col-span-1">				  
                            <label for="Joiningdate">Joining Date</label>
                            <input required 
                            id = "Joiningdate"
                            name = "Usrprof_joiningdate"
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                            type = "date"
                            bind:value={$form.Usrprof_joiningdate}
                            on:blur ={handleChange}
                            on:change ={handleChange}
                            />
                            {#if $errors.Usrprof_joiningdate && (JSON.stringify($errors.Usrprof_joiningdate)!= '{}') }
                              <small style="color:red">{$errors.Usrprof_joiningdate}</small>
                            {/if}
                        </div>


                        <div class="md:col-start-2 md:col-span-1">				  
                            <label for="Lastdate">Last Date</label>
                            <input required 
                            id = "Lastdate"
                            name = "Usrprof_lastdate"
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                            type = "date"
                            bind:value={$form.Usrprof_lastdate}
                            on:blur ={handleChange}
                            on:change ={handleChange}
                            />
                            {#if $errors.Usrprof_lastdate && (JSON.stringify($errors.Usrprof_lastdate)!= '{}') }
                              <small style="color:red">{$errors.Usrprof_lastdate}</small>
                            {/if}
                        </div>

                        <div class="md:col-start-3 md:col-span-2">				  
                            <label for="Taxid">Taxid/NRIC/Adhaarcard</label>
                            <input type="text" required                               
                              id = "Taxid"
                              name = "Usrprof_taxid"
                              class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                              bind:value={$form.Usrprof_taxid}
                              on:blur ={handleChange}
                              on:change ={handleChange}
                            />
                            {#if $errors.Usrprof_taxid && (JSON.stringify($errors.Usrprof_taxid)!= '{}') }
                              <small style="color:red">{$errors.Usrprof_taxid}</small>
                            {/if}
                        </div>
                  
            </div>
          </form>
        </div>
        <button
            on:click={fullinf}
            class="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">{futxt}
            Full Information</button>
    </div>
    <!-- End of about section -->
    </div>
    <!--
    <div class="basis-5/12 grow bg-yellow-100">01 </div>
    <div class="basis-5/12 grow bg-pink-100">02 </div>
    -->
</div>