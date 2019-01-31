function User() {}

User.prototype = {
  _headerUserName: document.querySelector('.header__user-name'), 
  _news: document.querySelector('.news'),
  _header: document.querySelector('.header'),
  _registration: document.querySelector('.registration'),
  _addNews: document.querySelector('.add-news'),
  _deleteNews: document.querySelector('.delete-news'),
  createUser: function(name, id, password) {
    this.id = id();
    this.role = 'user';
    this.name = name;
    this.password = password;
  },
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
    localStorage.removeItem('user');
    this._news.classList.add('js-none');
    this._registration.classList.remove('js-none');
    this._headerUserName.classList.add('js-none');
    this._header.classList.add('js-none');
  },
  clearForms: function() {
    document.querySelectorAll('.js-validation__form').forEach(function(elem) {
      elem.reset();
    });
  }  
};

function Visitor(name, id, password, confirmPassword) {
  User.prototype.createUser.apply(this, arguments);
}

function Admin(name, id, password, confirmPassword) {
  User.prototype.createUser.apply(this, arguments);
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
var createUserForm = document.forms.createAccount;
var localStorage = window.localStorage;
var logOutBtn = document.querySelector('.log-out');
var signInForm = document.forms.signIn;

usersArray.push(new Visitor('Ronny', setId, '123', '123'));
usersArray.push(new Admin('Adam', setId, '123', '123'));

createUserForm.addEventListener('formIsValid', function() {
  if (createUserForm.elements.password.value === createUserForm.elements.confirmPassword.value) {
    console.log(createUserForm.elements.confirmPassword.value)
    if (createUserForm.elements.isAdmin.checked) {
      usersArray.push(new Admin(createUserForm.elements.firstName.value, setId, createUserForm.elements.password.value, createUserForm.elements.confirmPassword.value));
      signedUser(createUserForm.elements.firstName.value, createUserForm.elements.password.value);
    } else {
      usersArray.push(new Visitor(createUserForm.elements.firstName.value, setId, createUserForm.elements.password.value, createUserForm.elements.confirmPassword.value));
      signedUser(createUserForm.elements.firstName.value, createUserForm.elements.password.value);
    }
    console.log(usersArray);
  }
});

logOutBtn.addEventListener('click', function() {  
  signed.clearForms();
  signed.logOut();        
});

signInForm.addEventListener('formIsValid', function() {
  signedUser(signIn.elements.name.value, signIn.elements.password.value);
});

if (localStorage.user) {
  for (var i = 0; i < usersArray.length; i++) {
    if (usersArray[i]['name'] === localStorage.user) {        
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
    if (usersArray[i]['name'] === checkName && usersArray[i]['password'] === checkPassword) {      
      localStorage.setItem('user', checkName);
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



