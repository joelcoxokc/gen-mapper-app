define('app',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      config.map([{
        moduleId: 'views/home/home',
        route: [''],
        name: 'home'
      }, {
        moduleId: 'views/category/category',
        route: 'categories/:id',
        name: 'category'
      }, {
        moduleId: 'views/tool/tool',
        route: 'tools/:id',
        name: 'tool'
      }]);
      this.router = router;
    };

    return App;
  }();
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function configure(aurelia) {
    aurelia.use.standardConfiguration().globalResources('components/icon/icon');


    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('services/api',['exports', 'aurelia-http-client', 'aurelia-framework'], function (exports, _aureliaHttpClient, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Api = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  function handleError(err) {
    console.log(err.content.message);
  }

  var Api = exports.Api = (_dec = (0, _aureliaFramework.inject)(_aureliaHttpClient.HttpClient), _dec(_class = function () {
    function Api(http) {
      _classCallCheck(this, Api);

      this.http = http;
      this.configure();
    }

    Api.prototype.configure = function configure() {
      this.http.configure(function (x) {
        x.withBaseUrl('http://genmap.garrettcox.io');
        x.withHeader('Authorization', 'bearer ' + sessionStorage.getItem('auth_token'));
      });
    };

    Api.prototype.get = function get(url) {
      return this.http.get(url).then(function (response) {
        return response.content.data;
      }).catch(handleError);
    };

    Api.prototype.post = function post(url, body) {
      return this.http.post(url, body).then(function (response) {
        return response.content.data;
      }).catch(handleError);
    };

    Api.prototype.put = function put(url, body) {
      return this.http.put(url, body).then(function (response) {
        return response.content.data;
      }).catch(handleError);
    };

    Api.prototype.delete = function _delete(url) {
      return this.http.delete(url).then(function (response) {
        return response.content.data;
      }).catch(handleError);
    };

    return Api;
  }()) || _class);
});
define('services/authservice',['exports', 'aurelia-framework', 'services/api'], function (exports, _aureliaFramework, _api) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AuthService = undefined;

  var _dec, _class2;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var SUCCESS = 'success';

  var User = function User(options) {
    _classCallCheck(this, User);

    this.entityType = 'users';

    Object.assign(this, options);
  };

  var AuthService = exports.AuthService = (_dec = (0, _aureliaFramework.inject)(_api.Api), _dec(_class2 = function () {
    function AuthService(api) {
      _classCallCheck(this, AuthService);

      this.loggedIn = false;

      this.api = api;
      this.http = api.http;
    }

    AuthService.prototype.onLogin = function onLogin() {
      return;
    };

    AuthService.prototype.login = function login(user) {
      var _this = this;

      user.entityType = 'auth';
      return this.handler.create(user).then(function (response) {
        sessionStorage.setItem('auth_token', response.content.data);
        _this.loggedIn = true;
        _this.handler.configure();
        return _this.onLogin();
      });
    };

    AuthService.prototype.signup = function signup(user) {
      var _this2 = this;

      user = new User(user);
      return this.handler.create(user).then(function (response) {
        if (response.status === SUCCESS) {
          _this2.user = new User(response.data);
          return _this2.login(user);
        }
      });
    };

    return AuthService;
  }()) || _class2);
});
define('services/documents',['exports', 'aurelia-framework', 'services/documentsApi'], function (exports, _aureliaFramework, _documentsApi) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Documents = undefined;

  var _dec, _class;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var Document = function () {
    function Document() {
      _classCallCheck(this, Document);
    }

    Document.prototype.assign = function assign(_ref) {
      var title = _ref.title,
          content = _ref.content;

      this._title = title;
      this.title = title;
      this._content = content;
      this.content = content;
    };

    _createClass(Document, [{
      key: 'dirty',
      get: function get() {
        return this._title !== this.title || this._content !== this.content;
      }
    }]);

    return Document;
  }();

  var Documents = exports.Documents = (_dec = (0, _aureliaFramework.inject)(_documentsApi.DocumentsApi), _dec(_class = function () {
    function Documents(documentsApi) {
      var _this = this;

      _classCallCheck(this, Documents);

      this.docs = [];
      this._current = {};
      this.current = new Document();

      this.api = documentsApi;

      this.api.getAll().then(function (docs) {
        return _this.docs = docs;
      }).then(function () {
        return _this.changeCurrent(_this.docs[0]);
      });
    }

    Documents.prototype.setFormat = function setFormat() {};

    Documents.prototype.saveCurrent = function saveCurrent() {
      this._current.title = this.current.title;
      this._current.content = this.current.content;
      this.current.assign(this._current);
      this.api.update(this._current.id, {
        title: this._current.title,
        content: this._current.content
      });
    };

    Documents.prototype.changeCurrent = function changeCurrent(document) {
      this._current = document;
      this.current.assign(document);
    };

    return Documents;
  }()) || _class);
});
define('services/documentsApi',['exports', 'aurelia-framework', 'services/api'], function (exports, _aureliaFramework, _api) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DocumentsApi = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var DocumentsApi = exports.DocumentsApi = (_dec = (0, _aureliaFramework.inject)(_api.Api), _dec(_class = function () {
    function DocumentsApi(api) {
      _classCallCheck(this, DocumentsApi);

      this.api = api;
    }

    DocumentsApi.prototype.getAll = function getAll() {
      return this.api.get('/documents');
    };

    DocumentsApi.prototype.create = function create(body) {
      return this.api.post('/documents', body);
    };

    DocumentsApi.prototype.get = function get(id) {
      return this.api.get('/documents/' + id);
    };

    DocumentsApi.prototype.update = function update(id, body) {
      return this.api.put('/documents/' + id, body);
    };

    DocumentsApi.prototype.delete = function _delete(id) {
      return this.api.delete('/documents/' + id);
    };

    return DocumentsApi;
  }()) || _class);
});
define('shared/entity',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Entity = exports.Entity = function Entity() {
        _classCallCheck(this, Entity);
    };
});
define(['exports', 'aurelia-framework', 'services/Documents'], function (exports, _aureliaFramework, _Documents) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Editor = undefined;

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _desc, _value, _class, _descriptor, _descriptor2, _dec, _class3;

  var Document = (_class = function () {
    function Document(props) {
      _classCallCheck(this, Document);

      _initDefineProp(this, 'title', _descriptor, this);

      _initDefineProp(this, 'content', _descriptor2, this);

      Object.assign(this, props);
      this.dirty = false;
    }

    Document.prototype.titleChanged = function titleChanged() {
      this.dirty = true;
    };

    Document.prototype.contentChanged = function contentChanged() {
      this.dirty = true;
    };

    return Document;
  }(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'title', [_aureliaFramework.observable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'content', [_aureliaFramework.observable], {
    enumerable: true,
    initializer: null
  })), _class);
  var Editor = exports.Editor = (_dec = (0, _aureliaFramework.inject)(_Documents.Documents), _dec(_class3 = function () {
    function Editor(documents) {
      _classCallCheck(this, Editor);

      this.docService = documents;
      this.docs = [];
      this.currentDoc = {};
      this.loadedDoc = false;

      this.refreshDocs();
    }

    Editor.prototype.refreshDocs = function refreshDocs() {
      var _this = this;

      return this.docService.getAll().then(function (docs) {
        if (docs) _this.docs = docs.map(function (d) {
          return new Document(d);
        });
      });
    };

    Editor.prototype.setDoc = function setDoc(id) {
      var _this2 = this;

      this.refreshDocs().then(function () {
        var index = _this2.docs.reduce(function (d, c, i) {
          if (d === -1 && c.id === id) return i;
          return d;
        }, -1);

        if (index === -1) throw new Error('Invalid doc id');

        _this2.currentDoc = _this2.docs[index];
        _this2.loadedDoc = true;
      });
    };

    Editor.prototype.startNew = function startNew() {
      this.loadedDoc = false;
      this.currentDoc = {};
    };

    Editor.prototype.importFile = function importFile() {};

    Editor.prototype.save = function save() {
      var _this3 = this;

      this.docService.update(this.currentDoc.id, this.currentDoc).then(function (updated) {
        return _this3.refreshDocs().then(function () {
          return _this3.setDoc(updated.id);
        });
      });
    };

    Editor.prototype.create = function create() {
      var _this4 = this;

      this.currentDoc.format = 'churchCircles';
      this.docService.create(this.currentDoc).then(function (created) {
        return _this4.refreshDocs().then(function () {
          return _this4.setDoc(created.id);
        });
      });
    };

    Editor.prototype.delete = function _delete(id, $event) {
      var _this5 = this;

      var currentId = this.currentDoc.id;
      $event.stopPropagation();

      this.docService.delete(id).then(function () {
        return _this5.refreshDocs();
      }).then(function () {
        return function () {
          if (currentId === id) _this5.startNew();else return _this5.setDoc(currentId);
        };
      });
    };

    _createClass(Editor, [{
      key: 'empty',
      get: function get() {
        return !this.docs.length;
      }
    }, {
      key: 'canCreate',
      get: function get() {
        return !!this.currentDoc.title;
      }
    }, {
      key: 'isDirty',
      get: function get() {
        return this.currentDoc.dirty;
      }
    }]);

    return Editor;
  }()) || _class3);
});
define('components/icon/icon',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Icon = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

    var Icon = exports.Icon = (_dec = (0, _aureliaFramework.customElement)('icon'), _dec2 = (0, _aureliaFramework.inject)(Element), _dec(_class = _dec2(_class = (_class2 = function () {
        function Icon(element) {
            _classCallCheck(this, Icon);

            _initDefineProp(this, 'name', _descriptor, this);

            this.element = element;
        }

        Icon.prototype.nameChanged = function nameChanged(name) {
            this.element.setAttribute('style', 'background-image: url(assets/icons/' + name + '.svg)');
        };

        return Icon;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'name', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return null;
        }
    })), _class2)) || _class) || _class);
});
define('components/login/login',['exports', 'services/authservice', 'aurelia-router', 'aurelia-framework'], function (exports, _authservice, _aureliaRouter, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Login = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Login = exports.Login = (_dec = (0, _aureliaFramework.inject)(_authservice.AuthService, _aureliaRouter.Router), _dec(_class = function () {
        function Login(auth, router) {
            _classCallCheck(this, Login);

            this.email = null;
            this.password = null;

            this.auth = auth;
            this.router = router;
        }

        Login.prototype.onSubmit = function onSubmit() {
            var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            event.preventDefault();
            this.login();
        };

        Login.prototype.login = function login() {
            var _this = this;

            var email = this.email;
            var password = this.password;
            var user = { email: email, password: password };
            this.auth.login(user).then(function () {
                _this.router.navigate('');
            });
        };

        return Login;
    }()) || _class);
});
define('components/signup/signup',[], function () {
  "use strict";
});
define('components/texteditor/texteditor',['exports', 'aurelia-framework', 'services/documents'], function (exports, _aureliaFramework, _documents) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.TextEditor = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _dec2, _class;

  var TextEditor = exports.TextEditor = (_dec = (0, _aureliaFramework.customElement)('texteditor'), _dec2 = (0, _aureliaFramework.inject)(Element, _documents.Documents), _dec(_class = _dec2(_class = function TextEditor(element, documents) {
    _classCallCheck(this, TextEditor);

    this.element = element;
    this.documents = documents;
  }) || _class) || _class);
});
define('views/category/category',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Category = exports.Category = function Category() {
    _classCallCheck(this, Category);
  };
});
define('views/home/home',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Home = exports.Home = function Home() {
    _classCallCheck(this, Home);

    this.categories = [{
      name: 'Entry',
      tools: [{
        name: 'Four Fields GenMap',
        image: 'assets/fourFields-genmap.png'
      }, {
        name: 'Church Circles GenMap',
        image: 'assets/churchCircles-genmap.png'
      }, {
        name: 'Four Fields GenMap',
        image: 'assets/fourFields-genmap.png'
      }]
    }, {
      name: 'Gospel',
      tools: [{
        name: 'Four Fields GenMap',
        image: 'assets/fourFields-genmap.png'
      }, {
        name: 'Church Circles GenMap',
        image: 'assets/churchCircles-genmap.png'
      }, {
        name: 'Four Fields GenMap',
        image: 'assets/fourFields-genmap.png'
      }]
    }, {
      name: 'Church Formation',
      tools: [{
        name: 'Four Fields GenMap',
        image: 'assets/fourFields-genmap.png'
      }, {
        name: 'Church Circles GenMap',
        image: 'assets/churchCircles-genmap.png'
      }, {
        name: 'Four Fields GenMap',
        image: 'assets/fourFields-genmap.png'
      }]
    }, {
      name: 'Discipleship',
      tools: [{
        name: 'Four Fields GenMap',
        image: 'assets/fourFields-genmap.png'
      }, {
        name: 'Church Circles GenMap',
        image: 'assets/churchCircles-genmap.png'
      }, {
        name: 'Four Fields GenMap',
        image: 'assets/fourFields-genmap.png'
      }]
    }];
  };
});
define('views/tool/tool',['exports', 'aurelia-framework', 'services/documents'], function (exports, _aureliaFramework, _documents) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Tool = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Tool = exports.Tool = (_dec = (0, _aureliaFramework.inject)(_documents.Documents), _dec(_class = function Tool(documents) {
    _classCallCheck(this, Tool);

    this.canPersist = true;

    this.documents = documents;
  }) || _class);
});

import { inject } from 'aurelia-framework';
import { DocumentsApi } from 'services/documentsApi';

class Document {
  _title;
  _content;
  title;
  content;

  get dirty() {
    return (this._title !== this.title || this._content !== this.content);
  }

  assign({ title, content }) {
    this._title = title;
    this.title = title;
    this._content = content;
    this.content = content;
  }
}

@inject(DocumentsApi)
export class Documents {
  docs = [];
  _current = {};
  current = new Document();

  constructor(documentsApi) {
    this.api = documentsApi;

    this.api.getAll()
      .then(docs => this.docs = docs)
      .then(() => this.changeCurrent(this.docs[0]));
  }

  setFormat() {

  }

  saveCurrent() {
    this._current.title = this.current.title;
    this._current.content = this.current.content;
    this.current.assign(this._current);
    this.api.update(this._current.id, {
      title: this._current.title,
      content: this._current.content
    });
  }

  changeCurrent(document) {
    this._current = document;
    this.current.assign(document);
  }
}

define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"./app.css\"></require><header></header><router-view class=\"${router.currentInstruction.config.name}\"></router-view></template>"; });
define('text!components/editor/editor.html', ['module'], function(module) { module.exports = "<template><require from=\"./editor.css\"></require><div class=\"nav border-bottom-smoke\"><div class=\"left border-right-smoke col\"><div class=\"logo f1\">GenMapper</div></div><div class=\"right row\"><div class=\"meta f1\"><input class=\"title\" placeholder=\"Document Name\" value.bind=\"currentDoc.title\"></div><div class=\"actions row\"><button if.bind=\"loadedDoc\" disabled.bind=\"!isDirty\" click.trigger=\"save()\" class=\"button\">Save</button> <button if.bind=\"!loadedDoc\" disabled.bind=\"!canCreate\" click.trigger=\"create()\" class=\"button\">Create</button><div class=\"dropdown\"><icon name=\"down\"></icon></div></div></div></div><div class=\"main\"><div class=\"left sidebar col border-right-smoke\"><div class=\"actions row\"><div click.trigger=\"importFile()\" class=\"import border-right-snow f1\"><icon name=\"paperclip\"></icon></div><div click.trigger=\"startNew()\" class=\"create f1\"><icon name=\"add\"></icon></div></div><div if.bind=\"empty\" class=\"f1 emptyPlaceholder\"><div class=\"message\">You don't have any documents! Try importing or creating one using the buttons above</div></div><div if.bind=\"!empty\" class=\"f1 documents\"><div class=\"document row border-bottom-snow ${currentDoc.id === doc.id ? 'active' : ''}\" repeat.for=\"doc of docs\" click.trigger=\"setDoc(doc.id)\"><div class=\"meta f1 col\"><div class=\"title\">${doc.title}</div><div class=\"format\">${doc.format}</div></div><div class=\"actions\"><icon click.trigger=\"delete(doc.id, $event)\" class=\"delete\" name=\"delete\"></icon></div></div></div></div><div class=\"right content\"><textarea value.bind=\"currentDoc.content\" rows=\"20\" cols=\"80\"></textarea></div></div></template>"; });
define('text!app.css', ['module'], function(module) { module.exports = "@font-face {\n  font-family: 'Interface';\n  font-style: normal;\n  font-weight: 400;\n  src: url(\"assets/Interface-Regular.woff2?v=1.1\") format(\"woff2\"), url(\"assets/Interface-Regular.woff?v=1.1\") format(\"woff\"); }\n\n@font-face {\n  font-family: 'Interface';\n  font-style: italic;\n  font-weight: 400;\n  src: url(\"assets/Interface-RegularItalic.woff2?v=1.1\") format(\"woff2\"), url(\"assets/Interface-RegularItalic.woff?v=1.1\") format(\"woff\"); }\n\n@font-face {\n  font-family: 'Interface';\n  font-style: normal;\n  font-weight: 500;\n  src: url(\"assets/Interface-Medium.woff2?v=1.1\") format(\"woff2\"), url(\"assets/Interface-Medium.woff?v=1.1\") format(\"woff\"); }\n\n@font-face {\n  font-family: 'Interface';\n  font-style: italic;\n  font-weight: 500;\n  src: url(\"assets/Interface-MediumItalic.woff2?v=1.1\") format(\"woff2\"), url(\"assets/Interface-MediumItalic.woff?v=1.1\") format(\"woff\"); }\n\n@font-face {\n  font-family: 'Interface';\n  font-style: normal;\n  font-weight: 700;\n  src: url(\"assets/Interface-Bold.woff2?v=1.1\") format(\"woff2\"), url(\"assets/Interface-Bold.woff?v=1.1\") format(\"woff\"); }\n\n@font-face {\n  font-family: 'Interface';\n  font-style: italic;\n  font-weight: 700;\n  src: url(\"assets/Interface-BoldItalic.woff2?v=1.1\") format(\"woff2\"), url(\"assets/Interface-BoldItalic.woff?v=1.1\") format(\"woff\"); }\n\n.contained, .home__categories {\n  max-width: 65rem;\n  margin: 0 auto; }\n\n.row, .home, .home__categories, .home-category__header, .home-category__tools, .tool, .tool-sidebar__nav, .tool-sidebar__action, .tool-documents__document, .tool-nav {\n  display: flex;\n  flex-direction: row; }\n\n.col, .home-tool, .home-tool__meta, .tool-sidebar, .tool-documents__meta, .tool-main {\n  display: flex;\n  flex-direction: column; }\n\n.f1, .home-category, .home-tool__meta, .tool-documents, .tool-documents__meta, .tool-main, .tool-view {\n  flex: 1 0 auto; }\n\n.aic, .home, .tool-sidebar__nav, .tool-nav {\n  align-items: center; }\n\n.jcc, .home-tool__meta, .tool-sidebar__nav, .tool-sidebar__action, .tool-documents__meta {\n  justify-content: center; }\n\nicon {\n  height: 24px;\n  width: 24px;\n  display: inline-block;\n  margin: 12px; }\n\n/*\n * Blocks:\n * .home\n * .home-category\n * .home-tool\n */\n.home__categories {\n  flex-wrap: wrap;\n  padding-bottom: 4rem; }\n\n.home-category {\n  margin: 1rem;\n  min-width: 26rem; }\n  .home-category__header {\n    border-bottom: 1px solid #DDD;\n    padding: 0.5rem;\n    align-items: flex-end; }\n  .home-category__name {\n    font-size: 2rem;\n    font-weight: bold;\n    color: #444;\n    font-family: Interface; }\n  .home-category__browse {\n    margin-left: auto;\n    text-decoration: none;\n    font-size: 0.7rem;\n    color: #009EEB;\n    transition: opacity 100ms ease;\n    opacity: 0; }\n  .home-category:hover .home-category__browse {\n    opacity: 1; }\n  .home-category__tools {\n    justify-content: space-around; }\n\n.home-tool {\n  padding: 1rem;\n  margin-top: 0.5rem;\n  border: 2px solid #EEE;\n  border-radius: 4px;\n  cursor: pointer;\n  transition: border 100ms ease;\n  text-decoration: none; }\n  .home-tool:hover {\n    border: 2px solid #FF9E7C; }\n  .home-tool__image {\n    min-height: 7rem;\n    max-height: 7rem;\n    min-width: 7rem;\n    max-width: 7rem;\n    border: 1px solid #DDD;\n    background: #F5F5F5;\n    background-position: center;\n    background-size: cover; }\n  .home-tool__meta {\n    padding-top: 1rem;\n    text-align: center;\n    font-size: 0.9rem;\n    max-width: 7rem;\n    color: #333; }\n  .home-tool__name {\n    font-family: Interface; }\n\n@media only screen and (max-width: 840px) {\n  .home {\n    align-items: flex-start; }\n    .home__categories {\n      padding-bottom: 0; }\n  .home-category {\n    margin: 1rem 0; }\n    .home-category__browse {\n      opacity: 1; } }\n\n@media only screen and (max-width: 500px) {\n  .home-tool__image {\n    min-height: 5rem;\n    max-height: 5rem;\n    min-width: 5rem;\n    max-width: 5rem; }\n  .home-tool__meta {\n    max-width: 5rem; } }\n\n/*\n * Blocks:\n * .tool\n * .tool-sidebar\n * .tool-documents\n * .tool-main\n * .tool-nav\n * .tool-view\n */\n.tool-sidebar {\n  width: 20rem;\n  border-right: 1px solid #E0E6ED; }\n  .tool-sidebar__nav {\n    height: 4rem;\n    border-bottom: 1px solid #E0E6ED; }\n  .tool-sidebar__logo {\n    font-family: Interface, sans-serif;\n    font-weight: 600;\n    font-size: 1.4rem;\n    color: #FF5216; }\n  .tool-sidebar__actions {\n    background: #EFF2F7; }\n  .tool-sidebar__action {\n    border-bottom: 1px solid #E0E6ED; }\n\n.tool-documents {\n  background: #F9FAFC; }\n  .tool-documents__document {\n    background: white;\n    border-bottom: 1px solid #EFF2F7;\n    padding: 1rem;\n    cursor: pointer; }\n  .tool-documents__title {\n    font-size: 1.1rem;\n    color: #273444; }\n  .tool-documents__description {\n    font-size: 0.8rem;\n    font-weight: 300;\n    color: #8492A6; }\n  .tool-documents__icon {\n    margin: 6px;\n    padding: 6px;\n    background-repeat: no-repeat;\n    background-position: center;\n    opacity: 0;\n    transition: opacity 100ms ease; }\n  .tool-documents__document--active .tool-documents__title {\n    color: #1FB6FF; }\n  .tool-documents__document:hover .tool-documents__icon {\n    opacity: 0.6; }\n  .tool-documents__document:hover .tool-documents__icon:hover {\n    opacity: 1; }\n\n.button, .tool-nav__save {\n  background: #13CE66;\n  color: white;\n  cursor: pointer;\n  padding: 0.8rem 1.5rem;\n  border-radius: 4px;\n  border: none;\n  font-size: 0.9rem;\n  box-shadow: inset 0 -3px 0 rgba(31, 45, 61, 0.15);\n  outline: none;\n  transition: box-shadow 100ms ease; }\n  .button:hover, .tool-nav__save:hover, .button:focus, .tool-nav__save:focus {\n    box-shadow: none; }\n  .button:disabled, .tool-nav__save:disabled {\n    background: #E5E9F2;\n    color: #555;\n    cursor: not-allowed; }\n    .button:disabled:hover, .tool-nav__save:disabled:hover {\n      box-shadow: inset 0 -3px 0 rgba(31, 45, 61, 0.15); }\n\n.tool-nav {\n  border-bottom: 1px solid #E0E6ED;\n  height: 4rem;\n  padding: 0 1rem; }\n  .tool-nav__title {\n    padding: 0.5rem;\n    font-size: 1.1rem;\n    border: 2px dashed #E0E6ED;\n    outline: none;\n    text-overflow: ellipsis;\n    transition: all 100ms ease; }\n    .tool-nav__title::placeholder {\n      color: #D3DCE6; }\n    .tool-nav__title:hover {\n      border: 2px solid #E0E6ED; }\n    .tool-nav__title:focus {\n      border: 2px solid #85D7FF; }\n  .tool-nav__actions {\n    margin-left: auto; }\n\nhtml, body {\n  min-height: 100vh;\n  min-width: 100vw;\n  max-height: 100vh;\n  max-width: 100vw;\n  position: relative;\n  font: 15px sans-serif;\n  margin: 0;\n  padding: 0;\n  user-select: none; }\n\nbody {\n  display: flex;\n  flex-direction: column; }\n\nrouter-view {\n  flex: 1 0 auto; }\n"; });
define('text!components/icon/icon.html', ['module'], function(module) { module.exports = "<template></template>"; });
define('text!components/login/login.html', ['module'], function(module) { module.exports = "<template><form ref=\"form\"><input type=\"email\" name=\"email\" value.bind=\"email\" id=\"email\" placeholder=\"Email\"> <input type=\"password\" name=\"password\" value.bind=\"password\" id=\"password\" placeholder=\"Password\"> <button click.delegate=\"onSubmit($event)\">Login</button></form></template>"; });
define('text!components/signup/signup.html', ['module'], function(module) { module.exports = ""; });
define('text!components/texteditor/texteditor.html', ['module'], function(module) { module.exports = "<template><textarea value.bind=\"documents.current.content\" rows=\"40\" cols=\"80\"></textarea> ${dirty} </template>"; });
define('text!views/category/category.html', ['module'], function(module) { module.exports = "<template><h1>Category</h1></template>"; });
define('text!views/home/home.html', ['module'], function(module) { module.exports = "<template><div class=\"home__categories\"><div class=\"home-category\" repeat.for=\"category of categories\"><div class=\"home-category__header\"><div class=\"home-category__name\">${category.name}</div><a class=\"home-category__browse\" href=\"#/categories/${$index}\">See All ▸</a></div><div class=\"home-category__tools\"><a class=\"home-tool\" repeat.for=\"tool of category.tools\" href=\"#/tools/${$index}\"><div class=\"home-tool__image\" css=\"background-image: url('${tool.image}')\"></div><div class=\"home-tool__meta\"><div class=\"home-tool__name\">${tool.name}</div></div></a></div></div></div></template>"; });
define('text!views/tool/tool.html', ['module'], function(module) { module.exports = "<template><div class=\"tool-sidebar\" if.bind=\"canPersist\"><div class=\"tool-sidebar__nav\"><div class=\"tool-sidebar__logo\">GenMapper</div></div><div class=\"tool-sidebar__actions\"><button class=\"tool-sidebar__action\"><icon name=\"paperclip\"></icon></button> <button class=\"tool-sidebar__action\"><icon name=\"add\"></icon></button></div><div class=\"tool-documents\"><div class=\"tool-documents__document ${documents._current.id === doc.id ? 'tool-documents__document--active' : ''}\" repeat.for=\"doc of documents.docs\" click.trigger=\"documents.changeCurrent(doc)\"><div class=\"tool-documents__meta\"><div class=\"tool-documents__title\">${doc.title}</div><div class=\"tool-documents__description\">Description</div></div><div class=\"tool-documents__actions\"><icon click.trigger=\"\" class=\"tool-documents__icon\" name=\"delete\"></icon></div></div></div></div><div class=\"tool-main\"><div class=\"tool-nav\" if.bind=\"canPersist\"><input class=\"tool-nav__title\" placeholder=\"Document Name\" value.bind=\"documents.current.title\"><div class=\"tool-nav__actions\"><button class=\"tool-nav__save\" disabled.bind=\"!documents.current.dirty\" click.trigger=\"documents.saveCurrent()\">Save</button></div></div><div class=\"tool-view\"><require from=\"components/texteditor/texteditor\"></require><texteditor></texteditor></div></div></template>"; });
//# sourceMappingURL=app-bundle.js.map