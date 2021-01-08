import {HttpClient} from '../services/httpservice/HttpClient';

export let http;

export const createAppServices = () => {
    //Initialise HTTP service
    http = HttpClient();
}

