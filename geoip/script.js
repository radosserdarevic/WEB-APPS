
let $ip = document.querySelector('#ip');
let ip;

let $add = document.querySelector('#add');
let $list = document.querySelector('#list');

$add.addEventListener('click', () => {

    addCity();
});

let addCity = () => {

    ip = $ip.value;
    // let url = `http://api.geoiplookup.net/?query=${ip}`;
    let url = 'something.xml';

    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url);
    xmlhttp.send();

    xmlhttp.onload = () => {
        let xmlDoc = xmlhttp.responseXML;
        let city = xmlDoc.querySelector('city').textContent;
        let $li = document.createElement('li');
        $li.textContent = city;
        $list.appendChild($li);
    };
};


