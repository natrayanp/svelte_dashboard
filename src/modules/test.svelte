<script>
import { onMount } from 'svelte';

import {flip} from 'svelte/animate';
import { createForm } from "svelte-forms-lib";
import { writable, derived } from 'svelte/store';
import { authVal, enityVal, roleVal, roleStore } from '../../../../stores/stores';
import Roledetails from './Roledetails.svelte';
import Alerts from '../../../../common/notifications/components/alerts/Alerts.svelte';
import { http } from '../../../../stores/services';
import { getNotificationsContext } from '../../../../common/notifications';
const { addNotification } = getNotificationsContext();

      let dt1 = false;
      let dt2 = false;
      let showAll= false;
      let patharray = [];     
    let datatosend = [];
    let mymod = 'display';
let myc = "hidden";
let yes = true;
let firstvisit = false;
let mymodal = null;

      function toggleshow(basketIndex) {
        console.log("inside toogle");
        console.log( roleStore.Selectedmodules[basketIndex]);
          roleStore.Selectedmodules[basketIndex].showAll = !roleStore.Selectedmodules[basketIndex].showAll;
      }


      function toggle_viewdetail(branchdata={}){ 
        console.log(JSON.stringify(branchdata));
        datatosend = [];
        if (myc === "hidden") {
          myc = "visible";
        } else {
          myc = "hidden";
        }
        mymod ='display';
        if(JSON.stringify(branchdata) !== JSON.stringify({})) datatosend.push(branchdata);    
      }


      function onReadChange(basketIndex) {
        roleStore.Selectedmodules[basketIndex].readAll = !roleStore.Selectedmodules[basketIndex].readAll;
        if (roleStore.Selectedmodules[basketIndex].readAll) {
            roleStore.Selectedmodules[basketIndex].submenu.forEach(value => {
                value.read = true;
        });
        roleStore.Selectedmodules[basketIndex].readindeterminate =false;
        } else {
            roleStore.Selectedmodules[basketIndex].submenu.forEach(value => {
            value.read = false;
            value.write = false;            
        });
        roleStore.Selectedmodules[basketIndex].writeAll =false;        
        }
        
      }


      function onWriteChange(basketIndex) {
        console.log(basketIndex);
        console.log(roleStore.Selectedmodules[basketIndex].writeAll);
        roleStore.Selectedmodules[basketIndex].writeAll = !roleStore.Selectedmodules[basketIndex].writeAll;
        
            if (roleStore.Selectedmodules[basketIndex].writeAll) {
                roleStore.Selectedmodules[basketIndex].submenu.forEach(value => {
                value.write = true;
                value.read = true; 
            }) ;       
            roleStore.Selectedmodules[basketIndex].writeindeterminate =false;       
            } else {
                roleStore.Selectedmodules[basketIndex].submenu.forEach(value => {
                value.write = false;
                value.read = true;                
            });            
            }
            roleStore.Selectedmodules[basketIndex].readAll =true;
            roleStore.Selectedmodules[basketIndex].readindeterminate =false;
            
  }

  
  function onReadChangeIt(basketIndex,itemIndex) {
    roleStore.Selectedmodules[basketIndex].submenu[itemIndex].read = !roleStore.Selectedmodules[basketIndex].submenu[itemIndex].read;
    let noread = roleStore.Selectedmodules[basketIndex].submenu.filter(x => x.read);
    if(noread.length === 0) {

        roleStore.Selectedmodules[basketIndex].readAll =false;
        roleStore.Selectedmodules[basketIndex].readindeterminate =false;
    }
    else if(noread.length === roleStore.Selectedmodules[basketIndex].submenu.length) {
        roleStore.Selectedmodules[basketIndex].readindeterminate =true;
        onReadChange(basketIndex);
    }
    else if(noread.length !== roleStore.Selectedmodules[basketIndex].submenu.length) {
        roleStore.Selectedmodules[basketIndex].readAll =false;
        roleStore.Selectedmodules[basketIndex].readindeterminate =true;
    }
  }
    
  function onWriteChangeIt(basketIndex,itemIndex){
    roleStore.Selectedmodules[basketIndex].submenu[itemIndex].write = !roleStore.Selectedmodules[basketIndex].submenu[itemIndex].write;
    let nowrite = roleStore.Selectedmodules[basketIndex].submenu.filter(x => x.write);
    if(nowrite.length === 0) {
        roleStore.Selectedmodules[basketIndex].writeAll =false;
        roleStore.Selectedmodules[basketIndex].writeindeterminate =false;
    }
    else if(nowrite.length === roleStore.Selectedmodules[basketIndex].submenu.length) {
        //roleStore.Selectedmodules[basketIndex].writeAll =true;
        onWriteChange(basketIndex);
    }else if(nowrite.length !== roleStore.Selectedmodules[basketIndex].submenu.length) {
        roleStore.Selectedmodules[basketIndex].writeAll =false;
        roleStore.Selectedmodules[basketIndex].writeindeterminate =true;
    }
  }






      

            let basketsv =        {                              
                              "Availablemodules": [
                                            {   
                                                groupid:"mygroup",
                                                basketname:"Availablemodules",
                                                name: "POS",
                                                showAll:false,
                                                readAll:false,
                                                writeAll:false,
                                                indeterminate:false,
                                                submenu:[
                                                    { 'name' : "posbilling",
                                                    'read': true,
                                                      'write': true,
                                                    },
                                                    { 'name' : "posbreport",
                                                    'read': true,
                                                      'write': true,
                                                    },
                                                    { 'name' : "posbreport",
                                                    'read': true,
                                                      'write': false,
                                                    },
                                                    { 'name' : "posbreport",
                                                    'read': true,
                                                      'write': false,
                                                    },
                                                    { 'name' : "posbreport",
                                                    'read': false,
                                                      'write': true,
                                                    } ,
                                                    { 'name' : "posbilling",
                                                    'read': true,
                                                      'write': true,
                                                    },
                                                    { 'name' : "posbreport",
                                                    'read': true,
                                                      'write': true,
                                                    },
                                                    { 'name' : "posbreport",
                                                    'read': true,
                                                      'write': false,
                                                    },
                                                    { 'name' : "posbreport",
                                                    'read': true,
                                                      'write': false,
                                                    },
                                                    { 'name' : "posbreport",
                                                    'read': false,
                                                      'write': true,
                                                    }                                                
                                                                                               
                                                ],
                                            },
                                            {   
                                                groupid:"mygroup",
                                                basketname:"Availablemodules",
                                                name: "Inventory",
                                                showAll:false,
                                                readAll:false,
                                                writeAll:false,
                                                readindeterminate:false,
                                                writeindeterminate:false,
                                                submenu:[
                                                    { 'name' : "setting",
                                                        'read': true,
                                                      'write': true,
                                                    },
                                                    { 'name' : "settingsreport",
                                                    'read': false,
                                                      'write': false,
                                                    }
                                                ],
                                            },
                                        ] ,                              
                              "Selectedmodules": [   

                              ],
                              "Unselectedmodules": []
                            };
                            console.log(authVal);




onMount(async ()=> {
  await getRolesForCompany();
  
/*
  authVal.allpack.companylevel.forEach( (e) => {
          if(e.EntityTree!= null)  {
            e.EntityTree.forEach( e1 => {
              if(e1.basketname === "Availablemodules"){
                basketsv.Availablemodules.push(e1);
              } else if(e1.basketname === "Selectedmodules"){
                basketsv.Selectedmodules.push(e1);
              }              
            });
          }
        });        
        await roleStore.set(basketsv);
        cpyRoleSelectStore = writable(roleVal.Selectedmodules);
        cpyRoleAvailStore = writable(roleVal.Availablemodules);
        console.log(roleVal);
        console.log(basketsv.Availablemodules);
        console.log(basketsv);
        console.log("done");
        */
})

roleStore.subscribe((d)=>console.log(d));


const getRolesForCompany = async(goforfetch = false) => {
    console.log("inside getBranch inner if");    
    mymodal =brnfetchprogressmodal();  
    
    let postdata = {"Optype":"fetch","Companyid":authVal.activecompany.companyId,"Branchid":authVal.activebranch.branchId};
    console.log("postdate = ", postdata);
    let respdata = await http.post('getroledata',postdata).catch(e=>{  
            //TODO Error handling
            console.error(e);
          });
        console.log(respdata);
        let ref = JSON.parse(JSON.stringify(respdata.data.roledata));
        console.log(ref.Selectedmodules.length);        
        if (ref.Selectedmodules.length) {
          $roleStore.Selectedmodules = ref.Selectedmodules.slice();
        } else {
          $roleStore.Selectedmodules = [];
        }        
        $roleStore.Availablemodules = ref.Availablemodules.slice();
}

const brnfetchprogressmodal = () => {
		return addNotification({
				title : 'Checking your account',
				text: 'hi i am custom notification why it cant be sol long so i can test it before using it' ,
				notificationtype: 'modal',            
				modaltype:'modal-loading',  	
        //comp : Circularprogress,				
			});
	}

  const selectallrec =() => {

  }

  function toggle_edit(roledata={}) {
    mymod="edit";
    datatosend = [];
    if(roledata.length <= 0)  mymod="new";
    if(JSON.stringify(roledata)=== JSON.stringify({})) mymod = 'new';
    if(firstvisit)  mymod="new";
    myc = "hidden";    
    if(JSON.stringify(roledata) !== JSON.stringify({})) datatosend.push(roledata);    
  }

</script>

<Alerts targetid="sudo"/>

{#if mymod !== 'edit'}

<div class="flex flex-col" >


  <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table class="min-w-full divide-y divide-gray-200">
          <caption class="bg-blue-100 rounded-t-lg divide-y divide-gray-300">                                
            <div class="flex md:flex-row flex-col items-center md:h-20 px-7">
              <h2 class="text-2xl  text-gray-700 font-bold">Role Settings</h2>
              <span class = "flex px-7"></span>     
                      
              <button class=" flex bg-indigo-700 rounded text-white font-semibold w-36 py-2 px-7 shadow-md" on:click|preventDefault={()=>toggle_edit()}>Add New</button>      
              
              

            </div>              
            <div></div>
          </caption>
          <thead class="bg-blue-100">
            <tr>
              <th on:click={()=> dt1=true} on:focusout={()=> dt1=false} scope="col" class="px-6 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  <span >Selection</span>

              </th>

              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Role Name
              </th>



            </tr>
          </thead>

          {#each $roleStore.Selectedmodules as role}

          <tbody class="bg-white divide-y divide-gray-200">
            <tr>
              <td>
                <div class="pristine-form-group md:col-start-8 md:col-span-4">				
                  <label for="default">Default Branch?</label>
                    <input type=checkbox bind:checked={yes} on:change= {e=>selectallrec(e)}>   
                    {yes?'Yes':'No'}
                    <div class="pristine-error-group"></div>                 
                    
                  </div>

                
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60" alt="">
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                      {role.id}
                    </div>
                    <div class="text-sm text-gray-500">
                      {role.id}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{role.Rolemasterid}</div>
              </td>
            </tr>

            <!-- More rows... -->
          </tbody>
          {/each}
        </table>
      </div>
    </div>
  </div>
</div>
{/if}

{#if mymod ==='edit' || mymod ==='new'}
<Alerts targetid="sudo1"/>
<Roledetails {datatosend}> </Roledetails> 
{/if}
