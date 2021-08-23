"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_views_component_Sample_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/views/component/Sample.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/views/component/Sample.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _js_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../js/auth */ "./resources/js/auth.js");
/* harmony import */ var _js_session__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../js/session */ "./resources/js/session.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      invalid: false,
      username: '',
      password: ''
    };
  },
  methods: {
    login: function login() {
      var _this = this;

      _js_auth__WEBPACK_IMPORTED_MODULE_0__.default.login(this.username, this.password).then(function (res) {
        if (res.status === 200 && res.statusText === 'OK') {
          _js_session__WEBPACK_IMPORTED_MODULE_1__.default.setToken(res.data.access_token);

          _this.$router.push({
            name: 'dashboard'
          });
        }
      })["catch"](function (err) {
        _this.invalid = true;
        _this.username = '';
        _this.password = '';
      })["finally"](function () {});
    }
  },
  beforeCreate: function beforeCreate() {
    if (_js_session__WEBPACK_IMPORTED_MODULE_1__.default.getAuth()) {
      this.$router.push({
        name: 'dashboard'
      });
    }
  }
});

/***/ }),

/***/ "./resources/views/component/Sample.vue":
/*!**********************************************!*\
  !*** ./resources/views/component/Sample.vue ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Sample_vue_vue_type_template_id_5dd41bd5___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sample.vue?vue&type=template&id=5dd41bd5& */ "./resources/views/component/Sample.vue?vue&type=template&id=5dd41bd5&");
/* harmony import */ var _Sample_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Sample.vue?vue&type=script&lang=js& */ "./resources/views/component/Sample.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _Sample_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _Sample_vue_vue_type_template_id_5dd41bd5___WEBPACK_IMPORTED_MODULE_0__.render,
  _Sample_vue_vue_type_template_id_5dd41bd5___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/views/component/Sample.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/views/component/Sample.vue?vue&type=script&lang=js&":
/*!***********************************************************************!*\
  !*** ./resources/views/component/Sample.vue?vue&type=script&lang=js& ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sample_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Sample.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/views/component/Sample.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sample_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/views/component/Sample.vue?vue&type=template&id=5dd41bd5&":
/*!*****************************************************************************!*\
  !*** ./resources/views/component/Sample.vue?vue&type=template&id=5dd41bd5& ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Sample_vue_vue_type_template_id_5dd41bd5___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Sample_vue_vue_type_template_id_5dd41bd5___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Sample_vue_vue_type_template_id_5dd41bd5___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Sample.vue?vue&type=template&id=5dd41bd5& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/views/component/Sample.vue?vue&type=template&id=5dd41bd5&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/views/component/Sample.vue?vue&type=template&id=5dd41bd5&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/views/component/Sample.vue?vue&type=template&id=5dd41bd5& ***!
  \********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-app",
    [
      _c(
        "v-container",
        [
          _c(
            "v-row",
            { attrs: { justify: "center" } },
            [
              _c(
                "v-col",
                { attrs: { sm: "6", xl: "4" } },
                [
                  _c(
                    "v-sheet",
                    {
                      staticClass: "pa-5",
                      attrs: { elevation: "6", rounded: "" }
                    },
                    [
                      _c(
                        "v-form",
                        {
                          on: {
                            submit: function($event) {
                              $event.preventDefault()
                              return _vm.login.apply(null, arguments)
                            }
                          }
                        },
                        [
                          _c(
                            "v-row",
                            [
                              _c(
                                "v-col",
                                [
                                  _vm.invalid
                                    ? _c(
                                        "v-alert",
                                        {
                                          attrs: {
                                            color: "red",
                                            dense: "",
                                            dismissible: "",
                                            type: "error"
                                          }
                                        },
                                        [
                                          _vm._v(
                                            "\n                  Invalid Login\n                "
                                          )
                                        ]
                                      )
                                    : _vm._e()
                                ],
                                1
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-row",
                            [
                              _c("v-col", [
                                _c("div", { staticClass: "text-h4" }, [
                                  _vm._v("Login")
                                ])
                              ])
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-row",
                            [
                              _c(
                                "v-col",
                                [
                                  _c(
                                    "v-row",
                                    [
                                      _c(
                                        "v-col",
                                        [
                                          _c("v-text-field", {
                                            attrs: {
                                              label: "Username",
                                              outlined: ""
                                            },
                                            model: {
                                              value: _vm.username,
                                              callback: function($$v) {
                                                _vm.username = $$v
                                              },
                                              expression: "username"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-row",
                                    { staticClass: "mt-n5" },
                                    [
                                      _c(
                                        "v-col",
                                        [
                                          _c("v-text-field", {
                                            attrs: {
                                              label: "Password",
                                              type: "password",
                                              outlined: ""
                                            },
                                            model: {
                                              value: _vm.password,
                                              callback: function($$v) {
                                                _vm.password = $$v
                                              },
                                              expression: "password"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-row",
                                    { staticClass: "mt-n5" },
                                    [
                                      _c(
                                        "v-btn",
                                        {
                                          attrs: {
                                            type: "submit",
                                            color: "primary",
                                            block: ""
                                          }
                                        },
                                        [
                                          _vm._v(
                                            "\n                    Sign in\n                  "
                                          )
                                        ]
                                      )
                                    ],
                                    1
                                  )
                                ],
                                1
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-row",
                            [
                              _c("v-col", [
                                _c(
                                  "div",
                                  { staticClass: "text-h4" },
                                  [
                                    _c(
                                      "v-alert",
                                      {
                                        attrs: {
                                          border: "left",
                                          "colored-border": "",
                                          color: "deep-purple accent-4",
                                          elevation: "2"
                                        }
                                      },
                                      [
                                        _vm._v(
                                          "\n                    Please hack my site by shingha on working palang... hehehe\n                    "
                                        ),
                                        _c("div", [_vm._v("Top 1")]),
                                        _vm._v(
                                          "\n                    hacker Koko\n                  "
                                        )
                                      ]
                                    )
                                  ],
                                  1
                                )
                              ])
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c("v-row")
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);