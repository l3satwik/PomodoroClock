var main = function(){
  var breakvalue;
  var sessionvalue;
  var audio = new Audio('http://scambuster.info/audio/time_up.wav');
  var clock;
  var check = 1;

  breakvalue = parseInt($("#breakvalue").html() * 60);
  sessionvalue = parseInt($("#sessionvalue").html() * 60);

//Used FlipClock.js from http://flipclockjs.com/
  clock = $('.clock').FlipClock(sessionvalue, {
    clockFace: "MinuteCounter",
    autoStart: false,
    countdown: true,
    callbacks: {
      start: function() {
        $(".worktimelabel").addClass("text-success");
      },

      stop: function() {
        $(".worktimelabel").removeClass("text-success");
      },

      interval: function() {
        var time = clock.getTime().time;
        if (time === 0) {
          audio.play();
          if(check == 1)
          {
            clock.setTime(parseInt($("#breakvalue").html() * 60));
            check = check * -1;
          }
          else {
            clock.setTime(parseInt($("#sessionvalue").html() * 60));
            check = check * -1;
          }
          clock.start();
        }
      }
    }
  });

//Control buttons
  $("#onswitch").click(function() {
    clock.setTime(parseInt($("#sessionvalue").html() * 60));
    audio.play();
    clock.start();
  });

  $("#offswitch").click(function() {
    clock.stop();
  });

  $("#resetswitch").click(function() {
      clock.setTime(parseInt($("#sessionvalue").html() * 60));
      clock.start();
      audio.play();
    });

//Break length
  $("#addbreak").click(function(){
    breakvalue = parseInt($("#breakvalue").html());
    $("#breakvalue").html(breakvalue+1);
  });

  $("#removebreak").click(function(){
    breakvalue = parseInt($("#breakvalue").html());
    $("#breakvalue").html(breakvalue-1);
    if (breakvalue === 1) {
      $("#breakvalue").html(1);
    }
  });

//Work length
  $("#addsession").click(function(){
    sessionvalue = parseInt($("#sessionvalue").html());
    $("#sessionvalue").html(sessionvalue+1);
    clock.setTime(parseInt($("#sessionvalue").html()) * 60);
  });

  $("#removesession").click(function(){
    sessionvalue = parseInt($("#sessionvalue").html());
    $("#sessionvalue").html(sessionvalue-1);
    if (sessionvalue === 1) {
      $("#sessionvalue").html(1);
    }
    clock.setTime(parseInt($("#sessionvalue").html()) * 60);
  });

}

$(document).ready(main);
