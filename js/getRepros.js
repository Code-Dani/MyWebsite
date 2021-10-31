function initialize() {
    // 1. Create a new XMLHttpRequest object
    var get = new XMLHttpRequest();

    // 2. Configure it: GET-request for the URL /article/.../load
    get.open('GET', 'https://api.github.com/users/Code-Dani/repos');

    // 3. Send the request over the network
    get.send();

    // 4. This will be called after the response is received
    get.onload = function() {
        if (get.status != 200) { // analyze HTTP status of the response
            console.log(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
        } else { // show the result
            var JSON_object = JSON.parse(get.response);
            console.log(JSON_object);
            //LATEST RELEASE WILL ALWAYS BE [0] -> order: from latest to oldest
            
            for (var i = 0; i < JSON_object.length; i++) {

                var main = document.getElementById("download-main"); //grab existing div in Projects.html
                //title
                var div = document.createElement("div"); div.setAttribute("class", "release");
                var h3 = document.createElement("h3");
                h3.appendChild(document.createTextNode(JSON_object[i].name));
                div.appendChild(h3);


                var inside_div = document.createElement("div");
                inside_div.setAttribute("style", "text-align: left;");
                var hr = document.createElement("hr");
                hr.setAttribute("class", "release-hr");

                var h5 = document.createElement("h5");
                h5.appendChild(document.createTextNode("Info"));

                var ul = document.createElement("ul");
                var li = document.createElement("li");
                li.appendChild(document.createTextNode("Created: " + (JSON_object[i].created_at).split("T")[0] + " at " + ((JSON_object[i].created_at).split("T")[1]).split("Z")[0]));
                ul.appendChild(li);
                var li1 = document.createElement("li");
                li1.textContent = "Description: " + JSON_object[i].description;
                ul.appendChild(li1);
                var li2 = document.createElement("li");
                li2.textContent = "Language: " + JSON_object[i].language;
                ul.appendChild(li2);

                inside_div.appendChild(hr);
                inside_div.appendChild(h5);
                inside_div.appendChild(ul);

                //Git link button
                var OpenButton = document.createElement("a"); var span = document.createElement("span");
                
                span.setAttribute("class","badge badgeopen");
                span.appendChild(document.createTextNode("Open in Git"));

                OpenButton.setAttribute("href", JSON_object[i].html_url);
                OpenButton.setAttribute("target", "_blank");
                OpenButton.setAttribute("style","font-size: 25px;");
                OpenButton.appendChild(span);
                inside_div.appendChild(OpenButton);

                //Dynamically checking if the repository has releases:
                requestReleases(JSON_object[i], inside_div);
        
                div.appendChild(inside_div);
                main.appendChild(div);
            }
            
        }
    };

    function requestReleases(JSON_object, inside_div){
        var getRelease = new XMLHttpRequest();
        getRelease.open('GET', JSON_object.releases_url.split("{")[0],true);
        getRelease.send();

        getRelease.onload = function(){
            if (getRelease.status != 200) { // analyze HTTP status of the response
                console.log("error");
            } else { // show the result
                var JSON_release = JSON.parse(getRelease.response);
                console.log("array:" + JSON_release.length);
            }
            if(JSON_release.length != 0){
                //means that there are releases
                var ReleaseButton = document.createElement("a"); var Rspan = document.createElement("span");
                Rspan.setAttribute("class", "badge badgerelease");
                Rspan.appendChild(document.createTextNode("View releases"));
                ReleaseButton.setAttribute("style","font-size: 25px;");
                ReleaseButton.setAttribute("onclick", "getReleases('"+JSON_object.releases_url.split("{")[0]+"')");
                ReleaseButton.appendChild(Rspan);
                inside_div.appendChild(ReleaseButton);
            }else{
                //joins if there are no realeases, so I do nothing
            }
        }

        getRelease.onerror = function() {
            alert("error while loading informations");
        }
    }

    get.onerror = function() {
        alert("error while loading informations");
    }
}