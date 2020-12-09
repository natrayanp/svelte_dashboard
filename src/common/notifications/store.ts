import { readable, writable } from 'svelte/store';

import {positions,notificationtype,modaltype} from './modals'


const isNotificationValid = notification => { 
  if (!notification || !notification.text || !notification.notificationtype) return false;
  if (!notificationtype.includes(notification.notificationtype)) return false;
  if (typeof notification.text !== 'string') return false;
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




const addNotification = (notification, update) => {
  if (!isNotificationValid(notification)) throw new Error('Notification object is not valid'); 
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
    public close(data=null){removeNotification(this.id,data,update);}    
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

const removeNotification = (notificationId,data=null,update) => {  

  let ncpy ;
  update((notifications) => {    
    ncpy = notifications.filter(n => n.id === notificationId);
    return notifications.filter(n => n.id !== notificationId);
  });  

  let mobj = ncpy[0];

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
    removeNotification: (notificationId,data) => removeNotification(notificationId,data,update),
    clearNotifications: notificationtype => clearNotifications(notificationtype, set),
  };
};

export default createNotificationsStore();


