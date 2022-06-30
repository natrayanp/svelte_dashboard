<script>
    import { onMount,onDestroy,createEventDispatcher } from 'svelte';
    import {flip} from 'svelte/animate';
    import { usermatrixStore} from '../../../../stores/stores';


    export let initialise = false;
    let hoveringOverBasket;
    let livechange = null;
     
      //$: if(initialise) initialisevalue();

      onMount(async() => {  
          console.log("going to onmount Useraccessmatrix");
          
      });    

      onDestroy(async() => {  
          console.log("going to onDestroy Useraccessmatrix");
      });    




    
      function togglemenu(event, basketIndex, itemIndex) {
        $usermatrixStore.LiveAvailmatrix[basketIndex].submodules[itemIndex].menu = !$usermatrixStore.LiveAvailmatrix[basketIndex].submodules[itemIndex].menu;
      }
    
      function removerole(basket,item,basketIndex,itemIndex) {
        let brnid = [];
        let rlid = [];
        brnid.push(basket.id);
        rlid.push(item.id);
        let optype ="removerole";
        $usermatrixStore.LiveSelectmatrix[basketIndex].submodules.splice(itemIndex,1);
        $usermatrixStore.LiveSelectmatrix = JSON.parse(JSON.stringify($usermatrixStore.LiveSelectmatrix));
        updatechange(brnid,rlid,optype);
        //$baskets = $baskets;
        console.log($usermatrixStore);
      }
    
    function dragStart(event, basket,groupid,subbasket,subbaskIndex,itemIndex,item) {
      console.log( JSON.stringify($usermatrixStore.ChangeDetails.matrix));
            // The data we want to make available when the element is dropped
        // is the index of the item being dragged and
        // the index of the basket from which it is leaving.
            console.log("starting drag");
            const data = {basket,groupid,subbasket,subbaskIndex,itemIndex,item};
            console.log(data);
               event.dataTransfer.setData('text/plain', JSON.stringify(data));
        }
        
        function drop(event, target,taritem=null) {
            console.log('drop');        
            console.log(JSON.stringify(target));
            event.preventDefault();
            const json = event.dataTransfer.getData("text/plain");
            const data = JSON.parse(json);        
            console.log(JSON.stringify(data));
            //console.log(JSON.stringify($baskets));
            console.log("-----------");
            console.log(JSON.stringify(taritem));
            console.log("-----------");
            let brnid = [];
            let rlid = [];
            let droptype ="";


            if(data.basket !== target.basketname && data.groupid === target.groupid) {
                if(data.basket === "LiveAvailmatrix" && target.basketname === "Selectedmodules" && data.subbasket === "Branches"){                
                  let intarget = [];
                  if($usermatrixStore.LiveSelectmatrix.length){
                      intarget= null;
                      intarget = $usermatrixStore.LiveSelectmatrix.filter(x => x.id === data.item.id);                
                  }                
                  if(intarget.length === 0) {
                    console.log(data);
                    console.log(brnid);
                      brnid.push(data.item.id);
                      console.log($usermatrixStore.LiveAvailmatrix);
                      $usermatrixStore.LiveAvailmatrix[data.subbaskIndex].submodules = $usermatrixStore.LiveAvailmatrix[data.subbaskIndex].submodules.filter(x => !(x.id === data.item.id));                  
                      //let x = {...data.basket,basketname:"Selectedmodules"};
                      //let y = {...x,submodules:item}
                      $usermatrixStore.LiveSelectmatrix.push({...data.item,basketname:"Selectedmodules",groupid:"mygroup",submodules:[]});
                      droptype = "branchdrop";
                      updatechange(brnid,rlid,droptype);
                  }
                }
    
                if(data.basket === "LiveAvailmatrix" && target.basketname === "Selectedsubmod" && data.subbasket === "Roles"){                 
    
                      let intarget= [];
                      //let m = $usermatrixStore.LiveSelectmatrix.findIndex(x => x.type === target.basket.type);
                      console.log(target.basket.id);
                      let m = $usermatrixStore.LiveSelectmatrix.findIndex(x => x.id === target.basket.id);
                      if($usermatrixStore.LiveSelectmatrix[m].submodules.length !== 0) {                    
                        intarget = $usermatrixStore.LiveSelectmatrix[m].submodules.filter(x => x.id === data.item.id);
                      }
                      console.log(intarget);
                      console.log($usermatrixStore.LiveSelectmatrix);
                      console.log($usermatrixStore.LiveSelectmatrix[m]);
                                  
                  if(intarget.length === 0) {
                      brnid.push(target.basket.id);
                      rlid.push(data.item.id);
                      console.log(JSON.stringify($usermatrixStore.LiveAvailmatrix));
                      $usermatrixStore.LiveSelectmatrix[m].submodules.push({...data.item});
                      droptype = "roledrop";
                      updatechange(brnid,rlid,droptype);
                  }
    
                } 
                $usermatrixStore.LiveSelectmatrix = JSON.parse(JSON.stringify($usermatrixStore.LiveSelectmatrix));
              }
            
    
            //console.log(JSON.stringify($baskets));
    
            
            
    
            // Remove the item from one basket.
            // Splice returns an array of the deleted elements, just one in this case.
          // const [item] = baskets.LiveAvailmatrix[data.basketIndex].items.splice(data.itemIndex, 1);
            
            
        // Add the item to the drop target basket.
              //baskets.Selectedmodules[basketIndex].items.push(item);
        //	baskets = baskets;
            
        hoveringOverBasket = null;   
        console.log($usermatrixStore);
        }
    
    
        function pushRoleToAllBranch(basketIndex, item){
          console.log(item);
          let brnid = [];
          let rlid = [];          
          rlid.push(item.id);
          let optype ="addroletoall";
          let putput = true;
          $usermatrixStore.LiveSelectmatrix.forEach((x) => {
                x.submodules.forEach((y) => { 
                  console.log(y);
                  if(y.id === item.id) {
                    putput = false;
                  }
                });                 
              if(putput) x.submodules.push({...item});
              putput = true;
          });
          updatechange(brnid,rlid,optype);
          //$baskets = $baskets;
          console.log($usermatrixStore);
        }
    
        function removebranch(basket) {
          let brnid = [];
          let rlid = [];
          brnid.push(basket.id);
          let optype ="removebranch";
          let f = $usermatrixStore.LiveAvailbranch.filter(x => x.id === basket.id);          
          let m = $usermatrixStore.LiveAvailmatrix.findIndex(x => x.type === 'Branches');
          $usermatrixStore.LiveAvailmatrix[m].submodules.push(JSON.parse(JSON.stringify(f[0])));
          $usermatrixStore.LiveAvailmatrix = JSON.parse(JSON.stringify($usermatrixStore.LiveAvailmatrix));
          $usermatrixStore.LiveSelectmatrix=$usermatrixStore.LiveSelectmatrix.filter(x=> !(x.id === basket.id));
          console.log($usermatrixStore.LiveAvailmatrix);
          
          updatechange(brnid,rlid,optype);
          console.log($usermatrixStore);
        }


        function  updatechange(brnid,rlind,optype) {

          if(optype==='addroletoall') {
            //we need to add branch to all the current live selected branch
            $usermatrixStore.LiveSelectmatrix.forEach( (x,ind) => {
              brnid = x.id;
              rlind = rlind[0];
              optype = 'roledrop';
              updatechange1(brnid,rlind,optype);
            });

          } else {
            brnid = brnid[0];
            rlind = rlind[0];
            optype = optype;
            updatechange1(brnid,rlind,optype);
          }
        }


        
      //{itemid: "ROLE", itemkeys:{rolemasterid:$form.rolemasterid},action:"M",oldvalue:[],newvalue:[]};
      function  updatechange1(brnid,rlind,optype,reset=true) {
          let orgbrnexists = false;
          let dd=[];
          livechange = false;

          if($usermatrixStore.ChangeDetails.orgmatrix.length) {
            dd = $usermatrixStore.ChangeDetails.orgmatrix.filter(x => x.id === brnid);
            if(dd.length) orgbrnexists = true;
          } else {
            let ddc = $usermatrixStore.LiveAvailbranch.filter(x => x.id === brnid);
            dd = [{...ddc[0],submodules:[]}];
          }
          console.log( JSON.stringify($usermatrixStore.ChangeDetails.matrix));
          $usermatrixStore.ChangeDetails.matrix = JSON.parse(JSON.stringify($usermatrixStore.ChangeDetails.matrix.filter(x => x.id !== brnid)));


          let ab = "I"; //branch drop
          let ar = "I"; //branch drop
          let brchn = {};
          let oldaudit = {branch:'',roles:[]};
          let newaudit = {branch:'',roles:[]};
          let ddcpy = {};

          if(optype === 'roledrop') {ab= 'FI';ar = 'FI';}
          if(optype === 'removebranch') {ab= 'FD';ar = 'FD';}
          if(optype === 'removerole') ar = 'D';

          if(!orgbrnexists && ['I','FI','D'].includes(ab)){
            console.log("going inside I");
            console.log(dd[0])
            brchn = {...(JSON.parse(JSON.stringify(dd[0]))),action:'I'};
            console.log(JSON.stringify(brchn));
            newaudit.branch = dd[0].name;            
          } else if (orgbrnexists && ab === 'FD') {
            brchn = {...JSON.parse(JSON.stringify(dd[0])),action:'D'};
            oldaudit.branch = dd[0].name;            
          }
          //$usermatrixStore.ChangeDetails.matrix.push({...JSON.parse(JSON.stringify(dd[0])),action:ab});
          
          
          if(['FI','D'].includes(ar) || (ar === 'I' && orgbrnexists)){ // we can use ab === I
            //if(orgbrnexists && orgroleexists) ar = "U";
              let rlmat = false;
              let ssbr = [];
              console.log($usermatrixStore.LiveSelectmatrix);
              let ssbr1 = $usermatrixStore.LiveSelectmatrix.filter(x => x.id === brnid);
              if(ssbr1.length === 1) ssbr = JSON.parse(JSON.stringify(ssbr1[0]));
              console.log(dd);
              console.log(JSON.stringify(ssbr));
              let ddcpy1 = dd.slice(); 
              ddcpy = ddcpy1[0];
              console.log(ssbr);
              console.log(ssbr.length);
              if(ssbr.submodules.length){
                ssbr.submodules.forEach( x => {
                  console.log("inside ssbr");
                    rlmat = false;
                    for (let y of ddcpy.submodules){                       
                        if(x.id === y.id) {
                          rlmat = true;
                          break;
                        }
                      }
                      console.log(rlmat);
                    //if Role found remove it for next iteration
                    if(!rlmat) {
                      console.log("inside adding role");
                      console.log(brchn);
                      console.log(x);
                      brchn.submodules.push({...JSON.parse(JSON.stringify(x)),action:'I'});
                      newaudit.roles.push(x.name);
                     // $usermatrixStore.ChangeDetails.matrixchanged = true;
                    } 
                    ddcpy.submodules = ddcpy.submodules.filter(z =>  z.id !== x.id);                       
                });
              }
              console.log(ddcpy);
              console.log(brchn);
              
                if(ddcpy.submodules.length){
                  ddcpy.submodules.forEach(x => {
                    brchn.submodules.push({...JSON.parse(JSON.stringify(x)),action:'D'});
                    oldaudit.roles.push(x.name);
                  });
                  //$usermatrixStore.ChangeDetails.matrixchanged = true;
                }
              
          } else if(['FD'].includes(ar) && orgbrnexists) {                  
              if(dd.submodules.length){
                dd.submodules.forEach(x => {
                  brchn.submodules.push({...JSON.parse(JSON.stringify(x)),action:'D'});
                  oldaudit.roles.push(x.name);
                });
                //$usermatrixStore.ChangeDetails.matrixchanged = true;
              }
            }
                   
          console.log( JSON.stringify($usermatrixStore.ChangeDetails.matrix));
          if(JSON.stringify(brchn)!==JSON.stringify({})){
            $usermatrixStore.ChangeDetails.matrix.push({...(JSON.parse(JSON.stringify(brchn))),audit:{oldvaluejson:oldaudit,newvaluejson:newaudit}});    
            if(brchn.submodules.length && $usermatrixStore.ChangeDetails.matrix.length === 1) {
              livechange = true;
            } else if(brchn.submodules.length && $usermatrixStore.ChangeDetails.matrix.length > 1) {
              livechange = false;
            }else {
              livechange = null;
            }
          }
          toggle_enable_button(brchn);
      }
     
      function toggle_enable_button(brchn){
        let matxvalid = false;
        
        console.log(livechange);
        console.log(brchn);
        
        
        $usermatrixStore.ChangeDetails.matrixchanged = false;

        if(livechange === true){
          $usermatrixStore.ChangeDetails.matrixchanged = true;
          matxvalid = true;
        } else if(livechange === false){
          if($usermatrixStore.ChangeDetails.matrix.length){
            let otbr = $usermatrixStore.ChangeDetails.matrix.filter(x => x.id !== brchn.id);
            if(otbr.length) {          
              for (let y of otbr){                       
                if(y.submodules.length) {
                  $usermatrixStore.ChangeDetails.matrixchanged = true;
                  matxvalid = true;
                }
                if($usermatrixStore.ChangeDetails.matrixchanged) break;
              }
            }
          } else {
            matxvalid = true;
          } 
        } 

        $usermatrixStore.ChangeDetails.matxvalid = matxvalid;
        if($usermatrixStore.ChangeDetails.profvalid !== null){
          if($usermatrixStore.ChangeDetails.profvalid && matxvalid && ($usermatrixStore.ChangeDetails.matrixchanged || $usermatrixStore.ChangeDetails.profilechanged)) {
            $usermatrixStore.ChangeDetails.Somechanged = true;
          } else {
            $usermatrixStore.ChangeDetails.Somechanged = false;
          }
        } else {
          if(matxvalid && ($usermatrixStore.ChangeDetails.matrixchanged || $usermatrixStore.ChangeDetails.profilechanged)) {
            $usermatrixStore.ChangeDetails.Somechanged = true;
          } else {
            $usermatrixStore.ChangeDetails.Somechanged = false;
          }
        }
        
      }

    
    </script>
    
    
    
    
        <form class="px-10 py-1 rounded w-full my-5 inputs space-y-6">
            <div class="grid grid-cols-1 auto-rows-auto md:grid-cols-9 md:grid-rows-1 md:gap-x-10  gap-y-5 md:gap-y-0	">
      
    
    
                <div class="pristine-form-group md:col-start-1 md:col-span-3">				  
                    <label for="firstname">Company</label>
                            <select required 
                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                            >dasdfasdf</select>
                            <div class="pristine-error-group"></div>
                        </div>
    
    
                        <div class="pristine-form-group md:col-span-3">				  
                            <label for="firstname">Branch</label>
                                    <select required 
                                    class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                                    >dasdfasdf</select>
                                    <div class="pristine-error-group"></div>
                                </div>
    
    
                                <div class="pristine-form-group md:col-span-3">				  
                                    <label for="firstname">Copy from User</label>
                                            <select required 
                                            class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                                            >dasdfasdf</select>
                                            <div class="pristine-error-group"></div>
                                        </div>
            </div>
    
        </form> 
    
      
    
    
        <div class = "flex flex-col bg-white justify-center shadow rounded-lg p-3">
    
          <div class = "flex flex-col md:flex-row flex-wrap bg-blue-100 justify-center gap-x-5 gap-y-5 shadow rounded-lg p-3">
    
              {#each $usermatrixStore.LiveAvailmatrix as basket, basketIndex (basket)} 
                  <div class="shadow rounded-lg p-3  bg-gray-100 w-full md:w-5/12">
    
                      <b class="m-3 ">{basket.type}</b>
    
                      
                      <ul
                      class = "flex flex-col md:flex-row flex-wrap bg-red-100 justify-center gap-x-2 gap-y-2 shadow rounded-lg p-3 w-full"
                    >
                    {basket.submodules.length}
                    {#if basket.submodules.length === 0}
                      <div class ="h-52 flex-grow"> All Available Options are assigned </div>
                    {/if}
                      {#each basket.submodules as item, itemIndex (item)}
                          <div animate:flip class="inline" >
                              <li   
                              class=" shadow rounded-lg bg-green-100 rounded-lg cursor-pointer hover:bg-yellow-200 border-2 p-3 w-64"                     
                                draggable={true}
                                                        
                                on:dragstart={event => dragStart(event, "LiveAvailmatrix", basket.groupid, basket.type, basketIndex, itemIndex,item)}
                              >
                                  <span class="flex flex-row items-center">  
                                      {item.name}
                                      <span class="flex flex-1 "></span>             
                                      <div class="relative inline-block text-left"  on:click={(event)=>togglemenu(event, basketIndex, itemIndex)}>          
                                        <i class="fas fa-ellipsis-v text-gray-300 hover:text-red-300"></i>
                                        {#if $usermatrixStore.LiveAvailmatrix[basketIndex].submodules[itemIndex].menu}
                                        <div class="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                          <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                            <a class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" on:click|preventDefault={()=> pushRoleToAllBranch(basketIndex,item)}>To all Branhes</a>
                                            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">specific branch</a>
                                          </div>
                                        </div>
                                        {/if}
                                        </div>
    
    
                                  </span>
                              </li>                        
                          </div>
                      {/each}
                    </ul> 
                      
                  </div>
              {/each}
      
          </div>
          <div>spacing bewtween</div>
          <div class = "flex flex-col md:flex-row flex-wrap bg-blue-100 justify-center gap-x-5 gap-y-5 shadow rounded-lg p-3"
            on:dragenter={() => hoveringOverBasket = "Selectedmodules"}
            on:dragleave={() => null}
            on:drop={event => drop(event,{groupid:"mygroup",basketname:"Selectedmodules"})}     
            ondragover="return false"
          >
            {#if $usermatrixStore.LiveSelectmatrix.length === 0}
            <div class ="h-96 flex-grow">Nothing selected yet</div>
          {/if}
              {#each $usermatrixStore.LiveSelectmatrix as basket, basketIndex (basket)} 
                  <div class="shadow rounded-lg p-3  bg-gray-100 w-full md:w-80">
                    <div class="flex flex-row justify-center">
                      <b class="m-3 ">{basket.name}</b>
                      <span class="flex flex-1 "></span> 
                      <span on:click={()=>removebranch(basket)}><i class="fas fa-trash-alt text-red-600 font-bold hover:text-red-300"></i></span>
                    </div>
                      
                      <ul
                      class = "flex flex-col md:flex-row flex-wrap bg-red-100 justify-center gap-x-2 gap-y-2 shadow rounded-lg p-3 w-72 h-60"
                        on:dragenter={() => hoveringOverBasket = "Selectedmodules_"+basket.id}
                        on:dragleave={() => hoveringOverBasket = null}
                        on:drop|stopPropagation={event => drop(event, {groupid:"mygroup",basketname:"Selectedsubmod",basket})}
                        ondragover="return false"
                    >
      
                      {#each basket?.submodules as item, itemIndex (item)}
                          <div animate:flip class="inline" >
                              <li   
                              class=" shadow rounded-lg bg-green-100 rounded-lg cursor-pointer hover:bg-yellow-200 border-2 p-3 w-64"                     
                                draggable={true}
                                on:dragstart={event => dragStart(event, basketIndex, itemIndex)}
                              >
                                  <span class="flex flex-row items-center">  
                                      {item.name}
                                      <span class="flex flex-1 "></span>   
                                      <span on:click={()=>removerole(basket,item,basketIndex,itemIndex)}><i class="fas fa-trash-alt fa-xs text-red-400 hover:text-red-500"></i></span>
                                  </span>
                              </li>                        
                          </div>
                      {/each}
                    </ul> 
                      
                  </div>
              {/each}
      
          </div>
      
      
      </div>
    
        



<!--

         let dd = {
                    companyId: null,
                    companyname: null,        
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

      /*
      let bask =        {                              
                                    "LiveAvailmatrix": [
                                                  {   
                                                      groupid:"mygroup",
                                                      basketname:"LiveAvailmatrix",
                                                      type: "Branches",
                                                      submodules:[
                                                          { 
                                                            'id' : "id Jurong west JEM",
                                                            'name' : "Jurong west JEM",
                                                            'read': true,
                                                            'write': true,
                                                            
                                                          },
                                                          { 
                                                            'id' : "id Serangoon road opp mustafa 24hours next to",
                                                            'name' : "Serangoon road opp mustafa 24hours next to",
                                                            'read': true,
                                                            'write': true,
                                                          },
                                                          { 
                                                            'id' : "id Pasirris",
                                                            'name' : "Pasirris",
                                                            'read': false,
                                                            'write': true,
                                                          },
                                                          { 
                                                            'id' : "id Changi Business Park",
                                                            'name' : "Changi Business Park",
                                                            'read': true,
                                                            'write': true,
                                                          },
                                                          { 
                                                            'id' : "id Sentosa island",
                                                            'name' : "Sentosa island",
                                                            'read': true,
                                                            'write': false,
                                                          }                                                
                                                      ],
                                                  },
                                                  {   
                                                      groupid:"mygroup",
                                                      basketname:"LiveAvailmatrix",
                                                      type: "Roles",
                                                      submodules:[
                                                          { 
                                                            'id' : "id Admin",
                                                            'name' : "Admin",
                                                          'read': true,
                                                            'write': true,
                                                            'menu':false,
                                                          },
                                                          { 
                                                            'id' : "id billingcounter",
                                                            'name' : "billingcounter",
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
      
      let baskets3 = [
          {
            "name": "Basket 1",
            "items": ["Orange", "Pineapple","banan1","papap1","kdkjfiue1","kdjiejc1","Pineapple2","banan2","papap2","kdkjfiue2","kdjiejc2","Pineapple3","banan3","papap3","kdkjfiue3","kdjiejc3"]
          },
          {
            "name": "Basket 2",
            "items": ["Banana", "Apple"]
          }
        ];
        
        
          let baskets1 = [
          {
            "name": "Basket 11",
            "items": ["Orange", "Pineapple","banan1","papap1","kdkjfiue1","kdjiejc1","Pineapple2","banan2","papap2","kdkjfiue2","kdjiejc2","Pineapple3","banan3","papap3","kdkjfiue3","kdjiejc3"]
          },
          {
            "name": "Basket 21",
            "items": ["Orange", "Pineapple","banan1","papap1","kdkjfiue1"]
          },
          {
            "name": "Basket 22",
            "items": []
          },
          {
            "name": "Basket 23",
            "items": []
          },
          {
            "name": "pasir ris pungol towncouncil branch dasddkkd dkdkjeiruekd dkfkdkd",
            "items": []
          },
          {
            "name": "Basket 25",
            "items": []
          },
          {
            "name": "Basket 26",
            "items": []
          },
          {
            "name": "Basket 27",
            "items": []
          },
          {
            "name": "Basket 28",
            "items": []
          },
          {
            "name": "Basket 29",
            "items": []
          },
          {
            "name": "Basket 30",
            "items": []
          },
          {
            "name": "Basket 33",
            "items": ["biscut", "cream"]
          },
          {
            "name": "Basket 35",
            "items": []
          },
          {
            "name": "Basket 36",
            "items": []
          },
          {
            "name": "Basket 37",
            "items": []
          },
          {
            "name": "Basket 38",
            "items": []
          },
          {
            "name": "Basket 39",
            "items": []
          },
          {
            "name": "Basket 40",
            "items": []
          },
          {
            "name": "Basket 31",
            "items": ["biscut", "cream"]
          }
          
        ];
      
        
        let hoveringOverBasket1;
        
  */

  -->