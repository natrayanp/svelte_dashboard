<style>
    .default-position-style-top-left,
    .default-position-style-top-center,
    .default-position-style-top-right,
    .default-position-style-bottom-left,
    .default-position-style-bottom-center,
    .default-position-style-bottom-right {
      position: fixed;
      width: 270px;
    }
  
    .default-position-style-top-left {
      top: 0;
      left: 0;
    }
  
    .default-position-style-top-center {
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  
    .default-position-style-top-right {
      top: 0;
      right: 0;
    }
  
    .default-position-style-bottom-left {
      bottom: 0;
      left: 0;
    }
  
    .default-position-style-bottom-center {
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  
    .default-position-style-bottom-right {
      bottom: 0;
      right: 0;
    }
  </style>
  <script>
 
    import Alert from './Alert.svelte';
    import DefaultAlert from './DefaultAlert.svelte';
      
    import store from '../../store';
    
    let item = null;
    let withoutStyles = false;
    export let targetid ='alert-default';
  
    const getClass = (position = '') => {
      const defaultPositionClass = ` default-position-style-${position}`;
  
      return `position-${position}${withoutStyles ? '' : defaultPositionClass}`;
    };
  

    let myalert;    
    $: myalert;
    

    const unsubscribe = store.subscribe(value => {
        myalert = value.filter((n) => (n.notificationtype === 'alert'));      
    });
  
  </script>
  

  
  {#if myalert.length > 0}
  <div class="notifications">

        {#each myalert as notification (notification.id)}        
            {#if notification.targetid === targetid}
              <Alert
                {notification}
                {withoutStyles}
                item={item || DefaultAlert}
              />
            {/if}                 
        {/each}
      
  </div>
  {/if}  