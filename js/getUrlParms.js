const getUrlParms = () => {
    let data = document.URL.split("?")[1];
    let kvs = data.split("&");
    let parms = {}
    for(let kv of kvs) {
        let keyVal = kv.split("=");
        parms[keyVal[0]] = keyVal[1];
    }
    console.log(parms);
    return parms;
}