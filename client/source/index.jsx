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
webMessage = "Getting Mojies";




const addCollection = function () {
    axios({
        method: 'post',
        url: '/api/batches',
        data: encodeAll(privateKey, {action: "CREATE_COLLECTION"}),
        headers: {'Content-Type' : 'application/octet-stream'}
    }).then(function(response) {
        console.log("RESPONSE: ", response);
        fetchData();
    }).catch(function (error) {
        console.log("ERROR: ", error);
    });
}


const selectSire = function(privateKey, sire) {
    axios({
        method: 'post',
        url: '/api/batches',
        data: encodeAll(privateKey, {
            action: "SELECT_SIRE",
            sire: sire}),
        headers: {'Content-Type' : 'application/octet-stream'}
    }).then(function(response) {
        console.log("RESPONSE: ", response);
        fetchData();
    }).catch(function (error) {
        console.log("ERROR: ", error);
    });
}



const fetchData = function () {

    axios({
        method: 'get',
        url: '/api/state'
    }).then(function(response) {
        webMessage = "We got the mojies ... ";
        console.log("RESPONSE: ", response);
        addressList =  response.data.data.map( d => {
            return (
                <li>{d.address.slice(6,8) === '00'? 'Collection': d.address.slice(6,8) === '01' ?
                    'Moji' : d.address.slice(6,8) === '02'? 'Sire' : 'What ?'} : {d.address}</li>
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
    }) .catch(function (error) {
        console.log("ERROR: ", error);
        webMessage = "Failed to get the mojies ... "

    });

}

// selectSire("3a754941a8976a89760f78feb43e58f3725949c2aa74a7704375d763eb27b3e7", "5f4d7601b325e182e21104ae62b220f5c21d27b5831f1b1e375ba2185ff2d75376f6c5");
// selectSire("b0bb4dbd26b92437d333e5727c81056ad15a708d05592f450ce18c7392913ab6", "5f4d7601e18a9ed3e941b714320912d210a609c9fdfb8a8a91f92cb2c08dc0995d6414");
fetchData();








