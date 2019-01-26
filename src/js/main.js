function signedUser(checkName, checkPassword) {
  for (var i = 0; i < usersArray.length; i++) {    
    if (usersArray[i]['name'] == checkName && usersArray[i]['password'] == checkPassword) {
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

function User(name, id, password, repeatPassword) {
  this.id = id();
  this.role = 'user';
  this.name = name;
  this.password = password;
}

User.prototype = {
  showNews: function() {
    document.querySelector('.news').classList.remove('js-none');
  },
  changePassword: function() {
    document.querySelector('.changePassword').classList.remove('js-none');
  },
  showName: function() {
    document.querySelector('.header__user-name').classList.remove('js-none');
    document.querySelector('.header__user-name').innerHTML = signed['name'];
  },
  showHeader: function() {
    document.querySelector('.header').classList.remove('js-none');
  },
  hide: function() {
    document.querySelector('.registration').classList.add('js-none');
  },
  logOut: function() {
    signed = 0;
    document.querySelector('.news').classList.add('js-none');
    document.querySelector('.registration').classList.remove('js-none');
    document.querySelector('.header__user-name').classList.add('js-none');
    document.querySelector('.header').classList.add('js-none');
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
  document.querySelector('.add-news').classList.add('js-none');
  document.querySelector('.delete-news').classList.add('js-none');
};

Visitor.prototype.logOut = function() {
  User.prototype.logOut();
  document.querySelector('.add-news').classList.remove('js-none');
  document.querySelector('.delete-news').classList.remove('js-none');
};

Admin.prototype = Object.create(User.prototype);
Admin.prototype.showName = function() {
  User.prototype.showName();
  document
    .querySelector('.header__user-name')
    .classList.add('header__user-name--admin');
};

Admin.prototype.showHeader = function() {
  User.prototype.showHeader();
  document.querySelector('.add-news').classList.remove('js-none');
  document.querySelector('.delete-news').classList.remove('js-none');
};

Admin.prototype.logOut = function() {
  User.prototype.logOut();
  document
    .querySelector('.header__user-name--admin')
    .classList.remove('header__user-name--admin');
};

var setId = counter();
var usersArray = [];
var signed;
var createObjForm = document.forms.createAccount;


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

var logOut = document.querySelector('.log-out');
logOut.addEventListener('click', function() {
  signed.logOut();
});

var signIn = document.forms.signIn;

signIn.addEventListener('formIsValid', function() {
  logined(signIn.elements.name.value, signIn.elements.password.value);
});

usersArray.push(new Visitor('Ronny', setId, '123', '123'));
usersArray.push(new Admin('Adam', setId, '123', '123'));
