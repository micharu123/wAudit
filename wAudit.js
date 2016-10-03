// Inject the following code so that we can access the global object.
var injectCode = function() {
    // Global for storing objects.
    _objects = [];
    _workers = [];
    _names = [];

    // This function was modified from:
    // http://stackoverflow.com/questions/8409577/get-all-the-objects-dom-or-otherwise-using-javascript
    function getChildren(object) {
        // Get the property names of the object this.
        var keys = Object.keys(object);
        // Slice out the objects that we don't need: top, window, location, external, chrome, document.
        keys = keys.slice(6,keys.length-1);

        keys.forEach(function(key) {
            var value = object[key];
            if(value && typeof value === 'object') {
                if(_objects.indexOf(value) < 0) {
                    _objects.push(value);
                    _names.push(key);
                    getChildren(value);
                }
            } 
        });     
    }

    getChildren(this);

    for(var i=0;i<_objects.length;i++) {
        try {
            if(_objects[i].toLocaleString() === '[object Worker]') {
                // Tricky here. We push the name of the worker not the object.
                _workers.push(_names[i]);    
            }
        } catch(e) {
            console.warn(e);
        }
    }

    // Got the workers... if there were any. If so, we will inject the following.
    if(_workers.length > 0) {
        console.warn("wAudi: found the following web workers: ", _workers);

        var text = "<center><strong>wAudit has detected the following web workers:</strong><p style='float:right'><sup><a onclick='document.getElementbyID(\'worker_info\').style.display=none;'>X</sup>&nbsp;&nbsp;&nbsp;&nbsp;</p><br/>";
        for(var i=0;i<_workers.length;i++) {
            evalstring = _workers[i]+".terminate();alert('Terminated');";
            text += "<a onclick="+ evalstring +">"+ 
            _workers[i] +"</a>";
            if(i<_workers.length-1) {
                text += "&nbsp;&nbsp;||&nbsp;&nbsp;"
            }
        }
        text += "</center>"

        var banner = document.createElement('div');
        banner.id = 'worker_info';
        banner.className = 'worker_info';
        banner.style.position = 'fixed';
        banner.style.bottom = '0';
        banner.style.width = '100%';
        banner.style.height = '40px';
        banner.style.backgroundColor = '#FFFF99';
        banner.innerHTML = text;
        document.body.appendChild(banner);
    }
};

var script = document.createElement('script');
script.textContent = '(' + injectCode + ')()';
(document.head||document.documentElement).appendChild(script);
script.parentNode.removeChild(script);