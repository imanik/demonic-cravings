



if (document.location.href.toLowerCase().includes("/temp/") || document.location.href.toLowerCase().includes("/private/") || document.location.href.toLowerCase().includes("/scratch/") || hasOwnProperty.call(window, "storyFormat")) {
  // Change this to the path where the HTML file is
  // located if you want to run this from inside Twine.



  //"setup.ImagePath+'
 	// setup.Path = "";  // Running inside Twine application
 // setup.Path = "D:/neuro-tw/";  // Running inside Twine application
          setup.Path = "E:/G/project/Demon/Demon/";  // Running inside Twine application
} else {
  setup.Path = "";  // Running in a browser
}
setup.ImagePath = setup.Path + "pic/";
setup.SoundPath = setup.Path + "sounds/";






window.setup = window.setup || {};




Macro.add('ScrollTo', {
  skipArgs: false,
  handler: function () {
    if (this.args.length > 0) {
      var Value = this.args[0];
      if (typeof Value === "string" || Value instanceof String) {
        var element = null, params = undefined;
        if (this.args.length > 1) {
          params = this.args[1];
        }
        // wait for element
        var elementWaitID = setInterval(function () {
          element = document.getElementById(Value);
          if (element != null) {
            // stop waiting and set scroll position
            clearInterval(elementWaitID);
            if (params != undefined) {
              element.scrollIntoView(params);
            } else {
              element.scrollIntoView();
            }
          }
        }, 100);
      }
    }
  }
});


// Game Function

window.forwardTime = function (time) {


  if (variables().currentTime < variables().dayTimes.length - 1) {
   // variables().currentTime += 0;
     variables().currentTime += time;
  }
  else {

    forwardDay();

  }

}




window.forwardDay = function(){

  if(variables().mc.stats.energy <=0 ){
    variables().mc.stats.energy = 0;
}


  
    if(variables().currentDay < variables().weekDays.length-1 ){
    variables().currentDay += 1;
    }
    else{
    variables().currentDay = 0;
   
    }

    variables().mc.stats.stamina +=30;

    variables().currentTime = 0;
    variables().kitchenClean = 0;
    variables().poolClean = 0;
    variables().roomClean = 0;
    variables().livingClean = 0;
    variables().exercise = 0;
    variables().swimming = 0;
    variables().laundry = 0;
    variables().shower = 0;
    variables().watchTV = 0;

    variables().message = "Stamina: +30";
    Engine.play("Home");
  
  }



window.locEventCheck = function (loc) {

console.log("Location --"+loc)
  var obj;
  var char;
  var ch;
  var event_num;

  switch (loc) {
    case "Kitchen":
      event_num = variables().kitchen.count;
      obj = variables().kitchen;
      break;
    case "Living":
      event_num = variables().living.count;
      obj = variables().living;
      break;
    case "MyRoom":
      event_num = variables().myroom.count;
      obj = variables().myroom;
      break;
    case "Bedroom":
      event_num = variables().bedroom.count;
      obj = variables().bedroom;
      break;
    case "Bathroom":
      event_num = variables().bathroom.count;
      obj = variables().bathroom;
      break;
    case "College":
      event_num = variables().college.count;
      obj = variables().college;
      break;
    case "Sisterroom":
      event_num = variables().sisterroom.count;
      obj = variables().sisterroom;
      break;
    case "Elhouse":
      event_num = variables().elhouse.count;
      obj = variables().elhouse;
      break;
    default:

  }

 
  console.log("Title -- "+obj.char);
  console.log("Number -- "+event_num);
 
 if(event_num >= obj.char.length){
  ch =  obj.char[obj.char.length-1];;
  console.log("Length -- "+obj.char.length);
 }else{
   ch = obj.char[event_num];
 }
 
 
char = charObjReturn(ch);
  
console.log("Ch -- "+ch);


console.log(char.shortcode+"----" + obj)

  eventCheck(obj, loc, char);

}


window.eventCheck = function (obj, loc, char) {
  console.log("I am Location - " + loc);

  var count = 0;
  var passageValue = null;
  var char_stats_arr = [];
  var event_stats_arr = [];
  var statsCheck = false;

  // Validate and print the object
  if (!obj || !obj.title || !Array.isArray(obj.title)) {
    console.error("Invalid object or title array.");
    return;
  }

  console.log("Object Titles:", obj.title);

  // Initialize character stats
  char_stats_arr = [
    char.stats.men_freq || 0,
    char.stats.sex_freq || 0,
    char.stats.lust || 0,
    char.stats.love || 0,
    variables().mc.stats.mana || 0,
    variables().mc.stats.software_up || 0
  ];

  for (var i = 0; i < obj.title.length; i++) {
    console.log(`Index ${i}: Title = ${obj.title[i]}, Men_Freq = ${obj.men_freq[i]}`);
    if (obj.status[i]) {
      event_stats_arr = [
        obj.men_freq[i] || 0,
        obj.sex_freq[i] || 0,
        obj.lust[i] || 0,
        obj.love[i] || 0,
        obj.mana[i] || 0,
        obj.level[i] || 0
      ];

      if (variables().currentTime === obj.time[i]) {
        statsCheck = char_stats_arr.every((charStat, index) => charStat >= event_stats_arr[index]);
        if (statsCheck) {
          passageValue = i;
        }
      }
    }
  }

  if (statsCheck) {
    if (obj.title[passageValue]) {
        console.log("Navigating to passage: ", obj.title[passageValue]);
        Engine.play(obj.title[passageValue]);
    } else {
        console.error("Invalid passage: ", obj.title[passageValue]);
        // Engine.play("FallbackPassage"); // Use a valid fallback passage here
         Engine.play(loc); // Use a valid fallback passage here
        
    }
} else {
    console.log("Loc-2: " + loc);
    Engine.play(loc);
}

};


window.statsChangeRandom = function(){

  var point = Math.floor(Math.random() * 10)+1;
  var activityType = variables().activityType;
  
  statsChange(point, activityType);

}


window.statsChange = function(points, activityType){
  const resultText = $('#result');
  var pint = Math.floor(Math.random() * 10)+1;

  switch(activityType) {
      case "Update":
        variables().mc.stats.software_up += 1;
        variables().mc.stats.mana -= points; 
        variables().mc.stats.love -= points; 
        variables().mc.stats.lust -= points; 
        variables().message = "Avatar Updated: + 1" + " Love: -" + points + " Lust: -" + points + " Mana: -" + points;
      break;
      case "Money":
        variables().mc.stats.money += points;
        variables().message = "Charm: +" + points;
       break;
      case "Knowledge":
        variables().mc.stats.knowledge += points;
        variables().message = "Knowledge: +" + points ;
       break;
      case "Stamina":
        variables().mc.stats.stamina += points;
        variables().message = "Stamina: +" + points ;
       break;
       case "Mana":
        variables().mc.stats.mana += points;
        variables().message = "Mana: " + points ;
       break;
       case "Energy":
        variables().mc.stats.mana += points;
        variables().mc.stats.knowledge -= points;
        variables().mc.stats.money -=   points;
        variables().mc.stats.stamina -= points;
        variables().message = "Mana: " + points + " Knowledge: -" + points + " Stamina: -" + points + " Charm: -" + points;
       break;
    default:
        variables().mc.stats.strength += 0;
  }

  resultText.html(variables().message);
  
}


  window.charObjReturn = function(ch){

          
    var char = [];

      switch (ch) {
        case "ep":
          char = variables().ep;
          break;
        case "mp":
          char = variables().mp;
          break;
        case "cp":
          char = variables().cp;
          break;
        case "up":
          char = variables().up;
          break;
        case "mc":
          char = variables().mc;
          break;
        case "ap":
          char = variables().ap;
          break;
        case "mr":
          char = variables().mr;
            break;
        case "ed":
          char = variables().ed;
            break;
        case "ct":
          char = variables().ct;
            break;
        case "gp":
          char = variables().gp;
            break;
        case "dp":
          char = variables().dp;
            break;
        default:
          char = "";
      }
      console.log("return fucntion" + char);
      return char;
  }


  window.charStatsChangeRandom = function(){

    var point = Math.floor(Math.random() * 10)+1;
    var activityType = variables().activityType;
    var char = variables().char;

//  console.log("Char-Activity "+char + "="+activityType)
    charStatsChange(char, point, activityType);
  
  }

  window.charStatsChange = function(char, points, activityType){


    const obj = charObjReturn(char);

    console.log("Char Object=" +char + "- Activity" + activityType)
    const resultText = $('#result');
    var point = Math.floor(Math.random() * 10)+1;

    if(activityType == "Men_Freq"){
      obj.stats.men_freq += points;
      variables().mc.stats.love += points*2;
      variables().mc.stats.knowledge += 2;
      variables().mc.stats.money += points*2;
      variables().message = obj.name + "'s Love Desire: +" + points*2 +" Love: +" + points*2 +  " Charm: +" + points*2 + " Knowledge: +"+ points*2 ; 

    }
    else if(activityType == "Sex_Freq"){

      obj.stats.sex_freq += points;
      variables().mc.stats.lust+= points;
      variables().mc.stats.stamina += points*2;
      variables().mc.stats.money += points*2;
      variables().message =  obj.name + "'s Sex Desire: +" + points*2 +" Lust: +" + points*2 + " Charm: +" + points*2 + " Stamina: +"+ points*2;

    }
    else if(activityType == "Love"){
    
      obj.stats.love += points;
    }
    else if(activityType == "Lust"){
      obj.stats.lust += points;
    }
    else{
      obj.stats.level += points;
    } 
          
          resultText.html(variables().message);
        }

      

// Mini Game Function



//const bar = document.querySelector('');

const stopButton = $('#stop-button');



let cursorPosition = 0;
let isMoving = false;
let timer;
let totalPoints = 0;

window.moveCursor = function () {
  const cursor = $('.cursor');
  const bar = $('.bar');
  cursorPosition += 5;
  cursor.css('left', cursorPosition + 'px');

  if (cursorPosition >= bar.width()) {
      cursorPosition = 0;
  }
}

window.calculatePoints = function() {
  const barWidth  = $('.bar').width();
  const segmentWidth = barWidth / 5; // 5 segments
  // Calculate points based on cursor position (you can adjust this logic)
 // const points = Math.floor((cursorPosition / bar.clientWidth) * 100);
      const cursorLeft = parseInt($('.cursor').css('left')); // Get the left position of the cursor
    const segmentIndex = Math.floor(cursorLeft / segmentWidth); // Calculate the segment index

    // Define the points for each segment
    const segmentPoints = [10, 0, 2, 5, 0];
   // const moneyPoints =   [20, 0, 5, 10, 0];

    console.log("Points = "+ segmentPoints);

     // Check if segmentIndex is not a number (NaN) or is undefined, and return 0 in that case
     if (isNaN(segmentIndex) || typeof segmentIndex === 'undefined') {
      segmentIndex =  0;
  }

  //  variables().mc.stats.money += segmentPoints[segmentIndex];
    return segmentPoints[segmentIndex];
 
 // return points;



}



window.startGame = function () {
 
    if (!isMoving) {
        isMoving = true;
        timer = setInterval(moveCursor, 10);
    }

    $("#activityImage").attr("src", setup.ImagePath + variables().activityImage);
    $("#activityVideo").attr("src", setup.ImagePath + variables().activityVideo);
}

window.stopGame = function (activityType, gameType, char) {

  console.log("Stop Game")
  
    if (isMoving) {
        isMoving = false;
        clearInterval(timer);

        const points = calculatePoints();
        totalPoints += points;

        console.log("Activity Type: "+ activityType + gameType + char);

       if(gameType == "Char")
       {
        charStatsChange(char,points,activityType);
       }
       else{
         statsChange(points,activityType);
      }

        
    }
}

window.stopTask = function (activityType) {
  
      statsChange(10,activityType)

    Engine.play('Home');
}






window.loadScenes = function (scenes, containerId, scenesType, scenesCode) {
  const container = document.getElementById(containerId);
  container.innerHTML = ""; // Clear previous content
  // Loop through scenes and create buttons
  scenes.scene_title.forEach((title, index) => {
   
      const button = document.createElement("button");
      const lineBreak = document.createElement("br");
      button.textContent = `${title} (-10 Mana)`;
      button.dataset.sceneIndex = index;

      button.onclick = () => {
          // Set relevant variables in SugarCube
          State.variables.mediaType = 'video';
          State.variables.char = State.variables.fuckScene[scenesCode][scenesType].scene_character;
          State.variables.activityType = State.variables.fuckScene[scenesCode][scenesType].scene_activity;
          State.variables.loc = State.variables.fuckScene[scenesCode][scenesType].scene_passage;
          State.variables.sceneCode = State.variables.fuckScene[scenesCode][scenesType].scene_code;
          State.variables.sceneType = State.variables.fuckScene[scenesCode][scenesType].scene_type;
          State.variables.sceneNumber = index;

          // Navigate to SceneGame passage
          Engine.play("SceneGame");
      };


      container.appendChild(button);

      // Add a line break after the button
       
      container.appendChild(lineBreak);

  });
}


// Automatically run when the passage is loaded
 window.setupSceneButtons= function(scenesType, scenesCode) {
  console.log("scenesType+ "+scenesType +" scenesCode+ "+scenesCode);
  const scenes = State.variables.fuckScene[scenesCode][scenesType];

  console.log("scenes+ "+scenes);

  // Ensure the container exists before proceeding
  const containerId = "scene-buttons";
  if (!document.getElementById(containerId)) {
      console.error(`Container with ID "${containerId}" not found.`);
      return;
  }

  // Load scene buttons
  loadScenes(scenes, containerId, scenesType, scenesCode);
}


window.sceneLoad = function (code,number,type) {
 
  if (!isMoving) {
      isMoving = true;
      timer = setInterval(moveCursor, 10);
  }

  console.log('Scene Code = '+ variables().fuckScene[code][type].scene_character);


        
      $("#sceneVideo").attr("src", setup.ImagePath + variables().fuckScene[code][type].scene_video[number]);
      variables().taskDialogue = variables().fuckScene[code][type].scene_dialogue[number];
      // $("#sceneImage").attr("src", setup.ImagePath + variables().fuckScene[code][type].scene_image[number]);

  
}






