function getReleases(release){
    document.getElementById('download-main').innerHTML = null

    var get = new XMLHttpRequest();
    get.open('GET', release);
    get.send();;

    get.onload = function(){
        if(get.status != 200){
            console.log(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
        }else{
            document.getElementById("returnButton").removeAttribute("hidden");
            var JSON_object = JSON.parse(get.response);
            console.log(JSON_object);
            //LATEST RELEASE WILL ALWAYS BE [0] -> order: from latest to oldest
            var main = document.getElementById("download-main");
            for (var i = 0; i < JSON_object.length; i++) {
                var div = document.createElement("div");
                div.setAttribute("class", "release");
                var h3 = document.createElement("h3");
                h3.appendChild(document.createTextNode("v." + JSON_object[i].tag_name + "\t"));
                var a = document.createElement("a");
                var span = document.createElement("span");
                if (i == 0) {
                    span.setAttribute("class", "badge badgelatest");
                    a.setAttribute("href", JSON_object[i].assets[0].browser_download_url);
                    span.appendChild(document.createTextNode("Download latest version"));
                } else {
                    span.setAttribute("class", "badge badgeoutdated");
                    a.setAttribute("href", JSON_object[i].assets[0].browser_download_url);
                    span.appendChild(document.createTextNode("Download outdated version"));
                }
                a.appendChild(span);
                h3.appendChild(a);
                div.appendChild(h3);
                var inside_div = document.createElement("div");
                inside_div.setAttribute("style", "text-align: left;");
                var hr = document.createElement("hr");
                hr.setAttribute("class", "release-hr");
                var h4 = document.createElement("h4");
                h4.appendChild(document.createTextNode("Info"));
                var ul = document.createElement("ul");
                var li = document.createElement("li");
                li.appendChild(document.createTextNode("Published: " + (JSON_object[i].published_at).split("T")[0] + " at " + ((JSON_object[i].published_at).split("T")[1]).split("Z")[0]));
                ul.appendChild(li);
                var li1 = document.createElement("li");
                li1.textContent = "Downloads: " + JSON_object[i].assets[0].download_count;
                ul.appendChild(li1);
                var li2 = document.createElement("li");
                li2.textContent = "Info: " + JSON_object[i].assets[0].name + " size: (" + parseFloat(parseFloat(JSON_object[i].assets[0].size) / 1000000).toFixed(2) + " Mb)";
                ul.appendChild(li2);
                inside_div.appendChild(hr);
                inside_div.appendChild(h4);
                inside_div.appendChild(ul);
                div.appendChild(inside_div);
                main.appendChild(div);
            }
        }
    }

    get.onerror = function() {
        alert("error while loading informations");
    }
}


function returnButton(){
    location.reload(true);
}