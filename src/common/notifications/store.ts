import { readable, writable } from 'svelte/store';

import {positions,notificationtype,modaltype} from './modals'


const isNotificationValid = notification => { 
  if (!notification || !notification.title || !notification.text || !notification.notificationtype) return false;
  if (!notificationtype.includes(notification.notificationtype)) return false;
  if (typeof notification.title !== 'string' || typeof notification.text !== 'string') return false;
  if (((notification.notificationtype) === 'notification') && (!positions.includes(notification.position))) return false;
  if (((notification.notificationtype) === 'modal') && (notification.position)) return false;  
  if (((notification.notificationtype) === 'modal') && (!modaltype.includes(notification.modaltype))) return false;
  
  return true;  
};

class Deferred {
  promise;
  reject;
  resolve;
  constructor() {
    this.promise = new Promise((resolve, reject)=> {
      this.reject = reject;
      this.resolve = resolve;
    })
  }
}

function variableChk(val) {  
  if(val === undefined || val === null) return true;
  return false;
}



const addNotification = (notification, update) => {
  if (!isNotificationValid(notification)) throw new Error('Notification object is not valid'); 
  console.log(notification.hasbackdrop);
  //Enrich Notification
  (variableChk(notification.disableClose)) ? notification['disableClose'] = true : notification['disableClose'] = notification.disableClose;
  (variableChk(notification.hasbackdrop)) ? notification['hasbackdrop'] = true : notification['hasbackdrop'] = notification.hasbackdrop;
  console.log(notification.hasbackdrop);
  let notobj   = notification;
  let tid = notification.id? notification.id : (notification.notificationtype === 'alert'?'alert-default': new Date().getTime());
  const {
    //id = notification.id? notification.id : (notification.notificationtype === 'alert'?'alert-default': new Date().getTime()),
    id = tid,
    removeAfter = +notification.removeAfter,
    ...rest
  } = notification;
  
  
  let mypromise = new Deferred();

  
  //Final return object
  class retObj {    
    constructor(public readonly id , public readonly config , public returneddata){}    
    //It is the responsibility of whoever calling this close to pass data back to the caller    
    public close(data=null){removeNotification(this,data,update);}    
  };

  console.log(notification.id);
  let myobj = new retObj(tid, notobj, mypromise.promise);

  update((notifications) => {
    return [...notifications, {
      id,
      removeAfter,
      myobj,
      mypromise,
      ...rest,
    }];
  });
  

  return (myobj);
};

const removeNotification = (notiobj,data=null,update) => {  
  console.log(notiobj);
  let ncpy ;
  update((notifications) => {    
    console.log(notifications);
    ncpy = notifications.filter(n => n.id === notiobj.id);
    return notifications.filter(n => n.id !== notiobj.id);
  });  

  let mobj = ncpy[0];
  console.log(mobj);

  if(mobj.notificationtype === 'modal') {

    mobj.mypromise.resolve(data);
  } else {
    mobj.mypromise.resolve( {'closed':true}); 
  }
  return {'closed':true};
}

const clearNotifications = (notificationtype: 'notification' | 'modal' |'all', set) =>  set((notifications) => {
  if (notificationtype === 'all') return [];
  return notifications.filter(n => (!(n.notificationtype === notificationtype)));
});


const createNotificationsStore = () => {
  const {
    subscribe,
    set,
    update,
  } = writable([]);

  return {
    subscribe,
    addNotification: (notification) => addNotification(notification, update),
    removeNotification: (notiobj,data=null) => removeNotification(notiobj,data,update),
    clearNotifications: notificationtype => clearNotifications(notificationtype, set),
  };
};

export default createNotificationsStore();


