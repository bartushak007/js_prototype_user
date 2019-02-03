function Form() {}

Form.prototype = {
  _forms: document.querySelector('.forms'),
  _form: null,
  createForm: function(method, action, className) {    
    var form = document.createElement('form');
    form.classList.add('form');

    if(className) {
      form.classList.add(className);
    }

    if(method) { 
    form.method = method;
    }

    if(action) {
    form.action = action;
    }

    this._forms.appendChild(form);
    this._form = form;  
  },
  createBtn: function(className) {
    var btn = document.createElement('input');

    if(className) {
      btn.classList.add(className);
    }

    btn.type = 'submit';
    btn.value = 'Submit';
    this._form.appendChild(btn);
  },
  createLogin: function(name, id) {
    var login = document.createElement('input');
    login.classList.add('input');
    login.type = 'text';
    login.name = name;
    login.id = id;
    this._form.appendChild(login);
  },
  createLabel: function(forId, text, className) {
    var label = document.createElement('label');

    if(className) {
      label.classList.add(className);
    }

    label.setAttribute('for',forId);
    label.innerText = text + ':';
    this._form.appendChild(label);
  },
  createPassword: function(name, id, className) {
    var password = document.createElement('input');

    if(className) {
      password.classList.add(className);
    }

    password.name = name;
    password.id = id;
    password.type = 'password';
    this._form.appendChild(password);
  },
  createBr: function() {
    var br = document.createElement('br');
    br.classList.add('input');    
    this._form.appendChild(br);
  }
}

function SignIn() {}

SignIn.prototype = Object.create(Form.prototype);
SignIn.prototype.createTitle = function(className) {
    var title = document.createElement('h2');

    if(className) {
      title.classList.add(className);
    }

    title.innerText = 'Sign In';
    this._form.appendChild(title);
  };




function SignUp() {}

SignUp.prototype = Object.create(Form.prototype);
SignUp.prototype.createTitle = function(className) {
  var title = document.createElement('h2');

  if(className) {
    title.classList.add(className);
  } 

  title.innerText = 'Sign Up';
  this._form.appendChild(title);
};
SignUp.prototype.createConfirmPassword = function(name, id, className) {
  var confirmPassword = document.createElement('input');

  if(className) {
    confirmPassword.classList.add(className);
  } 

  confirmPassword.type = 'password';
  confirmPassword.name = name;
  confirmPassword.id = id;    
  this._form.appendChild(confirmPassword);
};
SignUp.prototype.createEmail = function(name, id, className) {
  var email = document.createElement('input');

  if(className) {
    email.classList.add(className);
  }

  email.type = 'email'; 
  email.name = name;
  email.id = id;   
  this._form.appendChild(email);
};


var signIn = new SignIn();
signIn.createForm('', '', 'form');
signIn.createTitle('title');
signIn.createLabel('name', 'Type your first name', 'label');
signIn.createLogin('name','name');
signIn.createBr();
signIn.createLabel('password', 'Type your password', 'label');
signIn.createPassword('password', 'password');
signIn.createBr();
signIn.createBtn('btn');


var signUp = new SignUp();
signUp.createForm('', '', 'form');
signUp.createTitle('title');
signUp.createLabel('signUpName', 'Type your first name', 'label');
signUp.createLogin('name','signUpName');
signUp.createBr();
signUp.createLabel('signUpPassword', 'Type your password', 'label');
signUp.createPassword('password', 'signUpPassword');
signUp.createBr();
signUp.createLabel('signUpConfirmPassword', 'Confirm your password', 'label');
signUp.createConfirmPassword('password', 'signUpConfirmPassword');
signUp.createBr();
signUp.createLabel('email', 'Confirm your email', 'label');
signUp.createEmail('email', 'email');
signUp.createBr();
signUp.createBtn('btn');