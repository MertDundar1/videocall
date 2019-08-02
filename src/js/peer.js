var parcelRequire = function (e, t, n, r) {
  var o = "function" == typeof parcelRequire && parcelRequire, i = "function" == typeof require && require;

  function a(n, r) {
    if (!t[n]) {
      if (!e[n]) {
        var s = "function" == typeof parcelRequire && parcelRequire;
        if (!r && s) return s(n, !0);
        if (o) return o(n, !0);
        if (i && "string" == typeof n) return i(n);
        var c = new Error("Cannot find module '" + n + "'");
        throw c.code = "MODULE_NOT_FOUND", c
      }
      l.resolve = function (t) {
        return e[n][1][t] || t
      }, l.cache = {};
      var u = t[n] = new a.Module(n);
      e[n][0].call(u.exports, l, u, u.exports, this)
    }
    return t[n].exports;

    function l(e) {
      return a(l.resolve(e))
    }
  }

  a.isParcelRequire = !0, a.Module = function (e) {
    this.id = e, this.bundle = a, this.exports = {}
  }, a.modules = e, a.cache = t, a.parent = o, a.register = function (t, n) {
    e[t] = [function (e, t) {
      t.exports = n
    }, {}]
  };
  for (var s = 0; s < n.length; s++) a(n[s]);
  if (n.length) {
    var c = a(n[n.length - 1]);
    "object" == typeof exports && "undefined" != typeof module ? module.exports = c : "function" == typeof define && define.amd && define(function () {
      return c
    })
  }
  return a
}({
  vHo1: [function (e, t, n) {
    var r = {};
    r.useBlobBuilder = function () {
      try {
        return new Blob([]), !1
      } catch (e) {
        return !0
      }
    }(), r.useArrayBufferView = !r.useBlobBuilder && function () {
      try {
        return 0 === new Blob([new Uint8Array([])]).size
      } catch (e) {
        return !0
      }
    }(), t.exports.binaryFeatures = r;
    var o = t.exports.BlobBuilder;

    function i() {
      this._pieces = [], this._parts = []
    }

    "undefined" != typeof window && (o = t.exports.BlobBuilder = window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder || window.BlobBuilder), i.prototype.append = function (e) {
      "number" == typeof e ? this._pieces.push(e) : (this.flush(), this._parts.push(e))
    }, i.prototype.flush = function () {
      if (this._pieces.length > 0) {
        var e = new Uint8Array(this._pieces);
        r.useArrayBufferView || (e = e.buffer), this._parts.push(e), this._pieces = []
      }
    }, i.prototype.getBuffer = function () {
      if (this.flush(), r.useBlobBuilder) {
        for (var e = new o, t = 0, n = this._parts.length; t < n; t++) e.append(this._parts[t]);
        return e.getBlob()
      }
      return new Blob(this._parts)
    }, t.exports.BufferBuilder = i
  }, {}],
  lHOc: [function (e, t, n) {
    var r = e("./bufferbuilder").BufferBuilder, o = e("./bufferbuilder").binaryFeatures, i = {
      unpack: function (e) {
        return new a(e).unpack()
      }, pack: function (e) {
        var t = new s;
        return t.pack(e), t.getBuffer()
      }
    };

    function a(e) {
      this.index = 0, this.dataBuffer = e, this.dataView = new Uint8Array(this.dataBuffer), this.length = this.dataBuffer.byteLength
    }

    function s() {
      this.bufferBuilder = new r
    }

    function c(e) {
      var t = e.charCodeAt(0);
      return t <= 2047 ? "00" : t <= 65535 ? "000" : t <= 2097151 ? "0000" : t <= 67108863 ? "00000" : "000000"
    }

    t.exports = i, a.prototype.unpack = function () {
      var e, t = this.unpack_uint8();
      if (t < 128) return t;
      if ((224 ^ t) < 32) return (224 ^ t) - 32;
      if ((e = 160 ^ t) <= 15) return this.unpack_raw(e);
      if ((e = 176 ^ t) <= 15) return this.unpack_string(e);
      if ((e = 144 ^ t) <= 15) return this.unpack_array(e);
      if ((e = 128 ^ t) <= 15) return this.unpack_map(e);
      switch (t) {
        case 192:
          return null;
        case 193:
          return;
        case 194:
          return !1;
        case 195:
          return !0;
        case 202:
          return this.unpack_float();
        case 203:
          return this.unpack_double();
        case 204:
          return this.unpack_uint8();
        case 205:
          return this.unpack_uint16();
        case 206:
          return this.unpack_uint32();
        case 207:
          return this.unpack_uint64();
        case 208:
          return this.unpack_int8();
        case 209:
          return this.unpack_int16();
        case 210:
          return this.unpack_int32();
        case 211:
          return this.unpack_int64();
        case 212:
        case 213:
        case 214:
        case 215:
          return;
        case 216:
          return e = this.unpack_uint16(), this.unpack_string(e);
        case 217:
          return e = this.unpack_uint32(), this.unpack_string(e);
        case 218:
          return e = this.unpack_uint16(), this.unpack_raw(e);
        case 219:
          return e = this.unpack_uint32(), this.unpack_raw(e);
        case 220:
          return e = this.unpack_uint16(), this.unpack_array(e);
        case 221:
          return e = this.unpack_uint32(), this.unpack_array(e);
        case 222:
          return e = this.unpack_uint16(), this.unpack_map(e);
        case 223:
          return e = this.unpack_uint32(), this.unpack_map(e)
      }
    }, a.prototype.unpack_uint8 = function () {
      var e = 255 & this.dataView[this.index];
      return this.index++, e
    }, a.prototype.unpack_uint16 = function () {
      var e = this.read(2), t = 256 * (255 & e[0]) + (255 & e[1]);
      return this.index += 2, t
    }, a.prototype.unpack_uint32 = function () {
      var e = this.read(4), t = 256 * (256 * (256 * e[0] + e[1]) + e[2]) + e[3];
      return this.index += 4, t
    }, a.prototype.unpack_uint64 = function () {
      var e = this.read(8),
        t = 256 * (256 * (256 * (256 * (256 * (256 * (256 * e[0] + e[1]) + e[2]) + e[3]) + e[4]) + e[5]) + e[6]) + e[7];
      return this.index += 8, t
    }, a.prototype.unpack_int8 = function () {
      var e = this.unpack_uint8();
      return e < 128 ? e : e - 256
    }, a.prototype.unpack_int16 = function () {
      var e = this.unpack_uint16();
      return e < 32768 ? e : e - 65536
    }, a.prototype.unpack_int32 = function () {
      var e = this.unpack_uint32();
      return e < Math.pow(2, 31) ? e : e - Math.pow(2, 32)
    }, a.prototype.unpack_int64 = function () {
      var e = this.unpack_uint64();
      return e < Math.pow(2, 63) ? e : e - Math.pow(2, 64)
    }, a.prototype.unpack_raw = function (e) {
      if (this.length < this.index + e) throw new Error("BinaryPackFailure: index is out of range " + this.index + " " + e + " " + this.length);
      var t = this.dataBuffer.slice(this.index, this.index + e);
      return this.index += e, t
    }, a.prototype.unpack_string = function (e) {
      for (var t, n, r = this.read(e), o = 0, i = ""; o < e;) (t = r[o]) < 128 ? (i += String.fromCharCode(t), o++) : (192 ^ t) < 32 ? (n = (192 ^ t) << 6 | 63 & r[o + 1], i += String.fromCharCode(n), o += 2) : (n = (15 & t) << 12 | (63 & r[o + 1]) << 6 | 63 & r[o + 2], i += String.fromCharCode(n), o += 3);
      return this.index += e, i
    }, a.prototype.unpack_array = function (e) {
      for (var t = new Array(e), n = 0; n < e; n++) t[n] = this.unpack();
      return t
    }, a.prototype.unpack_map = function (e) {
      for (var t = {}, n = 0; n < e; n++) {
        var r = this.unpack(), o = this.unpack();
        t[r] = o
      }
      return t
    }, a.prototype.unpack_float = function () {
      var e = this.unpack_uint32(), t = (e >> 23 & 255) - 127;
      return (0 == e >> 31 ? 1 : -1) * (8388607 & e | 8388608) * Math.pow(2, t - 23)
    }, a.prototype.unpack_double = function () {
      var e = this.unpack_uint32(), t = this.unpack_uint32(), n = (e >> 20 & 2047) - 1023;
      return (0 == e >> 31 ? 1 : -1) * ((1048575 & e | 1048576) * Math.pow(2, n - 20) + t * Math.pow(2, n - 52))
    }, a.prototype.read = function (e) {
      var t = this.index;
      if (t + e <= this.length) return this.dataView.subarray(t, t + e);
      throw new Error("BinaryPackFailure: read index out of range")
    }, s.prototype.getBuffer = function () {
      return this.bufferBuilder.getBuffer()
    }, s.prototype.pack = function (e) {
      var t = typeof e;
      if ("string" == t) this.pack_string(e); else if ("number" == t) Math.floor(e) === e ? this.pack_integer(e) : this.pack_double(e); else if ("boolean" == t) !0 === e ? this.bufferBuilder.append(195) : !1 === e && this.bufferBuilder.append(194); else if ("undefined" == t) this.bufferBuilder.append(192); else {
        if ("object" != t) throw new Error('Type "' + t + '" not yet supported');
        if (null === e) this.bufferBuilder.append(192); else {
          var n = e.constructor;
          if (n == Array) this.pack_array(e); else if (n == Blob || n == File) this.pack_bin(e); else if (n == ArrayBuffer) o.useArrayBufferView ? this.pack_bin(new Uint8Array(e)) : this.pack_bin(e); else if ("BYTES_PER_ELEMENT" in e) o.useArrayBufferView ? this.pack_bin(new Uint8Array(e.buffer)) : this.pack_bin(e.buffer); else if (n == Object) this.pack_object(e); else if (n == Date) this.pack_string(e.toString()); else {
            if ("function" != typeof e.toBinaryPack) throw new Error('Type "' + n.toString() + '" not yet supported');
            this.bufferBuilder.append(e.toBinaryPack())
          }
        }
      }
      this.bufferBuilder.flush()
    }, s.prototype.pack_bin = function (e) {
      var t = e.length || e.byteLength || e.size;
      if (t <= 15) this.pack_uint8(160 + t); else if (t <= 65535) this.bufferBuilder.append(218), this.pack_uint16(t); else {
        if (!(t <= 4294967295)) throw new Error("Invalid length");
        this.bufferBuilder.append(219), this.pack_uint32(t)
      }
      this.bufferBuilder.append(e)
    }, s.prototype.pack_string = function (e) {
      var t = function (e) {
        return e.length > 600 ? new Blob([e]).size : e.replace(/[^\u0000-\u007F]/g, c).length
      }(e);
      if (t <= 15) this.pack_uint8(176 + t); else if (t <= 65535) this.bufferBuilder.append(216), this.pack_uint16(t); else {
        if (!(t <= 4294967295)) throw new Error("Invalid length");
        this.bufferBuilder.append(217), this.pack_uint32(t)
      }
      this.bufferBuilder.append(e)
    }, s.prototype.pack_array = function (e) {
      var t = e.length;
      if (t <= 15) this.pack_uint8(144 + t); else if (t <= 65535) this.bufferBuilder.append(220), this.pack_uint16(t); else {
        if (!(t <= 4294967295)) throw new Error("Invalid length");
        this.bufferBuilder.append(221), this.pack_uint32(t)
      }
      for (var n = 0; n < t; n++) this.pack(e[n])
    }, s.prototype.pack_integer = function (e) {
      if (-32 <= e && e <= 127) this.bufferBuilder.append(255 & e); else if (0 <= e && e <= 255) this.bufferBuilder.append(204), this.pack_uint8(e); else if (-128 <= e && e <= 127) this.bufferBuilder.append(208), this.pack_int8(e); else if (0 <= e && e <= 65535) this.bufferBuilder.append(205), this.pack_uint16(e); else if (-32768 <= e && e <= 32767) this.bufferBuilder.append(209), this.pack_int16(e); else if (0 <= e && e <= 4294967295) this.bufferBuilder.append(206), this.pack_uint32(e); else if (-2147483648 <= e && e <= 2147483647) this.bufferBuilder.append(210), this.pack_int32(e); else if (-0x8000000000000000 <= e && e <= 0x8000000000000000) this.bufferBuilder.append(211), this.pack_int64(e); else {
        if (!(0 <= e && e <= 0x10000000000000000)) throw new Error("Invalid integer");
        this.bufferBuilder.append(207), this.pack_uint64(e)
      }
    }, s.prototype.pack_double = function (e) {
      var t = 0;
      e < 0 && (t = 1, e = -e);
      var n = Math.floor(Math.log(e) / Math.LN2), r = e / Math.pow(2, n) - 1, o = Math.floor(r * Math.pow(2, 52)),
        i = Math.pow(2, 32), a = t << 31 | n + 1023 << 20 | o / i & 1048575, s = o % i;
      this.bufferBuilder.append(203), this.pack_int32(a), this.pack_int32(s)
    }, s.prototype.pack_object = function (e) {
      var t = Object.keys(e).length;
      if (t <= 15) this.pack_uint8(128 + t); else if (t <= 65535) this.bufferBuilder.append(222), this.pack_uint16(t); else {
        if (!(t <= 4294967295)) throw new Error("Invalid length");
        this.bufferBuilder.append(223), this.pack_uint32(t)
      }
      for (var n in e) e.hasOwnProperty(n) && (this.pack(n), this.pack(e[n]))
    }, s.prototype.pack_uint8 = function (e) {
      this.bufferBuilder.append(e)
    }, s.prototype.pack_uint16 = function (e) {
      this.bufferBuilder.append(e >> 8), this.bufferBuilder.append(255 & e)
    }, s.prototype.pack_uint32 = function (e) {
      var t = 4294967295 & e;
      this.bufferBuilder.append((4278190080 & t) >>> 24), this.bufferBuilder.append((16711680 & t) >>> 16), this.bufferBuilder.append((65280 & t) >>> 8), this.bufferBuilder.append(255 & t)
    }, s.prototype.pack_uint64 = function (e) {
      var t = e / Math.pow(2, 32), n = e % Math.pow(2, 32);
      this.bufferBuilder.append((4278190080 & t) >>> 24), this.bufferBuilder.append((16711680 & t) >>> 16), this.bufferBuilder.append((65280 & t) >>> 8), this.bufferBuilder.append(255 & t), this.bufferBuilder.append((4278190080 & n) >>> 24), this.bufferBuilder.append((16711680 & n) >>> 16), this.bufferBuilder.append((65280 & n) >>> 8), this.bufferBuilder.append(255 & n)
    }, s.prototype.pack_int8 = function (e) {
      this.bufferBuilder.append(255 & e)
    }, s.prototype.pack_int16 = function (e) {
      this.bufferBuilder.append((65280 & e) >> 8), this.bufferBuilder.append(255 & e)
    }, s.prototype.pack_int32 = function (e) {
      this.bufferBuilder.append(e >>> 24 & 255), this.bufferBuilder.append((16711680 & e) >>> 16), this.bufferBuilder.append((65280 & e) >>> 8), this.bufferBuilder.append(255 & e)
    }, s.prototype.pack_int64 = function (e) {
      var t = Math.floor(e / Math.pow(2, 32)), n = e % Math.pow(2, 32);
      this.bufferBuilder.append((4278190080 & t) >>> 24), this.bufferBuilder.append((16711680 & t) >>> 16), this.bufferBuilder.append((65280 & t) >>> 8), this.bufferBuilder.append(255 & t), this.bufferBuilder.append((4278190080 & n) >>> 24), this.bufferBuilder.append((16711680 & n) >>> 16), this.bufferBuilder.append((65280 & n) >>> 8), this.bufferBuilder.append(255 & n)
    }
  }, {"./bufferbuilder": "vHo1"}],
  sXtV: [function (e, t, n) {
    "use strict";
    Object.defineProperty(n, "__esModule", {value: !0}), n.RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription, n.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection, n.RTCIceCandidate = window.RTCIceCandidate || window.mozRTCIceCandidate
  }, {}],
  BHXf: [function (e, t, n) {
    arguments[3], arguments[3];
    var r = this && this.__importStar || function (e) {
      if (e && e.__esModule) return e;
      var t = {};
      if (null != e) for (var n in e) Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);
      return t.default = e, t
    };
    Object.defineProperty(n, "__esModule", {value: !0});
    var o = r(e("js-binarypack")), i = e("./adapter"),
      a = {iceServers: [{urls: "stun:stun.l.google.com:19302"}], sdpSemantics: "unified-plan"}, s = function () {
        function e() {
        }

        var t;
        return e.noop = function () {
        }, e.validateId = function (e) {
          return !e || /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(e)
        }, e.chunk = function (t) {
          for (var n, r = [], o = t.size, i = Math.ceil(o / e.chunkedMTU), a = n = 0; a < o;) {
            var s = Math.min(o, a + e.chunkedMTU), c = t.slice(a, s),
              u = {__peerData: this._dataCount, n: n, data: c, total: i};
            r.push(u), a = s, n++
          }
          return this._dataCount++, r
        }, e.blobToArrayBuffer = function (e, t) {
          var n = new FileReader;
          n.onload = function (e) {
            t(e.target.result)
          }, n.readAsArrayBuffer(e)
        }, e.blobToBinaryString = function (e, t) {
          var n = new FileReader;
          n.onload = function (e) {
            t(e.target.result)
          }, n.readAsBinaryString(e)
        }, e.binaryStringToArrayBuffer = function (e) {
          for (var t = new Uint8Array(e.length), n = 0; n < e.length; n++) t[n] = 255 & e.charCodeAt(n);
          return t.buffer
        }, e.randomToken = function () {
          return Math.random().toString(36).substr(2)
        }, e.isSecure = function () {
          return "https:" === location.protocol
        }, e.CLOUD_HOST = "0.peerjs.com", e.CLOUD_PORT = 443, e.chunkedBrowsers = {Chrome: 1}, e.chunkedMTU = 16300, e.defaultConfig = a, e.browser = (t = window).mozRTCPeerConnection ? "Firefox" : t.webkitRTCPeerConnection ? "Chrome" : t.RTCPeerConnection ? "Supported" : "Unsupported", e.supports = function () {
          if (void 0 === i.RTCPeerConnection) return {};
          var e, t, n = !0, r = !0, o = !1, s = !1, c = !!window.webkitRTCPeerConnection;
          try {
            e = new i.RTCPeerConnection(a, {optional: [{RtpDataChannels: !0}]})
          } catch (e) {
            n = !1, r = !1
          }
          if (n) try {
            t = e.createDataChannel("_PEERJSTEST")
          } catch (e) {
            n = !1
          }
          if (n) {
            try {
              t.binaryType = "blob", o = !0
            } catch (e) {
            }
            var u = new i.RTCPeerConnection(a, {});
            try {
              s = u.createDataChannel("_PEERJSRELIABLETEST", {}).ordered
            } catch (e) {
            }
            u.close()
          }
          return r && (r = !!e.addStream), e && e.close(), {
            audioVideo: r,
            data: n,
            binaryBlob: o,
            binary: s,
            reliable: s,
            sctp: s,
            onnegotiationneeded: c
          }
        }(), e.pack = o.pack, e.unpack = o.unpack, e._dataCount = 1, e
      }();
    n.util = s
  }, {"js-binarypack": "lHOc", "./adapter": "sXtV"}],
  "2JJl": [function (e, t, n) {
    "use strict";
    var r = Object.prototype.hasOwnProperty, o = "~";

    function i() {
    }

    function a(e, t, n) {
      this.fn = e, this.context = t, this.once = n || !1
    }

    function s(e, t, n, r, i) {
      if ("function" != typeof n) throw new TypeError("The listener must be a function");
      var s = new a(n, r || e, i), c = o ? o + t : t;
      return e._events[c] ? e._events[c].fn ? e._events[c] = [e._events[c], s] : e._events[c].push(s) : (e._events[c] = s, e._eventsCount++), e
    }

    function c(e, t) {
      0 == --e._eventsCount ? e._events = new i : delete e._events[t]
    }

    function u() {
      this._events = new i, this._eventsCount = 0
    }

    Object.create && (i.prototype = Object.create(null), (new i).__proto__ || (o = !1)), u.prototype.eventNames = function () {
      var e, t, n = [];
      if (0 === this._eventsCount) return n;
      for (t in e = this._events) r.call(e, t) && n.push(o ? t.slice(1) : t);
      return Object.getOwnPropertySymbols ? n.concat(Object.getOwnPropertySymbols(e)) : n
    }, u.prototype.listeners = function (e) {
      var t = o ? o + e : e, n = this._events[t];
      if (!n) return [];
      if (n.fn) return [n.fn];
      for (var r = 0, i = n.length, a = new Array(i); r < i; r++) a[r] = n[r].fn;
      return a
    }, u.prototype.listenerCount = function (e) {
      var t = o ? o + e : e, n = this._events[t];
      return n ? n.fn ? 1 : n.length : 0
    }, u.prototype.emit = function (e, t, n, r, i, a) {
      var s = o ? o + e : e;
      if (!this._events[s]) return !1;
      var c, u, l = this._events[s], p = arguments.length;
      if (l.fn) {
        switch (l.once && this.removeListener(e, l.fn, void 0, !0), p) {
          case 1:
            return l.fn.call(l.context), !0;
          case 2:
            return l.fn.call(l.context, t), !0;
          case 3:
            return l.fn.call(l.context, t, n), !0;
          case 4:
            return l.fn.call(l.context, t, n, r), !0;
          case 5:
            return l.fn.call(l.context, t, n, r, i), !0;
          case 6:
            return l.fn.call(l.context, t, n, r, i, a), !0
        }
        for (u = 1, c = new Array(p - 1); u < p; u++) c[u - 1] = arguments[u];
        l.fn.apply(l.context, c)
      } else {
        var f, h = l.length;
        for (u = 0; u < h; u++) switch (l[u].once && this.removeListener(e, l[u].fn, void 0, !0), p) {
          case 1:
            l[u].fn.call(l[u].context);
            break;
          case 2:
            l[u].fn.call(l[u].context, t);
            break;
          case 3:
            l[u].fn.call(l[u].context, t, n);
            break;
          case 4:
            l[u].fn.call(l[u].context, t, n, r);
            break;
          default:
            if (!c) for (f = 1, c = new Array(p - 1); f < p; f++) c[f - 1] = arguments[f];
            l[u].fn.apply(l[u].context, c)
        }
      }
      return !0
    }, u.prototype.on = function (e, t, n) {
      return s(this, e, t, n, !1)
    }, u.prototype.once = function (e, t, n) {
      return s(this, e, t, n, !0)
    }, u.prototype.removeListener = function (e, t, n, r) {
      var i = o ? o + e : e;
      if (!this._events[i]) return this;
      if (!t) return c(this, i), this;
      var a = this._events[i];
      if (a.fn) a.fn !== t || r && !a.once || n && a.context !== n || c(this, i); else {
        for (var s = 0, u = [], l = a.length; s < l; s++) (a[s].fn !== t || r && !a[s].once || n && a[s].context !== n) && u.push(a[s]);
        u.length ? this._events[i] = 1 === u.length ? u[0] : u : c(this, i)
      }
      return this
    }, u.prototype.removeAllListeners = function (e) {
      var t;
      return e ? (t = o ? o + e : e, this._events[t] && c(this, t)) : (this._events = new i, this._eventsCount = 0), this
    }, u.prototype.off = u.prototype.removeListener, u.prototype.addListener = u.prototype.on, u.prefixed = o, u.EventEmitter = u, void 0 !== t && (t.exports = u)
  }, {}],
  "8WOs": [function (e, t, n) {
    "use strict";
    var r = this && this.__read || function (e, t) {
      var n = "function" == typeof Symbol && e[Symbol.iterator];
      if (!n) return e;
      var r, o, i = n.call(e), a = [];
      try {
        for (; (void 0 === t || t-- > 0) && !(r = i.next()).done;) a.push(r.value)
      } catch (e) {
        o = {error: e}
      } finally {
        try {
          r && !r.done && (n = i.return) && n.call(i)
        } finally {
          if (o) throw o.error
        }
      }
      return a
    }, o = this && this.__spread || function () {
      for (var e = [], t = 0; t < arguments.length; t++) e = e.concat(r(arguments[t]));
      return e
    };
    Object.defineProperty(n, "__esModule", {value: !0});
    var i;
    !function (e) {
      e[e.Disabled = 0] = "Disabled", e[e.Errors = 1] = "Errors", e[e.Warnings = 2] = "Warnings", e[e.All = 3] = "All"
    }(i = n.LogLevel || (n.LogLevel = {}));
    var a = function () {
      function e() {
        this._logLevel = i.Disabled
      }

      return Object.defineProperty(e.prototype, "logLevel", {
        get: function () {
          return this._logLevel
        }, set: function (e) {
          this._logLevel = e
        }, enumerable: !0, configurable: !0
      }), e.prototype.log = function () {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        this._logLevel >= i.All && this._print.apply(this, o([i.All], e))
      }, e.prototype.warn = function () {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        this._logLevel >= i.Warnings && this._print.apply(this, o([i.Warnings], e))
      }, e.prototype.error = function () {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        this._logLevel >= i.Errors && this._print.apply(this, o([i.Errors], e))
      }, e.prototype.setLogFunction = function (e) {
        this._print = e
      }, e.prototype._print = function (e) {
        for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
        var r = o(["PeerJS: "], t);
        for (var a in r) r[a] instanceof Error && (r[a] = "(" + r[a].name + ") " + r[a].message);
        e >= i.All ? console.log.apply(console, o(r)) : e >= i.Warnings ? console.warn.apply(console, o(["WARNING"], r)) : e >= i.Errors && console.error.apply(console, o(["ERROR"], r))
      }, e
    }();
    n.default = new a
  }, {}],
  "9ZRY": [function (e, t, n) {
    "use strict";
    Object.defineProperty(n, "__esModule", {value: !0}), function (e) {
      e.Open = "open", e.Stream = "stream", e.Data = "data", e.Close = "close", e.Error = "error", e.IceStateChanged = "iceStateChanged"
    }(n.ConnectionEventType || (n.ConnectionEventType = {})), function (e) {
      e.Data = "data", e.Media = "media"
    }(n.ConnectionType || (n.ConnectionType = {})), function (e) {
      e.Open = "open", e.Close = "close", e.Connection = "connection", e.Call = "call", e.Disconnected = "disconnected", e.Error = "error"
    }(n.PeerEventType || (n.PeerEventType = {})), function (e) {
      e.BrowserIncompatible = "browser-incompatible", e.Disconnected = "disconnected", e.InvalidID = "invalid-id", e.InvalidKey = "invalid-key", e.Network = "network", e.PeerUnavailable = "peer-unavailable", e.SslUnavailable = "ssl-unavailable", e.ServerError = "server-error", e.SocketError = "socket-error", e.SocketClosed = "socket-closed", e.UnavailableID = "unavailable-id", e.WebRTC = "webrtc"
    }(n.PeerErrorType || (n.PeerErrorType = {})), function (e) {
      e.Binary = "binary", e.BinaryUTF8 = "binary-utf8", e.JSON = "json"
    }(n.SerializationType || (n.SerializationType = {})), function (e) {
      e.Message = "message", e.Disconnected = "disconnected", e.Error = "error", e.Close = "close"
    }(n.SocketEventType || (n.SocketEventType = {})), function (e) {
      e.Heartbeat = "HEARTBEAT", e.Candidate = "CANDIDATE", e.Offer = "OFFER", e.Answer = "ANSWER", e.Open = "OPEN", e.Error = "ERROR", e.IdTaken = "ID-TAKEN", e.InvalidKey = "INVALID-KEY", e.Leave = "LEAVE", e.Expire = "EXPIRE"
    }(n.ServerMessageType || (n.ServerMessageType = {}))
  }, {}],
  wJlv: [function (e, t, n) {
    "use strict";
    var r = this && this.__extends || function () {
      var e = function (t, n) {
        return (e = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(t, n)
      };
      return function (t, n) {
        function r() {
          this.constructor = t
        }

        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
      }
    }(), o = this && this.__read || function (e, t) {
      var n = "function" == typeof Symbol && e[Symbol.iterator];
      if (!n) return e;
      var r, o, i = n.call(e), a = [];
      try {
        for (; (void 0 === t || t-- > 0) && !(r = i.next()).done;) a.push(r.value)
      } catch (e) {
        o = {error: e}
      } finally {
        try {
          r && !r.done && (n = i.return) && n.call(i)
        } finally {
          if (o) throw o.error
        }
      }
      return a
    }, i = this && this.__spread || function () {
      for (var e = [], t = 0; t < arguments.length; t++) e = e.concat(o(arguments[t]));
      return e
    }, a = this && this.__values || function (e) {
      var t = "function" == typeof Symbol && e[Symbol.iterator], n = 0;
      return t ? t.call(e) : {
        next: function () {
          return e && n >= e.length && (e = void 0), {value: e && e[n++], done: !e}
        }
      }
    }, s = this && this.__importDefault || function (e) {
      return e && e.__esModule ? e : {default: e}
    };
    Object.defineProperty(n, "__esModule", {value: !0});
    var c = e("eventemitter3"), u = s(e("./logger")), l = e("./enums"), p = function (e) {
      function t(t, n, r, o, i) {
        var a = e.call(this) || this;
        a.WEB_SOCKET_PING_INTERVAL = 2e4, a._disconnected = !1, a._messagesQueue = [];
        var s = t ? "wss://" : "ws://";
        return a._wsUrl = s + n + ":" + r + o + "peerjs?key=" + i, a
      }

      return r(t, e), t.prototype.start = function (e, t) {
        this._id = e, this._wsUrl += "&id=" + e + "&token=" + t, this._startWebSocket()
      }, t.prototype._startWebSocket = function () {
        var e = this;
        this._socket || (this._socket = new WebSocket(this._wsUrl), this._socket.onmessage = function (t) {
          var n;
          try {
            n = JSON.parse(t.data)
          } catch (e) {
            return void u.default.log("Invalid server message", t.data)
          }
          e.emit(l.SocketEventType.Message, n)
        }, this._socket.onclose = function (t) {
          u.default.log("Socket closed.", t), e._disconnected = !0, clearTimeout(e._wsPingTimer), e.emit(l.SocketEventType.Disconnected)
        }, this._socket.onopen = function () {
          e._disconnected || (e._sendQueuedMessages(), u.default.log("Socket open"), e._scheduleHeartbeat())
        })
      }, t.prototype._scheduleHeartbeat = function () {
        var e = this;
        this._wsPingTimer = setTimeout(function () {
          e._sendHeartbeat()
        }, this.WEB_SOCKET_PING_INTERVAL)
      }, t.prototype._sendHeartbeat = function () {
        if (this._wsOpen()) {
          var e = JSON.stringify({type: l.ServerMessageType.Heartbeat});
          this._socket.send(e), this._scheduleHeartbeat()
        } else u.default.log("Cannot send heartbeat, because socket closed")
      }, t.prototype._wsOpen = function () {
        return !!this._socket && 1 == this._socket.readyState
      }, t.prototype._sendQueuedMessages = function () {
        var e, t, n = i(this._messagesQueue);
        this._messagesQueue = [];
        try {
          for (var r = a(n), o = r.next(); !o.done; o = r.next()) {
            var s = o.value;
            this.send(s)
          }
        } catch (t) {
          e = {error: t}
        } finally {
          try {
            o && !o.done && (t = r.return) && t.call(r)
          } finally {
            if (e) throw e.error
          }
        }
      }, t.prototype.send = function (e) {
        if (!this._disconnected) if (this._id) if (e.type) {
          if (this._wsOpen()) {
            var t = JSON.stringify(e);
            this._socket.send(t)
          }
        } else this.emit(l.SocketEventType.Error, "Invalid message"); else this._messagesQueue.push(e)
      }, t.prototype.close = function () {
        !this._disconnected && this._socket && (this._socket.close(), this._disconnected = !0, clearTimeout(this._wsPingTimer))
      }, t
    }(c.EventEmitter);
    n.Socket = p
  }, {eventemitter3: "2JJl", "./logger": "8WOs", "./enums": "9ZRY"}],
  T9kO: [function (e, t, n) {
    arguments[3], arguments[3];
    var r = e("js-binarypack"), o = {
      debug: !1, inherits: function (e, t) {
        e.super_ = t, e.prototype = Object.create(t.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })
      }, extend: function (e, t) {
        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
        return e
      }, pack: r.pack, unpack: r.unpack, log: function () {
        if (o.debug) {
          for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
          e.unshift("Reliable: "), console.log.apply(console, e)
        }
      }, setZeroTimeout: function (e) {
        var t = [], n = "zero-timeout-message";

        function r(r) {
          r.source == e && r.data == n && (r.stopPropagation && r.stopPropagation(), t.length && t.shift()())
        }

        return e.addEventListener ? e.addEventListener("message", r, !0) : e.attachEvent && e.attachEvent("onmessage", r), function (r) {
          t.push(r), e.postMessage(n, "*")
        }
      }(this), blobToArrayBuffer: function (e, t) {
        var n = new FileReader;
        n.onload = function (e) {
          t(e.target.result)
        }, n.readAsArrayBuffer(e)
      }, blobToBinaryString: function (e, t) {
        var n = new FileReader;
        n.onload = function (e) {
          t(e.target.result)
        }, n.readAsBinaryString(e)
      }, binaryStringToArrayBuffer: function (e) {
        for (var t = new Uint8Array(e.length), n = 0; n < e.length; n++) t[n] = 255 & e.charCodeAt(n);
        return t.buffer
      }, randomToken: function () {
        return Math.random().toString(36).substr(2)
      }
    };
    t.exports = o
  }, {"js-binarypack": "lHOc"}],
  aYFJ: [function (e, t, n) {
    var r = e("./util");

    function o(e, t) {
      if (!(this instanceof o)) return new o(e);
      this._dc = e, r.debug = t, this._outgoing = {}, this._incoming = {}, this._received = {}, this._window = 1e3, this._mtu = 500, this._interval = 0, this._count = 0, this._queue = [], this._setupDC()
    }

    o.prototype.send = function (e) {
      var t = r.pack(e);
      t.size < this._mtu ? this._handleSend(["no", t]) : (this._outgoing[this._count] = {
        ack: 0,
        chunks: this._chunk(t)
      }, r.debug && (this._outgoing[this._count].timer = new Date), this._sendWindowedChunks(this._count), this._count += 1)
    }, o.prototype._setupInterval = function () {
      var e = this;
      this._timeout = setInterval(function () {
        var t = e._queue.shift();
        if (t._multiple) for (var n = 0, r = t.length; n < r; n += 1) e._intervalSend(t[n]); else e._intervalSend(t)
      }, this._interval)
    }, o.prototype._intervalSend = function (e) {
      var t = this;
      e = r.pack(e), r.blobToBinaryString(e, function (e) {
        t._dc.send(e)
      }), 0 === t._queue.length && (clearTimeout(t._timeout), t._timeout = null)
    }, o.prototype._processAcks = function () {
      for (var e in this._outgoing) this._outgoing.hasOwnProperty(e) && this._sendWindowedChunks(e)
    }, o.prototype._handleSend = function (e) {
      for (var t = !0, n = 0, r = this._queue.length; n < r; n += 1) {
        var o = this._queue[n];
        o === e ? t = !1 : o._multiple && -1 !== o.indexOf(e) && (t = !1)
      }
      t && (this._queue.push(e), this._timeout || this._setupInterval())
    }, o.prototype._setupDC = function () {
      var e = this;
      this._dc.onmessage = function (t) {
        var n = t.data;
        if (n.constructor === String) {
          var o = r.binaryStringToArrayBuffer(n);
          n = r.unpack(o), e._handleMessage(n)
        }
      }
    }, o.prototype._handleMessage = function (e) {
      var t, n = e[1], o = this._incoming[n], i = this._outgoing[n];
      switch (e[0]) {
        case"no":
          var a = n;
          a && this.onmessage(r.unpack(a));
          break;
        case"end":
          if (t = o, this._received[n] = e[2], !t) break;
          this._ack(n);
          break;
        case"ack":
          if (t = i) {
            var s = e[2];
            t.ack = Math.max(s, t.ack), t.ack >= t.chunks.length ? (r.log("Time: ", new Date - t.timer), delete this._outgoing[n]) : this._processAcks()
          }
          break;
        case"chunk":
          if (!(t = o)) {
            if (!0 === this._received[n]) break;
            t = {ack: ["ack", n, 0], chunks: []}, this._incoming[n] = t
          }
          var c = e[2], u = e[3];
          t.chunks[c] = new Uint8Array(u), c === t.ack[2] && this._calculateNextAck(n), this._ack(n);
          break;
        default:
          this._handleSend(e)
      }
    }, o.prototype._chunk = function (e) {
      for (var t = [], n = e.size, o = 0; o < n;) {
        var i = Math.min(n, o + this._mtu), a = {payload: e.slice(o, i)};
        t.push(a), o = i
      }
      return r.log("Created", t.length, "chunks."), t
    }, o.prototype._ack = function (e) {
      var t = this._incoming[e].ack;
      this._received[e] === t[2] && (this._complete(e), this._received[e] = !0), this._handleSend(t)
    }, o.prototype._calculateNextAck = function (e) {
      for (var t = this._incoming[e], n = t.chunks, r = 0, o = n.length; r < o; r += 1) if (void 0 === n[r]) return void (t.ack[2] = r);
      t.ack[2] = n.length
    }, o.prototype._sendWindowedChunks = function (e) {
      r.log("sendWindowedChunks for: ", e);
      for (var t = this._outgoing[e], n = t.chunks, o = [], i = Math.min(t.ack + this._window, n.length), a = t.ack; a < i; a += 1) n[a].sent && a !== t.ack || (n[a].sent = !0, o.push(["chunk", e, a, n[a].payload]));
      t.ack + this._window >= n.length && o.push(["end", e, n.length]), o._multiple = !0, this._handleSend(o)
    }, o.prototype._complete = function (e) {
      r.log("Completed called for", e);
      var t = this, n = this._incoming[e].chunks, o = new Blob(n);
      r.blobToArrayBuffer(o, function (e) {
        t.onmessage(r.unpack(e))
      }), delete this._incoming[e]
    }, o.higherBandwidthSDP = function (e) {
      var t = navigator.appVersion.match(/Chrome\/(.*?) /);
      if (t && (t = parseInt(t[1].split(".").shift())) < 31) {
        var n = e.split("b=AS:30");
        if (n.length > 1) return n[0] + "b=AS:102400" + n[1]
      }
      return e
    }, o.prototype.onmessage = function (e) {
    }, t.exports = o
  }, {"./util": "T9kO"}],
  HCdX: [function (e, t, n) {
    "use strict";
    var r = this && this.__assign || function () {
      return (r = Object.assign || function (e) {
        for (var t, n = 1, r = arguments.length; n < r; n++) for (var o in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
        return e
      }).apply(this, arguments)
    }, o = this && this.__awaiter || function (e, t, n, r) {
      return new (n || (n = Promise))(function (o, i) {
        function a(e) {
          try {
            c(r.next(e))
          } catch (e) {
            i(e)
          }
        }

        function s(e) {
          try {
            c(r.throw(e))
          } catch (e) {
            i(e)
          }
        }

        function c(e) {
          e.done ? o(e.value) : new n(function (t) {
            t(e.value)
          }).then(a, s)
        }

        c((r = r.apply(e, t || [])).next())
      })
    }, i = this && this.__generator || function (e, t) {
      var n, r, o, i, a = {
        label: 0, sent: function () {
          if (1 & o[0]) throw o[1];
          return o[1]
        }, trys: [], ops: []
      };
      return i = {
        next: s(0),
        throw: s(1),
        return: s(2)
      }, "function" == typeof Symbol && (i[Symbol.iterator] = function () {
        return this
      }), i;

      function s(i) {
        return function (s) {
          return function (i) {
            if (n) throw new TypeError("Generator is already executing.");
            for (; a;) try {
              if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done) return o;
              switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                case 0:
                case 1:
                  o = i;
                  break;
                case 4:
                  return a.label++, {value: i[1], done: !1};
                case 5:
                  a.label++, r = i[1], i = [0];
                  continue;
                case 7:
                  i = a.ops.pop(), a.trys.pop();
                  continue;
                default:
                  if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                    a = 0;
                    continue
                  }
                  if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                    a.label = i[1];
                    break
                  }
                  if (6 === i[0] && a.label < o[1]) {
                    a.label = o[1], o = i;
                    break
                  }
                  if (o && a.label < o[2]) {
                    a.label = o[2], a.ops.push(i);
                    break
                  }
                  o[2] && a.ops.pop(), a.trys.pop();
                  continue
              }
              i = t.call(e, a)
            } catch (e) {
              i = [6, e], r = 0
            } finally {
              n = o = 0
            }
            if (5 & i[0]) throw i[1];
            return {value: i[0] ? i[1] : void 0, done: !0}
          }([i, s])
        }
      }
    }, a = this && this.__importStar || function (e) {
      if (e && e.__esModule) return e;
      var t = {};
      if (null != e) for (var n in e) Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);
      return t.default = e, t
    }, s = this && this.__importDefault || function (e) {
      return e && e.__esModule ? e : {default: e}
    };
    Object.defineProperty(n, "__esModule", {value: !0});
    var c = a(e("reliable")), u = e("./util"), l = s(e("./logger")), p = e("./adapter"), f = e("./enums"),
      h = function () {
        function e(e) {
          this.connection = e
        }

        return e.prototype.startConnection = function (e) {
          var t = this._startPeerConnection();
          if (this.connection.peerConnection = t, this.connection.type === f.ConnectionType.Media && e._stream && this._addTracksToConnection(e._stream, t), e.originator) {
            if (this.connection.type === f.ConnectionType.Data) {
              var n = this.connection, r = {};
              u.util.supports.sctp || (r = {reliable: e.reliable});
              var o = t.createDataChannel(n.label, r);
              n.initialize(o)
            }
            this._makeOffer()
          } else this.handleSDP("OFFER", e.sdp)
        }, e.prototype._startPeerConnection = function () {
          l.default.log("Creating RTCPeerConnection.");
          var e = {};
          this.connection.type !== f.ConnectionType.Data || u.util.supports.sctp ? this.connection.type === f.ConnectionType.Media && (e = {optional: [{DtlsSrtpKeyAgreement: !0}]}) : e = {optional: [{RtpDataChannels: !0}]};
          var t = new p.RTCPeerConnection(this.connection.provider.options.config, e);
          return this._setupListeners(t), t
        }, e.prototype._setupListeners = function (e) {
          var t = this, n = this.connection.peer, r = this.connection.connectionId, o = this.connection.type,
            i = this.connection.provider;
          l.default.log("Listening for ICE candidates."), e.onicecandidate = function (e) {
            e.candidate && (l.default.log("Received ICE candidates for:", n), i.socket.send({
              type: f.ServerMessageType.Candidate,
              payload: {candidate: e.candidate, type: o, connectionId: r},
              dst: n
            }))
          }, e.oniceconnectionstatechange = function () {
            switch (e.iceConnectionState) {
              case"failed":
                l.default.log("iceConnectionState is failed, closing connections to " + n), t.connection.emit(f.ConnectionEventType.Error, new Error("Negotiation of connection to " + n + " failed.")), t.connection.close();
                break;
              case"closed":
                l.default.log("iceConnectionState is closed, closing connections to " + n), t.connection.emit(f.ConnectionEventType.Error, new Error("Negotiation of connection to " + n + " failed.")), t.connection.close();
                break;
              case"disconnected":
                l.default.log("iceConnectionState is disconnected, closing connections to " + n);
                break;
              case"completed":
                e.onicecandidate = u.util.noop
            }
            t.connection.emit(f.ConnectionEventType.IceStateChanged, e.iceConnectionState)
          }, l.default.log("Listening for data channel"), e.ondatachannel = function (e) {
            l.default.log("Received data channel");
            var t = e.channel;
            i.getConnection(n, r).initialize(t)
          }, l.default.log("Listening for remote stream"), e.ontrack = function (e) {
            l.default.log("Received remote stream");
            var o = e.streams[0], a = i.getConnection(n, r);
            if (a.type === f.ConnectionType.Media) {
              var s = a;
              t._addStreamToMediaConnection(o, s)
            }
          }
        }, e.prototype.cleanup = function () {
          l.default.log("Cleaning up PeerConnection to " + this.connection.peer);
          var e = this.connection.peerConnection;
          if (e) {
            this.connection.peerConnection = null, e.onicecandidate = e.oniceconnectionstatechange = e.ondatachannel = e.ontrack = function () {
            };
            var t = "closed" !== e.signalingState, n = !1;
            if (this.connection.type === f.ConnectionType.Data) {
              var r = this.connection.dataChannel;
              n = r.readyState && "closed" !== r.readyState
            }
            (t || n) && e.close()
          }
        }, e.prototype._makeOffer = function () {
          return o(this, void 0, Promise, function () {
            var e, t, n, o, a, s, p;
            return i(this, function (i) {
              switch (i.label) {
                case 0:
                  e = this.connection.peerConnection, t = this.connection.provider, i.label = 1;
                case 1:
                  return i.trys.push([1, 7, , 8]), [4, e.createOffer(this.connection.options.constraints)];
                case 2:
                  n = i.sent(), l.default.log("Created offer."), u.util.supports.sctp || this.connection.type !== f.ConnectionType.Data || (a = this.connection).reliable && (n.sdp = c.higherBandwidthSDP(n.sdp)), this.connection.options.sdpTransform && "function" == typeof this.connection.options.sdpTransform && (n.sdp = this.connection.options.sdpTransform(n.sdp) || n.sdp), i.label = 3;
                case 3:
                  return i.trys.push([3, 5, , 6]), [4, e.setLocalDescription(n)];
                case 4:
                  return i.sent(), l.default.log("Set localDescription:", n, "for:" + this.connection.peer), o = {
                    sdp: n,
                    type: this.connection.type,
                    connectionId: this.connection.connectionId,
                    metadata: this.connection.metadata,
                    browser: u.util.browser
                  }, this.connection.type === f.ConnectionType.Data && (a = this.connection, o = r({}, o, {
                    label: a.label,
                    reliable: a.reliable,
                    serialization: a.serialization
                  })), t.socket.send({type: f.ServerMessageType.Offer, payload: o, dst: this.connection.peer}), [3, 6];
                case 5:
                  return "OperationError: Failed to set local offer sdp: Called in wrong state: kHaveRemoteOffer" != (s = i.sent()) && (t.emitError(f.PeerErrorType.WebRTC, s), l.default.log("Failed to setLocalDescription, ", s)), [3, 6];
                case 6:
                  return [3, 8];
                case 7:
                  return p = i.sent(), t.emitError(f.PeerErrorType.WebRTC, p), l.default.log("Failed to createOffer, ", p), [3, 8];
                case 8:
                  return [2]
              }
            })
          })
        }, e.prototype._makeAnswer = function () {
          return o(this, void 0, Promise, function () {
            var e, t, n, r, o;
            return i(this, function (i) {
              switch (i.label) {
                case 0:
                  e = this.connection.peerConnection, t = this.connection.provider, i.label = 1;
                case 1:
                  return i.trys.push([1, 7, , 8]), [4, e.createAnswer()];
                case 2:
                  n = i.sent(), l.default.log("Created answer."), u.util.supports.sctp || this.connection.type !== f.ConnectionType.Data || this.connection.reliable && (n.sdp = c.higherBandwidthSDP(n.sdp)), i.label = 3;
                case 3:
                  return i.trys.push([3, 5, , 6]), [4, e.setLocalDescription(n)];
                case 4:
                  return i.sent(), l.default.log("Set localDescription:", n, "for:" + this.connection.peer), t.socket.send({
                    type: f.ServerMessageType.Answer,
                    payload: {
                      sdp: n,
                      type: this.connection.type,
                      connectionId: this.connection.connectionId,
                      browser: u.util.browser
                    },
                    dst: this.connection.peer
                  }), [3, 6];
                case 5:
                  return r = i.sent(), t.emitError(f.PeerErrorType.WebRTC, r), l.default.log("Failed to setLocalDescription, ", r), [3, 6];
                case 6:
                  return [3, 8];
                case 7:
                  return o = i.sent(), t.emitError(f.PeerErrorType.WebRTC, o), l.default.log("Failed to create answer, ", o), [3, 8];
                case 8:
                  return [2]
              }
            })
          })
        }, e.prototype.handleSDP = function (e, t) {
          return o(this, void 0, Promise, function () {
            var n, r, o, a;
            return i(this, function (i) {
              switch (i.label) {
                case 0:
                  t = new p.RTCSessionDescription(t), n = this.connection.peerConnection, r = this.connection.provider, l.default.log("Setting remote description", t), o = this, i.label = 1;
                case 1:
                  return i.trys.push([1, 5, , 6]), [4, n.setRemoteDescription(t)];
                case 2:
                  return i.sent(), l.default.log("Set remoteDescription:" + e + " for:" + this.connection.peer), "OFFER" !== e ? [3, 4] : [4, o._makeAnswer()];
                case 3:
                  i.sent(), i.label = 4;
                case 4:
                  return [3, 6];
                case 5:
                  return a = i.sent(), r.emitError(f.PeerErrorType.WebRTC, a), l.default.log("Failed to setRemoteDescription, ", a), [3, 6];
                case 6:
                  return [2]
              }
            })
          })
        }, e.prototype.handleCandidate = function (e) {
          return o(this, void 0, Promise, function () {
            var t, n, r, o, a;
            return i(this, function (i) {
              switch (i.label) {
                case 0:
                  t = e.candidate, n = e.sdpMLineIndex, r = this.connection.peerConnection, o = this.connection.provider, i.label = 1;
                case 1:
                  return i.trys.push([1, 3, , 4]), [4, r.addIceCandidate(new p.RTCIceCandidate({
                    sdpMLineIndex: n,
                    candidate: t
                  }))];
                case 2:
                  return i.sent(), l.default.log("Added ICE candidate for:" + this.connection.peer), [3, 4];
                case 3:
                  return a = i.sent(), o.emitError(f.PeerErrorType.WebRTC, a), l.default.log("Failed to handleCandidate, ", a), [3, 4];
                case 4:
                  return [2]
              }
            })
          })
        }, e.prototype._addTracksToConnection = function (e, t) {
          if (l.default.log("add tracks from stream " + e.id + " to peer connection"), !t.addTrack) return l.default.error("Your browser does't support RTCPeerConnection#addTrack. Ignored.");
          e.getTracks().forEach(function (n) {
            t.addTrack(n, e)
          })
        }, e.prototype._addStreamToMediaConnection = function (e, t) {
          l.default.log("add stream " + e.id + " to media connection " + t.connectionId), t.addStream(e)
        }, e
      }();
    n.Negotiator = h
  }, {reliable: "aYFJ", "./util": "BHXf", "./logger": "8WOs", "./adapter": "sXtV", "./enums": "9ZRY"}],
  tQFK: [function (e, t, n) {
    "use strict";
    var r = this && this.__extends || function () {
      var e = function (t, n) {
        return (e = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(t, n)
      };
      return function (t, n) {
        function r() {
          this.constructor = t
        }

        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
      }
    }();
    Object.defineProperty(n, "__esModule", {value: !0});
    var o = function (e) {
      function t(t, n, r) {
        var o = e.call(this) || this;
        return o.peer = t, o.provider = n, o.options = r, o._open = !1, o.metadata = r.metadata, o
      }

      return r(t, e), Object.defineProperty(t.prototype, "open", {
        get: function () {
          return this._open
        }, enumerable: !0, configurable: !0
      }), t
    }(e("eventemitter3").EventEmitter);
    n.BaseConnection = o
  }, {eventemitter3: "2JJl"}],
  dbHP: [function (e, t, n) {
    "use strict";
    var r = this && this.__extends || function () {
      var e = function (t, n) {
        return (e = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(t, n)
      };
      return function (t, n) {
        function r() {
          this.constructor = t
        }

        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
      }
    }(), o = this && this.__assign || function () {
      return (o = Object.assign || function (e) {
        for (var t, n = 1, r = arguments.length; n < r; n++) for (var o in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
        return e
      }).apply(this, arguments)
    }, i = this && this.__values || function (e) {
      var t = "function" == typeof Symbol && e[Symbol.iterator], n = 0;
      return t ? t.call(e) : {
        next: function () {
          return e && n >= e.length && (e = void 0), {value: e && e[n++], done: !e}
        }
      }
    }, a = this && this.__importDefault || function (e) {
      return e && e.__esModule ? e : {default: e}
    };
    Object.defineProperty(n, "__esModule", {value: !0});
    var s = e("./util"), c = a(e("./logger")), u = e("./negotiator"), l = e("./enums"), p = function (e) {
      function t(n, r, o) {
        var i = e.call(this, n, r, o) || this;
        return i._localStream = i.options._stream, i.connectionId = i.options.connectionId || t.ID_PREFIX + s.util.randomToken(), i._negotiator = new u.Negotiator(i), i._localStream && i._negotiator.startConnection({
          _stream: i._localStream,
          originator: !0
        }), i
      }

      return r(t, e), Object.defineProperty(t.prototype, "type", {
        get: function () {
          return l.ConnectionType.Media
        }, enumerable: !0, configurable: !0
      }), Object.defineProperty(t.prototype, "localStream", {
        get: function () {
          return this._localStream
        }, enumerable: !0, configurable: !0
      }), Object.defineProperty(t.prototype, "remoteStream", {
        get: function () {
          return this._remoteStream
        }, enumerable: !0, configurable: !0
      }), t.prototype.addStream = function (t) {
        c.default.log("Receiving stream", t), this._remoteStream = t, e.prototype.emit.call(this, l.ConnectionEventType.Stream, t)
      }, t.prototype.handleMessage = function (e) {
        var t = e.type, n = e.payload;
        switch (e.type) {
          case l.ServerMessageType.Answer:
            this._negotiator.handleSDP(t, n.sdp), this._open = !0;
            break;
          case l.ServerMessageType.Candidate:
            this._negotiator.handleCandidate(n.candidate);
            break;
          default:
            c.default.warn("Unrecognized message type:" + t + " from peer:" + this.peer)
        }
      }, t.prototype.answer = function (e) {
        var t, n;
        if (this._localStream) c.default.warn("Local stream already exists on this MediaConnection. Are you answering a call twice?"); else {
          this._localStream = e, this._negotiator.startConnection(o({}, this.options._payload, {_stream: e}));
          var r = this.provider._getMessages(this.connectionId);
          try {
            for (var a = i(r), s = a.next(); !s.done; s = a.next()) {
              var u = s.value;
              this.handleMessage(u)
            }
          } catch (e) {
            t = {error: e}
          } finally {
            try {
              s && !s.done && (n = a.return) && n.call(a)
            } finally {
              if (t) throw t.error
            }
          }
          this._open = !0
        }
      }, t.prototype.close = function () {
        this._negotiator && (this._negotiator.cleanup(), this._negotiator = null), this._localStream = null, this._remoteStream = null, this.provider && (this.provider._removeConnection(this), this.provider = null), this.options && this.options._stream && (this.options._stream = null), this.open && (this._open = !1, e.prototype.emit.call(this, l.ConnectionEventType.Close))
      }, t.ID_PREFIX = "mc_", t
    }(e("./baseconnection").BaseConnection);
    n.MediaConnection = p
  }, {"./util": "BHXf", "./logger": "8WOs", "./negotiator": "HCdX", "./enums": "9ZRY", "./baseconnection": "tQFK"}],
  GBTQ: [function (e, t, n) {
    "use strict";
    var r = this && this.__extends || function () {
      var e = function (t, n) {
        return (e = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(t, n)
      };
      return function (t, n) {
        function r() {
          this.constructor = t
        }

        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
      }
    }(), o = this && this.__values || function (e) {
      var t = "function" == typeof Symbol && e[Symbol.iterator], n = 0;
      return t ? t.call(e) : {
        next: function () {
          return e && n >= e.length && (e = void 0), {value: e && e[n++], done: !e}
        }
      }
    }, i = this && this.__importStar || function (e) {
      if (e && e.__esModule) return e;
      var t = {};
      if (null != e) for (var n in e) Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);
      return t.default = e, t
    };
    Object.defineProperty(n, "__esModule", {value: !0});
    var a = e("reliable"), s = e("./util"), c = i(e("./logger")), u = e("./negotiator"), l = e("./enums"),
      p = function (e) {
        function t(n, r, o) {
          var i = e.call(this, n, r, o) || this;
          return i._buffer = [], i._bufferSize = 0, i._buffering = !1, i._chunkedData = {}, i.connectionId = i.options.connectionId || t.ID_PREFIX + s.util.randomToken(), i.label = i.options.label || i.connectionId, i.serialization = i.options.serialization || l.SerializationType.Binary, i.reliable = i.options.reliable, i.options._payload && (i._peerBrowser = i.options._payload.browser), i._negotiator = new u.Negotiator(i), i._negotiator.startConnection(i.options._payload || {originator: !0}), i
        }

        return r(t, e), Object.defineProperty(t.prototype, "type", {
          get: function () {
            return l.ConnectionType.Data
          }, enumerable: !0, configurable: !0
        }), Object.defineProperty(t.prototype, "dataChannel", {
          get: function () {
            return this._dc
          }, enumerable: !0, configurable: !0
        }), Object.defineProperty(t.prototype, "bufferSize", {
          get: function () {
            return this._bufferSize
          }, enumerable: !0, configurable: !0
        }), t.prototype.initialize = function (e) {
          this._dc = e, this._configureDataChannel()
        }, t.prototype._configureDataChannel = function () {
          var e = this;
          if (s.util.supports.sctp && (this.dataChannel.binaryType = "arraybuffer"), this.dataChannel.onopen = function () {
            c.default.log("Data channel connection success"), e._open = !0, e.emit(l.ConnectionEventType.Open)
          }, !s.util.supports.sctp && this.reliable) {
            var t = c.default.logLevel > c.LogLevel.Disabled;
            this._reliable = new a.Reliable(this.dataChannel, t)
          }
          this._reliable ? this._reliable.onmessage = function (t) {
            e.emit(l.ConnectionEventType.Data, t)
          } : this.dataChannel.onmessage = function (t) {
            e._handleDataMessage(t)
          }, this.dataChannel.onclose = function () {
            c.default.log("DataChannel closed for:", e.peer), e.close()
          }
        }, t.prototype._handleDataMessage = function (t) {
          var n = this, r = t.data, o = r.constructor;
          if (this.serialization === l.SerializationType.Binary || this.serialization === l.SerializationType.BinaryUTF8) {
            if (o === Blob) return void s.util.blobToArrayBuffer(r, function (e) {
              r = s.util.unpack(e), n.emit(l.ConnectionEventType.Data, r)
            });
            if (o === ArrayBuffer) r = s.util.unpack(r); else if (o === String) {
              var i = s.util.binaryStringToArrayBuffer(r);
              r = s.util.unpack(i)
            }
          } else this.serialization === l.SerializationType.JSON && (r = JSON.parse(r));
          if (r.__peerData) {
            var a = r.__peerData, c = this._chunkedData[a] || {data: [], count: 0, total: r.total};
            return c.data[r.n] = r.data, c.count++, c.total === c.count && (delete this._chunkedData[a], r = new Blob(c.data), this._handleDataMessage({data: r})), void (this._chunkedData[a] = c)
          }
          e.prototype.emit.call(this, l.ConnectionEventType.Data, r)
        }, t.prototype.close = function () {
          this._buffer = [], this._bufferSize = 0, this._negotiator && (this._negotiator.cleanup(), this._negotiator = null), this.provider && (this.provider._removeConnection(this), this.provider = null), this.open && (this._open = !1, e.prototype.emit.call(this, l.ConnectionEventType.Close))
        }, t.prototype.send = function (t, n) {
          var r = this;
          if (this.open) if (this._reliable) this._reliable.send(t); else if (this.serialization === l.SerializationType.JSON) this._bufferedSend(JSON.stringify(t)); else if (this.serialization === l.SerializationType.Binary || this.serialization === l.SerializationType.BinaryUTF8) {
            var o = s.util.pack(t);
            if ((s.util.chunkedBrowsers[this._peerBrowser] || s.util.chunkedBrowsers[s.util.browser]) && !n && o.size > s.util.chunkedMTU) return void this._sendChunks(o);
            s.util.supports.sctp ? s.util.supports.binaryBlob ? this._bufferedSend(o) : s.util.blobToArrayBuffer(o, function (e) {
              r._bufferedSend(e)
            }) : s.util.blobToBinaryString(o, function (e) {
              r._bufferedSend(e)
            })
          } else this._bufferedSend(t); else e.prototype.emit.call(this, l.ConnectionEventType.Error, new Error("Connection is not open. You should listen for the `open` event before sending messages."))
        }, t.prototype._bufferedSend = function (e) {
          !this._buffering && this._trySend(e) || (this._buffer.push(e), this._bufferSize = this._buffer.length)
        }, t.prototype._trySend = function (e) {
          var t = this;
          if (!this.open) return !1;
          try {
            this.dataChannel.send(e)
          } catch (e) {
            return this._buffering = !0, setTimeout(function () {
              t._buffering = !1, t._tryBuffer()
            }, 100), !1
          }
          return !0
        }, t.prototype._tryBuffer = function () {
          if (this.open && 0 !== this._buffer.length) {
            var e = this._buffer[0];
            this._trySend(e) && (this._buffer.shift(), this._bufferSize = this._buffer.length, this._tryBuffer())
          }
        }, t.prototype._sendChunks = function (e) {
          var t, n, r = s.util.chunk(e);
          try {
            for (var i = o(r), a = i.next(); !a.done; a = i.next()) {
              var c = a.value;
              this.send(c, !0)
            }
          } catch (e) {
            t = {error: e}
          } finally {
            try {
              a && !a.done && (n = i.return) && n.call(i)
            } finally {
              if (t) throw t.error
            }
          }
        }, t.prototype.handleMessage = function (e) {
          var t = e.payload;
          switch (e.type) {
            case l.ServerMessageType.Answer:
              this._peerBrowser = t.browser, this._negotiator.handleSDP(e.type, t.sdp);
              break;
            case l.ServerMessageType.Candidate:
              this._negotiator.handleCandidate(t.candidate);
              break;
            default:
              c.default.warn("Unrecognized message type:", e.type, "from peer:", this.peer)
          }
        }, t.ID_PREFIX = "dc_", t
      }(e("./baseconnection").BaseConnection);
    n.DataConnection = p
  }, {
    reliable: "aYFJ",
    "./util": "BHXf",
    "./logger": "8WOs",
    "./negotiator": "HCdX",
    "./enums": "9ZRY",
    "./baseconnection": "tQFK"
  }],
  in7L: [function (e, t, n) {
    "use strict";
    var r = this && this.__awaiter || function (e, t, n, r) {
      return new (n || (n = Promise))(function (o, i) {
        function a(e) {
          try {
            c(r.next(e))
          } catch (e) {
            i(e)
          }
        }

        function s(e) {
          try {
            c(r.throw(e))
          } catch (e) {
            i(e)
          }
        }

        function c(e) {
          e.done ? o(e.value) : new n(function (t) {
            t(e.value)
          }).then(a, s)
        }

        c((r = r.apply(e, t || [])).next())
      })
    }, o = this && this.__generator || function (e, t) {
      var n, r, o, i, a = {
        label: 0, sent: function () {
          if (1 & o[0]) throw o[1];
          return o[1]
        }, trys: [], ops: []
      };
      return i = {
        next: s(0),
        throw: s(1),
        return: s(2)
      }, "function" == typeof Symbol && (i[Symbol.iterator] = function () {
        return this
      }), i;

      function s(i) {
        return function (s) {
          return function (i) {
            if (n) throw new TypeError("Generator is already executing.");
            for (; a;) try {
              if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done) return o;
              switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                case 0:
                case 1:
                  o = i;
                  break;
                case 4:
                  return a.label++, {value: i[1], done: !1};
                case 5:
                  a.label++, r = i[1], i = [0];
                  continue;
                case 7:
                  i = a.ops.pop(), a.trys.pop();
                  continue;
                default:
                  if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                    a = 0;
                    continue
                  }
                  if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                    a.label = i[1];
                    break
                  }
                  if (6 === i[0] && a.label < o[1]) {
                    a.label = o[1], o = i;
                    break
                  }
                  if (o && a.label < o[2]) {
                    a.label = o[2], a.ops.push(i);
                    break
                  }
                  o[2] && a.ops.pop(), a.trys.pop();
                  continue
              }
              i = t.call(e, a)
            } catch (e) {
              i = [6, e], r = 0
            } finally {
              n = o = 0
            }
            if (5 & i[0]) throw i[1];
            return {value: i[0] ? i[1] : void 0, done: !0}
          }([i, s])
        }
      }
    }, i = this && this.__importDefault || function (e) {
      return e && e.__esModule ? e : {default: e}
    };
    Object.defineProperty(n, "__esModule", {value: !0});
    var a = e("./util"), s = i(e("./logger")), c = function () {
      function e(e) {
        this._options = e
      }

      return e.prototype._buildUrl = function (e) {
        return (this._options.secure ? "https://" : "http://") + this._options.host + ":" + this._options.port + this._options.path + this._options.key
      }, e.prototype.retrieveId = function () {
        return r(this, void 0, Promise, function () {
          var e, t, n, r;
          return o(this, function (o) {
            switch (o.label) {
              case 0:
                e = this._buildUrl("id"), o.label = 1;
              case 1:
                return o.trys.push([1, 3, , 4]), [4, fetch(e)];
              case 2:
                if (200 !== (t = o.sent()).status) throw new Error("Error. Status:" + t.status);
                return [2, t.text()];
              case 3:
                throw n = o.sent(), s.default.error("Error retrieving ID", n), r = "", "/" === this._options.path && this._options.host !== a.util.CLOUD_HOST && (r = " If you passed in a `path` to your self-hosted PeerServer, you'll also need to pass in that same path when creating a new Peer."), new Error("Could not get an ID from the server." + r);
              case 4:
                return [2]
            }
          })
        })
      }, e.prototype.listAllPeers = function () {
        return r(this, void 0, Promise, function () {
          var e, t, n, r;
          return o(this, function (o) {
            switch (o.label) {
              case 0:
                e = this._buildUrl("peers"), o.label = 1;
              case 1:
                return o.trys.push([1, 3, , 4]), [4, fetch(e)];
              case 2:
                if (200 !== (t = o.sent()).status) {
                  if (401 === t.status) throw"", n = this._options.host === a.util.CLOUD_HOST ? "It looks like you're using the cloud server. You can email team@peerjs.com to enable peer listing for your API key." : "You need to enable `allow_discovery` on your self-hosted PeerServer to use this feature.", new Error("It doesn't look like you have permission to list peers IDs. " + n);
                  throw new Error("Error. Status:" + t.status)
                }
                return [2, t.json()];
              case 3:
                throw r = o.sent(), s.default.error("Error retrieving list peers", r), new Error("Could not get list peers from the server." + r);
              case 4:
                return [2]
            }
          })
        })
      }, e
    }();
    n.API = c
  }, {"./util": "BHXf", "./logger": "8WOs"}],
  Hxpd: [function (e, t, n) {
    "use strict";
    var r = this && this.__extends || function () {
      var e = function (t, n) {
        return (e = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(t, n)
      };
      return function (t, n) {
        function r() {
          this.constructor = t
        }

        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
      }
    }(), o = this && this.__assign || function () {
      return (o = Object.assign || function (e) {
        for (var t, n = 1, r = arguments.length; n < r; n++) for (var o in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
        return e
      }).apply(this, arguments)
    }, i = this && this.__values || function (e) {
      var t = "function" == typeof Symbol && e[Symbol.iterator], n = 0;
      return t ? t.call(e) : {
        next: function () {
          return e && n >= e.length && (e = void 0), {value: e && e[n++], done: !e}
        }
      }
    }, a = this && this.__read || function (e, t) {
      var n = "function" == typeof Symbol && e[Symbol.iterator];
      if (!n) return e;
      var r, o, i = n.call(e), a = [];
      try {
        for (; (void 0 === t || t-- > 0) && !(r = i.next()).done;) a.push(r.value)
      } catch (e) {
        o = {error: e}
      } finally {
        try {
          r && !r.done && (n = i.return) && n.call(i)
        } finally {
          if (o) throw o.error
        }
      }
      return a
    }, s = this && this.__importDefault || function (e) {
      return e && e.__esModule ? e : {default: e}
    };
    Object.defineProperty(n, "__esModule", {value: !0});
    var c = e("eventemitter3"), u = e("./util"), l = s(e("./logger")), p = e("./socket"), f = e("./mediaconnection"),
      h = e("./dataconnection"), d = e("./enums"), _ = e("./api"), y = function (e) {
        function t(n, r) {
          var i = e.call(this) || this;
          return i._destroyed = !1, i._disconnected = !1, i._open = !1, i._connections = new Map, i._lostMessages = new Map, n && n.constructor == Object ? (r = n, n = void 0) : n && (n = n.toString()), r = o({
            debug: 0,
            host: u.util.CLOUD_HOST,
            port: u.util.CLOUD_PORT,
            path: "/",
            key: t.DEFAULT_KEY,
            token: u.util.randomToken(),
            config: u.util.defaultConfig
          }, r), i._options = r, "/" === r.host && (r.host = window.location.hostname), "/" !== r.path[0] && (r.path = "/" + r.path), "/" !== r.path[r.path.length - 1] && (r.path += "/"), void 0 === r.secure && r.host !== u.util.CLOUD_HOST ? r.secure = u.util.isSecure() : r.host == u.util.CLOUD_HOST && (r.secure = !0), r.logFunction && l.default.setLogFunction(r.logFunction), l.default.logLevel = r.debug, u.util.supports.audioVideo || u.util.supports.data ? u.util.validateId(n) ? (i._api = new _.API(r), i._initializeServerConnection(), n ? i._initialize(n) : i._api.retrieveId().then(function (e) {
            return i._initialize(e)
          }).catch(function (e) {
            return i._abort(d.PeerErrorType.ServerError, e)
          }), i) : (i._delayedAbort(d.PeerErrorType.InvalidID, 'ID "' + n + '" is invalid'), i) : (i._delayedAbort(d.PeerErrorType.BrowserIncompatible, "The current browser does not support WebRTC"), i)
        }

        return r(t, e), Object.defineProperty(t.prototype, "id", {
          get: function () {
            return this._id
          }, enumerable: !0, configurable: !0
        }), Object.defineProperty(t.prototype, "options", {
          get: function () {
            return this._options
          }, enumerable: !0, configurable: !0
        }), Object.defineProperty(t.prototype, "open", {
          get: function () {
            return this._open
          }, enumerable: !0, configurable: !0
        }), Object.defineProperty(t.prototype, "socket", {
          get: function () {
            return this._socket
          }, enumerable: !0, configurable: !0
        }), Object.defineProperty(t.prototype, "connections", {
          get: function () {
            var e, t, n = Object.create(null);
            try {
              for (var r = i(this._connections), o = r.next(); !o.done; o = r.next()) {
                var s = a(o.value, 2), c = s[0], u = s[1];
                n[c] = u
              }
            } catch (t) {
              e = {error: t}
            } finally {
              try {
                o && !o.done && (t = r.return) && t.call(r)
              } finally {
                if (e) throw e.error
              }
            }
            return n
          }, enumerable: !0, configurable: !0
        }), Object.defineProperty(t.prototype, "destroyed", {
          get: function () {
            return this._destroyed
          }, enumerable: !0, configurable: !0
        }), Object.defineProperty(t.prototype, "disconnected", {
          get: function () {
            return this._disconnected
          }, enumerable: !0, configurable: !0
        }), t.prototype._initializeServerConnection = function () {
          var e = this;
          this._socket = new p.Socket(this._options.secure, this._options.host, this._options.port, this._options.path, this._options.key), this.socket.on(d.SocketEventType.Message, function (t) {
            e._handleMessage(t)
          }), this.socket.on(d.SocketEventType.Error, function (t) {
            e._abort(d.PeerErrorType.SocketError, t)
          }), this.socket.on(d.SocketEventType.Disconnected, function () {
            e.disconnected || (e.emitError(d.PeerErrorType.Network, "Lost connection to server."), e.disconnect())
          }), this.socket.on(d.SocketEventType.Close, function () {
            e.disconnected || e._abort(d.PeerErrorType.SocketClosed, "Underlying socket is already closed.")
          })
        }, t.prototype._initialize = function (e) {
          this._id = e, this.socket.start(this.id, this._options.token)
        }, t.prototype._handleMessage = function (e) {
          var t, n, r = e.type, o = e.payload, a = e.src;
          switch (r) {
            case d.ServerMessageType.Open:
              this.emit(d.PeerEventType.Open, this.id), this._open = !0;
              break;
            case d.ServerMessageType.Error:
              this._abort(d.PeerErrorType.ServerError, o.msg);
              break;
            case d.ServerMessageType.IdTaken:
              this._abort(d.PeerErrorType.UnavailableID, 'ID "' + this.id + '" is taken');
              break;
            case d.ServerMessageType.InvalidKey:
              this._abort(d.PeerErrorType.InvalidKey, 'API KEY "' + this._options.key + '" is invalid');
              break;
            case d.ServerMessageType.Leave:
              l.default.log("Received leave message from", a), this._cleanupPeer(a), this._connections.delete(a);
              break;
            case d.ServerMessageType.Expire:
              this.emitError(d.PeerErrorType.PeerUnavailable, "Could not connect to peer " + a);
              break;
            case d.ServerMessageType.Offer:
              var s = o.connectionId;
              if ((y = this.getConnection(a, s)) && (y.close(), l.default.warn("Offer received for existing Connection ID:", s)), o.type === d.ConnectionType.Media) y = new f.MediaConnection(a, this, {
                connectionId: s,
                _payload: o,
                metadata: o.metadata
              }), this._addConnection(a, y), this.emit(d.PeerEventType.Call, y); else {
                if (o.type !== d.ConnectionType.Data) return void l.default.warn("Received malformed connection type:", o.type);
                y = new h.DataConnection(a, this, {
                  connectionId: s,
                  _payload: o,
                  metadata: o.metadata,
                  label: o.label,
                  serialization: o.serialization,
                  reliable: o.reliable
                }), this._addConnection(a, y), this.emit(d.PeerEventType.Connection, y)
              }
              var c = this._getMessages(s);
              try {
                for (var u = i(c), p = u.next(); !p.done; p = u.next()) {
                  var _ = p.value;
                  y.handleMessage(_)
                }
              } catch (e) {
                t = {error: e}
              } finally {
                try {
                  p && !p.done && (n = u.return) && n.call(u)
                } finally {
                  if (t) throw t.error
                }
              }
              break;
            default:
              if (!o) return void l.default.warn("You received a malformed message from " + a + " of type " + r);
              var y;
              s = o.connectionId, (y = this.getConnection(a, s)) && y.peerConnection ? y.handleMessage(e) : s ? this._storeMessage(s, e) : l.default.warn("You received an unrecognized message:", e)
          }
        }, t.prototype._storeMessage = function (e, t) {
          this._lostMessages.has(e) || this._lostMessages.set(e, []), this._lostMessages.get(e).push(t)
        }, t.prototype._getMessages = function (e) {
          var t = this._lostMessages.get(e);
          return t ? (this._lostMessages.delete(e), t) : []
        }, t.prototype.connect = function (e, t) {
          if (void 0 === t && (t = {}), this.disconnected) return l.default.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect, or call reconnect on this peer if you believe its ID to still be available."), void this.emitError(d.PeerErrorType.Disconnected, "Cannot connect to new Peer after disconnecting from server.");
          var n = new h.DataConnection(e, this, t);
          return this._addConnection(e, n), n
        }, t.prototype.call = function (e, t, n) {
          if (void 0 === n && (n = {}), this.disconnected) return l.default.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect."), void this.emitError(d.PeerErrorType.Disconnected, "Cannot connect to new Peer after disconnecting from server.");
          if (t) {
            n._stream = t;
            var r = new f.MediaConnection(e, this, n);
            return this._addConnection(e, r), r
          }
          l.default.error("To call a peer, you must provide a stream from your browser's `getUserMedia`.")
        }, t.prototype._addConnection = function (e, t) {
          l.default.log("add connection " + t.type + ":" + t.connectionId + "\n       to peerId:" + e), this._connections.has(e) || this._connections.set(e, []), this._connections.get(e).push(t)
        }, t.prototype._removeConnection = function (e) {
          var t = this._connections.get(e.peer);
          if (t) {
            var n = t.indexOf(e);
            -1 !== n && t.splice(n, 1)
          }
          this._lostMessages.delete(e.connectionId)
        }, t.prototype.getConnection = function (e, t) {
          var n, r, o = this._connections.get(e);
          if (!o) return null;
          try {
            for (var a = i(o), s = a.next(); !s.done; s = a.next()) {
              var c = s.value;
              if (c.connectionId === t) return c
            }
          } catch (e) {
            n = {error: e}
          } finally {
            try {
              s && !s.done && (r = a.return) && r.call(a)
            } finally {
              if (n) throw n.error
            }
          }
          return null
        }, t.prototype._delayedAbort = function (e, t) {
          var n = this;
          setTimeout(function () {
            n._abort(e, t)
          }, 0)
        }, t.prototype._abort = function (e, t) {
          l.default.error("Aborting!"), this._lastServerId ? this.disconnect() : this.destroy(), this.emitError(e, t)
        }, t.prototype.emitError = function (e, t) {
          l.default.error("Error:", t), "string" == typeof t && (t = new Error(t)), t.type = e, this.emit(d.PeerEventType.Error, t)
        }, t.prototype.destroy = function () {
          this.destroyed || (this._cleanup(), this.disconnect(), this._destroyed = !0)
        }, t.prototype._cleanup = function () {
          var e, t;
          try {
            for (var n = i(this._connections.keys()), r = n.next(); !r.done; r = n.next()) {
              var o = r.value;
              this._cleanupPeer(o), this._connections.delete(o)
            }
          } catch (t) {
            e = {error: t}
          } finally {
            try {
              r && !r.done && (t = n.return) && t.call(n)
            } finally {
              if (e) throw e.error
            }
          }
          this.emit(d.PeerEventType.Close)
        }, t.prototype._cleanupPeer = function (e) {
          var t, n, r = this._connections.get(e);
          if (r) try {
            for (var o = i(r), a = o.next(); !a.done; a = o.next()) a.value.close()
          } catch (e) {
            t = {error: e}
          } finally {
            try {
              a && !a.done && (n = o.return) && n.call(o)
            } finally {
              if (t) throw t.error
            }
          }
        }, t.prototype.disconnect = function () {
          var e = this;
          setTimeout(function () {
            e.disconnected || (e._disconnected = !0, e._open = !1, e.socket && e.socket.close(), e.emit(d.PeerEventType.Disconnected, e.id), e._lastServerId = e.id, e._id = null)
          }, 0)
        }, t.prototype.reconnect = function () {
          if (this.disconnected && !this.destroyed) l.default.log("Attempting reconnection to server with ID " + this._lastServerId), this._disconnected = !1, this._initializeServerConnection(), this._initialize(this._lastServerId); else {
            if (this.destroyed) throw new Error("This peer cannot reconnect to the server. It has already been destroyed.");
            if (this.disconnected || this.open) throw new Error("Peer " + this.id + " cannot reconnect because it is not disconnected from the server!");
            l.default.error("In a hurry? We're still trying to make the initial connection!")
          }
        }, t.prototype.listAllPeers = function (e) {
          var t = this;
          void 0 === e && (e = function (e) {
          }), this._api.listAllPeers().then(function (t) {
            return e(t)
          }).catch(function (e) {
            return t._abort(d.PeerErrorType.ServerError, e)
          })
        }, t.DEFAULT_KEY = "peerjs", t
      }(c.EventEmitter);
    n.Peer = y
  }, {
    eventemitter3: "2JJl",
    "./util": "BHXf",
    "./logger": "8WOs",
    "./socket": "wJlv",
    "./mediaconnection": "dbHP",
    "./dataconnection": "GBTQ",
    "./enums": "9ZRY",
    "./api": "in7L"
  }],
  iTK6: [function (e, t, n) {
    "use strict";
    Object.defineProperty(n, "__esModule", {value: !0});
    var r = e("./util"), o = e("./peer");
    n.peerjs = {Peer: o.Peer, util: r.util}, n.default = o.Peer, window.peerjs = n.peerjs, window.Peer = o.Peer
  }, {"./util": "BHXf", "./peer": "Hxpd"}]
}, {}, ["iTK6"]);
