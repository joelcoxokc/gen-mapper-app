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
define('services/Documents',['exports', 'aurelia-framework', 'services/http'], function (exports, _aureliaFramework, _http) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Documents = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Documents = exports.Documents = (_dec = (0, _aureliaFramework.inject)(_http.Http), _dec(_class = function () {
    function Documents(http) {
      _classCallCheck(this, Documents);

      this.http = http;
    }

    Documents.prototype.getAll = function getAll() {
      return this.http.get('/documents');
    };

    Documents.prototype.create = function create(body) {
      return this.http.post('/documents', body);
    };

    Documents.prototype.get = function get(id) {
      return this.http.get('/documents/' + id);
    };

    Documents.prototype.update = function update(id, body) {
      return this.http.put('/documents/' + id, body);
    };

    Documents.prototype.delete = function _delete(id) {
      return this.http.delete('/documents/' + id);
    };

    return Documents;
  }()) || _class);
});
define('services/authservice',['exports', 'aurelia-framework', 'aurelia-http-client', 'services/http'], function (exports, _aureliaFramework, _aureliaHttpClient, _http) {
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

    var AuthService = exports.AuthService = (_dec = (0, _aureliaFramework.inject)(_http.Http), _dec(_class2 = function () {
        function AuthService(handler) {
            _classCallCheck(this, AuthService);

            this.loggedIn = false;

            this.handler = handler;
            this.http = handler.http;
        }

        AuthService.prototype.onLogin = function onLogin() {
            return;
        };

        AuthService.prototype.login = function login(user) {
            var _this = this;

            user.entityType = 'auth';
            return this.handler.create(user).then(function (response) {
                console.log('loggedIn');
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
define('services/fileservice',['exports', 'aurelia-event-aggregator', 'aurelia-framework', 'services/http'], function (exports, _aureliaEventAggregator, _aureliaFramework, _http) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.FileService = undefined;

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

    var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2;

    function setEntity(d) {
        d.entityType = d.entityType || 'documents';
    }

    var FileService = exports.FileService = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, _http.Http), _dec(_class = (_class2 = function () {
        function FileService(eventAggregator, http) {
            _classCallCheck(this, FileService);

            _initDefineProp(this, 'current', _descriptor, this);

            _initDefineProp(this, 'list', _descriptor2, this);

            this.eventAggregator = eventAggregator;
            this.http = http;
        }

        FileService.prototype.currentChanged = function currentChanged(file) {
            this.eventAggregator.publish('file-changed', file);
        };

        FileService.prototype.all = function all() {
            var _this = this;

            return this.http.getDocuments().then(function (list) {
                _this.list = list;
                console.log(_this.list);
                return _this.list;
            });
        };

        FileService.prototype.create = function create(doc) {
            setEntity(doc);
            return this.http.create(doc);
        };

        FileService.prototype.update = function update(doc) {
            setEntity(doc);
            console.log(doc);
            return this.http.update(doc);
        };

        FileService.prototype.delete = function _delete(doc) {
            setEntity(doc);
            return this.http.delete(doc);
        };

        FileService.prototype.select = function select(doc) {
            this.current = doc;
        };

        return FileService;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'current', [_aureliaFramework.observable], {
        enumerable: true,
        initializer: function initializer() {
            return null;
        }
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'list', [_aureliaFramework.observable], {
        enumerable: true,
        initializer: function initializer() {
            return null;
        }
    })), _class2)) || _class);


    function getDocuments() {
        return [{ name: 'Document 1' }, { name: 'Document 2' }, { name: 'Document 3' }, { name: 'Document 4' }, { name: 'Document 5' }, { name: 'Document 6' }, { name: 'Document 7' }];
    }
});
define('services/http',['exports', 'aurelia-http-client', 'aurelia-framework', 'shared/entity'], function (exports, _aureliaHttpClient, _aureliaFramework, _entity) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Http = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  function handleError(err) {
    console.log(err.content.message);
  }

  var Http = exports.Http = (_dec = (0, _aureliaFramework.inject)(_aureliaHttpClient.HttpClient), _dec(_class = function () {
    function Http(http) {
      _classCallCheck(this, Http);

      this.http = http;
      this.configure();
    }

    Http.prototype.configure = function configure() {
      this.http.configure(function (x) {
        x.withBaseUrl('http://genmap.garrettcox.io');
        x.withHeader('Authorization', 'bearer ' + sessionStorage.getItem('auth_token'));
      });
    };

    Http.prototype.get = function get(url) {
      return this.http.get(url).then(function (response) {
        return response.content.data;
      }).catch(handleError);
    };

    Http.prototype.post = function post(url, body) {
      return this.http.post(url, body).then(function (response) {
        return response.content.data;
      }).catch(handleError);
    };

    Http.prototype.put = function put(url, body) {
      return this.http.put(url, body).then(function (response) {
        return response.content.data;
      }).catch(handleError);
    };

    Http.prototype.delete = function _delete(url) {
      return this.http.delete(url).then(function (response) {
        return response.content.data;
      }).catch(handleError);
    };

    Http.prototype.getAll = function getAll(url) {
      return this.http.get(url).then(function (d) {
        return d.content;
      }).catch(handleError);
    };

    Http.prototype.getDocuments = function getDocuments(format) {
      return this.getAll('documents').then(function (d) {
        return d.data.map(function (item) {
          item.entityType = 'documents';
          return item;
        });
      });
    };

    Http.prototype.create = function create() {
      var entity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      return this.http.post(entity.entityType, entity).catch(handleError);
    };

    Http.prototype.update = function update() {
      var entity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      var url = entity.entityType + '/' + entity.id;
      return this.http.put(url, entity).catch(handleError);
    };

    Http.prototype.deleteEntity = function deleteEntity() {
      var entity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      var url = entity.entityType + '/' + entity.id;
      return this.http.delete(url).catch(handleError);
    };

    return Http;
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
define('components/editor/editor',['exports', 'aurelia-framework', 'services/Documents'], function (exports, _aureliaFramework, _Documents) {
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
define('components/documents/documents',['exports', 'services/fileservice', 'aurelia-framework', 'aurelia-router', 'services/http'], function (exports, _fileservice, _aureliaFramework, _aureliaRouter, _http) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.DocumentsViewModel = undefined;

    var _dec, _class2;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var formats_types = {
        'church-circles': 'churchCircles',
        'four-fields': 'fourFields'
    };

    var Document = function Document() {
        var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Document);

        this.entityType = 'documents';
        this.title = 'New Document';
        this.content = 'id,parentId,name,email,link,attenders,believers,baptized,newlyBaptized,church,churchType,elementBaptism,elementWord,elementPrayer,elementLordsSupper,elementGive,elementLove,elementWorship,elementLeaders,elementMakeDisciples,place,date,threeThirds,active\n    0,,Leader\'s Name,,,0,0,0,0,0,newBelievers,0,0,0,0,0,0,0,0,0,Place,Date,1234567,1';
        Object.assign(this, obj);
    };

    var DocumentsViewModel = exports.DocumentsViewModel = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _http.Http, _fileservice.FileService), _dec(_class2 = function () {
        function DocumentsViewModel(router, http, fileService) {
            _classCallCheck(this, DocumentsViewModel);

            this.router = router;
            this.http = http;
            this.fileService = fileService;
        }

        DocumentsViewModel.prototype.activate = function activate(params) {
            this.formatId = params.type;
            this.formatId = formats_types[this.formatId];
            var d = new Document();
            this.fileService.all();
        };

        DocumentsViewModel.prototype.saveDoc = function saveDoc(doc) {
            this.fileService.update(doc);
        };

        DocumentsViewModel.prototype.loadDoc = function loadDoc(doc) {
            this.fileService.select(doc);
            this.router.navigate(doc.title);
        };

        DocumentsViewModel.prototype.createDocument = function createDocument() {
            var _this = this;

            var doc = new Document();
            doc.format = this.formatId;

            this.fileService.create(doc).then(function () {
                return _this.fileService.all();
            });
        };

        DocumentsViewModel.prototype.removeDocument = function removeDocument(doc) {
            var _this2 = this;

            this.fileService.delete(doc).then(function () {
                return _this2.fileService.all();
            });
        };

        return DocumentsViewModel;
    }()) || _class2);
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
define('components/genmap/genmap',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var GenMapViewModel = exports.GenMapViewModel = function () {
        function GenMapViewModel() {
            _classCallCheck(this, GenMapViewModel);

            this.showDocumentList = false;
        }

        GenMapViewModel.prototype.activate = function activate(params) {
            this.mapType = params.type;
        };

        GenMapViewModel.prototype.configureRouter = function configureRouter(config, router) {
            config.map([{
                moduleId: 'components/documents/documents',
                route: ['', 'documents'],
                name: 'documents',
                auth: true
            }, {
                moduleId: 'components/import/import',
                route: ['import'],
                name: 'import',
                auth: true
            }, {
                moduleId: 'components/map/map',
                route: [':id'],
                name: 'map',
                auth: true
            }]);

            this.router = router;
        };

        return GenMapViewModel;
    }();
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
define('components/mapvarients/mapvarients',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var MapVarientsViewModel = exports.MapVarientsViewModel = function MapVarientsViewModel() {
        _classCallCheck(this, MapVarientsViewModel);
    };
});
define('components/signup/signup',[], function () {
  "use strict";
});
define('components/texteditor/texteditor',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.TextEditor = undefined;

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

  var _dec, _dec2, _dec3, _dec4, _class, _desc, _value, _class2, _descriptor, _descriptor2;

  var TextEditor = exports.TextEditor = (_dec = (0, _aureliaFramework.customElement)('texteditor'), _dec2 = (0, _aureliaFramework.inject)(Element), _dec3 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec4 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = _dec2(_class = (_class2 = function () {
    function TextEditor(element) {
      _classCallCheck(this, TextEditor);

      _initDefineProp(this, 'dirty', _descriptor, this);

      this.loaded = '';

      _initDefineProp(this, '_content', _descriptor2, this);

      this.element = element;
    }

    TextEditor.prototype._contentChanged = function _contentChanged() {
      this.dirty = this.loaded !== this._content;
    };

    _createClass(TextEditor, [{
      key: 'content',
      get: function get() {
        console.log('get');
        this.loaded = this._content;
        return this._content;
      },
      set: function set(content) {
        console.log('set', content);
        this.loaded = content;
        this._content = content;
      }
    }]);

    return TextEditor;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'dirty', [_dec3], {
    enumerable: true,
    initializer: function initializer() {
      return false;
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, '_content', [_aureliaFramework.observable], {
    enumerable: true,
    initializer: function initializer() {
      return '';
    }
  }), _applyDecoratedDescriptor(_class2.prototype, 'content', [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, 'content'), _class2.prototype)), _class2)) || _class) || _class);
});
define('components/map/genmapper',['exports', './templates', 'aurelia-framework'], function (exports, _templates, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.GenMapper = undefined;

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

    var _desc, _value, _class, _descriptor, _descriptor2;

    var templates = {
        'church-circles': _templates.CHURCH_CIRCLES
    };

    var GenMapper = exports.GenMapper = (_class = function () {
        function GenMapper(options) {
            _classCallCheck(this, GenMapper);

            _initDefineProp(this, 'templateFormat', _descriptor, this);

            _initDefineProp(this, 'templateContent', _descriptor2, this);

            this.format = options.format || 'church-circles';
            this.model = options.model;

            if (this.format) {
                this.template = templates[this.format];
            }
        }

        GenMapper.prototype.attached = function attached() {
            var _this = this;

            this.isAttached = true;

            this.appVersion = '0.2.11';
            this.loadHTMLContent();

            this.margin = { top: 50, right: 30, bottom: 50, left: 30 };

            this.projectName = 'Untitled project';

            this.addFieldsToEditWindow();

            d3.select('#project-name').text(this.projectName).on('click', function () {
                var userInput = window.prompt('Edit Project name', _this.projectName).trim();
                if (userInput === '') {
                    _this.displayAlert("Project name can't be empty!");
                } else {
                    _this.projectName = userInput;
                    d3.select('#project-name').text(_this.projectName);
                }
            });

            this.zoom = d3.zoom().scaleExtent([0.15, 2]).on('zoom', function zoomed() {
                d3.select('g').attr('transform', d3.event.transform);
            });

            this.setSvgHeight();
            this.svg = d3.select('#main-svg').call(this.zoom).on('dblclick.zoom', null);
            this.g = this.svg.append('g').attr('id', 'maingroup');
            this.gLinks = this.g.append('g').attr('class', 'group-links');
            this.gLinksText = this.g.append('g').attr('class', 'group-links-text');
            this.gNodes = this.g.append('g').attr('class', 'group-nodes');

            this.csvHeader = this.template.fields.map(function (field) {
                return field.header;
            }).join(',') + '\n';
            this.initialCsv = this.csvHeader + this.template.fields.map(function (field) {
                return field.initial;
            }).join(',');
            this.data = this.parseCsvData(this.initialCsv);
            this.nodes;

            if (this.model && this.model.content) {
                console.log(this.model.content);
                this.validTree(this.model.content);
            }

            this.origPosition();
            this.redraw();

            this.alertElement = document.getElementById('alert-message');
            this.editGroupElement = document.getElementById('edit-group');
            this.editFieldElements = {};
            this.template.fields.forEach(function (field) {
                if (field.type === 'radio') {
                    field.values.forEach(function (value) {
                        _this.editFieldElements[field.header + '-' + value.header] = document.getElementById('edit-' + field.header + '-' + value.header);
                    });
                } else if (field.type) {
                    _this.editFieldElements[field.header] = document.getElementById('edit-' + field.header);
                }
            });
            this.editParentElement = document.getElementById('edit-parent');

            this.setKeyboardShorcuts();

            document.getElementsByTagName('body')[0].onresize = this.setSvgHeight;

            console.log(this.templateContent);
        };

        GenMapper.prototype.setKeyboardShorcuts = function setKeyboardShorcuts() {
            var _this2 = this;

            document.addEventListener('keyup', function (e) {
                if (e.keyCode === 27) {
                    if (document.getElementById('alert-message').style.display !== 'none') {
                        document.getElementById('alert-message').style.display = 'none';
                    } else {
                        if (document.getElementById('intro').style.display !== 'none') {
                            document.getElementById('intro').style.display = 'none';
                        }
                        if (_this2.editGroupElement.style.display !== 'none') {
                            _this2.editGroupElement.style.display = 'none';
                        }
                    }
                } else if (e.keyCode === 13) {
                    if (_this2.editGroupElement.style.display !== 'none') {
                        document.getElementById('edit-submit').click();
                    }
                }
            });
        };

        GenMapper.prototype.setSvgHeight = function setSvgHeight() {
            var windowHeight = document.documentElement.clientHeight;
            var leftMenuHeight = document.getElementById('left-menu').clientHeight;
            var height = Math.max(windowHeight, leftMenuHeight + 10);
            d3.select('#main-svg').attr('height', height);
        };

        GenMapper.prototype.loadHTMLContent = function loadHTMLContent() {
            document.getElementById('left-menu').innerHTML += '<h1>GenMapper</h1>' + '<h2 id="project-name">&nbsp;</h2>' + '<p>Help</p>' + '<button onclick="genmapper.introSwitchVisibility()">Help / About</button>' + '<p>Zooming</p>' + '<button onclick="genmapper.origPosition();">Original Zoom &amp; Position</button>' + '<button onclick="genmapper.zoomIn();">Zoom In</button>' + '<button onclick="genmapper.zoomOut();">Zoom Out</button>' + '<p>Import / Export</p>' + '<button onclick="genmapper.onLoad(\'file-input\')">Import XLXS / CSV</button>' + '<input type="file" id="file-input" onchange="genmapper.importFile()" style="display:none;">' + '<button onclick="genmapper.outputCsv()">Export CSV</button>' + '<p>Printing</p>' + '<button onclick="genmapper.printMap(\'vertical\');">Print Vertical Multipage</button>' + '<button onclick="genmapper.printMap(\'horizontal\');">Print Horizontal One-page</button>';

            document.getElementById('edit-group').innerHTML += '<div id="edit-group-content">' + '  <h1>Edit group</h1>' + '  <form>' + '    <table>' + '      <tr>' + '        <td class="left-field">Parent:</td>' + '        <td class="right-field"><p id="edit-parent"></p></td>' + '      </tr>' + '    </table>' + '  </form>' + '  <div id="edit-buttons">' + '    <button id="edit-submit">Submit changes</button>' + '    <button id="edit-cancel">Cancel</button>' + '    <button id="edit-delete">Delete subtree</button>' + '    <button onclick="genmapper.onLoad(\'file-input-subtree\')">Import subtree</button>' + '    <input type="file" id="file-input-subtree" style="display:none;">' + '  </div>' + '</div>';

            document.getElementById('alert-message').innerHTML = '<div id="alert-message-content">' + '  <p id="alert-message-text"></p>' + '  <button onclick="genmapper.closeAlert()">OK</button>' + '</div>';

            document.getElementById('version').innerHTML = this.appVersion;
        };

        GenMapper.prototype.zoomIn = function zoomIn() {
            this.zoom.scaleBy(this.svg, 1.2);
        };

        GenMapper.prototype.zoomOut = function zoomOut() {
            this.zoom.scaleBy(this.svg, 1 / 1.2);
        };

        GenMapper.prototype.origPosition = function origPosition() {
            this.zoom.scaleTo(this.svg, 1);
            var origX = this.margin.left + document.getElementById('main').clientWidth / 2;
            var origY = this.margin.top;
            var parsedTransform = this.parseTransform(this.g.attr('transform'));
            this.zoom.translateBy(this.svg, origX - parsedTransform.translate[0], origY - parsedTransform.translate[1]);
        };

        GenMapper.prototype.onLoad = function onLoad(fileInputElementId) {
            var fileInput = document.getElementById(fileInputElementId);
            fileInput.value = '';
            fileInput.click();
        };

        GenMapper.prototype.displayAlert = function displayAlert(message) {
            this.alertElement.style.display = 'block';
            document.getElementById('alert-message-text').innerHTML = message;
        };

        GenMapper.prototype.closeAlert = function closeAlert() {
            this.alertElement.style.display = null;
            document.getElementById('alert-message-text').innerHTML = null;
        };

        GenMapper.prototype.introSwitchVisibility = function introSwitchVisibility() {
            var tmp = d3.select('#intro');
            if (tmp.style('display') !== 'none') {
                tmp.style('display', 'none');
            } else {
                tmp.style('display', 'block');
            }
        };

        GenMapper.prototype.popupEditGroupModal = function popupEditGroupModal(d) {
            var _this3 = this;

            this.editGroupElement.style.display = 'block';

            this.template.fields.forEach(function (field) {
                if (field.type === 'text') {
                    _this3.editFieldElements[field.header].value = d.data[field.header];
                } else if (field.type === 'radio') {
                    field.values.forEach(function (value) {
                        var status = value.header === d.data[field.header];
                        _this3.editFieldElements[field.header + '-' + value.header].checked = status;
                    });
                } else if (field.type === 'checkbox') {
                    _this3.editFieldElements[field.header].checked = d.data[field.header];
                }
            });

            this.editFieldElements[Object.keys(this.editFieldElements)[0]].select();

            this.editParentElement.innerHTML = d.parent ? d.parent.data.name : 'N/A';
            var groupData = d.data;
            var group = d;
            d3.select('#edit-submit').on('click', function () {
                _this3.editGroup(groupData);
            });
            d3.select('#edit-cancel').on('click', function () {
                _this3.editGroupElement.style.display = 'none';
            });
            d3.select('#edit-delete').on('click', function () {
                _this3.removeNode(group);
            });
            d3.select('#file-input-subtree').on('change', function () {
                _this3.importFileSubtree(group);
            });
        };

        GenMapper.prototype.editGroup = function editGroup(groupData) {
            var _this4 = this;

            this.template.fields.forEach(function (field) {
                if (field.type === 'text') {
                    groupData[field.header] = _this4.editFieldElements[field.header].value;
                } else if (field.type === 'radio') {
                    field.values.forEach(function (value) {
                        if (_this4.editFieldElements[field.header + '-' + value.header].checked) {
                            groupData[field.header] = value.header;
                        }
                    });
                } else if (field.type === 'checkbox') {
                    groupData[field.header] = _this4.editFieldElements[field.header].checked;
                }
            });

            this.editGroupElement.style.display = 'none';
            this.redraw();
        };

        GenMapper.prototype.printMap = function printMap(printType) {
            var arrNodes = this.nodes.descendants();
            var minX = 0;
            var maxX = 0;
            var minY = 0;
            var maxY = 0;
            for (var i = 0; i < arrNodes.length; i++) {
                var x = arrNodes[i].x;
                var y = arrNodes[i].y;
                minX = Math.min(minX, x);
                maxX = Math.max(maxX, x);
                minY = Math.min(minY, y);
                maxY = Math.max(maxY, y);
            }

            var origWidth = this.svg.attr('width');
            var origHeight = this.svg.attr('height');
            var origTransform = this.g.attr('transform');

            var totalHeight = Math.max(600, this.margin.top + (maxY - minY) + _templates.boxHeight + this.margin.top);
            var totalWidthLeft = Math.max(500, -minX + _templates.boxHeight * 1.5 / 2 + 20);
            var totalWidthRight = Math.max(500, maxX + _templates.boxHeight * 1.5 / 2 + 20);

            var translateX = void 0,
                translateY = void 0;
            if (printType === 'horizontal') {
                var printHeight = 700;
                var printWidth = 1200;

                this.svg.attr('width', printWidth).attr('height', printHeight);
                var printScale = Math.min(1, printWidth / (totalWidthLeft + totalWidthRight), printHeight / totalHeight);
                translateX = totalWidthLeft * printScale;
                translateY = this.margin.top * printScale;
                this.g.attr('transform', 'translate(' + translateX + ', ' + translateY + ') scale(' + printScale + ')');
            } else {
                this.svg.attr('width', totalHeight).attr('height', totalWidthLeft + totalWidthRight);
                translateX = totalHeight - this.margin.top;
                translateY = totalWidthLeft;
                this.g.attr('transform', 'translate(' + translateX + ', ' + translateY + ') rotate(90)');
            }

            d3.select('#left-menu').style('display', 'none');
            d3.select('#main').style('float', 'left');
            d3.selectAll('#main-svg').style('background', 'white');

            window.print();

            this.svg.attr('width', origWidth).attr('height', origHeight);
            this.g.attr('transform', origTransform);
            d3.select('#left-menu').style('display', null);
            d3.select('#main').style('float', null);
            d3.selectAll('#main-svg').style('background', null);
        };

        GenMapper.prototype.redraw = function redraw() {
            var _this5 = this;

            var tree = d3.tree().nodeSize([this.template.settings.nodeSize.width, this.template.settings.nodeSize.height]).separation(function separation(a, b) {
                return a.parent === b.parent ? 1 : 1.2;
            });

            var stratifiedData = d3.stratify()(this.data);
            this.nodes = tree(stratifiedData);

            var link = this.gLinks.selectAll('.link').data(this.nodes.descendants().slice(1));

            link.exit().remove();

            link.enter().append('path').merge(link).attr('class', 'link').attr('d', function (d) {
                return 'M' + d.x + ',' + d.y + 'C' + d.x + ',' + (d.y + (d.parent.y + _templates.boxHeight)) / 2 + ' ' + d.parent.x + ',' + (d.y + (d.parent.y + _templates.boxHeight)) / 2 + ' ' + d.parent.x + ',' + (d.parent.y + _templates.boxHeight);
            });

            var LINK_TEXT_POSITION = 0.3;
            var linkText = this.gLinksText.selectAll('.link-text').data(this.nodes.descendants().slice(1));
            linkText.exit().remove();
            linkText.enter().append('text').merge(linkText).attr('class', function (d) {
                return 'link-text ' + (d.data.active ? ' link-text--active' : ' link-text--inactive');
            }).attr('x', function (d) {
                return d.x * (1 - LINK_TEXT_POSITION) + d.parent.x * LINK_TEXT_POSITION;
            }).attr('y', function (d) {
                return d.y * (1 - LINK_TEXT_POSITION) + (d.parent.y + _templates.boxHeight) * LINK_TEXT_POSITION;
            }).text(function (d) {
                return d.data.coach;
            });

            var node = this.gNodes.selectAll('.node').data(this.nodes.descendants());

            node.exit().remove();

            var newGroup = node.enter().append('g');

            newGroup.append('title').text('Edit group');
            this.appendRemoveButton(newGroup);
            this.appendAddButton(newGroup);

            Object.keys(this.template.svg).forEach(function (svgElement) {
                var svgElementValue = _this5.template.svg[svgElement];
                var element = newGroup.append(svgElementValue['type']);
                element.attr('class', 'node-' + svgElement);
            });

            this.template.fields.forEach(function (field) {
                if (field.svg) {
                    var element = newGroup.append(field.svg['type']);
                    element.attr('class', 'node-' + field.header);
                    Object.keys(field.svg.attributes).forEach(function (attribute) {
                        element.attr(attribute, field.svg.attributes[attribute]);
                    });
                    if (field.svg.style) {
                        Object.keys(field.svg.style).forEach(function (styleKey) {
                            element.style(styleKey, field.svg.style[styleKey]);
                        });
                    }
                }
            });

            var nodeWithNew = node.merge(newGroup);
            nodeWithNew.attr('class', function (d) {
                return 'node' + (d.data.active ? ' node--active' : ' node--inactive');
            }).attr('transform', function (d) {
                return 'translate(' + d.x + ',' + d.y + ')';
            }).on('click', function (d) {
                _this5.popupEditGroupModal(d);
            });

            nodeWithNew.select('.removeNode').on('click', function (d) {
                _this5.removeNode(d);d3.event.stopPropagation();
            });

            nodeWithNew.select('.addNode').on('click', function (d) {
                _this5.addNode(d);d3.event.stopPropagation();
            });

            Object.keys(this.template.svg).forEach(function (svgElement) {
                var svgElementValue = _this5.template.svg[svgElement];
                var element = nodeWithNew.select('.node-' + svgElement).attr('class', 'node-' + svgElement);
                Object.keys(svgElementValue.attributes).forEach(function (attribute) {
                    element.attr(attribute, svgElementValue.attributes[attribute]);
                });
            });

            this.template.fields.forEach(function (field) {
                if (field.svg) {
                    var element = nodeWithNew.select('.node-' + field.header);
                    _this5.updateSvgForFields(field, element);
                }
                if (field.inheritsFrom) {
                    var _element = nodeWithNew.select('.node-' + field.inheritsFrom);
                    _this5.updateFieldWithInherit(field, _element);
                }
            });
        };

        GenMapper.prototype.updateFieldWithInherit = function updateFieldWithInherit(field, element) {
            if (!element.empty()) {
                if (field.type === 'checkbox') this.updateCheckboxField(field, element);
                if (field.type === 'radio') this.updateRadioField(field, element);
            }
        };

        GenMapper.prototype.updateCheckboxField = function updateCheckboxField(field, element) {
            if (field.class) {
                element.attr('class', function (d) {
                    var checked = d.data[field.header];
                    var class_ = checked ? field.class.checkedTrue : field.class.checkedFalse;
                    return this.classList.value + ' ' + class_;
                });
            }
            if (typeof field.attributes !== 'undefined' && typeof field.attributes.rx !== 'undefined') {
                element.attr('rx', function (d) {
                    var checked = d.data[field.header];
                    var rxObj = field.attributes.rx;
                    var rx = checked ? rxObj.checkedTrue : rxObj.checkedFalse;
                    return String(rx);
                });
            }
        };

        GenMapper.prototype.updateRadioField = function updateRadioField(field, element) {
            element.attr('class', function (d) {
                var fieldValue = GenMapper.getFieldValueForRadioType(field, d);
                if (fieldValue.class) {
                    return this.classList.value + ' ' + fieldValue.class;
                } else {
                    return this.classList.value;
                }
            });
            element.attr('rx', function (d) {
                var fieldValue = GenMapper.getFieldValueForRadioType(field, d);
                if (typeof fieldValue.attributes !== 'undefined' && typeof fieldValue.attributes.rx !== 'undefined') {
                    return String(fieldValue.attributes.rx);
                } else {
                    return this.rx.baseVal.valueAsString;
                }
            });
        };

        GenMapper.getFieldValueForRadioType = function getFieldValueForRadioType(field, d) {
            var fieldValue = _.where(field.values, { header: d.data[field.header] })[0];
            if (typeof fieldValue === 'undefined') {
                fieldValue = _.where(field.values, { header: field.initial })[0];
            }
            return fieldValue;
        };

        GenMapper.prototype.updateSvgForFields = function updateSvgForFields(field, element) {
            element.text(function (d) {
                return d.data[field.header];
            });
            if (field.svg.type === 'image') {
                element.style('display', function (d) {
                    return d.data[field.header] ? 'block' : 'none';
                });
            }
        };

        GenMapper.prototype.appendRemoveButton = function appendRemoveButton(group) {
            group.append('g').attr('class', 'removeNode').append('svg').html('<rect x="40" y="0" rx="7" width="25" height="40">' + '<title>Remove group &amp; subtree</title>' + '</rect>' + '<line x1="46" y1="13.5" x2="59" y2="26.5" stroke="white" stroke-width="3"></line>' + '<line x1="59" y1="13.5" x2="46" y2="26.5" stroke="white" stroke-width="3"></line>');
        };

        GenMapper.prototype.appendAddButton = function appendAddButton(group) {
            group.append('g').attr('class', 'addNode').append('svg').html('<rect x="40" y="40" rx="7" width="25" height="40">' + '<title>Add child</title>' + '</rect>' + '<line x1="45" y1="60" x2="60" y2="60" stroke="white" stroke-width="3"></line>' + '<line x1="52.5" y1="52.5" x2="52.5" y2="67.5" stroke="white" stroke-width="3"></line>');
        };

        GenMapper.prototype.addNode = function addNode(d) {
            var newNodeData = {};
            this.template.fields.forEach(function (field) {
                newNodeData[field.header] = field.initial;
            });
            newNodeData['id'] = this.findNewId();
            newNodeData['parentId'] = d.data.id;
            this.data.push(newNodeData);
            this.redraw();
        };

        GenMapper.prototype.findNewId = function findNewId() {
            var ids = _.map(this.data, function (row) {
                return row.id;
            });
            return this.findNewIdFromArray(ids);
        };

        GenMapper.prototype.findNewIdFromArray = function findNewIdFromArray(arr) {
            arr = arr.slice().sort(function (a, b) {
                return a - b;
            });
            var tmp = 0;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] >= 0) {
                    if (arr[i] === tmp) {
                        tmp += 1;
                    } else {
                        break;
                    }
                }
            }
            return tmp;
        };

        GenMapper.prototype.removeNode = function removeNode(d) {
            if (!d.parent) {
                this.displayAlert('Sorry. Deleting root group is not possible.');
            } else {
                var confirmMessage = void 0;
                if (!d.children) {
                    confirmMessage = 'Do you really want to delete ' + d.data.name + '?';
                } else {
                    confirmMessage = 'Do you really want to delete ' + d.data.name + ' and all descendants?';
                }
                if (window.confirm(confirmMessage)) {
                    this.deleteAllDescendants(d);
                    var nodeToDelete = _.where(this.data, { id: d.data.id });
                    if (nodeToDelete) {
                        this.data = _.without(this.data, nodeToDelete[0]);
                    }
                }
            }
            document.getElementById('edit-group').style.display = 'none';
            this.redraw();
        };

        GenMapper.prototype.parseCsvData = function parseCsvData(csvData) {
            var _this6 = this;

            return d3.csvParse(csvData, function (d) {
                var parsedId = parseInt(d.id);
                if (parsedId < 0 || isNaN(parsedId)) {
                    throw new Error('Group id must be integer >= 0.');
                }
                var parsedLine = {};
                parsedLine['id'] = parsedId;
                parsedLine['parentId'] = d.parentId !== '' ? parseInt(d.parentId) : '';
                _this6.template.fields.forEach(function (field) {
                    if (field.type === 'checkbox') {
                        var fieldValue = d[field.header].toUpperCase();
                        parsedLine[field.header] = !!['TRUE', '1'].includes(fieldValue);
                    } else if (field.type) {
                        parsedLine[field.header] = d[field.header];
                    }
                });
                return parsedLine;
            });
        };

        GenMapper.prototype.getCSVOut = function getCSVOut() {
            return d3.csvFormatRows(data.map(function (d, i) {
                var output = [];
                template.fields.forEach(function (field) {
                    if (field.type === 'checkbox') {
                        output.push(d[field.header] ? '1' : '0');
                    } else {
                        output.push(d[field.header]);
                    }
                });
                return output;
            }));
        };

        GenMapper.prototype.outputString = function outputString() {
            return this.csvHeader + this.getCSVOut();
        };

        GenMapper.prototype.outputCsv = function outputCsv() {
            var _this7 = this;

            var out = d3.csvFormatRows(this.data.map(function (d, i) {
                var output = [];
                _this7.template.fields.forEach(function (field) {
                    if (field.type === 'checkbox') {
                        output.push(d[field.header] ? '1' : '0');
                    } else {
                        output.push(d[field.header]);
                    }
                });
                return output;
            }));
            var blob = new Blob([this.csvHeader + out], { type: 'text/csv;charset=utf-8' });
            var isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 && navigator.userAgent && !navigator.userAgent.match('CriOS');
            var promptMessage = isSafari ? 'Save as: \n(Note: Safari browser has issues with export, please see GenMapper -> Help for more info)' : 'Save as:';
            var saveName = window.prompt(promptMessage, this.projectName + '.csv');
            if (saveName === null) return;
            saveAs(blob, saveName);
        };

        GenMapper.prototype.parseTransform = function parseTransform(a) {
            var b = {};
            for (var i in a = a.match(/(\w+\((-?\d+.?\d*e?-?\d*,?)+\))+/g)) {
                var c = a[i].match(/[\w.-]+/g);
                b[c.shift()] = c;
            }
            return b;
        };

        GenMapper.prototype.importFile = function importFile() {
            var _this8 = this;

            this.importFileFromInput('file-input', function (filedata, filename) {
                var parsedCsv = _this8.parseAndValidateCsv(filedata, filename);
                if (parsedCsv === null) {
                    return;
                }
                _this8.data = parsedCsv;
                _this8.redraw();
            });
        };

        GenMapper.prototype.importFileSubtree = function importFileSubtree(d) {
            var _this9 = this;

            if (!window.confirm('Warning: Importing subtreee will overwrite this group (' + d.data.name + ') and all descendants. Do you want to continue?')) {
                return;
            }
            this.importFileFromInput('file-input-subtree', function (filedata, filename) {
                var parsedCsv = _this9.parseAndValidateCsv(filedata, filename);
                if (parsedCsv === null) {
                    return;
                }
                _this9.csvIntoNode(d, parsedCsv);
                _this9.redraw();
                _this9.editGroupElement.style.display = 'none';
            });
        };

        GenMapper.prototype.parseAndValidateCsv = function parseAndValidateCsv(filedata, filename) {
            try {
                var csvString = this.fileToCsvString(filedata, filename);
                var parsedCsv = this.parseCsvData(csvString);
                this.validTree(parsedCsv);
                return parsedCsv;
            } catch (err) {
                this.displayImportError(err);
                return null;
            }
        };

        GenMapper.prototype.validTree = function validTree(parsedCsv) {
            var treeTest = d3.tree();
            var stratifiedDataTest = d3.stratify()(parsedCsv);
            treeTest(stratifiedDataTest);
        };

        GenMapper.prototype.displayImportError = function displayImportError(err) {
            if (err.toString().includes('>= 0.') || err.toString().includes('Wrong type')) {
                this.displayAlert('Error when importing file. <br>' + err.toString());
            } else {
                this.displayAlert('Error when importing file.<br><br>Please check that the file is in correct format' + '(comma separated values), that the root group has no parent, and that all other' + 'relationships make a valid tree.<br><br>Also check that you use the correct version of the App.');
            }
        };

        GenMapper.prototype.deleteAllDescendants = function deleteAllDescendants(d) {
            var idsToDelete = _.map(d.children, function (row) {
                return parseInt(row.id);
            });
            while (idsToDelete.length > 0) {
                var currentId = idsToDelete.pop();
                var childrenIdsToDelete = _.map(_.where(this.data, { parentId: currentId }), function (row) {
                    return row.id;
                });
                idsToDelete = idsToDelete.concat(childrenIdsToDelete);
                var nodeToDelete = _.where(this.data, { id: currentId });
                if (nodeToDelete) {
                    this.data = _.without(this.data, nodeToDelete[0]);
                }
            }
        };

        GenMapper.prototype.csvIntoNode = function csvIntoNode(d, parsedCsv) {
            this.deleteAllDescendants(d);

            var nodeToDelete = _.where(this.data, { id: d.data.id })[0];
            var rowRootOfImported = _.where(parsedCsv, { parentId: '' })[0];
            var mapOldIdToNewId = {};
            mapOldIdToNewId[rowRootOfImported.id] = nodeToDelete.id;
            parsedCsv = _.without(parsedCsv, rowRootOfImported);
            rowRootOfImported.id = nodeToDelete.id;
            rowRootOfImported.parentId = nodeToDelete.parentId;
            this.data[_.indexOf(this.data, nodeToDelete)] = rowRootOfImported;

            var idsUnsorted = _.map(this.data, function (row) {
                return row.id;
            });
            var ids = idsUnsorted.sort(function (a, b) {
                return a - b;
            });

            while (parsedCsv.length > 0) {
                var row = parsedCsv.pop();
                if (!(row.id in mapOldIdToNewId)) {
                    var newId = this.findNewIdFromArray(ids);
                    mapOldIdToNewId[row.id] = newId;
                    ids.push(newId);
                }
                if (!(row.parentId in mapOldIdToNewId)) {
                    var _newId = this.findNewIdFromArray(ids);
                    mapOldIdToNewId[row.parentId] = _newId;
                    ids.push(_newId);
                }

                row.id = mapOldIdToNewId[row.id];
                row.parentId = mapOldIdToNewId[row.parentId];
                this.data.push(row);
            }
        };

        GenMapper.prototype.importFileFromInput = function importFileFromInput(fileInputElementId, callback) {
            if (typeof window.FileReader !== 'function') {
                this.displayAlert("The file API isn't supported on this browser yet.");
                return;
            }

            var input = document.getElementById(fileInputElementId);
            if (!input) {
                this.displayAlert("Um, couldn't find the fileinput element.");
            } else if (!input.files) {
                this.displayAlert("This browser doesn't seem to support the 'files' property of file inputs.");
            } else if (!input.files[0]) {
                this.displayAlert('Please select a file');
            } else {
                var file = input.files[0];
                var filename = file.name;
                var fr = new FileReader();
                fr.onload = function () {
                    var filedata = fr.result;
                    callback(filedata, filename);
                };
                var extension = /(?:\.([^.]+))?$/.exec(filename)[1];
                if (extension === 'csv') {
                    fr.readAsText(file);
                } else {
                    fr.readAsBinaryString(file);
                }
            }
        };

        GenMapper.prototype.fileToCsvString = function fileToCsvString(filedata, filename) {
            var regex = /(?:\.([^.]+))?$/;
            var extension = regex.exec(filename)[1].toLowerCase();
            var csvString = void 0;

            if (extension === 'xls' || extension === 'xlsx') {
                var workbook = XLSX.read(filedata, { type: 'binary' });
                var worksheet = workbook.Sheets[workbook.SheetNames[0]];
                csvString = XLSX.utils.sheet_to_csv(worksheet);
            } else if (extension === 'csv') {
                csvString = filedata;
            } else {
                throw new Error('Wrong type of file. Please import xls, xlsx or csv files.');
            }
            csvString = csvString.replace(/\r\n?/g, '\n');

            return this.csvHeader + csvString.substring(csvString.indexOf('\n') + 1);
        };

        GenMapper.prototype.addFieldsToEditWindow = function addFieldsToEditWindow() {
            this.template.fields.forEach(function (field) {
                if (field.type) {
                    var tr = d3.select('#edit-group-content').select('form').select('table').append('tr');

                    tr.append('td').text(field.description + ':').attr('class', 'left-field');

                    var td = tr.append('td').attr('class', 'right-field');
                    if (field.type === 'radio') {
                        for (var _iterator = field.values, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                            var _ref;

                            if (_isArray) {
                                if (_i >= _iterator.length) break;
                                _ref = _iterator[_i++];
                            } else {
                                _i = _iterator.next();
                                if (_i.done) break;
                                _ref = _i.value;
                            }

                            var value = _ref;

                            td.append('input').attr('type', field.type).attr('name', field.header).attr('value', value.header).attr('id', 'edit-' + field.header + '-' + value.header);
                            td.append('span').html(value.description);
                            td.append('br');
                        }
                    } else {
                        td.append('input').attr('type', field.type).attr('name', field.header).attr('id', 'edit-' + field.header);
                    }
                }
            });
        };

        return GenMapper;
    }(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'templateFormat', [_aureliaFramework.observable], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'templateContent', [_aureliaFramework.observable], {
        enumerable: true,
        initializer: null
    })), _class);
});
define('components/map/map',['exports', 'services/fileservice', 'aurelia-framework', './genmapper'], function (exports, _fileservice, _aureliaFramework, _genmapper) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.MapViewModel = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var MapViewModel = exports.MapViewModel = (_dec = (0, _aureliaFramework.inject)(_fileservice.FileService, _aureliaFramework.Factory.of(_genmapper.GenMapper)), _dec(_class = function () {
        function MapViewModel(fileService, GenMapper) {
            _classCallCheck(this, MapViewModel);

            this.fileService = fileService;
            this.GenMapper = GenMapper;
        }

        MapViewModel.prototype.activate = function activate(params) {
            this.format = params.type;
            this.model = this.fileService.current;

            this.genmapper = this.GenMapper({
                model: this.model,
                format: this.format
            });
        };

        MapViewModel.prototype.save = function save() {
            var content = this.genmapper.outputString();

            console.log(content);
        };

        return MapViewModel;
    }()) || _class);
});
define('components/map/templates',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var boxHeight = 80;
  var textHeight = 14;
  var textMargin = 6;

  var CHURCH_CIRCLES = {
    'name': 'Church circles 0.4',
    'settings': {
      'nodeSize': {
        'width': boxHeight * 1.5,
        'height': boxHeight * 2.1
      }
    },
    'svg': {
      'big-rect': {
        'type': 'rect',
        'attributes': {
          'x': -boxHeight / 2,
          'y': 0,
          'width': boxHeight,
          'height': boxHeight,
          'opacity': '0'
        }
      },
      'attenders-image': {
        'type': 'image',
        'attributes': {
          'x': -boxHeight * 0.5,
          'y': -2.5 * textHeight,
          'width': boxHeight / 4,
          'height': boxHeight / 4,
          'href': 'icons/attenders.png'
        }
      },
      'believers-image': {
        'type': 'image',
        'attributes': {
          'x': -boxHeight * 0.25,
          'y': -2.5 * textHeight,
          'width': boxHeight / 4,
          'height': boxHeight / 4,
          'href': 'icons/believers.png'
        }
      },
      'baptized-image': {
        'type': 'image',
        'attributes': {
          'x': boxHeight * 0.1,
          'y': -2.5 * textHeight,
          'width': boxHeight / 4,
          'height': boxHeight / 4,
          'href': 'icons/element-baptism.png'
        }
      },
      'church-box': {
        'type': 'rect',
        'attributes': {
          'x': -boxHeight / 2,
          'y': 0,
          'rx': 0.5 * boxHeight,
          'width': boxHeight,
          'height': boxHeight
        }
      }
    },
    'fields': [{
      'header': 'id',
      'initial': 0,
      'description': 'Id',
      'type': null
    }, {
      'header': 'parentId',
      'initial': null,
      'description': 'Parent',
      'type': null
    }, {
      'header': 'name',
      'initial': "Leader's Name",
      'description': "Leader's Name",
      'type': 'text',
      'svg': {
        'type': 'text',
        'attributes': {
          'x': 0,
          'y': boxHeight + textHeight
        }
      }
    }, {
      'header': 'email',
      'initial': null,
      'description': 'Email',
      'type': 'text'
    }, {
      'header': 'link',
      'initial': null,
      'description': 'Link',
      'type': 'text'
    }, {
      'header': 'attenders',
      'initial': 0,
      'description': '# of Attenders',
      'type': 'text',
      'svg': {
        'type': 'text',
        'attributes': {
          'x': -boxHeight * 0.39,
          'y': -0.5 * textMargin
        },
        'style': {
          'text-anchor': 'center'
        }
      }
    }, {
      'header': 'believers',
      'initial': 0,
      'description': '# of Believers',
      'type': 'text',
      'svg': {
        'type': 'text',
        'attributes': {
          'x': -boxHeight * 0.13,
          'y': -0.5 * textMargin
        },
        'style': {
          'text-anchor': 'center'
        }
      }
    }, {
      'header': 'baptized',
      'initial': 0,
      'description': '# of Baptized',
      'type': 'text',
      'svg': {
        'type': 'text',
        'attributes': {
          'x': boxHeight * 0.13,
          'y': -0.5 * textMargin
        },
        'style': {
          'text-anchor': 'center'
        }
      }
    }, {
      'header': 'newlyBaptized',
      'initial': 0,
      'description': '# of New Baptized (since church start)',
      'type': 'text',
      'svg': {
        'type': 'text',
        'attributes': {
          'x': boxHeight * 0.39,
          'y': -0.5 * textMargin
        },
        'style': {
          'text-anchor': 'center'
        }
      }
    }, {
      'header': 'church',
      'initial': false,
      'description': 'Is church?',
      'type': 'checkbox',
      'inheritsFrom': 'church-box',
      'class': {
        'checkedTrue': 'is-church',
        'checkedFalse': 'is-not-church'
      }
    }, {
      'header': 'churchType',
      'initial': 'newBelievers',
      'description': 'Church Type',
      'type': 'radio',
      'inheritsFrom': 'church-box',
      'values': [{
        'header': 'legacy',
        'description': 'Legacy',
        'class': 'church-legacy',
        'attributes': {
          'rx': 0
        }
      }, {
        'header': 'existingBelievers',
        'description': 'Existing Believers',
        'attributes': {
          'rx': 0
        }
      }, {
        'header': 'newBelievers',
        'description': 'New Believers'
      }]
    }, {
      'header': 'elementBaptism',
      'initial': false,
      'description': 'Element: Baptism',
      'type': 'checkbox',
      'svg': {
        'type': 'image',
        'attributes': {
          'x': -boxHeight * 0.4,
          'y': boxHeight * 0.1,
          'width': boxHeight / 4,
          'height': boxHeight / 4,
          'xlink:href': 'icons/element-baptism.png'
        }
      }
    }, {
      'header': 'elementWord',
      'initial': false,
      'description': "Element: God's Word",
      'type': 'checkbox',
      'svg': {
        'type': 'image',
        'attributes': {
          'x': -boxHeight * 0.125,
          'y': boxHeight * 0.1,
          'width': boxHeight / 4,
          'height': boxHeight / 4,
          'xlink:href': 'icons/element-word.png'
        }
      }
    }, {
      'header': 'elementPrayer',
      'initial': false,
      'description': 'Element: Prayer',
      'type': 'checkbox',
      'svg': {
        'type': 'image',
        'attributes': {
          'x': boxHeight * 0.15,
          'y': boxHeight * 0.1,
          'width': boxHeight / 4,
          'height': boxHeight / 4,
          'xlink:href': 'icons/element-prayer.png'
        }
      }
    }, {
      'header': 'elementLordsSupper',
      'initial': false,
      'description': "Element: Lord's supper",
      'type': 'checkbox',
      'svg': {
        'type': 'image',
        'attributes': {
          'x': -boxHeight * 0.4,
          'y': boxHeight * 0.375,
          'width': boxHeight / 4,
          'height': boxHeight / 4,
          'xlink:href': 'icons/element-lords-supper.png'
        }
      }
    }, {
      'header': 'elementGive',
      'initial': false,
      'description': 'Element: Giving',
      'type': 'checkbox',
      'svg': {
        'type': 'image',
        'attributes': {
          'x': -boxHeight * 0.125,
          'y': boxHeight * 0.375,
          'width': boxHeight / 4,
          'height': boxHeight / 4,
          'xlink:href': 'icons/element-give.png'
        }
      }
    }, {
      'header': 'elementLove',
      'initial': false,
      'description': 'Element: Love',
      'type': 'checkbox',
      'svg': {
        'type': 'image',
        'attributes': {
          'x': boxHeight * 0.15,
          'y': boxHeight * 0.375,
          'width': boxHeight / 4,
          'height': boxHeight / 4,
          'xlink:href': 'icons/element-love.png'
        }
      }
    }, {
      'header': 'elementWorship',
      'initial': false,
      'description': 'Element: Worship',
      'type': 'checkbox',
      'svg': {
        'type': 'image',
        'attributes': {
          'x': -boxHeight * 0.4,
          'y': boxHeight * 0.65,
          'width': boxHeight / 4,
          'height': boxHeight / 4,
          'xlink:href': 'icons/element-worship.png'
        }
      }
    }, {
      'header': 'elementLeaders',
      'initial': false,
      'description': 'Element: Leaders',
      'type': 'checkbox',
      'svg': {
        'type': 'image',
        'attributes': {
          'x': -boxHeight * 0.125,
          'y': boxHeight * 0.65,
          'width': boxHeight / 4,
          'height': boxHeight / 4,
          'xlink:href': 'icons/element-leaders.png'
        }
      }
    }, {
      'header': 'elementMakeDisciples',
      'initial': false,
      'description': 'Element: Make disciples',
      'type': 'checkbox',
      'svg': {
        'type': 'image',
        'attributes': {
          'x': boxHeight * 0.15,
          'y': boxHeight * 0.65,
          'width': boxHeight / 4,
          'height': boxHeight / 4,
          'xlink:href': 'icons/element-make-disciples.png'
        }
      }
    }, {
      'header': 'place',
      'initial': 'Place',
      'description': 'Place',
      'type': 'text',
      'svg': {
        'type': 'text',
        'attributes': {
          'x': 0,
          'y': boxHeight + 2 * textHeight
        }
      }
    }, {
      'header': 'date',
      'initial': 'Date',
      'description': 'Date of Start (Finish)',
      'type': 'text',
      'svg': {
        'type': 'text',
        'attributes': {
          'x': 0,
          'y': boxHeight + 3 * textHeight
        }
      }
    }, {
      'header': 'threeThirds',
      'initial': '1234567',
      'description': 'Elements of 3/3 process (see help for details)',
      'type': 'text',
      'svg': {
        'type': 'text',
        'attributes': {
          'x': boxHeight * -0.7,
          'y': boxHeight * 0.6,
          'transform': 'rotate(90 -56 48)',
          'rotate': -90
        },
        'style': {
          'text-anchor': 'center',
          'letter-spacing': '0.35em'
        }
      }
    }, {
      'header': 'active',
      'initial': true,
      'description': 'Active',
      'type': 'checkbox'
    }]
  };

  exports.CHURCH_CIRCLES = CHURCH_CIRCLES;
  exports.boxHeight = boxHeight;
  exports.textHeight = textHeight;
  exports.textMargin = textMargin;
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
define('views/tool/tool',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Tool = undefined;

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

  var _desc, _value, _class, _descriptor;

  var Tool = exports.Tool = (_class = function () {
    function Tool() {
      _classCallCheck(this, Tool);

      this.canPersist = true;

      _initDefineProp(this, 'title', _descriptor, this);

      this.loaded = '';
      this.editorDirty = false;
      this.titleDirty = false;
      this.content = '';
    }

    Tool.prototype.titleChanged = function titleChanged() {
      this.titleDirty = this.loaded !== this.title;
    };

    Tool.prototype.save = function save() {};

    Tool.prototype.load = function load() {};

    _createClass(Tool, [{
      key: 'dirty',
      get: function get() {
        return this.editorDirty || this.titleDirty;
      }
    }]);

    return Tool;
  }(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'title', [_aureliaFramework.observable], {
    enumerable: true,
    initializer: function initializer() {
      return '';
    }
  })), _class);
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"./app.css\"></require><header></header><router-view class=\"${router.currentInstruction.config.name}\"></router-view></template>"; });
define('text!components/documents/documents.html', ['module'], function(module) { module.exports = "<template><div class=\"document-list\"><table><thead><tr><th>Name</th><th><button click.delegate=\"createDocument()\">Add</button></th></tr></thead><tbody><tr repeat.for=\"doc of fileService.list\"><td><input type=\"text\" value.bind=\"doc.title\" placeholder=\"Doc Name\" change.delegate=\"saveDoc(doc)\"></td><td><button click.delegate=\"loadDoc(doc)\">Load</button> <button click.delegate=\"removeDocument(doc)\">Remove</button></td></tr></tbody></table></div></template>"; });
define('text!app.css', ['module'], function(module) { module.exports = "@font-face {\n  font-family: 'Interface';\n  font-style: normal;\n  font-weight: 400;\n  src: url(\"assets/Interface-Regular.woff2?v=1.1\") format(\"woff2\"), url(\"assets/Interface-Regular.woff?v=1.1\") format(\"woff\"); }\n\n@font-face {\n  font-family: 'Interface';\n  font-style: italic;\n  font-weight: 400;\n  src: url(\"assets/Interface-RegularItalic.woff2?v=1.1\") format(\"woff2\"), url(\"assets/Interface-RegularItalic.woff?v=1.1\") format(\"woff\"); }\n\n@font-face {\n  font-family: 'Interface';\n  font-style: normal;\n  font-weight: 500;\n  src: url(\"assets/Interface-Medium.woff2?v=1.1\") format(\"woff2\"), url(\"assets/Interface-Medium.woff?v=1.1\") format(\"woff\"); }\n\n@font-face {\n  font-family: 'Interface';\n  font-style: italic;\n  font-weight: 500;\n  src: url(\"assets/Interface-MediumItalic.woff2?v=1.1\") format(\"woff2\"), url(\"assets/Interface-MediumItalic.woff?v=1.1\") format(\"woff\"); }\n\n@font-face {\n  font-family: 'Interface';\n  font-style: normal;\n  font-weight: 700;\n  src: url(\"assets/Interface-Bold.woff2?v=1.1\") format(\"woff2\"), url(\"assets/Interface-Bold.woff?v=1.1\") format(\"woff\"); }\n\n@font-face {\n  font-family: 'Interface';\n  font-style: italic;\n  font-weight: 700;\n  src: url(\"assets/Interface-BoldItalic.woff2?v=1.1\") format(\"woff2\"), url(\"assets/Interface-BoldItalic.woff?v=1.1\") format(\"woff\"); }\n\n.contained, .home__categories {\n  max-width: 65rem;\n  margin: 0 auto; }\n\n.row, .home, .home__categories, .home-category__header, .home-category__tools, .tool, .tool-sidebar__nav, .tool-nav {\n  display: flex;\n  flex-direction: row; }\n\n.col, .tool-main {\n  display: flex;\n  flex-direction: column; }\n\n.f1, .home-category, .tool-main, .tool-view {\n  flex: 1 0 auto; }\n\n.aic, .home, .tool-sidebar__nav, .tool-nav {\n  align-items: center; }\n\n.jcc, .tool-sidebar__nav {\n  justify-content: center; }\n\nicon {\n  height: 24px;\n  width: 24px;\n  display: inline-block;\n  margin: 12px; }\n\n/*\n * Blocks:\n * .home\n * .home-category\n * .home-tool\n */\n.home__categories {\n  flex-wrap: wrap;\n  padding-bottom: 4rem; }\n\n.home-category {\n  margin: 1rem;\n  min-width: 26rem; }\n  .home-category__header {\n    border-bottom: 1px solid #DDD;\n    padding: 0.5rem;\n    align-items: flex-end; }\n  .home-category__name {\n    font-size: 2rem;\n    font-weight: bold;\n    color: #444;\n    font-family: Interface; }\n  .home-category__browse {\n    margin-left: auto;\n    text-decoration: none;\n    font-size: 0.7rem;\n    color: #009EEB;\n    transition: opacity 100ms ease;\n    opacity: 0; }\n  .home-category:hover .home-category__browse {\n    opacity: 1; }\n  .home-category__tools {\n    justify-content: space-around; }\n\n.home-tool {\n  padding: 1rem;\n  margin-top: 0.5rem;\n  border: 2px solid #EEE;\n  border-radius: 4px;\n  cursor: pointer;\n  transition: border 100ms ease;\n  text-decoration: none; }\n  .home-tool:hover {\n    border: 2px solid #FF9E7C; }\n  .home-tool__image {\n    min-height: 7rem;\n    max-height: 7rem;\n    min-width: 7rem;\n    max-width: 7rem;\n    border: 1px solid #DDD;\n    background: #F5F5F5;\n    background-position: center;\n    background-size: cover; }\n  .home-tool__meta {\n    padding-top: 1rem;\n    text-align: center;\n    font-size: 0.9rem;\n    max-width: 7rem;\n    color: #333; }\n  .home-tool__name {\n    font-family: Interface; }\n\n@media only screen and (max-width: 840px) {\n  .home {\n    align-items: flex-start; }\n    .home__categories {\n      padding-bottom: 0; }\n  .home-category {\n    margin: 1rem 0; }\n    .home-category__browse {\n      opacity: 1; } }\n\n@media only screen and (max-width: 500px) {\n  .home-tool__image {\n    min-height: 5rem;\n    max-height: 5rem;\n    min-width: 5rem;\n    max-width: 5rem; }\n  .home-tool__meta {\n    max-width: 5rem; } }\n\n/*\n * Blocks:\n * .tool\n * .tool-sidebar\n * .tool-main\n * .tool-main-nav\n * .tool-main-view\n */\n.tool-sidebar {\n  width: 20rem;\n  border-right: 1px solid #E0E6ED; }\n  .tool-sidebar__nav {\n    height: 4rem;\n    border-bottom: 1px solid #E0E6ED; }\n  .tool-sidebar__logo {\n    font-family: Interface, sans-serif;\n    font-weight: 600;\n    font-size: 1.4rem;\n    color: #FF5216; }\n\n.button, .tool-nav__save {\n  background: #13CE66;\n  color: white;\n  cursor: pointer;\n  padding: 0.8rem 1.5rem;\n  border-radius: 4px;\n  border: none;\n  font-size: 0.9rem;\n  box-shadow: inset 0 -3px 0 rgba(31, 45, 61, 0.15);\n  outline: none;\n  transition: box-shadow 100ms ease; }\n  .button:hover, .tool-nav__save:hover, .button:focus, .tool-nav__save:focus {\n    box-shadow: none; }\n  .button:disabled, .tool-nav__save:disabled {\n    background: #E5E9F2;\n    color: #555;\n    cursor: not-allowed; }\n    .button:disabled:hover, .tool-nav__save:disabled:hover {\n      box-shadow: inset 0 -3px 0 rgba(31, 45, 61, 0.15); }\n\n.tool-nav {\n  border-bottom: 1px solid #E0E6ED;\n  height: 4rem;\n  padding: 0 1rem; }\n  .tool-nav__title {\n    padding: 0.5rem;\n    font-size: 1.1rem;\n    border: 2px dashed #E0E6ED;\n    outline: none;\n    text-overflow: ellipsis;\n    transition: all 100ms ease; }\n    .tool-nav__title::placeholder {\n      color: #D3DCE6; }\n    .tool-nav__title:hover {\n      border: 2px solid #E0E6ED; }\n    .tool-nav__title:focus {\n      border: 2px solid #85D7FF; }\n  .tool-nav__actions {\n    margin-left: auto; }\n\nhtml, body {\n  min-height: 100vh;\n  min-width: 100vw;\n  max-height: 100vh;\n  max-width: 100vw;\n  position: relative;\n  font: 15px sans-serif;\n  margin: 0;\n  padding: 0;\n  user-select: none; }\n\nbody {\n  display: flex;\n  flex-direction: column; }\n\nrouter-view {\n  flex: 1 0 auto; }\n"; });
define('text!components/editor/editor.html', ['module'], function(module) { module.exports = "<template><require from=\"./editor.css\"></require><div class=\"nav border-bottom-smoke\"><div class=\"left border-right-smoke col\"><div class=\"logo f1\">GenMapper</div></div><div class=\"right row\"><div class=\"meta f1\"><input class=\"title\" placeholder=\"Document Name\" value.bind=\"currentDoc.title\"></div><div class=\"actions row\"><button if.bind=\"loadedDoc\" disabled.bind=\"!isDirty\" click.trigger=\"save()\" class=\"button\">Save</button> <button if.bind=\"!loadedDoc\" disabled.bind=\"!canCreate\" click.trigger=\"create()\" class=\"button\">Create</button><div class=\"dropdown\"><icon name=\"down\"></icon></div></div></div></div><div class=\"main\"><div class=\"left sidebar col border-right-smoke\"><div class=\"actions row\"><div click.trigger=\"importFile()\" class=\"import border-right-snow f1\"><icon name=\"paperclip\"></icon></div><div click.trigger=\"startNew()\" class=\"create f1\"><icon name=\"add\"></icon></div></div><div if.bind=\"empty\" class=\"f1 emptyPlaceholder\"><div class=\"message\">You don't have any documents! Try importing or creating one using the buttons above</div></div><div if.bind=\"!empty\" class=\"f1 documents\"><div class=\"document row border-bottom-snow ${currentDoc.id === doc.id ? 'active' : ''}\" repeat.for=\"doc of docs\" click.trigger=\"setDoc(doc.id)\"><div class=\"meta f1 col\"><div class=\"title\">${doc.title}</div><div class=\"format\">${doc.format}</div></div><div class=\"actions\"><icon click.trigger=\"delete(doc.id, $event)\" class=\"delete\" name=\"delete\"></icon></div></div></div></div><div class=\"right content\"><textarea value.bind=\"currentDoc.content\" rows=\"20\" cols=\"80\"></textarea></div></div></template>"; });
define('text!components/genmap/genmap.html', ['module'], function(module) { module.exports = "<template><require from=\"components/genmapper.css\"></require><aside><h3>${mapType}</h3><ul class=\"list\"><li><a href=\"#/genmapper/${mapType}/map\">Map</a></li><li><a href=\"#/genmapper/${mapType}/documents\">Documents</a></li><li><a href=\"#/genmapper/${mapType}/import\">Import</a></li><li><a href=\"\">Export</a></li></ul></aside><main style=\"transform:translateX(200px)\"><router-view containerless></router-view></main></template>"; });
define('text!components/icon/icon.html', ['module'], function(module) { module.exports = "<template></template>"; });
define('text!components/login/login.html', ['module'], function(module) { module.exports = "<template><form ref=\"form\"><input type=\"email\" name=\"email\" value.bind=\"email\" id=\"email\" placeholder=\"Email\"> <input type=\"password\" name=\"password\" value.bind=\"password\" id=\"password\" placeholder=\"Password\"> <button click.delegate=\"onSubmit($event)\">Login</button></form></template>"; });
define('text!components/map/genmapper.html', ['module'], function(module) { module.exports = "<template><div id=\"content\"><aside style=\"display:none\" id=\"left-menu\"></aside><section id=\"intro\"><div id=\"intro-content\"><h2>GenMapper <span id=\"version\"></span> Help</h2><p>Hello, this app should serve for mapping generations of simple churches. I pray it serves you to advance Jesus' kingdom.</p><img src=\"scripts/assets/genmapper-node-example-church-circles.png\" style=\"float:right;margin:10px;margin-left:0\" alt=\"legend\"><h3>Legend</h3><p>Each circle represents a group / church. Dashed circle means group, full circle means church.<br>On the top the numbers describe: # total, # believers, # baptized<br>Inside the circle are the elements that are practiced in the group.<br>On the left there numbers 1 to 7 represent which elements of 3/3 process are practised:<br>1 - Personal care 2 - Worship 3 - Accountability 4 - Vision casting 5 - Bible study 6 - Practice 7 - Set goals and prayer</p><p>Click on the group to edit it.<br>Click on red button to remove group.<br>Click on green button to add child group.</p><h3>Import / Export</h3><p>Note: If you don't export, all changes will be lost when refreshing or closing page.<br>You can import a .xlsx or .xls (MS Excel) or .csv (Comma separated values) files.<br>You can also import a subtree by clicking a given group and then using the 'Import Subtree' button.<br>Export is currently available only to .csv format.<br><strong>Note:</strong> Some versions of Safari have problems with export to csv. If a new tab with blob is opened instead of file downloaded (see example below) <img src=\"scripts/assets/safari-export-issue-0.png\" style=\"margin:10px;margin-left:0\" alt=\"safari export issue\"><br>press Cmd + S, then enter a filename ending .csv, select Format: Page Source, and finally click Save. <img src=\"scripts/assets/safari-export-issue-1.png\" style=\"margin:10px;margin-left:0\" alt=\"safari export issue\"><br>For Export to PDF, use the Print buttons and then save as PDF in Chrome or Safari.</p><h3>Panning / Zooming</h3><p>You can pan by draging the map and zoom by mouse wheel or using buttons on the left.</p><h3>Changelog</h3><p>See <a href=\"https://github.com/dvopalecky/gen-mapper/blob/master/changelog.md\">here</a></p><h3>Credits</h3><p>Thanks to Curtis Sergeant for the idea of generational mapping and for providing useful feedback.<br>JavaScript libraries used: <a href=\"https://d3js.org\">d3.js</a>, <a href=\"https://github.com/eligrey/FileSaver.js/\">FileSaver.js</a>, <a href=\"https://github.com/SheetJS/js-xlsx\">js-xlsx</a> and <a href=\"http://underscorejs.org/\">Underscore.js</a><br><br>Copyright (c) 2016 - 2017 Daniel Vopalecky<br>Licensed with MIT Licence<br><a href=\"https://github.com/dvopalecky/gen-mapper\">Github repository</a><br>Please send suggestions and bugs to daniel.vopalecky@seznam.cz</p><button onclick=\"introSwitchVisibility()\">OK, let's start!</button></div></section><section id=\"alert-message\"></section><section id=\"edit-group\"></section><section id=\"main\"><svg id=\"main-svg\" width=\"100%\"></svg></section></div></template>"; });
define('text!components/map/map.html', ['module'], function(module) { module.exports = "<template><header class=\"navbar\"><icon name=\"arrow-back\"></icon><input type=\"text\" value.bind=\"currentDocument.title\" placeholder=\"Document Name\"> <button click.delegate=\"save()\">Save</button></header><compose view-model.bind=\"genmapper\"></compose></template>"; });
define('text!components/mapvarients/mapvarients.html', ['module'], function(module) { module.exports = "<template><require from=\"../genmapper.css\"></require><div style=\"text-align:center\"><h1>GenMapper</h1><p>Hello, this app should serve for mapping generations of simple churches.<br>I pray it serves you to advance Jesus' kingdom.</p><p>Please select gen map variant:</p><section style=\"max-width:900px;margin:0 auto;display:flex\"><div style=\"margin:20px;flex-grow:1;flex-shrink:1;padding:10px\"><a class=\"btn\" href=\"#/genmapper/four-fields\">Four Fields </a><img src=\"scripts/assets/gen-mapper-example1.png\" height=\"400\" alt=\"four-fields\"></div><div style=\"margin:20px;flex-grow:1;flex-shrink:1;padding:10px\"><a class=\"btn\" href=\"#/genmapper/church-circles\">Church Circles </a><img src=\"scripts/assets/gen-mapper-example-church-circles.png\" height=\"400\" alt=\"church-circles\"></div></section><h3>Other</h3><p><a href=\"church-circles-czech/index.html\">Church circles Czech</a></p><p><a href=\"movementeer/index.html\">MOVEMENTeer</a></p></div></template>"; });
define('text!components/signup/signup.html', ['module'], function(module) { module.exports = ""; });
define('text!components/texteditor/texteditor.html', ['module'], function(module) { module.exports = "<template><textarea value.bind=\"_content\" rows=\"40\" cols=\"80\"></textarea> ${dirty} </template>"; });
define('text!views/category/category.html', ['module'], function(module) { module.exports = "<template><h1>Category</h1></template>"; });
define('text!views/home/home.html', ['module'], function(module) { module.exports = "<template><div class=\"home__categories\"><div class=\"home-category\" repeat.for=\"category of categories\"><div class=\"home-category__header\"><div class=\"home-category__name\">${category.name}</div><a class=\"home-category__browse\" href=\"#/categories/${$index}\">See All ▸</a></div><div class=\"home-category__tools\"><a class=\"home-tool\" repeat.for=\"tool of category.tools\" href=\"#/tools/${$index}\"><div class=\"home-tool__image\" css=\"background-image: url('${tool.image}')\"></div><div class=\"home-tool__meta\"><div class=\"home-tool__name\">${tool.name}</div></div></a></div></div></div></template>"; });
define('text!views/tool/tool.html', ['module'], function(module) { module.exports = "<template><div class=\"tool-sidebar\" if.bind=\"canPersist\"><div class=\"tool-sidebar__nav\"><div class=\"tool-sidebar__logo\">GenMapper</div></div><div class=\"tool-documents\"></div></div><div class=\"tool-main\"><div class=\"tool-nav\" if.bind=\"canPersist\"><input class=\"tool-nav__title\" placeholder=\"Document Name\" value.bind=\"title\"><div class=\"tool-nav__actions\"><button class=\"tool-nav__save\" disabled.bind=\"!dirty\" click.trigger=\"save()\">Save</button></div></div><div class=\"tool-view\"><require from=\"components/texteditor/texteditor\"></require><texteditor dirty.bind=\"editorDirty\" content.bind=\"content\"></texteditor></div></div></template>"; });
//# sourceMappingURL=app-bundle.js.map