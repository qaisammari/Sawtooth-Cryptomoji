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

let webMessage = "";
let addressList = [];


// axios({
//     method: 'post',
//     url: '/api/batches',
//     data: encodeAll(privateKey, {action: "CREATE_COLLECTION"}),
//     headers: {'Content-Type' : 'application/octet-stream'}
// }).then(function(response) {
//     console.log("RESPONSE: ", response);
// }).catch(function (error) {
//     console.log("ERROR: ", error);
// });

webMessage = "Getting Mojies";


axios({
    method: 'get',
    url: '/api/state'
}).then(function(response) {
    webMessage = "We got the mojies ... ";
    console.log("RESPONSE: ", response);
    addressList =  response.data.data.map( d => {
        return (
            <li>{d.address.slice(6,8) === '00'? 'Collection': d.address.slice(6,8) === '01' ? 'Moji': 'What ?'} : {d.address}</li>
        )
    });
}).then(function() {
    console.log("DATA LIST: ", addressList.length);
}).then(function()  {
    ReactDOM.render((
        <BrowserRouter>
            <div>
                <h1>Hello, Cryptomoji!</h1>
                <h3>{webMessage}</h3>
                <h2>Keys:</h2>
                <ul>
                    <li>
                        {privateKey}
                    </li>
                    <li>
                        {publickKey}
                    </li>
                </ul>


                <h1>Mojies List</h1>
                <ul>
                    {addressList}
                </ul>
            </div>
        </BrowserRouter>
    ), document.getElementById('app'));
})


    .catch(function (error) {
    console.log("ERROR: ", error);
    webMessage = "Failed to get the mojies ... "

});






