/*! iFrame Resizer (iframeSizer.min.js ) - v4.2.6 - 2019-11-10
 *  Desc: Force cross domain iframes to size to content.
 *  Requires: iframeResizer.contentWindow.min.js to be loaded into the target frame.
 *  Copyright: (c) 2019 David J. Bradshaw - dave@bradshaw.net
 *  License: MIT
 */

!(function(l) {

  if ("undefined" != typeof window) {
    var e,
      m = 0,
      g = !1,
      o = !1,
      v = "message".length,
      I = "[iFrameSizer]",
      x = I.length,
      F = null,
      r = window.requestAnimationFrame,
      h = { max: 1, scroll: 1, bodyScroll: 1, documentElementScroll: 1 },
      M = {},
      i = null,
      w = {
        autoResize: !0,
        bodyBackground: null,
        bodyMargin: null,
        bodyMarginV1: 8,
        bodyPadding: null,
        checkOrigin: !0,
        inPageLinks: !1,
        enablePublicMethods: !0,
        heightCalculationMethod: "bodyOffset",
        id: "iFrameResizer",
        interval: 32,
        log: !1,
        maxHeight: 1 / 0,
        maxWidth: 1 / 0,
        minHeight: 0,
        minWidth: 0,
        resizeFrom: "parent",
        scrolling: !1,
        sizeHeight: !0,
        sizeWidth: !1,
        warningTimeout: 5e3,
        tolerance: 0,
        widthCalculationMethod: "scroll",
        onClose: function() {
          return !0;
        },
        onClosed: function() {},
        onInit: function() {},
        onMessage: function() {
          E("onMessage function not defined");
        },
        onResized: function() {},
        onScroll: function() {
          return !0;
        },
      },
      z = {};
    window.jQuery &&
      ((e = window.jQuery).fn
        ? e.fn.iFrameResize ||
          (e.fn.iFrameResize = function(i) {
            return this.filter("iframe")
              .each(function(e, n) {
                d(n, i);
              })
              .end();
          })
        : T("", "Unable to bind to jQuery, it is not fully loaded.")),
      "function" == typeof define && define.amd
        ? define([], q)
        : "object" == typeof module &&
          "object" == typeof module.exports &&
          (module.exports = q()),
      (window.iFrameResize = window.iFrameResize || q());
  }
  function p() {
    return (
      window.MutationObserver ||
      window.WebKitMutationObserver ||
      window.MozMutationObserver
    );
  }
  function k(e, n, i) {
    e.addEventListener(n, i, !1);
  }
  function O(e, n, i) {
    e.removeEventListener(n, i, !1);
  }
  function a(e) {
    return (
      I +
      "[" +
      (function(e) {
        var n = "Host page: " + e;
        return (
          window.top !== window.self &&
            (n =
              window.parentIFrame && window.parentIFrame.getId
                ? window.parentIFrame.getId() + ": " + e
                : "Nested host page: " + e),
          n
        );
      })(e) +
      "]"
    );
  }
  function t(e) {
    return M[e] ? M[e].log : g;
  }
  function R(e, n) {
    s("log", e, n, t(e));
  }
  function T(e, n) {
    s("info", e, n, t(e));
  }
  function E(e, n) {
    s("warn", e, n, !0);
  }
  function s(e, n, i, t) {
    !0 === t && "object" == typeof window.console && console[e](a(n), i);
  }
  function n(n) {
    function e() {
      i("Height"),
        i("Width"),
        A(
          function() {
            P(b), S(y), d("onResized", b);
          },
          b,
          "init",
        );
    }
    function i(e) {
      var n = Number(M[y]["max" + e]),
        i = Number(M[y]["min" + e]),
        t = e.toLowerCase(),
        o = Number(b[t]);
      R(y, "Checking " + t + " is in range " + i + "-" + n),
        o < i && ((o = i), R(y, "Set " + t + " to min value")),
        n < o && ((o = n), R(y, "Set " + t + " to max value")),
        (b[t] = "" + o);
    }
    function t(e) {
      return p.substr(p.indexOf(":") + v + e);
    }
    function a(e, n) {
      !(function(e, n, i) {
        z[i] ||
          (z[i] = setTimeout(function() {
            (z[i] = null), e();
          }, n));
      })(
        function() {
          B(
            "Send Page Info",
            "pageInfo:" +
              (function() {
                var e = document.body.getBoundingClientRect(),
                  n = b.iframe.getBoundingClientRect();
                return JSON.stringify({
                  iframeHeight: n.height,
                  iframeWidth: n.width,
                  clientHeight: Math.max(
                    document.documentElement.clientHeight,
                    window.innerHeight || 0,
                  ),
                  clientWidth: Math.max(
                    document.documentElement.clientWidth,
                    window.innerWidth || 0,
                  ),
                  offsetTop: parseInt(n.top - e.top, 10),
                  offsetLeft: parseInt(n.left - e.left, 10),
                  scrollTop: window.pageYOffset,
                  scrollLeft: window.pageXOffset,
                  documentHeight: document.documentElement.clientHeight,
                  documentWidth: document.documentElement.clientWidth,
                  windowHeight: window.innerHeight,
                  windowWidth: window.innerWidth,
                });
              })(),
            e,
            n,
          );
        },
        32,
        n,
      );
    }
    function r(e) {
      var n = e.getBoundingClientRect();
      return (
        N(y),
        {
          x: Math.floor(Number(n.left) + Number(F.x)),
          y: Math.floor(Number(n.top) + Number(F.y)),
        }
      );
    }
    function o(e) {
      var n = e ? r(b.iframe) : { x: 0, y: 0 },
        i = { x: Number(b.width) + n.x, y: Number(b.height) + n.y };
      R(
        y,
        "Reposition requested from iFrame (offset x:" + n.x + " y:" + n.y + ")",
      ),
        window.top !== window.self
          ? window.parentIFrame
            ? window.parentIFrame["scrollTo" + (e ? "Offset" : "")](i.x, i.y)
            : E(
                y,
                "Unable to scroll to requested position, window.parentIFrame not found",
              )
          : ((F = i), s(), R(y, "--"));
    }
    function s() {
      !1 !== d("onScroll", F) ? S(y) : H();
    }
    function d(e, n) {
      return W(y, e, n);
    }
    var c,
      u,
      f,
      l,
      m,
      g,
      h,
      w,
      p = n.data,
      b = {},
      y = null;
    "[iFrameResizerChild]Ready" === p
      ? (function() {
          for (var e in M) B("iFrame requested init", L(e), M[e].iframe, e);
        })()
      : I === ("" + p).substr(0, x) && p.substr(x).split(":")[0] in M
      ? ((m = p.substr(x).split(":")),
        (g = m[1] ? parseInt(m[1], 10) : 0),
        (h = M[m[0]] && M[m[0]].iframe),
        (w = getComputedStyle(h)),
        (b = {
          iframe: h,
          id: m[0],
          height:
            g +
            (function(e) {
              if ("border-box" !== e.boxSizing) return 0;
              var n = e.paddingTop ? parseInt(e.paddingTop, 10) : 0,
                i = e.paddingBottom ? parseInt(e.paddingBottom, 10) : 0;
              return n + i;
            })(w) +
            (function(e) {
              if ("border-box" !== e.boxSizing) return 0;
              var n = e.borderTopWidth ? parseInt(e.borderTopWidth, 10) : 0,
                i = e.borderBottomWidth ? parseInt(e.borderBottomWidth, 10) : 0;
              return n + i;
            })(w),
          width: m[2],
          type: m[3],
        }),
        (y = b.id),
        M[y] && (M[y].loaded = !0),
        (l = b.type in { true: 1, false: 1, undefined: 1 }) &&
          R(y, "Ignoring init message from meta parent page"),
        !l &&
          ((f = !0),
          M[(u = y)] ||
            ((f = !1),
            E(b.type + " No settings for " + u + ". Message was: " + p)),
          f) &&
          (R(y, "Received: " + p),
          (c = !0),
          null === b.iframe &&
            (E(y, "IFrame (" + b.id + ") not found"), (c = !1)),
          c &&
            (function() {
              var e,
                i = n.origin,
                t = M[y] && M[y].checkOrigin;
              if (
                t &&
                "" + i != "null" &&
                !(t.constructor === Array
                  ? (function() {
                      var e = 0,
                        n = !1;
                      for (
                        R(
                          y,
                          "Checking connection is from allowed list of origins: " +
                            t,
                        );
                        e < t.length;
                        e++
                      )
                        if (t[e] === i) {
                          n = !0;
                          break;
                        }
                      return n;
                    })()
                  : ((e = M[y] && M[y].remoteHost),
                    R(y, "Checking connection is from: " + e),
                    i === e))
              )
                throw new Error(
                  "Unexpected message received from: " +
                    i +
                    " for " +
                    b.iframe.id +
                    ". Message was: " +
                    n.data +
                    ". This error can be disabled by setting the checkOrigin: false option or by providing of array of trusted domains.",
                );
              return !0;
            })() &&
            (function() {
              switch (
                (M[y] && M[y].firstRun && M[y] && (M[y].firstRun = !1), b.type)
              ) {
                case "close":
                  C(b.iframe);
                  break;
                case "message":
                  !(function(e) {
                    R(
                      y,
                      "onMessage passed: {iframe: " +
                        b.iframe.id +
                        ", message: " +
                        e +
                        "}",
                    ),
                      d("onMessage", {
                        iframe: b.iframe,
                        message: JSON.parse(e),
                      }),
                      R(y, "--");
                  })(t(6));
                  break;
                case "autoResize":
                  M[y].autoResize = JSON.parse(t(9));
                  break;
                case "scrollTo":
                  o(!1);
                  break;
                case "scrollToOffset":
                  o(!0);
                  break;
                case "pageInfo":
                  a(M[y] && M[y].iframe, y),
                    (function() {
                      function e(n, i) {
                        function t() {
                          M[r] ? a(M[r].iframe, r) : o();
                        }
                        ["scroll", "resize"].forEach(function(e) {
                          R(r, n + e + " listener for sendPageInfo"),
                            i(window, e, t);
                        });
                      }
                      function o() {
                        e("Remove ", O);
                      }
                      var r = y;
                      e("Add ", k), M[r] && (M[r].stopPageInfo = o);
                    })();
                  break;
                case "pageInfoStop":
                  M[y] &&
                    M[y].stopPageInfo &&
                    (M[y].stopPageInfo(), delete M[y].stopPageInfo);
                  break;
                case "inPageLink":
                  !(function(e) {
                    var n,
                      i = e.split("#")[1] || "",
                      t = decodeURIComponent(i),
                      o =
                        document.getElementById(t) ||
                        document.getElementsByName(t)[0];
                    o
                      ? ((n = r(o)),
                        R(
                          y,
                          "Moving to in page link (#" +
                            i +
                            ") at x: " +
                            n.x +
                            " y: " +
                            n.y,
                        ),
                        (F = { x: n.x, y: n.y }),
                        s(),
                        R(y, "--"))
                      : window.top !== window.self
                      ? window.parentIFrame
                        ? window.parentIFrame.moveToAnchor(i)
                        : R(
                            y,
                            "In page link #" +
                              i +
                              " not found and window.parentIFrame not found",
                          )
                      : R(y, "In page link #" + i + " not found");
                  })(t(9));
                  break;
                case "reset":
                  j(b);
                  break;
                case "init":
                  e(), d("onInit", b.iframe);
                  break;
                default:
                  e();
              }
            })()))
      : T(y, "Ignored: " + p);
  }
  function W(e, n, i) {
    var t = null,
      o = null;
    if (M[e]) {
      if ("function" != typeof (t = M[e][n]))
        throw new TypeError(n + " on iFrame[" + e + "] is not a function");
      o = t(i);
    }
    return o;
  }
  function b(e) {
    var n = e.id;
    delete M[n];
  }
  function C(e) {
    var n = e.id;
    if (!1 !== W(n, "onClose", n)) {
      R(n, "Removing iFrame: " + n);
      try {
        e.parentNode && e.parentNode.removeChild(e);
      } catch (e) {
        E(e);
      }
      W(n, "onClosed", n), R(n, "--"), b(e);
    } else R(n, "Close iframe cancelled by onClose event");
  }
  function N(e) {
    null === F &&
      R(
        e,
        "Get page position: " +
          (F = {
            x:
              window.pageXOffset !== l
                ? window.pageXOffset
                : document.documentElement.scrollLeft,
            y:
              window.pageYOffset !== l
                ? window.pageYOffset
                : document.documentElement.scrollTop,
          }).x +
          "," +
          F.y,
      );
  }
  function S(e) {
    null !== F &&
      (window.scrollTo(F.x, F.y),
      R(e, "Set page position: " + F.x + "," + F.y),
      H());
  }
  function H() {
    F = null;
  }
  function j(e) {
    R(
      e.id,
      "Size reset requested by " + ("init" === e.type ? "host page" : "iFrame"),
    ),
      N(e.id),
      A(
        function() {
          P(e), B("reset", "reset", e.iframe, e.id);
        },
        e,
        "reset",
      );
  }
  function P(n) {
    function i(e) {
      o ||
        "0" !== n[e] ||
        ((o = !0),
        R(t, "Hidden iFrame detected, creating visibility listener"),
        (function() {
          function n() {
            Object.keys(M).forEach(function(e) {
              !(function(n) {
                function e(e) {
                  return "0px" === (M[n] && M[n].iframe.style[e]);
                }
                M[n] &&
                  null !== M[n].iframe.offsetParent &&
                  (e("height") || e("width")) &&
                  B("Visibility change", "resize", M[n].iframe, n);
              })(e);
            });
          }
          function i(e) {
            R("window", "Mutation observed: " + e[0].target + " " + e[0].type),
              c(n, 16);
          }
          var t = p();
          t &&
            (function() {
              var e = document.querySelector("body");
              new t(i).observe(e, {
                attributes: !0,
                attributeOldValue: !1,
                characterData: !0,
                characterDataOldValue: !1,
                childList: !0,
                subtree: !0,
              });
            })();
        })());
    }
    function e(e) {
      !(function(e) {
        n.id
          ? ((n.iframe.style[e] = n[e] + "px"),
            R(n.id, "IFrame (" + t + ") " + e + " set to " + n[e] + "px"))
          : R("undefined", "messageData id not set");
      })(e),
        i(e);
    }
    var t = n.iframe.id;
    M[t] && (M[t].sizeHeight && e("height"), M[t].sizeWidth && e("width"));
  }
  function A(e, n, i) {
    i !== n.type && r && !window.jasmine
      ? (R(n.id, "Requesting animation frame"), r(e))
      : e();
  }
  function B(e, n, i, t, o) {
    var r,
      a = !1;
    (t = t || i.id),
      M[t] &&
        (i && "contentWindow" in i && null !== i.contentWindow
          ? ((r = M[t] && M[t].targetOrigin),
            R(
              t,
              "[" +
                e +
                "] Sending msg to iframe[" +
                t +
                "] (" +
                n +
                ") targetOrigin: " +
                r,
            ),
            i.contentWindow.postMessage(I + n, r))
          : E(t, "[" + e + "] IFrame(" + t + ") not found"),
        o &&
          M[t] &&
          M[t].warningTimeout &&
          (M[t].msgTimeout = setTimeout(function() {
            !M[t] ||
              M[t].loaded ||
              a ||
              ((a = !0),
              E(
                t,
                "IFrame has not responded within " +
                  M[t].warningTimeout / 1e3 +
                  " seconds. Check iFrameResizer.contentWindow.js has been loaded in iFrame. This message can be ignored if everything is working, or you can set the warningTimeout option to a higher value or zero to suppress this warning.",
              ));
          }, M[t].warningTimeout)));
  }
  function L(e) {
    return (
      e +
      ":" +
      M[e].bodyMarginV1 +
      ":" +
      M[e].sizeWidth +
      ":" +
      M[e].log +
      ":" +
      M[e].interval +
      ":" +
      M[e].enablePublicMethods +
      ":" +
      M[e].autoResize +
      ":" +
      M[e].bodyMargin +
      ":" +
      M[e].heightCalculationMethod +
      ":" +
      M[e].bodyBackground +
      ":" +
      M[e].bodyPadding +
      ":" +
      M[e].tolerance +
      ":" +
      M[e].inPageLinks +
      ":" +
      M[e].resizeFrom +
      ":" +
      M[e].widthCalculationMethod
    );
  }
  function d(i, e) {
    function n(e) {
      var n = e.split("Callback");
      if (2 === n.length) {
        var i = "on" + n[0].charAt(0).toUpperCase() + n[0].slice(1);
        (this[i] = this[e]),
          delete this[e],
          E(
            c,
            "Deprecated: '" +
              e +
              "' has been renamed '" +
              i +
              "'. The old method will be removed in the next major version.",
          );
      }
    }
    var t,
      o,
      r,
      a,
      s,
      d,
      c =
        ("" === (o = i.id) &&
          ((i.id =
            ((t = (e && e.id) || w.id + m++),
            null !== document.getElementById(t) && (t += m++),
            (o = t))),
          (g = (e || {}).log),
          R(o, "Added missing iframe ID: " + o + " (" + i.src + ")")),
        o);
    function u(e) {
      1 / 0 !== M[c][e] &&
        0 !== M[c][e] &&
        ((i.style[e] = M[c][e] + "px"),
        R(c, "Set " + e + " = " + M[c][e] + "px"));
    }
    function f(e) {
      if (M[c]["min" + e] > M[c]["max" + e])
        throw new Error(
          "Value for min" + e + " can not be greater than max" + e,
        );
    }
    c in M && "iFrameResizer" in i
      ? E(c, "Ignored iFrame, already setup.")
      : ((d = (d = e) || {}),
        (M[c] = {
          firstRun: !0,
          iframe: i,
          remoteHost:
            i.src &&
            i.src
              .split("/")
              .slice(0, 3)
              .join("/"),
        }),
        (function(e) {
          if ("object" != typeof e)
            throw new TypeError("Options is not an object");
        })(d),
        Object.keys(d).forEach(n, d),
        (function(e) {
          for (var n in w)
            Object.prototype.hasOwnProperty.call(w, n) &&
              (M[c][n] = Object.prototype.hasOwnProperty.call(e, n)
                ? e[n]
                : w[n]);
        })(d),
        M[c] &&
          (M[c].targetOrigin =
            !0 === M[c].checkOrigin
              ? (function(e) {
                  return "" === e || "file://" === e ? "*" : e;
                })(M[c].remoteHost)
              : "*"),
        (function() {
          switch (
            (R(
              c,
              "IFrame scrolling " +
                (M[c] && M[c].scrolling ? "enabled" : "disabled") +
                " for " +
                c,
            ),
            (i.style.overflow =
              !1 === (M[c] && M[c].scrolling) ? "hidden" : "auto"),
            M[c] && M[c].scrolling)
          ) {
            case "omit":
              break;
            case !0:
              i.scrolling = "yes";
              break;
            case !1:
              i.scrolling = "no";
              break;
            default:
              i.scrolling = M[c] ? M[c].scrolling : "no";
          }
        })(),
        f("Height"),
        f("Width"),
        u("maxHeight"),
        u("minHeight"),
        u("maxWidth"),
        u("minWidth"),
        ("number" != typeof (M[c] && M[c].bodyMargin) &&
          "0" !== (M[c] && M[c].bodyMargin)) ||
          ((M[c].bodyMarginV1 = M[c].bodyMargin),
          (M[c].bodyMargin = M[c].bodyMargin + "px")),
        (r = L(c)),
        (s = p()) &&
          ((a = s),
          i.parentNode &&
            new a(function(e) {
              e.forEach(function(e) {
                Array.prototype.slice.call(e.removedNodes).forEach(function(e) {
                  e === i && C(i);
                });
              });
            }).observe(i.parentNode, { childList: !0 })),
        k(i, "load", function() {
          B("iFrame.onload", r, i, l, !0),
            (function() {
              var e = M[c] && M[c].firstRun,
                n = M[c] && M[c].heightCalculationMethod in h;
              !e && n && j({ iframe: i, height: 0, width: 0, type: "init" });
            })();
        }),
        B("init", r, i, l, !0),
        M[c] &&
          (M[c].iframe.iFrameResizer = {
            close: C.bind(null, M[c].iframe),
            removeListeners: b.bind(null, M[c].iframe),
            resize: B.bind(null, "Window resize", "resize", M[c].iframe),
            moveToAnchor: function(e) {
              B("Move to anchor", "moveToAnchor:" + e, M[c].iframe, c);
            },
            sendMessage: function(e) {
              B(
                "Send Message",
                "message:" + (e = JSON.stringify(e)),
                M[c].iframe,
                c,
              );
            },
          }));
  }
  function c(e, n) {
    null === i &&
      (i = setTimeout(function() {
        (i = null), e();
      }, n));
  }
  function u() {
    "hidden" !== document.visibilityState &&
      (R("document", "Trigger event: Visiblity change"),
      c(function() {
        f("Tab Visable", "resize");
      }, 16));
  }
  function f(n, i) {
    Object.keys(M).forEach(function(e) {
      !(function(e) {
        return (
          M[e] &&
          "parent" === M[e].resizeFrom &&
          M[e].autoResize &&
          !M[e].firstRun
        );
      })(e) || B(n, i, M[e].iframe, e);
    });
  }
  function y() {
    k(window, "message", n),
      k(window, "resize", function() {
        !(function(e) {
          R("window", "Trigger event: " + e),
            c(function() {
              f("Window " + e, "resize");
            }, 16);
        })("resize");
      }),
      k(document, "visibilitychange", u),
      k(document, "-webkit-visibilitychange", u);
  }
  function q() {
    function i(e, n) {
      n &&
        ((function() {
          if (!n.tagName)
            throw new TypeError("Object is not a valid DOM element");
          if ("IFRAME" !== n.tagName.toUpperCase())
            throw new TypeError(
              "Expected <IFRAME> tag, found <" + n.tagName + ">",
            );
        })(),
        d(n, e),
        t.push(n));
    }
    var t;
    return (
      (function() {
        var e,
          n = ["moz", "webkit", "o", "ms"];
        for (e = 0; e < n.length && !r; e += 1)
          r = window[n[e] + "RequestAnimationFrame"];
        r || R("setup", "RequestAnimationFrame not supported");
      })(),
      y(),
      function(e, n) {
        switch (
          ((t = []),
          (function(e) {
            e &&
              e.enablePublicMethods &&
              E(
                "enablePublicMethods option has been removed, public methods are now always available in the iFrame",
              );
          })(e),
          typeof n)
        ) {
          case "undefined":
          case "string":
            Array.prototype.forEach.call(
              document.querySelectorAll(n || "iframe"),
              i.bind(l, e),
            );
            break;
          case "object":
            i(e, n);
            break;
          default:
            throw new TypeError("Unexpected data type (" + typeof n + ")");
        }
        return t;
      }
    );
  }
})();

// Модуль Crel (https://github.com/KoryNunn/crel) для работы с DOM, приведен без изменений
function domReady(fn) {
  // If we're early to the party
  document.addEventListener("DOMContentLoaded", fn);
  // If late; I mean on time.
  if (
    document.readyState === "interactive" ||
    document.readyState === "complete"
  ) {
    fn();
  }
}

const popupStyles = `
.clicker_widget_popup_backdrop {
  visibility: hidden;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.24);
  opacity: 0;
  transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  z-index: 2147483646;
}

.clicker_widget_popup_container {
  max-width: 644px;
  margin: 0 16px;
  background: #ffffff;
  box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.17);
  font-family: inherit;
  color: #000000;
}

.clicker_widget_popup_inner {
  position: relative;
  display: flex;
  padding-top: 45px;
  padding-right: 38px;
  padding-bottom: 44px;
  padding-left: 48px;
}

.clicker_widget_popup_image {
  width: 128px;
  height: 128px;
  margin-right: 48px;
  flex-shrink: 0;
  align-self: center;
  background-size: 128px 128px;
  background-repeat: no-repeat;
}

.clicker_widget_popup_title {
  padding-bottom: 10px;
  margin: 0;
  font-size: 24px;
  line-height: 22px;
  font-weight: bold;
}

.clicker_widget_popup_text {
  padding-bottom: 32px;
  margin: 0;
  font-size: 16px;
  line-height: 20px;
}

.clicker_widget_popup_btn {
  background: #39a0da;
  padding: 9px 15px;
  margin: 0;
  border: none;
  outline: none;
  color: #ffffff;
  font-size: 22px;
  line-height: 34px;
  font-weight: bold;
  cursor: pointer;
}

@media (max-width: 710px) {
  .clicker_widget_popup_inner {
    padding-top: 38px;
    padding-right: 7px;
    padding-bottom: 80px;
    padding-left: 11px;
  }

  .clicker_widget_popup_image {
    width: 62px;
    height: 62px;
    align-self: flex-start;
    background-size: 62px 62px;
    margin-right: 15px;
    margin-top: 9px;
  }

  .clicker_widget_popup_title {
    padding-bottom: 14px;
    font-size: 20px;
    line-height: 24px;
  }

  .clicker_widget_popup_text {
    padding-bottom: 0;
    font-size: 14px;
    line-height: 18px;
  }

  .clicker_widget_popup_btn {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
  }
}

@media (max-width: 260px) {
  .clicker_widget_popup_inner {
    padding-bottom: 110px;
  }
}
`;

const nbsp = String.fromCharCode(160);

const createPopupElems = ({ crel, CLICKER_URL } , customTheme) => {

  const SlidedownBackground = `
          background-color: ${(customTheme && customTheme.background) ? customTheme.background : 'white'};
        `;
  const SlidedownFont = `
          font-family: ${(customTheme && customTheme.font_family) ? customTheme.font_family : ' ProximaNova, inherit'};
        `;
  const callToActionBackground = `
        background-color: ${(customTheme && customTheme.callToActionBackground) ? customTheme.callToActionBackground : '#39A0DA'};
      `;
  const callToActionText = `
        color: ${(customTheme && customTheme.callToActionText) ? customTheme.callToActionText : 'white'};
      `;
  const promoTextTitle= `
        color: ${(customTheme && customTheme.promoTextTitle) ? customTheme.promoTextTitle : 'black;'};
      `;
  const promoText= `
        color: ${(customTheme && customTheme.promoText) ? customTheme.promoText : 'black;'};
      `;
  const closeBtn= `
         background-color: ${(customTheme && customTheme.closeBtn) ? customTheme.closeBtn : 'rgba(0, 0, 0, 0.5);'};
      `;
  const pTitle = crel(
    "div",
    { class: "clicker_widget_popup_title" , style: `${SlidedownFont}${promoTextTitle}`},
    `Нужна помощь с${nbsp}установкой?`,
  );
  const pText = crel(
    "div",
    { class: "clicker_widget_popup_text" , style: `${SlidedownFont}${promoText}`},
    `Смонтируем, настроим, научим пользоваться. Проверенные монтажники, в${nbsp}удобное вам время.`,
  );
  const pButton = crel(
    "button",
    { class: "clicker_widget_popup_btn", style: `${SlidedownFont}${callToActionBackground}${callToActionText}`},
    `Узнать${nbsp}стоимость`,
  );

  const pImage = crel("div", {
    class: "clicker_widget_popup_image",
    style: `background-image: url('${CLICKER_URL}/hammer-and-wrench.svg');`,
  });
  const pContent = crel(
    "div",
    { class: "clicker_widget_popup_content" },
    pTitle,
    pText,
    pButton,
  );
  let tPopupStyles = popupStyles +
    `.clicker_widget_popup_close {
    position: absolute;
    right: 10px;
    top: 12px;
    width: 16px;
    height: 16px;
    cursor: pointer;
  }

.clicker_widget_popup_close:before,
.clicker_widget_popup_close:after {
    position: absolute;
    left: 7px;
    content: " ";
    height: 17px;
    width: 2px;
    ${closeBtn}
  }

.clicker_widget_popup_close:before {
    transform: rotate(45deg);
  }
.clicker_widget_popup_close:after {
    transform: rotate(-45deg);
  }`;
  const pClose = crel("div", {class: "clicker_widget_popup_close"} );

  const pInner = crel(
    "div",
    { class: "clicker_widget_popup_inner" },
    pImage,
    pContent,
    pClose,
  );
  const pContainer = crel(
    "div",
    { class: "clicker_widget_popup_container", style:`${SlidedownBackground}`},
    pInner,
  );
  const popupStylesEl = crel("style", tPopupStyles);
  return {
    pContainer,
    pInner,
    pClose,
    pContent,
    pImage,
    pButton,
    pText,
    pTitle,
    popupStylesEl,
  };
};
const createSlidedownElems = ({ crel, CLICKER_URL },customTheme,font) => {
  const wrench = crel("div", {
    style: `width: 91px; height: 97px; cursor:pointer; display: none;  z-index: 2147483646; background: url('${CLICKER_URL}/wrench.svg'); position: fixed; left: 16px; bottom: 16px;`,
  });

  const dude = crel("div", {
    id: "clicker__widget__dude",
    style: `width: 96px; height: 112px; background: url('${CLICKER_URL}/hero.svg'); align-self: flex-end; flex-shrink: 0;`,
  });
  const callToActionBackground = `
          background-color: ${(customTheme && customTheme.callToActionBackground) ? customTheme.callToActionBackground : '#39A0DA'};
        `;
  const callToActionText = `
          color: ${(customTheme && customTheme.callToActionText) ? customTheme.callToActionText : 'white'};
        `;
  const callToAction = crel(
    "div",
    {
      id: "clicker__widget__call_to_action",
      style:
        `font-size: 22px; line-height: 22px; padding: 8px 22px; cursor: pointer;${callToActionBackground}${callToActionText}${font}`,
    },
    `Узнать${nbsp}стоимость`,
  );
  const promoTextTitle= `
          color: ${(customTheme && customTheme.promoTextTitle) ? customTheme.promoTextTitle : 'rgba(255,255,255,.95);'};
        `;
  const promoText= `
          color: ${(customTheme && customTheme.promoText) ? customTheme.promoText : 'rgba(255,255,255,.8);'};
        `;
  const promo = crel(
    "div",
    {
      id: "clicker__widget__container",
      style:
        "cursor: pointer; display: flex; flex: 0; flex-basis: auto; align-items: center; justify-content: center; ",
    },
    dude,
    crel(
      "div",
      {
        style:
          "display: flex; flex-direction: column; padding: 14px 22px; align-self: stretch; justify-content: space-between;",
      },
      crel(
        "div",
        {
          style:
            `font-size: 22px; line-height: 22px; font-weight: 600; margin-bottom: 4px;${promoTextTitle}`,
        },
        "Нужна помощь с установкой?",
      ),
      crel(
        "div",
        {
          style:
            `font-size: 16px; line-height: 20px;${promoText}`,
        },
        `Смонтируем, настроим, научим пользоваться. Проверенные монтажники, в${nbsp}удобное вам время.`,
      ),
    ),
  );

  const closeButton = crel("div", { class: "clicker__widget__close" } );



  const closeBtn= `
           background-color: ${(customTheme && customTheme.closeBtn) ? customTheme.closeBtn : 'rgba(255,255,255,.8);'};
        `;
  const mediaStyles = crel(
    "style",
    // "@font-face {" +
    // "  font-family: 'Proxima Nova Rg';" +
    // "  src: url('https://app.clicker.one/fonts/ProximaNova-Regular.eot');" +
    // "  src: " +
    // "      url('https://app.clicker.one/fonts/ProximaNova-Regular.eot?#iefix') format('embedded-opentype')," +
    // "      url('https://app.clicker.one/fonts/ProximaNova-Regular.woff') format('woff')," +
    // "      url('https://app.clicker.one/fonts/ProximaNova-Regular.ttf') format('truetype');" +
    // "  font-weight: normal;" +
    // "  font-style: normal;" +
    // "}" +
    ".clicker__widget__close {" +
      "        position: absolute; " +
      "        right: 8px;" +
      "        top: 8px;" +
      "        width: 16px;" +
      "        height: 16px;" +
      "        opacity: 0.3;" +
      "        cursor: pointer;" +
      "     }" +
      "     .clicker__widget__close:hover {" +
      "        opacity: 1;" +
      "     }" +
      "     .clicker__widget__close:before, .clicker__widget__close:after {" +
      "        position: absolute;" +
      "        left: 7px;" +
      "        content: ' ';" +
      "        height: 17px;" +
      "        width: 2px;" +
      `        ${closeBtn}` +
      "     }" +
      "     .clicker__widget__close:before {" +
      "        transform: rotate(45deg);" +
      "     }" +
      "     .clicker__widget__close:after {" +
      "        transform: rotate(-45deg);" +
      "     }" +
      // " #clicker__widget__main { font-family: 'Proxima Nova Rg'; } " +
      "@media screen and (max-width: 710px) { #clicker__widget__main { flex-direction: column; }  #clicker__widget__container { height: auto;  } #clicker__widget__dude { margin-left: -42px; align-self: flex-end; } #clicker__widget__call_to_action { align-self: auto;flex-basis: 100%; text-align: center;} } @media screen and (min-width: 710px) { #clicker__widget__call_to_action { align-self: center;  } #clicker__widget__main { height: 92px; padding: 0 32px 0 16px; } } @media screen and (min-width: 1060px) { #clicker__widget__main { height: 76px; } } ",
  );

  return { mediaStyles, closeButton, promo, callToAction, dude, wrench };
};

const getRandomWidgetType = () =>
  Math.random() >= 0.5 ? "slidedown" : "popup";

(e => {
  const t = "function";
  const n = "isNode";
  const r = document;
  const o = (e, t) => typeof e === t;
  const i = (e, t) => {
    t !== null &&
      (Array.isArray(t)
        ? t.map(t => i(e, t))
        : (a[n](t) || (t = r.createTextNode(t)), e.appendChild(t)));
  };
  function a(e, f) {
    let l;
    let d;
    const s = arguments;
    let c = 1;
    if (
      ((e = a.isElement(e) ? e : r.createElement(e)),
      o(f, "object") && !a[n](f) && !Array.isArray(f))
    )
      for (l in (c++, f))
        (d = f[l]),
          (l = a.attrMap[l] || l),
          o(l, t) ? l(e, d) : o(d, t) ? (e[l] = d) : e.setAttribute(l, d);
    for (; c < s.length; c++) i(e, s[c]);
    return e;
  }
  (a.attrMap = {}),
    (a.isElement = e => e instanceof Element),
    (a[n] = e => e instanceof Node),
    (a.proxy = new Proxy(a, {
      get: (e, t) => (!(t in a) && (a[t] = a.bind(null, t)), a[t]),
    })),
    e(a, t);
})((crel, t) => {
  this.clickerApp = {
    form: null,
    widget: null,
    init(options) {
      const {
        CLICKER_URL = "https://app.clicker.one",
        shopId,
        city,
        userData = {},
        delayDisplay = false,
        displayType = "slidedown", // popup|slidedown|random,
        displayTheme
      } = options;

      const displayedWidget =
        displayType === "random" ? getRandomWidgetType() : displayType;

      if (!shopId) {
        console.error(
          "Для инициализации виджета Clicker должен быть указан shopId — идентификатор вашего магазина",
        );
        return;
      }

      if (!city) {
        console.log("Город не передан")
      }

      const SUBMIT_URL = `${CLICKER_URL}/order/${shopId}`;

      if (typeof userData !== "object" || userData === null) {
        console.error(
          "При инициализации Clicker параметр userData должен быть объектом",
        );
      }

      this.form = crel(
        "form",
        {
          method: "POST",
          action: SUBMIT_URL,
          target: "_blank",
          // enctype: "text/plain"
        },
        crel("input", {
          type: "hidden",
          name: "shopOrderId",
          value: (userData && userData.shopOrderId) || "",
        }),
        crel("input", {
          type: "hidden",
          name: "address",
          value: (userData && userData.address) || "",
        }),
        crel("input", {
          type: "hidden",
          name: "phone",
          value: (userData && userData.phone) || "",
        }),
        crel("input", {
          type: "hidden",
          name: "cart",
          value: encodeURI(
            userData && userData.cart && userData.cart.length
              ? JSON.stringify(userData.cart)
              : "",
          ),
        }),
        crel("input", {
          type: "hidden",
          name: "source",
          // Проставляется перед сабмитом
          value: `${displayedWidget}+${window.location.href}`,
        }),
        crel("input", {
          type: "hidden",
          name: "city",
          value: city ? city : "",
        }),
      );

      const metrikaScript = crel(
        "script",
        `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
      (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
      
      ym(53653513, "init", {
        clickmap:false,
        trackLinks:false,
        accurateTrackBounce:false,
        webvisor:false
  });`,
      );

      const metricsId = 53653513;
      const clickEventId = "WIDGET_CLICK";
      const mountEventId = "WIDGET_DISPLAYED";

      const sendMetrics = eventId => {
        if (ym) {
          ym(metricsId, "reachGoal", eventId);
        } else {
          console.info("widget: метрика не подключена");
        }
      };

      const handleSubmit = widgetType => {
        this.form.source.value = `${widgetType}+${window.location.href}`;
        sendMetrics(clickEventId);
        this.form.submit();
      };

      // То что касается баннера
      const renderBanner = ({ disableAnimation = false } = {}) => {
        const SlidedownFont = `
          font-family: ${(displayTheme && displayTheme.font_family) ? displayTheme.font_family : ' ProximaNova, inherit'};
        `;
        const {
          mediaStyles,
          closeButton,
          promo,
          callToAction,
          wrench,
        } = createSlidedownElems({ crel, CLICKER_URL },displayTheme , SlidedownFont);
        const SlidedownBackground = `
          background-color: ${(displayTheme && displayTheme.background) ? displayTheme.background : 'rgb(8, 63, 98)'};
        `;
        this.widget = crel(
          "div",
          {
            id: "clicker__widget__main",
            style: `visibility: hidden; display: flex; justify-content: center; position: fixed; bottom: -144px;width: 100%; ;  z-index: 2147483646; color: #FFF; ${
              disableAnimation ? "" : "transition: bottom .7s ease-in;" }${SlidedownBackground}${SlidedownFont}`,
          },
          promo,
          callToAction,
          closeButton,
          this.form,
        );

        crel(document.body, this.widget, wrench, mediaStyles, metrikaScript);

        const bannerFormSubmit = () => {
          handleSubmit("slidedown");
        };

        callToAction.addEventListener("click", bannerFormSubmit);
        promo.addEventListener("click", bannerFormSubmit);

        closeButton.addEventListener("click", () => {
          this.toggle();
        });

        wrench.addEventListener("click", () => {
          this.toggle();
        });

        this.display = function() {
          // Показывает виджет и отодвигает тело страницы вниз
          this.widget.style.visibility = "visible";
          this.widget.style.bottom = "0";
          document.body.style.paddingBottom = "92px";
          sendMetrics(mountEventId);
        }.bind(this);

        if (!delayDisplay) {
          window.setTimeout(this.display, 200);
        }

        this.toggle = function() {
          wrench.style.display =
            wrench.style.display === "none" ? "block" : "none";
          this.widget.style.display =
            this.widget.style.display === "none" ? "flex" : "none";
        }.bind(this);
      };

      // То что касается попапа
      if (displayedWidget === "popup") {
        const { popupStylesEl, pContainer, pClose, pButton } = createPopupElems(
          {
            crel,
            CLICKER_URL,
          },
          displayTheme
        );

        this.popup = crel(
          "div",
          { class: "clicker_widget_popup_backdrop" },
          pContainer,
          this.form,
        );

        crel(document.body, this.popup, popupStylesEl, metrikaScript);

        const popupFormSubmit = () => {
          handleSubmit("popup");
        };

        pContainer.addEventListener("click", e => {
          e.stopPropagation();
        });
        pButton.addEventListener("click", popupFormSubmit);
        this.popup.addEventListener("click", e => {
          e.stopPropagation();
          this.closePopup();
        });

        pClose.addEventListener("click", () => {
          this.closePopup();
        });

        this.displayPopup = function() {
          this.popup.style.visibility = "visible";
          this.popup.style.opacity = "1";
          sendMetrics(mountEventId);
        }.bind(this);

        if (!delayDisplay) {
          window.setTimeout(this.displayPopup, 200);
        }

        this.closePopup = function() {
          this.popup.style.display = "none";
          this.popup.style.visibility = "hidden";
          renderBanner({ disableAnimation: true });
        }.bind(this);
      }

      // То что касается баннера
      if (displayedWidget === "slidedown") {
        renderBanner();
      }
    },
    initIframe(options = {}) {
      const { containerId } = options;

      const {
        CLICKER_URL = "https://app.clicker.one",
        shopId,
        city
      } = window.clickerOptions;

      if (!shopId) {
        console.error(
          "Для инициализации виджета Clicker должен быть указан shopId — идентификатор вашего магазина",
        );
        return;
      }

      if (!city) {
        console.log("Город не передан");
      }

      const iframeSrc = city ? `${CLICKER_URL}/order/${shopId}?embedded=true&&city=${city}`: `${CLICKER_URL}/order/${shopId}?embedded=true`;
      const iframeId = "clicker_embedded";
      const iframe = crel("iframe", {
        src: iframeSrc,
        frameborder: "no",
        name: iframeId,
        id: iframeId,
        width: "100%",
      });

      window.iFrameResize({}, iframe);

      // Если передан id контейнера, встраиваем кликер в него
      if (containerId) {
        const container = document.getElementById(containerId);

        if (container) {
          crel(container, iframe);
        } else {
          console.error(
            `Блок #${containerId} не найден, iframe не будет отображен`,
          );
        }
      }

      // В любом случае всегда возвращаем айфрейм
      return iframe;
    },
  };
  domReady(function() {
    if (typeof window.clickerOptions === "undefined") {
      window.clickerOptions = {};
    }
    const { createIframe, iFrameCallback } = window.clickerOptions;

    if (createIframe && typeof iFrameCallback === "function") {
      iFrameCallback(clickerApp.initIframe);
    }

    if (!createIframe) {
      clickerApp.init(window.clickerOptions);
    }
  });
});
