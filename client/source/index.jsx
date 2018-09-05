import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import {createKeys} from "./services/signing";
import {encodeAll} from "./services/transactions";

const keys = createKeys();
const privateKey = keys.privateKey;
const publickKey = keys.publicKey;


console.log("WE GOT PRIVATE KEY: ", privateKey);


axios({
    method: 'post',
    url: '/api/batches',
    data: encodeAll(privateKey, {action: "CREATE_COLLECTION"}),
    headers: {'Content-Type' : 'application/octet-stream'}
}).then(function(response) {
    console.log("RESPONSE: ", response);
}).catch(function (error) {
    console.log("ERROR: ", error);
});




ReactDOM.render((
  <BrowserRouter>
    <div>
        <h1>Hello, Cryptomoji!</h1>
        <h2>Keys:</h2>
        <ul>
            <li>
                {privateKey}
            </li>
            <li>
                {publickKey}
            </li>
        </ul>
    </div>
  </BrowserRouter>
), document.getElementById('app'));

