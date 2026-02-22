



if (document.location.href.toLowerCase().includes("/temp/") || document.location.href.toLowerCase().includes("/private/") || document.location.href.toLowerCase().includes("/scratch/") || hasOwnProperty.call(window, "storyFormat")) {
  // Change this to the path where the HTML file is
  // located if you want to run this from inside Twine.



  //"setup.ImagePath+'
 //	 setup.Path = "";  // Running inside Twine application
  setup.Path = "E:/G/project/Demon/Demon/";  // Running inside Twine application
        //  setup.Path = "E:/Installed/Personal Id/New folder/utor/Client/Demon/";  // Running inside Twine application
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
      if (typeof Value == "string" || Value instanceof String) {
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
    case "Outdoor":
      event_num = variables().outdoor.count;
      obj = variables().outdoor;
      break;
    case "Club":
      event_num = variables().club.count;
      obj = variables().club;
      break;
    case "GatitaHome":
      event_num = variables().gatitaHome.count;
      obj = variables().gatitaHome;
      break;
    case "EllaHome":
    event_num = variables().ellaHome.count;
    obj = variables().ellaHome;
    break;
    case "CountrySide":
      event_num = variables().countrySide.count;
      obj = variables().countrySide;
      break;
    default:

  }
 
  eventCheck(obj, loc);

}




window.eventCheck = function (obj, loc) {
  
  console.log("I am Location - " + loc);

  var count = 0;
  var passageValue = null;
  var char_stats_arr = [];
  var event_stats_arr = [];
  var statsCheck = false;

  // Validate and print the object
  if (!obj || !obj.title || !Array.isArray(obj.title)) {
    // console.error("Invalid object or title array.");
    return;
  }

  // console.log("Object Titles:", obj.title);

  // Initialize character stats
  char_stats_arr = [
    variables().mc.stats.allure || 0,
    variables().mc.stats.dreamweaver || 0,
    variables().mc.stats.energy_drain || 0,
    variables().mc.stats.flame || 0,
    variables().mc.stats.intimidate || 0,
    variables().mc.stats.hellfire || 0,
    variables().mc.stats.loyal || 0,
    variables().mc.stats.alpha || 0,
    variables().mc.stats.soul || 0,
    variables().mc.stats.mana || 0,
    variables().mc.stats.software_up || 0
  ];

 

  for (var i = 0; i < obj.title.length; i++) {

    // console.log(`Index ${i}: Title = ${obj.title[i]}, Men_Freq = ${obj.men_freq[i]}`);
    if (obj.status[i]) {
      
    // console.log("Object Status :", obj.status[count]);
     
    event_stats_arr = [
        obj.allure[i] || 0,
        obj.dreamweaver[i] || 0,
        obj.energy_drain[i] || 0,
        obj.flame[i] || 0,
        obj.intimidate[i] || 0,
        obj.hellfire[i] || 0,
        obj.loyal[i] || 0,
        obj.alpha[i] || 0,
        obj.soul[i] || 0,
        obj.mana[i] || 0,
        obj.level[i] || 0
      ];

      

      if (variables().currentTime == obj.time[i] && variables().mc.avatar == obj.avatar[i]) {
        // console.log("Mc Arr: "+ char_stats_arr + "-- Obj Arr --" + event_stats_arr);
        statsCheck = char_stats_arr.every((charStat, index) => charStat >= event_stats_arr[index]);
        if (statsCheck) {
          passageValue = i;
        }
      }
    }
  }

  if (statsCheck) {
    if (obj.title[passageValue]) {

        obj.count += 1;
        obj.status[obj.count-1] = 0;
        // console.log("Navigating to passage: ", obj.title[passageValue]);
        Engine.play(obj.title[passageValue]);
    } else {
        // console.error("Invalid passage: ", obj.title[passageValue]);
        // Engine.play("FallbackPassage"); // Use a valid fallback passage here
         Engine.play(loc); // Use a valid fallback passage here
        
    }
} else {
    // console.log("Loc-2: " + loc);
    Engine.play(loc);
}

};





window.statsChange = function(points, activityType){

  
  const resultText = $('#result');
  // var pint = Math.floor(Math.random() * 10)+1;

  switch(activityType) {
      case "Update":
        variables().mc.stats.software_up += 1;
        variables().mc.stats.mana -= points; 
        variables().mc.stats.love -= points; 
        variables().mc.stats.lust -= points; 
        variables().message = "Avatar Updated: + 1" + " Love: -" + points + " Lust: -" + points + " Mana: -" + points;
      break;
      case "Money":
        console.log("Stamina == "+ points)
        variables().mc.stats.money += points;
        variables().message = "Charm: +2x" + points + " Stamina: -10";
        break;
        case "Knowledge":
          variables().mc.stats.knowledge += points;
        variables().message = "Knowledge: +2x" + points + " Stamina: -10";
       break;
      case "Stamina":
        // console.log ("Hello:"+" -- "+activityType + points)
        variables().mc.stats.stamina += points;
        variables().message = "Stamina: " + points ;
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
        case "dl":
          char = variables().dl;
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
        case "zp":
          char = variables().zp;
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
        case "vl":
          char = variables().vl;
            break;
        default:
          char = "";
      }
      // console.log("return fucntion" + char);
      return char;
  }


  window.charStatsChange = function(char, points, activityType){

    
    
    const obj = charObjReturn(char);
   
    console.log("Char Object=" +char.type + "- Activity" + activityType+ "- Points - "+ points)

    const resultText = $('#result');
    let point = Math.floor(Math.random() * 10)+1;

    // Human - Soul Essence  / Succubus - Irresistible Allure  / Hell hound - Intimidating Presence.
    if(activityType == "Men_Freq"){
      console.log("at--"+obj.type);
      obj.stats.men_freq += points;
      variables().mc.stats.money += points*2;
      if(obj.type == "Human"){
        variables().mc.stats.soul += points;
        variables().message = obj.name + "'s Love Desire +"+ points + ' '+ variables().mc.name + "'s Soul Essence: +" + points + " Charm: +2X"+ points; 
      }else if(obj.type == "Succubus"){
        console.log("points--"+activityType);
        variables().mc.stats.allure += points;
        variables().message = obj.name + "'s Love Desire +"+ points + ' '+ variables().mc.name + "'s Irresistible Allure: +" + points + " Charm: +2X"+ points; 
      }else{
        variables().mc.stats.intimidate += points;
        variables().message = obj.name + "'s Love Desire +"+ points + ' '+ variables().mc.name + "'s Intimidating Presence: +" + points + " Charm: +2X"+ points; 
      }
      
    }
    // Human - Infernal Flames  / Succubus - Dream Weaver / Hell hound -  Alpha’s Ferocity.
    else if(activityType == "Sex_Freq"){
      obj.stats.sex_freq += points;
      variables().mc.stats.knowledge += points*2;
      if(obj.type == "Human"){
        variables().mc.stats.flame += points;
        variables().message = obj.name + "'s Sex Desire +"+ points + ' '+ variables().mc.name + "'s Infernal Flames: +" + points + " Knowledge: +2X"+ points; 
      }else if(obj.type == "Succubus"){
        console.log("points--"+activityType);
        variables().mc.stats.dreamweaver += points;
        variables().message = obj.name + "'s Sex Desire +"+ points + ' '+ variables().mc.name + "'s Dream Weaver: +" + points + " Knowledge: +2X"+ points; 
      }else{
        variables().mc.stats.alpha += points;
        variables().message = obj.name + "'s Sex Desire +"+ points + ' '+ variables().mc.name + "'s Alpha’s Ferocity: +" + points + " Knowledge: +2X"+ points; 
      }
      
    }
    // Human - Loyal Gaurdian / Succubus - Energy Drain  / Hell hound - Hellfire Essence. 
    else if(activityType == "Dominant"){
      obj.stats.corruption += points;      
      variables().mc.stats.stamina += points*2;
      if(obj.type == "Human"){
        variables().mc.stats.loyal += points;
        variables().message = obj.name + "'s Corruption +"+ points + ' '+ variables().mc.name + "'s Loyal Gaurdian: +" + points + " Stamina: +2X"+ points; 
      }else if(obj.type == "Succubus"){
        console.log("points--"+activityType);
        variables().mc.stats.energy_drain += points;
        variables().message = obj.name + "'s Corruption +"+ points + ' '+ variables().mc.name + "'s Energy Drain: +" + points + " Stamina: +2X"+ points; 
      }else{
        variables().mc.stats.hellfire += points;
        variables().message = obj.name + "'s Corruption +"+ points + ' '+ variables().mc.name + "'s Hellfire Essence: +" + points + " Stamina: +2X"+ points;
      }

    }
    else if(activityType == "EB"){
      obj.stats.men_freq += points;
      variables().mc.stats.money += points;
      // console.log("Option 3 selected: Empathetic Bond increased."); 
      variables().message = "Charm: +" + points;  
    }
    else if(activityType == "MC"){
      
      // console.log("Option 3 selected: Moral Compass increased.");   
      obj.stats.sex_freq += points;
      variables().mc.stats.knowledge += points;
      variables().message = "Knowledge: +" + points;  
    }
    else if(activityType == "CR"){
      // console.log("Option 3 selected: Corruption increased.");   
      obj.stats.corruption += points;
      variables().mc.stats.stamina += points;
      variables().message = "Stamina: +" + points;  
    }
    else{
      obj.stats.level += points;
    } 
          
          resultText.html(variables().message);

}


// Function to handle the option selection
 window.handleOptionSelection = function(char, option) {

  //option = option.trim(); // Trim spaces
  
  // Hide the event_before div
  document.getElementById("event_before").style.display = "none";

  // Show the event_after div
  document.getElementById("event_after").style.display = "block";

  
      // Hide all option divs
      document.getElementById("opt1").style.display = "none";
      document.getElementById("opt2").style.display = "none";
      document.getElementById("opt3").style.display = "none";

      
  
      // Show the selected option div
      if (option == "EB") {
          document.getElementById("opt1").style.display = "block";
      } else if (option == "MC") {
          document.getElementById("opt2").style.display = "block";
      } else if (option == "CR") {
          document.getElementById("opt3").style.display = "block";
      }else{
        // console.log("Option="+option + typeof(option));
      }

  // Update the $mcOption variable (if using Twine/SugarCube)
  if (typeof setup == 'object' && setup.hasOwnProperty('setter')) {
      setup.setter(option);
  }
  
  // console.log("Extracted Option:", `"${option}"`, "Type:", typeof option);

    charStatsChange(char, 20, option);
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
}



window.loadScenes = function (scenes, containerId, scenesType, scenesCode) {
  
  console.log("scenes+ "+scenes);
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
          State.variables.activityType = State.variables.fuckScene[scenesCode][scenesType].scene_activity[index];
          State.variables.loc = State.variables.fuckScene[scenesCode][scenesType].scene_passage;
          State.variables.sceneCode = State.variables.fuckScene[scenesCode][scenesType].scene_code;
          State.variables.sceneType = State.variables.fuckScene[scenesCode][scenesType].scene_type;
          State.variables.activityVideo = State.variables.fuckScene[scenesCode][scenesType].scene_video[index];
          State.variables.sceneNumber = index;
          
         console.log("index"+index)

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

  console.log(scenes)
  // Ensure the container exists before proceeding
  const containerId = "scene-buttons";
  if (!document.getElementById(containerId)) {
      // console.error(`Container with ID "${containerId}" not found.`);
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

      // console.log('Scene Code = '+ variables().fuckScene[code][type].scene_character);
        
      $("#sceneVideo").attr("src", setup.ImagePath + variables().fuckScene[code][type].scene_video[number]);
      variables().taskDialogue = variables().fuckScene[code][type].scene_dialogue[number];
      // $("#sceneImage").attr("src", setup.ImagePath + variables().fuckScene[code][type].scene_image[number]);

      
    }

window.avatarSelect = function(avatar) {
  
   variables().mc.avatar = avatar;

  if(avatar == "hm"){
    
    variables().avatarImage = variables().mc.image;
    variables().mc.name = "Human"
    
  }else{

  variables().avatarImage = variables().avatar[avatar].image;
  variables().mc.name = variables().avatar[avatar].name;
  variables().mc.stats.mana -= variables().avatar[avatar].required.mana;
  

  console.log(variables().avatarImage);

  switch(avatar){
    case "ad":
    variables().mc.stats.dreamweaver -= variables().avatar[avatar].required.dreamweaver; 
    variables().mc.stats.energy_drain -= variables().avatar[avatar].required.energy_drain; 
      break;
    case "vt":
      console.log(avatar);
    variables().mc.stats.flame -= variables().avatar[avatar].required.flame; 
    variables().mc.stats.alpha -= variables().avatar[avatar].required.alpha; 

  }

}
  
};


window.loadLocationSex = function (scenes, containerId, scenesType, scenesCode){
  
  const container = document.getElementById(containerId);
  container.innerHTML = ""; // Clear previous content
  
  // const alert =  document.getElementById("sex-scenes");
  // alert.innerHTML = ""; // Clear previous content
  
  // console.log("Location: " + scenesType);

  Object.keys(scenes).forEach(function(key, index){

    
    if(State.variables.currentTime == scenes[key].event_time && scenes[key].location == scenesType){
    
      let char = charObjReturn(scenes[key].shortcode);
    
    if(State.variables.eventCount >= scenes[key].event_fuck){
      
    
      // console.log("char:", char);

      const button = document.createElement("button");
      const lineBreak = document.createElement("br");
      button.textContent = `${scenes[key].btn +" "+ char.name}`;
      button.dataset.sceneIndex = index;

            button.onclick = () => {        
              
              // Set relevant variables in SugarCube
          State.variables.sceneObject = scenes[key];
          State.variables.charObject = char; 
          State.variables.sceneImage = scenes[key].image;
          State.variables.loc =  scenes[key].location;

          Engine.play("Fuck_Event");
          
            }

            
            container.appendChild(button);

    // Add a line break after the button
     
            container.appendChild(lineBreak);

    }else{

      const newParagraph = document.createElement("p"); // Create <p> element
      
      // newParagraph.classList.add("notation_text"); // Add class

      newParagraph.innerText = "** Sex scenes available with " + char.name+ " complete Event: "+scenes[key].event_fuck+" **"; // Set text content

      container.appendChild(newParagraph); // Append it to the document body
    
    }
  }
    

  });


}


window.setupLocationSexButtons= function(scenesType, scenesCode) {
  
  console.log("scenesType+ "+scenesType +" scenesCode+ "+scenesCode);
  
  const scenes = State.variables.fuckEvent;
  
  console.log("scenes+ "+scenes);

  // Ensure the container exists before proceeding
  const containerId = "loc-buttons";
 
  if (!document.getElementById(containerId)) {
    console.error(`Container with ID "${containerId}" not found.`);
    return;
  }

  // Load scene buttons
  loadLocationSex(scenes, containerId, scenesType, scenesCode);

};



let points = 20;
let countdown;


window.startCountdown = function () {
    let element = document.getElementById("point");
    if (!element) {
        console.error("Element #point not found!");
        return;
    }

     points = parseInt(element.innerText, 10) || 100;

    // Clear any existing interval before starting a new one
    clearInterval(countdown);

    countdown = setInterval(() => {
        if (points <= 0) {
            clearInterval(countdown);
            console.log("Countdown ended.");
            return;
        }
        points--;
        element.innerText = points;
    }, 100);
};

window.stopCountDown = function(activityType){


  clearInterval(countdown);

  statsChange(points,activityType);


  document.getElementById("stop-button").style.display = "none";
  document.getElementById("random-button").style.display = "none";

   points = 20;
}

window.statsChangeRandom = function(type,gameType,char){



  let pnt = Math.floor(Math.random() * 5)+1;
  
  if(gameType == "Char")
    {
     charStatsChange(char,pnt,type);
    }
    else{
      
      statsChange(pnt,type);
   }
  // document.getElementById("point").innerText = points;

}

window.startGame = function () {
 
  // if (!isMoving) {
  //     isMoving = true;
  //     timer = setInterval(moveCursor, 10);
  // }

  // console.log("Help:"+variables().activityVideo)

  $("#activityImage").attr("src", setup.ImagePath + variables().activityImage);
  $("#activityVideo").attr("src", setup.ImagePath + variables().activityVideo);
}

window.stopGame = function (activityType, gameType, char) {

    

     if(gameType == "Char")
     {
     
      charStatsChange(char,points,activityType);
     }
     else{
       statsChange(points,activityType);
    }

    stopCountDown(activityType);
      
  // }
}

window.stopTask = function (activityType) {

    statsChange(10,activityType)

  Engine.play('Home');
}

