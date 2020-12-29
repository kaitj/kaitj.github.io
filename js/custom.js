    // Set up JSON dictionary
    var app = new Vue({
        el: '#app',
        data: {
            info: {
                projects: {
                }
            }
        }
    })

    // Reads profile.json
    var url = "https://raw.githubusercontent.com/kaitj/kaitj.github.io/master/assets/profile.json"
    if (window.location.hostname=="localhost"){
        url = "assets/profile.json"
    }
    $.getJSON(url, function(data){
        console.log("data is", data);
        app.info = data;
        app.info.papers.sort(function(a,b){return b.date > a.date? 1 : -1})
        app.info.talks.sort(function(a,b){return b.date > a.date? 1 : -1})
    })

    // Pull out nav bar
    // Closes sidebar menu
    $("#menu-close").click(function(e) {
        e.preventDefault();
        $("#nav-wrapper").toggleClass("active");
    });

    // Opens the sidebar menu
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#nav-wrapper").toggleClass("active");
    });