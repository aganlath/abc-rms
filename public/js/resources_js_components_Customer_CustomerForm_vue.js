(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_Customer_CustomerForm_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Customer/CustomerForm.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Customer/CustomerForm.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "CustomerForm",
  props: {
    customerFormVisible: {
      required: true,
      type: Boolean
    },
    customer: {
      type: Object
    }
  },
  data: function data() {
    return {
      customerForm: {
        first_name: '',
        last_name: '',
        email: '',
        phone_numbers: ''
      },
      rules: {
        first_name: [{
          required: true,
          message: 'Please input first name',
          trigger: 'blur'
        }],
        last_name: [{
          required: true,
          message: 'Please input last name',
          trigger: 'blur'
        }],
        email: [{
          required: true,
          message: 'Please input email address',
          trigger: 'blur'
        }, {
          type: 'email',
          message: 'Please input valid email address',
          trigger: ['blur']
        }]
      }
    };
  },
  computed: {
    title: function title() {
      return this.customer ? 'Edit Customer' : 'Add Customer';
    },
    buttonText: function buttonText() {
      return this.customer ? 'Update' : 'Save';
    }
  },
  methods: {
    assignDefaultValues: function assignDefaultValues() {
      if (_.isEmpty(this.customer)) {
        return;
      }

      this.customerForm = this.customer;
    },
    cancelSave: function cancelSave(formName) {
      this.$refs[formName].resetFields();
      this.$emit('close-customer-form');
    },
    saveCustomer: function saveCustomer(formName) {
      var _this = this;

      var CUSTOMER_FORM = this.customerForm;
      var CUSTOMER = {
        id: CUSTOMER_FORM.id ? CUSTOMER_FORM.id : null,
        first_name: CUSTOMER_FORM.first_name,
        last_name: CUSTOMER_FORM.last_name,
        email: CUSTOMER_FORM.email,
        phone_numbers: CUSTOMER_FORM.phone_numbers ? CUSTOMER_FORM.phone_numbers.split(',') : ''
      };
      this.$refs[formName].validate(function (valid) {
        if (valid) {
          _this.$emit('save', CUSTOMER);

          _this.$refs[formName].resetFields();
        }
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/components/Customer/CustomerForm.vue":
/*!***********************************************************!*\
  !*** ./resources/js/components/Customer/CustomerForm.vue ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CustomerForm_vue_vue_type_template_id_a62324d0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CustomerForm.vue?vue&type=template&id=a62324d0& */ "./resources/js/components/Customer/CustomerForm.vue?vue&type=template&id=a62324d0&");
/* harmony import */ var _CustomerForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CustomerForm.vue?vue&type=script&lang=js& */ "./resources/js/components/Customer/CustomerForm.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _CustomerForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _CustomerForm_vue_vue_type_template_id_a62324d0___WEBPACK_IMPORTED_MODULE_0__.render,
  _CustomerForm_vue_vue_type_template_id_a62324d0___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Customer/CustomerForm.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/Customer/CustomerForm.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/components/Customer/CustomerForm.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomerForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CustomerForm.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Customer/CustomerForm.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomerForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/components/Customer/CustomerForm.vue?vue&type=template&id=a62324d0&":
/*!******************************************************************************************!*\
  !*** ./resources/js/components/Customer/CustomerForm.vue?vue&type=template&id=a62324d0& ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomerForm_vue_vue_type_template_id_a62324d0___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomerForm_vue_vue_type_template_id_a62324d0___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomerForm_vue_vue_type_template_id_a62324d0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CustomerForm.vue?vue&type=template&id=a62324d0& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Customer/CustomerForm.vue?vue&type=template&id=a62324d0&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Customer/CustomerForm.vue?vue&type=template&id=a62324d0&":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Customer/CustomerForm.vue?vue&type=template&id=a62324d0& ***!
  \*********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
    "el-dialog",
    {
      attrs: {
        title: _vm.title,
        visible: _vm.customerFormVisible,
        width: "30%",
        "append-to-body": ""
      },
      on: {
        "update:visible": function($event) {
          _vm.customerFormVisible = $event
        },
        open: _vm.assignDefaultValues,
        close: function($event) {
          return _vm.$emit("close-customer-form")
        }
      }
    },
    [
      _c(
        "el-form",
        {
          ref: "customerForm",
          staticClass: "pt-5",
          attrs: {
            "label-position": "left",
            "label-width": "150px",
            size: "mini",
            model: _vm.customerForm,
            rules: _vm.rules
          }
        },
        [
          _c(
            "el-form-item",
            { attrs: { label: "First name", prop: "first_name" } },
            [
              _c("el-input", {
                attrs: { required: "", type: "text" },
                model: {
                  value: _vm.customerForm.first_name,
                  callback: function($$v) {
                    _vm.$set(_vm.customerForm, "first_name", $$v)
                  },
                  expression: "customerForm.first_name"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "Last name", prop: "last_name" } },
            [
              _c("el-input", {
                attrs: { required: "", type: "text" },
                model: {
                  value: _vm.customerForm.last_name,
                  callback: function($$v) {
                    _vm.$set(_vm.customerForm, "last_name", $$v)
                  },
                  expression: "customerForm.last_name"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "Email", prop: "email" } },
            [
              _c("el-input", {
                attrs: { required: "", type: "text" },
                model: {
                  value: _vm.customerForm.email,
                  callback: function($$v) {
                    _vm.$set(_vm.customerForm, "email", $$v)
                  },
                  expression: "customerForm.email"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "Phone Numbers", prop: "phone_numbers" } },
            [
              _c("el-input", {
                attrs: { required: "" },
                model: {
                  value: _vm.customerForm.phone_numbers,
                  callback: function($$v) {
                    _vm.$set(_vm.customerForm, "phone_numbers", $$v)
                  },
                  expression: "customerForm.phone_numbers"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { staticClass: "flex justify-end" },
            [
              _c(
                "el-button",
                {
                  on: {
                    click: function($event) {
                      return _vm.cancelSave("customerForm")
                    }
                  }
                },
                [_vm._v("Cancel")]
              ),
              _vm._v(" "),
              _c(
                "el-button",
                {
                  attrs: { type: "primary" },
                  on: {
                    click: function($event) {
                      return _vm.saveCustomer("customerForm")
                    }
                  }
                },
                [_vm._v(" " + _vm._s(_vm.buttonText) + " ")]
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
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);