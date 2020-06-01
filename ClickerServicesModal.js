function createCommonjsModule(fn, module) {
  return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var crel = createCommonjsModule(function (module, exports) {

  /* Copyright (C) 2012 Kory Nunn
  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

  NOTE:
  This code is formatted for run-speed and to assist compilers.
  This might make it harder to read at times, but the code's intention should be transparent. */

// IIFE our function
  (function (exporter) {
    // Define our function and its properties
    // These strings are used multiple times, so this makes things smaller once compiled
    var func = 'function',
      isNodeString = 'isNode',
      // Helper functions used throughout the script
      isType = function (object, type) { return typeof object === type; },
      // Recursively appends children to given element. As a text node if not already an element
      appendChild = function (element, child) {
        if (child !== null) {
          if (Array.isArray(child)) { // Support (deeply) nested child elements
            child.map(function (subChild) { return appendChild(element, subChild); });
          } else {
            if (!crel[isNodeString](child)) {
              child = document.createTextNode(child);
            }
            element.appendChild(child);
          }
        }
      };
    //
    function crel (element, settings) {
      // Define all used variables / shortcuts here, to make things smaller once compiled
      var args = arguments, // Note: assigned to a variable to assist compilers.
        index = 1,
        key,
        attribute;
      // If first argument is an element, use it as is, otherwise treat it as a tagname
      element = crel.isElement(element) ? element : document.createElement(element);
      // Check if second argument is a settings object
      if (isType(settings, 'object') && !crel[isNodeString](settings) && !Array.isArray(settings)) {
        // Don't treat settings as a child
        index++;
        // Go through settings / attributes object, if it exists
        for (key in settings) {
          // Store the attribute into a variable, before we potentially modify the key
          attribute = settings[key];
          // Get mapped key / function, if one exists
          key = crel.attrMap[key] || key;
          // Note: We want to prioritise mapping over properties
          if (isType(key, func)) {
            key(element, attribute);
          } else if (isType(attribute, func)) { // ex. onClick property
            element[key] = attribute;
          } else {
            // Set the element attribute
            element.setAttribute(key, attribute);
          }
        }
      }
      // Loop through all arguments, if any, and append them to our element if they're not `null`
      for (; index < args.length; index++) {
        appendChild(element, args[index]);
      }

      return element;
    }

    // Used for mapping attribute keys to supported versions in bad browsers, or to custom functionality
    crel.attrMap = {};
    crel.isElement = function (object) { return object instanceof Element; };
    crel[isNodeString] = function (node) { return node instanceof Node; };
    // Expose proxy interface
    if (typeof Proxy != "undefined") {
      crel.proxy = new Proxy(crel, {
        get: function (target, key) {
          !(key in crel) && (crel[key] = crel.bind(null, key));
          return crel[key];
        }
      });
    }
    // Export crel
    exporter(crel, func);
  })(function (product, func) {
    {
      // Export for Browserify / CommonJS format
      module.exports = product;
    }
  });
});






(function() {

  let CLICKER_MODAL_EVENTS ={
    CLICKER_SERVICE_OPEN:'CLICKER_SERVICE_OPEN',
    CLICKER_SERVICE_CLOSE:'CLICKER_SERVICE_CLOSE',
    CLICKER_SERVICE_CLOSE_FORCE:'CLICKER_SERVICE_CLOSE_FORCE',
    CLICKER_OFFER_CLOSE:'CLICKER_OFFER_CLOSE',
    CLICKER_OFFER_CLOSE_FORCE: 'CLICKER_OFFER_CLOSE_FORCE',
    CLICKER_OFFER_OPEN: 'CLICKER_OFFER_OPEN'

  }

  let CLICKER_URL = 'https://clicker-git-servertestnew.clicker.now.sh/';

//Экранируем стили

  let clickerContainerStyle = `
        .clicker-container {
          all: initial;
        }
        .clicker-reset-this, .clicker-reset-this a{
          animation : none;
          animation-delay : 0;
          animation-direction : normal;
          animation-duration : 0;
          animation-fill-mode : none;
          animation-iteration-count : 1;
          animation-name : none;
          animation-play-state : running;
          animation-timing-function : ease;
          backface-visibility : visible;
          background : 0;
          background-attachment : scroll;
          background-clip : border-box;
          background-color : transparent;
          background-image : none;
          background-origin : padding-box;
          background-position : 0 0;
          background-position-x : 0;
          background-position-y : 0;
          background-repeat : repeat;
          background-size : auto auto;
          border : 0;
          border-style : none;
          border-width : medium;
          border-color : inherit;
          border-bottom : 0;
          border-bottom-color : inherit;
          border-bottom-left-radius : 0;
          border-bottom-right-radius : 0;
          border-bottom-style : none;
          border-bottom-width : medium;
          border-collapse : separate;
          border-image : none;
          border-left : 0;
          border-left-color : inherit;
          border-left-style : none;
          border-left-width : medium;
          border-radius : 0;
          border-right : 0;
          border-right-color : inherit;
          border-right-style : none;
          border-right-width : medium;
          border-spacing : 0;
          border-top : 0;
          border-top-color : inherit;
          border-top-left-radius : 0;
          border-top-right-radius : 0;
          border-top-style : none;
          border-top-width : medium;
          bottom : auto;
          box-shadow : none;
          box-sizing : content-box;
          caption-side : top;
          clear : none;
          clip : auto;
          color : inherit;
          columns : auto;
          column-count : auto;
          column-fill : balance;
          column-gap : normal;
          column-rule : medium none currentColor;
          column-rule-color : currentColor;
          column-rule-style : none;
          column-rule-width : none;
          column-span : 1;
          column-width : auto;
          content : normal;
          counter-increment : none;
          counter-reset : none;
          cursor : auto;
          direction : ltr;
          display : inline;
          empty-cells : show;
          float : none;
          font : normal;
          font-family : inherit;
          font-size : medium;
          font-style : normal;
          font-variant : normal;
          font-weight : normal;
          height : auto;
          hyphens : none;
          left : auto;
          letter-spacing : normal;
          line-height : normal;
          list-style : none;
          list-style-image : none;
          list-style-position : outside;
          list-style-type : disc;
          margin : 0;
          margin-bottom : 0;
          margin-left : 0;
          margin-right : 0;
          margin-top : 0;
          max-height : none;
          max-width : none;
          min-height : 0;
          min-width : 0;
          opacity : 1;
          orphans : 0;
          outline : 0;
          outline-color : invert;
          outline-style : none;
          outline-width : medium;
          overflow : visible;
          overflow-x : visible;
          overflow-y : visible;
          padding : 0;
          padding-bottom : 0;
          padding-left : 0;
          padding-right : 0;
          padding-top : 0;
          page-break-after : auto;
          page-break-before : auto;
          page-break-inside : auto;
          perspective : none;
          perspective-origin : 50% 50%;
          position : static;
          /* May need to alter quotes for different locales (e.g fr) */
          quotes : '\\201C' '\\201D' '\\2018' '\\2019';
          right : auto;
          tab-size : 8;
          table-layout : auto;
          text-align : inherit;
          text-align-last : auto;
          text-decoration : none;
          text-decoration-color : inherit;
          text-decoration-line : none;
          text-decoration-style : solid;
          text-indent : 0;
          text-shadow : none;
          text-transform : none;
          top : auto;
          transform : none;
          transform-style : flat;
          transition : none;
          transition-delay : 0s;
          transition-duration : 0s;
          transition-property : none;
          transition-timing-function : ease;
          unicode-bidi : normal;
          vertical-align : baseline;
          visibility : visible;
          white-space : normal;
          widows : 0;
          width : auto;
          word-spacing : normal;
          z-index : auto;
          /* basic modern patch */
          all: initial;
          all: unset;
      }
        cp {
          display: block;
          margin-block-start: 1em;
          margin-block-end: 1em;
          margin-inline-start: 0px;
          margin-inline-end: 0px;
          -webkit-margin-before: 1em;
          -webkit-margin-after: 1em;
          -webkit-margin-start: 0px;
          -webkit-margin-end: 0px;
        }
        ctable {
          display: table;
          border-collapse: separate;
          box-sizing: border-box;
          border-spacing: 2px;
          border-color: grey;
        }
        ctd{
          display: table-cell;
          vertical-align: inherit;
        }
        cdiv {
         display:block;
        }
        
        cul {
          display: block;
          list-style-type: disc;
          margin-block-start: 1em;
          margin-block-end: 1em;
          margin-inline-start: 0px;
          margin-inline-end: 0px;
          padding-inline-start: 40px;
          -webkit-margin-before: 1em;
          -webkit-margin-after: 1em;
          -webkit-margin-start: 0px;
          -webkit-margin-end: 0px;
          -webkit-padding-start: 40px;
        }
        cli {
          display: list-item;
          text-align: -webkit-match-parent;
        }
        ch3{
          display: block;
          font-size: 1.17em;
          margin-block-start: 1em;
          margin-block-end: 1em;
          margin-inline-start: 0px;
          margin-inline-end: 0px;
          font-weight: bold;
          margin-bottom: 1em;
          -webkit-margin-before: 1em;
          -webkit-margin-after: 1em;
          -webkit-margin-start: 0px;
          -webkit-margin-end: 0px;
        }
       ch2{
          display: block;
          font-size: 1.5em;
          margin-block-start: 0.83em;
          margin-block-end: 0.83em;
          margin-inline-start: 0px;
          margin-inline-end: 0px;
          font-weight: bold;
          -webkit-margin-before: 0.83em;
          -webkit-margin-after: 0.83em;
          -webkit-margin-start: 0px;
          -webkit-margin-end: 0px;
        }
        ch1{
          display: block;
          font-size: 2em;
          margin-block-start: 0.67em;
          margin-block-end: 0.67em;
          margin-inline-start: 0px;
          margin-inline-end: 0px;
          font-weight: bold;
          -webkit-margin-before: 0.67em;
          -webkit-margin-after: 0.67em;
          -webkit-margin-start: 0px;
          -webkit-margin-end: 0px;
        }

      `;

  let clickerBlock = crel('cdiv',{class:'clicker-reset-this', style:"contain: style;"});
  let clickerContainer = crel('cdiv',{class:"clicker-container"});


  let fonts = `
    @font-face {
        font-family: 'Proxima Nova Cn Lt';
        src: url('${CLICKER_URL}fonts/ProximaNovaCond-LightIt.eot');
        src: local('Proxima Nova Condensed Light Italic'), local('ProximaNovaCond-LightIt'),
          url('${CLICKER_URL}fonts/ProximaNovaCond-LightIt.eot?#iefix') format('embedded-opentype'),
          url('${CLICKER_URL}fonts/ProximaNovaCond-LightIt.woff') format('woff'),
          url('${CLICKER_URL}fonts/ProximaNovaCond-LightIt.ttf') format('truetype');
        font-weight: 300;
        font-style: italic;
      }
    
    @font-face {
        font-family: 'Proxima Nova Lt';
        src: url('${CLICKER_URL}fonts/ProximaNova-LightIt.eot');
        src: local('Proxima Nova Light Italic'), local('ProximaNova-LightIt'),
          url('${CLICKER_URL}fonts/ProximaNova-LightIt.eot?#iefix') format('embedded-opentype'),
          url('${CLICKER_URL}fonts/ProximaNova-LightIt.woff') format('woff'),
          url('${CLICKER_URL}fonts/ProximaNova-LightIt.ttf') format('truetype');
        font-weight: 300;
        font-style: italic;
      }
    
    @font-face {
        font-family: 'Proxima Nova Md';
        src: local('Proxima Nova Medium'), local('ProximaNova-Medium'),
          url('${CLICKER_URL}fonts/ProximaNova-Medium.woff') format('woff');
        font-weight: normal;
        font-style: medium;
      }
    
    @font-face {
        font-family: 'Proxima Nova Cn Rg';
        src: url('${CLICKER_URL}fonts/ProximaNovaCond-Regular.eot');
        src: local('Proxima Nova Condensed Regular'), local('ProximaNovaCond-Regular'),
          url('${CLICKER_URL}fonts/ProximaNovaCond-Regular.eot?#iefix') format('embedded-opentype'),
          url('${CLICKER_URL}fonts/ProximaNovaCond-Regular.woff') format('woff'),
          url('${CLICKER_URL}fonts/ProximaNovaCond-Regular.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
      }
    
    @font-face {
        font-family: 'Proxima Nova Th';
        src: url('${CLICKER_URL}fonts/ProximaNova-Extrabld.eot');
        src: local('Proxima Nova Extrabold'), local('ProximaNova-Extrabld'),
          url('${CLICKER_URL}fonts/ProximaNova-Extrabld.eot?#iefix') format('embedded-opentype'),
          url('${CLICKER_URL}fonts/ProximaNova-Extrabld.woff') format('woff'),
          url('${CLICKER_URL}fonts/ProximaNova-Extrabld.ttf') format('truetype');
        font-weight: 800;
        font-style: normal;
      }
    
    @font-face {
        font-family: 'Proxima Nova Cn Bl';
        src: url('${CLICKER_URL}fonts/ProximaNovaCond-Black.eot');
        src: local('${CLICKER_URL}fonts/Proxima Nova Condensed Black'), local('ProximaNovaCond-Black'),
          url('${CLICKER_URL}fonts/ProximaNovaCond-Black.eot?#iefix') format('embedded-opentype'),
          url('${CLICKER_URL}fonts/ProximaNovaCond-Black.woff') format('woff'),
          url('${CLICKER_URL}fonts/ProximaNovaCond-Black.ttf') format('truetype');
        font-weight: 900;
        font-style: normal;
      }
    
    @font-face {
        font-family: 'Proxima Nova Cn Th';
        src: url('${CLICKER_URL}fonts/ProximaNovaCond-ExtrabldIt.eot');
        src: local('Proxima Nova Condensed Extrabold Italic'), local('ProximaNovaCond-ExtrabldIt'),
          url('${CLICKER_URL}fonts/ProximaNovaCond-ExtrabldIt.eot?#iefix') format('embedded-opentype'),
          url('${CLICKER_URL}fonts/ProximaNovaCond-ExtrabldIt.woff') format('woff'),
          url('${CLICKER_URL}fonts/ProximaNovaCond-ExtrabldIt.ttf') format('truetype');
        font-weight: 800;
        font-style: italic;
      }
    
    @font-face {
        font-family: 'Proxima Nova Rg';
        src: url('${CLICKER_URL}fonts/ProximaNova-Regular.eot');
        src: local('Proxima Nova Regular'), local('ProximaNova-Regular'),
          url('${CLICKER_URL}fonts/ProximaNova-Regular.eot?#iefix') format('embedded-opentype'),
          url('${CLICKER_URL}fonts/ProximaNova-Regular.woff') format('woff'),
          url('${CLICKER_URL}fonts/ProximaNova-Regular.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
      }
    
    @font-face {
        font-family: 'Proxima Nova Semibold';
        src: url('${CLICKER_URL}fonts/ProximaNova-Semibold.eot');
        src: local('Proxima Nova Semibold'), local('ProximaNova-Semibold'),
          url('${CLICKER_URL}fonts/ProximaNova-Semibold.eot?#iefix') format('embedded-opentype'),
          url('${CLICKER_URL}fonts/ProximaNova-Semibold.woff') format('woff'),
          url('${CLICKER_URL}fonts/ProximaNova-Semibold.ttf') format('truetype');
        font-weight: 600;
        font-style: normal;
      }
    
    @font-face {
        font-family: 'Proxima Nova ExCn Th';
        src: url('${CLICKER_URL}fonts/ProximaNovaExCn-Thin.eot');
        src: local('Proxima Nova Extra Condensed Thin'), local('ProximaNovaExCn-Thin'),
          url('${CLICKER_URL}fonts/ProximaNovaExCn-Thin.eot?#iefix') format('embedded-opentype'),
          url('${CLICKER_URL}fonts/ProximaNovaExCn-Thin.woff') format('woff'),
          url('${CLICKER_URL}fonts/ProximaNovaExCn-Thin.ttf') format('truetype');
        font-weight: 100;
        font-style: normal;
      }
    
    @font-face {
        font-family: 'Proxima Nova Cn Lt';
        src: url('${CLICKER_URL}fonts/ProximaNovaCond-Semibold.eot');
        src: local('Proxima Nova Condensed Semibold'), local('ProximaNovaCond-Semibold'),
          url('${CLICKER_URL}fonts/ProximaNovaCond-Semibold.eot?#iefix') format('embedded-opentype'),
          url('${CLICKER_URL}fonts/ProximaNovaCond-Semibold.woff') format('woff'),
          url('${CLICKER_URL}fonts/ProximaNovaCond-Semibold.ttf') format('truetype');
        font-weight: 600;
        font-style: normal;
      }
    
    @font-face {
        font-family: 'Proxima Nova ExCn Lt';
        src: url('${CLICKER_URL}fonts/ProximaNovaExCn-SemiboldIt.eot');
        src: local('Proxima Nova Extra Condensed Semibold Italic'), local('ProximaNovaExCn-SemiboldIt'),
          url('${CLICKER_URL}fonts/ProximaNovaExCn-SemiboldIt.eot?#iefix') format('embedded-opentype'),
          url('${CLICKER_URL}fonts/ProximaNovaExCn-SemiboldIt.woff') format('woff'),
          url('${CLICKER_URL}fonts/ProximaNovaExCn-SemiboldIt.ttf') format('truetype');
        font-weight: 600;
        font-style: italic;
      }
    
    @font-face {
        font-family: 'Proxima Nova ExCn Lt';
        src: url('${CLICKER_URL}fonts/ProximaNovaExCn-Semibold.eot');
        src: local('Proxima Nova Extra Condensed Semibold'), local('ProximaNovaExCn-Semibold'),
          url('${CLICKER_URL}fonts/ProximaNovaExCn-Semibold.eot?#iefix') format('embedded-opentype'),
          url('${CLICKER_URL}fonts/ProximaNovaExCn-Semibold.woff') format('woff'),
          url('${CLICKER_URL}fonts/ProximaNovaExCn-Semibold.ttf') format('truetype');
        font-weight: 600;
        font-style: normal;
      }
    
    @font-face {
        font-family: 'Proxima Nova Th';
        src: url('${CLICKER_URL}fonts/ProximaNova-ThinIt.eot');
        src: local('Proxima Nova Thin Italic'), local('ProximaNova-ThinIt'),
          url('${CLICKER_URL}fonts/ProximaNova-ThinIt.eot?#iefix') format('embedded-opentype'),
          url('${CLICKER_URL}fonts/ProximaNova-ThinIt.woff') format('woff'),
          url('${CLICKER_URL}fonts/ProximaNova-ThinIt.ttf') format('truetype');
        font-weight: 100;
        font-style: italic;
      }
    
    @font-face {
        font-family: 'Proxima Nova Cn Th';
        src: url('${CLICKER_URL}fonts/ProximaNovaCond-Thin.eot');
        src: local('Proxima Nova Condensed Thin'), local('ProximaNovaCond-Thin'),
          url('${CLICKER_URL}fonts/ProximaNovaCond-Thin.eot?#iefix') format('embedded-opentype'),
          url('${CLICKER_URL}fonts/ProximaNovaCond-Thin.woff') format('woff'),
          url('${CLICKER_URL}fonts/ProximaNovaCond-Thin.ttf') format('truetype');
        font-weight: 100;
        font-style: normal;
      }
    
    @font-face {
        font-family: 'Proxima Nova Cn Rg';
        src: url('${CLICKER_URL}fonts/ProximaNovaCond-RegularIt.eot');
        src: local('Proxima Nova Condensed Regular Italic'), local('ProximaNovaCond-RegularIt'),
          url('${CLICKER_URL}fonts/ProximaNovaCond-RegularIt.eot?#iefix') format('embedded-opentype'),
          url('${CLICKER_URL}fonts/ProximaNovaCond-RegularIt.woff') format('woff'),
          url('${CLICKER_URL}fonts/ProximaNovaCond-RegularIt.ttf') format('truetype');
        font-weight: normal;
        font-style: italic;
      }
    
    @font-face {
        font-family: 'Proxima Nova ExCn Th';
        src: url('${CLICKER_URL}fonts/ProximaNovaExCn-ThinIt.eot');
        src: local('Proxima Nova Extra Condensed Thin Italic'), local('ProximaNovaExCn-ThinIt'),
          url('${CLICKER_URL}fonts/ProximaNovaExCn-ThinIt.eot?#iefix') format('embedded-opentype'),
          url('${CLICKER_URL}fonts/ProximaNovaExCn-ThinIt.woff') format('woff'),
          url('${CLICKER_URL}fonts/ProximaNovaExCn-ThinIt.ttf') format('truetype');
        font-weight: 100;
        font-style: italic;
      }
    
    @font-face {
        font-family: 'Proxima Nova Semibold';
        src: url('${CLICKER_URL}fonts/ProximaNova-SemiboldIt.eot');
        src: local('Proxima Nova Semibold Italic'), local('ProximaNova-SemiboldIt'),
          url('${CLICKER_URL}fonts/ProximaNova-SemiboldIt.eot?#iefix') format('embedded-opentype'),
          url('${CLICKER_URL}fonts/ProximaNova-SemiboldIt.woff') format('woff'),
          url('${CLICKER_URL}fonts/ProximaNova-SemiboldIt.ttf') format('truetype');
        font-weight: 600;
        font-style: italic;
      }
    
    @font-face {
        font-family: 'Proxima Nova Rg';
        src: url('${CLICKER_URL}fonts/ProximaNova-RegularIt.eot');
        src: local('Proxima Nova Regular Italic'), local('ProximaNova-RegularIt'),
          url('${CLICKER_URL}fonts/ProximaNova-RegularIt.eot?#iefix') format('embedded-opentype'),
          url('${CLICKER_URL}fonts/ProximaNova-RegularIt.woff') format('woff'),
          url('${CLICKER_URL}fonts/ProximaNova-RegularIt.ttf') format('truetype');
        font-weight: normal;
        font-style: italic;
      }
    
    @font-face {
        font-family: 'Proxima Nova Cn Th';
        src: url('${CLICKER_URL}fonts/ProximaNovaCond-Extrabld.eot');
        src: local('Proxima Nova Condensed Extrabold'), local('ProximaNovaCond-Extrabld'),
          url('${CLICKER_URL}fonts/ProximaNovaCond-Extrabld.eot?#iefix') format('embedded-opentype'),
          url('${CLICKER_URL}fonts/ProximaNovaCond-Extrabld.woff') format('woff'),
          url('${CLICKER_URL}fonts/ProximaNovaCond-Extrabld.ttf') format('truetype');
        font-weight: 800;
        font-style: normal;
      }
    
    @font-face {
        font-family: 'Proxima Nova ExCn Th';
        src: url('${CLICKER_URL}fonts/ProximaNovaExCn-ExtrabldIt.eot');
        src: local('Proxima Nova Extra Condensed Extrabold Italic'), local('ProximaNovaExCn-ExtrabldIt'),
          url('${CLICKER_URL}fonts/ProximaNovaExCn-ExtrabldIt.eot?#iefix') format('embedded-opentype'),
          url('${CLICKER_URL}fonts/ProximaNovaExCn-ExtrabldIt.woff') format('woff'),
          url('${CLICKER_URL}fonts/ProximaNovaExCn-ExtrabldIt.ttf') format('truetype');
        font-weight: 800;
        font-style: italic;
      }
    
    @font-face {
        font-family: 'Proxima Nova ExCn Bl';
        src: url('${CLICKER_URL}fonts/ProximaNovaExCn-BlackIt.eot');
        src: local('Proxima Nova Extra Condensed Black Italic'), local('ProximaNovaExCn-BlackIt'),
          url('${CLICKER_URL}fonts/ProximaNovaExCn-BlackIt.eot?#iefix') format('embedded-opentype'),
          url('${CLICKER_URL}fonts/ProximaNovaExCn-BlackIt.woff') format('woff'),
          url('${CLICKER_URL}fonts/ProximaNovaExCn-BlackIt.ttf') format('truetype');
        font-weight: 900;
        font-style: italic;
      }
    
    @font-face {
        font-family: 'Proxima Nova ExCn Lt';
        src: url('${CLICKER_URL}fonts/ProximaNovaExCn-LightIt.eot');
        src: local('Proxima Nova Extra Condensed Light Italic'), local('ProximaNovaExCn-LightIt'),
          url('${CLICKER_URL}fonts/ProximaNovaExCn-LightIt.eot?#iefix') format('embedded-opentype'),
          url('${CLICKER_URL}fonts/ProximaNovaExCn-LightIt.woff') format('woff'),
          url('${CLICKER_URL}fonts/ProximaNovaExCn-LightIt.ttf') format('truetype');
        font-weight: 300;
        font-style: italic;
      }
    
    @font-face {
        font-family: 'Proxima Nova Cn Th';
        src: url('${CLICKER_URL}fonts/ProximaNovaCond-ThinIt.eot');
        src: local('Proxima Nova Condensed Thin Italic'), local('ProximaNovaCond-ThinIt'),
          url('${CLICKER_URL}fonts/ProximaNovaCond-ThinIt.eot?#iefix') format('embedded-opentype'),
          url('${CLICKER_URL}fonts/ProximaNovaCond-ThinIt.woff') format('woff'),
          url('${CLICKER_URL}fonts/ProximaNovaCond-ThinIt.ttf') format('truetype');
        font-weight: 100;
        font-style: italic;
      }
    
    @font-face {
        font-family: 'Proxima Nova ExCn Lt';
        src: url('${CLICKER_URL}fonts/ProximaNovaExCn-Light.eot');
        src: local('Proxima Nova Extra Condensed Light'), local('ProximaNovaExCn-Light'),
          url('${CLICKER_URL}fonts/ProximaNovaExCn-Light.eot?#iefix') format('embedded-opentype'),
          url('${CLICKER_URL}fonts/ProximaNovaExCn-Light.woff') format('woff'),
          url('${CLICKER_URL}fonts/ProximaNovaExCn-Light.ttf') format('truetype');
        font-weight: 300;
        font-style: normal;
      }
    
    @font-face {
        font-family: 'Proxima Nova Cn Rg';
        src: url('${CLICKER_URL}fonts/ProximaNovaCond-BoldIt.eot');
        src: local('Proxima Nova Condensed Bold Italic'), local('ProximaNovaCond-BoldIt'),
          url('${CLICKER_URL}fonts/ProximaNovaCond-BoldIt.eot?#iefix') format('embedded-opentype'),
          url('${CLICKER_URL}fonts/ProximaNovaCond-BoldIt.woff') format('woff'),
          url('${CLICKER_URL}fonts/ProximaNovaCond-BoldIt.ttf') format('truetype');
        font-weight: bold;
        font-style: italic;
      }
    
    @font-face {
        font-family: 'Proxima Nova ExCn Th';
        src: url('${CLICKER_URL}fonts/ProximaNovaExCn-Extrabld.eot');
        src: local('Proxima Nova Extra Condensed Extrabold'), local('ProximaNovaExCn-Extrabld'),
          url('${CLICKER_URL}fonts/ProximaNovaExCn-Extrabld.eot?#iefix') format('embedded-opentype'),
          url('${CLICKER_URL}fonts/ProximaNovaExCn-Extrabld.woff') format('woff'),
          url('${CLICKER_URL}fonts/ProximaNovaExCn-Extrabld.ttf') format('truetype');
        font-weight: 800;
        font-style: normal;
      }
    
    @font-face {
        font-family: 'Proxima Nova ExCn Rg';
        src: url('${CLICKER_URL}fonts/ProximaNovaExCn-BoldIt.eot');
        src: local('Proxima Nova Extra Condensed Bold Italic'), local('ProximaNovaExCn-BoldIt'),
          url('${CLICKER_URL}fonts/ProximaNovaExCn-BoldIt.eot?#iefix') format('embedded-opentype'),
          url('${CLICKER_URL}fonts/ProximaNovaExCn-BoldIt.woff') format('woff'),
          url('${CLICKER_URL}fonts/ProximaNovaExCn-BoldIt.ttf') format('truetype');
        font-weight: bold;
        font-style: italic;
      }
    
    @font-face {
        font-family: 'Proxima Nova Bl';
        src: url('${CLICKER_URL}fonts/ProximaNova-Black.eot');
        src: local('Proxima Nova Black'), local('ProximaNova-Black'),
          url('${CLICKER_URL}fonts/ProximaNova-Black.eot?#iefix') format('embedded-opentype'),
          url('${CLICKER_URL}fonts/ProximaNova-Black.woff') format('woff'),
          url('${CLICKER_URL}fonts/ProximaNova-Black.ttf') format('truetype');
        font-weight: 900;
        font-style: normal;
      }
    
    @font-face {
        font-family: 'Proxima Nova Rg';
        src: url('${CLICKER_URL}fonts/ProximaNova-Bold.eot');
        src: local('Proxima Nova Bold'), local('ProximaNova-Bold'),
          url('${CLICKER_URL}fonts/ProximaNova-Bold.eot?#iefix') format('embedded-opentype'),
          url('${CLICKER_URL}fonts/ProximaNova-Bold.woff') format('woff'),
          url('${CLICKER_URL}fonts/ProximaNova-Bold.ttf') format('truetype');
        font-weight: bold;
        font-style: normal;
      }
    
    @font-face {
        font-family: 'Proxima Nova ExCn Rg';
        src: url('${CLICKER_URL}fonts/ProximaNovaExCn-Bold.eot');
        src: local('Proxima Nova Extra Condensed Bold'), local('ProximaNovaExCn-Bold'),
          url('${CLICKER_URL}fonts/ProximaNovaExCn-Bold.eot?#iefix') format('embedded-opentype'),
          url('${CLICKER_URL}fonts/ProximaNovaExCn-Bold.woff') format('woff'),
          url('${CLICKER_URL}fonts/ProximaNovaExCn-Bold.ttf') format('truetype');
        font-weight: bold;
        font-style: normal;
      }
    
    @font-face {
        font-family: 'Proxima Nova Th';
        src: url('${CLICKER_URL}fonts/ProximaNovaT-Thin.eot');
        src: local('Proxima Nova Thin'), local('ProximaNovaT-Thin'),
          url('${CLICKER_URL}fonts/ProximaNovaT-Thin.eot?#iefix') format('embedded-opentype'),
          url('${CLICKER_URL}fonts/ProximaNovaT-Thin.woff') format('woff'),
          url('${CLICKER_URL}fonts/ProximaNovaT-Thin.ttf') format('truetype');
        font-weight: 100;
        font-style: normal;
      }
    
    @font-face {
        font-family: 'Proxima Nova Rg';
        src: url('${CLICKER_URL}fonts/ProximaNova-BoldIt.eot');
        src: local('Proxima Nova Bold Italic'), local('ProximaNova-BoldIt'),
          url('${CLICKER_URL}fonts/ProximaNova-BoldIt.eot?#iefix') format('embedded-opentype'),
          url('${CLICKER_URL}fonts/ProximaNova-BoldIt.woff') format('woff'),
          url('${CLICKER_URL}fonts/ProximaNova-BoldIt.ttf') format('truetype');
        font-weight: bold;
        font-style: italic;
      }
    
    @font-face {
        font-family: 'Proxima Nova Cn Rg';
        src: url('${CLICKER_URL}fonts/ProximaNovaCond-Bold.eot');
        src: local('Proxima Nova Condensed Bold'), local('ProximaNovaCond-Bold'),
          url('${CLICKER_URL}fonts/ProximaNovaCond-Bold.eot?#iefix') format('embedded-opentype'),
          url('${CLICKER_URL}fonts/ProximaNovaCond-Bold.woff') format('woff'),
          url('${CLICKER_URL}fonts/ProximaNovaCond-Bold.ttf') format('truetype');
        font-weight: bold;
        font-style: normal;
      }
    
    @font-face {
        font-family: 'Proxima Nova ExCn Bl';
        src: url('${CLICKER_URL}fonts/ProximaNovaExCn-Black.eot');
        src: local('Proxima Nova Extra Condensed Black'), local('ProximaNovaExCn-Black'),
          url('${CLICKER_URL}fonts/ProximaNovaExCn-Black.eot?#iefix') format('embedded-opentype'),
          url('${CLICKER_URL}fonts/ProximaNovaExCn-Black.woff') format('woff'),
          url('${CLICKER_URL}fonts/ProximaNovaExCn-Black.ttf') format('truetype');
        font-weight: 900;
        font-style: normal;
      }
    
    @font-face {
        font-family: 'Proxima Nova ExCn Rg';
        src: url('${CLICKER_URL}fonts/ProximaNovaExCn-RegularIt.eot');
        src: local('Proxima Nova Extra Condensed Regular Italic'), local('ProximaNovaExCn-RegularIt'),
          url('${CLICKER_URL}fonts/ProximaNovaExCn-RegularIt.eot?#iefix') format('embedded-opentype'),
          url('${CLICKER_URL}fonts/ProximaNovaExCn-RegularIt.woff') format('woff'),
          url('${CLICKER_URL}fonts/ProximaNovaExCn-RegularIt.ttf') format('truetype');
        font-weight: normal;
        font-style: italic;
      }
    
    @font-face {
        font-family: 'Proxima Nova Cn Lt';
        src: url('${CLICKER_URL}fonts/ProximaNovaCond-Light.eot');
        src: local('Proxima Nova Condensed Light'), local('ProximaNovaCond-Light'),
          url('${CLICKER_URL}fonts/ProximaNovaCond-Light.eot?#iefix') format('embedded-opentype'),
          url('${CLICKER_URL}fonts/ProximaNovaCond-Light.woff') format('woff'),
          url('${CLICKER_URL}fonts/ProximaNovaCond-Light.ttf') format('truetype');
        font-weight: 300;
        font-style: normal;
      }
    
    @font-face {
        font-family: 'Proxima Nova Th';
        src: url('${CLICKER_URL}fonts/ProximaNova-ExtrabldIt.eot');
        src: local('Proxima Nova Extrabold Italic'), local('ProximaNova-ExtrabldIt'),
          url('${CLICKER_URL}fonts/ProximaNova-ExtrabldIt.eot?#iefix') format('embedded-opentype'),
          url('${CLICKER_URL}fonts/ProximaNova-ExtrabldIt.woff') format('woff'),
          url('${CLICKER_URL}fonts/ProximaNova-ExtrabldIt.ttf') format('truetype');
        font-weight: 800;
        font-style: italic;
      }
    
    @font-face {
        font-family: 'Proxima Nova Cn Bl';
        src: url('${CLICKER_URL}fonts/ProximaNovaCond-BlackIt.eot');
        src: local('Proxima Nova Condensed Black Italic'), local('ProximaNovaCond-BlackIt'),
          url('${CLICKER_URL}fonts/ProximaNovaCond-BlackIt.eot?#iefix') format('embedded-opentype'),
          url('${CLICKER_URL}fonts/ProximaNovaCond-BlackIt.woff') format('woff'),
          url('${CLICKER_URL}fonts/ProximaNovaCond-BlackIt.ttf') format('truetype');
        font-weight: 900;
        font-style: italic;
      }
    
    @font-face {
        font-family: 'Proxima Nova ExCn Rg';
        src: url('${CLICKER_URL}fonts/ProximaNovaExCn-Regular.eot');
        src: local('Proxima Nova Extra Condensed Regular'), local('ProximaNovaExCn-Regular'),
          url('${CLICKER_URL}fonts/ProximaNovaExCn-Regular.eot?#iefix') format('embedded-opentype'),
          url('${CLICKER_URL}fonts/ProximaNovaExCn-Regular.woff') format('woff'),
          url('${CLICKER_URL}fonts/ProximaNovaExCn-Regular.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
      }
    
    @font-face {
        font-family: 'Proxima Nova Lt';
        src: url('${CLICKER_URL}fonts/ProximaNova-Light.eot');
        src: local('Proxima Nova Light'), local('ProximaNova-Light'),
          url('${CLICKER_URL}fonts/ProximaNova-Light.eot?#iefix') format('embedded-opentype'),
          url('${CLICKER_URL}fonts/ProximaNova-Light.woff') format('woff'),
          url('${CLICKER_URL}fonts/ProximaNova-Light.ttf') format('truetype');
        font-weight: 300;
        font-style: normal;
      }
    
    @font-face {
        font-family: 'Proxima Nova Cn Lt';
        src: url('${CLICKER_URL}fonts/ProximaNovaCond-SemiboldIt.eot');
        src: local('Proxima Nova Condensed Semibold Italic'), local('ProximaNovaCond-SemiboldIt'),
          url('${CLICKER_URL}fonts/ProximaNovaCond-SemiboldIt.eot?#iefix') format('embedded-opentype'),
          url('${CLICKER_URL}fonts/ProximaNovaCond-SemiboldIt.woff') format('woff'),
          url('${CLICKER_URL}fonts/ProximaNovaCond-SemiboldIt.ttf') format('truetype');
        font-weight: 600;
        font-style: italic;
      }
    
    @font-face {
        font-family: 'Proxima Nova Bl';
        src: url('${CLICKER_URL}fonts/ProximaNova-BlackIt.eot');
        src: local('Proxima Nova Black Italic'), local('ProximaNova-BlackIt'),
          url('${CLICKER_URL}fonts/ProximaNova-BlackIt.eot?#iefix') format('embedded-opentype'),
          url('${CLICKER_URL}fonts/ProximaNova-BlackIt.woff') format('woff'),
          url('${CLICKER_URL}fonts/ProximaNova-BlackIt.ttf') format('truetype');
        font-weight: 900;
        font-style: italic;
      }
      
      @font-face {
        font-family: "GothamProRBlack";
        src: url("${CLICKER_URL}fonts/GothamProRBlack.eot"); /* IE9 Compat Modes */
        src: url("${CLICKER_URL}fonts/GothamProRBlack.eot?#iefix") format("embedded-opentype"), /* IE6-IE8 */
          url("${CLICKER_URL}fonts/GothamProRBlack.svg") format("svg"), /* Legacy iOS */
          url("${CLICKER_URL}fonts/GothamProRBlack.ttf") format("truetype"), /* Safari, Android, iOS */
          url("${CLICKER_URL}fonts/GothamProRBlack.woff") format("woff"), /* Modern Browsers */
          url("${CLICKER_URL}fonts/GothamProRBlack.woff2") format("woff2"); /* Modern Browsers */
        font-weight: normal;
        font-style: normal;
      }
      
      @font-face {
        font-family: "GothamProRLight";
        src: url(""${CLICKER_URL}fonts/GothamProRLight.eot"); /* IE9 Compat Modes */
        src: url(""${CLICKER_URL}fonts/GothamProRLight.eot?#iefix") format("embedded-opentype"), /* IE6-IE8 */
          url(""${CLICKER_URL}fonts/GothamProRLight.svg") format("svg"), /* Legacy iOS */
          url(""${CLICKER_URL}fonts/GothamProRLight.ttf") format("truetype"), /* Safari, Android, iOS */
          url(""${CLICKER_URL}fonts/GothamProRLight.woff") format("woff"), /* Modern Browsers */
          url(""${CLICKER_URL}fonts/GothamProRLight.woff2") format("woff2"); /* Modern Browsers */
        font-weight: normal;
        font-style: normal;
      }
      `;

  let modalStyle = ` 
         /* The Modal (background) */
        .clicker-modal {
            align-self: center;
            display: none; /* Hidden by default */
            position: fixed; /* Stay in place */
            z-index: 999999; /* Sit on top */
            left: 0;
            top: 0;
            width: 100%; /* Full width */
            height: 100%; /* Full height */
            overflow: auto; /* Enable scroll if needed */
            background-color: rgb(0,0,0); /* Fallback color */
            background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
        }
          @media (max-width: 583px) {
          
            .clicker-modal-content {
              margin: 0!important;
            }
          }

        /* Mod/al Content */
        .clicker-modal-content {
            height: max-content;
            position: relative;
            background-color: #fefefe;
            margin: auto;
            padding: 0;
            border: 1px solid #888;
            width: 80%;
            -webkit-animation-name: clicker-animatetop;
            -webkit-animation-duration: 0.4s;
            animation-name: clicker-animatetop;
            animation-duration: 0.4s
        }

        /* Add Animation */
        @-webkit-keyframes clicker-animatetop {
            from {top:-300px; opacity:0}
            to {top:0; opacity:1}
        }

        @keyframes clicker-animatetop {
            from {top:-300px; opacity:0}
            to {top:0; opacity:1}
        }

        .clicker-modal-body {padding: 2px 16px;}
  `;
  function launchScript(fn) {
    fn();
  }

  // RegExp чтобы парсить услуги из строки
  const serviceRegExp = /([\wа-яА-Я+]+[,{0,}]*\s*.*[\wа-яА-Я+]+,*\)*)/g;

  let shortStyle = `
  @media (max-width: 583px) {
      .clicker-offer-exit-wrapper-mobile{
          top: 26%;
          margin-left: 93%!important;
          margin-bottom: 4%!important;
          margin: 0;
      }
      #clicker-offer-accept-mobile {
          margin-left: 5%;
          margin-right: 5%;
          width: auto!important;
      }
        #clicker-offer-accept-mobile >cp{
          width: auto!important;
      }
  }
 @media (max-width: 480px) {
       .clicker-offer-exit-wrapper-mobile{
          margin-left: 91%!important;
      }
 }
  @media (max-width: 350px) {
       .clicker-offer-exit-wrapper-mobile{
          margin-left: 89%!important;
      }
 }
.clicker-offer-modal-decorator{
  border: none;
  width: 524px;
  margin: auto;
  background-color:transparent;
}
.clicker-offer-exit-wrapper {
    width: 38px;
    height: 38px;
    background-color: #1A3F5F;
    border-radius: 20px;
    margin-left: 101%;
    margin-bottom: 1%;
}
#clicker-offer-exit {
font-weight: 300;
    width: 40.13px;
    height: 95.88px;
    font-family: 'Proxima Nova Lt', sans-serif;
    font-size: 28px;
    color: white;
    transform: rotate(-45deg);
    cursor: pointer;
    margin-top: -18px;
    margin-left: 29px;
    opacity: 1.0!important;
    box-sizing: border-box;
    line-height: 1.4;
    position: absolute;
}
#clicker-offer-exit:hover {
    color: black;
}
.clicker-offer-modal-body{
    border-radius: 5px;
    padding: 0px;
    background-color: #1A3F5F;
    margin: 0px;
}
.clicker-offer-modal-container {
    width: 100%;
    padding-bottom: 0px;
    background-color: #1A3F5F;
    color: rgb(0, 0, 0);
    border-radius: 5px;
}
.clicker-offer-container {
    max-width: 460px;
    margin: 0px auto;
    padding-top: 25px;
    font-family: "PT Sans",sans-serif!important;
}
#clicker-offer-accept{
    width: 464px;
    height: 71px;
    margin-bottom: 23px;
    background: rgb(193, 43, 40);
    float: none!important;
    opacity: 1!important;
    font-family: "PT Sans",sans-serif;
}
#clicker-offer-accept:hover{
    cursor: pointer;
    background: #0A1AC4;
}
#clicker-offer-accept > cp{
    width: 275px!important;
    height: 31px!important;
    left: 256px!important;
    top: 3735px!important;
    font-style: normal!important;
    font-weight: bold!important;
    font-size: 23px!important;
    line-height: 28px!important;
    text-align: center!important;
    color: rgb(255, 255, 255)!important;
    padding-top: 21px!important;
    user-select: none!important;
    cursor: pointer!important;
    margin: 0px auto!important;
    opacity: 1!important;
    float: none!important;
}
.clicker-offer-message {
    margin-left: 20px;
    margin-right: 20px;
    text-align: center;
    font-size: 13px;
    line-height: 17px;
    font-family: 'Proxima Nova Lt', sans-serif;
    padding-bottom: 15px;
}

.clicker-offer-message  cp{
    color: white;
}
.clicker-offer-message  a{
    color: #329fdc;
    text-decoration: none;
    background-color: transparent;
    cursor: pointer;
    -webkit-text-fill-color: #329fdc;
}


}`;

  let fullModalStyle = `
@media (max-width: 535px)  {
            .clicker-service-review-text_m, .clicker-service-modal-wrapper-mobile , .clicker-service-modal-decorator-mobile, 
             .clicker-service-title-block-mobile, .clicker-service-review-block-mobile , .clicker-service-review-text-short ,
               .clicker-service-container-mobile , .clicker-service-review-text-shadow-mobile,
                .clicker-service-add-btn_m, .clicker-service-add-btn_m > cp, .clicker-footer-header-mobile,
                 .clicker-service-wrapper-mobile , .clicker-service-footer-text-header-mobile , .clicker-modal-dialog-mobile{
               width: auto!important;
            }
            
            .clicker-service-footer-container-mobile, .clicker-footer-header-mobile ,
             .clicker-service-footer-text-header-mobile ,.clicker-service-wrapper-footer-icons-mobile {
            
                height: auto!important;
            }
 
            .clicker-service-review-block-mobile , .clicker-service-review-text-short > cp ,
             .clicker-service-footer-container-mobile {
            
                margin-left: 5%!important;
                margin-right: 5%!important;
            }
            .clicker-service-footer-container-mobile {
               width: 100%!important;
              justify-content: space-between;
            }
            .clicker-service-about-items-wrapper-mobile {
                display: block!important;
            }
            .clicker-service-about-item-mobile {
            flex-direction: row!important;
              -webkit-box-align: center!important;
              align-items: flex-start!important;
              flex-basis: 100%!important;
              padding-bottom: 30px!important;
              min-height: auto!important;
              padding: 0!important;
               margin: 0 5% !important;

            }
            
            
            .clicker-service-about-item-mobile > cdiv{
                 padding-left: 37px;
            }

            .clicker-service-about-us-header-mobile {
                padding-top: 20px;
            }

            .clicker-service-phone-mobile  a{
                font-size: 20px!important;
            }
            .clicker-service-footer-text-header-font-mobile {
                font-size: 15px!important;
            }

            .clicker-service-footer-icon-modal {
                margin-left: auto;
                height: auto;
                margin-left: 0!important;
                margin-top: 5px!important;

            }
            .clicker-service-exit-mobile {
                position: fixed!important;
                color: black!important;
                text-shadow: none!important;
                left: 96%!important;
            }
            .clicker-service-exit-mobile:hover {
                color: white!important;
            }
            .clicker-modal-dialog-mobile {
                margin: 0!important;
            }
            .clicker-service-footer-image-mobile {
                width: 52px;
                height: 52px;
            }
            .clicker-service-about-container-mobile {
              margin: 0 20px!important;
            }
            
            .clicker-service-about-item-margin-image {
                margin-top:21px;
            }
            
            .clicker-service-about-item-description-mobile {
              margin-top: 0!important;
            }
            
            #clicker-service-modal > cdiv {
              padding-right:0!important;
            }
        }


#clicker-service-exit , .clicker-service-description, .clicker-service-review-text {
    font-family: 'Proxima Nova Lt', sans-serif;

}

.clicker-service-about-item-text, .clicker-service-title,
 .clicker-service-about-item-description,
  .clicker-service-about-us-header, .clicker-service-about-us-description   {
    font-family: "Proxima Nova Rg", sans-serif;
}

.clicker-service-modal-decorator {
  border: none;
  width: 524px;
  margin: auto;
}

.modal-body clicker-service-modal-body {
   padding: 0px!important;
   background-color:#1A3F5F;
   margin: 0px;
}

#clicker-service-exit {
    font-weight: 300;
    width: 44.13px;
    height: 95.88px;
    position: absolute;
    font-size: 50px;
    color: white;
    transform: rotate(-45deg);
    left: 95%;
    top: -21px;
    cursor: pointer;
}

#clicker-service-exit:hover {
    color: black;
}

.clicker-service-wrapper {
    width: 524px;
    margin: 0 auto;
    background-color:#1A3F5F;
}

.clicker-service-modal-wrapper { 
    padding-top: 34px;
}

.clicker-service-container {
    background: #1A3F5F;
    width: 524px;
    margin: 0 auto;
    padding-bottom: 68px;
}

.clicker-service-title-block {
    padding-left: 34px;
    padding-right: 34px;
}

.clicker-service-title {
    font-style: normal;
    font-weight: bold;
    font-size: 35px;
    line-height: 43px;
    color: white;
    margin-top: 0;

}

.clicker-service-price {
   font-weight: normal;
   opacity: 0.52;
   white-space: nowrap;
}

.clicker-service-price-icon {
  font-family: "GothamProRLight"
}

.clicker-service-list-wrap {
}

.clicker-service-description {
   font-size: 18px;
   line-height: 20px;
   color: white;
   margin-bottom: 5px;
}
.clicker-service-description > cp {
   margin: 0
}

.clicker-service-menu {
    display: flex;
    flex-direction: column;
    -webkit-box-pack: start;
    justify-content: flex-start;
    align-items: flex-start;
    color: white;
    padding-bottom: 20px;
    font-family: 'Proxima Nova Lt', sans-serif;
}
.clicker-service-menu:nth-child(1) {
    padding-bottom: 0px;
}


.clicker-service-menu cul{
    margin: 0;
    max-height:0px;
    -webkit-transition:max-height 0.4s linear;
    -moz-transition:max-height 0.4s linear;
    transition:max-height 0.4s linear;
    overflow-y: hidden;
    padding-left: 36px;
    font-size: 18px;
}
.clicker-service-menu cul > cli:not(:first-child) {
    padding-top: 10px;
}
.clicker-service-menu cul > cli:last-child {
    margin-bottom: 10px;
}
.clicker-service-menu .clicker-service-title-wrap {
    font-size: 18px;
    cursor: pointer;
    margin: 12px 0;
    padding: 5px 0 4px 0;
}

.menu .clicker-service-title-wrap::before {
    content: '';
    font-size: 80%;
    color: cornflowerblue;
}

.clicker-service-works-icons-wrapper {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    cursor: pointer;
}

.clicker-service-works-icons-wrapper:hover  {
     color: #B4DCFF;
}
.clicker-service-works-icons-wrapper:hover svg {
     color: #B4DCFF;
}
.clicker-service-works-icons {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    margin-right: 3px;
    margin-bottom: 2px;
    font-size: 12px;
    cursor: pointer;
    color: white;
}

.clicker-service-side-icon{
   font-size: 18px;
   padding-top: 2px;
}

.clicker-service-title-wrap{
    border-style: dashed;
    border-width: 0px 0px 1px 0px;
    padding-bottom: 0;
}


#clicker-service-not-include-works {
    margin-top: -24px;
}

.clicker-service-list {
}

.clicker-service-list. > cli:before{
    list-style: disc inside;
}
.clicker-service-review-block {
    width: 408px;
    border: 1px solid #B4DCFF;
    box-sizing: border-box;
    border-radius: 15px;
    border-width: medium;
    margin: 0 auto;
    margin-top: 30px;
}

.clicker-service-review-text {
    width: 355px;
    font-style: italic;
    font-weight: normal;
    font-size: 15px;
    line-height: 18px;
    text-align: center;
    margin: 0 auto;
    color: #B4DCFF;
}

.clicker-service-review-text-short {
    max-height: 151px;
    min-height: 151px;
    overflow-y: hidden;
    user-select: none;
    cursor: pointer;
    -webkit-transition:max-height 0.4s linear;
    -moz-transition:max-height 0.4s linear;
    transition:max-height 0.4s linear;
    font-size: 15px;
}

.clicker-service-review-text-short > cp:not(:last-child) {
   padding-top: 12px;
   margin: 0;
}
.clicker-service-review-text-short > cp:last-child {
       margin-top: 9px;
       margin-bottom: 0;
}

.clicker-service-review-text-full {
    overflow-y: visible;
    cursor: pointer;
    max-height: 800px;
}

.clicker-service-review-text-shadow {
    width: 372px;
    height: 79px;
    margin: 0 auto;
    margin-top: -42px;
    background: linear-gradient(0deg, #1A3F5F 39.24%, rgba(26, 63, 95, 0) 100%);
    opacity: 0.99;
    margin-bottom: 7px;
}

.clicker-stars-block {
    width: fit-content;
    height: 28px;
    margin: 0 auto;
    margin-top: -14px;
    background: #1A3F5F;
    padding-right: 5px;
    padding-left: 5px;
}

.clicker-service-another-review {
    width: 100px;
    font-size: 15px;
    line-height: 31px;
    text-align: center;
    margin: 0 auto;
    margin-top: -17px;
    font-family: "Proxima Nova Rt", sans-serif!important;
    background-color: #1A3F5F;
    cursor: pointer;
    font-weight: bold;
    font-size: 15px;
    color: #B4DCFF;
}
.clicker-service-another-review > cp {
    margin: 0 auto;
    width: fit-content;
    border-style: dashed;
    border-width: 0px 0px 1px 0px;
}
.clicker-service-another-review > cp:hover {
    color: white;
}

.clicker-service-about-us-description {
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    font-family: "Proxima Nova Rg", sans-serif;
    line-height: 22px;
}

.clicker-service-another-review-underline {
    display: none;
    width: 77px;
    height: 0px;
    border: 1px dashed #B4DCFF;
    margin: 0 auto;
    margin-top: -26px;
}

.clicker-service-about {
    width: 100%;
    padding-bottom: 0px;
    min-height: 100vh;
    background-color: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
}

.clicker-service-about-container {
    max-width: 460px;
    margin: 0px auto;
    padding-top: 25px;
}



.clicker-service-about-item {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    min-height: 180px;
    flex-basis: 50%;
}

.clicker-service-about-i> ch2{
    font-family: "Proxima Nova Rg", sans-serif;
    font-size: 23px;
    line-height: 28px;
    font-weight: bold;

}

.clicker-service-about-item:nth-child(2n+1) {
    padding-right: 30px;
  }


.clicker-service-padding-image {
    width: 62px;
    padding-bottom: 21px;
}

.clicker-service-about-item-text {
    font-size: 15px;
    line-height: 20px;
    font-weight: bold;
    padding-bottom: 9px;
    margin-bottom: 0px;
}


.clicker-service-about-item-description {
    font-size: 15px;
    line-height: 20px;
    margin-bottom: 16px!important;
}

.clicker-clicker-service-about-i {
   padding-top: 10px;
}

.clicker-service-about-us-header {
    font-size: 23px;
    line-height: 28px;
    font-weight: bold;
    margin: 26px 0 10px!important;
}

.clicker-service-about-us-description {
    font-size: 16px;
    line-height: 20px;
    padding-bottom: 30px;
    font-weight: normal;
    margin: 0;
}

.clicker-service-about-items-wrapper {
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;
}

#clicker-service-add-btn {
    width: 464px;
    height: 71px;
    margin-bottom: 19px;
    background: rgb(193, 43, 40);
    margin-top: 26px;
    font-family: "PT Sans",sans-serif;
}
#clicker-service-add-btn:hover {
    cursor: pointer;
    background: #0A1AC4;
}

.clicker-unvisible-item {
    visibility: hidden;
}

#clicker-service-add-btn > cp {
    height: 31px!important;
    left: 256px!important;
    top: 3735px!important;
    font-style: normal!important;
    font-weight: bold!important;
    font-size: 23px!important;
    line-height: 28px!important;
    text-align: center!important;
    color: rgb(255, 255, 255)!important;
    padding-top: 21px!important;
    user-select: none!important;
    cursor: pointer!important;
    margin: 0px auto!important;
    opacity: 1!important;
    float: none!important;
}


.clicker-offer-block {
    margin-left: 20px;
    margin-right: 20px;
    text-align: center;
    margin-bottom: 30px;
    font-size: 13px;
    line-height: 17px;
    font-family: 'Proxima Nova Lt', sans-serif;
}
.clicker-offer-block a {
    text-decoration: underline;
    color: #329fdc;
    background-color: transparent;
    cursor: pointer;
    -webkit-text-fill-color: #329fdc;
}


.clicker-service-footer {
    background-color: rgb(8, 63, 98);
    display: flex;
    text-align: end;
    margin: 0px auto;
}

.clicker-service-footer-container {
    width: 460px;
    height: 139px;
    display: inline-flex;
    margin: 0px auto;
}

.clicker-service-footer-text {
    display: flex;
    flex-direction: column;
    -webkit-box-pack: center;
    justify-content: center;
    font-family: "Proxima Nova Rg", sans-serif;
}

.clicker-service-footer-text-header {
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 22px;
    color: rgb(255, 255, 255);
    width: 197px;
    height: 27px;
    text-align: start;
    margin-bottom: 0;
    margin-top: 10px;
}

.clicker-service-footer-text-header > cp {
   margin: 0;
}

 .clicker-service-phone{
}

.clicker-service-phone a{
    font-weight: bold;
    font-size: 38px;
    line-height: 49px;
    color: rgb(255, 255, 255);
    cursor: pointer;
    text-align: start;
    -webkit-text-fill-color: rgb(255, 255, 255);
}

.clicker-service-wrapper-footer-icons {
     width: 170px                   
     height: 130px;
     display: flex;
     flex-direction: column;
     -webkit-box-pack: center;
     justify-content: center;
}

.clicker-service-footer-icon {
    margin-left: 25px;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    height: 63px;
}

#clicker-service-footer-image-1 {
    width: 63px;
    height: 63px;
    display: inline-block;
}
#clicker-service-footer-image-1 > a, #clicker-service-footer-image-2 > a {
        cursor: pointer;
}

#clicker-service-footer-image-2 {
    width: 63px;
    height: 63px;
    display: inline-block;
    margin-left: 10px;
}`;


  let modalStyleEl = crel('style', {}, modalStyle);
  let clickerContainerStyleEl = crel('style', {}, clickerContainerStyle);
  let fontsEl = crel('style', {}, fonts);
  let shortStyleEl = crel('style', {}, shortStyle);
  let fullStyleEl = crel('style', {}, fullModalStyle);

  // Версия окна с офертой и добавлением услуги
  let createShortModal = (container, offerLink, handleOffer , style) => {

    const modalWindow = (id) => crel("cdiv",
      {
        class: "clicker-modal",
        id: id,
      });
    const modalContent = (classes) => crel('cdiv', { class: "clicker-modal-content " + classes });

    const offerModal = crel(modalWindow("offerModal"),
        crel(modalContent("clicker-offer-modal-decorator"),
          crel('cdiv', { class: "clicker-offer-exit-wrapper clicker-offer-exit-wrapper-mobile", 'data-dismiss': "modal" },
            crel('cdiv', { class: " clicker-offer-modal-close", id:'clicker-offer-exit' }, "+")
          ),
          crel('cdiv', { class: "modal-body clicker-offer-modal-body" },
            crel('cdiv', { class: "offer-mobile-wrapper" },
              crel('cdiv', { class: "clicker-offer-modal-container" },
                crel('cdiv', { class: "clicker-offer-container"  },
                  crel('cdiv', { class: "clicker-offer-accept-mobile ", id: 'clicker-offer-accept'},
                    crel('cp', { class: "accept-text" },
                      "Добавить к заказу"
                    )
                  ),

                  crel('cdiv', { class: "clicker-offer-message" },
                    crel('cp', { class: "accept-text" },
                      "Нажимая кнопку «Добавить к заказу», я даю согласие на обработку персональных данных," +
                      "включая право поручения обработки другим лицам, на условиях, изложенных  в ",
                      crel("a", { target:'_blank', href: "https://www.holodilnik.ru/defence/" }, 'Политике в отношении обработки персональных данных в Интернете'),
                      " с которой я ознакомился, подтверждаю своё согласие с ",
                      crel("a", { target:'_blank', href: "https://clicker.one/documents/privacy" }, 'политикой конфиденциальности'),
                      " и принимаю условия ",
                      crel("a", { target:'_blank', href: offerLink }, 'оферты'
                      )
                    )
                  )
                )
              )
            )
          )
        )
    );

    crel(container, style, offerModal);
    $('#clicker-offer-accept').on('click', handleOffer);
    return (pageData) => {
      let localData = servicesDataMap.get(pageData);
      let f = () => {
        addServiceHandler(localData.productId)
      }
      $('#clicker-offer-accept').on(CLICKER_MODAL_EVENTS.CLICKER_OFFER_CLOSE, f);
      $('#clicker-offer-accept').on(CLICKER_MODAL_EVENTS.CLICKER_OFFER_CLOSE_FORCE,
        () => $('#clicker-offer-accept').on(CLICKER_MODAL_EVENTS.CLICKER_OFFER_CLOSE, f));
      return (() => {
      })()
    }
  }




  // Полная версия
  let createFullModal = (container, pageData, handleOffer,  style, position, offerLink) => {
    const modalWindow = (id) => crel("cdiv",
      {
        class: "clicker-modal modal_clicker",
        id: id,
      });
    let mt = !!position && !!position.marginTop;
    let mb = !!position && !!position.marginBottom;
    // const modalDialog = crel('cdiv', { class: "modal-dialog  clicker-modal-dialog-mobile modal-dialog-centered",
    //   style: "margin-top:" + (mt ? position.marginTop : 0) + 'px;' + "margin-bottom:"
    //     + (mb ? position.marginBottom : 0) + 'px;' , role: "document" });

    const modalContent = (classes) => crel('cdiv', { class: "clicker-modal-content " + classes,         style: "margin-top:" + (mt ? position.marginTop : 0) + 'px;' + "margin-bottom:"
        + (mb ? position.marginBottom : 0) + 'px;' });

    const modalBody = (classes) => crel('cdiv', { class: "clicker-modal-body" + classes , });



    const staticAboutTestItem = [
      {
        src: CLICKER_URL + "about/wrenchman.png",
        title: "Проверенные компании",
        description: "К вам приедет специалист из сертифицированной монтажной компании с высоким рейтингом"
      },
      {
        src: CLICKER_URL + "about/angel.png",
        title: "Честная цена",
        description: "Цены на услуги известны заранее, и не изменятся в процессе"
      },
      {
        src: CLICKER_URL + "about/quality.png",
        title: "Гарантия качества",
        description: "Если что-то пойдет не так — переделаем работу с другой компанией или вернем деньги"
      },
      {
        src: CLICKER_URL + "about/umbrella.png",
        title: "Все застраховано",
        description: "Если что-то испортится, компенсируем затраты в пределах 50 тысяч рублей"
      },
      {
        src: CLICKER_URL + "about/watch.png",
        title: "Когда вам удобно",
        description: "Мастер приедет в назначенное время и не будет лишний раз вам звонить"
      },
      {
        src: CLICKER_URL + "about/connected.png",
        title: "Мы на связи",
        description: "По любым вопросам с 9 до 22 в чате или по телефону"
      },
    ];

    const crossExit = crel('cdiv', { id: 'clicker-service-exit', class: " clicker-service-exit-mobile clicker-service-modal-close" }, "+");

    const worksTitle = (id_title, id_icon, title) => {
      let wrapper = crel('cdiv', { class: "clicker-service-works-icons-wrapper" });
      let icons = $(crel('cdiv', { class: "clicker-service-works-icons" }));
      let _title = $(crel('span', { id: id_title, class: "clicker-service-title-wrap" }, title));
      icons.append('<svg stroke="currentColor" id="close_icon_' + id_icon + '" style=" padding-top: 2px;" fill="currentColor" class=" side_icon" stroke-width="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path></svg>');
      icons.append(' <svg stroke="currentColor" id ="open_icon_' + id_icon + '" class="side_icon clicker-unvisible-item" style="position: absolute;" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path></svg>');
      $(wrapper).append(icons, _title);
      return wrapper;
    };

    const serviceHeader = (serviceName, price) =>
      crel('ch3', { class: "clicker-service-title" },
        serviceName + " ",
        crel('span', { class: "clicker-service-price" },
          price,
          crel('span', { class: "clicker-service-price-icon" },
            ` ₽`
          )
        )
      );


    const serviceList = (works) => {
      let list = crel('cul', { class: "clicker-service-list" });
      works.forEach(work => crel(list, crel('cli', {}, work)));
      return list;
    };
    const serviceWorks = (serviceDescription, includeWorks, notIncludeWorks) => {
      return crel('cdiv', { class: "clicker-service-list-wrap" },
        crel('cdiv', { class: "clicker-service-description" },
          serviceDescription
        ),
        crel('cdiv', { id: "service-include-works", class: "clicker-service-menu" },
          worksTitle("service-include-title", '1', "Работы, входящие в стоимость"),
          serviceList(includeWorks)
        ),
        crel('cdiv', { id: "clicker-service-not-include-works", class: "clicker-service-menu" },
          worksTitle("service-not-include-title", '2', "Работы, не входящие в стоимость"),
          serviceList(notIncludeWorks)
        )
      );
    }


    const starList = () => {
      let list = crel('ctable', { class: "clicker-stars-block" });
      return list;
    };
    const serviceReview = () =>
      crel('cdiv', { class: "clicker-service-review-block clicker-service-review-block-mobile " },
        starList(),
        crel('cdiv', { class: "clicker-service-review-text clicker-service-modal-wrapper-mobile" },
          crel('cdiv', { class: "clicker-service-review-text-short" },
            crel('cp', {},
              'Отзывов пока что нет'
            ),
            crel('cp', {},
            )
          ),
          crel('cdiv', { class: 'clicker-service-review-text-shadow clicker-service-review-text-shadow-mobile' })
        ));
    const serviceBlock = (servicePageConfig ) =>

      crel(
        crel('cdiv', { class: "clicker-service-container clicker-service-container-mobile" },
          crel('cdiv', {},
            crel('cdiv', { class: "clicker-service-title-block clicker-service-title-block-mobile" },
              serviceHeader(servicePageConfig.title, servicePageConfig.price),
              serviceWorks(servicePageConfig.description, servicePageConfig.includedWorks, servicePageConfig.notIncludedWorks),
            ),
            serviceReview(),
            crel('cdiv', { class: 'clicker-service-another-review' },
              crel('cp', {}, "Еще отзыв"),
              crel('cdiv', { class: 'clicker-service-another-review-underline' }),
            )
          )
        )
      );


    const serviceAboutItem = (imgSrc, title, description) => crel('cdiv', { class: "clicker-service-about-item clicker-service-about-item-mobile" },
      crel('img', { src: imgSrc, class: "clicker-service-padding-image clicker-service-about-item-margin-image" }),
      crel('cdiv', {},
        crel('cp', { class: 'clicker-service-about-item-text' }, title),
        crel('cp', { class: 'clicker-service-about-item-description clicker-service-about-item-description-mobile' },
          crel('span', {}, description)
        ),
      )
    );
    const aboutItemList = (aboutArr) => {
      let list = crel('cdiv', { class: 'clicker-service-about-items-wrapper clicker-service-about-items-wrapper-mobile' });
      aboutArr.forEach(item => crel(list, crel(serviceAboutItem(item.src, item.title, item.description))));
      return list;
    };

    const footer = crel('cdiv', { class: 'clicker-service-footer' },
      crel('cdiv', { class: 'clicker-service-footer-container clicker-service-footer-container-mobile' },
        crel('cdiv', { class: 'clicker-service-footer-text' },
          crel('cdiv', { class: 'clicker-service-footer-text-header clicker-service-footer-text-header-mobile clicker-service-footer-text-header-font-mobile' },
            crel('cp', {}, "Остались вопросы?")),
          crel('cdiv', { class: 'clicker-service-phone clicker-service-footer-text-header-mobile clicker-service-phone-mobile' },
            crel('a', {href: '/'}, "8 800 222-91-87")
          ),
        ),
        crel('cdiv', { class: 'clicker-service-wrapper-footer-icons clicker-service-wrapper-footer-icons-mobile' },
          crel('cdiv', { class: 'clicker-service-footer-icon clicker-service-footer-icon-modal' },
            crel('cdiv', { id: 'clicker-service-footer-image-1' },
              crel('a', { href: "/" },
                crel('img', {
                  class: 'clicker-service-footer-image-mobile',
                  src: "https://img.icons8.com/color/63/000000/telegram-app.png"
                })
              )),

            crel('cdiv', { id: 'clicker-service-footer-image-2' },
              crel('a', { href: "/" },
                crel('img', {
                  class: 'clicker-service-footer-image-mobile',
                  src: "https://img.icons8.com/color/63/000000/whatsapp.png"
                })
              )),
          )
        )
      )
    );
    const aboutBlock = (aboutItemArr) => crel('cdiv', { class: "clicker-service-about" },
      crel('cdiv', { class: "clicker-service-about-container clicker-service-about-container-mobile" },
        crel('cdiv', { class: "clicker-service-about-i" },
          crel('ch2', { class: "clicker-service-about-us-header clicker-service-about-us-header-mobile" }, "Как это работает"),
          crel('cp', { class: "clicker-service-about-us-description" }, "Передадим ваш заказ проверенным компаниям по установке." +
            "Проследим, чтобы все было сделано качественно, в срок и по оговоренной цене." +
            "Поможем, если что-то пойдет не так."),

          crel(aboutItemList(aboutItemArr),
            crel('cdiv', { id:'clicker-service-add-btn', class: ' clicker-service-add-btn_m clicker-service-modal-close' },
              crel('cp', {}, "Добавить к заказу")
            ),
            crel('cdiv', { class: 'clicker-offer-block' },
              crel('cp', {},
                "Нажимая кнопку «Добавить к заказу», я даю согласие на обработку персональных данных," +
                "включая право поручения обработки другим лицам, на условиях, изложенных  в ",
                crel("a", { target:'_blank',  href: "https://www.holodilnik.ru/defence/" }, 'Политике в отношении обработки персональных данных в Интернете'),
                " с которой я ознакомился, подтверждаю своё согласие с ",
                crel('a', { target:'_blank', href: "https://clicker.one/documents/privacy" }, "политикой конфиденциальности "),
                " и приниимаю условия ",
                crel('a', { target:'_blank', href: offerLink }, "оферты"),
              )
            ),
          ),
        ),
      ),
      footer
    );

    const fullModal = crel(modalWindow("clicker-service-modal"),
        crel(modalContent('clicker-service-modal-decorator clicker-service-modal-decorator-mobile'),
          crel(modalBody('clicker-service-modal-body'),
            crossExit,
            crel('cdiv', { class: "clicker-service-wrapper clicker-service-wrapper-mobile" },
              crel('cdiv', { class: "clicker-service-modal-wrapper clicker-service-modal-wrapper-mobile" },
                serviceBlock(pageData)
              )
            ),
            aboutBlock(staticAboutTestItem)
          )
        )
    );



    crel(container, style, fullModal);
    $('#clicker-service-add-btn').on('click', handleOffer);
    return (pageData) => {

      let localData = servicesDataMap.get(pageData);

      (() => {
        let container = $('.clicker-service-title-block')
        container.empty();
        container.append(
          serviceHeader(localData.title, localData.price),
          serviceWorks(localData.description, localData.includedWorks, localData.notIncludedWorks)
        )
        showFullHandle()
      })()
      return localData
      // return f = () => {
      //   let data = localData;
      //   addServiceHandler(localData.productId)
      // }
    }
  }

  // занимается управлением данных на модальном окне
  let pageDataController = null;
  let shortPageDataController = null;
  //*****Сетевые запросы *****//
  const CLICKER_API = 'https://clicker-git-servertestnew.clicker.now.sh/api/';

  const getRequest = (queryParams, url, data) => {
    return $.ajax({

      // The 'type' property sets the HTTP method.
      // A value of 'PUT' or 'DELETE' will trigger a preflight request.
      type: 'GET',

      // The URL to make the request to.
      url: CLICKER_API + url + queryParams,

      // The 'contentType' property sets the 'Content-Type' header.
      // The JQuery default for this property is
      // 'application/x-www-form-urlencoded; charset=UTF-8', which does not trigger
      // a preflight. If you set this value to anything other than
      // application/x-www-form-urlencoded, multipart/form-data, or text/plain,
      // you will trigger a preflight request.

      contentType: 'application/x-www-form-urlencoded',
      dataType: 'json',
      data: data,
      xhrFields: {
        // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
        // This can be used to set the 'withCredentials' property.
        // Set the value to 'true' if you'd like to pass cookies to the server.
        // If this is enabled, your server must respond with the header
        // 'Access-Control-Allow-Credentials: true'.
        withCredentials: false
      },

      headers: {
        "Content-Type": 'application/x-www-form-urlencoded',
        // Set any custom headers here.
        // If you set any non-simple headers, your server must include these
        // headers in the 'Access-Control-Allow-Headers' response header.
      },
      timeout: 20000 // установка 20ти секундного тайм-аута

    });

  };


  let requestServices = async (shopSlug, data ) => getRequest('shopSlug='+shopSlug, 'getServicesToShop?', data);


  /***************/


  /*******ANIMATION********/

  let initAnimation = (modalWindow, reviews) => {


    let revIndex =0;
    let shadowController = function() {
      let textShadow = $('.clicker-service-review-text-shadow');
      $('.clicker-service-review-text-short')[0].scrollHeight <= 151
        ? textShadow.addClass('clicker-unvisible-item')
        :textShadow.removeClass('clicker-unvisible-item');

    };

    const accordionFunction = (id, i) => {
      $(id).on('click', (event) => {
        let max_height = $(id +' > cul')[0].scrollHeight;
        if($(id + ' > cul').css('max-height') === (max_height + 'px') ) {
          $(id + ' > cul').css('max-height', '0px');
          $('#open_icon_' + i).addClass('clicker-unvisible-item');
          $('#close_icon_' + i).removeClass('clicker-unvisible-item');
        }
        else {
          $(id + ' > cul').css('max-height', (max_height + 'px'));
          $('#open_icon_' + i).removeClass('clicker-unvisible-item');
          $('#close_icon_' + i).addClass('clicker-unvisible-item');
        }
        $(id).toggleClass('open');
      })
    };

    let accordionFunctionHeightFn = function(id, i) {
      let max_height = $(id + ' > cul')[0].scrollHeight;
      if( $(id).hasClass('open') ) $(id + ' > cul').css('max-height', (max_height + 'px'));
    };

    let risizeable = () => {
      let reviewText = $('.clicker-service-review-text-short');
      accordionFunctionHeightFn('#service-include-works', '1');
      accordionFunctionHeightFn('#clicker-service-not-include-works', '2');
      if(!reviewText.hasClass('clicker-service-review-text-full')) {
        shadowController();
      }
    }

    let textAccordion = () => {
      let reviewText = $('.clicker-service-review-text-short');
      let textShadow = $('.clicker-service-review-text-shadow');
      if(reviewText[0].scrollHeight <= 151) {
        textShadow.addClass('clicker-unvisible-item');
      } else if(reviewText[0].scrollHeight > 151) {
        reviewText.toggleClass('clicker-service-review-text-full');
        setTimeout(() => {
          reviewText.hasClass('clicker-service-review-text-full') ? textShadow.addClass('clicker-unvisible-item')
            : textShadow.removeClass('clicker-unvisible-item')
        } , 100);
      };
    }

    let anotherReview = () => {
      let anotherRev = $('.clicker-service-review-text-short > cp');
      $('.clicker-service-review-text-short').removeClass('clicker-service-review-text-full');
      anotherRev.fadeOut("slow");
      $('.clicker-stars-block').empty();
      for (let i = 0; i < reviews[revIndex].rate; i++) {
        let cdiv = $(crel('ctd', {})).append('<svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.5 0L14.0819 7.9463H22.4371L15.6776 12.8574L18.2595 20.8037L11.5 15.8926L4.74047 20.8037L7.32238 12.8574L0.56285 7.9463H8.91809L11.5 0Z" fill="#B4DCFF"/></svg>');
        $('.clicker-stars-block').append(cdiv);
      }

      setTimeout(() => {
        revIndex === reviews.length-1 ? revIndex = 0 : revIndex++;
        anotherRev[0].innerHTML = reviews[revIndex].review;
        anotherRev[1].innerHTML = reviews[revIndex].author + ', ' +reviews[revIndex].city;
        shadowController();
        anotherRev.fadeIn("slow");
      }, 500);
    };

    modalWindow.on(CLICKER_MODAL_EVENTS.CLICKER_SERVICE_OPEN, () => {
      let reviewText = $('.clicker-service-review-text-short');
      $(window).on('resize',risizeable)
      $('.clicker-service-another-review >cp').on('click', anotherReview);
      accordionFunction('#service-include-works',1);
      accordionFunction('#clicker-service-not-include-works', 2);
      reviewText.on('click', textAccordion);
      shadowController();
    })

    modalWindow.on(CLICKER_MODAL_EVENTS.CLICKER_SERVICE_CLOSE, () => {
      let reviewText = $('.clicker-service-review-text-short');
      $(window).off('resize',risizeable);
      reviewText.off('click', textAccordion);
      $('.clicker-service-another-review >cp').off('click', anotherReview);
    })

    reviews.length > 0 && anotherReview();
  }

  // Данные мапятся по id товара
  let servicesDataMap = new Map();
  /*************************
   /*******HANDLERS********/
  let addServiceHandler = (productId) => {
    let LocalServices = new Map(JSON.parse(localStorage.getItem('clickerServiceStorage')));
    let serviceId =  productId;
    if (LocalServices.has(serviceId)) return;
    if(!servicesDataMap.get(productId).serviceId) {
      console.error('Сервис не найден')
      return;
    }
    LocalServices.set(serviceId, true);
    localStorage.setItem('clickerServiceStorage', JSON.stringify(Array.from(LocalServices.entries())))
  }

  let removeServiceHandler = (productId) => {

    let id = productId;
    (() => {
      let serviceId = id;
      let LocalServices = localStorage.getItem('clickerServiceStorage')
      if(!LocalServices) return;
      LocalServices = new Map(JSON.parse(LocalServices))
      if (!LocalServices.has(serviceId)) return;
      LocalServices.delete(serviceId);
      localStorage.setItem('clickerServiceStorage', JSON.stringify(Array.from(LocalServices.entries())))
    })()
  }

  let offerHandle = () => {
    localStorage.setItem('clickerOfferViewed', '1');
  }

  let fillServiceData = (service , elements) => {
      let {productId, title ,titleModal, includedWorks, notIncludedWorks, price, quantity } = service
      service.title = titleModal ? titleModal : title;
      service.includedWorks = typeof includedWorks === "string" ? includedWorks.match(serviceRegExp) : [''];
      service.notIncludedWorks = typeof notIncludedWorks === "string" ? notIncludedWorks.match(serviceRegExp) : [''];
      servicesDataMap.set(productId, service )
      let {$element, $p} = elements;
      $element.css('visibility', 'visible')
      $p.text( "  " + ( (price * quantity) / price) + '.шт - ' + (price * quantity) + ' руб. ')

  }

  let checkHandle  = (productId , $checkBox, $tip) => {
    let checkBox = $checkBox;
    let tip = $tip;
    let id = productId;
    return () => {

      let clickerServiceStorage = new Map(JSON.parse(localStorage.getItem('clickerServiceStorage')));
      console.log(clickerServiceStorage.has(id))
      checkBox.prop('checked', !!clickerServiceStorage.has(id));
      $checkBox.prop('checked') ? tip.fadeIn(0)
        : tip.fadeOut(0);
    }
  }

  let showShortModalHandle = () => {
    if(!localStorage.getItem('clickerOfferViewed')) {
      let offer = $('#offerModal');
      offer.css('display', 'flex');
      offer.trigger(CLICKER_MODAL_EVENTS.CLICKER_OFFER_OPEN)
    }
  }

  let showFullHandle = () => {
    let service = $('#clicker-service-modal');
    service.css('display', 'flex');
    service.trigger(CLICKER_MODAL_EVENTS.CLICKER_SERVICE_OPEN)
  }

  let checkBoxChangeHandler = (productId, $checkBox, $tip) => {

    const local = productId;
    const tip = $tip;
    return () => {
      console.log('chaange');
      if ((shortPageDataController !== null || undefined) && typeof shortPageDataController === "function")
        shortPageDataController(local);

      if($checkBox.parent().length ) {
        $checkBox.prop('checked') ? tip.fadeIn(0)
          : tip.fadeOut(0);
      }
      if ($checkBox.prop('checked') !== true) {
        removeServiceHandler(local)
        return;
      }

      if(localStorage.getItem('clickerOfferViewed')) addServiceHandler(local);
      showShortModalHandle();
    }
  }

  let spanClickHandler = (productId) => {
      const local = productId;
      return () => {
        if ((pageDataController !== null || undefined) && typeof pageDataController === "function")
          var localData = pageDataController(local);
          let f = () => {
            addServiceHandler(localData.productId);
          }
        $('#clicker-service-modal').on(CLICKER_MODAL_EVENTS.CLICKER_SERVICE_CLOSE, f)
        $('#clicker-service-modal').on(CLICKER_MODAL_EVENTS.CLICKER_SERVICE_CLOSE_FORCE,
          () => $('#clicker-service-modal').off(CLICKER_MODAL_EVENTS.CLICKER_SERVICE_CLOSE, f)
        )
      }};
  /*******************/

  // функция чтобы проверить есть ли бутстрап на странице
  let bootstrapExistCheck = () => {
    // для этого создаем псвдо модальное окно и проверяем его на наличие фукнции modal
    let bootstrapScriptCheck =  $("<cdiv class='modal fade modal_clicker' role: 'dialog></cdiv>").modal
    if(typeof bootstrapScriptCheck !== "function" && !bootstrapScriptCheck) return false;
    // далее смотрим среди link стили bootstrap
    const bootstrapCssRegExp = /bootstrapOnlyModal[.\w]*[.]{1}css/g;
    let cssFound = false
    Array.from($('link')).some(
      (element) => {
        let href =  $(element).attr('href').match(bootstrapCssRegExp)
        if(!!href) cssFound = true;
        // возвращаем еще раз чтобы не проверять остальные link
        return !!href;
      })
    return cssFound
  }

  let  main = async () => {
    if(typeof jQuery === "undefined" ) {
      console.error('jquery отсутвует на странице см документацию Clicker')
      return;
    }

    // if(!bootstrapExistCheck()) {
    //   console.error('bootstrap отсутвует на странице см документацию Clicker')
    //   return;
    // }

    if(!clickerInitOption) {
      console.error('clickerInitOption отсутвует на странице см документацию Clicker')
      return;
    }

    let clickerControlElements = $('div[clickerElement]');

    if(typeof clickerControlElements === "undefined" || !clickerControlElements || clickerControlElements.length === 0) {
      return;
    }

    if((!clickerInitOption.city ) || (!clickerInitOption.shopSlug)) {
      $(clickerControlElements).fadeOut(0);
      console.error('city or shopSlug в clickerInitOption отсутсвуют см документацию Clicker');
      return;
    }



    // выполняем коллбек от магазина
    if(!!clickerInitOption.clickerServicesExistCallback) {
      let arr = JSON.parse(localStorage.getItem('clickerServiceStorage'));
      if(Array.isArray(arr) && arr.length && typeof (clickerInitOption.clickerServicesExistCallback) == 'function')
        clickerInitOption.clickerServicesExistCallback()
    }

    // создаем мапу элементов по id товара
    let elementsMap = new Map();
    // 1 сделать запрос с товарами и получить услуги , оферту и отзывы
    let productDataToServer = []


    // 1.1 формируем данные для отправки на бек
    Array.from(clickerControlElements).forEach(element => {
      let $element = $(element);
      let elementClickerData = $element.attr('clickerData');
      if(typeof elementClickerData !== "undefined" || elementClickerData !== null) {
        try {
          let readyElementClickerData = (JSON.parse(elementClickerData));
          let {productId, title, categoryId} = readyElementClickerData;
          if(!!productId || !!title || !!categoryId) {
            elementsMap.set(productId, $element)
            productDataToServer.push(readyElementClickerData)
          }
        } catch (e) {
          $element.fadeOut(0);
          console.error(e)
        }
      }
    });

    if(productDataToServer.length === 0) {
      $(clickerControlElements).fadeOut(0);
      console.error('Не найдены clickerElement см документацию clicker')
      return ;
    }

    // пытаемся отправить и получить данные с бека
    let dataFromServer = null;
    try {
      let city = clickerInitOption.city;
      let cart = JSON.stringify(productDataToServer)
      dataFromServer =  await requestServices(clickerInitOption.shopSlug, {city , cart} );

    } catch (e) {
      $(clickerControlElements).fadeOut(0);
      console.error(e.responseText);
      return;
    }


    let {shopInfo, services} = dataFromServer;

    // Если ответ от сервера с null полями то что то пошло не так
    if (!shopInfo || !services ) {
      $(clickerControlElements).fadeOut(0);
      return;
    }

    let {offerLink, reviews} = shopInfo;
    if(!!offerLink) offerLink = '';

    if (!Array.isArray(reviews)) reviews = [];

    // 2 если все нормально - отрисовать
    // Блок который содержит внутри все наши стили , модальные окна
    crel(clickerContainer,modalStyleEl ,clickerContainerStyleEl,shortStyleEl, fullStyleEl)
    crel(clickerBlock, fontsEl,  clickerContainer)
    crel(document.body, clickerBlock);
    //Инициализируем наше модальное окно - возвращает фнкцию для смены состояния модального окна
    shortPageDataController = createShortModal(clickerContainer,offerLink,  offerHandle , '');
    pageDataController = createFullModal (clickerContainer,{title:'', price:'0', description:'',
      includedWorks:[], notIncludedWorks:[]}  , offerHandle, '', clickerInitOption.modalPosition, offerLink)
    console.log(pageDataController)
    // инициалищируем анимацию для модальных окон
    initAnimation($('#clicker-service-modal'), reviews);

    //перебираем массив услуг и связываем визуальные элементы с услугами
    Array.from(services).some(service => {
      let productId = service.productId;
      let $element = elementsMap.get(productId);
      if (!$element) return;

      let $checkBox = $element.find('input')
      $checkBox.addClass('clicker-offer-modal-open')
      let $span = $element.find('span[description]')
      $span.addClass('clicker-service-modal-open')
      let $p = $element.find('p[price]')
      let $tip= $element.find('p[tip]');
      if(!$checkBox.length || !$span.length ) {
        $element.fadeOut(0);
        console.error('clickerElement не соотвествует шаблону см документацию Clicker')
        return;
      }
      // проверка на наличие выбранные услуг в LocalStorage
      checkHandle(productId , $checkBox, $tip)();

      // вешаем хендлеры на различные события
      // $('.clicker-modal').on(
      //   CLICKER_MODAL_EVENTS.CLICKER_SERVICE_CLOSE, checkHandle(productId, $checkBox, $tip));
      $('#offerModal').on(CLICKER_MODAL_EVENTS.CLICKER_OFFER_CLOSE_FORCE,  (checkHandle(productId, $checkBox, $tip)) );
      $('#clicker-service-modal').on(CLICKER_MODAL_EVENTS.CLICKER_SERVICE_CLOSE, () => setTimeout( checkHandle(productId, $checkBox, $tip),10 ));
      $checkBox.on('change', checkBoxChangeHandler(productId, $checkBox, $tip ) );
      $span.on('click', spanClickHandler(productId));


      //clicker-service-modal
      //события для модального окна с офертой
      // события закрытия
      let offer =  $('#offerModal');
      $('#clicker-offer-accept').on('click', () => {
        offer.css('display', 'none');
        offer.trigger(CLICKER_MODAL_EVENTS.CLICKER_OFFER_CLOSE);
      })
      $('#clicker-offer-exit').on('click', () => {
        offer.css('display', 'none');
        offer.trigger(CLICKER_MODAL_EVENTS.CLICKER_OFFER_CLOSE_FORCE);
      })
      $(window).on('mousedown', (event) => {
        console.log($(event.target).attr('id'));
        console.log($(offer.attr('id')).attr('id'));
          if ($(event.target).attr('id') === offer.attr('id')) {
            offer.css('display', 'none');
            offer.trigger(CLICKER_MODAL_EVENTS.CLICKER_OFFER_CLOSE_FORCE);
          }
      })

      //события для модального окна с услугами
      // события закрытия
      let _service =  $('#clicker-service-modal');
      $('#clicker-service-add-btn').on('click', (event) => {
        _service.css('display', 'none');
        _service.trigger(CLICKER_MODAL_EVENTS.CLICKER_SERVICE_CLOSE);
      })
      $('#clicker-service-exit').on('click', (event) => {
        _service.css('display', 'none');
        _service.trigger(CLICKER_MODAL_EVENTS.CLICKER_SERVICE_CLOSE_FORCE);
      })
      $(window).on('mousedown', (event) => {
        console.log($(event.target).attr('id'));
        console.log($(offer.attr('id')).attr('id'));
        if ($(event.target).attr('id') === _service.attr('id')) {
          _service.css('display', 'none');
          _service.trigger(CLICKER_MODAL_EVENTS.CLICKER_SERVICE_CLOSE_FORCE);
        }
      })

      // заполняем данные для модальных окон
      fillServiceData(service, {$element, $p})

    })


  }

  launchScript(main)
})()