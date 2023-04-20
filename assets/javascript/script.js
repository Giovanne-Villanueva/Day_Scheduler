// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {
  
  

  var date=$('#currentDay')
  var container = $('#container')
  var tasks = []
  
  tasks.push($('#hour-7'))
  tasks.push($('#hour-8'))
  tasks.push($('#hour-9'))
  tasks.push($('#hour-10'))
  tasks.push($('#hour-11'))
  tasks.push($('#hour-12'))
  tasks.push($('#hour-1'))
  tasks.push($('#hour-2'))
  tasks.push($('#hour-3'))
  tasks.push($('#hour-4'))
  tasks.push($('#hour-5'))
  tasks.push($('#hour-6'))
  
  var save = $('#save')
  
  // TODO: Add code to display the current date in the header of the page.
  function getTime(){
    date.text(dayjs().format('dddd, MMMM D '))
  }
  
  function saveTask(){
    save.text("Saved Task to Local Storage Successfully")
  }
  
  function failedTask(){
    save.text("An Error Ocurred and we were not able to save your task to Local Storage")
  }
  
  //Here we will update the state of each time block and the date at an interval of 1 minute
  timeInterval= setInterval(function(){
    getTime()
    state()
  }, (1000 * 60));
  
  // Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  function buttonHandler (event){
    event.preventDefault();
    var element= $(event.target);
    var project= element.children().eq(1).val()
    if(project === ""){
      failedTask()
      return
    }

    else{
      //console.log(element.attr('id'))
      //console.log(element.children().eq(1).val())

      localStorage.setItem(element.attr('id'), JSON.stringify(project))
      saveTask()
    }
  }

  function clearText(event){
    var element = $(event.target);
    var textArea = (element.siblings(".description"));
    textArea.replaceWith("<textarea class=\"col-7 col-md-9 description\" rows=\"3\"> </textarea>");

    //console.log(textArea.val())
    var attribute= element.parent().attr('id');
    localStorage.removeItem(attribute);
  }
  
  container.on("submit", ".time-block", buttonHandler)
  container.on("click", ".resetBtn", clearText)
  
  // Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  function state(){
    var update=""
    var hour=7
    
    console.log(container.attr("class"))
    for(var i =0; i <12; i++){
      update=container.children().eq(i).attr("class")
      var currentTime=dayjs().format('H');
      
      //remove the current attribute
      if(update.includes("past")){
        container.children().eq(i).removeClass("past")
      }
      else if(update.includes("future")){
        container.children().eq(i).removeClass("future")
      }
      else{
        container.children().eq(i).removeClass("present")
      }
      
      //Present
      if( Number(currentTime) === hour){
        container.children().eq(i).addClass("present");
      }
      //Future
      else if(Number(currentTime) < hour){
        container.children().eq(i).addClass("future")
      }
      //Past
      else{
        container.children().eq(i).addClass("past")
      }
      hour++;
    }
  } 
  
  // Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  function savedData(){
   
    for(var i =0; i < 12; i++){
      var savedInfo = JSON.parse( localStorage.getItem((tasks[i]).attr('id') ))
      if(savedInfo !== null){
        //We will update text area
        tasks[i].children().eq(1).text(savedInfo)
      }
    }
  }

  //inital calls to functions to set inital state, date, and display saved tasks we had previously
  savedData()
  state()
  getTime()
});
