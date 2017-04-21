/* global $ */
var twitchUsers = [
  "ESL_SC2", 
  "cretetion", 
  "freecodecamp", 
  "habathcx", 
  "pietsmiettv", 
  "RobotCaleb", 
  "noobs2ninjas", 
  "thebaseradio"
];

function createApi(type, name) {
  return "https://wind-bow.gomix.me/twitch-api/" + type + "/" + name + "?callback=?";
}

// show all channel status
function showAll() {
  $("#displayBox").empty();
  twitchUsers.forEach(function(channel_name) {
    $.getJSON(createApi("streams", channel_name), function(data) {
      var status;
      if (data.stream === null) {
        status = "Offline";
      } else if (data.stream === "undefined") {
        status = "Account does not exist!";
      } else {
        status = "Online";
      }
      $.getJSON(createApi("channels", channel_name), function(json) {
        var logo = json.logo;
        var icon;
        var link = json.url;
        if (status === "Offline") {
          icon = "/assets/sad-face.png";
        } else if (status === "Account does not exist!") {
          icon = "/assets/not-available.png";
        } else {
          icon = "/assets/happy-face.png";
        }
        $("#displayBox").append('<div class="display" <div class="row"> <div class="col-xs-4"> <img id="channel_logo" src=" '
        + logo + '" alt="no-image"/></div> <div class="col-xs-8"> <div class="channel"> <a id="link" href=" '
        + link + '" target="_blank"> '
        + channel_name + '</a> </div> <div class="status-box"> <p class="streaming-status"> '
        + status + '</p><img id=icon" src=" '
        + icon + ' "alt="icon"/> </div></div></div></div>');
      });
    });
  });
}

// show online channels
function showOnline(name, status) {
  $("#displayBox").empty();
  twitchUsers.forEach(function(channel_name) {
    $.getJSON(createApi("streams", channel_name), function(data) {
      var status;
      if (data.stream !== null) {
        status = "Online";
        $.getJSON(createApi("channels", channel_name), function(json) {
        
        var logo = json.logo;
        var icon = "/assets/happy-face.png";
        var link = json.url;
        $("#displayBox").append('<div class="display" <div class="row"> <div class="col-xs-4"> <img id="channel_logo" src=" '
        + logo + '" alt="no-image"/></div> <div class="col-xs-8"> <div class="channel"> <a id="link" href=" '
        + link + '" target="_blank"> '
        + channel_name + '</a> </div> <div class="status-box"> <p class="streaming-status"> '
        + status + '</p><img id=icon" src=" '
        + icon + ' "alt="icon"/> </div></div></div></div>');
        });
      }
    });
  });
}

// show offline channels
function showOffline(name, status) {
  $("#displayBox").empty();
  twitchUsers.forEach(function(channel_name) {
    $.getJSON(createApi("streams", channel_name), function(data) {
      var status;
      if (data.stream === null) {
        status = "Offline";
        $.getJSON(createApi("channels", channel_name), function(json) {
        
        var logo = json.logo;
        var icon = "/assets/sad-face.png";
        var link = json.url;
        $("#displayBox").append('<div class="display" <div class="row"> <div class="col-xs-4"> <img id="channel_logo" src=" '
        + logo + '" alt="no-image"/></div> <div class="col-xs-8"> <div class="channel"> <a id="link" href=" '
        + link + '" target="_blank"> '
        + channel_name + '</a> </div> <div class="status-box"> <p class="streaming-status"> '
        + status + '</p><img id=icon" src=" '
        + icon + ' "alt="icon"/> </div></div></div></div>');
        });
      }
    });
  });
}

// show searched users
$("#search-box").keypress(function(e) {
  $("#displayBox").empty();
  var keyVal = e.which;
  if (keyVal === 13) {
    if ($("#search-box").val() === "") {
      alert("Please enter a username to search.");
    } else {
      var keyword = $("#search-box").val();
      $.getJSON(createApi("channels", keyword), function(data) {
        var status;
        var keyword_logo = data.logo;
        if (data.status === 422 || data.status === 404) {
          status = "Not Found";
          var icon = "/assets/not-available.png";
          var logo = "/assets/generic-avatar.gif";
          var link = "#";
          $("#displayBox").append('<div class="display" <div class="row"> <div class="col-xs-4"> <img id="channel_logo" src=" '
          + logo + '" alt="no-image"/></div> <div class="col-xs-8"> <div class="channel"> <a id="link" href=" '
          + link + '" target="_blank"> '
          + keyword + '</a> </div> <div class="status-box"> <p class="streaming-status"> '
          + status + '</p><img id=icon" src=" '
          + icon + ' "alt="icon"/> </div></div></div></div>');
        } else {
          $.getJSON(createApi("streams", keyword), function(checkStatus) {
            var new_status;
            if (checkStatus.streams === null) {
              new_status = "Offline";
            } else if (checkStatus.streams === "undefined") {
              new_status = "Account does not exist or is closed.";
            } else {
              new_status = "Online";
            }
            
            if (new_status === "Offline") {
              icon = "/assets/sad-face.png";
            } else if (new_status === "Account does not exist!") {
              icon = "/assets/not-available.png";
            } else {
              icon = "/assets/happy-face.png";
            }
            $("#displayBox").append('<div class="display" <div class="row"> <div class="col-xs-4"> <img id="channel_logo" src=" '
            + keyword_logo + '" alt="no-image"/></div> <div class="col-xs-8"> <div class="channel"> <a id="link" href=" '
            + link + '" target="_blank"> '
            + keyword + '</a> </div> <div class="status-box"> <p class="streaming-status"> '
            + new_status + '</p><img id=icon" src=" '
            + icon + ' "alt="icon"/> </div></div></div></div>');
          });
        }
      });
    }
  }
});

$(document).ready(function() {
  showAll();
  $(".box").click(function() {
    $(".box").removeClass("active");
    $(this).addClass("active");
    var click_status = $(this).attr("id");
    $(".active-nav-name").html(click_status);
    if (click_status === "all") {
      showAll();
    } else if (click_status === "online") {
      showOnline();
    } else {
      showOffline();
    }
  });
});