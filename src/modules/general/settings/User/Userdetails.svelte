<script>
import { onMount,createEventDispatcher } from 'svelte';
import { Tabs, TabList, TabPanel, Tab } from '../../../../common/tabs/tab';
import Userprofile from './Userprofile.svelte';
import {flip} from 'svelte/animate';
import { writable } from 'svelte/store';
import Useraccessmatrix from './Useraccessmatrix.svelte';

let bask =        {                              
                              "Availablemodules": [
                                            {   
                                                groupid:"mygroup",
                                                basketname:"Availablemodules",
                                                name: "Branches",
                                                submodules:[
                                                    { 
                                                      
                                                      'name' : "Jurong west JEM",
                                                      'read': true,
                                                      'write': true,
                                                      
                                                    },
                                                    { 'name' : "Serangoon road opp mustafa 24hours next to",
                                                    'read': true,
                                                      'write': true,
                                                    },
                                                    { 'name' : "Pasirris",
                                                    'read': false,
                                                      'write': true,
                                                    },
                                                    { 'name' : "Changi Business Park",
                                                    'read': true,
                                                      'write': true,
                                                    },
                                                    { 'name' : "Sentosa island",
                                                    'read': true,
                                                      'write': false,
                                                    }                                                
                                                ],
                                            },
                                            {   
                                                groupid:"mygroup",
                                                basketname:"Availablemodules",
                                                name: "Roles",
                                                submodules:[
                                                    { 'name' : "Admin",
                                                    'read': true,
                                                      'write': true,
                                                      'menu':false,
                                                    },
                                                    { 'name' : "billingcounter",
                                                    'read': true,
                                                      'write': true,
                                                      'menu':false,
                                                    }
                                                ],
                                            },
                                        ] ,                              
                              "Selectedmodules": [   

                              ],
                              "Unselectedmodules": []
                            };

  let baskets = writable(bask);



const dispatch = createEventDispatcher();

const sendcardaction = async (btnpressed,submitval) => {
    
    /*
    if(firstvisit) {
      $goto('/login');
      $roleStore.reset;
      //resetst();
      return;
    }else if(['Save','Update'].includes(btnpressed)) {            
      //console.log(respdata);
    }        
    console.log(submitval);
    $roleStore.ChangeDetails.ischanged = false;
    */
    dispatch('editresult',{
    action: btnpressed,
    //rolemasterid: (submitval && submitval.rolemaster)? submitval.rolemaster.Rolemasterid:'',
    //roledisplayname: (submitval && submitval.rolemaster)? submitval.rolemaster.Roledisplayname:'',
    });
    //resetst();
}

</script>



   <div class="shadow rounded-lg flex flex-col  bg-white">
    <div class="bg-blue-100 h-20 rounded-t-lg flex flex-row items-center px-7">
        <h2 class="text-2xl text-black text-gray-700 font-bold">New User</h2>  
        <span class="flex-grow"></span>  
       <button class=" bg-indigo-700 rounded text-white font-semibold w-36 py-2 px-7 shadow-md">Save</button>
       <span class="flex w-5"></span>
      <button class="bg-red-600 rounded text-white font-semibold w-36 py-2 px-7  shadow-md" on:click|preventDefault={()=>sendcardaction('cancel')}>Cancel</button>      
    </div>

    <Tabs>
      
        <TabList>
        <Tab>Register Company</Tab>
        <Tab>User Enrolment</Tab>    
      </TabList>

      <TabPanel>
        <Userprofile/>      
      </TabPanel>
      
      <TabPanel>
        <Useraccessmatrix/>
      </TabPanel>

    </Tabs>

  </div>