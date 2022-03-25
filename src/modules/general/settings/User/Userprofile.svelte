<script>
import { onMount,onDestroy,createEventDispatcher } from 'svelte';
import { createForm } from "svelte-forms-lib";
import * as yup from 'yup';
import { usermatrixStore,entityStore } from '../../../../stores/stores';

let fullinfo = false;
let futxt ="Show";
let myc = [];
let mys = [];
$: states = mys;
$: citys = myc;
if (!$entityStore.refdata.country) {
    // /refdata.country = [];
    mys = [];
    myc  = [];    
} 
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
      initialValues:JSON.parse(JSON.stringify(($usermatrixStore.Livematrix))),
      validationSchema: yup.object().shape({
        userid: yup.string().required(),
        firstname: yup.string().required(),
        lastname: yup.string().required(),
        designation: yup.string().required(),
        department: yup.string().required(),
        gender: yup.string().required(),
        dob: yup.string().required(),
        addressline1: yup.string().required("Required field"),
        addressline2: yup.string().required("Required field"),
        country: yup.object().test(
                                          'country',
                                          'Please select Country',
                                            val => !val.refvalue ? false : true,
                                          ),
        city: yup.object().test(
                                          'city',
                                          'Please select city',
                                            val => !val.refvalue ? false : true,
                                          ),
        state: yup.object().test(
                                          'state',
                                          'Please select State',
                                            val => !val.refvalue ? false : true,
                                          ),
        pinCode: yup.string().required("Required field"),        
        mobile: yup.number().required(),
        email: yup.string().required(),
        joiningdate: yup.date().required("Required field")
                                          .default(() => new Date().toLocaleDateString('en-CA')),  
        lastdate: yup.date(),   
        taxid: yup.string().required(),
        Userstatus: yup.string().required(),   
        Imagelink : yup.string(), 

      }),
      onSubmit: values => {
        console.log("inside onsubmit");
        saveaction(values);
      },
    });

    onMount(async() => {  
          reinstateform();
          console.log("going to onmount userprofile");         
      });    

      onDestroy(async() => {  
          console.log("going to onDestroy userprofile");
      });    


function reinstateform(){    
    if($usermatrixStore.mode === "new"){
      //Should be new
      $form.userid = $usermatrixStore.ChangeDetails.profiledefaul.userid;
      $form.userstatus = $usermatrixStore.ChangeDetails.profiledefaul.Userstatus;
      $form.country = $entityStore.refdata;
    } else {
      $form = JSON.parse(JSON.stringify($usermatrixStore.LiveSelectmatrix));
    }

    init_all_Dropdowns();  
}

function fullinf(){
    fullinfo = !fullinfo;
    fullinfo?futxt="Hide":futxt ="Show";
}


function countryselect() {
    
    console.log($form);
    console.log(JSON.stringify($form.country));
    console.log(JSON.stringify($form));
    if($form.country && $form.country.submenu )  {
      console.log("@@#$@#@#@#@#@#@#@#@#@#");
      states = $form.country.submenu;      
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
    $form.state = '';
    $form.city = '';  
  }


  function stateselect() {
    console.log("------State change start------");
    console.log($form.state);
    if($form.state && $form.state.submenu) {
      citys = $form.state.submenu;
    } else {
      citys = [];
    }

    //Reset the previously selected values
    $form.city = '';
    console.log("------State change End------");
  }
    

function getvalue(type,matchstr) {  
  switch(type) {  
  case 'Country':    
    return match ($entityStore.refdata.country,matchstr);  
  case 'State':    
    if ($form.country.submenu !== undefined) {
      return match ($form.country.submenu,matchstr); 
    } else {
      return {}
    }
  case 'City':  
    if ($form.state?.submenu !== undefined) {  
    return match ($form.state.submenu,matchstr); 
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

function init_all_Dropdowns(){
      console.log("init the dorp down values");

// Populate the default values for the dropdown    
console.log(JSON.stringify($usermatrixStore.LiveSelectmatrix));

    if (typeof $usermatrixStore.LiveSelectmatrix.country === 'string' || $usermatrixStore.LiveSelectmatrix.country instanceof String) {
      $form.country = getvalue('Country',$usermatrixStore.LiveSelectmatrix.country);    
    } else {
      $form.country = $usermatrixStore.LiveSelectmatrix.country;    
    }                
    console.log(JSON.stringify($usermatrixStore.LiveSelectmatrix));
    let mys = $usermatrixStore.LiveSelectmatrix.state;
    let myc = $usermatrixStore.LiveSelectmatrix.city;


    countryselect();        
    console.log(JSON.stringify($usermatrixStore.LiveSelectmatrix));   
    console.log(myc);
    if (typeof mys === 'string' || mys instanceof String) { 
        $form.state = getvalue('State', mys);
    } else {
        $form.state = mys;
    }
  stateselect();      
  if (typeof myc === 'string' || myc instanceof String) {          
    $form.city = getvalue('City', myc);
  } else {
        $form.city = myc;
    }               

  //branchdata_init.isdefault === 'Y'?yes =true:yes =false;                  
  //$form.isdefault =  yes?'Y':'N';

    }

function mych(e) {
        console.log("going mych");
        $usermatrixStore.ChangeDetails.profilechanged = false;
        $usermatrixStore.ChangeDetails.profile = {};
        let rmcpy = JSON.parse(JSON.stringify($form));
        let frmcpy = JSON.parse(JSON.stringify(rmcpy));        

        if (JSON.stringify($usermatrixStore.ChangeDetails.orgprofile) === JSON.stringify({}) && ($form.Userid === "NEW")) {
            //console.log("going mych empty")
            //if ($form.Userid === "NEW") {
                $usermatrixStore.ChangeDetails.profile = {...frmcpy,action:'I'};                
            //} else {
              //TODO some data error
            //}           

        } else if (JSON.stringify($usermatrixStore.ChangeDetails.orgprofile) !== JSON.stringify(frmcpy)){
            console.log("going mych not empty")
            console.log(JSON.parse(JSON.stringify($usermatrixStore.ChangeDetails.orgprofile)));
            console.log(JSON.parse(JSON.stringify(frmcpy)));

            //if (JSON.stringify($usermatrixStore.ChangeDetails.orgprofile) !== JSON.stringify(frmcpy)){
                $usermatrixStore.ChangeDetails.profile = {...frmcpy,action:'U'};                          
                console.log("going mych not empty if")
            //} 
        }                       
        console.log("going mych empty if")
        handleChange(e);            
        toggle_enable_button(); 
    }

    function toggle_enable_button(){
      //Here we recalculate the value of profilechanged only
      $usermatrixStore.ChangeDetails.profilechanged = false;


      if(JSON.stringify($usermatrixStore.ChangeDetails.profilechanged) !== JSON.stringify({})) {
        $usermatrixStore.ChangeDetails.profilechanged = true;
      }

      if (($usermatrixStore.ChangeDetails.profilechanged || $usermatrixStore.ChangeDetails.matrixchanged)) {
        $usermatrixStore.ChangeDetails.Somechanged = true;
      } else {
        $usermatrixStore.ChangeDetails.Somechanged = false;
      }
    }


</script>
{JSON.stringify($form)}
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
                    name = "firstname"
                    class="peer mt-0 block w-full px-0.5 py-1 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b-2"			
                    type = "text"
                    bind:value={$form.firstname}
                    on:blur ={handleChange}                    
                    on:change ={mych}
                    />
                  {#if $errors.firstname && (JSON.stringify($errors.firstname)!= '{}') }
                    <small style="color:red">{$errors.firstname}</small>
                  {/if}
                </div>

                <div class="md:col-start-3 md:col-span-2">
                    <label for="Lastname">Last Name</label>

                    <input required
                    id = "Lastname"
                    name = "lastname"
                    class="mt-0 block w-full px-0.5 py-1 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b-2"			
                    type = "text"
                    bind:value={$form.lastname}
                    on:blur ={handleChange}
                    on:change ={mych}
                    />
                  {#if $errors.lastname && (JSON.stringify($errors.lastname)!= '{}') }
                    <small style="color:red">{$errors.lastname}</small>
                  {/if}
                  
                </div>
                <div class="md:col-start-1 md:col-span-1">
                    <label for="Designation">Designation</label>
                    <input required
                    id = "Designation"
                    name = "designation"
                    class="mt-0 block w-full px-0.5 py-1 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b-2"			
                    type = "text"
                    bind:value={$form.designation}
                    on:blur ={handleChange}
                    on:change ={mych}
                    />
                  {#if $errors.designation && (JSON.stringify($errors.designation)!= '{}') }
                    <small style="color:red">{$errors.designation}</small>
                  {/if}
                
                </div>
                <div class="md:col-start-2 md:col-span-1">
                    <label for="Department">Department</label>
                    <select required 
                    id = "Department"
                    name = "department"
                    class="mt-0 block w-full px-0.5 py-1 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			                                     
                    bind:value={$form.department} 
                    on:change ={mych}
                    >                            
                      <option>Marketing</option>
                      <option>HR</option>
                      <option>Delivery</option>
                      <option>Store</option>
                      <option>Frontdesk</option>

                    </select>
                    {#if $errors.department && (JSON.stringify($errors.department)!= '{}') }
                      <small style="color:red">{$errors.department}</small>
                    {/if} 
                </div>
                <div class="md:col-start-3 md:col-span-1 " >				  
                    <label for="Gender">Gender</label>
                            <select required 
                            id = "Gender"
                            name = "gender"
                            class="mt-0 block w-full px-0.5 py-1 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			                                     
                            bind:value={$form.gender} 
                            on:change ={mych}
                            >                            
                            <option>Male</option>
                            <option>Female</option>                          


                            </select>
                            {#if $errors.gender && (JSON.stringify($errors.gender)!= '{}') }
                              <small style="color:red">{$errors.gender}</small>
                            {/if} 
                        </div>

                        <div class="md:col-start-4 md:col-span-1">				  
                            <label for="Dateofbirth">Date of Birth</label>
                            <input required 
                            id = "Dateofbirth"
                            name = "dob"
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                            type = "date"
                            bind:value={$form.dob}
                            on:blur ={handleChange}
                            on:change ={mych}
                            />
                            {#if $errors.dob && (JSON.stringify($errors.dob)!= '{}') }
                              <small style="color:red">{$errors.dob}</small>
                            {/if}
                        </div>

                        {#if fullinfo}
                        <div class="md:col-start-1 md:col-span-2">				  
                            <label for="Addline1">Address Line 1</label>

                            <textarea required 
                            id = "Addline1"
                            name = "addressline1"
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                            type = "text"
                            bind:value={$form.addressline1}
                            on:blur ={handleChange}
                            on:change ={mych}
                            ></textarea>
                                    {#if $errors.addressline1 && (JSON.stringify($errors.addressline1)!= '{}') }
                                    <small style="color:red">{$errors.addressline1}</small>
                                  {/if} 
                        </div>  

                        <div class="md:col-start-3 md:col-span-2">	
                            <label for="Addline2">Address Line 2</label>

                            <textarea required 
                            id = "Addline2"
                            name = "addressline2"
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                            type = "text"
                            bind:value={$form.addressline2}
                            on:blur ={handleChange}
                            on:change ={mych}
                            ></textarea>
                                    {#if $errors.addressline2 && (JSON.stringify($errors.addressline2)!= '{}') }
                                    <small style="color:red">{$errors.addressline2}</small>
                                  {/if} 
                        </div>

                        <div class="md:col-start-1 md:col-span-1">				  
                        
                            <label for="Country">Country</label>
                            <select required 
                            id = "Country"
                            name = "country"
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                            bind:value={$form.country} 
                            on:change={()=>countryselect()}
    
                            >
                          {#each $entityStore.refdata.country as country}
                            <option value={country}>
                              {country.refvalue}
                            </option>
                          {/each}
                          <option>Singapore</option>
                    
                        </select>
                        {#if $errors.country && (JSON.stringify($errors.country)!= '{}') }
                         <small style="color:red">{$errors.country}</small>
                         {/if} 
                        </div>

                        
                        <div class="md:col-start-2 md:col-span-1">				  
                            <label for="State">State</label>
                            <select required 
                            id = "State"
                            name = "state"
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                            bind:value={$form.state}  
                            on:change={stateselect}
                            >
                            {#each states as state}
                            <option value={state}>
                              {state.refvalue}
                            </option>
                          {/each}
                    
                        </select>
                        {#if $errors.state && (JSON.stringify($errors.state)!= '{}') }
                          <small style="color:red">{$errors.state}</small>
                        {/if} 
                        </div>

                        <div class="md:col-start-3 md:col-span-1">				  
                            <label for="City">City</label>
                            <select required 
                            id = "City"
                            name = "city"
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                            bind:value={$form.city}
                            >
                            {#each citys as city}
                            <option value={city}>
                              {city.refvalue}
                            </option>
                          {/each}
                    
                        </select>
                        {#if $errors.city && (JSON.stringify($errors.city)!= '{}') }
                          <small style="color:red">{$errors.city}</small>
                        {/if} 
                        </div>

                        
                        <div class="md:col-start-4 md:col-span-1">				  
                            <label for="PinCode">Pin</label>
                            <input required 
                            id="PinCode"  
                            name = "pinCode"
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                            type = "text"
                            bind:value={$form.pinCode}
                            on:blur ={handleChange}
                            on:change ={mych}
                            />
                            {#if $errors.pinCode && (JSON.stringify($errors.pinCode)!= '{}') }
                              <small style="color:red">{$errors.pinCode}</small>
                            {/if} 
                        </div>
                        {/if}


                        <div class="md:col-start-1 md:col-span-1">				  
                            <label for="Mobile">Mobile</label>
                            <input required 
                            id="Mobile"  
                            name = "mobile"
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                            type="text"
                            bind:value={$form.mobile}      
                            on:blur ={handleChange}
                            on:change ={mych}
                            />
                            {#if $errors.mobile && (JSON.stringify($errors.mobile)!= '{}') }
                              <small style="color:red">{$errors.mobile}</small>
                            {/if} 
                        </div>

                        <div class="md:col-start-2 md:col-span-1">		
                            <label for="Email">email</label>
                            <input type="text" required 
                            id = "Email"
                            name = "email"
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			         
                            bind:value={$form.email}
                            on:blur ={handleChange}
                            on:change ={mych}
                            />		
                            {#if $errors.email && (JSON.stringify($errors.email)!= '{}') }
                              <small style="color:red">{$errors.email}</small>
                            {/if}   
                        </div>


                        <div class="md:col-start-1 md:col-span-1">				  
                            <label for="Joiningdate">Joining Date</label>
                            <input required 
                            id = "Joiningdate"
                            name = "joiningdate"
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                            type = "date"
                            bind:value={$form.joiningdate}
                            on:blur ={handleChange}
                            on:change ={mych}
                            />
                            {#if $errors.joiningdate && (JSON.stringify($errors.joiningdate)!= '{}') }
                              <small style="color:red">{$errors.joiningdate}</small>
                            {/if}
                        </div>


                        <div class="md:col-start-2 md:col-span-1">				  
                            <label for="Lastdate">Last Date</label>
                            <input required 
                            id = "Lastdate"
                            name = "lastdate"
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                            type = "date"
                            bind:value={$form.lastdate}
                            on:blur ={handleChange}
                            on:change ={mych}
                            />
                            {#if $errors.lastdate && (JSON.stringify($errors.lastdate)!= '{}') }
                              <small style="color:red">{$errors.lastdate}</small>
                            {/if}
                        </div>

                        <div class="md:col-start-3 md:col-span-2">				  
                            <label for="Taxid">Taxid/NRIC/Adhaarcard</label>
                            <input type="text" required                               
                              id = "Taxid"
                              name = "taxid"
                              class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                              bind:value={$form.taxid}
                              on:blur ={handleChange}
                              on:change ={mych}
                              />
                            {#if $errors.taxid && (JSON.stringify($errors.taxid)!= '{}') }
                              <small style="color:red">{$errors.taxid}</small>
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