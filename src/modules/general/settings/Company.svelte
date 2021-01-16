<script>


const dd = {
        companyId: null,
        companyName: null,
        companyShortName: null,
        companyCategory: null,
        companyStatus: null,
        companyDescription: null,
        companyImageUrl: null,
        companyLogo: null,
        companyIndustry: null,
        companyTaxID: null,
        companyAddLine1: null,
        companyAddLine2: null,
        companyCity: null,
        companyState: null,
        companyCountry: null,
        companyPinCode: null,
        companyPhone: null,
        companyFax: null,
        companyMobile: null,
        companyWebsite: null,
        companyEmail: null,
        companyStartDate: null,
        companyFiscalYear: null,
        companyTimeZone: null,
        companyBaseCurency:null,
        companysParent:null,
        entityid:null,
}

let my = true;


</script>



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
                <!--
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
                </th>

  

                <th scope="col" on:click={()=> dt2=true} on:focusout={()=> dt2=false} class="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                    <span>Address</span>
                <!--
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

                </th>
  

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




              <!-- More rows... -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
</div>

<div class="py-10"></div>

<div class="shadow rounded-lg flex flex-col flex-auto pb-7 bg-white">
    <div class="bg-blue-100 h-20 rounded-t-lg flex flex-row items-center px-7">
        <h2 class="text-2xl text-black text-gray-700 font-bold">Company Settings</h2>  
        <span class="flex-grow"></span>  
       <button class=" bg-indigo-700 rounded text-white font-semibold w-36 py-2 px-7 shadow">Save</button>
       <span class="flex w-5"></span>
      <button class="bg-red-600 rounded text-white font-semibold w-36 py-2 px-7  shadow">Cancel</button>      
    </div>
    <form class="px-10 py-1 rounded w-full my-5 inputs space-y-6">
        <div class="grid grid-cols-1 auto-rows-auto md:grid-cols-9 md:grid-rows-6 md:gap-x-10  gap-y-5 md:gap-y-0	">

            <div class="pristine-form-group md:col-start-1 md:col-span-3">				  
                <label for="firstname">Name</label>
                <input required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                        type = "text"
                        />
                <div class="pristine-error-group"></div>
              </div>

              <div class="pristine-form-group md:col-start-4 md:col-span-3">				  
                <label for="firstname">Short Name</label>
                        <input required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                type = "text"
                        />
                        <div class="pristine-error-group"></div>
                    </div>
       
       
              <div class="md:row-span-3 md:col-start-7 md:col-span-3  place-self-center  justify-self-center w-full h-full border-2 border-gray-400 border-dashed md:order-none order-first">            
                  <div class="flex flex-col h-full  justify-center justify-self-center">
                    <button class="self-center text-gray-500 text-4xl rounded-xl 	px-4">+</button>
                    <h5 class="self-center text-gray-400 ">Add your company Logo</h5>                         
                  </div>
            </div>
       
              <div class="pristine-form-group md:col-start-1 md:col-span-3">				  
                <label for="firstname">Category</label>
                        <select required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                        >dasdfasdf</select>
                        <div class="pristine-error-group"></div>
                    </div>
       
                <div class="pristine-form-group md:col-start-4 md:col-span-3">				  
                <label for="firstname">Industry</label>
                        <select required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                        >dasdfasdf</select>
                        <div class="pristine-error-group"></div>
                    </div>
       
                <div class="pristine-form-group md:col-start-1 md:col-span-3">				  
                <label for="firstname">Tax ID</label>
                        <input required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                type = "text"
                        />
                        <div class="pristine-error-group"></div>
                    </div>
       
                <div class="pristine-form-group md:col-start-4 md:col-span-3">				  
                <label for="firstname">Start Date</label>
                        <input required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                type = "date"
                        />
                        <div class="pristine-error-group"></div>
                    </div>
       
                <div class="pristine-form-group md:col-start-1 md:col-span-5">				  
                <label for="firstname">Address Line 1</label>
                        <textarea required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                type = "text"
                        ></textarea>
                        <div class="pristine-error-group"></div>
                    </div>
       
              <div class="pristine-form-group md:col-start-6 md:col-span-4">				  
                <label for="Addressline2">Address Line 2</label>
                        <textarea required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                type = "text"
                        ></textarea>
                        <div class="pristine-error-group"></div>
                    </div>
       
              
              <div class="pristine-form-group md:col-start-1 md:col-span-2 my-3">				  
                <label for="Country">Country</label>
                        <select required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                        >dasdfasdf</select>
                        <div class="pristine-error-group"></div>
                    </div>
       
              <div class="pristine-form-group md:col-start-3 md:col-span-3  my-3">				  
                <label for="City">City</label>
                        <select required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                        >dasdfasdf</select>
                        <div class="pristine-error-group"></div>
                    </div>
       
              <div class="pristine-form-group md:col-start-6 md:col-span-3  my-3">				  
                <label for="State">State</label>
                        <select required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                        >dasdfasdf</select>
                        <div class="pristine-error-group"></div>
                    </div>
       
                <div class="pristine-form-group md:col-start-9 md:col-span-1  my-3">				  
                <label for="firstname">Pin</label>
                        <input required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			
                type = "text"
                        />
                        <div class="pristine-error-group"></div>
                    </div>
              
       
              <div class="pristine-form-group md:col-span-2">				  
                <label for="Phone">Phone</label>
                        <input type="text" required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                        />
                        <div class="pristine-error-group"></div>
                    </div>
              <div class="pristine-form-group md:col-span-2">				  
                <label for="Phone">Fax</label>
                        <input type="text" required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                        />
                        <div class="pristine-error-group"></div>
                    </div>
              
       
              <div class="pristine-form-group  md:col-span-2">				  
                <label for="Phone">Mobile</label>
                        <input type="text" required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                        />
                        <div class="pristine-error-group"></div>
                    </div>
       
              <div class="pristine-form-group  md:col-span-3">				  
                <label for="Phone">email</label>
                        <input type="text" required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                        />
                        <div class="pristine-error-group"></div>
                    </div>
       
       
              <div class="pristine-form-group  md:col-span-4">				  
                <label for="FiscalYear">Fiscal Year</label>
                        <input type="text" required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                        />
                        <div class="pristine-error-group"></div>
                    </div>
       
       
              <div class="pristine-form-group  md:col-span-1">				  
                <label for="Timezone">Timezone</label>
                        <input type="text" required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                        />
                        <div class="pristine-error-group"></div>
                    </div>
       
              <div class="pristine-form-group  md:col-span-1">				  
                <label for="BaseCurrency">Currency</label>
                        <input type="text" required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                        />
                        <div class="pristine-error-group"></div>
                    </div>
       
              <div class="pristine-form-group  md:col-span-1">				  
                <label for="Phone">Website</label>
                        <input type="text" required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                        />
                        <div class="pristine-error-group"></div>
                    </div>
       
              <div class="pristine-form-group  md:col-span-2">				  
                <label for="Phone">Paren Company</label>
                        <select type="text" required 
                        class="mt-0 block w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue hover:border-blue hover:border-b"			          
                        ></select>
                        <div class="pristine-error-group"></div>
                    </div>
       






        </div>
    </form> 
</div>
