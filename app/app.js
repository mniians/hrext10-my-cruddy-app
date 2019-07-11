/*

 ### Basic Reqs
- [ ] Where to store data? (localstorage)
- [ ] How to modify data? (update action, delete action)

*/
//My app's functions
// var height = $('.height-input').val();
// var weight = $('.weight-input').val();
// var points = $('.points-input').val();
// var rebounds = $('.rebounds-input').val();
// var assists = $('.assists-input').val();
// var steals = $('.steals-input').val();

// var stats = {
//   height: height,
//   weight: weight,
//   PPG: points,
//   RPG: rebounds,
//   APG: assists,
//   SPG: steals
// }

//localStorage functions
var createItem = function(key, value) {
  return window.localStorage.setItem(key, value);
}

var updateItem = function(key, value) {
  return window.localStorage.setItem(key, value);
}

var deleteItem = function(key) {
  return window.localStorage.removeItem(key);
}

var clearDatabase = function() {
  return window.localStorage.clear();
}

var statsContents = function(statObj) {
  
}

var showDatabaseContents = function() {
  $('tbody').html('');

  for (var i = 0; i < window.localStorage.length; i++) {
    var key = window.localStorage.key(i);
    var statObj = JSON.parse(window.localStorage.getItem(key))
    $('tbody').append(`<tr><td>${key}</td><td>${statObj.height}</td><td>${statObj.weight}</td><td>${statObj.PPG}</td><td>${statObj.RPG}</td><td>${statObj.APG}</td><td>${statObj.SPG}</td><td><button class="table-delete">Delete</button></td></tr>`);
  }
}

var keyExists = function(key) {
  return window.localStorage.getItem(key) !== null
}

var getKeyInput = function() {
  return $('.key').val();
}

var getValueInput = function() {
  //return $('.height-input').val();
  var height = $('.height-input').val();
  var weight = parseInt($('.weight-input').val());
  var points = parseInt($('.points-input').val());
  var rebounds = parseInt($('.rebounds-input').val());
  var assists = parseInt($('.assists-input').val());
  var steals = parseInt($('.steals-input').val());

  var stats = {height: height, weight: weight, PPG: points, RPG: rebounds, APG: assists, SPG: steals}

 return JSON.stringify(stats);
}

var changeStatObj = function() {

}

var resetInputs = function() {
  $('.key').val('');
  $('.height-input').val('');
  $('.weight-input').val('');
  $('.points-input').val('');
  $('.rebounds-input').val('');
  $('.assists-input').val('');
  $('.steals-input').val('');
}

$(document).ready(function() {
  showDatabaseContents();
  $('.create').click(function() {
    if (getKeyInput() !== '' && getValueInput() !== '') {
      if (keyExists(getKeyInput())) {
        if(confirm('key already exists in database, do you want to update instead?')) {
          updateItem(getKeyInput(), getValueInput());
          showDatabaseContents();
        }
      } else {
        createItem(getKeyInput(), getValueInput());
        showDatabaseContents();
        resetInputs();
      }
    } else  {
      alert('key and value must not be blank');
    }
  });

  $('.update').click(function() {
    if (getKeyInput() !== '' && getValueInput() !== '') {
      if (keyExists(getKeyInput())) {
        updateItem(getKeyInput(), getValueInput());
        showDatabaseContents();
        resetInputs();
      } else {
        alert('key does not exist in database');
      }
    } else {
      alert('key and value must not be blank');
    }
  });

  $('.delete').click(function() {
     if (getKeyInput() !== '') {
      if (keyExists(getKeyInput())) {
        deleteItem(getKeyInput());
        showDatabaseContents();
        resetInputs();
      } else {
        alert('key does not exist in database');
      }
    } else {
      alert('key must not be blank');
    }
  });

  $('.reset').click(function() {
    resetInputs();
  })

  $('.clear').click(function() {
    if (confirm('WARNING: Are you sure you want to clear the database? \n                THIS ACTION CANNOT BE UNDONE')) {
      clearDatabase();
      showDatabaseContents();
    }
  });

  $('tbody').on('click', 'button', function() { 
    deleteItem(event.path[2].children[0].innerText);
    showDatabaseContents();
  });
})