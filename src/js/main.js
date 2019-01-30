function User(name, id, password, repeatPassword) {
  this.id = id();
  this.role = 'user';
  this.name = name;
  this.password = password;
}

User.prototype = {
  _headerUserName: document.querySelector('.header__user-name'), 
  _news: document.querySelector('.news'),
  _header: document.querySelector('.header'),
  _registration: document.querySelector('.registration'),
  _addNews: document.querySelector('.add-news'),
  _deleteNews: document.querySelector('.delete-news'),
  showNews: function() {
    this._news.classList.remove('js-none');
  },
  showName: function() {  
    this._headerUserName.classList.remove('js-none');
    this._headerUserName.innerHTML = signed['name'];    
  },
  showHeader: function() {
    this._header.classList.remove('js-none');
  },
  hide: function() {
    this._registration.classList.add('js-none');
  },
  logOut: function() {
    signed = 0;
    localStrg.removeItem('user');
    this._news.classList.add('js-none');
    this._registration.classList.remove('js-none');
    this._headerUserName.classList.add('js-none');
    this._header.classList.add('js-none');
  }
};

function Visitor(name, password, confirmPassword) {
  User.apply(this, arguments);
}

function Admin(name, password, confirmPassword) {
  User.apply(this, arguments);
  this.role = 'admin';
}

Visitor.prototype = Object.create(User.prototype);

Visitor.prototype.hide = function() {
  User.prototype.hide();
  this._addNews.classList.add('js-none');
  this._deleteNews.classList.add('js-none');  
};

Visitor.prototype.logOut = function() {
  User.prototype.logOut();
  this._addNews.classList.remove('js-none');
  this._deleteNews.classList.remove('js-none');
};

Admin.prototype = Object.create(User.prototype);
Admin.prototype.showName = function() {
  User.prototype.showName();
  this._headerUserName.classList.add('header__user-name--admin');
};

Admin.prototype.showHeader = function() {
  User.prototype.showHeader();
  this._addNews.classList.remove('js-none');
  this._deleteNews.classList.remove('js-none');
};

Admin.prototype.logOut = function() {
  User.prototype.logOut();  
  document.querySelector('.header__user-name--admin').classList.remove('header__user-name--admin');
};

var setId = counter();
var usersArray = [];
var signed;
var createObjForm = document.forms.createAccount;
var localStrg = window.localStorage;
var logOut = document.querySelector('.log-out');
var signIn = document.forms.signIn;

usersArray.push(new Visitor('Ronny', setId, '123', '123'));
usersArray.push(new Admin('Adam', setId, '123', '123'));

createObjForm.addEventListener('formIsValid', function() {
  if (
    createObjForm.elements.password.value === createObjForm.elements.confirmPassword.value) {
    if (createObjForm.elements.isAdmin.checked) {
      usersArray.push(new Admin(createObjForm.elements.firstName.value, setId, createObjForm.elements.password.value, createObjForm.elements.confirmPassword.value));
      logined(createObjForm.elements.firstName.value, createObjForm.elements.password.value);
    } else {
      usersArray.push(new Visitor(createObjForm.elements.firstName.value, setId, createObjForm.elements.password.value, createObjForm.elements.confirmPassword.value));
      logined(createObjForm.elements.firstName.value, createObjForm.elements.password.value);
    }
    console.log(usersArray);
  }
});

logOut.addEventListener('click', function() {
  signed.logOut();
});

signIn.addEventListener('formIsValid', function() {
  logined(signIn.elements.name.value, signIn.elements.password.value);
});

if (localStrg.user) {
  for (var i = 0; i < usersArray.length; i++) {
    if (usersArray[i]['name'] === localStrg.user) {        
      signed = usersArray[i];
      signed.showName();
      signed.showHeader();
      signed.showNews();
      signed.hide();     
    }
  }    
}  

function signedUser(checkName, checkPassword) {
  for (var i = 0; i < usersArray.length; i++) {    
    if (usersArray[i]['name'] == checkName && usersArray[i]['password'] == checkPassword) {      
      localStrg.setItem('user', checkName);
      signed = usersArray[i];
      signed.showName();
      signed.showHeader();
      signed.showNews();
      signed.hide();      
    }
  }
}

function counter() {
  var num = 0;

  return function() {
    return num++;
  };
}

function logined(x, y) {
  if (x && y) {
    signedUser(x, y);     
  }
}

