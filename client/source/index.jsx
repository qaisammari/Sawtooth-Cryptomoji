import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import {createKeys} from "./services/signing";
import {encodeAll} from "./services/transactions";

const keys = createKeys();
const privateKey = keys.privateKey;


console.log("WE GOT PRIVATE KEY: ", privateKey);


axios({
    method: 'post',
    url: 'localhost:8008/rest/batches',
    data: encodeAll(privateKey, {action: "CREATE_COLLECTION"}),
    headers: {'Content-Type' : 'application/octet-stream'}
}).then(function(response) {
    console.log("RESPONSE: ", response);
}).catch(function (error) {
    console.log("ERROR: ", error);
});









ReactDOM.render((
  <BrowserRouter>
    <h1>Hello, Cryptomoji!</h1>
  </BrowserRouter>
), document.getElementById('app'));

