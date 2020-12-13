
class controls{
    name:string;
    validator:string;
}

class group{
    name:string;
    controls: controls[];
}


export class reactiveform{

    forstruct:{}
   
    constructor(){
    }


    group(d) {
        this.forstruct= d;
        return this.forstruct;        
    }

}

export function testfor(){
let fb = new reactiveform();

let profileform = fb.group({
    firstName: ['', 'Validators.required'],
    lastName: [''],
    address: {
      street: [''],
      city: [''],
      state: [''],
      zip: ['']
    },
    aliases:[ fb.group({Alias: ['']}]
  });

console.log(profileform);

}