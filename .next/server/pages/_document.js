"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_document";
exports.ids = ["pages/_document"];
exports.modules = {

/***/ "(pages-dir-node)/./src/pages/_document.tsx":
/*!*********************************!*\
  !*** ./src/pages/_document.tsx ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MyDocument)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/document */ \"(pages-dir-node)/./node_modules/next/document.js\");\n/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_document__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ \"styled-components\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nclass MyDocument extends (next_document__WEBPACK_IMPORTED_MODULE_1___default()) {\n    static async getInitialProps(ctx) {\n        const sheet = new styled_components__WEBPACK_IMPORTED_MODULE_2__.ServerStyleSheet();\n        const originalRenderPage = ctx.renderPage;\n        try {\n            ctx.renderPage = ()=>originalRenderPage({\n                    enhanceApp: (App)=>(props)=>sheet.collectStyles(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(App, {\n                                ...props\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\ShoreAgents\\\\Documents\\\\ScaleMate2025-main\\\\src\\\\pages\\\\_document.tsx\",\n                                lineNumber: 13,\n                                columnNumber: 33\n                            }, this))\n                });\n            const initialProps = await next_document__WEBPACK_IMPORTED_MODULE_1___default().getInitialProps(ctx);\n            return {\n                ...initialProps,\n                styles: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                    children: [\n                        initialProps.styles,\n                        sheet.getStyleElement()\n                    ]\n                }, void 0, true)\n            };\n        } finally{\n            sheet.seal();\n        }\n    }\n    render() {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.Html, {\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.Head, {\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                        href: \"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap\",\n                        rel: \"stylesheet\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\ShoreAgents\\\\Documents\\\\ScaleMate2025-main\\\\src\\\\pages\\\\_document.tsx\",\n                        lineNumber: 35,\n                        columnNumber: 11\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\ShoreAgents\\\\Documents\\\\ScaleMate2025-main\\\\src\\\\pages\\\\_document.tsx\",\n                    lineNumber: 34,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"body\", {\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.Main, {}, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\ShoreAgents\\\\Documents\\\\ScaleMate2025-main\\\\src\\\\pages\\\\_document.tsx\",\n                            lineNumber: 41,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.NextScript, {}, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\ShoreAgents\\\\Documents\\\\ScaleMate2025-main\\\\src\\\\pages\\\\_document.tsx\",\n                            lineNumber: 42,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"C:\\\\Users\\\\ShoreAgents\\\\Documents\\\\ScaleMate2025-main\\\\src\\\\pages\\\\_document.tsx\",\n                    lineNumber: 40,\n                    columnNumber: 9\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"C:\\\\Users\\\\ShoreAgents\\\\Documents\\\\ScaleMate2025-main\\\\src\\\\pages\\\\_document.tsx\",\n            lineNumber: 33,\n            columnNumber: 7\n        }, this);\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3NyYy9wYWdlcy9fZG9jdW1lbnQudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQXdGO0FBQ25DO0FBRXRDLE1BQU1NLG1CQUFtQk4sc0RBQVFBO0lBQzlDLGFBQWFPLGdCQUFnQkMsR0FBb0IsRUFBRTtRQUNqRCxNQUFNQyxRQUFRLElBQUlKLCtEQUFnQkE7UUFDbEMsTUFBTUsscUJBQXFCRixJQUFJRyxVQUFVO1FBRXpDLElBQUk7WUFDRkgsSUFBSUcsVUFBVSxHQUFHLElBQ2ZELG1CQUFtQjtvQkFDakJFLFlBQVksQ0FBQ0MsTUFBUSxDQUFDQyxRQUNwQkwsTUFBTU0sYUFBYSxlQUFDLDhEQUFDRjtnQ0FBSyxHQUFHQyxLQUFLOzs7Ozs7Z0JBQ3RDO1lBRUYsTUFBTUUsZUFBZSxNQUFNaEIsb0VBQXdCLENBQUNRO1lBQ3BELE9BQU87Z0JBQ0wsR0FBR1EsWUFBWTtnQkFDZkMsc0JBQ0U7O3dCQUNHRCxhQUFhQyxNQUFNO3dCQUNuQlIsTUFBTVMsZUFBZTs7O1lBRzVCO1FBQ0YsU0FBVTtZQUNSVCxNQUFNVSxJQUFJO1FBQ1o7SUFDRjtJQUVBQyxTQUFTO1FBQ1AscUJBQ0UsOERBQUNuQiwrQ0FBSUE7OzhCQUNILDhEQUFDQywrQ0FBSUE7OEJBQ0gsNEVBQUNtQjt3QkFDQ0MsTUFBSzt3QkFDTEMsS0FBSTs7Ozs7Ozs7Ozs7OEJBR1IsOERBQUNDOztzQ0FDQyw4REFBQ3JCLCtDQUFJQTs7Ozs7c0NBQ0wsOERBQUNDLHFEQUFVQTs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFJbkI7QUFDRiIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxTaG9yZUFnZW50c1xcRG9jdW1lbnRzXFxTY2FsZU1hdGUyMDI1LW1haW5cXHNyY1xccGFnZXNcXF9kb2N1bWVudC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERvY3VtZW50LCB7IEh0bWwsIEhlYWQsIE1haW4sIE5leHRTY3JpcHQsIERvY3VtZW50Q29udGV4dCB9IGZyb20gJ25leHQvZG9jdW1lbnQnO1xuaW1wb3J0IHsgU2VydmVyU3R5bGVTaGVldCB9IGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXlEb2N1bWVudCBleHRlbmRzIERvY3VtZW50IHtcbiAgc3RhdGljIGFzeW5jIGdldEluaXRpYWxQcm9wcyhjdHg6IERvY3VtZW50Q29udGV4dCkge1xuICAgIGNvbnN0IHNoZWV0ID0gbmV3IFNlcnZlclN0eWxlU2hlZXQoKTtcbiAgICBjb25zdCBvcmlnaW5hbFJlbmRlclBhZ2UgPSBjdHgucmVuZGVyUGFnZTtcblxuICAgIHRyeSB7XG4gICAgICBjdHgucmVuZGVyUGFnZSA9ICgpID0+XG4gICAgICAgIG9yaWdpbmFsUmVuZGVyUGFnZSh7XG4gICAgICAgICAgZW5oYW5jZUFwcDogKEFwcCkgPT4gKHByb3BzKSA9PlxuICAgICAgICAgICAgc2hlZXQuY29sbGVjdFN0eWxlcyg8QXBwIHsuLi5wcm9wc30gLz4pLFxuICAgICAgICB9KTtcblxuICAgICAgY29uc3QgaW5pdGlhbFByb3BzID0gYXdhaXQgRG9jdW1lbnQuZ2V0SW5pdGlhbFByb3BzKGN0eCk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5pbml0aWFsUHJvcHMsXG4gICAgICAgIHN0eWxlczogKFxuICAgICAgICAgIDw+XG4gICAgICAgICAgICB7aW5pdGlhbFByb3BzLnN0eWxlc31cbiAgICAgICAgICAgIHtzaGVldC5nZXRTdHlsZUVsZW1lbnQoKX1cbiAgICAgICAgICA8Lz5cbiAgICAgICAgKSxcbiAgICAgIH07XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNoZWV0LnNlYWwoKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxIdG1sPlxuICAgICAgICA8SGVhZD5cbiAgICAgICAgICA8bGlua1xuICAgICAgICAgICAgaHJlZj1cImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9SW50ZXI6d2dodEA0MDA7NTAwOzYwMDs3MDAmZGlzcGxheT1zd2FwXCJcbiAgICAgICAgICAgIHJlbD1cInN0eWxlc2hlZXRcIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvSGVhZD5cbiAgICAgICAgPGJvZHk+XG4gICAgICAgICAgPE1haW4gLz5cbiAgICAgICAgICA8TmV4dFNjcmlwdCAvPlxuICAgICAgICA8L2JvZHk+XG4gICAgICA8L0h0bWw+XG4gICAgKTtcbiAgfVxufSAiXSwibmFtZXMiOlsiRG9jdW1lbnQiLCJIdG1sIiwiSGVhZCIsIk1haW4iLCJOZXh0U2NyaXB0IiwiU2VydmVyU3R5bGVTaGVldCIsIk15RG9jdW1lbnQiLCJnZXRJbml0aWFsUHJvcHMiLCJjdHgiLCJzaGVldCIsIm9yaWdpbmFsUmVuZGVyUGFnZSIsInJlbmRlclBhZ2UiLCJlbmhhbmNlQXBwIiwiQXBwIiwicHJvcHMiLCJjb2xsZWN0U3R5bGVzIiwiaW5pdGlhbFByb3BzIiwic3R5bGVzIiwiZ2V0U3R5bGVFbGVtZW50Iiwic2VhbCIsInJlbmRlciIsImxpbmsiLCJocmVmIiwicmVsIiwiYm9keSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/./src/pages/_document.tsx\n");

/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "styled-components":
/*!************************************!*\
  !*** external "styled-components" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("styled-components");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc"], () => (__webpack_exec__("(pages-dir-node)/./src/pages/_document.tsx")));
module.exports = __webpack_exports__;

})();