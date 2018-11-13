
import * as data from './data.js';
import * as ui from './ui.js';

const init = () => {

    console.log('App initialized!');

    data.fetchData(onSuccess, onError);
};

function onSuccess()