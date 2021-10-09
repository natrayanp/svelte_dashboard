<script>
    export let checked = false;
    export let color = "#2196F3";
	export let istouched = false;

    /*
        .switch {
      position: relative;
      display: inline-block;
      width: 60px;
      height: 25px;
    }
    */

let old_chk = checked;
let count = 0;


$: {if(checked !== old_chk) {
		count = count+1;
		if(count>0) istouched = true;
	}};

</script>
  
  <style>
    .switch {
      position: relative;
      display: inline-block;
      top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 1;
    
    }

.container {
	width: auto;
	height: auto;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 1;
}

input {
	display: none;
}

/* toggle */
.toggle {
	/* 	display: block; */
	position: relative;
	cursor: pointer;
}
.toggle:before {
	content: "";
	display: block;
	width: 70px;
	height: 27px;
	border-radius: 15px;
	background-color: lightgray;
}
.toggle span {
	position: absolute;
	top: -4px;
	left: 0;
	width: 35px;
	height: 35px;
	border-radius: 50%;
	background-color: lightslategray;
	transition: all 0.3s ease;
    display: flex;
	justify-content: center;
	align-items: center;
    border-color: darkgray;
    border-width: 2px;
}

.toggle span .fas {
    text-align: center;
	height: 100%;
	color: white;
}
.toggle span .fa-check {
	display: none;    
}

#checkbox:checked + .toggle span .fa-power-off {
	display: none;    
}
#checkbox:checked + .toggle span .fa-check {
	display: flex;
    
}
#checkbox:checked + .toggle:before {
	background: #48bb78;
    
}
#checkbox:checked + .toggle span {
	transform: translateX(35px);
	background-color: lightskyblue;
    border-color: green;
    border-width: 2px;
}
</style>
 
  
  <!--label class="switch">
    <input type="checkbox" bind:checked />
    <span class="slider" />
  </label-->


  <div class="switch">

    <input type="checkbox" id="checkbox" bind:checked/>    
    <label for="checkbox" class="toggle">
        <span>
            <i class="fas fa-power-off"></i>
            <i class="fas fa-check"></i>
        </span>
        
    </label>
</div>