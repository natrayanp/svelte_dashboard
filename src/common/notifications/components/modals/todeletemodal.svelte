<script>    
</script>
    
    <div class="fixed z-10 inset-0 overflow-y-auto" on:click>
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <!--
            Background overlay, show/hide based on modal state.
      
            Entering: "ease-out duration-300"
              From: "opacity-0"
              To: "opacity-100"
            Leaving: "ease-in duration-200"
              From: "opacity-100"
              To: "opacity-0"
          -->
          <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-200 opacity-75 "></div>
          </div>
      
          <!-- This element is to trick the browser into centering the modal contents. -->
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <!--
            Modal panel, show/hide based on modal state.
      
            Entering: "ease-out duration-300"
              From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              To: "opacity-100 translate-y-0 sm:scale-100"
            Leaving: "ease-in duration-200"
              From: "opacity-100 translate-y-0 sm:scale-100"
              To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          -->
          <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full shadow-xl z-50" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
            <div>
              <div class="relative w-full bg-gray-200 rounded"></div>
              <div style="width: 100%" class="absolute top-0 h-2 shim-blue"></div>
            </div>
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">Checking your account</h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">IN DEFAULT We are checking your Credentials. Security is importance to us</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    
    <style>
    
      .shim-red {
        position: relative;
        overflow: hidden;
        background-color: rgba(255, 0, 0, 0.7);
      }
      
      .shim-red::after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transform: translateX(-100%);
        background-image: linear-gradient(
          90deg,
          rgba(233, 233, 233, 1) 0,
          rgba(233, 233, 233, 0.9) 50%,
          rgba(233, 233, 233, 0.8) 100%
        );
        animation: shimmer 3s ease-out infinite;
        content: "";
      }
      
      .shim-blue {
        position: relative;
        overflow: hidden;
        background-color: rgba(0, 155, 255, 0.7);
      }
      .shim-blue::after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transform: translateX(-100%);
        background-image: linear-gradient(
          90deg,
          rgba(233, 233, 233, 1) 0,
          rgba(233, 233, 233, 0.9) 50%,
          rgba(233, 233, 233, 0.8) 100%
        );
        animation: shimmer 2.5s ease-out infinite;
        content: "";
      }
      
      
      @keyframes shimmer {
        100% {
          transform: translateX(0%);
          opacity: 0;
        }
      }
      
      </style>