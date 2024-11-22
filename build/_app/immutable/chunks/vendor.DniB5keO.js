import { c as Vr, g as Eu, _ as vu, a as Tu } from "./index.BF85B58K.js";
const Sh = !1;
var Ha = {},
  gn = {};
gn.byteLength = Nu;
gn.toByteArray = Su;
gn.fromByteArray = Uu;
var Pt = [],
  ht = [],
  Bu = typeof Uint8Array < "u" ? Uint8Array : Array,
  ki = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var vr = 0, Au = ki.length; vr < Au; ++vr)
  (Pt[vr] = ki[vr]), (ht[ki.charCodeAt(vr)] = vr);
ht[45] = 62;
ht[95] = 63;
function Da(e) {
  var t = e.length;
  if (t % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var r = e.indexOf("=");
  r === -1 && (r = t);
  var n = r === t ? 0 : 4 - (r % 4);
  return [r, n];
}
function Nu(e) {
  var t = Da(e),
    r = t[0],
    n = t[1];
  return ((r + n) * 3) / 4 - n;
}
function Iu(e, t, r) {
  return ((t + r) * 3) / 4 - r;
}
function Su(e) {
  var t,
    r = Da(e),
    n = r[0],
    i = r[1],
    a = new Bu(Iu(e, n, i)),
    d = 0,
    c = i > 0 ? n - 4 : n,
    w;
  for (w = 0; w < c; w += 4)
    (t =
      (ht[e.charCodeAt(w)] << 18) |
      (ht[e.charCodeAt(w + 1)] << 12) |
      (ht[e.charCodeAt(w + 2)] << 6) |
      ht[e.charCodeAt(w + 3)]),
      (a[d++] = (t >> 16) & 255),
      (a[d++] = (t >> 8) & 255),
      (a[d++] = t & 255);
  return (
    i === 2 &&
      ((t = (ht[e.charCodeAt(w)] << 2) | (ht[e.charCodeAt(w + 1)] >> 4)),
      (a[d++] = t & 255)),
    i === 1 &&
      ((t =
        (ht[e.charCodeAt(w)] << 10) |
        (ht[e.charCodeAt(w + 1)] << 4) |
        (ht[e.charCodeAt(w + 2)] >> 2)),
      (a[d++] = (t >> 8) & 255),
      (a[d++] = t & 255)),
    a
  );
}
function Ou(e) {
  return (
    Pt[(e >> 18) & 63] + Pt[(e >> 12) & 63] + Pt[(e >> 6) & 63] + Pt[e & 63]
  );
}
function Ru(e, t, r) {
  for (var n, i = [], a = t; a < r; a += 3)
    (n =
      ((e[a] << 16) & 16711680) + ((e[a + 1] << 8) & 65280) + (e[a + 2] & 255)),
      i.push(Ou(n));
  return i.join("");
}
function Uu(e) {
  for (
    var t, r = e.length, n = r % 3, i = [], a = 16383, d = 0, c = r - n;
    d < c;
    d += a
  )
    i.push(Ru(e, d, d + a > c ? c : d + a));
  return (
    n === 1
      ? ((t = e[r - 1]), i.push(Pt[t >> 2] + Pt[(t << 4) & 63] + "=="))
      : n === 2 &&
        ((t = (e[r - 2] << 8) + e[r - 1]),
        i.push(Pt[t >> 10] + Pt[(t >> 4) & 63] + Pt[(t << 2) & 63] + "=")),
    i.join("")
  );
}
var wn = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */ wn.read =
  function (e, t, r, n, i) {
    var a,
      d,
      c = i * 8 - n - 1,
      w = (1 << c) - 1,
      x = w >> 1,
      B = -7,
      N = r ? i - 1 : 0,
      I = r ? -1 : 1,
      S = e[t + N];
    for (
      N += I, a = S & ((1 << -B) - 1), S >>= -B, B += c;
      B > 0;
      a = a * 256 + e[t + N], N += I, B -= 8
    );
    for (
      d = a & ((1 << -B) - 1), a >>= -B, B += n;
      B > 0;
      d = d * 256 + e[t + N], N += I, B -= 8
    );
    if (a === 0) a = 1 - x;
    else {
      if (a === w) return d ? NaN : (S ? -1 : 1) * (1 / 0);
      (d = d + Math.pow(2, n)), (a = a - x);
    }
    return (S ? -1 : 1) * d * Math.pow(2, a - n);
  };
wn.write = function (e, t, r, n, i, a) {
  var d,
    c,
    w,
    x = a * 8 - i - 1,
    B = (1 << x) - 1,
    N = B >> 1,
    I = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
    S = n ? 0 : a - 1,
    b = n ? 1 : -1,
    C = t < 0 || (t === 0 && 1 / t < 0) ? 1 : 0;
  for (
    t = Math.abs(t),
      isNaN(t) || t === 1 / 0
        ? ((c = isNaN(t) ? 1 : 0), (d = B))
        : ((d = Math.floor(Math.log(t) / Math.LN2)),
          t * (w = Math.pow(2, -d)) < 1 && (d--, (w *= 2)),
          d + N >= 1 ? (t += I / w) : (t += I * Math.pow(2, 1 - N)),
          t * w >= 2 && (d++, (w /= 2)),
          d + N >= B
            ? ((c = 0), (d = B))
            : d + N >= 1
              ? ((c = (t * w - 1) * Math.pow(2, i)), (d = d + N))
              : ((c = t * Math.pow(2, N - 1) * Math.pow(2, i)), (d = 0)));
    i >= 8;
    e[r + S] = c & 255, S += b, c /= 256, i -= 8
  );
  for (
    d = (d << i) | c, x += i;
    x > 0;
    e[r + S] = d & 255, S += b, d /= 256, x -= 8
  );
  e[r + S - b] |= C * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */ (function (e) {
  const t = gn,
    r = wn,
    n =
      typeof Symbol == "function" && typeof Symbol.for == "function"
        ? Symbol.for("nodejs.util.inspect.custom")
        : null;
  (e.Buffer = c), (e.SlowBuffer = L), (e.INSPECT_MAX_BYTES = 50);
  const i = 2147483647;
  (e.kMaxLength = i),
    (c.TYPED_ARRAY_SUPPORT = a()),
    !c.TYPED_ARRAY_SUPPORT &&
      typeof console < "u" &&
      typeof console.error == "function" &&
      console.error(
        "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.",
      );
  function a() {
    try {
      const y = new Uint8Array(1),
        f = {
          foo: function () {
            return 42;
          },
        };
      return (
        Object.setPrototypeOf(f, Uint8Array.prototype),
        Object.setPrototypeOf(y, f),
        y.foo() === 42
      );
    } catch {
      return !1;
    }
  }
  Object.defineProperty(c.prototype, "parent", {
    enumerable: !0,
    get: function () {
      if (c.isBuffer(this)) return this.buffer;
    },
  }),
    Object.defineProperty(c.prototype, "offset", {
      enumerable: !0,
      get: function () {
        if (c.isBuffer(this)) return this.byteOffset;
      },
    });
  function d(y) {
    if (y > i)
      throw new RangeError(
        'The value "' + y + '" is invalid for option "size"',
      );
    const f = new Uint8Array(y);
    return Object.setPrototypeOf(f, c.prototype), f;
  }
  function c(y, f, l) {
    if (typeof y == "number") {
      if (typeof f == "string")
        throw new TypeError(
          'The "string" argument must be of type string. Received type number',
        );
      return N(y);
    }
    return w(y, f, l);
  }
  c.poolSize = 8192;
  function w(y, f, l) {
    if (typeof y == "string") return I(y, f);
    if (ArrayBuffer.isView(y)) return b(y);
    if (y == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
          typeof y,
      );
    if (
      j(y, ArrayBuffer) ||
      (y && j(y.buffer, ArrayBuffer)) ||
      (typeof SharedArrayBuffer < "u" &&
        (j(y, SharedArrayBuffer) || (y && j(y.buffer, SharedArrayBuffer))))
    )
      return C(y, f, l);
    if (typeof y == "number")
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number',
      );
    const A = y.valueOf && y.valueOf();
    if (A != null && A !== y) return c.from(A, f, l);
    const k = V(y);
    if (k) return k;
    if (
      typeof Symbol < "u" &&
      Symbol.toPrimitive != null &&
      typeof y[Symbol.toPrimitive] == "function"
    )
      return c.from(y[Symbol.toPrimitive]("string"), f, l);
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
        typeof y,
    );
  }
  (c.from = function (y, f, l) {
    return w(y, f, l);
  }),
    Object.setPrototypeOf(c.prototype, Uint8Array.prototype),
    Object.setPrototypeOf(c, Uint8Array);
  function x(y) {
    if (typeof y != "number")
      throw new TypeError('"size" argument must be of type number');
    if (y < 0)
      throw new RangeError(
        'The value "' + y + '" is invalid for option "size"',
      );
  }
  function B(y, f, l) {
    return (
      x(y),
      y <= 0
        ? d(y)
        : f !== void 0
          ? typeof l == "string"
            ? d(y).fill(f, l)
            : d(y).fill(f)
          : d(y)
    );
  }
  c.alloc = function (y, f, l) {
    return B(y, f, l);
  };
  function N(y) {
    return x(y), d(y < 0 ? 0 : K(y) | 0);
  }
  (c.allocUnsafe = function (y) {
    return N(y);
  }),
    (c.allocUnsafeSlow = function (y) {
      return N(y);
    });
  function I(y, f) {
    if (((typeof f != "string" || f === "") && (f = "utf8"), !c.isEncoding(f)))
      throw new TypeError("Unknown encoding: " + f);
    const l = W(y, f) | 0;
    let A = d(l);
    const k = A.write(y, f);
    return k !== l && (A = A.slice(0, k)), A;
  }
  function S(y) {
    const f = y.length < 0 ? 0 : K(y.length) | 0,
      l = d(f);
    for (let A = 0; A < f; A += 1) l[A] = y[A] & 255;
    return l;
  }
  function b(y) {
    if (j(y, Uint8Array)) {
      const f = new Uint8Array(y);
      return C(f.buffer, f.byteOffset, f.byteLength);
    }
    return S(y);
  }
  function C(y, f, l) {
    if (f < 0 || y.byteLength < f)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (y.byteLength < f + (l || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    let A;
    return (
      f === void 0 && l === void 0
        ? (A = new Uint8Array(y))
        : l === void 0
          ? (A = new Uint8Array(y, f))
          : (A = new Uint8Array(y, f, l)),
      Object.setPrototypeOf(A, c.prototype),
      A
    );
  }
  function V(y) {
    if (c.isBuffer(y)) {
      const f = K(y.length) | 0,
        l = d(f);
      return l.length === 0 || y.copy(l, 0, 0, f), l;
    }
    if (y.length !== void 0)
      return typeof y.length != "number" || Z(y.length) ? d(0) : S(y);
    if (y.type === "Buffer" && Array.isArray(y.data)) return S(y.data);
  }
  function K(y) {
    if (y >= i)
      throw new RangeError(
        "Attempt to allocate Buffer larger than maximum size: 0x" +
          i.toString(16) +
          " bytes",
      );
    return y | 0;
  }
  function L(y) {
    return +y != y && (y = 0), c.alloc(+y);
  }
  (c.isBuffer = function (f) {
    return f != null && f._isBuffer === !0 && f !== c.prototype;
  }),
    (c.compare = function (f, l) {
      if (
        (j(f, Uint8Array) && (f = c.from(f, f.offset, f.byteLength)),
        j(l, Uint8Array) && (l = c.from(l, l.offset, l.byteLength)),
        !c.isBuffer(f) || !c.isBuffer(l))
      )
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array',
        );
      if (f === l) return 0;
      let A = f.length,
        k = l.length;
      for (let D = 0, H = Math.min(A, k); D < H; ++D)
        if (f[D] !== l[D]) {
          (A = f[D]), (k = l[D]);
          break;
        }
      return A < k ? -1 : k < A ? 1 : 0;
    }),
    (c.isEncoding = function (f) {
      switch (String(f).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return !0;
        default:
          return !1;
      }
    }),
    (c.concat = function (f, l) {
      if (!Array.isArray(f))
        throw new TypeError('"list" argument must be an Array of Buffers');
      if (f.length === 0) return c.alloc(0);
      let A;
      if (l === void 0) for (l = 0, A = 0; A < f.length; ++A) l += f[A].length;
      const k = c.allocUnsafe(l);
      let D = 0;
      for (A = 0; A < f.length; ++A) {
        let H = f[A];
        if (j(H, Uint8Array))
          D + H.length > k.length
            ? (c.isBuffer(H) || (H = c.from(H)), H.copy(k, D))
            : Uint8Array.prototype.set.call(k, H, D);
        else if (c.isBuffer(H)) H.copy(k, D);
        else throw new TypeError('"list" argument must be an Array of Buffers');
        D += H.length;
      }
      return k;
    });
  function W(y, f) {
    if (c.isBuffer(y)) return y.length;
    if (ArrayBuffer.isView(y) || j(y, ArrayBuffer)) return y.byteLength;
    if (typeof y != "string")
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
          typeof y,
      );
    const l = y.length,
      A = arguments.length > 2 && arguments[2] === !0;
    if (!A && l === 0) return 0;
    let k = !1;
    for (;;)
      switch (f) {
        case "ascii":
        case "latin1":
        case "binary":
          return l;
        case "utf8":
        case "utf-8":
          return o(y).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return l * 2;
        case "hex":
          return l >>> 1;
        case "base64":
          return v(y).length;
        default:
          if (k) return A ? -1 : o(y).length;
          (f = ("" + f).toLowerCase()), (k = !0);
      }
  }
  c.byteLength = W;
  function te(y, f, l) {
    let A = !1;
    if (
      ((f === void 0 || f < 0) && (f = 0),
      f > this.length ||
        ((l === void 0 || l > this.length) && (l = this.length), l <= 0) ||
        ((l >>>= 0), (f >>>= 0), l <= f))
    )
      return "";
    for (y || (y = "utf8"); ; )
      switch (y) {
        case "hex":
          return re(this, f, l);
        case "utf8":
        case "utf-8":
          return P(this, f, l);
        case "ascii":
          return G(this, f, l);
        case "latin1":
        case "binary":
          return Q(this, f, l);
        case "base64":
          return R(this, f, l);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return ye(this, f, l);
        default:
          if (A) throw new TypeError("Unknown encoding: " + y);
          (y = (y + "").toLowerCase()), (A = !0);
      }
  }
  c.prototype._isBuffer = !0;
  function $(y, f, l) {
    const A = y[f];
    (y[f] = y[l]), (y[l] = A);
  }
  (c.prototype.swap16 = function () {
    const f = this.length;
    if (f % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (let l = 0; l < f; l += 2) $(this, l, l + 1);
    return this;
  }),
    (c.prototype.swap32 = function () {
      const f = this.length;
      if (f % 4 !== 0)
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      for (let l = 0; l < f; l += 4) $(this, l, l + 3), $(this, l + 1, l + 2);
      return this;
    }),
    (c.prototype.swap64 = function () {
      const f = this.length;
      if (f % 8 !== 0)
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (let l = 0; l < f; l += 8)
        $(this, l, l + 7),
          $(this, l + 1, l + 6),
          $(this, l + 2, l + 5),
          $(this, l + 3, l + 4);
      return this;
    }),
    (c.prototype.toString = function () {
      const f = this.length;
      return f === 0
        ? ""
        : arguments.length === 0
          ? P(this, 0, f)
          : te.apply(this, arguments);
    }),
    (c.prototype.toLocaleString = c.prototype.toString),
    (c.prototype.equals = function (f) {
      if (!c.isBuffer(f)) throw new TypeError("Argument must be a Buffer");
      return this === f ? !0 : c.compare(this, f) === 0;
    }),
    (c.prototype.inspect = function () {
      let f = "";
      const l = e.INSPECT_MAX_BYTES;
      return (
        (f = this.toString("hex", 0, l)
          .replace(/(.{2})/g, "$1 ")
          .trim()),
        this.length > l && (f += " ... "),
        "<Buffer " + f + ">"
      );
    }),
    n && (c.prototype[n] = c.prototype.inspect),
    (c.prototype.compare = function (f, l, A, k, D) {
      if (
        (j(f, Uint8Array) && (f = c.from(f, f.offset, f.byteLength)),
        !c.isBuffer(f))
      )
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
            typeof f,
        );
      if (
        (l === void 0 && (l = 0),
        A === void 0 && (A = f ? f.length : 0),
        k === void 0 && (k = 0),
        D === void 0 && (D = this.length),
        l < 0 || A > f.length || k < 0 || D > this.length)
      )
        throw new RangeError("out of range index");
      if (k >= D && l >= A) return 0;
      if (k >= D) return -1;
      if (l >= A) return 1;
      if (((l >>>= 0), (A >>>= 0), (k >>>= 0), (D >>>= 0), this === f))
        return 0;
      let H = D - k,
        _e = A - l;
      const Be = Math.min(H, _e),
        Ee = this.slice(k, D),
        xe = f.slice(l, A);
      for (let Oe = 0; Oe < Be; ++Oe)
        if (Ee[Oe] !== xe[Oe]) {
          (H = Ee[Oe]), (_e = xe[Oe]);
          break;
        }
      return H < _e ? -1 : _e < H ? 1 : 0;
    });
  function X(y, f, l, A, k) {
    if (y.length === 0) return -1;
    if (
      (typeof l == "string"
        ? ((A = l), (l = 0))
        : l > 2147483647
          ? (l = 2147483647)
          : l < -2147483648 && (l = -2147483648),
      (l = +l),
      Z(l) && (l = k ? 0 : y.length - 1),
      l < 0 && (l = y.length + l),
      l >= y.length)
    ) {
      if (k) return -1;
      l = y.length - 1;
    } else if (l < 0)
      if (k) l = 0;
      else return -1;
    if ((typeof f == "string" && (f = c.from(f, A)), c.isBuffer(f)))
      return f.length === 0 ? -1 : q(y, f, l, A, k);
    if (typeof f == "number")
      return (
        (f = f & 255),
        typeof Uint8Array.prototype.indexOf == "function"
          ? k
            ? Uint8Array.prototype.indexOf.call(y, f, l)
            : Uint8Array.prototype.lastIndexOf.call(y, f, l)
          : q(y, [f], l, A, k)
      );
    throw new TypeError("val must be string, number or Buffer");
  }
  function q(y, f, l, A, k) {
    let D = 1,
      H = y.length,
      _e = f.length;
    if (
      A !== void 0 &&
      ((A = String(A).toLowerCase()),
      A === "ucs2" || A === "ucs-2" || A === "utf16le" || A === "utf-16le")
    ) {
      if (y.length < 2 || f.length < 2) return -1;
      (D = 2), (H /= 2), (_e /= 2), (l /= 2);
    }
    function Be(xe, Oe) {
      return D === 1 ? xe[Oe] : xe.readUInt16BE(Oe * D);
    }
    let Ee;
    if (k) {
      let xe = -1;
      for (Ee = l; Ee < H; Ee++)
        if (Be(y, Ee) === Be(f, xe === -1 ? 0 : Ee - xe)) {
          if ((xe === -1 && (xe = Ee), Ee - xe + 1 === _e)) return xe * D;
        } else xe !== -1 && (Ee -= Ee - xe), (xe = -1);
    } else
      for (l + _e > H && (l = H - _e), Ee = l; Ee >= 0; Ee--) {
        let xe = !0;
        for (let Oe = 0; Oe < _e; Oe++)
          if (Be(y, Ee + Oe) !== Be(f, Oe)) {
            xe = !1;
            break;
          }
        if (xe) return Ee;
      }
    return -1;
  }
  (c.prototype.includes = function (f, l, A) {
    return this.indexOf(f, l, A) !== -1;
  }),
    (c.prototype.indexOf = function (f, l, A) {
      return X(this, f, l, A, !0);
    }),
    (c.prototype.lastIndexOf = function (f, l, A) {
      return X(this, f, l, A, !1);
    });
  function ee(y, f, l, A) {
    l = Number(l) || 0;
    const k = y.length - l;
    A ? ((A = Number(A)), A > k && (A = k)) : (A = k);
    const D = f.length;
    A > D / 2 && (A = D / 2);
    let H;
    for (H = 0; H < A; ++H) {
      const _e = parseInt(f.substr(H * 2, 2), 16);
      if (Z(_e)) return H;
      y[l + H] = _e;
    }
    return H;
  }
  function ne(y, f, l, A) {
    return O(o(f, y.length - l), y, l, A);
  }
  function J(y, f, l, A) {
    return O(u(f), y, l, A);
  }
  function he(y, f, l, A) {
    return O(v(f), y, l, A);
  }
  function ue(y, f, l, A) {
    return O(g(f, y.length - l), y, l, A);
  }
  (c.prototype.write = function (f, l, A, k) {
    if (l === void 0) (k = "utf8"), (A = this.length), (l = 0);
    else if (A === void 0 && typeof l == "string")
      (k = l), (A = this.length), (l = 0);
    else if (isFinite(l))
      (l = l >>> 0),
        isFinite(A)
          ? ((A = A >>> 0), k === void 0 && (k = "utf8"))
          : ((k = A), (A = void 0));
    else
      throw new Error(
        "Buffer.write(string, encoding, offset[, length]) is no longer supported",
      );
    const D = this.length - l;
    if (
      ((A === void 0 || A > D) && (A = D),
      (f.length > 0 && (A < 0 || l < 0)) || l > this.length)
    )
      throw new RangeError("Attempt to write outside buffer bounds");
    k || (k = "utf8");
    let H = !1;
    for (;;)
      switch (k) {
        case "hex":
          return ee(this, f, l, A);
        case "utf8":
        case "utf-8":
          return ne(this, f, l, A);
        case "ascii":
        case "latin1":
        case "binary":
          return J(this, f, l, A);
        case "base64":
          return he(this, f, l, A);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return ue(this, f, l, A);
        default:
          if (H) throw new TypeError("Unknown encoding: " + k);
          (k = ("" + k).toLowerCase()), (H = !0);
      }
  }),
    (c.prototype.toJSON = function () {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0),
      };
    });
  function R(y, f, l) {
    return f === 0 && l === y.length
      ? t.fromByteArray(y)
      : t.fromByteArray(y.slice(f, l));
  }
  function P(y, f, l) {
    l = Math.min(y.length, l);
    const A = [];
    let k = f;
    for (; k < l; ) {
      const D = y[k];
      let H = null,
        _e = D > 239 ? 4 : D > 223 ? 3 : D > 191 ? 2 : 1;
      if (k + _e <= l) {
        let Be, Ee, xe, Oe;
        switch (_e) {
          case 1:
            D < 128 && (H = D);
            break;
          case 2:
            (Be = y[k + 1]),
              (Be & 192) === 128 &&
                ((Oe = ((D & 31) << 6) | (Be & 63)), Oe > 127 && (H = Oe));
            break;
          case 3:
            (Be = y[k + 1]),
              (Ee = y[k + 2]),
              (Be & 192) === 128 &&
                (Ee & 192) === 128 &&
                ((Oe = ((D & 15) << 12) | ((Be & 63) << 6) | (Ee & 63)),
                Oe > 2047 && (Oe < 55296 || Oe > 57343) && (H = Oe));
            break;
          case 4:
            (Be = y[k + 1]),
              (Ee = y[k + 2]),
              (xe = y[k + 3]),
              (Be & 192) === 128 &&
                (Ee & 192) === 128 &&
                (xe & 192) === 128 &&
                ((Oe =
                  ((D & 15) << 18) |
                  ((Be & 63) << 12) |
                  ((Ee & 63) << 6) |
                  (xe & 63)),
                Oe > 65535 && Oe < 1114112 && (H = Oe));
        }
      }
      H === null
        ? ((H = 65533), (_e = 1))
        : H > 65535 &&
          ((H -= 65536),
          A.push(((H >>> 10) & 1023) | 55296),
          (H = 56320 | (H & 1023))),
        A.push(H),
        (k += _e);
    }
    return M(A);
  }
  const z = 4096;
  function M(y) {
    const f = y.length;
    if (f <= z) return String.fromCharCode.apply(String, y);
    let l = "",
      A = 0;
    for (; A < f; )
      l += String.fromCharCode.apply(String, y.slice(A, (A += z)));
    return l;
  }
  function G(y, f, l) {
    let A = "";
    l = Math.min(y.length, l);
    for (let k = f; k < l; ++k) A += String.fromCharCode(y[k] & 127);
    return A;
  }
  function Q(y, f, l) {
    let A = "";
    l = Math.min(y.length, l);
    for (let k = f; k < l; ++k) A += String.fromCharCode(y[k]);
    return A;
  }
  function re(y, f, l) {
    const A = y.length;
    (!f || f < 0) && (f = 0), (!l || l < 0 || l > A) && (l = A);
    let k = "";
    for (let D = f; D < l; ++D) k += ce[y[D]];
    return k;
  }
  function ye(y, f, l) {
    const A = y.slice(f, l);
    let k = "";
    for (let D = 0; D < A.length - 1; D += 2)
      k += String.fromCharCode(A[D] + A[D + 1] * 256);
    return k;
  }
  c.prototype.slice = function (f, l) {
    const A = this.length;
    (f = ~~f),
      (l = l === void 0 ? A : ~~l),
      f < 0 ? ((f += A), f < 0 && (f = 0)) : f > A && (f = A),
      l < 0 ? ((l += A), l < 0 && (l = 0)) : l > A && (l = A),
      l < f && (l = f);
    const k = this.subarray(f, l);
    return Object.setPrototypeOf(k, c.prototype), k;
  };
  function ae(y, f, l) {
    if (y % 1 !== 0 || y < 0) throw new RangeError("offset is not uint");
    if (y + f > l)
      throw new RangeError("Trying to access beyond buffer length");
  }
  (c.prototype.readUintLE = c.prototype.readUIntLE =
    function (f, l, A) {
      (f = f >>> 0), (l = l >>> 0), A || ae(f, l, this.length);
      let k = this[f],
        D = 1,
        H = 0;
      for (; ++H < l && (D *= 256); ) k += this[f + H] * D;
      return k;
    }),
    (c.prototype.readUintBE = c.prototype.readUIntBE =
      function (f, l, A) {
        (f = f >>> 0), (l = l >>> 0), A || ae(f, l, this.length);
        let k = this[f + --l],
          D = 1;
        for (; l > 0 && (D *= 256); ) k += this[f + --l] * D;
        return k;
      }),
    (c.prototype.readUint8 = c.prototype.readUInt8 =
      function (f, l) {
        return (f = f >>> 0), l || ae(f, 1, this.length), this[f];
      }),
    (c.prototype.readUint16LE = c.prototype.readUInt16LE =
      function (f, l) {
        return (
          (f = f >>> 0),
          l || ae(f, 2, this.length),
          this[f] | (this[f + 1] << 8)
        );
      }),
    (c.prototype.readUint16BE = c.prototype.readUInt16BE =
      function (f, l) {
        return (
          (f = f >>> 0),
          l || ae(f, 2, this.length),
          (this[f] << 8) | this[f + 1]
        );
      }),
    (c.prototype.readUint32LE = c.prototype.readUInt32LE =
      function (f, l) {
        return (
          (f = f >>> 0),
          l || ae(f, 4, this.length),
          (this[f] | (this[f + 1] << 8) | (this[f + 2] << 16)) +
            this[f + 3] * 16777216
        );
      }),
    (c.prototype.readUint32BE = c.prototype.readUInt32BE =
      function (f, l) {
        return (
          (f = f >>> 0),
          l || ae(f, 4, this.length),
          this[f] * 16777216 +
            ((this[f + 1] << 16) | (this[f + 2] << 8) | this[f + 3])
        );
      }),
    (c.prototype.readBigUInt64LE = de(function (f) {
      (f = f >>> 0), E(f, "offset");
      const l = this[f],
        A = this[f + 7];
      (l === void 0 || A === void 0) && T(f, this.length - 8);
      const k =
          l + this[++f] * 2 ** 8 + this[++f] * 2 ** 16 + this[++f] * 2 ** 24,
        D = this[++f] + this[++f] * 2 ** 8 + this[++f] * 2 ** 16 + A * 2 ** 24;
      return BigInt(k) + (BigInt(D) << BigInt(32));
    })),
    (c.prototype.readBigUInt64BE = de(function (f) {
      (f = f >>> 0), E(f, "offset");
      const l = this[f],
        A = this[f + 7];
      (l === void 0 || A === void 0) && T(f, this.length - 8);
      const k =
          l * 2 ** 24 + this[++f] * 2 ** 16 + this[++f] * 2 ** 8 + this[++f],
        D = this[++f] * 2 ** 24 + this[++f] * 2 ** 16 + this[++f] * 2 ** 8 + A;
      return (BigInt(k) << BigInt(32)) + BigInt(D);
    })),
    (c.prototype.readIntLE = function (f, l, A) {
      (f = f >>> 0), (l = l >>> 0), A || ae(f, l, this.length);
      let k = this[f],
        D = 1,
        H = 0;
      for (; ++H < l && (D *= 256); ) k += this[f + H] * D;
      return (D *= 128), k >= D && (k -= Math.pow(2, 8 * l)), k;
    }),
    (c.prototype.readIntBE = function (f, l, A) {
      (f = f >>> 0), (l = l >>> 0), A || ae(f, l, this.length);
      let k = l,
        D = 1,
        H = this[f + --k];
      for (; k > 0 && (D *= 256); ) H += this[f + --k] * D;
      return (D *= 128), H >= D && (H -= Math.pow(2, 8 * l)), H;
    }),
    (c.prototype.readInt8 = function (f, l) {
      return (
        (f = f >>> 0),
        l || ae(f, 1, this.length),
        this[f] & 128 ? (255 - this[f] + 1) * -1 : this[f]
      );
    }),
    (c.prototype.readInt16LE = function (f, l) {
      (f = f >>> 0), l || ae(f, 2, this.length);
      const A = this[f] | (this[f + 1] << 8);
      return A & 32768 ? A | 4294901760 : A;
    }),
    (c.prototype.readInt16BE = function (f, l) {
      (f = f >>> 0), l || ae(f, 2, this.length);
      const A = this[f + 1] | (this[f] << 8);
      return A & 32768 ? A | 4294901760 : A;
    }),
    (c.prototype.readInt32LE = function (f, l) {
      return (
        (f = f >>> 0),
        l || ae(f, 4, this.length),
        this[f] | (this[f + 1] << 8) | (this[f + 2] << 16) | (this[f + 3] << 24)
      );
    }),
    (c.prototype.readInt32BE = function (f, l) {
      return (
        (f = f >>> 0),
        l || ae(f, 4, this.length),
        (this[f] << 24) | (this[f + 1] << 16) | (this[f + 2] << 8) | this[f + 3]
      );
    }),
    (c.prototype.readBigInt64LE = de(function (f) {
      (f = f >>> 0), E(f, "offset");
      const l = this[f],
        A = this[f + 7];
      (l === void 0 || A === void 0) && T(f, this.length - 8);
      const k =
        this[f + 4] + this[f + 5] * 2 ** 8 + this[f + 6] * 2 ** 16 + (A << 24);
      return (
        (BigInt(k) << BigInt(32)) +
        BigInt(
          l + this[++f] * 2 ** 8 + this[++f] * 2 ** 16 + this[++f] * 2 ** 24,
        )
      );
    })),
    (c.prototype.readBigInt64BE = de(function (f) {
      (f = f >>> 0), E(f, "offset");
      const l = this[f],
        A = this[f + 7];
      (l === void 0 || A === void 0) && T(f, this.length - 8);
      const k =
        (l << 24) + this[++f] * 2 ** 16 + this[++f] * 2 ** 8 + this[++f];
      return (
        (BigInt(k) << BigInt(32)) +
        BigInt(
          this[++f] * 2 ** 24 + this[++f] * 2 ** 16 + this[++f] * 2 ** 8 + A,
        )
      );
    })),
    (c.prototype.readFloatLE = function (f, l) {
      return (
        (f = f >>> 0), l || ae(f, 4, this.length), r.read(this, f, !0, 23, 4)
      );
    }),
    (c.prototype.readFloatBE = function (f, l) {
      return (
        (f = f >>> 0), l || ae(f, 4, this.length), r.read(this, f, !1, 23, 4)
      );
    }),
    (c.prototype.readDoubleLE = function (f, l) {
      return (
        (f = f >>> 0), l || ae(f, 8, this.length), r.read(this, f, !0, 52, 8)
      );
    }),
    (c.prototype.readDoubleBE = function (f, l) {
      return (
        (f = f >>> 0), l || ae(f, 8, this.length), r.read(this, f, !1, 52, 8)
      );
    });
  function Y(y, f, l, A, k, D) {
    if (!c.isBuffer(y))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (f > k || f < D)
      throw new RangeError('"value" argument is out of bounds');
    if (l + A > y.length) throw new RangeError("Index out of range");
  }
  (c.prototype.writeUintLE = c.prototype.writeUIntLE =
    function (f, l, A, k) {
      if (((f = +f), (l = l >>> 0), (A = A >>> 0), !k)) {
        const _e = Math.pow(2, 8 * A) - 1;
        Y(this, f, l, A, _e, 0);
      }
      let D = 1,
        H = 0;
      for (this[l] = f & 255; ++H < A && (D *= 256); )
        this[l + H] = (f / D) & 255;
      return l + A;
    }),
    (c.prototype.writeUintBE = c.prototype.writeUIntBE =
      function (f, l, A, k) {
        if (((f = +f), (l = l >>> 0), (A = A >>> 0), !k)) {
          const _e = Math.pow(2, 8 * A) - 1;
          Y(this, f, l, A, _e, 0);
        }
        let D = A - 1,
          H = 1;
        for (this[l + D] = f & 255; --D >= 0 && (H *= 256); )
          this[l + D] = (f / H) & 255;
        return l + A;
      }),
    (c.prototype.writeUint8 = c.prototype.writeUInt8 =
      function (f, l, A) {
        return (
          (f = +f),
          (l = l >>> 0),
          A || Y(this, f, l, 1, 255, 0),
          (this[l] = f & 255),
          l + 1
        );
      }),
    (c.prototype.writeUint16LE = c.prototype.writeUInt16LE =
      function (f, l, A) {
        return (
          (f = +f),
          (l = l >>> 0),
          A || Y(this, f, l, 2, 65535, 0),
          (this[l] = f & 255),
          (this[l + 1] = f >>> 8),
          l + 2
        );
      }),
    (c.prototype.writeUint16BE = c.prototype.writeUInt16BE =
      function (f, l, A) {
        return (
          (f = +f),
          (l = l >>> 0),
          A || Y(this, f, l, 2, 65535, 0),
          (this[l] = f >>> 8),
          (this[l + 1] = f & 255),
          l + 2
        );
      }),
    (c.prototype.writeUint32LE = c.prototype.writeUInt32LE =
      function (f, l, A) {
        return (
          (f = +f),
          (l = l >>> 0),
          A || Y(this, f, l, 4, 4294967295, 0),
          (this[l + 3] = f >>> 24),
          (this[l + 2] = f >>> 16),
          (this[l + 1] = f >>> 8),
          (this[l] = f & 255),
          l + 4
        );
      }),
    (c.prototype.writeUint32BE = c.prototype.writeUInt32BE =
      function (f, l, A) {
        return (
          (f = +f),
          (l = l >>> 0),
          A || Y(this, f, l, 4, 4294967295, 0),
          (this[l] = f >>> 24),
          (this[l + 1] = f >>> 16),
          (this[l + 2] = f >>> 8),
          (this[l + 3] = f & 255),
          l + 4
        );
      });
  function le(y, f, l, A, k) {
    h(f, A, k, y, l, 7);
    let D = Number(f & BigInt(4294967295));
    (y[l++] = D),
      (D = D >> 8),
      (y[l++] = D),
      (D = D >> 8),
      (y[l++] = D),
      (D = D >> 8),
      (y[l++] = D);
    let H = Number((f >> BigInt(32)) & BigInt(4294967295));
    return (
      (y[l++] = H),
      (H = H >> 8),
      (y[l++] = H),
      (H = H >> 8),
      (y[l++] = H),
      (H = H >> 8),
      (y[l++] = H),
      l
    );
  }
  function _(y, f, l, A, k) {
    h(f, A, k, y, l, 7);
    let D = Number(f & BigInt(4294967295));
    (y[l + 7] = D),
      (D = D >> 8),
      (y[l + 6] = D),
      (D = D >> 8),
      (y[l + 5] = D),
      (D = D >> 8),
      (y[l + 4] = D);
    let H = Number((f >> BigInt(32)) & BigInt(4294967295));
    return (
      (y[l + 3] = H),
      (H = H >> 8),
      (y[l + 2] = H),
      (H = H >> 8),
      (y[l + 1] = H),
      (H = H >> 8),
      (y[l] = H),
      l + 8
    );
  }
  (c.prototype.writeBigUInt64LE = de(function (f, l = 0) {
    return le(this, f, l, BigInt(0), BigInt("0xffffffffffffffff"));
  })),
    (c.prototype.writeBigUInt64BE = de(function (f, l = 0) {
      return _(this, f, l, BigInt(0), BigInt("0xffffffffffffffff"));
    })),
    (c.prototype.writeIntLE = function (f, l, A, k) {
      if (((f = +f), (l = l >>> 0), !k)) {
        const Be = Math.pow(2, 8 * A - 1);
        Y(this, f, l, A, Be - 1, -Be);
      }
      let D = 0,
        H = 1,
        _e = 0;
      for (this[l] = f & 255; ++D < A && (H *= 256); )
        f < 0 && _e === 0 && this[l + D - 1] !== 0 && (_e = 1),
          (this[l + D] = (((f / H) >> 0) - _e) & 255);
      return l + A;
    }),
    (c.prototype.writeIntBE = function (f, l, A, k) {
      if (((f = +f), (l = l >>> 0), !k)) {
        const Be = Math.pow(2, 8 * A - 1);
        Y(this, f, l, A, Be - 1, -Be);
      }
      let D = A - 1,
        H = 1,
        _e = 0;
      for (this[l + D] = f & 255; --D >= 0 && (H *= 256); )
        f < 0 && _e === 0 && this[l + D + 1] !== 0 && (_e = 1),
          (this[l + D] = (((f / H) >> 0) - _e) & 255);
      return l + A;
    }),
    (c.prototype.writeInt8 = function (f, l, A) {
      return (
        (f = +f),
        (l = l >>> 0),
        A || Y(this, f, l, 1, 127, -128),
        f < 0 && (f = 255 + f + 1),
        (this[l] = f & 255),
        l + 1
      );
    }),
    (c.prototype.writeInt16LE = function (f, l, A) {
      return (
        (f = +f),
        (l = l >>> 0),
        A || Y(this, f, l, 2, 32767, -32768),
        (this[l] = f & 255),
        (this[l + 1] = f >>> 8),
        l + 2
      );
    }),
    (c.prototype.writeInt16BE = function (f, l, A) {
      return (
        (f = +f),
        (l = l >>> 0),
        A || Y(this, f, l, 2, 32767, -32768),
        (this[l] = f >>> 8),
        (this[l + 1] = f & 255),
        l + 2
      );
    }),
    (c.prototype.writeInt32LE = function (f, l, A) {
      return (
        (f = +f),
        (l = l >>> 0),
        A || Y(this, f, l, 4, 2147483647, -2147483648),
        (this[l] = f & 255),
        (this[l + 1] = f >>> 8),
        (this[l + 2] = f >>> 16),
        (this[l + 3] = f >>> 24),
        l + 4
      );
    }),
    (c.prototype.writeInt32BE = function (f, l, A) {
      return (
        (f = +f),
        (l = l >>> 0),
        A || Y(this, f, l, 4, 2147483647, -2147483648),
        f < 0 && (f = 4294967295 + f + 1),
        (this[l] = f >>> 24),
        (this[l + 1] = f >>> 16),
        (this[l + 2] = f >>> 8),
        (this[l + 3] = f & 255),
        l + 4
      );
    }),
    (c.prototype.writeBigInt64LE = de(function (f, l = 0) {
      return le(
        this,
        f,
        l,
        -BigInt("0x8000000000000000"),
        BigInt("0x7fffffffffffffff"),
      );
    })),
    (c.prototype.writeBigInt64BE = de(function (f, l = 0) {
      return _(
        this,
        f,
        l,
        -BigInt("0x8000000000000000"),
        BigInt("0x7fffffffffffffff"),
      );
    }));
  function oe(y, f, l, A, k, D) {
    if (l + A > y.length) throw new RangeError("Index out of range");
    if (l < 0) throw new RangeError("Index out of range");
  }
  function fe(y, f, l, A, k) {
    return (
      (f = +f),
      (l = l >>> 0),
      k || oe(y, f, l, 4),
      r.write(y, f, l, A, 23, 4),
      l + 4
    );
  }
  (c.prototype.writeFloatLE = function (f, l, A) {
    return fe(this, f, l, !0, A);
  }),
    (c.prototype.writeFloatBE = function (f, l, A) {
      return fe(this, f, l, !1, A);
    });
  function we(y, f, l, A, k) {
    return (
      (f = +f),
      (l = l >>> 0),
      k || oe(y, f, l, 8),
      r.write(y, f, l, A, 52, 8),
      l + 8
    );
  }
  (c.prototype.writeDoubleLE = function (f, l, A) {
    return we(this, f, l, !0, A);
  }),
    (c.prototype.writeDoubleBE = function (f, l, A) {
      return we(this, f, l, !1, A);
    }),
    (c.prototype.copy = function (f, l, A, k) {
      if (!c.isBuffer(f)) throw new TypeError("argument should be a Buffer");
      if (
        (A || (A = 0),
        !k && k !== 0 && (k = this.length),
        l >= f.length && (l = f.length),
        l || (l = 0),
        k > 0 && k < A && (k = A),
        k === A || f.length === 0 || this.length === 0)
      )
        return 0;
      if (l < 0) throw new RangeError("targetStart out of bounds");
      if (A < 0 || A >= this.length) throw new RangeError("Index out of range");
      if (k < 0) throw new RangeError("sourceEnd out of bounds");
      k > this.length && (k = this.length),
        f.length - l < k - A && (k = f.length - l + A);
      const D = k - A;
      return (
        this === f && typeof Uint8Array.prototype.copyWithin == "function"
          ? this.copyWithin(l, A, k)
          : Uint8Array.prototype.set.call(f, this.subarray(A, k), l),
        D
      );
    }),
    (c.prototype.fill = function (f, l, A, k) {
      if (typeof f == "string") {
        if (
          (typeof l == "string"
            ? ((k = l), (l = 0), (A = this.length))
            : typeof A == "string" && ((k = A), (A = this.length)),
          k !== void 0 && typeof k != "string")
        )
          throw new TypeError("encoding must be a string");
        if (typeof k == "string" && !c.isEncoding(k))
          throw new TypeError("Unknown encoding: " + k);
        if (f.length === 1) {
          const H = f.charCodeAt(0);
          ((k === "utf8" && H < 128) || k === "latin1") && (f = H);
        }
      } else
        typeof f == "number"
          ? (f = f & 255)
          : typeof f == "boolean" && (f = Number(f));
      if (l < 0 || this.length < l || this.length < A)
        throw new RangeError("Out of range index");
      if (A <= l) return this;
      (l = l >>> 0), (A = A === void 0 ? this.length : A >>> 0), f || (f = 0);
      let D;
      if (typeof f == "number") for (D = l; D < A; ++D) this[D] = f;
      else {
        const H = c.isBuffer(f) ? f : c.from(f, k),
          _e = H.length;
        if (_e === 0)
          throw new TypeError(
            'The value "' + f + '" is invalid for argument "value"',
          );
        for (D = 0; D < A - l; ++D) this[D + l] = H[D % _e];
      }
      return this;
    });
  const ie = {};
  function se(y, f, l) {
    ie[y] = class extends l {
      constructor() {
        super(),
          Object.defineProperty(this, "message", {
            value: f.apply(this, arguments),
            writable: !0,
            configurable: !0,
          }),
          (this.name = `${this.name} [${y}]`),
          this.stack,
          delete this.name;
      }
      get code() {
        return y;
      }
      set code(k) {
        Object.defineProperty(this, "code", {
          configurable: !0,
          enumerable: !0,
          value: k,
          writable: !0,
        });
      }
      toString() {
        return `${this.name} [${y}]: ${this.message}`;
      }
    };
  }
  se(
    "ERR_BUFFER_OUT_OF_BOUNDS",
    function (y) {
      return y
        ? `${y} is outside of buffer bounds`
        : "Attempt to access memory outside buffer bounds";
    },
    RangeError,
  ),
    se(
      "ERR_INVALID_ARG_TYPE",
      function (y, f) {
        return `The "${y}" argument must be of type number. Received type ${typeof f}`;
      },
      TypeError,
    ),
    se(
      "ERR_OUT_OF_RANGE",
      function (y, f, l) {
        let A = `The value of "${y}" is out of range.`,
          k = l;
        return (
          Number.isInteger(l) && Math.abs(l) > 2 ** 32
            ? (k = m(String(l)))
            : typeof l == "bigint" &&
              ((k = String(l)),
              (l > BigInt(2) ** BigInt(32) || l < -(BigInt(2) ** BigInt(32))) &&
                (k = m(k)),
              (k += "n")),
          (A += ` It must be ${f}. Received ${k}`),
          A
        );
      },
      RangeError,
    );
  function m(y) {
    let f = "",
      l = y.length;
    const A = y[0] === "-" ? 1 : 0;
    for (; l >= A + 4; l -= 3) f = `_${y.slice(l - 3, l)}${f}`;
    return `${y.slice(0, l)}${f}`;
  }
  function s(y, f, l) {
    E(f, "offset"),
      (y[f] === void 0 || y[f + l] === void 0) && T(f, y.length - (l + 1));
  }
  function h(y, f, l, A, k, D) {
    if (y > l || y < f) {
      const H = typeof f == "bigint" ? "n" : "";
      let _e;
      throw (
        (f === 0 || f === BigInt(0)
          ? (_e = `>= 0${H} and < 2${H} ** ${(D + 1) * 8}${H}`)
          : (_e = `>= -(2${H} ** ${(D + 1) * 8 - 1}${H}) and < 2 ** ${(D + 1) * 8 - 1}${H}`),
        new ie.ERR_OUT_OF_RANGE("value", _e, y))
      );
    }
    s(A, k, D);
  }
  function E(y, f) {
    if (typeof y != "number") throw new ie.ERR_INVALID_ARG_TYPE(f, "number", y);
  }
  function T(y, f, l) {
    throw Math.floor(y) !== y
      ? (E(y, l), new ie.ERR_OUT_OF_RANGE("offset", "an integer", y))
      : f < 0
        ? new ie.ERR_BUFFER_OUT_OF_BOUNDS()
        : new ie.ERR_OUT_OF_RANGE("offset", `>= 0 and <= ${f}`, y);
  }
  const U = /[^+/0-9A-Za-z-_]/g;
  function p(y) {
    if (((y = y.split("=")[0]), (y = y.trim().replace(U, "")), y.length < 2))
      return "";
    for (; y.length % 4 !== 0; ) y = y + "=";
    return y;
  }
  function o(y, f) {
    f = f || 1 / 0;
    let l;
    const A = y.length;
    let k = null;
    const D = [];
    for (let H = 0; H < A; ++H) {
      if (((l = y.charCodeAt(H)), l > 55295 && l < 57344)) {
        if (!k) {
          if (l > 56319) {
            (f -= 3) > -1 && D.push(239, 191, 189);
            continue;
          } else if (H + 1 === A) {
            (f -= 3) > -1 && D.push(239, 191, 189);
            continue;
          }
          k = l;
          continue;
        }
        if (l < 56320) {
          (f -= 3) > -1 && D.push(239, 191, 189), (k = l);
          continue;
        }
        l = (((k - 55296) << 10) | (l - 56320)) + 65536;
      } else k && (f -= 3) > -1 && D.push(239, 191, 189);
      if (((k = null), l < 128)) {
        if ((f -= 1) < 0) break;
        D.push(l);
      } else if (l < 2048) {
        if ((f -= 2) < 0) break;
        D.push((l >> 6) | 192, (l & 63) | 128);
      } else if (l < 65536) {
        if ((f -= 3) < 0) break;
        D.push((l >> 12) | 224, ((l >> 6) & 63) | 128, (l & 63) | 128);
      } else if (l < 1114112) {
        if ((f -= 4) < 0) break;
        D.push(
          (l >> 18) | 240,
          ((l >> 12) & 63) | 128,
          ((l >> 6) & 63) | 128,
          (l & 63) | 128,
        );
      } else throw new Error("Invalid code point");
    }
    return D;
  }
  function u(y) {
    const f = [];
    for (let l = 0; l < y.length; ++l) f.push(y.charCodeAt(l) & 255);
    return f;
  }
  function g(y, f) {
    let l, A, k;
    const D = [];
    for (let H = 0; H < y.length && !((f -= 2) < 0); ++H)
      (l = y.charCodeAt(H)), (A = l >> 8), (k = l % 256), D.push(k), D.push(A);
    return D;
  }
  function v(y) {
    return t.toByteArray(p(y));
  }
  function O(y, f, l, A) {
    let k;
    for (k = 0; k < A && !(k + l >= f.length || k >= y.length); ++k)
      f[k + l] = y[k];
    return k;
  }
  function j(y, f) {
    return (
      y instanceof f ||
      (y != null &&
        y.constructor != null &&
        y.constructor.name != null &&
        y.constructor.name === f.name)
    );
  }
  function Z(y) {
    return y !== y;
  }
  const ce = (function () {
    const y = "0123456789abcdef",
      f = new Array(256);
    for (let l = 0; l < 16; ++l) {
      const A = l * 16;
      for (let k = 0; k < 16; ++k) f[A + k] = y[l] + y[k];
    }
    return f;
  })();
  function de(y) {
    return typeof BigInt > "u" ? me : y;
  }
  function me() {
    throw new Error("BigInt not supported");
  }
})(Ha);
function zs(e) {
  const t = Pu(e),
    r = new ArrayBuffer(t.length),
    n = new DataView(r);
  for (let i = 0; i < r.byteLength; i++) n.setUint8(i, t.charCodeAt(i));
  return r;
}
const Fu = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function Pu(e) {
  e.length % 4 === 0 && (e = e.replace(/==?$/, ""));
  let t = "",
    r = 0,
    n = 0;
  for (let i = 0; i < e.length; i++)
    (r <<= 6),
      (r |= Fu.indexOf(e[i])),
      (n += 6),
      n === 24 &&
        ((t += String.fromCharCode((r & 16711680) >> 16)),
        (t += String.fromCharCode((r & 65280) >> 8)),
        (t += String.fromCharCode(r & 255)),
        (r = n = 0));
  return (
    n === 12
      ? ((r >>= 4), (t += String.fromCharCode(r)))
      : n === 18 &&
        ((r >>= 2),
        (t += String.fromCharCode((r & 65280) >> 8)),
        (t += String.fromCharCode(r & 255))),
    t
  );
}
const ku = -1,
  Cu = -2,
  $u = -3,
  Mu = -4,
  Vu = -5,
  qu = -6;
function Rh(e, t) {
  if (typeof e == "number") return i(e, !0);
  if (!Array.isArray(e) || e.length === 0) throw new Error("Invalid input");
  const r = e,
    n = Array(r.length);
  function i(a, d = !1) {
    if (a === ku) return;
    if (a === $u) return NaN;
    if (a === Mu) return 1 / 0;
    if (a === Vu) return -1 / 0;
    if (a === qu) return -0;
    if (d) throw new Error("Invalid input");
    if (a in n) return n[a];
    const c = r[a];
    if (!c || typeof c != "object") n[a] = c;
    else if (Array.isArray(c))
      if (typeof c[0] == "string") {
        const w = c[0],
          x = t?.[w];
        if (x) return (n[a] = x(i(c[1])));
        switch (w) {
          case "Date":
            n[a] = new Date(c[1]);
            break;
          case "Set":
            const B = new Set();
            n[a] = B;
            for (let S = 1; S < c.length; S += 1) B.add(i(c[S]));
            break;
          case "Map":
            const N = new Map();
            n[a] = N;
            for (let S = 1; S < c.length; S += 2) N.set(i(c[S]), i(c[S + 1]));
            break;
          case "RegExp":
            n[a] = new RegExp(c[1], c[2]);
            break;
          case "Object":
            n[a] = Object(c[1]);
            break;
          case "BigInt":
            n[a] = BigInt(c[1]);
            break;
          case "null":
            const I = Object.create(null);
            n[a] = I;
            for (let S = 1; S < c.length; S += 2) I[c[S]] = i(c[S + 1]);
            break;
          case "Int8Array":
          case "Uint8Array":
          case "Uint8ClampedArray":
          case "Int16Array":
          case "Uint16Array":
          case "Int32Array":
          case "Uint32Array":
          case "Float32Array":
          case "Float64Array":
          case "BigInt64Array":
          case "BigUint64Array": {
            const S = globalThis[w],
              b = c[1],
              C = zs(b),
              V = new S(C);
            n[a] = V;
            break;
          }
          case "ArrayBuffer": {
            const S = c[1],
              b = zs(S);
            n[a] = b;
            break;
          }
          default:
            throw new Error(`Unknown type ${w}`);
        }
      } else {
        const w = new Array(c.length);
        n[a] = w;
        for (let x = 0; x < c.length; x += 1) {
          const B = c[x];
          B !== Cu && (w[x] = i(B));
        }
      }
    else {
      const w = {};
      n[a] = w;
      for (const x in c) {
        const B = c[x];
        w[x] = i(B);
      }
    }
    return n[a];
  }
  return i(0);
}
var is;
(function (e) {
  (e[(e.SysFatal = 1)] = "SysFatal"),
    (e[(e.SysTransient = 2)] = "SysTransient"),
    (e[(e.DestinationInvalid = 3)] = "DestinationInvalid"),
    (e[(e.CanisterReject = 4)] = "CanisterReject"),
    (e[(e.CanisterError = 5)] = "CanisterError");
})(is || (is = {}));
const si = "abcdefghijklmnopqrstuvwxyz234567",
  qr = Object.create(null);
for (let e = 0; e < si.length; e++) qr[si[e]] = e;
qr[0] = qr.o;
qr[1] = qr.i;
function Gu(e) {
  let t = 0,
    r = 0,
    n = "";
  function i(a) {
    return (
      t < 0 ? (r |= a >> -t) : (r = (a << t) & 248),
      t > 3 ? ((t -= 8), 1) : (t < 4 && ((n += si[r >> 3]), (t += 5)), 0)
    );
  }
  for (let a = 0; a < e.length; ) a += i(e[a]);
  return n + (t < 0 ? si[r >> 3] : "");
}
function ju(e) {
  let t = 0,
    r = 0;
  const n = new Uint8Array(((e.length * 4) / 3) | 0);
  let i = 0;
  function a(d) {
    let c = qr[d.toLowerCase()];
    if (c === void 0)
      throw new Error(`Invalid character: ${JSON.stringify(d)}`);
    (c <<= 3),
      (r |= c >>> t),
      (t += 5),
      t >= 8 &&
        ((n[i++] = r), (t -= 8), t > 0 ? (r = (c << (5 - t)) & 255) : (r = 0));
  }
  for (const d of e) a(d);
  return n.slice(0, i);
}
const Lu = new Uint32Array([
  0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685,
  2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995,
  2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648,
  2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990,
  1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755,
  2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145,
  1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206,
  2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980,
  1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705,
  3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527,
  1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772,
  4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290,
  251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719,
  3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925,
  453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202,
  4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960,
  984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733,
  3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467,
  855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048,
  3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054,
  702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443,
  3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945,
  2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430,
  2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580,
  2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225,
  1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143,
  2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732,
  1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850,
  2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135,
  1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109,
  3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954,
  1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920,
  3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877,
  83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603,
  3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992,
  534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934,
  4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795,
  376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105,
  3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270,
  936918e3, 2847714899, 3736837829, 1202900863, 817233897, 3183342108,
  3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449,
  601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471,
  3272380065, 1510334235, 755167117,
]);
function Hu(e) {
  const t = new Uint8Array(e);
  let r = -1;
  for (let n = 0; n < t.length; n++) {
    const a = (t[n] ^ r) & 255;
    r = Lu[a] ^ (r >>> 8);
  }
  return (r ^ -1) >>> 0;
}
function Du(e) {
  return (
    e instanceof Uint8Array ||
    (e != null && typeof e == "object" && e.constructor.name === "Uint8Array")
  );
}
function Ka(e, ...t) {
  if (!Du(e)) throw new Error("Uint8Array expected");
  if (t.length > 0 && !t.includes(e.length))
    throw new Error(
      `Uint8Array expected of length ${t}, not of length=${e.length}`,
    );
}
function Ws(e, t = !0) {
  if (e.destroyed) throw new Error("Hash instance has been destroyed");
  if (t && e.finished) throw new Error("Hash#digest() has already been called");
}
function Ku(e, t) {
  Ka(e);
  const r = t.outputLen;
  if (e.length < r)
    throw new Error(
      `digestInto() expects output buffer of length at least ${r}`,
    );
}
const Tr =
  typeof globalThis == "object" && "crypto" in globalThis
    ? globalThis.crypto
    : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const Ci =
    (e) => new DataView(e.buffer, e.byteOffset, e.byteLength),
  Nt = (e, t) => (e << (32 - t)) | (e >>> t);
new Uint8Array(new Uint32Array([287454020]).buffer)[0];
function zu(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function za(e) {
  return typeof e == "string" && (e = zu(e)), Ka(e), e;
}
class Wu {
  clone() {
    return this._cloneInto();
  }
}
function As(e) {
  const t = (n) => e().update(za(n)).digest(),
    r = e();
  return (
    (t.outputLen = r.outputLen),
    (t.blockLen = r.blockLen),
    (t.create = () => e()),
    t
  );
}
function Wa(e = 32) {
  if (Tr && typeof Tr.getRandomValues == "function")
    return Tr.getRandomValues(new Uint8Array(e));
  if (Tr && typeof Tr.randomBytes == "function") return Tr.randomBytes(e);
  throw new Error("crypto.getRandomValues must be defined");
}
function Yu(e, t, r, n) {
  if (typeof e.setBigUint64 == "function") return e.setBigUint64(t, r, n);
  const i = BigInt(32),
    a = BigInt(4294967295),
    d = Number((r >> i) & a),
    c = Number(r & a),
    w = n ? 4 : 0,
    x = n ? 0 : 4;
  e.setUint32(t + w, d, n), e.setUint32(t + x, c, n);
}
const Zu = (e, t, r) => (e & t) ^ (~e & r),
  Xu = (e, t, r) => (e & t) ^ (e & r) ^ (t & r);
class Ya extends Wu {
  constructor(t, r, n, i) {
    super(),
      (this.blockLen = t),
      (this.outputLen = r),
      (this.padOffset = n),
      (this.isLE = i),
      (this.finished = !1),
      (this.length = 0),
      (this.pos = 0),
      (this.destroyed = !1),
      (this.buffer = new Uint8Array(t)),
      (this.view = Ci(this.buffer));
  }
  update(t) {
    Ws(this);
    const { view: r, buffer: n, blockLen: i } = this;
    t = za(t);
    const a = t.length;
    for (let d = 0; d < a; ) {
      const c = Math.min(i - this.pos, a - d);
      if (c === i) {
        const w = Ci(t);
        for (; i <= a - d; d += i) this.process(w, d);
        continue;
      }
      n.set(t.subarray(d, d + c), this.pos),
        (this.pos += c),
        (d += c),
        this.pos === i && (this.process(r, 0), (this.pos = 0));
    }
    return (this.length += t.length), this.roundClean(), this;
  }
  digestInto(t) {
    Ws(this), Ku(t, this), (this.finished = !0);
    const { buffer: r, view: n, blockLen: i, isLE: a } = this;
    let { pos: d } = this;
    (r[d++] = 128),
      this.buffer.subarray(d).fill(0),
      this.padOffset > i - d && (this.process(n, 0), (d = 0));
    for (let N = d; N < i; N++) r[N] = 0;
    Yu(n, i - 8, BigInt(this.length * 8), a), this.process(n, 0);
    const c = Ci(t),
      w = this.outputLen;
    if (w % 4) throw new Error("_sha2: outputLen should be aligned to 32bit");
    const x = w / 4,
      B = this.get();
    if (x > B.length) throw new Error("_sha2: outputLen bigger than state");
    for (let N = 0; N < x; N++) c.setUint32(4 * N, B[N], a);
  }
  digest() {
    const { buffer: t, outputLen: r } = this;
    this.digestInto(t);
    const n = t.slice(0, r);
    return this.destroy(), n;
  }
  _cloneInto(t) {
    t || (t = new this.constructor()), t.set(...this.get());
    const {
      blockLen: r,
      buffer: n,
      length: i,
      finished: a,
      destroyed: d,
      pos: c,
    } = this;
    return (
      (t.length = i),
      (t.pos = c),
      (t.finished = a),
      (t.destroyed = d),
      i % r && t.buffer.set(n),
      t
    );
  }
}
const Ju = new Uint32Array([
    1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993,
    2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987,
    1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774,
    264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986,
    2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711,
    113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291,
    1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411,
    3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344,
    430227734, 506948616, 659060556, 883997877, 958139571, 1322822218,
    1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424,
    2428436474, 2756734187, 3204031479, 3329325298,
  ]),
  Dt = new Uint32Array([
    1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924,
    528734635, 1541459225,
  ]),
  Kt = new Uint32Array(64);
class Za extends Ya {
  constructor() {
    super(64, 32, 8, !1),
      (this.A = Dt[0] | 0),
      (this.B = Dt[1] | 0),
      (this.C = Dt[2] | 0),
      (this.D = Dt[3] | 0),
      (this.E = Dt[4] | 0),
      (this.F = Dt[5] | 0),
      (this.G = Dt[6] | 0),
      (this.H = Dt[7] | 0);
  }
  get() {
    const { A: t, B: r, C: n, D: i, E: a, F: d, G: c, H: w } = this;
    return [t, r, n, i, a, d, c, w];
  }
  set(t, r, n, i, a, d, c, w) {
    (this.A = t | 0),
      (this.B = r | 0),
      (this.C = n | 0),
      (this.D = i | 0),
      (this.E = a | 0),
      (this.F = d | 0),
      (this.G = c | 0),
      (this.H = w | 0);
  }
  process(t, r) {
    for (let N = 0; N < 16; N++, r += 4) Kt[N] = t.getUint32(r, !1);
    for (let N = 16; N < 64; N++) {
      const I = Kt[N - 15],
        S = Kt[N - 2],
        b = Nt(I, 7) ^ Nt(I, 18) ^ (I >>> 3),
        C = Nt(S, 17) ^ Nt(S, 19) ^ (S >>> 10);
      Kt[N] = (C + Kt[N - 7] + b + Kt[N - 16]) | 0;
    }
    let { A: n, B: i, C: a, D: d, E: c, F: w, G: x, H: B } = this;
    for (let N = 0; N < 64; N++) {
      const I = Nt(c, 6) ^ Nt(c, 11) ^ Nt(c, 25),
        S = (B + I + Zu(c, w, x) + Ju[N] + Kt[N]) | 0,
        C = ((Nt(n, 2) ^ Nt(n, 13) ^ Nt(n, 22)) + Xu(n, i, a)) | 0;
      (B = x),
        (x = w),
        (w = c),
        (c = (d + S) | 0),
        (d = a),
        (a = i),
        (i = n),
        (n = (S + C) | 0);
    }
    (n = (n + this.A) | 0),
      (i = (i + this.B) | 0),
      (a = (a + this.C) | 0),
      (d = (d + this.D) | 0),
      (c = (c + this.E) | 0),
      (w = (w + this.F) | 0),
      (x = (x + this.G) | 0),
      (B = (B + this.H) | 0),
      this.set(n, i, a, d, c, w, x, B);
  }
  roundClean() {
    Kt.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
class Qu extends Za {
  constructor() {
    super(),
      (this.A = -1056596264),
      (this.B = 914150663),
      (this.C = 812702999),
      (this.D = -150054599),
      (this.E = -4191439),
      (this.F = 1750603025),
      (this.G = 1694076839),
      (this.H = -1090891868),
      (this.outputLen = 28);
  }
}
const Ns = As(() => new Za()),
  ef = As(() => new Qu());
function tf(e) {
  return ef.create().update(new Uint8Array(e)).digest();
}
const Yr = "__principal__",
  rf = 2,
  Ys = 4,
  nf = "aaaaa-aa",
  sf = (e) => {
    var t;
    return new Uint8Array(
      ((t = e.match(/.{1,2}/g)) !== null && t !== void 0 ? t : []).map((r) =>
        parseInt(r, 16),
      ),
    );
  },
  af = (e) => e.reduce((t, r) => t + r.toString(16).padStart(2, "0"), "");
let Te = class Pn {
  constructor(t) {
    (this._arr = t), (this._isPrincipal = !0);
  }
  static anonymous() {
    return new this(new Uint8Array([Ys]));
  }
  static managementCanister() {
    return this.fromHex(nf);
  }
  static selfAuthenticating(t) {
    const r = tf(t);
    return new this(new Uint8Array([...r, rf]));
  }
  static from(t) {
    if (typeof t == "string") return Pn.fromText(t);
    if (Object.getPrototypeOf(t) === Uint8Array.prototype) return new Pn(t);
    if (typeof t == "object" && t !== null && t._isPrincipal === !0)
      return new Pn(t._arr);
    throw new Error(`Impossible to convert ${JSON.stringify(t)} to Principal.`);
  }
  static fromHex(t) {
    return new this(sf(t));
  }
  static fromText(t) {
    let r = t;
    if (t.includes(Yr)) {
      const d = JSON.parse(t);
      Yr in d && (r = d[Yr]);
    }
    const n = r.toLowerCase().replace(/-/g, "");
    let i = ju(n);
    i = i.slice(4, i.length);
    const a = new this(i);
    if (a.toText() !== r)
      throw new Error(
        `Principal "${a.toText()}" does not have a valid checksum (original value "${r}" may not be a valid Principal ID).`,
      );
    return a;
  }
  static fromUint8Array(t) {
    return new this(t);
  }
  isAnonymous() {
    return this._arr.byteLength === 1 && this._arr[0] === Ys;
  }
  toUint8Array() {
    return this._arr;
  }
  toHex() {
    return af(this._arr).toUpperCase();
  }
  toText() {
    const t = new ArrayBuffer(4);
    new DataView(t).setUint32(0, Hu(this._arr));
    const n = new Uint8Array(t),
      i = Uint8Array.from(this._arr),
      a = new Uint8Array([...n, ...i]),
      c = Gu(a).match(/.{1,5}/g);
    if (!c) throw new Error();
    return c.join("-");
  }
  toString() {
    return this.toText();
  }
  toJSON() {
    return { [Yr]: this.toText() };
  }
  compareTo(t) {
    for (let r = 0; r < Math.min(this._arr.length, t._arr.length); r++) {
      if (this._arr[r] < t._arr[r]) return "lt";
      if (this._arr[r] > t._arr[r]) return "gt";
    }
    return this._arr.length < t._arr.length
      ? "lt"
      : this._arr.length > t._arr.length
        ? "gt"
        : "eq";
  }
  ltEq(t) {
    const r = this.compareTo(t);
    return r == "lt" || r == "eq";
  }
  gtEq(t) {
    const r = this.compareTo(t);
    return r == "gt" || r == "eq";
  }
};
const of = Object.freeze(
  Object.defineProperty(
    { __proto__: null, JSON_KEY_PRINCIPAL: Yr, Principal: Te },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
function Bt(...e) {
  const t = new Uint8Array(e.reduce((n, i) => n + i.byteLength, 0));
  let r = 0;
  for (const n of e) t.set(new Uint8Array(n), r), (r += n.byteLength);
  return t.buffer;
}
function et(e) {
  return [...new Uint8Array(e)]
    .map((t) => t.toString(16).padStart(2, "0"))
    .join("");
}
const cf = new RegExp(/^[0-9a-fA-F]+$/);
function Lt(e) {
  if (!cf.test(e)) throw new Error("Invalid hexadecimal string.");
  const t = [...e]
    .reduce((r, n, i) => ((r[(i / 2) | 0] = (r[(i / 2) | 0] || "") + n), r), [])
    .map((r) => Number.parseInt(r, 16));
  return new Uint8Array(t).buffer;
}
function Xa(e, t) {
  if (e.byteLength !== t.byteLength) return e.byteLength - t.byteLength;
  const r = new Uint8Array(e),
    n = new Uint8Array(t);
  for (let i = 0; i < r.length; i++) if (r[i] !== n[i]) return r[i] - n[i];
  return 0;
}
function Ei(e, t) {
  return Xa(e, t) === 0;
}
function nn(e) {
  return new DataView(e.buffer, e.byteOffset, e.byteLength).buffer;
}
function Is(e) {
  return e instanceof Uint8Array
    ? nn(e)
    : e instanceof ArrayBuffer
      ? e
      : Array.isArray(e)
        ? nn(new Uint8Array(e))
        : "buffer" in e
          ? Is(e.buffer)
          : nn(new Uint8Array(e));
}
class De extends Error {
  constructor(t) {
    super(t),
      (this.message = t),
      (this.name = "AgentError"),
      (this.__proto__ = De.prototype),
      Object.setPrototypeOf(this, De.prototype);
  }
}
function Re(...e) {
  const t = new Uint8Array(e.reduce((n, i) => n + i.byteLength, 0));
  let r = 0;
  for (const n of e) t.set(new Uint8Array(n), r), (r += n.byteLength);
  return t;
}
let Hr = class {
  constructor(t, r = t?.byteLength || 0) {
    (this._buffer = ai(t || new ArrayBuffer(0))),
      (this._view = new Uint8Array(this._buffer, 0, r));
  }
  get buffer() {
    return ai(this._view.slice());
  }
  get byteLength() {
    return this._view.byteLength;
  }
  read(t) {
    const r = this._view.subarray(0, t);
    return (this._view = this._view.subarray(t)), r.slice().buffer;
  }
  readUint8() {
    const t = this._view[0];
    return (this._view = this._view.subarray(1)), t;
  }
  write(t) {
    const r = new Uint8Array(t),
      n = this._view.byteLength;
    this._view.byteOffset + this._view.byteLength + r.byteLength >=
    this._buffer.byteLength
      ? this.alloc(r.byteLength)
      : (this._view = new Uint8Array(
          this._buffer,
          this._view.byteOffset,
          this._view.byteLength + r.byteLength,
        )),
      this._view.set(r, n);
  }
  get end() {
    return this._view.byteLength === 0;
  }
  alloc(t) {
    const r = new ArrayBuffer(((this._buffer.byteLength + t) * 1.2) | 0),
      n = new Uint8Array(r, 0, this._view.byteLength + t);
    n.set(this._view), (this._buffer = r), (this._view = n);
  }
};
function $i(e) {
  return new DataView(e.buffer, e.byteOffset, e.byteLength).buffer;
}
function ai(e) {
  return e instanceof Uint8Array
    ? $i(e)
    : e instanceof ArrayBuffer
      ? e
      : Array.isArray(e)
        ? $i(new Uint8Array(e))
        : "buffer" in e
          ? ai(e.buffer)
          : $i(new Uint8Array(e));
}
function uf(e) {
  const r = new TextEncoder().encode(e);
  let n = 0;
  for (const i of r) n = (n * 223 + i) % 2 ** 32;
  return n;
}
function kt(e) {
  if (/^_\d+_$/.test(e) || /^_0x[0-9a-fA-F]+_$/.test(e)) {
    const t = +e.slice(1, -1);
    if (Number.isSafeInteger(t) && t >= 0 && t < 2 ** 32) return t;
  }
  return uf(e);
}
function Ja() {
  throw new Error("unexpected end of buffer");
}
function mr(e, t) {
  return e.byteLength < t && Ja(), e.read(t);
}
function br(e) {
  const t = e.readUint8();
  return t === void 0 && Ja(), t;
}
function Ve(e) {
  if ((typeof e == "number" && (e = BigInt(e)), e < BigInt(0)))
    throw new Error("Cannot leb encode negative values.");
  const t = (e === BigInt(0) ? 0 : Math.ceil(Math.log2(Number(e)))) + 1,
    r = new Hr(new ArrayBuffer(t), 0);
  for (;;) {
    const n = Number(e & BigInt(127));
    if (((e /= BigInt(128)), e === BigInt(0))) {
      r.write(new Uint8Array([n]));
      break;
    } else r.write(new Uint8Array([n | 128]));
  }
  return r.buffer;
}
function Ye(e) {
  let t = BigInt(1),
    r = BigInt(0),
    n;
  do (n = br(e)), (r += BigInt(n & 127).valueOf() * t), (t *= BigInt(128));
  while (n >= 128);
  return r;
}
function Ke(e) {
  typeof e == "number" && (e = BigInt(e));
  const t = e < BigInt(0);
  t && (e = -e - BigInt(1));
  const r = (e === BigInt(0) ? 0 : Math.ceil(Math.log2(Number(e)))) + 1,
    n = new Hr(new ArrayBuffer(r), 0);
  for (;;) {
    const a = i(e);
    if (
      ((e /= BigInt(128)),
      (t && e === BigInt(0) && a & 64) || (!t && e === BigInt(0) && !(a & 64)))
    ) {
      n.write(new Uint8Array([a]));
      break;
    } else n.write(new Uint8Array([a | 128]));
  }
  function i(a) {
    const d = a % BigInt(128);
    return Number(t ? BigInt(128) - d - BigInt(1) : d);
  }
  return n.buffer;
}
function Zt(e) {
  const t = new Uint8Array(e.buffer);
  let r = 0;
  for (; r < t.byteLength; r++)
    if (t[r] < 128) {
      if (!(t[r] & 64)) return Ye(e);
      break;
    }
  const n = new Uint8Array(mr(e, r + 1));
  let i = BigInt(0);
  for (let a = n.byteLength - 1; a >= 0; a--)
    i = i * BigInt(128) + BigInt(128 - (n[a] & 127) - 1);
  return -i - BigInt(1);
}
function ff(e, t) {
  if (BigInt(e) < BigInt(0)) throw new Error("Cannot write negative values.");
  return Qa(e, t);
}
function Qa(e, t) {
  e = BigInt(e);
  const r = new Hr(new ArrayBuffer(Math.min(1, t)), 0);
  let n = 0,
    i = BigInt(256),
    a = BigInt(0),
    d = Number(e % i);
  for (r.write(new Uint8Array([d])); ++n < t; )
    e < 0 && a === BigInt(0) && d !== 0 && (a = BigInt(1)),
      (d = Number((e / i - a) % BigInt(256))),
      r.write(new Uint8Array([d])),
      (i *= BigInt(256));
  return r.buffer;
}
function eo(e, t) {
  let r = BigInt(br(e)),
    n = BigInt(1),
    i = 0;
  for (; ++i < t; ) {
    n *= BigInt(256);
    const a = BigInt(br(e));
    r = r + n * a;
  }
  return r;
}
function lf(e, t) {
  let r = eo(e, t);
  const n = BigInt(2) ** (BigInt(8) * BigInt(t - 1) + BigInt(7));
  return r >= n && (r -= n * BigInt(2)), r;
}
function ss(e) {
  const t = BigInt(e);
  if (e < 0) throw new RangeError("Input must be non-negative");
  return BigInt(1) << t;
}
const kn = "DIDL",
  Zs = 400;
function un(e, t, r) {
  return e.map((n, i) => r(n, t[i]));
}
class df {
  constructor() {
    (this._typs = []), (this._idx = new Map());
  }
  has(t) {
    return this._idx.has(t.name);
  }
  add(t, r) {
    const n = this._typs.length;
    this._idx.set(t.name, n), this._typs.push(r);
  }
  merge(t, r) {
    const n = this._idx.get(t.name),
      i = this._idx.get(r);
    if (n === void 0) throw new Error("Missing type index for " + t);
    if (i === void 0) throw new Error("Missing type index for " + r);
    (this._typs[n] = this._typs[i]),
      this._typs.splice(i, 1),
      this._idx.delete(r);
  }
  encode() {
    const t = Ve(this._typs.length),
      r = Re(...this._typs);
    return Re(t, r);
  }
  indexOf(t) {
    if (!this._idx.has(t)) throw new Error("Missing type index for " + t);
    return Ke(this._idx.get(t) || 0);
  }
}
class hf {
  visitType(t, r) {
    throw new Error("Not implemented");
  }
  visitPrimitive(t, r) {
    return this.visitType(t, r);
  }
  visitEmpty(t, r) {
    return this.visitPrimitive(t, r);
  }
  visitBool(t, r) {
    return this.visitPrimitive(t, r);
  }
  visitNull(t, r) {
    return this.visitPrimitive(t, r);
  }
  visitReserved(t, r) {
    return this.visitPrimitive(t, r);
  }
  visitText(t, r) {
    return this.visitPrimitive(t, r);
  }
  visitNumber(t, r) {
    return this.visitPrimitive(t, r);
  }
  visitInt(t, r) {
    return this.visitNumber(t, r);
  }
  visitNat(t, r) {
    return this.visitNumber(t, r);
  }
  visitFloat(t, r) {
    return this.visitPrimitive(t, r);
  }
  visitFixedInt(t, r) {
    return this.visitNumber(t, r);
  }
  visitFixedNat(t, r) {
    return this.visitNumber(t, r);
  }
  visitPrincipal(t, r) {
    return this.visitPrimitive(t, r);
  }
  visitConstruct(t, r) {
    return this.visitType(t, r);
  }
  visitVec(t, r, n) {
    return this.visitConstruct(t, n);
  }
  visitOpt(t, r, n) {
    return this.visitConstruct(t, n);
  }
  visitRecord(t, r, n) {
    return this.visitConstruct(t, n);
  }
  visitTuple(t, r, n) {
    const i = r.map((a, d) => [`_${d}_`, a]);
    return this.visitRecord(t, i, n);
  }
  visitVariant(t, r, n) {
    return this.visitConstruct(t, n);
  }
  visitRec(t, r, n) {
    return this.visitConstruct(r, n);
  }
  visitFunc(t, r) {
    return this.visitConstruct(t, r);
  }
  visitService(t, r) {
    return this.visitConstruct(t, r);
  }
}
class vi {
  display() {
    return this.name;
  }
  valueToString(t) {
    return Ge(t);
  }
  buildTypeTable(t) {
    t.has(this) || this._buildTypeTableImpl(t);
  }
}
class wt extends vi {
  checkType(t) {
    if (this.name !== t.name)
      throw new Error(
        `type mismatch: type on the wire ${t.name}, expect type ${this.name}`,
      );
    return t;
  }
  _buildTypeTableImpl(t) {}
}
class fr extends vi {
  checkType(t) {
    if (t instanceof lr) {
      const r = t.getType();
      if (typeof r > "u")
        throw new Error("type mismatch with uninitialized type");
      return r;
    }
    throw new Error(
      `type mismatch: type on the wire ${t.name}, expect type ${this.name}`,
    );
  }
  encodeType(t) {
    return t.indexOf(this.name);
  }
}
class to extends wt {
  accept(t, r) {
    return t.visitEmpty(this, r);
  }
  covariant(t) {
    throw new Error(`Invalid ${this.display()} argument: ${Ge(t)}`);
  }
  encodeValue() {
    throw new Error("Empty cannot appear as a function argument");
  }
  valueToString() {
    throw new Error("Empty cannot appear as a value");
  }
  encodeType() {
    return Ke(-17);
  }
  decodeValue() {
    throw new Error("Empty cannot appear as an output");
  }
  get name() {
    return "empty";
  }
}
class ro extends vi {
  checkType(t) {
    throw new Error("Method not implemented for unknown.");
  }
  accept(t, r) {
    throw t.visitType(this, r);
  }
  covariant(t) {
    throw new Error(`Invalid ${this.display()} argument: ${Ge(t)}`);
  }
  encodeValue() {
    throw new Error("Unknown cannot appear as a function argument");
  }
  valueToString() {
    throw new Error("Unknown cannot appear as a value");
  }
  encodeType() {
    throw new Error("Unknown cannot be serialized");
  }
  decodeValue(t, r) {
    let n = r.decodeValue(t, r);
    Object(n) !== n && (n = Object(n));
    let i;
    return (
      r instanceof lr ? (i = () => r.getType()) : (i = () => r),
      Object.defineProperty(n, "type", {
        value: i,
        writable: !0,
        enumerable: !1,
        configurable: !0,
      }),
      n
    );
  }
  _buildTypeTableImpl() {
    throw new Error("Unknown cannot be serialized");
  }
  get name() {
    return "Unknown";
  }
}
class no extends wt {
  accept(t, r) {
    return t.visitBool(this, r);
  }
  covariant(t) {
    if (typeof t == "boolean") return !0;
    throw new Error(`Invalid ${this.display()} argument: ${Ge(t)}`);
  }
  encodeValue(t) {
    return new Uint8Array([t ? 1 : 0]);
  }
  encodeType() {
    return Ke(-2);
  }
  decodeValue(t, r) {
    switch ((this.checkType(r), br(t))) {
      case 0:
        return !1;
      case 1:
        return !0;
      default:
        throw new Error("Boolean value out of range");
    }
  }
  get name() {
    return "bool";
  }
}
class io extends wt {
  accept(t, r) {
    return t.visitNull(this, r);
  }
  covariant(t) {
    if (t === null) return !0;
    throw new Error(`Invalid ${this.display()} argument: ${Ge(t)}`);
  }
  encodeValue() {
    return new ArrayBuffer(0);
  }
  encodeType() {
    return Ke(-1);
  }
  decodeValue(t, r) {
    return this.checkType(r), null;
  }
  get name() {
    return "null";
  }
}
class oi extends wt {
  accept(t, r) {
    return t.visitReserved(this, r);
  }
  covariant(t) {
    return !0;
  }
  encodeValue() {
    return new ArrayBuffer(0);
  }
  encodeType() {
    return Ke(-16);
  }
  decodeValue(t, r) {
    return r.name !== this.name && r.decodeValue(t, r), null;
  }
  get name() {
    return "reserved";
  }
}
class so extends wt {
  accept(t, r) {
    return t.visitText(this, r);
  }
  covariant(t) {
    if (typeof t == "string") return !0;
    throw new Error(`Invalid ${this.display()} argument: ${Ge(t)}`);
  }
  encodeValue(t) {
    const r = new TextEncoder().encode(t),
      n = Ve(r.byteLength);
    return Re(n, r);
  }
  encodeType() {
    return Ke(-15);
  }
  decodeValue(t, r) {
    this.checkType(r);
    const n = Ye(t),
      i = mr(t, Number(n));
    return new TextDecoder("utf8", { fatal: !0 }).decode(i);
  }
  get name() {
    return "text";
  }
  valueToString(t) {
    return '"' + t + '"';
  }
}
class ao extends wt {
  accept(t, r) {
    return t.visitInt(this, r);
  }
  covariant(t) {
    if (typeof t == "bigint" || Number.isInteger(t)) return !0;
    throw new Error(`Invalid ${this.display()} argument: ${Ge(t)}`);
  }
  encodeValue(t) {
    return Ke(t);
  }
  encodeType() {
    return Ke(-4);
  }
  decodeValue(t, r) {
    return this.checkType(r), Zt(t);
  }
  get name() {
    return "int";
  }
  valueToString(t) {
    return t.toString();
  }
}
class oo extends wt {
  accept(t, r) {
    return t.visitNat(this, r);
  }
  covariant(t) {
    if (
      (typeof t == "bigint" && t >= BigInt(0)) ||
      (Number.isInteger(t) && t >= 0)
    )
      return !0;
    throw new Error(`Invalid ${this.display()} argument: ${Ge(t)}`);
  }
  encodeValue(t) {
    return Ve(t);
  }
  encodeType() {
    return Ke(-3);
  }
  decodeValue(t, r) {
    return this.checkType(r), Ye(t);
  }
  get name() {
    return "nat";
  }
  valueToString(t) {
    return t.toString();
  }
}
class Ss extends wt {
  constructor(t) {
    if ((super(), (this._bits = t), t !== 32 && t !== 64))
      throw new Error("not a valid float type");
  }
  accept(t, r) {
    return t.visitFloat(this, r);
  }
  covariant(t) {
    if (typeof t == "number" || t instanceof Number) return !0;
    throw new Error(`Invalid ${this.display()} argument: ${Ge(t)}`);
  }
  encodeValue(t) {
    const r = new ArrayBuffer(this._bits / 8),
      n = new DataView(r);
    return (
      this._bits === 32 ? n.setFloat32(0, t, !0) : n.setFloat64(0, t, !0), r
    );
  }
  encodeType() {
    const t = this._bits === 32 ? -13 : -14;
    return Ke(t);
  }
  decodeValue(t, r) {
    this.checkType(r);
    const n = mr(t, this._bits / 8),
      i = new DataView(n);
    return this._bits === 32 ? i.getFloat32(0, !0) : i.getFloat64(0, !0);
  }
  get name() {
    return "float" + this._bits;
  }
  valueToString(t) {
    return t.toString();
  }
}
class _r extends wt {
  constructor(t) {
    super(), (this._bits = t);
  }
  accept(t, r) {
    return t.visitFixedInt(this, r);
  }
  covariant(t) {
    const r = ss(this._bits - 1) * BigInt(-1),
      n = ss(this._bits - 1) - BigInt(1);
    let i = !1;
    if (typeof t == "bigint") i = t >= r && t <= n;
    else if (Number.isInteger(t)) {
      const a = BigInt(t);
      i = a >= r && a <= n;
    } else i = !1;
    if (i) return !0;
    throw new Error(`Invalid ${this.display()} argument: ${Ge(t)}`);
  }
  encodeValue(t) {
    return Qa(t, this._bits / 8);
  }
  encodeType() {
    const t = Math.log2(this._bits) - 3;
    return Ke(-9 - t);
  }
  decodeValue(t, r) {
    this.checkType(r);
    const n = lf(t, this._bits / 8);
    return this._bits <= 32 ? Number(n) : n;
  }
  get name() {
    return `int${this._bits}`;
  }
  valueToString(t) {
    return t.toString();
  }
}
class or extends wt {
  constructor(t) {
    super(), (this._bits = t);
  }
  accept(t, r) {
    return t.visitFixedNat(this, r);
  }
  covariant(t) {
    const r = ss(this._bits);
    let n = !1;
    if (
      (typeof t == "bigint" && t >= BigInt(0)
        ? (n = t < r)
        : Number.isInteger(t) && t >= 0
          ? (n = BigInt(t) < r)
          : (n = !1),
      n)
    )
      return !0;
    throw new Error(`Invalid ${this.display()} argument: ${Ge(t)}`);
  }
  encodeValue(t) {
    return ff(t, this._bits / 8);
  }
  encodeType() {
    const t = Math.log2(this._bits) - 3;
    return Ke(-5 - t);
  }
  decodeValue(t, r) {
    this.checkType(r);
    const n = eo(t, this._bits / 8);
    return this._bits <= 32 ? Number(n) : n;
  }
  get name() {
    return `nat${this._bits}`;
  }
  valueToString(t) {
    return t.toString();
  }
}
class Ti extends fr {
  constructor(t) {
    super(),
      (this._type = t),
      (this._blobOptimization = !1),
      t instanceof or && t._bits === 8 && (this._blobOptimization = !0);
  }
  accept(t, r) {
    return t.visitVec(this, this._type, r);
  }
  covariant(t) {
    const r =
      this._type instanceof or
        ? this._type._bits
        : this._type instanceof _r
          ? this._type._bits
          : 0;
    if (
      (ArrayBuffer.isView(t) && r == t.BYTES_PER_ELEMENT * 8) ||
      (Array.isArray(t) &&
        t.every((n, i) => {
          try {
            return this._type.covariant(n);
          } catch (a) {
            throw new Error(`Invalid ${this.display()} argument: 

index ${i} -> ${a.message}`);
          }
        }))
    )
      return !0;
    throw new Error(`Invalid ${this.display()} argument: ${Ge(t)}`);
  }
  encodeValue(t) {
    const r = Ve(t.length);
    if (this._blobOptimization) return Re(r, new Uint8Array(t));
    if (ArrayBuffer.isView(t)) return Re(r, new Uint8Array(t.buffer));
    const n = new Hr(new ArrayBuffer(r.byteLength + t.length), 0);
    n.write(r);
    for (const i of t) {
      const a = this._type.encodeValue(i);
      n.write(new Uint8Array(a));
    }
    return n.buffer;
  }
  _buildTypeTableImpl(t) {
    this._type.buildTypeTable(t);
    const r = Ke(-19),
      n = this._type.encodeType(t);
    t.add(this, Re(r, n));
  }
  decodeValue(t, r) {
    const n = this.checkType(r);
    if (!(n instanceof Ti)) throw new Error("Not a vector type");
    const i = Number(Ye(t));
    if (this._type instanceof or) {
      if (this._type._bits == 8) return new Uint8Array(t.read(i));
      if (this._type._bits == 16) return new Uint16Array(t.read(i * 2));
      if (this._type._bits == 32) return new Uint32Array(t.read(i * 4));
      if (this._type._bits == 64) return new BigUint64Array(t.read(i * 8));
    }
    if (this._type instanceof _r) {
      if (this._type._bits == 8) return new Int8Array(t.read(i));
      if (this._type._bits == 16) return new Int16Array(t.read(i * 2));
      if (this._type._bits == 32) return new Int32Array(t.read(i * 4));
      if (this._type._bits == 64) return new BigInt64Array(t.read(i * 8));
    }
    const a = [];
    for (let d = 0; d < i; d++) a.push(this._type.decodeValue(t, n._type));
    return a;
  }
  get name() {
    return `vec ${this._type.name}`;
  }
  display() {
    return `vec ${this._type.display()}`;
  }
  valueToString(t) {
    return "vec {" + t.map((n) => this._type.valueToString(n)).join("; ") + "}";
  }
}
class Gr extends fr {
  constructor(t) {
    super(), (this._type = t);
  }
  accept(t, r) {
    return t.visitOpt(this, this._type, r);
  }
  covariant(t) {
    try {
      if (
        Array.isArray(t) &&
        (t.length === 0 || (t.length === 1 && this._type.covariant(t[0])))
      )
        return !0;
    } catch (r) {
      throw new Error(`Invalid ${this.display()} argument: ${Ge(t)} 

-> ${r.message}`);
    }
    throw new Error(`Invalid ${this.display()} argument: ${Ge(t)}`);
  }
  encodeValue(t) {
    return t.length === 0
      ? new Uint8Array([0])
      : Re(new Uint8Array([1]), this._type.encodeValue(t[0]));
  }
  _buildTypeTableImpl(t) {
    this._type.buildTypeTable(t);
    const r = Ke(-18),
      n = this._type.encodeType(t);
    t.add(this, Re(r, n));
  }
  decodeValue(t, r) {
    const n = this.checkType(r);
    if (!(n instanceof Gr)) throw new Error("Not an option type");
    switch (br(t)) {
      case 0:
        return [];
      case 1:
        return [this._type.decodeValue(t, n._type)];
      default:
        throw new Error("Not an option value");
    }
  }
  get name() {
    return `opt ${this._type.name}`;
  }
  display() {
    return `opt ${this._type.display()}`;
  }
  valueToString(t) {
    return t.length === 0 ? "null" : `opt ${this._type.valueToString(t[0])}`;
  }
}
class mn extends fr {
  constructor(t = {}) {
    super(),
      (this._fields = Object.entries(t).sort((r, n) => kt(r[0]) - kt(n[0])));
  }
  accept(t, r) {
    return t.visitRecord(this, this._fields, r);
  }
  tryAsTuple() {
    const t = [];
    for (let r = 0; r < this._fields.length; r++) {
      const [n, i] = this._fields[r];
      if (n !== `_${r}_`) return null;
      t.push(i);
    }
    return t;
  }
  covariant(t) {
    if (
      typeof t == "object" &&
      this._fields.every(([r, n]) => {
        if (!t.hasOwnProperty(r))
          throw new Error(`Record is missing key "${r}".`);
        try {
          return n.covariant(t[r]);
        } catch (i) {
          throw new Error(`Invalid ${this.display()} argument: 

field ${r} -> ${i.message}`);
        }
      })
    )
      return !0;
    throw new Error(`Invalid ${this.display()} argument: ${Ge(t)}`);
  }
  encodeValue(t) {
    const r = this._fields.map(([i]) => t[i]),
      n = un(this._fields, r, ([, i], a) => i.encodeValue(a));
    return Re(...n);
  }
  _buildTypeTableImpl(t) {
    this._fields.forEach(([a, d]) => d.buildTypeTable(t));
    const r = Ke(-20),
      n = Ve(this._fields.length),
      i = this._fields.map(([a, d]) => Re(Ve(kt(a)), d.encodeType(t)));
    t.add(this, Re(r, n, Re(...i)));
  }
  decodeValue(t, r) {
    const n = this.checkType(r);
    if (!(n instanceof mn)) throw new Error("Not a record type");
    const i = {};
    let a = 0,
      d = 0;
    for (; d < n._fields.length; ) {
      const [c, w] = n._fields[d];
      if (a >= this._fields.length) {
        w.decodeValue(t, w), d++;
        continue;
      }
      const [x, B] = this._fields[a],
        N = kt(this._fields[a][0]),
        I = kt(c);
      if (N === I) (i[x] = B.decodeValue(t, w)), a++, d++;
      else if (I > N)
        if (B instanceof Gr || B instanceof oi) (i[x] = []), a++;
        else throw new Error("Cannot find required field " + x);
      else w.decodeValue(t, w), d++;
    }
    for (const [c, w] of this._fields.slice(a))
      if (w instanceof Gr || w instanceof oi) i[c] = [];
      else throw new Error("Cannot find required field " + c);
    return i;
  }
  get name() {
    return `record {${this._fields.map(([r, n]) => r + ":" + n.name).join("; ")}}`;
  }
  display() {
    return `record {${this._fields.map(([r, n]) => r + ":" + n.display()).join("; ")}}`;
  }
  valueToString(t) {
    const r = this._fields.map(([i]) => t[i]);
    return `record {${un(this._fields, r, ([i, a], d) => i + "=" + a.valueToString(d)).join("; ")}}`;
  }
}
class Bi extends mn {
  constructor(t) {
    const r = {};
    t.forEach((n, i) => (r["_" + i + "_"] = n)),
      super(r),
      (this._components = t);
  }
  accept(t, r) {
    return t.visitTuple(this, this._components, r);
  }
  covariant(t) {
    if (
      Array.isArray(t) &&
      t.length >= this._fields.length &&
      this._components.every((r, n) => {
        try {
          return r.covariant(t[n]);
        } catch (i) {
          throw new Error(`Invalid ${this.display()} argument: 

index ${n} -> ${i.message}`);
        }
      })
    )
      return !0;
    throw new Error(`Invalid ${this.display()} argument: ${Ge(t)}`);
  }
  encodeValue(t) {
    const r = un(this._components, t, (n, i) => n.encodeValue(i));
    return Re(...r);
  }
  decodeValue(t, r) {
    const n = this.checkType(r);
    if (!(n instanceof Bi)) throw new Error("not a tuple type");
    if (n._components.length < this._components.length)
      throw new Error("tuple mismatch");
    const i = [];
    for (const [a, d] of n._components.entries())
      a >= this._components.length
        ? d.decodeValue(t, d)
        : i.push(this._components[a].decodeValue(t, d));
    return i;
  }
  display() {
    return `record {${this._components.map((r) => r.display()).join("; ")}}`;
  }
  valueToString(t) {
    return `record {${un(this._components, t, (n, i) => n.valueToString(i)).join("; ")}}`;
  }
}
class Ai extends fr {
  constructor(t = {}) {
    super(),
      (this._fields = Object.entries(t).sort((r, n) => kt(r[0]) - kt(n[0])));
  }
  accept(t, r) {
    return t.visitVariant(this, this._fields, r);
  }
  covariant(t) {
    if (
      typeof t == "object" &&
      Object.entries(t).length === 1 &&
      this._fields.every(([r, n]) => {
        try {
          return !t.hasOwnProperty(r) || n.covariant(t[r]);
        } catch (i) {
          throw new Error(`Invalid ${this.display()} argument: 

variant ${r} -> ${i.message}`);
        }
      })
    )
      return !0;
    throw new Error(`Invalid ${this.display()} argument: ${Ge(t)}`);
  }
  encodeValue(t) {
    for (let r = 0; r < this._fields.length; r++) {
      const [n, i] = this._fields[r];
      if (t.hasOwnProperty(n)) {
        const a = Ve(r),
          d = i.encodeValue(t[n]);
        return Re(a, d);
      }
    }
    throw Error("Variant has no data: " + t);
  }
  _buildTypeTableImpl(t) {
    this._fields.forEach(([, a]) => {
      a.buildTypeTable(t);
    });
    const r = Ke(-21),
      n = Ve(this._fields.length),
      i = this._fields.map(([a, d]) => Re(Ve(kt(a)), d.encodeType(t)));
    t.add(this, Re(r, n, ...i));
  }
  decodeValue(t, r) {
    const n = this.checkType(r);
    if (!(n instanceof Ai)) throw new Error("Not a variant type");
    const i = Number(Ye(t));
    if (i >= n._fields.length) throw Error("Invalid variant index: " + i);
    const [a, d] = n._fields[i];
    for (const [c, w] of this._fields)
      if (kt(a) === kt(c)) {
        const x = w.decodeValue(t, d);
        return { [c]: x };
      }
    throw new Error("Cannot find field hash " + a);
  }
  get name() {
    return `variant {${this._fields.map(([r, n]) => r + ":" + n.name).join("; ")}}`;
  }
  display() {
    return `variant {${this._fields.map(([r, n]) => r + (n.name === "null" ? "" : `:${n.display()}`)).join("; ")}}`;
  }
  valueToString(t) {
    for (const [r, n] of this._fields)
      if (t.hasOwnProperty(r)) {
        const i = n.valueToString(t[r]);
        return i === "null" ? `variant {${r}}` : `variant {${r}=${i}}`;
      }
    throw new Error("Variant has no data: " + t);
  }
}
class lr extends fr {
  constructor() {
    super(...arguments), (this._id = lr._counter++), (this._type = void 0);
  }
  accept(t, r) {
    if (!this._type) throw Error("Recursive type uninitialized.");
    return t.visitRec(this, this._type, r);
  }
  fill(t) {
    this._type = t;
  }
  getType() {
    return this._type;
  }
  covariant(t) {
    if (this._type && this._type.covariant(t)) return !0;
    throw new Error(`Invalid ${this.display()} argument: ${Ge(t)}`);
  }
  encodeValue(t) {
    if (!this._type) throw Error("Recursive type uninitialized.");
    return this._type.encodeValue(t);
  }
  _buildTypeTableImpl(t) {
    if (!this._type) throw Error("Recursive type uninitialized.");
    t.add(this, new Uint8Array([])),
      this._type.buildTypeTable(t),
      t.merge(this, this._type.name);
  }
  decodeValue(t, r) {
    if (!this._type) throw Error("Recursive type uninitialized.");
    return this._type.decodeValue(t, r);
  }
  get name() {
    return `rec_${this._id}`;
  }
  display() {
    if (!this._type) throw Error("Recursive type uninitialized.");
    return `μ${this.name}.${this._type.name}`;
  }
  valueToString(t) {
    if (!this._type) throw Error("Recursive type uninitialized.");
    return this._type.valueToString(t);
  }
}
lr._counter = 0;
function Os(e) {
  if (br(e) !== 1) throw new Error("Cannot decode principal");
  const r = Number(Ye(e));
  return Te.fromUint8Array(new Uint8Array(mr(e, r)));
}
class co extends wt {
  accept(t, r) {
    return t.visitPrincipal(this, r);
  }
  covariant(t) {
    if (t && t._isPrincipal) return !0;
    throw new Error(`Invalid ${this.display()} argument: ${Ge(t)}`);
  }
  encodeValue(t) {
    const r = t.toUint8Array(),
      n = Ve(r.byteLength);
    return Re(new Uint8Array([1]), n, r);
  }
  encodeType() {
    return Ke(-24);
  }
  decodeValue(t, r) {
    return this.checkType(r), Os(t);
  }
  get name() {
    return "principal";
  }
  valueToString(t) {
    return `${this.name} "${t.toText()}"`;
  }
}
class Rs extends fr {
  constructor(t, r, n = []) {
    super(), (this.argTypes = t), (this.retTypes = r), (this.annotations = n);
  }
  static argsToString(t, r) {
    if (t.length !== r.length) throw new Error("arity mismatch");
    return "(" + t.map((n, i) => n.valueToString(r[i])).join(", ") + ")";
  }
  accept(t, r) {
    return t.visitFunc(this, r);
  }
  covariant(t) {
    if (
      Array.isArray(t) &&
      t.length === 2 &&
      t[0] &&
      t[0]._isPrincipal &&
      typeof t[1] == "string"
    )
      return !0;
    throw new Error(`Invalid ${this.display()} argument: ${Ge(t)}`);
  }
  encodeValue([t, r]) {
    const n = t.toUint8Array(),
      i = Ve(n.byteLength),
      a = Re(new Uint8Array([1]), i, n),
      d = new TextEncoder().encode(r),
      c = Ve(d.byteLength);
    return Re(new Uint8Array([1]), a, c, d);
  }
  _buildTypeTableImpl(t) {
    this.argTypes.forEach((x) => x.buildTypeTable(t)),
      this.retTypes.forEach((x) => x.buildTypeTable(t));
    const r = Ke(-22),
      n = Ve(this.argTypes.length),
      i = Re(...this.argTypes.map((x) => x.encodeType(t))),
      a = Ve(this.retTypes.length),
      d = Re(...this.retTypes.map((x) => x.encodeType(t))),
      c = Ve(this.annotations.length),
      w = Re(...this.annotations.map((x) => this.encodeAnnotation(x)));
    t.add(this, Re(r, n, i, a, d, c, w));
  }
  decodeValue(t) {
    if (br(t) !== 1) throw new Error("Cannot decode function reference");
    const n = Os(t),
      i = Number(Ye(t)),
      a = mr(t, i),
      c = new TextDecoder("utf8", { fatal: !0 }).decode(a);
    return [n, c];
  }
  get name() {
    const t = this.argTypes.map((i) => i.name).join(", "),
      r = this.retTypes.map((i) => i.name).join(", "),
      n = " " + this.annotations.join(" ");
    return `(${t}) -> (${r})${n}`;
  }
  valueToString([t, r]) {
    return `func "${t.toText()}".${r}`;
  }
  display() {
    const t = this.argTypes.map((i) => i.display()).join(", "),
      r = this.retTypes.map((i) => i.display()).join(", "),
      n = " " + this.annotations.join(" ");
    return `(${t}) → (${r})${n}`;
  }
  encodeAnnotation(t) {
    if (t === "query") return new Uint8Array([1]);
    if (t === "oneway") return new Uint8Array([2]);
    if (t === "composite_query") return new Uint8Array([3]);
    throw new Error("Illegal function annotation");
  }
}
class uo extends fr {
  constructor(t) {
    super(),
      (this._fields = Object.entries(t).sort((r, n) =>
        r[0] < n[0] ? -1 : r[0] > n[0] ? 1 : 0,
      ));
  }
  accept(t, r) {
    return t.visitService(this, r);
  }
  covariant(t) {
    if (t && t._isPrincipal) return !0;
    throw new Error(`Invalid ${this.display()} argument: ${Ge(t)}`);
  }
  encodeValue(t) {
    const r = t.toUint8Array(),
      n = Ve(r.length);
    return Re(new Uint8Array([1]), n, r);
  }
  _buildTypeTableImpl(t) {
    this._fields.forEach(([a, d]) => d.buildTypeTable(t));
    const r = Ke(-23),
      n = Ve(this._fields.length),
      i = this._fields.map(([a, d]) => {
        const c = new TextEncoder().encode(a),
          w = Ve(c.length);
        return Re(w, c, d.encodeType(t));
      });
    t.add(this, Re(r, n, ...i));
  }
  decodeValue(t) {
    return Os(t);
  }
  get name() {
    return `service {${this._fields.map(([r, n]) => r + ":" + n.name).join("; ")}}`;
  }
  valueToString(t) {
    return `service "${t.toText()}"`;
  }
}
function Ge(e) {
  const t = JSON.stringify(e, (r, n) =>
    typeof n == "bigint" ? `BigInt(${n})` : n,
  );
  return t && t.length > Zs ? t.substring(0, Zs - 3) + "..." : t;
}
function as(e, t) {
  if (t.length < e.length) throw Error("Wrong number of message arguments");
  const r = new df();
  e.forEach((w) => w.buildTypeTable(r));
  const n = new TextEncoder().encode(kn),
    i = r.encode(),
    a = Ve(t.length),
    d = Re(...e.map((w) => w.encodeType(r))),
    c = Re(
      ...un(e, t, (w, x) => {
        try {
          w.covariant(x);
        } catch (B) {
          throw new Error(
            B.message +
              `

`,
          );
        }
        return w.encodeValue(x);
      }),
    );
  return Re(n, i, a, d, c);
}
function fo(e, t) {
  const r = new Hr(t);
  if (t.byteLength < kn.length)
    throw new Error("Message length smaller than magic number");
  const n = mr(r, kn.length),
    i = new TextDecoder().decode(n);
  if (i !== kn) throw new Error("Wrong magic number: " + JSON.stringify(i));
  function a(S) {
    const b = [],
      C = Number(Ye(S));
    for (let L = 0; L < C; L++) {
      const W = Number(Zt(S));
      switch (W) {
        case -18:
        case -19: {
          const te = Number(Zt(S));
          b.push([W, te]);
          break;
        }
        case -20:
        case -21: {
          const te = [];
          let $ = Number(Ye(S)),
            X;
          for (; $--; ) {
            const q = Number(Ye(S));
            if (q >= Math.pow(2, 32))
              throw new Error("field id out of 32-bit range");
            if (typeof X == "number" && X >= q)
              throw new Error("field id collision or not sorted");
            X = q;
            const ee = Number(Zt(S));
            te.push([q, ee]);
          }
          b.push([W, te]);
          break;
        }
        case -22: {
          const te = [];
          let $ = Number(Ye(S));
          for (; $--; ) te.push(Number(Zt(S)));
          const X = [];
          let q = Number(Ye(S));
          for (; q--; ) X.push(Number(Zt(S)));
          const ee = [];
          let ne = Number(Ye(S));
          for (; ne--; )
            switch (Number(Ye(S))) {
              case 1: {
                ee.push("query");
                break;
              }
              case 2: {
                ee.push("oneway");
                break;
              }
              case 3: {
                ee.push("composite_query");
                break;
              }
              default:
                throw new Error("unknown annotation");
            }
          b.push([W, [te, X, ee]]);
          break;
        }
        case -23: {
          let te = Number(Ye(S));
          const $ = [];
          for (; te--; ) {
            const X = Number(Ye(S)),
              q = new TextDecoder().decode(mr(S, X)),
              ee = Zt(S);
            $.push([q, ee]);
          }
          b.push([W, $]);
          break;
        }
        default:
          throw new Error("Illegal op_code: " + W);
      }
    }
    const V = [],
      K = Number(Ye(S));
    for (let L = 0; L < K; L++) V.push(Number(Zt(S)));
    return [b, V];
  }
  const [d, c] = a(r);
  if (c.length < e.length) throw new Error("Wrong number of return values");
  const w = d.map((S) => ko());
  function x(S) {
    if (S < -24) throw new Error("future value not supported");
    if (S < 0)
      switch (S) {
        case -1:
          return yo;
        case -2:
          return po;
        case -3:
          return mo;
        case -4:
          return wo;
        case -5:
          return Bo;
        case -6:
          return Ao;
        case -7:
          return No;
        case -8:
          return Io;
        case -9:
          return xo;
        case -10:
          return Eo;
        case -11:
          return vo;
        case -12:
          return To;
        case -13:
          return bo;
        case -14:
          return _o;
        case -15:
          return go;
        case -16:
          return ho;
        case -17:
          return lo;
        case -24:
          return So;
        default:
          throw new Error("Illegal op_code: " + S);
      }
    if (S >= d.length) throw new Error("type index out of range");
    return w[S];
  }
  function B(S) {
    switch (S[0]) {
      case -19: {
        const b = x(S[1]);
        return Ro(b);
      }
      case -18: {
        const b = x(S[1]);
        return Uo(b);
      }
      case -20: {
        const b = {};
        for (const [K, L] of S[1]) {
          const W = `_${K}_`;
          b[W] = x(L);
        }
        const C = Fo(b),
          V = C.tryAsTuple();
        return Array.isArray(V) ? Oo(...V) : C;
      }
      case -21: {
        const b = {};
        for (const [C, V] of S[1]) {
          const K = `_${C}_`;
          b[K] = x(V);
        }
        return Po(b);
      }
      case -22: {
        const [b, C, V] = S[1];
        return Co(
          b.map((K) => x(K)),
          C.map((K) => x(K)),
          V,
        );
      }
      case -23: {
        const b = {},
          C = S[1];
        for (const [V, K] of C) {
          let L = x(K);
          if ((L instanceof lr && (L = L.getType()), !(L instanceof Rs)))
            throw new Error(
              "Illegal service definition: services can only contain functions",
            );
          b[V] = L;
        }
        return $o(b);
      }
      default:
        throw new Error("Illegal op_code: " + S[0]);
    }
  }
  d.forEach((S, b) => {
    if (S[0] === -22) {
      const C = B(S);
      w[b].fill(C);
    }
  }),
    d.forEach((S, b) => {
      if (S[0] !== -22) {
        const C = B(S);
        w[b].fill(C);
      }
    });
  const N = c.map((S) => x(S)),
    I = e.map((S, b) => S.decodeValue(r, N[b]));
  for (let S = e.length; S < N.length; S++) N[S].decodeValue(r, N[S]);
  if (r.byteLength > 0) throw new Error("decode: Left-over bytes");
  return I;
}
const lo = new to(),
  ho = new oi(),
  pf = new ro(),
  po = new no(),
  yo = new io(),
  go = new so(),
  wo = new ao(),
  mo = new oo(),
  bo = new Ss(32),
  _o = new Ss(64),
  xo = new _r(8),
  Eo = new _r(16),
  vo = new _r(32),
  To = new _r(64),
  Bo = new or(8),
  Ao = new or(16),
  No = new or(32),
  Io = new or(64),
  So = new co();
function Oo(...e) {
  return new Bi(e);
}
function Ro(e) {
  return new Ti(e);
}
function Uo(e) {
  return new Gr(e);
}
function Fo(e) {
  return new mn(e);
}
function Po(e) {
  return new Ai(e);
}
function ko() {
  return new lr();
}
function Co(e, t, r = []) {
  return new Rs(e, t, r);
}
function $o(e) {
  return new uo(e);
}
const yf = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      Bool: po,
      BoolClass: no,
      ConstructType: fr,
      Empty: lo,
      EmptyClass: to,
      FixedIntClass: _r,
      FixedNatClass: or,
      Float32: bo,
      Float64: _o,
      FloatClass: Ss,
      Func: Co,
      FuncClass: Rs,
      Int: wo,
      Int16: Eo,
      Int32: vo,
      Int64: To,
      Int8: xo,
      IntClass: ao,
      Nat: mo,
      Nat16: Ao,
      Nat32: No,
      Nat64: Io,
      Nat8: Bo,
      NatClass: oo,
      Null: yo,
      NullClass: io,
      Opt: Uo,
      OptClass: Gr,
      PrimitiveType: wt,
      Principal: So,
      PrincipalClass: co,
      Rec: ko,
      RecClass: lr,
      Record: Fo,
      RecordClass: mn,
      Reserved: ho,
      ReservedClass: oi,
      Service: $o,
      ServiceClass: uo,
      Text: go,
      TextClass: so,
      Tuple: Oo,
      TupleClass: Bi,
      Type: vi,
      Unknown: pf,
      UnknownClass: ro,
      Variant: Po,
      VariantClass: Ai,
      Vec: Ro,
      VecClass: Ti,
      Visitor: hf,
      decode: fo,
      encode: as,
    },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
var Mo = {},
  bn = {};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */ (function (e) {
  var t = gn,
    r = wn,
    n =
      typeof Symbol == "function" && typeof Symbol.for == "function"
        ? Symbol.for("nodejs.util.inspect.custom")
        : null;
  (e.Buffer = c), (e.SlowBuffer = L), (e.INSPECT_MAX_BYTES = 50);
  var i = 2147483647;
  (e.kMaxLength = i),
    (c.TYPED_ARRAY_SUPPORT = a()),
    !c.TYPED_ARRAY_SUPPORT &&
      typeof console < "u" &&
      typeof console.error == "function" &&
      console.error(
        "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.",
      );
  function a() {
    try {
      var p = new Uint8Array(1),
        o = {
          foo: function () {
            return 42;
          },
        };
      return (
        Object.setPrototypeOf(o, Uint8Array.prototype),
        Object.setPrototypeOf(p, o),
        p.foo() === 42
      );
    } catch {
      return !1;
    }
  }
  Object.defineProperty(c.prototype, "parent", {
    enumerable: !0,
    get: function () {
      if (c.isBuffer(this)) return this.buffer;
    },
  }),
    Object.defineProperty(c.prototype, "offset", {
      enumerable: !0,
      get: function () {
        if (c.isBuffer(this)) return this.byteOffset;
      },
    });
  function d(p) {
    if (p > i)
      throw new RangeError(
        'The value "' + p + '" is invalid for option "size"',
      );
    var o = new Uint8Array(p);
    return Object.setPrototypeOf(o, c.prototype), o;
  }
  function c(p, o, u) {
    if (typeof p == "number") {
      if (typeof o == "string")
        throw new TypeError(
          'The "string" argument must be of type string. Received type number',
        );
      return N(p);
    }
    return w(p, o, u);
  }
  c.poolSize = 8192;
  function w(p, o, u) {
    if (typeof p == "string") return I(p, o);
    if (ArrayBuffer.isView(p)) return b(p);
    if (p == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
          typeof p,
      );
    if (
      E(p, ArrayBuffer) ||
      (p && E(p.buffer, ArrayBuffer)) ||
      (typeof SharedArrayBuffer < "u" &&
        (E(p, SharedArrayBuffer) || (p && E(p.buffer, SharedArrayBuffer))))
    )
      return C(p, o, u);
    if (typeof p == "number")
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number',
      );
    var g = p.valueOf && p.valueOf();
    if (g != null && g !== p) return c.from(g, o, u);
    var v = V(p);
    if (v) return v;
    if (
      typeof Symbol < "u" &&
      Symbol.toPrimitive != null &&
      typeof p[Symbol.toPrimitive] == "function"
    )
      return c.from(p[Symbol.toPrimitive]("string"), o, u);
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
        typeof p,
    );
  }
  (c.from = function (p, o, u) {
    return w(p, o, u);
  }),
    Object.setPrototypeOf(c.prototype, Uint8Array.prototype),
    Object.setPrototypeOf(c, Uint8Array);
  function x(p) {
    if (typeof p != "number")
      throw new TypeError('"size" argument must be of type number');
    if (p < 0)
      throw new RangeError(
        'The value "' + p + '" is invalid for option "size"',
      );
  }
  function B(p, o, u) {
    return (
      x(p),
      p <= 0
        ? d(p)
        : o !== void 0
          ? typeof u == "string"
            ? d(p).fill(o, u)
            : d(p).fill(o)
          : d(p)
    );
  }
  c.alloc = function (p, o, u) {
    return B(p, o, u);
  };
  function N(p) {
    return x(p), d(p < 0 ? 0 : K(p) | 0);
  }
  (c.allocUnsafe = function (p) {
    return N(p);
  }),
    (c.allocUnsafeSlow = function (p) {
      return N(p);
    });
  function I(p, o) {
    if (((typeof o != "string" || o === "") && (o = "utf8"), !c.isEncoding(o)))
      throw new TypeError("Unknown encoding: " + o);
    var u = W(p, o) | 0,
      g = d(u),
      v = g.write(p, o);
    return v !== u && (g = g.slice(0, v)), g;
  }
  function S(p) {
    for (
      var o = p.length < 0 ? 0 : K(p.length) | 0, u = d(o), g = 0;
      g < o;
      g += 1
    )
      u[g] = p[g] & 255;
    return u;
  }
  function b(p) {
    if (E(p, Uint8Array)) {
      var o = new Uint8Array(p);
      return C(o.buffer, o.byteOffset, o.byteLength);
    }
    return S(p);
  }
  function C(p, o, u) {
    if (o < 0 || p.byteLength < o)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (p.byteLength < o + (u || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    var g;
    return (
      o === void 0 && u === void 0
        ? (g = new Uint8Array(p))
        : u === void 0
          ? (g = new Uint8Array(p, o))
          : (g = new Uint8Array(p, o, u)),
      Object.setPrototypeOf(g, c.prototype),
      g
    );
  }
  function V(p) {
    if (c.isBuffer(p)) {
      var o = K(p.length) | 0,
        u = d(o);
      return u.length === 0 || p.copy(u, 0, 0, o), u;
    }
    if (p.length !== void 0)
      return typeof p.length != "number" || T(p.length) ? d(0) : S(p);
    if (p.type === "Buffer" && Array.isArray(p.data)) return S(p.data);
  }
  function K(p) {
    if (p >= i)
      throw new RangeError(
        "Attempt to allocate Buffer larger than maximum size: 0x" +
          i.toString(16) +
          " bytes",
      );
    return p | 0;
  }
  function L(p) {
    return +p != p && (p = 0), c.alloc(+p);
  }
  (c.isBuffer = function (o) {
    return o != null && o._isBuffer === !0 && o !== c.prototype;
  }),
    (c.compare = function (o, u) {
      if (
        (E(o, Uint8Array) && (o = c.from(o, o.offset, o.byteLength)),
        E(u, Uint8Array) && (u = c.from(u, u.offset, u.byteLength)),
        !c.isBuffer(o) || !c.isBuffer(u))
      )
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array',
        );
      if (o === u) return 0;
      for (
        var g = o.length, v = u.length, O = 0, j = Math.min(g, v);
        O < j;
        ++O
      )
        if (o[O] !== u[O]) {
          (g = o[O]), (v = u[O]);
          break;
        }
      return g < v ? -1 : v < g ? 1 : 0;
    }),
    (c.isEncoding = function (o) {
      switch (String(o).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return !0;
        default:
          return !1;
      }
    }),
    (c.concat = function (o, u) {
      if (!Array.isArray(o))
        throw new TypeError('"list" argument must be an Array of Buffers');
      if (o.length === 0) return c.alloc(0);
      var g;
      if (u === void 0) for (u = 0, g = 0; g < o.length; ++g) u += o[g].length;
      var v = c.allocUnsafe(u),
        O = 0;
      for (g = 0; g < o.length; ++g) {
        var j = o[g];
        if (E(j, Uint8Array))
          O + j.length > v.length
            ? c.from(j).copy(v, O)
            : Uint8Array.prototype.set.call(v, j, O);
        else if (c.isBuffer(j)) j.copy(v, O);
        else throw new TypeError('"list" argument must be an Array of Buffers');
        O += j.length;
      }
      return v;
    });
  function W(p, o) {
    if (c.isBuffer(p)) return p.length;
    if (ArrayBuffer.isView(p) || E(p, ArrayBuffer)) return p.byteLength;
    if (typeof p != "string")
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
          typeof p,
      );
    var u = p.length,
      g = arguments.length > 2 && arguments[2] === !0;
    if (!g && u === 0) return 0;
    for (var v = !1; ; )
      switch (o) {
        case "ascii":
        case "latin1":
        case "binary":
          return u;
        case "utf8":
        case "utf-8":
          return ie(p).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return u * 2;
        case "hex":
          return u >>> 1;
        case "base64":
          return s(p).length;
        default:
          if (v) return g ? -1 : ie(p).length;
          (o = ("" + o).toLowerCase()), (v = !0);
      }
  }
  c.byteLength = W;
  function te(p, o, u) {
    var g = !1;
    if (
      ((o === void 0 || o < 0) && (o = 0),
      o > this.length ||
        ((u === void 0 || u > this.length) && (u = this.length), u <= 0) ||
        ((u >>>= 0), (o >>>= 0), u <= o))
    )
      return "";
    for (p || (p = "utf8"); ; )
      switch (p) {
        case "hex":
          return re(this, o, u);
        case "utf8":
        case "utf-8":
          return P(this, o, u);
        case "ascii":
          return G(this, o, u);
        case "latin1":
        case "binary":
          return Q(this, o, u);
        case "base64":
          return R(this, o, u);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return ye(this, o, u);
        default:
          if (g) throw new TypeError("Unknown encoding: " + p);
          (p = (p + "").toLowerCase()), (g = !0);
      }
  }
  c.prototype._isBuffer = !0;
  function $(p, o, u) {
    var g = p[o];
    (p[o] = p[u]), (p[u] = g);
  }
  (c.prototype.swap16 = function () {
    var o = this.length;
    if (o % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (var u = 0; u < o; u += 2) $(this, u, u + 1);
    return this;
  }),
    (c.prototype.swap32 = function () {
      var o = this.length;
      if (o % 4 !== 0)
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      for (var u = 0; u < o; u += 4) $(this, u, u + 3), $(this, u + 1, u + 2);
      return this;
    }),
    (c.prototype.swap64 = function () {
      var o = this.length;
      if (o % 8 !== 0)
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (var u = 0; u < o; u += 8)
        $(this, u, u + 7),
          $(this, u + 1, u + 6),
          $(this, u + 2, u + 5),
          $(this, u + 3, u + 4);
      return this;
    }),
    (c.prototype.toString = function () {
      var o = this.length;
      return o === 0
        ? ""
        : arguments.length === 0
          ? P(this, 0, o)
          : te.apply(this, arguments);
    }),
    (c.prototype.toLocaleString = c.prototype.toString),
    (c.prototype.equals = function (o) {
      if (!c.isBuffer(o)) throw new TypeError("Argument must be a Buffer");
      return this === o ? !0 : c.compare(this, o) === 0;
    }),
    (c.prototype.inspect = function () {
      var o = "",
        u = e.INSPECT_MAX_BYTES;
      return (
        (o = this.toString("hex", 0, u)
          .replace(/(.{2})/g, "$1 ")
          .trim()),
        this.length > u && (o += " ... "),
        "<Buffer " + o + ">"
      );
    }),
    n && (c.prototype[n] = c.prototype.inspect),
    (c.prototype.compare = function (o, u, g, v, O) {
      if (
        (E(o, Uint8Array) && (o = c.from(o, o.offset, o.byteLength)),
        !c.isBuffer(o))
      )
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
            typeof o,
        );
      if (
        (u === void 0 && (u = 0),
        g === void 0 && (g = o ? o.length : 0),
        v === void 0 && (v = 0),
        O === void 0 && (O = this.length),
        u < 0 || g > o.length || v < 0 || O > this.length)
      )
        throw new RangeError("out of range index");
      if (v >= O && u >= g) return 0;
      if (v >= O) return -1;
      if (u >= g) return 1;
      if (((u >>>= 0), (g >>>= 0), (v >>>= 0), (O >>>= 0), this === o))
        return 0;
      for (
        var j = O - v,
          Z = g - u,
          ce = Math.min(j, Z),
          de = this.slice(v, O),
          me = o.slice(u, g),
          y = 0;
        y < ce;
        ++y
      )
        if (de[y] !== me[y]) {
          (j = de[y]), (Z = me[y]);
          break;
        }
      return j < Z ? -1 : Z < j ? 1 : 0;
    });
  function X(p, o, u, g, v) {
    if (p.length === 0) return -1;
    if (
      (typeof u == "string"
        ? ((g = u), (u = 0))
        : u > 2147483647
          ? (u = 2147483647)
          : u < -2147483648 && (u = -2147483648),
      (u = +u),
      T(u) && (u = v ? 0 : p.length - 1),
      u < 0 && (u = p.length + u),
      u >= p.length)
    ) {
      if (v) return -1;
      u = p.length - 1;
    } else if (u < 0)
      if (v) u = 0;
      else return -1;
    if ((typeof o == "string" && (o = c.from(o, g)), c.isBuffer(o)))
      return o.length === 0 ? -1 : q(p, o, u, g, v);
    if (typeof o == "number")
      return (
        (o = o & 255),
        typeof Uint8Array.prototype.indexOf == "function"
          ? v
            ? Uint8Array.prototype.indexOf.call(p, o, u)
            : Uint8Array.prototype.lastIndexOf.call(p, o, u)
          : q(p, [o], u, g, v)
      );
    throw new TypeError("val must be string, number or Buffer");
  }
  function q(p, o, u, g, v) {
    var O = 1,
      j = p.length,
      Z = o.length;
    if (
      g !== void 0 &&
      ((g = String(g).toLowerCase()),
      g === "ucs2" || g === "ucs-2" || g === "utf16le" || g === "utf-16le")
    ) {
      if (p.length < 2 || o.length < 2) return -1;
      (O = 2), (j /= 2), (Z /= 2), (u /= 2);
    }
    function ce(l, A) {
      return O === 1 ? l[A] : l.readUInt16BE(A * O);
    }
    var de;
    if (v) {
      var me = -1;
      for (de = u; de < j; de++)
        if (ce(p, de) === ce(o, me === -1 ? 0 : de - me)) {
          if ((me === -1 && (me = de), de - me + 1 === Z)) return me * O;
        } else me !== -1 && (de -= de - me), (me = -1);
    } else
      for (u + Z > j && (u = j - Z), de = u; de >= 0; de--) {
        for (var y = !0, f = 0; f < Z; f++)
          if (ce(p, de + f) !== ce(o, f)) {
            y = !1;
            break;
          }
        if (y) return de;
      }
    return -1;
  }
  (c.prototype.includes = function (o, u, g) {
    return this.indexOf(o, u, g) !== -1;
  }),
    (c.prototype.indexOf = function (o, u, g) {
      return X(this, o, u, g, !0);
    }),
    (c.prototype.lastIndexOf = function (o, u, g) {
      return X(this, o, u, g, !1);
    });
  function ee(p, o, u, g) {
    u = Number(u) || 0;
    var v = p.length - u;
    g ? ((g = Number(g)), g > v && (g = v)) : (g = v);
    var O = o.length;
    g > O / 2 && (g = O / 2);
    for (var j = 0; j < g; ++j) {
      var Z = parseInt(o.substr(j * 2, 2), 16);
      if (T(Z)) return j;
      p[u + j] = Z;
    }
    return j;
  }
  function ne(p, o, u, g) {
    return h(ie(o, p.length - u), p, u, g);
  }
  function J(p, o, u, g) {
    return h(se(o), p, u, g);
  }
  function he(p, o, u, g) {
    return h(s(o), p, u, g);
  }
  function ue(p, o, u, g) {
    return h(m(o, p.length - u), p, u, g);
  }
  (c.prototype.write = function (o, u, g, v) {
    if (u === void 0) (v = "utf8"), (g = this.length), (u = 0);
    else if (g === void 0 && typeof u == "string")
      (v = u), (g = this.length), (u = 0);
    else if (isFinite(u))
      (u = u >>> 0),
        isFinite(g)
          ? ((g = g >>> 0), v === void 0 && (v = "utf8"))
          : ((v = g), (g = void 0));
    else
      throw new Error(
        "Buffer.write(string, encoding, offset[, length]) is no longer supported",
      );
    var O = this.length - u;
    if (
      ((g === void 0 || g > O) && (g = O),
      (o.length > 0 && (g < 0 || u < 0)) || u > this.length)
    )
      throw new RangeError("Attempt to write outside buffer bounds");
    v || (v = "utf8");
    for (var j = !1; ; )
      switch (v) {
        case "hex":
          return ee(this, o, u, g);
        case "utf8":
        case "utf-8":
          return ne(this, o, u, g);
        case "ascii":
        case "latin1":
        case "binary":
          return J(this, o, u, g);
        case "base64":
          return he(this, o, u, g);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return ue(this, o, u, g);
        default:
          if (j) throw new TypeError("Unknown encoding: " + v);
          (v = ("" + v).toLowerCase()), (j = !0);
      }
  }),
    (c.prototype.toJSON = function () {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0),
      };
    });
  function R(p, o, u) {
    return o === 0 && u === p.length
      ? t.fromByteArray(p)
      : t.fromByteArray(p.slice(o, u));
  }
  function P(p, o, u) {
    u = Math.min(p.length, u);
    for (var g = [], v = o; v < u; ) {
      var O = p[v],
        j = null,
        Z = O > 239 ? 4 : O > 223 ? 3 : O > 191 ? 2 : 1;
      if (v + Z <= u) {
        var ce, de, me, y;
        switch (Z) {
          case 1:
            O < 128 && (j = O);
            break;
          case 2:
            (ce = p[v + 1]),
              (ce & 192) === 128 &&
                ((y = ((O & 31) << 6) | (ce & 63)), y > 127 && (j = y));
            break;
          case 3:
            (ce = p[v + 1]),
              (de = p[v + 2]),
              (ce & 192) === 128 &&
                (de & 192) === 128 &&
                ((y = ((O & 15) << 12) | ((ce & 63) << 6) | (de & 63)),
                y > 2047 && (y < 55296 || y > 57343) && (j = y));
            break;
          case 4:
            (ce = p[v + 1]),
              (de = p[v + 2]),
              (me = p[v + 3]),
              (ce & 192) === 128 &&
                (de & 192) === 128 &&
                (me & 192) === 128 &&
                ((y =
                  ((O & 15) << 18) |
                  ((ce & 63) << 12) |
                  ((de & 63) << 6) |
                  (me & 63)),
                y > 65535 && y < 1114112 && (j = y));
        }
      }
      j === null
        ? ((j = 65533), (Z = 1))
        : j > 65535 &&
          ((j -= 65536),
          g.push(((j >>> 10) & 1023) | 55296),
          (j = 56320 | (j & 1023))),
        g.push(j),
        (v += Z);
    }
    return M(g);
  }
  var z = 4096;
  function M(p) {
    var o = p.length;
    if (o <= z) return String.fromCharCode.apply(String, p);
    for (var u = "", g = 0; g < o; )
      u += String.fromCharCode.apply(String, p.slice(g, (g += z)));
    return u;
  }
  function G(p, o, u) {
    var g = "";
    u = Math.min(p.length, u);
    for (var v = o; v < u; ++v) g += String.fromCharCode(p[v] & 127);
    return g;
  }
  function Q(p, o, u) {
    var g = "";
    u = Math.min(p.length, u);
    for (var v = o; v < u; ++v) g += String.fromCharCode(p[v]);
    return g;
  }
  function re(p, o, u) {
    var g = p.length;
    (!o || o < 0) && (o = 0), (!u || u < 0 || u > g) && (u = g);
    for (var v = "", O = o; O < u; ++O) v += U[p[O]];
    return v;
  }
  function ye(p, o, u) {
    for (var g = p.slice(o, u), v = "", O = 0; O < g.length - 1; O += 2)
      v += String.fromCharCode(g[O] + g[O + 1] * 256);
    return v;
  }
  c.prototype.slice = function (o, u) {
    var g = this.length;
    (o = ~~o),
      (u = u === void 0 ? g : ~~u),
      o < 0 ? ((o += g), o < 0 && (o = 0)) : o > g && (o = g),
      u < 0 ? ((u += g), u < 0 && (u = 0)) : u > g && (u = g),
      u < o && (u = o);
    var v = this.subarray(o, u);
    return Object.setPrototypeOf(v, c.prototype), v;
  };
  function ae(p, o, u) {
    if (p % 1 !== 0 || p < 0) throw new RangeError("offset is not uint");
    if (p + o > u)
      throw new RangeError("Trying to access beyond buffer length");
  }
  (c.prototype.readUintLE = c.prototype.readUIntLE =
    function (o, u, g) {
      (o = o >>> 0), (u = u >>> 0), g || ae(o, u, this.length);
      for (var v = this[o], O = 1, j = 0; ++j < u && (O *= 256); )
        v += this[o + j] * O;
      return v;
    }),
    (c.prototype.readUintBE = c.prototype.readUIntBE =
      function (o, u, g) {
        (o = o >>> 0), (u = u >>> 0), g || ae(o, u, this.length);
        for (var v = this[o + --u], O = 1; u > 0 && (O *= 256); )
          v += this[o + --u] * O;
        return v;
      }),
    (c.prototype.readUint8 = c.prototype.readUInt8 =
      function (o, u) {
        return (o = o >>> 0), u || ae(o, 1, this.length), this[o];
      }),
    (c.prototype.readUint16LE = c.prototype.readUInt16LE =
      function (o, u) {
        return (
          (o = o >>> 0),
          u || ae(o, 2, this.length),
          this[o] | (this[o + 1] << 8)
        );
      }),
    (c.prototype.readUint16BE = c.prototype.readUInt16BE =
      function (o, u) {
        return (
          (o = o >>> 0),
          u || ae(o, 2, this.length),
          (this[o] << 8) | this[o + 1]
        );
      }),
    (c.prototype.readUint32LE = c.prototype.readUInt32LE =
      function (o, u) {
        return (
          (o = o >>> 0),
          u || ae(o, 4, this.length),
          (this[o] | (this[o + 1] << 8) | (this[o + 2] << 16)) +
            this[o + 3] * 16777216
        );
      }),
    (c.prototype.readUint32BE = c.prototype.readUInt32BE =
      function (o, u) {
        return (
          (o = o >>> 0),
          u || ae(o, 4, this.length),
          this[o] * 16777216 +
            ((this[o + 1] << 16) | (this[o + 2] << 8) | this[o + 3])
        );
      }),
    (c.prototype.readIntLE = function (o, u, g) {
      (o = o >>> 0), (u = u >>> 0), g || ae(o, u, this.length);
      for (var v = this[o], O = 1, j = 0; ++j < u && (O *= 256); )
        v += this[o + j] * O;
      return (O *= 128), v >= O && (v -= Math.pow(2, 8 * u)), v;
    }),
    (c.prototype.readIntBE = function (o, u, g) {
      (o = o >>> 0), (u = u >>> 0), g || ae(o, u, this.length);
      for (var v = u, O = 1, j = this[o + --v]; v > 0 && (O *= 256); )
        j += this[o + --v] * O;
      return (O *= 128), j >= O && (j -= Math.pow(2, 8 * u)), j;
    }),
    (c.prototype.readInt8 = function (o, u) {
      return (
        (o = o >>> 0),
        u || ae(o, 1, this.length),
        this[o] & 128 ? (255 - this[o] + 1) * -1 : this[o]
      );
    }),
    (c.prototype.readInt16LE = function (o, u) {
      (o = o >>> 0), u || ae(o, 2, this.length);
      var g = this[o] | (this[o + 1] << 8);
      return g & 32768 ? g | 4294901760 : g;
    }),
    (c.prototype.readInt16BE = function (o, u) {
      (o = o >>> 0), u || ae(o, 2, this.length);
      var g = this[o + 1] | (this[o] << 8);
      return g & 32768 ? g | 4294901760 : g;
    }),
    (c.prototype.readInt32LE = function (o, u) {
      return (
        (o = o >>> 0),
        u || ae(o, 4, this.length),
        this[o] | (this[o + 1] << 8) | (this[o + 2] << 16) | (this[o + 3] << 24)
      );
    }),
    (c.prototype.readInt32BE = function (o, u) {
      return (
        (o = o >>> 0),
        u || ae(o, 4, this.length),
        (this[o] << 24) | (this[o + 1] << 16) | (this[o + 2] << 8) | this[o + 3]
      );
    }),
    (c.prototype.readFloatLE = function (o, u) {
      return (
        (o = o >>> 0), u || ae(o, 4, this.length), r.read(this, o, !0, 23, 4)
      );
    }),
    (c.prototype.readFloatBE = function (o, u) {
      return (
        (o = o >>> 0), u || ae(o, 4, this.length), r.read(this, o, !1, 23, 4)
      );
    }),
    (c.prototype.readDoubleLE = function (o, u) {
      return (
        (o = o >>> 0), u || ae(o, 8, this.length), r.read(this, o, !0, 52, 8)
      );
    }),
    (c.prototype.readDoubleBE = function (o, u) {
      return (
        (o = o >>> 0), u || ae(o, 8, this.length), r.read(this, o, !1, 52, 8)
      );
    });
  function Y(p, o, u, g, v, O) {
    if (!c.isBuffer(p))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (o > v || o < O)
      throw new RangeError('"value" argument is out of bounds');
    if (u + g > p.length) throw new RangeError("Index out of range");
  }
  (c.prototype.writeUintLE = c.prototype.writeUIntLE =
    function (o, u, g, v) {
      if (((o = +o), (u = u >>> 0), (g = g >>> 0), !v)) {
        var O = Math.pow(2, 8 * g) - 1;
        Y(this, o, u, g, O, 0);
      }
      var j = 1,
        Z = 0;
      for (this[u] = o & 255; ++Z < g && (j *= 256); )
        this[u + Z] = (o / j) & 255;
      return u + g;
    }),
    (c.prototype.writeUintBE = c.prototype.writeUIntBE =
      function (o, u, g, v) {
        if (((o = +o), (u = u >>> 0), (g = g >>> 0), !v)) {
          var O = Math.pow(2, 8 * g) - 1;
          Y(this, o, u, g, O, 0);
        }
        var j = g - 1,
          Z = 1;
        for (this[u + j] = o & 255; --j >= 0 && (Z *= 256); )
          this[u + j] = (o / Z) & 255;
        return u + g;
      }),
    (c.prototype.writeUint8 = c.prototype.writeUInt8 =
      function (o, u, g) {
        return (
          (o = +o),
          (u = u >>> 0),
          g || Y(this, o, u, 1, 255, 0),
          (this[u] = o & 255),
          u + 1
        );
      }),
    (c.prototype.writeUint16LE = c.prototype.writeUInt16LE =
      function (o, u, g) {
        return (
          (o = +o),
          (u = u >>> 0),
          g || Y(this, o, u, 2, 65535, 0),
          (this[u] = o & 255),
          (this[u + 1] = o >>> 8),
          u + 2
        );
      }),
    (c.prototype.writeUint16BE = c.prototype.writeUInt16BE =
      function (o, u, g) {
        return (
          (o = +o),
          (u = u >>> 0),
          g || Y(this, o, u, 2, 65535, 0),
          (this[u] = o >>> 8),
          (this[u + 1] = o & 255),
          u + 2
        );
      }),
    (c.prototype.writeUint32LE = c.prototype.writeUInt32LE =
      function (o, u, g) {
        return (
          (o = +o),
          (u = u >>> 0),
          g || Y(this, o, u, 4, 4294967295, 0),
          (this[u + 3] = o >>> 24),
          (this[u + 2] = o >>> 16),
          (this[u + 1] = o >>> 8),
          (this[u] = o & 255),
          u + 4
        );
      }),
    (c.prototype.writeUint32BE = c.prototype.writeUInt32BE =
      function (o, u, g) {
        return (
          (o = +o),
          (u = u >>> 0),
          g || Y(this, o, u, 4, 4294967295, 0),
          (this[u] = o >>> 24),
          (this[u + 1] = o >>> 16),
          (this[u + 2] = o >>> 8),
          (this[u + 3] = o & 255),
          u + 4
        );
      }),
    (c.prototype.writeIntLE = function (o, u, g, v) {
      if (((o = +o), (u = u >>> 0), !v)) {
        var O = Math.pow(2, 8 * g - 1);
        Y(this, o, u, g, O - 1, -O);
      }
      var j = 0,
        Z = 1,
        ce = 0;
      for (this[u] = o & 255; ++j < g && (Z *= 256); )
        o < 0 && ce === 0 && this[u + j - 1] !== 0 && (ce = 1),
          (this[u + j] = (((o / Z) >> 0) - ce) & 255);
      return u + g;
    }),
    (c.prototype.writeIntBE = function (o, u, g, v) {
      if (((o = +o), (u = u >>> 0), !v)) {
        var O = Math.pow(2, 8 * g - 1);
        Y(this, o, u, g, O - 1, -O);
      }
      var j = g - 1,
        Z = 1,
        ce = 0;
      for (this[u + j] = o & 255; --j >= 0 && (Z *= 256); )
        o < 0 && ce === 0 && this[u + j + 1] !== 0 && (ce = 1),
          (this[u + j] = (((o / Z) >> 0) - ce) & 255);
      return u + g;
    }),
    (c.prototype.writeInt8 = function (o, u, g) {
      return (
        (o = +o),
        (u = u >>> 0),
        g || Y(this, o, u, 1, 127, -128),
        o < 0 && (o = 255 + o + 1),
        (this[u] = o & 255),
        u + 1
      );
    }),
    (c.prototype.writeInt16LE = function (o, u, g) {
      return (
        (o = +o),
        (u = u >>> 0),
        g || Y(this, o, u, 2, 32767, -32768),
        (this[u] = o & 255),
        (this[u + 1] = o >>> 8),
        u + 2
      );
    }),
    (c.prototype.writeInt16BE = function (o, u, g) {
      return (
        (o = +o),
        (u = u >>> 0),
        g || Y(this, o, u, 2, 32767, -32768),
        (this[u] = o >>> 8),
        (this[u + 1] = o & 255),
        u + 2
      );
    }),
    (c.prototype.writeInt32LE = function (o, u, g) {
      return (
        (o = +o),
        (u = u >>> 0),
        g || Y(this, o, u, 4, 2147483647, -2147483648),
        (this[u] = o & 255),
        (this[u + 1] = o >>> 8),
        (this[u + 2] = o >>> 16),
        (this[u + 3] = o >>> 24),
        u + 4
      );
    }),
    (c.prototype.writeInt32BE = function (o, u, g) {
      return (
        (o = +o),
        (u = u >>> 0),
        g || Y(this, o, u, 4, 2147483647, -2147483648),
        o < 0 && (o = 4294967295 + o + 1),
        (this[u] = o >>> 24),
        (this[u + 1] = o >>> 16),
        (this[u + 2] = o >>> 8),
        (this[u + 3] = o & 255),
        u + 4
      );
    });
  function le(p, o, u, g, v, O) {
    if (u + g > p.length) throw new RangeError("Index out of range");
    if (u < 0) throw new RangeError("Index out of range");
  }
  function _(p, o, u, g, v) {
    return (
      (o = +o),
      (u = u >>> 0),
      v || le(p, o, u, 4),
      r.write(p, o, u, g, 23, 4),
      u + 4
    );
  }
  (c.prototype.writeFloatLE = function (o, u, g) {
    return _(this, o, u, !0, g);
  }),
    (c.prototype.writeFloatBE = function (o, u, g) {
      return _(this, o, u, !1, g);
    });
  function oe(p, o, u, g, v) {
    return (
      (o = +o),
      (u = u >>> 0),
      v || le(p, o, u, 8),
      r.write(p, o, u, g, 52, 8),
      u + 8
    );
  }
  (c.prototype.writeDoubleLE = function (o, u, g) {
    return oe(this, o, u, !0, g);
  }),
    (c.prototype.writeDoubleBE = function (o, u, g) {
      return oe(this, o, u, !1, g);
    }),
    (c.prototype.copy = function (o, u, g, v) {
      if (!c.isBuffer(o)) throw new TypeError("argument should be a Buffer");
      if (
        (g || (g = 0),
        !v && v !== 0 && (v = this.length),
        u >= o.length && (u = o.length),
        u || (u = 0),
        v > 0 && v < g && (v = g),
        v === g || o.length === 0 || this.length === 0)
      )
        return 0;
      if (u < 0) throw new RangeError("targetStart out of bounds");
      if (g < 0 || g >= this.length) throw new RangeError("Index out of range");
      if (v < 0) throw new RangeError("sourceEnd out of bounds");
      v > this.length && (v = this.length),
        o.length - u < v - g && (v = o.length - u + g);
      var O = v - g;
      return (
        this === o && typeof Uint8Array.prototype.copyWithin == "function"
          ? this.copyWithin(u, g, v)
          : Uint8Array.prototype.set.call(o, this.subarray(g, v), u),
        O
      );
    }),
    (c.prototype.fill = function (o, u, g, v) {
      if (typeof o == "string") {
        if (
          (typeof u == "string"
            ? ((v = u), (u = 0), (g = this.length))
            : typeof g == "string" && ((v = g), (g = this.length)),
          v !== void 0 && typeof v != "string")
        )
          throw new TypeError("encoding must be a string");
        if (typeof v == "string" && !c.isEncoding(v))
          throw new TypeError("Unknown encoding: " + v);
        if (o.length === 1) {
          var O = o.charCodeAt(0);
          ((v === "utf8" && O < 128) || v === "latin1") && (o = O);
        }
      } else
        typeof o == "number"
          ? (o = o & 255)
          : typeof o == "boolean" && (o = Number(o));
      if (u < 0 || this.length < u || this.length < g)
        throw new RangeError("Out of range index");
      if (g <= u) return this;
      (u = u >>> 0), (g = g === void 0 ? this.length : g >>> 0), o || (o = 0);
      var j;
      if (typeof o == "number") for (j = u; j < g; ++j) this[j] = o;
      else {
        var Z = c.isBuffer(o) ? o : c.from(o, v),
          ce = Z.length;
        if (ce === 0)
          throw new TypeError(
            'The value "' + o + '" is invalid for argument "value"',
          );
        for (j = 0; j < g - u; ++j) this[j + u] = Z[j % ce];
      }
      return this;
    });
  var fe = /[^+/0-9A-Za-z-_]/g;
  function we(p) {
    if (((p = p.split("=")[0]), (p = p.trim().replace(fe, "")), p.length < 2))
      return "";
    for (; p.length % 4 !== 0; ) p = p + "=";
    return p;
  }
  function ie(p, o) {
    o = o || 1 / 0;
    for (var u, g = p.length, v = null, O = [], j = 0; j < g; ++j) {
      if (((u = p.charCodeAt(j)), u > 55295 && u < 57344)) {
        if (!v) {
          if (u > 56319) {
            (o -= 3) > -1 && O.push(239, 191, 189);
            continue;
          } else if (j + 1 === g) {
            (o -= 3) > -1 && O.push(239, 191, 189);
            continue;
          }
          v = u;
          continue;
        }
        if (u < 56320) {
          (o -= 3) > -1 && O.push(239, 191, 189), (v = u);
          continue;
        }
        u = (((v - 55296) << 10) | (u - 56320)) + 65536;
      } else v && (o -= 3) > -1 && O.push(239, 191, 189);
      if (((v = null), u < 128)) {
        if ((o -= 1) < 0) break;
        O.push(u);
      } else if (u < 2048) {
        if ((o -= 2) < 0) break;
        O.push((u >> 6) | 192, (u & 63) | 128);
      } else if (u < 65536) {
        if ((o -= 3) < 0) break;
        O.push((u >> 12) | 224, ((u >> 6) & 63) | 128, (u & 63) | 128);
      } else if (u < 1114112) {
        if ((o -= 4) < 0) break;
        O.push(
          (u >> 18) | 240,
          ((u >> 12) & 63) | 128,
          ((u >> 6) & 63) | 128,
          (u & 63) | 128,
        );
      } else throw new Error("Invalid code point");
    }
    return O;
  }
  function se(p) {
    for (var o = [], u = 0; u < p.length; ++u) o.push(p.charCodeAt(u) & 255);
    return o;
  }
  function m(p, o) {
    for (var u, g, v, O = [], j = 0; j < p.length && !((o -= 2) < 0); ++j)
      (u = p.charCodeAt(j)), (g = u >> 8), (v = u % 256), O.push(v), O.push(g);
    return O;
  }
  function s(p) {
    return t.toByteArray(we(p));
  }
  function h(p, o, u, g) {
    for (var v = 0; v < g && !(v + u >= o.length || v >= p.length); ++v)
      o[v + u] = p[v];
    return v;
  }
  function E(p, o) {
    return (
      p instanceof o ||
      (p != null &&
        p.constructor != null &&
        p.constructor.name != null &&
        p.constructor.name === o.name)
    );
  }
  function T(p) {
    return p !== p;
  }
  var U = (function () {
    for (var p = "0123456789abcdef", o = new Array(256), u = 0; u < 16; ++u)
      for (var g = u * 16, v = 0; v < 16; ++v) o[g + v] = p[u] + p[v];
    return o;
  })();
})(bn);
var Vo = { exports: {} };
(function (e) {
  (function (t) {
    var r,
      n = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,
      i = Math.ceil,
      a = Math.floor,
      d = "[BigNumber Error] ",
      c = d + "Number primitive has more than 15 significant digits: ",
      w = 1e14,
      x = 14,
      B = 9007199254740991,
      N = [
        1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13,
      ],
      I = 1e7,
      S = 1e9;
    function b(X) {
      var q,
        ee,
        ne,
        J = (_.prototype = { constructor: _, toString: null, valueOf: null }),
        he = new _(1),
        ue = 20,
        R = 4,
        P = -7,
        z = 21,
        M = -1e7,
        G = 1e7,
        Q = !1,
        re = 1,
        ye = 0,
        ae = {
          prefix: "",
          groupSize: 3,
          secondaryGroupSize: 0,
          groupSeparator: ",",
          decimalSeparator: ".",
          fractionGroupSize: 0,
          fractionGroupSeparator: " ",
          suffix: "",
        },
        Y = "0123456789abcdefghijklmnopqrstuvwxyz",
        le = !0;
      function _(m, s) {
        var h,
          E,
          T,
          U,
          p,
          o,
          u,
          g,
          v = this;
        if (!(v instanceof _)) return new _(m, s);
        if (s == null) {
          if (m && m._isBigNumber === !0) {
            (v.s = m.s),
              !m.c || m.e > G
                ? (v.c = v.e = null)
                : m.e < M
                  ? (v.c = [(v.e = 0)])
                  : ((v.e = m.e), (v.c = m.c.slice()));
            return;
          }
          if ((o = typeof m == "number") && m * 0 == 0) {
            if (((v.s = 1 / m < 0 ? ((m = -m), -1) : 1), m === ~~m)) {
              for (U = 0, p = m; p >= 10; p /= 10, U++);
              U > G ? (v.c = v.e = null) : ((v.e = U), (v.c = [m]));
              return;
            }
            g = String(m);
          } else {
            if (!n.test((g = String(m)))) return ne(v, g, o);
            v.s = g.charCodeAt(0) == 45 ? ((g = g.slice(1)), -1) : 1;
          }
          (U = g.indexOf(".")) > -1 && (g = g.replace(".", "")),
            (p = g.search(/e/i)) > 0
              ? (U < 0 && (U = p),
                (U += +g.slice(p + 1)),
                (g = g.substring(0, p)))
              : U < 0 && (U = g.length);
        } else {
          if ((L(s, 2, Y.length, "Base"), s == 10 && le))
            return (v = new _(m)), ie(v, ue + v.e + 1, R);
          if (((g = String(m)), (o = typeof m == "number"))) {
            if (m * 0 != 0) return ne(v, g, o, s);
            if (
              ((v.s = 1 / m < 0 ? ((g = g.slice(1)), -1) : 1),
              _.DEBUG && g.replace(/^0\.0*|\./, "").length > 15)
            )
              throw Error(c + m);
          } else v.s = g.charCodeAt(0) === 45 ? ((g = g.slice(1)), -1) : 1;
          for (h = Y.slice(0, s), U = p = 0, u = g.length; p < u; p++)
            if (h.indexOf((E = g.charAt(p))) < 0) {
              if (E == ".") {
                if (p > U) {
                  U = u;
                  continue;
                }
              } else if (
                !T &&
                ((g == g.toUpperCase() && (g = g.toLowerCase())) ||
                  (g == g.toLowerCase() && (g = g.toUpperCase())))
              ) {
                (T = !0), (p = -1), (U = 0);
                continue;
              }
              return ne(v, String(m), o, s);
            }
          (o = !1),
            (g = ee(g, s, 10, v.s)),
            (U = g.indexOf(".")) > -1
              ? (g = g.replace(".", ""))
              : (U = g.length);
        }
        for (p = 0; g.charCodeAt(p) === 48; p++);
        for (u = g.length; g.charCodeAt(--u) === 48; );
        if ((g = g.slice(p, ++u))) {
          if (((u -= p), o && _.DEBUG && u > 15 && (m > B || m !== a(m))))
            throw Error(c + v.s * m);
          if ((U = U - p - 1) > G) v.c = v.e = null;
          else if (U < M) v.c = [(v.e = 0)];
          else {
            if (
              ((v.e = U),
              (v.c = []),
              (p = (U + 1) % x),
              U < 0 && (p += x),
              p < u)
            ) {
              for (p && v.c.push(+g.slice(0, p)), u -= x; p < u; )
                v.c.push(+g.slice(p, (p += x)));
              p = x - (g = g.slice(p)).length;
            } else p -= u;
            for (; p--; g += "0");
            v.c.push(+g);
          }
        } else v.c = [(v.e = 0)];
      }
      (_.clone = b),
        (_.ROUND_UP = 0),
        (_.ROUND_DOWN = 1),
        (_.ROUND_CEIL = 2),
        (_.ROUND_FLOOR = 3),
        (_.ROUND_HALF_UP = 4),
        (_.ROUND_HALF_DOWN = 5),
        (_.ROUND_HALF_EVEN = 6),
        (_.ROUND_HALF_CEIL = 7),
        (_.ROUND_HALF_FLOOR = 8),
        (_.EUCLID = 9),
        (_.config = _.set =
          function (m) {
            var s, h;
            if (m != null)
              if (typeof m == "object") {
                if (
                  (m.hasOwnProperty((s = "DECIMAL_PLACES")) &&
                    ((h = m[s]), L(h, 0, S, s), (ue = h)),
                  m.hasOwnProperty((s = "ROUNDING_MODE")) &&
                    ((h = m[s]), L(h, 0, 8, s), (R = h)),
                  m.hasOwnProperty((s = "EXPONENTIAL_AT")) &&
                    ((h = m[s]),
                    h && h.pop
                      ? (L(h[0], -S, 0, s),
                        L(h[1], 0, S, s),
                        (P = h[0]),
                        (z = h[1]))
                      : (L(h, -S, S, s), (P = -(z = h < 0 ? -h : h)))),
                  m.hasOwnProperty((s = "RANGE")))
                )
                  if (((h = m[s]), h && h.pop))
                    L(h[0], -S, -1, s),
                      L(h[1], 1, S, s),
                      (M = h[0]),
                      (G = h[1]);
                  else if ((L(h, -S, S, s), h)) M = -(G = h < 0 ? -h : h);
                  else throw Error(d + s + " cannot be zero: " + h);
                if (m.hasOwnProperty((s = "CRYPTO")))
                  if (((h = m[s]), h === !!h))
                    if (h)
                      if (
                        typeof crypto < "u" &&
                        crypto &&
                        (crypto.getRandomValues || crypto.randomBytes)
                      )
                        Q = h;
                      else throw ((Q = !h), Error(d + "crypto unavailable"));
                    else Q = h;
                  else throw Error(d + s + " not true or false: " + h);
                if (
                  (m.hasOwnProperty((s = "MODULO_MODE")) &&
                    ((h = m[s]), L(h, 0, 9, s), (re = h)),
                  m.hasOwnProperty((s = "POW_PRECISION")) &&
                    ((h = m[s]), L(h, 0, S, s), (ye = h)),
                  m.hasOwnProperty((s = "FORMAT")))
                )
                  if (((h = m[s]), typeof h == "object")) ae = h;
                  else throw Error(d + s + " not an object: " + h);
                if (m.hasOwnProperty((s = "ALPHABET")))
                  if (
                    ((h = m[s]),
                    typeof h == "string" && !/^.?$|[+\-.\s]|(.).*\1/.test(h))
                  )
                    (le = h.slice(0, 10) == "0123456789"), (Y = h);
                  else throw Error(d + s + " invalid: " + h);
              } else throw Error(d + "Object expected: " + m);
            return {
              DECIMAL_PLACES: ue,
              ROUNDING_MODE: R,
              EXPONENTIAL_AT: [P, z],
              RANGE: [M, G],
              CRYPTO: Q,
              MODULO_MODE: re,
              POW_PRECISION: ye,
              FORMAT: ae,
              ALPHABET: Y,
            };
          }),
        (_.isBigNumber = function (m) {
          if (!m || m._isBigNumber !== !0) return !1;
          if (!_.DEBUG) return !0;
          var s,
            h,
            E = m.c,
            T = m.e,
            U = m.s;
          e: if ({}.toString.call(E) == "[object Array]") {
            if ((U === 1 || U === -1) && T >= -S && T <= S && T === a(T)) {
              if (E[0] === 0) {
                if (T === 0 && E.length === 1) return !0;
                break e;
              }
              if (
                ((s = (T + 1) % x), s < 1 && (s += x), String(E[0]).length == s)
              ) {
                for (s = 0; s < E.length; s++)
                  if (((h = E[s]), h < 0 || h >= w || h !== a(h))) break e;
                if (h !== 0) return !0;
              }
            }
          } else if (
            E === null &&
            T === null &&
            (U === null || U === 1 || U === -1)
          )
            return !0;
          throw Error(d + "Invalid BigNumber: " + m);
        }),
        (_.maximum = _.max =
          function () {
            return fe(arguments, -1);
          }),
        (_.minimum = _.min =
          function () {
            return fe(arguments, 1);
          }),
        (_.random = (function () {
          var m = 9007199254740992,
            s =
              (Math.random() * m) & 2097151
                ? function () {
                    return a(Math.random() * m);
                  }
                : function () {
                    return (
                      ((Math.random() * 1073741824) | 0) * 8388608 +
                      ((Math.random() * 8388608) | 0)
                    );
                  };
          return function (h) {
            var E,
              T,
              U,
              p,
              o,
              u = 0,
              g = [],
              v = new _(he);
            if ((h == null ? (h = ue) : L(h, 0, S), (p = i(h / x)), Q))
              if (crypto.getRandomValues) {
                for (
                  E = crypto.getRandomValues(new Uint32Array((p *= 2)));
                  u < p;

                )
                  (o = E[u] * 131072 + (E[u + 1] >>> 11)),
                    o >= 9e15
                      ? ((T = crypto.getRandomValues(new Uint32Array(2))),
                        (E[u] = T[0]),
                        (E[u + 1] = T[1]))
                      : (g.push(o % 1e14), (u += 2));
                u = p / 2;
              } else if (crypto.randomBytes) {
                for (E = crypto.randomBytes((p *= 7)); u < p; )
                  (o =
                    (E[u] & 31) * 281474976710656 +
                    E[u + 1] * 1099511627776 +
                    E[u + 2] * 4294967296 +
                    E[u + 3] * 16777216 +
                    (E[u + 4] << 16) +
                    (E[u + 5] << 8) +
                    E[u + 6]),
                    o >= 9e15
                      ? crypto.randomBytes(7).copy(E, u)
                      : (g.push(o % 1e14), (u += 7));
                u = p / 7;
              } else throw ((Q = !1), Error(d + "crypto unavailable"));
            if (!Q) for (; u < p; ) (o = s()), o < 9e15 && (g[u++] = o % 1e14);
            for (
              p = g[--u],
                h %= x,
                p && h && ((o = N[x - h]), (g[u] = a(p / o) * o));
              g[u] === 0;
              g.pop(), u--
            );
            if (u < 0) g = [(U = 0)];
            else {
              for (U = -1; g[0] === 0; g.splice(0, 1), U -= x);
              for (u = 1, o = g[0]; o >= 10; o /= 10, u++);
              u < x && (U -= x - u);
            }
            return (v.e = U), (v.c = g), v;
          };
        })()),
        (_.sum = function () {
          for (var m = 1, s = arguments, h = new _(s[0]); m < s.length; )
            h = h.plus(s[m++]);
          return h;
        }),
        (ee = (function () {
          var m = "0123456789";
          function s(h, E, T, U) {
            for (var p, o = [0], u, g = 0, v = h.length; g < v; ) {
              for (u = o.length; u--; o[u] *= E);
              for (o[0] += U.indexOf(h.charAt(g++)), p = 0; p < o.length; p++)
                o[p] > T - 1 &&
                  (o[p + 1] == null && (o[p + 1] = 0),
                  (o[p + 1] += (o[p] / T) | 0),
                  (o[p] %= T));
            }
            return o.reverse();
          }
          return function (h, E, T, U, p) {
            var o,
              u,
              g,
              v,
              O,
              j,
              Z,
              ce,
              de = h.indexOf("."),
              me = ue,
              y = R;
            for (
              de >= 0 &&
                ((v = ye),
                (ye = 0),
                (h = h.replace(".", "")),
                (ce = new _(E)),
                (j = ce.pow(h.length - de)),
                (ye = v),
                (ce.c = s($(V(j.c), j.e, "0"), 10, T, m)),
                (ce.e = ce.c.length)),
                Z = s(h, E, T, p ? ((o = Y), m) : ((o = m), Y)),
                g = v = Z.length;
              Z[--v] == 0;
              Z.pop()
            );
            if (!Z[0]) return o.charAt(0);
            if (
              (de < 0
                ? --g
                : ((j.c = Z),
                  (j.e = g),
                  (j.s = U),
                  (j = q(j, ce, me, y, T)),
                  (Z = j.c),
                  (O = j.r),
                  (g = j.e)),
              (u = g + me + 1),
              (de = Z[u]),
              (v = T / 2),
              (O = O || u < 0 || Z[u + 1] != null),
              (O =
                y < 4
                  ? (de != null || O) && (y == 0 || y == (j.s < 0 ? 3 : 2))
                  : de > v ||
                    (de == v &&
                      (y == 4 ||
                        O ||
                        (y == 6 && Z[u - 1] & 1) ||
                        y == (j.s < 0 ? 8 : 7)))),
              u < 1 || !Z[0])
            )
              h = O ? $(o.charAt(1), -me, o.charAt(0)) : o.charAt(0);
            else {
              if (((Z.length = u), O))
                for (--T; ++Z[--u] > T; )
                  (Z[u] = 0), u || (++g, (Z = [1].concat(Z)));
              for (v = Z.length; !Z[--v]; );
              for (de = 0, h = ""; de <= v; h += o.charAt(Z[de++]));
              h = $(h, g, o.charAt(0));
            }
            return h;
          };
        })()),
        (q = (function () {
          function m(E, T, U) {
            var p,
              o,
              u,
              g,
              v = 0,
              O = E.length,
              j = T % I,
              Z = (T / I) | 0;
            for (E = E.slice(); O--; )
              (u = E[O] % I),
                (g = (E[O] / I) | 0),
                (p = Z * u + g * j),
                (o = j * u + (p % I) * I + v),
                (v = ((o / U) | 0) + ((p / I) | 0) + Z * g),
                (E[O] = o % U);
            return v && (E = [v].concat(E)), E;
          }
          function s(E, T, U, p) {
            var o, u;
            if (U != p) u = U > p ? 1 : -1;
            else
              for (o = u = 0; o < U; o++)
                if (E[o] != T[o]) {
                  u = E[o] > T[o] ? 1 : -1;
                  break;
                }
            return u;
          }
          function h(E, T, U, p) {
            for (var o = 0; U--; )
              (E[U] -= o),
                (o = E[U] < T[U] ? 1 : 0),
                (E[U] = o * p + E[U] - T[U]);
            for (; !E[0] && E.length > 1; E.splice(0, 1));
          }
          return function (E, T, U, p, o) {
            var u,
              g,
              v,
              O,
              j,
              Z,
              ce,
              de,
              me,
              y,
              f,
              l,
              A,
              k,
              D,
              H,
              _e,
              Be = E.s == T.s ? 1 : -1,
              Ee = E.c,
              xe = T.c;
            if (!Ee || !Ee[0] || !xe || !xe[0])
              return new _(
                !E.s || !T.s || (Ee ? xe && Ee[0] == xe[0] : !xe)
                  ? NaN
                  : (Ee && Ee[0] == 0) || !xe
                    ? Be * 0
                    : Be / 0,
              );
            for (
              de = new _(Be),
                me = de.c = [],
                g = E.e - T.e,
                Be = U + g + 1,
                o ||
                  ((o = w), (g = C(E.e / x) - C(T.e / x)), (Be = (Be / x) | 0)),
                v = 0;
              xe[v] == (Ee[v] || 0);
              v++
            );
            if ((xe[v] > (Ee[v] || 0) && g--, Be < 0)) me.push(1), (O = !0);
            else {
              for (
                k = Ee.length,
                  H = xe.length,
                  v = 0,
                  Be += 2,
                  j = a(o / (xe[0] + 1)),
                  j > 1 &&
                    ((xe = m(xe, j, o)),
                    (Ee = m(Ee, j, o)),
                    (H = xe.length),
                    (k = Ee.length)),
                  A = H,
                  y = Ee.slice(0, H),
                  f = y.length;
                f < H;
                y[f++] = 0
              );
              (_e = xe.slice()),
                (_e = [0].concat(_e)),
                (D = xe[0]),
                xe[1] >= o / 2 && D++;
              do {
                if (((j = 0), (u = s(xe, y, H, f)), u < 0)) {
                  if (
                    ((l = y[0]),
                    H != f && (l = l * o + (y[1] || 0)),
                    (j = a(l / D)),
                    j > 1)
                  )
                    for (
                      j >= o && (j = o - 1),
                        Z = m(xe, j, o),
                        ce = Z.length,
                        f = y.length;
                      s(Z, y, ce, f) == 1;

                    )
                      j--,
                        h(Z, H < ce ? _e : xe, ce, o),
                        (ce = Z.length),
                        (u = 1);
                  else j == 0 && (u = j = 1), (Z = xe.slice()), (ce = Z.length);
                  if (
                    (ce < f && (Z = [0].concat(Z)),
                    h(y, Z, f, o),
                    (f = y.length),
                    u == -1)
                  )
                    for (; s(xe, y, H, f) < 1; )
                      j++, h(y, H < f ? _e : xe, f, o), (f = y.length);
                } else u === 0 && (j++, (y = [0]));
                (me[v++] = j),
                  y[0] ? (y[f++] = Ee[A] || 0) : ((y = [Ee[A]]), (f = 1));
              } while ((A++ < k || y[0] != null) && Be--);
              (O = y[0] != null), me[0] || me.splice(0, 1);
            }
            if (o == w) {
              for (v = 1, Be = me[0]; Be >= 10; Be /= 10, v++);
              ie(de, U + (de.e = v + g * x - 1) + 1, p, O);
            } else (de.e = g), (de.r = +O);
            return de;
          };
        })());
      function oe(m, s, h, E) {
        var T, U, p, o, u;
        if ((h == null ? (h = R) : L(h, 0, 8), !m.c)) return m.toString();
        if (((T = m.c[0]), (p = m.e), s == null))
          (u = V(m.c)),
            (u =
              E == 1 || (E == 2 && (p <= P || p >= z))
                ? te(u, p)
                : $(u, p, "0"));
        else if (
          ((m = ie(new _(m), s, h)),
          (U = m.e),
          (u = V(m.c)),
          (o = u.length),
          E == 1 || (E == 2 && (s <= U || U <= P)))
        ) {
          for (; o < s; u += "0", o++);
          u = te(u, U);
        } else if (((s -= p), (u = $(u, U, "0")), U + 1 > o)) {
          if (--s > 0) for (u += "."; s--; u += "0");
        } else if (((s += U - o), s > 0))
          for (U + 1 == o && (u += "."); s--; u += "0");
        return m.s < 0 && T ? "-" + u : u;
      }
      function fe(m, s) {
        for (var h, E, T = 1, U = new _(m[0]); T < m.length; T++)
          (E = new _(m[T])),
            (!E.s || (h = K(U, E)) === s || (h === 0 && U.s === s)) && (U = E);
        return U;
      }
      function we(m, s, h) {
        for (var E = 1, T = s.length; !s[--T]; s.pop());
        for (T = s[0]; T >= 10; T /= 10, E++);
        return (
          (h = E + h * x - 1) > G
            ? (m.c = m.e = null)
            : h < M
              ? (m.c = [(m.e = 0)])
              : ((m.e = h), (m.c = s)),
          m
        );
      }
      ne = (function () {
        var m = /^(-?)0([xbo])(?=\w[\w.]*$)/i,
          s = /^([^.]+)\.$/,
          h = /^\.([^.]+)$/,
          E = /^-?(Infinity|NaN)$/,
          T = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
        return function (U, p, o, u) {
          var g,
            v = o ? p : p.replace(T, "");
          if (E.test(v)) U.s = isNaN(v) ? null : v < 0 ? -1 : 1;
          else {
            if (
              !o &&
              ((v = v.replace(m, function (O, j, Z) {
                return (
                  (g = (Z = Z.toLowerCase()) == "x" ? 16 : Z == "b" ? 2 : 8),
                  !u || u == g ? j : O
                );
              })),
              u && ((g = u), (v = v.replace(s, "$1").replace(h, "0.$1"))),
              p != v)
            )
              return new _(v, g);
            if (_.DEBUG)
              throw Error(
                d + "Not a" + (u ? " base " + u : "") + " number: " + p,
              );
            U.s = null;
          }
          U.c = U.e = null;
        };
      })();
      function ie(m, s, h, E) {
        var T,
          U,
          p,
          o,
          u,
          g,
          v,
          O = m.c,
          j = N;
        if (O) {
          e: {
            for (T = 1, o = O[0]; o >= 10; o /= 10, T++);
            if (((U = s - T), U < 0))
              (U += x),
                (p = s),
                (u = O[(g = 0)]),
                (v = a((u / j[T - p - 1]) % 10));
            else if (((g = i((U + 1) / x)), g >= O.length))
              if (E) {
                for (; O.length <= g; O.push(0));
                (u = v = 0), (T = 1), (U %= x), (p = U - x + 1);
              } else break e;
            else {
              for (u = o = O[g], T = 1; o >= 10; o /= 10, T++);
              (U %= x),
                (p = U - x + T),
                (v = p < 0 ? 0 : a((u / j[T - p - 1]) % 10));
            }
            if (
              ((E =
                E ||
                s < 0 ||
                O[g + 1] != null ||
                (p < 0 ? u : u % j[T - p - 1])),
              (E =
                h < 4
                  ? (v || E) && (h == 0 || h == (m.s < 0 ? 3 : 2))
                  : v > 5 ||
                    (v == 5 &&
                      (h == 4 ||
                        E ||
                        (h == 6 &&
                          (U > 0 ? (p > 0 ? u / j[T - p] : 0) : O[g - 1]) % 10 &
                            1) ||
                        h == (m.s < 0 ? 8 : 7)))),
              s < 1 || !O[0])
            )
              return (
                (O.length = 0),
                E
                  ? ((s -= m.e + 1),
                    (O[0] = j[(x - (s % x)) % x]),
                    (m.e = -s || 0))
                  : (O[0] = m.e = 0),
                m
              );
            if (
              (U == 0
                ? ((O.length = g), (o = 1), g--)
                : ((O.length = g + 1),
                  (o = j[x - U]),
                  (O[g] = p > 0 ? a((u / j[T - p]) % j[p]) * o : 0)),
              E)
            )
              for (;;)
                if (g == 0) {
                  for (U = 1, p = O[0]; p >= 10; p /= 10, U++);
                  for (p = O[0] += o, o = 1; p >= 10; p /= 10, o++);
                  U != o && (m.e++, O[0] == w && (O[0] = 1));
                  break;
                } else {
                  if (((O[g] += o), O[g] != w)) break;
                  (O[g--] = 0), (o = 1);
                }
            for (U = O.length; O[--U] === 0; O.pop());
          }
          m.e > G ? (m.c = m.e = null) : m.e < M && (m.c = [(m.e = 0)]);
        }
        return m;
      }
      function se(m) {
        var s,
          h = m.e;
        return h === null
          ? m.toString()
          : ((s = V(m.c)),
            (s = h <= P || h >= z ? te(s, h) : $(s, h, "0")),
            m.s < 0 ? "-" + s : s);
      }
      return (
        (J.absoluteValue = J.abs =
          function () {
            var m = new _(this);
            return m.s < 0 && (m.s = 1), m;
          }),
        (J.comparedTo = function (m, s) {
          return K(this, new _(m, s));
        }),
        (J.decimalPlaces = J.dp =
          function (m, s) {
            var h,
              E,
              T,
              U = this;
            if (m != null)
              return (
                L(m, 0, S),
                s == null ? (s = R) : L(s, 0, 8),
                ie(new _(U), m + U.e + 1, s)
              );
            if (!(h = U.c)) return null;
            if (((E = ((T = h.length - 1) - C(this.e / x)) * x), (T = h[T])))
              for (; T % 10 == 0; T /= 10, E--);
            return E < 0 && (E = 0), E;
          }),
        (J.dividedBy = J.div =
          function (m, s) {
            return q(this, new _(m, s), ue, R);
          }),
        (J.dividedToIntegerBy = J.idiv =
          function (m, s) {
            return q(this, new _(m, s), 0, 1);
          }),
        (J.exponentiatedBy = J.pow =
          function (m, s) {
            var h,
              E,
              T,
              U,
              p,
              o,
              u,
              g,
              v,
              O = this;
            if (((m = new _(m)), m.c && !m.isInteger()))
              throw Error(d + "Exponent not an integer: " + se(m));
            if (
              (s != null && (s = new _(s)),
              (o = m.e > 14),
              !O.c ||
                !O.c[0] ||
                (O.c[0] == 1 && !O.e && O.c.length == 1) ||
                !m.c ||
                !m.c[0])
            )
              return (
                (v = new _(Math.pow(+se(O), o ? m.s * (2 - W(m)) : +se(m)))),
                s ? v.mod(s) : v
              );
            if (((u = m.s < 0), s)) {
              if (s.c ? !s.c[0] : !s.s) return new _(NaN);
              (E = !u && O.isInteger() && s.isInteger()), E && (O = O.mod(s));
            } else {
              if (
                m.e > 9 &&
                (O.e > 0 ||
                  O.e < -1 ||
                  (O.e == 0
                    ? O.c[0] > 1 || (o && O.c[1] >= 24e7)
                    : O.c[0] < 8e13 || (o && O.c[0] <= 9999975e7)))
              )
                return (
                  (U = O.s < 0 && W(m) ? -0 : 0),
                  O.e > -1 && (U = 1 / U),
                  new _(u ? 1 / U : U)
                );
              ye && (U = i(ye / x + 2));
            }
            for (
              o
                ? ((h = new _(0.5)), u && (m.s = 1), (g = W(m)))
                : ((T = Math.abs(+se(m))), (g = T % 2)),
                v = new _(he);
              ;

            ) {
              if (g) {
                if (((v = v.times(O)), !v.c)) break;
                U ? v.c.length > U && (v.c.length = U) : E && (v = v.mod(s));
              }
              if (T) {
                if (((T = a(T / 2)), T === 0)) break;
                g = T % 2;
              } else if (((m = m.times(h)), ie(m, m.e + 1, 1), m.e > 14))
                g = W(m);
              else {
                if (((T = +se(m)), T === 0)) break;
                g = T % 2;
              }
              (O = O.times(O)),
                U
                  ? O.c && O.c.length > U && (O.c.length = U)
                  : E && (O = O.mod(s));
            }
            return E
              ? v
              : (u && (v = he.div(v)), s ? v.mod(s) : U ? ie(v, ye, R, p) : v);
          }),
        (J.integerValue = function (m) {
          var s = new _(this);
          return m == null ? (m = R) : L(m, 0, 8), ie(s, s.e + 1, m);
        }),
        (J.isEqualTo = J.eq =
          function (m, s) {
            return K(this, new _(m, s)) === 0;
          }),
        (J.isFinite = function () {
          return !!this.c;
        }),
        (J.isGreaterThan = J.gt =
          function (m, s) {
            return K(this, new _(m, s)) > 0;
          }),
        (J.isGreaterThanOrEqualTo = J.gte =
          function (m, s) {
            return (s = K(this, new _(m, s))) === 1 || s === 0;
          }),
        (J.isInteger = function () {
          return !!this.c && C(this.e / x) > this.c.length - 2;
        }),
        (J.isLessThan = J.lt =
          function (m, s) {
            return K(this, new _(m, s)) < 0;
          }),
        (J.isLessThanOrEqualTo = J.lte =
          function (m, s) {
            return (s = K(this, new _(m, s))) === -1 || s === 0;
          }),
        (J.isNaN = function () {
          return !this.s;
        }),
        (J.isNegative = function () {
          return this.s < 0;
        }),
        (J.isPositive = function () {
          return this.s > 0;
        }),
        (J.isZero = function () {
          return !!this.c && this.c[0] == 0;
        }),
        (J.minus = function (m, s) {
          var h,
            E,
            T,
            U,
            p = this,
            o = p.s;
          if (((m = new _(m, s)), (s = m.s), !o || !s)) return new _(NaN);
          if (o != s) return (m.s = -s), p.plus(m);
          var u = p.e / x,
            g = m.e / x,
            v = p.c,
            O = m.c;
          if (!u || !g) {
            if (!v || !O) return v ? ((m.s = -s), m) : new _(O ? p : NaN);
            if (!v[0] || !O[0])
              return O[0] ? ((m.s = -s), m) : new _(v[0] ? p : R == 3 ? -0 : 0);
          }
          if (((u = C(u)), (g = C(g)), (v = v.slice()), (o = u - g))) {
            for (
              (U = o < 0) ? ((o = -o), (T = v)) : ((g = u), (T = O)),
                T.reverse(),
                s = o;
              s--;
              T.push(0)
            );
            T.reverse();
          } else
            for (
              E = (U = (o = v.length) < (s = O.length)) ? o : s, o = s = 0;
              s < E;
              s++
            )
              if (v[s] != O[s]) {
                U = v[s] < O[s];
                break;
              }
          if (
            (U && ((T = v), (v = O), (O = T), (m.s = -m.s)),
            (s = (E = O.length) - (h = v.length)),
            s > 0)
          )
            for (; s--; v[h++] = 0);
          for (s = w - 1; E > o; ) {
            if (v[--E] < O[E]) {
              for (h = E; h && !v[--h]; v[h] = s);
              --v[h], (v[E] += w);
            }
            v[E] -= O[E];
          }
          for (; v[0] == 0; v.splice(0, 1), --g);
          return v[0]
            ? we(m, v, g)
            : ((m.s = R == 3 ? -1 : 1), (m.c = [(m.e = 0)]), m);
        }),
        (J.modulo = J.mod =
          function (m, s) {
            var h,
              E,
              T = this;
            return (
              (m = new _(m, s)),
              !T.c || !m.s || (m.c && !m.c[0])
                ? new _(NaN)
                : !m.c || (T.c && !T.c[0])
                  ? new _(T)
                  : (re == 9
                      ? ((E = m.s),
                        (m.s = 1),
                        (h = q(T, m, 0, 3)),
                        (m.s = E),
                        (h.s *= E))
                      : (h = q(T, m, 0, re)),
                    (m = T.minus(h.times(m))),
                    !m.c[0] && re == 1 && (m.s = T.s),
                    m)
            );
          }),
        (J.multipliedBy = J.times =
          function (m, s) {
            var h,
              E,
              T,
              U,
              p,
              o,
              u,
              g,
              v,
              O,
              j,
              Z,
              ce,
              de,
              me,
              y = this,
              f = y.c,
              l = (m = new _(m, s)).c;
            if (!f || !l || !f[0] || !l[0])
              return (
                !y.s || !m.s || (f && !f[0] && !l) || (l && !l[0] && !f)
                  ? (m.c = m.e = m.s = null)
                  : ((m.s *= y.s),
                    !f || !l ? (m.c = m.e = null) : ((m.c = [0]), (m.e = 0))),
                m
              );
            for (
              E = C(y.e / x) + C(m.e / x),
                m.s *= y.s,
                u = f.length,
                O = l.length,
                u < O &&
                  ((ce = f), (f = l), (l = ce), (T = u), (u = O), (O = T)),
                T = u + O,
                ce = [];
              T--;
              ce.push(0)
            );
            for (de = w, me = I, T = O; --T >= 0; ) {
              for (
                h = 0, j = l[T] % me, Z = (l[T] / me) | 0, p = u, U = T + p;
                U > T;

              )
                (g = f[--p] % me),
                  (v = (f[p] / me) | 0),
                  (o = Z * g + v * j),
                  (g = j * g + (o % me) * me + ce[U] + h),
                  (h = ((g / de) | 0) + ((o / me) | 0) + Z * v),
                  (ce[U--] = g % de);
              ce[U] = h;
            }
            return h ? ++E : ce.splice(0, 1), we(m, ce, E);
          }),
        (J.negated = function () {
          var m = new _(this);
          return (m.s = -m.s || null), m;
        }),
        (J.plus = function (m, s) {
          var h,
            E = this,
            T = E.s;
          if (((m = new _(m, s)), (s = m.s), !T || !s)) return new _(NaN);
          if (T != s) return (m.s = -s), E.minus(m);
          var U = E.e / x,
            p = m.e / x,
            o = E.c,
            u = m.c;
          if (!U || !p) {
            if (!o || !u) return new _(T / 0);
            if (!o[0] || !u[0]) return u[0] ? m : new _(o[0] ? E : T * 0);
          }
          if (((U = C(U)), (p = C(p)), (o = o.slice()), (T = U - p))) {
            for (
              T > 0 ? ((p = U), (h = u)) : ((T = -T), (h = o)), h.reverse();
              T--;
              h.push(0)
            );
            h.reverse();
          }
          for (
            T = o.length,
              s = u.length,
              T - s < 0 && ((h = u), (u = o), (o = h), (s = T)),
              T = 0;
            s;

          )
            (T = ((o[--s] = o[s] + u[s] + T) / w) | 0),
              (o[s] = w === o[s] ? 0 : o[s] % w);
          return T && ((o = [T].concat(o)), ++p), we(m, o, p);
        }),
        (J.precision = J.sd =
          function (m, s) {
            var h,
              E,
              T,
              U = this;
            if (m != null && m !== !!m)
              return (
                L(m, 1, S), s == null ? (s = R) : L(s, 0, 8), ie(new _(U), m, s)
              );
            if (!(h = U.c)) return null;
            if (((T = h.length - 1), (E = T * x + 1), (T = h[T]))) {
              for (; T % 10 == 0; T /= 10, E--);
              for (T = h[0]; T >= 10; T /= 10, E++);
            }
            return m && U.e + 1 > E && (E = U.e + 1), E;
          }),
        (J.shiftedBy = function (m) {
          return L(m, -B, B), this.times("1e" + m);
        }),
        (J.squareRoot = J.sqrt =
          function () {
            var m,
              s,
              h,
              E,
              T,
              U = this,
              p = U.c,
              o = U.s,
              u = U.e,
              g = ue + 4,
              v = new _("0.5");
            if (o !== 1 || !p || !p[0])
              return new _(!o || (o < 0 && (!p || p[0])) ? NaN : p ? U : 1 / 0);
            if (
              ((o = Math.sqrt(+se(U))),
              o == 0 || o == 1 / 0
                ? ((s = V(p)),
                  (s.length + u) % 2 == 0 && (s += "0"),
                  (o = Math.sqrt(+s)),
                  (u = C((u + 1) / 2) - (u < 0 || u % 2)),
                  o == 1 / 0
                    ? (s = "5e" + u)
                    : ((s = o.toExponential()),
                      (s = s.slice(0, s.indexOf("e") + 1) + u)),
                  (h = new _(s)))
                : (h = new _(o + "")),
              h.c[0])
            ) {
              for (u = h.e, o = u + g, o < 3 && (o = 0); ; )
                if (
                  ((T = h),
                  (h = v.times(T.plus(q(U, T, g, 1)))),
                  V(T.c).slice(0, o) === (s = V(h.c)).slice(0, o))
                )
                  if (
                    (h.e < u && --o,
                    (s = s.slice(o - 3, o + 1)),
                    s == "9999" || (!E && s == "4999"))
                  ) {
                    if (!E && (ie(T, T.e + ue + 2, 0), T.times(T).eq(U))) {
                      h = T;
                      break;
                    }
                    (g += 4), (o += 4), (E = 1);
                  } else {
                    (!+s || (!+s.slice(1) && s.charAt(0) == "5")) &&
                      (ie(h, h.e + ue + 2, 1), (m = !h.times(h).eq(U)));
                    break;
                  }
            }
            return ie(h, h.e + ue + 1, R, m);
          }),
        (J.toExponential = function (m, s) {
          return m != null && (L(m, 0, S), m++), oe(this, m, s, 1);
        }),
        (J.toFixed = function (m, s) {
          return (
            m != null && (L(m, 0, S), (m = m + this.e + 1)), oe(this, m, s)
          );
        }),
        (J.toFormat = function (m, s, h) {
          var E,
            T = this;
          if (h == null)
            m != null && s && typeof s == "object"
              ? ((h = s), (s = null))
              : m && typeof m == "object"
                ? ((h = m), (m = s = null))
                : (h = ae);
          else if (typeof h != "object")
            throw Error(d + "Argument not an object: " + h);
          if (((E = T.toFixed(m, s)), T.c)) {
            var U,
              p = E.split("."),
              o = +h.groupSize,
              u = +h.secondaryGroupSize,
              g = h.groupSeparator || "",
              v = p[0],
              O = p[1],
              j = T.s < 0,
              Z = j ? v.slice(1) : v,
              ce = Z.length;
            if (
              (u && ((U = o), (o = u), (u = U), (ce -= U)), o > 0 && ce > 0)
            ) {
              for (U = ce % o || o, v = Z.substr(0, U); U < ce; U += o)
                v += g + Z.substr(U, o);
              u > 0 && (v += g + Z.slice(U)), j && (v = "-" + v);
            }
            E = O
              ? v +
                (h.decimalSeparator || "") +
                ((u = +h.fractionGroupSize)
                  ? O.replace(
                      new RegExp("\\d{" + u + "}\\B", "g"),
                      "$&" + (h.fractionGroupSeparator || ""),
                    )
                  : O)
              : v;
          }
          return (h.prefix || "") + E + (h.suffix || "");
        }),
        (J.toFraction = function (m) {
          var s,
            h,
            E,
            T,
            U,
            p,
            o,
            u,
            g,
            v,
            O,
            j,
            Z = this,
            ce = Z.c;
          if (
            m != null &&
            ((o = new _(m)), (!o.isInteger() && (o.c || o.s !== 1)) || o.lt(he))
          )
            throw Error(
              d +
                "Argument " +
                (o.isInteger() ? "out of range: " : "not an integer: ") +
                se(o),
            );
          if (!ce) return new _(Z);
          for (
            s = new _(he),
              g = h = new _(he),
              E = u = new _(he),
              j = V(ce),
              U = s.e = j.length - Z.e - 1,
              s.c[0] = N[(p = U % x) < 0 ? x + p : p],
              m = !m || o.comparedTo(s) > 0 ? (U > 0 ? s : g) : o,
              p = G,
              G = 1 / 0,
              o = new _(j),
              u.c[0] = 0;
            (v = q(o, s, 0, 1)), (T = h.plus(v.times(E))), T.comparedTo(m) != 1;

          )
            (h = E),
              (E = T),
              (g = u.plus(v.times((T = g)))),
              (u = T),
              (s = o.minus(v.times((T = s)))),
              (o = T);
          return (
            (T = q(m.minus(h), E, 0, 1)),
            (u = u.plus(T.times(g))),
            (h = h.plus(T.times(E))),
            (u.s = g.s = Z.s),
            (U = U * 2),
            (O =
              q(g, E, U, R)
                .minus(Z)
                .abs()
                .comparedTo(q(u, h, U, R).minus(Z).abs()) < 1
                ? [g, E]
                : [u, h]),
            (G = p),
            O
          );
        }),
        (J.toNumber = function () {
          return +se(this);
        }),
        (J.toPrecision = function (m, s) {
          return m != null && L(m, 1, S), oe(this, m, s, 2);
        }),
        (J.toString = function (m) {
          var s,
            h = this,
            E = h.s,
            T = h.e;
          return (
            T === null
              ? E
                ? ((s = "Infinity"), E < 0 && (s = "-" + s))
                : (s = "NaN")
              : (m == null
                  ? (s = T <= P || T >= z ? te(V(h.c), T) : $(V(h.c), T, "0"))
                  : m === 10 && le
                    ? ((h = ie(new _(h), ue + T + 1, R)),
                      (s = $(V(h.c), h.e, "0")))
                    : (L(m, 2, Y.length, "Base"),
                      (s = ee($(V(h.c), T, "0"), 10, m, E, !0))),
                E < 0 && h.c[0] && (s = "-" + s)),
            s
          );
        }),
        (J.valueOf = J.toJSON =
          function () {
            return se(this);
          }),
        (J._isBigNumber = !0),
        X != null && _.set(X),
        _
      );
    }
    function C(X) {
      var q = X | 0;
      return X > 0 || X === q ? q : q - 1;
    }
    function V(X) {
      for (var q, ee, ne = 1, J = X.length, he = X[0] + ""; ne < J; ) {
        for (q = X[ne++] + "", ee = x - q.length; ee--; q = "0" + q);
        he += q;
      }
      for (J = he.length; he.charCodeAt(--J) === 48; );
      return he.slice(0, J + 1 || 1);
    }
    function K(X, q) {
      var ee,
        ne,
        J = X.c,
        he = q.c,
        ue = X.s,
        R = q.s,
        P = X.e,
        z = q.e;
      if (!ue || !R) return null;
      if (((ee = J && !J[0]), (ne = he && !he[0]), ee || ne))
        return ee ? (ne ? 0 : -R) : ue;
      if (ue != R) return ue;
      if (((ee = ue < 0), (ne = P == z), !J || !he))
        return ne ? 0 : !J ^ ee ? 1 : -1;
      if (!ne) return (P > z) ^ ee ? 1 : -1;
      for (R = (P = J.length) < (z = he.length) ? P : z, ue = 0; ue < R; ue++)
        if (J[ue] != he[ue]) return (J[ue] > he[ue]) ^ ee ? 1 : -1;
      return P == z ? 0 : (P > z) ^ ee ? 1 : -1;
    }
    function L(X, q, ee, ne) {
      if (X < q || X > ee || X !== a(X))
        throw Error(
          d +
            (ne || "Argument") +
            (typeof X == "number"
              ? X < q || X > ee
                ? " out of range: "
                : " not an integer: "
              : " not a primitive number: ") +
            String(X),
        );
    }
    function W(X) {
      var q = X.c.length - 1;
      return C(X.e / x) == q && X.c[q] % 2 != 0;
    }
    function te(X, q) {
      return (
        (X.length > 1 ? X.charAt(0) + "." + X.slice(1) : X) +
        (q < 0 ? "e" : "e+") +
        q
      );
    }
    function $(X, q, ee) {
      var ne, J;
      if (q < 0) {
        for (J = ee + "."; ++q; J += ee);
        X = J + X;
      } else if (((ne = X.length), ++q > ne)) {
        for (J = ee, q -= ne; --q; J += ee);
        X += J;
      } else q < ne && (X = X.slice(0, q) + "." + X.slice(q));
      return X;
    }
    (r = b()),
      (r.default = r.BigNumber = r),
      e.exports
        ? (e.exports = r)
        : (t || (t = typeof self < "u" && self ? self : window),
          (t.BigNumber = r));
  })(Vr);
})(Vo);
var Ni = Vo.exports,
  gf = function (t, r, n) {
    var i = new t.Uint8Array(n),
      a = r.pushInt,
      d = r.pushInt32,
      c = r.pushInt32Neg,
      w = r.pushInt64,
      x = r.pushInt64Neg,
      B = r.pushFloat,
      N = r.pushFloatSingle,
      I = r.pushFloatDouble,
      S = r.pushTrue,
      b = r.pushFalse,
      C = r.pushUndefined,
      V = r.pushNull,
      K = r.pushInfinity,
      L = r.pushInfinityNeg,
      W = r.pushNaN,
      te = r.pushNaNNeg,
      $ = r.pushArrayStart,
      X = r.pushArrayStartFixed,
      q = r.pushArrayStartFixed32,
      ee = r.pushArrayStartFixed64,
      ne = r.pushObjectStart,
      J = r.pushObjectStartFixed,
      he = r.pushObjectStartFixed32,
      ue = r.pushObjectStartFixed64,
      R = r.pushByteString,
      P = r.pushByteStringStart,
      z = r.pushUtf8String,
      M = r.pushUtf8StringStart,
      G = r.pushSimpleUnassigned,
      Q = r.pushTagStart,
      re = r.pushTagStart4,
      ye = r.pushTagStart8,
      ae = r.pushTagUnassigned,
      Y = r.pushBreak,
      le = t.Math.pow,
      _ = 0,
      oe = 0,
      fe = 0;
    function we(F) {
      for (
        F = F | 0, _ = 0, oe = F;
        (_ | 0) < (oe | 0) &&
        ((fe = xu[i[_] & 255](i[_] | 0) | 0), !((fe | 0) > 0));

      );
      return fe | 0;
    }
    function ie(F) {
      return (F = F | 0), (((_ | 0) + (F | 0)) | 0) < (oe | 0) ? 0 : 1;
    }
    function se(F) {
      return (F = F | 0), (i[F | 0] << 8) | i[(F + 1) | 0] | 0;
    }
    function m(F) {
      return (
        (F = F | 0),
        (i[F | 0] << 24) |
          (i[(F + 1) | 0] << 16) |
          (i[(F + 2) | 0] << 8) |
          i[(F + 3) | 0] |
          0
      );
    }
    function s(F) {
      return (F = F | 0), a(F | 0), (_ = (_ + 1) | 0), 0;
    }
    function h(F) {
      return (
        (F = F | 0),
        ie(1) | 0 ? 1 : (a(i[(_ + 1) | 0] | 0), (_ = (_ + 2) | 0), 0)
      );
    }
    function E(F) {
      return (
        (F = F | 0),
        ie(2) | 0 ? 1 : (a(se((_ + 1) | 0) | 0), (_ = (_ + 3) | 0), 0)
      );
    }
    function T(F) {
      return (
        (F = F | 0),
        ie(4) | 0
          ? 1
          : (d(se((_ + 1) | 0) | 0, se((_ + 3) | 0) | 0), (_ = (_ + 5) | 0), 0)
      );
    }
    function U(F) {
      return (
        (F = F | 0),
        ie(8) | 0
          ? 1
          : (w(
              se((_ + 1) | 0) | 0,
              se((_ + 3) | 0) | 0,
              se((_ + 5) | 0) | 0,
              se((_ + 7) | 0) | 0,
            ),
            (_ = (_ + 9) | 0),
            0)
      );
    }
    function p(F) {
      return (F = F | 0), a((-1 - ((F - 32) | 0)) | 0), (_ = (_ + 1) | 0), 0;
    }
    function o(F) {
      return (
        (F = F | 0),
        ie(1) | 0
          ? 1
          : (a((-1 - (i[(_ + 1) | 0] | 0)) | 0), (_ = (_ + 2) | 0), 0)
      );
    }
    function u(F) {
      F = F | 0;
      var Ie = 0;
      return ie(2) | 0
        ? 1
        : ((Ie = se((_ + 1) | 0) | 0),
          a((-1 - (Ie | 0)) | 0),
          (_ = (_ + 3) | 0),
          0);
    }
    function g(F) {
      return (
        (F = F | 0),
        ie(4) | 0
          ? 1
          : (c(se((_ + 1) | 0) | 0, se((_ + 3) | 0) | 0), (_ = (_ + 5) | 0), 0)
      );
    }
    function v(F) {
      return (
        (F = F | 0),
        ie(8) | 0
          ? 1
          : (x(
              se((_ + 1) | 0) | 0,
              se((_ + 3) | 0) | 0,
              se((_ + 5) | 0) | 0,
              se((_ + 7) | 0) | 0,
            ),
            (_ = (_ + 9) | 0),
            0)
      );
    }
    function O(F) {
      F = F | 0;
      var Ie = 0,
        Se = 0,
        Ae = 0;
      return (
        (Ae = (F - 64) | 0),
        ie(Ae | 0) | 0
          ? 1
          : ((Ie = (_ + 1) | 0),
            (Se = (((_ + 1) | 0) + (Ae | 0)) | 0),
            R(Ie | 0, Se | 0),
            (_ = Se | 0),
            0)
      );
    }
    function j(F) {
      F = F | 0;
      var Ie = 0,
        Se = 0,
        Ae = 0;
      return ie(1) | 0 ||
        ((Ae = i[(_ + 1) | 0] | 0),
        (Ie = (_ + 2) | 0),
        (Se = (((_ + 2) | 0) + (Ae | 0)) | 0),
        ie((Ae + 1) | 0) | 0)
        ? 1
        : (R(Ie | 0, Se | 0), (_ = Se | 0), 0);
    }
    function Z(F) {
      F = F | 0;
      var Ie = 0,
        Se = 0,
        Ae = 0;
      return ie(2) | 0 ||
        ((Ae = se((_ + 1) | 0) | 0),
        (Ie = (_ + 3) | 0),
        (Se = (((_ + 3) | 0) + (Ae | 0)) | 0),
        ie((Ae + 2) | 0) | 0)
        ? 1
        : (R(Ie | 0, Se | 0), (_ = Se | 0), 0);
    }
    function ce(F) {
      F = F | 0;
      var Ie = 0,
        Se = 0,
        Ae = 0;
      return ie(4) | 0 ||
        ((Ae = m((_ + 1) | 0) | 0),
        (Ie = (_ + 5) | 0),
        (Se = (((_ + 5) | 0) + (Ae | 0)) | 0),
        ie((Ae + 4) | 0) | 0)
        ? 1
        : (R(Ie | 0, Se | 0), (_ = Se | 0), 0);
    }
    function de(F) {
      return (F = F | 0), 1;
    }
    function me(F) {
      return (F = F | 0), P(), (_ = (_ + 1) | 0), 0;
    }
    function y(F) {
      F = F | 0;
      var Ie = 0,
        Se = 0,
        Ae = 0;
      return (
        (Ae = (F - 96) | 0),
        ie(Ae | 0) | 0
          ? 1
          : ((Ie = (_ + 1) | 0),
            (Se = (((_ + 1) | 0) + (Ae | 0)) | 0),
            z(Ie | 0, Se | 0),
            (_ = Se | 0),
            0)
      );
    }
    function f(F) {
      F = F | 0;
      var Ie = 0,
        Se = 0,
        Ae = 0;
      return ie(1) | 0 ||
        ((Ae = i[(_ + 1) | 0] | 0),
        (Ie = (_ + 2) | 0),
        (Se = (((_ + 2) | 0) + (Ae | 0)) | 0),
        ie((Ae + 1) | 0) | 0)
        ? 1
        : (z(Ie | 0, Se | 0), (_ = Se | 0), 0);
    }
    function l(F) {
      F = F | 0;
      var Ie = 0,
        Se = 0,
        Ae = 0;
      return ie(2) | 0 ||
        ((Ae = se((_ + 1) | 0) | 0),
        (Ie = (_ + 3) | 0),
        (Se = (((_ + 3) | 0) + (Ae | 0)) | 0),
        ie((Ae + 2) | 0) | 0)
        ? 1
        : (z(Ie | 0, Se | 0), (_ = Se | 0), 0);
    }
    function A(F) {
      F = F | 0;
      var Ie = 0,
        Se = 0,
        Ae = 0;
      return ie(4) | 0 ||
        ((Ae = m((_ + 1) | 0) | 0),
        (Ie = (_ + 5) | 0),
        (Se = (((_ + 5) | 0) + (Ae | 0)) | 0),
        ie((Ae + 4) | 0) | 0)
        ? 1
        : (z(Ie | 0, Se | 0), (_ = Se | 0), 0);
    }
    function k(F) {
      return (F = F | 0), 1;
    }
    function D(F) {
      return (F = F | 0), M(), (_ = (_ + 1) | 0), 0;
    }
    function H(F) {
      return (F = F | 0), X((F - 128) | 0), (_ = (_ + 1) | 0), 0;
    }
    function _e(F) {
      return (
        (F = F | 0),
        ie(1) | 0 ? 1 : (X(i[(_ + 1) | 0] | 0), (_ = (_ + 2) | 0), 0)
      );
    }
    function Be(F) {
      return (
        (F = F | 0),
        ie(2) | 0 ? 1 : (X(se((_ + 1) | 0) | 0), (_ = (_ + 3) | 0), 0)
      );
    }
    function Ee(F) {
      return (
        (F = F | 0),
        ie(4) | 0
          ? 1
          : (q(se((_ + 1) | 0) | 0, se((_ + 3) | 0) | 0), (_ = (_ + 5) | 0), 0)
      );
    }
    function xe(F) {
      return (
        (F = F | 0),
        ie(8) | 0
          ? 1
          : (ee(
              se((_ + 1) | 0) | 0,
              se((_ + 3) | 0) | 0,
              se((_ + 5) | 0) | 0,
              se((_ + 7) | 0) | 0,
            ),
            (_ = (_ + 9) | 0),
            0)
      );
    }
    function Oe(F) {
      return (F = F | 0), $(), (_ = (_ + 1) | 0), 0;
    }
    function ke(F) {
      F = F | 0;
      var Ie = 0;
      return (
        (Ie = (F - 160) | 0),
        ie(Ie | 0) | 0 ? 1 : (J(Ie | 0), (_ = (_ + 1) | 0), 0)
      );
    }
    function nu(F) {
      return (
        (F = F | 0),
        ie(1) | 0 ? 1 : (J(i[(_ + 1) | 0] | 0), (_ = (_ + 2) | 0), 0)
      );
    }
    function iu(F) {
      return (
        (F = F | 0),
        ie(2) | 0 ? 1 : (J(se((_ + 1) | 0) | 0), (_ = (_ + 3) | 0), 0)
      );
    }
    function su(F) {
      return (
        (F = F | 0),
        ie(4) | 0
          ? 1
          : (he(se((_ + 1) | 0) | 0, se((_ + 3) | 0) | 0), (_ = (_ + 5) | 0), 0)
      );
    }
    function au(F) {
      return (
        (F = F | 0),
        ie(8) | 0
          ? 1
          : (ue(
              se((_ + 1) | 0) | 0,
              se((_ + 3) | 0) | 0,
              se((_ + 5) | 0) | 0,
              se((_ + 7) | 0) | 0,
            ),
            (_ = (_ + 9) | 0),
            0)
      );
    }
    function ou(F) {
      return (F = F | 0), ne(), (_ = (_ + 1) | 0), 0;
    }
    function Er(F) {
      return (F = F | 0), Q((F - 192) | 0 | 0), (_ = (_ + 1) | 0), 0;
    }
    function _h(F) {
      return (F = F | 0), Q(F | 0), (_ = (_ + 1) | 0), 0;
    }
    function xh(F) {
      return (F = F | 0), Q(F | 0), (_ = (_ + 1) | 0), 0;
    }
    function Eh(F) {
      return (F = F | 0), Q(F | 0), (_ = (_ + 1) | 0), 0;
    }
    function vh(F) {
      return (F = F | 0), Q(F | 0), (_ = (_ + 1) | 0), 0;
    }
    function We(F) {
      return (F = F | 0), Q((F - 192) | 0 | 0), (_ = (_ + 1) | 0), 0;
    }
    function Th(F) {
      return (F = F | 0), Q(F | 0), (_ = (_ + 1) | 0), 0;
    }
    function Bh(F) {
      return (F = F | 0), Q(F | 0), (_ = (_ + 1) | 0), 0;
    }
    function Ah(F) {
      return (F = F | 0), Q(F | 0), (_ = (_ + 1) | 0), 0;
    }
    function cu(F) {
      return (
        (F = F | 0),
        ie(1) | 0 ? 1 : (Q(i[(_ + 1) | 0] | 0), (_ = (_ + 2) | 0), 0)
      );
    }
    function uu(F) {
      return (
        (F = F | 0),
        ie(2) | 0 ? 1 : (Q(se((_ + 1) | 0) | 0), (_ = (_ + 3) | 0), 0)
      );
    }
    function fu(F) {
      return (
        (F = F | 0),
        ie(4) | 0
          ? 1
          : (re(se((_ + 1) | 0) | 0, se((_ + 3) | 0) | 0), (_ = (_ + 5) | 0), 0)
      );
    }
    function lu(F) {
      return (
        (F = F | 0),
        ie(8) | 0
          ? 1
          : (ye(
              se((_ + 1) | 0) | 0,
              se((_ + 3) | 0) | 0,
              se((_ + 5) | 0) | 0,
              se((_ + 7) | 0) | 0,
            ),
            (_ = (_ + 9) | 0),
            0)
      );
    }
    function je(F) {
      return (F = F | 0), G(((F | 0) - 224) | 0), (_ = (_ + 1) | 0), 0;
    }
    function du(F) {
      return (F = F | 0), b(), (_ = (_ + 1) | 0), 0;
    }
    function hu(F) {
      return (F = F | 0), S(), (_ = (_ + 1) | 0), 0;
    }
    function pu(F) {
      return (F = F | 0), V(), (_ = (_ + 1) | 0), 0;
    }
    function yu(F) {
      return (F = F | 0), C(), (_ = (_ + 1) | 0), 0;
    }
    function gu(F) {
      return (
        (F = F | 0),
        ie(1) | 0 ? 1 : (G(i[(_ + 1) | 0] | 0), (_ = (_ + 2) | 0), 0)
      );
    }
    function wu(F) {
      F = F | 0;
      var Ie = 0,
        Se = 0,
        Ae = 1,
        vn = 0,
        Kr = 0,
        Nh = 0;
      return ie(2) | 0
        ? 1
        : ((Ie = i[(_ + 1) | 0] | 0),
          (Se = i[(_ + 2) | 0] | 0),
          (Ie | 0) & 128 && (Ae = -1),
          (vn = +(((Ie | 0) & 124) >> 2)),
          (Kr = +((((Ie | 0) & 3) << 8) | Se)),
          +vn == 0
            ? B(+(+Ae * 5960464477539063e-23 * +Kr))
            : +vn == 31
              ? +Ae == 1
                ? +Kr > 0
                  ? W()
                  : K()
                : +Kr > 0
                  ? te()
                  : L()
              : B(+(+Ae * le(2, +(+vn - 25)) * +(1024 + Kr))),
          (_ = (_ + 3) | 0),
          0);
    }
    function mu(F) {
      return (
        (F = F | 0),
        ie(4) | 0
          ? 1
          : (N(
              i[(_ + 1) | 0] | 0,
              i[(_ + 2) | 0] | 0,
              i[(_ + 3) | 0] | 0,
              i[(_ + 4) | 0] | 0,
            ),
            (_ = (_ + 5) | 0),
            0)
      );
    }
    function bu(F) {
      return (
        (F = F | 0),
        ie(8) | 0
          ? 1
          : (I(
              i[(_ + 1) | 0] | 0,
              i[(_ + 2) | 0] | 0,
              i[(_ + 3) | 0] | 0,
              i[(_ + 4) | 0] | 0,
              i[(_ + 5) | 0] | 0,
              i[(_ + 6) | 0] | 0,
              i[(_ + 7) | 0] | 0,
              i[(_ + 8) | 0] | 0,
            ),
            (_ = (_ + 9) | 0),
            0)
      );
    }
    function Fe(F) {
      return (F = F | 0), 1;
    }
    function _u(F) {
      return (F = F | 0), Y(), (_ = (_ + 1) | 0), 0;
    }
    var xu = [
      s,
      s,
      s,
      s,
      s,
      s,
      s,
      s,
      s,
      s,
      s,
      s,
      s,
      s,
      s,
      s,
      s,
      s,
      s,
      s,
      s,
      s,
      s,
      s,
      h,
      E,
      T,
      U,
      Fe,
      Fe,
      Fe,
      Fe,
      p,
      p,
      p,
      p,
      p,
      p,
      p,
      p,
      p,
      p,
      p,
      p,
      p,
      p,
      p,
      p,
      p,
      p,
      p,
      p,
      p,
      p,
      p,
      p,
      o,
      u,
      g,
      v,
      Fe,
      Fe,
      Fe,
      Fe,
      O,
      O,
      O,
      O,
      O,
      O,
      O,
      O,
      O,
      O,
      O,
      O,
      O,
      O,
      O,
      O,
      O,
      O,
      O,
      O,
      O,
      O,
      O,
      O,
      j,
      Z,
      ce,
      de,
      Fe,
      Fe,
      Fe,
      me,
      y,
      y,
      y,
      y,
      y,
      y,
      y,
      y,
      y,
      y,
      y,
      y,
      y,
      y,
      y,
      y,
      y,
      y,
      y,
      y,
      y,
      y,
      y,
      y,
      f,
      l,
      A,
      k,
      Fe,
      Fe,
      Fe,
      D,
      H,
      H,
      H,
      H,
      H,
      H,
      H,
      H,
      H,
      H,
      H,
      H,
      H,
      H,
      H,
      H,
      H,
      H,
      H,
      H,
      H,
      H,
      H,
      H,
      _e,
      Be,
      Ee,
      xe,
      Fe,
      Fe,
      Fe,
      Oe,
      ke,
      ke,
      ke,
      ke,
      ke,
      ke,
      ke,
      ke,
      ke,
      ke,
      ke,
      ke,
      ke,
      ke,
      ke,
      ke,
      ke,
      ke,
      ke,
      ke,
      ke,
      ke,
      ke,
      ke,
      nu,
      iu,
      su,
      au,
      Fe,
      Fe,
      Fe,
      ou,
      Er,
      Er,
      Er,
      Er,
      Er,
      Er,
      We,
      We,
      We,
      We,
      We,
      We,
      We,
      We,
      We,
      We,
      We,
      We,
      We,
      We,
      We,
      We,
      We,
      We,
      cu,
      uu,
      fu,
      lu,
      Fe,
      Fe,
      Fe,
      Fe,
      je,
      je,
      je,
      je,
      je,
      je,
      je,
      je,
      je,
      je,
      je,
      je,
      je,
      je,
      je,
      je,
      je,
      je,
      je,
      je,
      du,
      hu,
      pu,
      yu,
      gu,
      wu,
      mu,
      bu,
      Fe,
      Fe,
      Fe,
      _u,
    ];
    return { parse: we };
  },
  Ii = {},
  nt = {};
const Us = Ni.BigNumber;
nt.MT = {
  POS_INT: 0,
  NEG_INT: 1,
  BYTE_STRING: 2,
  UTF8_STRING: 3,
  ARRAY: 4,
  MAP: 5,
  TAG: 6,
  SIMPLE_FLOAT: 7,
};
nt.TAG = {
  DATE_STRING: 0,
  DATE_EPOCH: 1,
  POS_BIGINT: 2,
  NEG_BIGINT: 3,
  DECIMAL_FRAC: 4,
  BIGFLOAT: 5,
  BASE64URL_EXPECTED: 21,
  BASE64_EXPECTED: 22,
  BASE16_EXPECTED: 23,
  CBOR: 24,
  URI: 32,
  BASE64URL: 33,
  BASE64: 34,
  REGEXP: 35,
  MIME: 36,
};
nt.NUMBYTES = {
  ZERO: 0,
  ONE: 24,
  TWO: 25,
  FOUR: 26,
  EIGHT: 27,
  INDEFINITE: 31,
};
nt.SIMPLE = { FALSE: 20, TRUE: 21, NULL: 22, UNDEFINED: 23 };
nt.SYMS = {
  NULL: Symbol("null"),
  UNDEFINED: Symbol("undef"),
  PARENT: Symbol("parent"),
  BREAK: Symbol("break"),
  STREAM: Symbol("stream"),
};
nt.SHIFT32 = Math.pow(2, 32);
nt.SHIFT16 = Math.pow(2, 16);
nt.MAX_SAFE_HIGH = 2097151;
nt.NEG_ONE = new Us(-1);
nt.TEN = new Us(10);
nt.TWO = new Us(2);
nt.PARENT = {
  ARRAY: 0,
  OBJECT: 1,
  MAP: 2,
  TAG: 3,
  BYTE_STRING: 4,
  UTF8_STRING: 5,
};
(function (e) {
  const { Buffer: t } = bn,
    r = Ni.BigNumber,
    n = nt,
    i = n.SHIFT32,
    a = n.SHIFT16,
    d = 2097151;
  e.parseHalf = function (x) {
    var B, N, I;
    return (
      (I = x[0] & 128 ? -1 : 1),
      (B = (x[0] & 124) >> 2),
      (N = ((x[0] & 3) << 8) | x[1]),
      B
        ? B === 31
          ? I * (N ? NaN : 1 / 0)
          : I * Math.pow(2, B - 25) * (1024 + N)
        : I * 5960464477539063e-23 * N
    );
  };
  function c(w) {
    return w < 16 ? "0" + w.toString(16) : w.toString(16);
  }
  (e.arrayBufferToBignumber = function (w) {
    const x = w.byteLength;
    let B = "";
    for (let N = 0; N < x; N++) B += c(w[N]);
    return new r(B, 16);
  }),
    (e.buildMap = (w) => {
      const x = new Map(),
        B = Object.keys(w),
        N = B.length;
      for (let I = 0; I < N; I++) x.set(B[I], w[B[I]]);
      return x;
    }),
    (e.buildInt32 = (w, x) => w * a + x),
    (e.buildInt64 = (w, x, B, N) => {
      const I = e.buildInt32(w, x),
        S = e.buildInt32(B, N);
      return I > d ? new r(I).times(i).plus(S) : I * i + S;
    }),
    (e.writeHalf = function (x, B) {
      const N = t.allocUnsafe(4);
      N.writeFloatBE(B, 0);
      const I = N.readUInt32BE(0);
      if (I & 8191) return !1;
      var S = (I >> 16) & 32768;
      const b = (I >> 23) & 255,
        C = I & 8388607;
      if (b >= 113 && b <= 142) S += ((b - 112) << 10) + (C >> 13);
      else if (b >= 103 && b < 113) {
        if (C & ((1 << (126 - b)) - 1)) return !1;
        S += (C + 8388608) >> (126 - b);
      } else return !1;
      return x.writeUInt16BE(S, 0), !0;
    }),
    (e.keySorter = function (w, x) {
      var B = w[0].byteLength,
        N = x[0].byteLength;
      return B > N ? 1 : N > B ? -1 : w[0].compare(x[0]);
    }),
    (e.isNegativeZero = (w) => w === 0 && 1 / w < 0),
    (e.nextPowerOf2 = (w) => {
      let x = 0;
      if (w && !(w & (w - 1))) return w;
      for (; w !== 0; ) (w >>= 1), (x += 1);
      return 1 << x;
    });
})(Ii);
const Fs = nt,
  wf = Fs.MT,
  Tn = Fs.SIMPLE,
  Mi = Fs.SYMS;
let mf = class os {
  constructor(t) {
    if (typeof t != "number")
      throw new Error("Invalid Simple type: " + typeof t);
    if (t < 0 || t > 255 || (t | 0) !== t)
      throw new Error("value must be a small positive integer: " + t);
    this.value = t;
  }
  toString() {
    return "simple(" + this.value + ")";
  }
  inspect() {
    return "simple(" + this.value + ")";
  }
  encodeCBOR(t) {
    return t._pushInt(this.value, wf.SIMPLE_FLOAT);
  }
  static isSimple(t) {
    return t instanceof os;
  }
  static decode(t, r) {
    switch ((r == null && (r = !0), t)) {
      case Tn.FALSE:
        return !1;
      case Tn.TRUE:
        return !0;
      case Tn.NULL:
        return r ? null : Mi.NULL;
      case Tn.UNDEFINED:
        return r ? void 0 : Mi.UNDEFINED;
      case -1:
        if (!r) throw new Error("Invalid BREAK");
        return Mi.BREAK;
      default:
        return new os(t);
    }
  }
};
var qo = mf;
let bf = class cs {
  constructor(t, r, n) {
    if (
      ((this.tag = t),
      (this.value = r),
      (this.err = n),
      typeof this.tag != "number")
    )
      throw new Error("Invalid tag type (" + typeof this.tag + ")");
    if (this.tag < 0 || (this.tag | 0) !== this.tag)
      throw new Error("Tag must be a positive integer: " + this.tag);
  }
  toString() {
    return `${this.tag}(${JSON.stringify(this.value)})`;
  }
  encodeCBOR(t) {
    return t._pushTag(this.tag), t.pushAny(this.value);
  }
  convert(t) {
    var r, n;
    if (
      ((n = t?.[this.tag]),
      typeof n != "function" &&
        ((n = cs["_tag" + this.tag]), typeof n != "function"))
    )
      return this;
    try {
      return n.call(cs, this.value);
    } catch (i) {
      return (r = i), (this.err = r), this;
    }
  }
};
var Go = bf;
const jo = self.location
    ? self.location.protocol + "//" + self.location.host
    : "",
  us = self.URL;
let _f = class {
  constructor(t = "", r = jo) {
    (this.super = new us(t, r)),
      (this.path = this.pathname + this.search),
      (this.auth =
        this.username && this.password
          ? this.username + ":" + this.password
          : null),
      (this.query =
        this.search && this.search.startsWith("?")
          ? this.search.slice(1)
          : null);
  }
  get hash() {
    return this.super.hash;
  }
  get host() {
    return this.super.host;
  }
  get hostname() {
    return this.super.hostname;
  }
  get href() {
    return this.super.href;
  }
  get origin() {
    return this.super.origin;
  }
  get password() {
    return this.super.password;
  }
  get pathname() {
    return this.super.pathname;
  }
  get port() {
    return this.super.port;
  }
  get protocol() {
    return this.super.protocol;
  }
  get search() {
    return this.super.search;
  }
  get searchParams() {
    return this.super.searchParams;
  }
  get username() {
    return this.super.username;
  }
  set hash(t) {
    this.super.hash = t;
  }
  set host(t) {
    this.super.host = t;
  }
  set hostname(t) {
    this.super.hostname = t;
  }
  set href(t) {
    this.super.href = t;
  }
  set origin(t) {
    this.super.origin = t;
  }
  set password(t) {
    this.super.password = t;
  }
  set pathname(t) {
    this.super.pathname = t;
  }
  set port(t) {
    this.super.port = t;
  }
  set protocol(t) {
    this.super.protocol = t;
  }
  set search(t) {
    this.super.search = t;
  }
  set searchParams(t) {
    this.super.searchParams = t;
  }
  set username(t) {
    this.super.username = t;
  }
  createObjectURL(t) {
    return this.super.createObjectURL(t);
  }
  revokeObjectURL(t) {
    this.super.revokeObjectURL(t);
  }
  toJSON() {
    return this.super.toJSON();
  }
  toString() {
    return this.super.toString();
  }
  format() {
    return this.toString();
  }
};
function xf(e) {
  if (typeof e == "string") return new us(e).toString();
  if (!(e instanceof us)) {
    const t = e.username && e.password ? `${e.username}:${e.password}@` : "",
      r = e.auth ? e.auth + "@" : "",
      n = e.port ? ":" + e.port : "",
      i = e.protocol ? e.protocol + "//" : "",
      a = e.host || "",
      d = e.hostname || "",
      c = e.search || (e.query ? "?" + e.query : ""),
      w = e.hash || "",
      x = e.pathname || "",
      B = e.path || x + c;
    return `${i}${t || r}${a || d + n}${B}${w}`;
  }
}
var Lo = {
  URLWithLegacySupport: _f,
  URLSearchParams: self.URLSearchParams,
  defaultBase: jo,
  format: xf,
};
const { URLWithLegacySupport: Xs, format: Ef } = Lo;
var vf = (e, t = {}, r = {}, n) => {
  let i = t.protocol ? t.protocol.replace(":", "") : "http";
  i = (r[i] || n || i) + ":";
  let a;
  try {
    a = new Xs(e);
  } catch {
    a = {};
  }
  const d = Object.assign({}, t, {
    protocol: i || a.protocol,
    host: t.host || a.host,
  });
  return new Xs(e, Ef(d)).toString();
};
const {
    URLWithLegacySupport: Tf,
    format: Bf,
    URLSearchParams: Af,
    defaultBase: Nf,
  } = Lo,
  If = vf;
var Ho = {
  URL: Tf,
  URLSearchParams: Af,
  format: Bf,
  relative: If,
  defaultBase: Nf,
};
const { Buffer: Br } = bn,
  Js = wn,
  Sf = Ni.BigNumber,
  Of = gf,
  it = Ii,
  Ue = nt,
  Rf = qo,
  Uf = Go,
  { URL: Ff } = Ho;
let fs = class ls {
  constructor(t) {
    (t = t || {}),
      !t.size || t.size < 65536
        ? (t.size = 65536)
        : (t.size = it.nextPowerOf2(t.size)),
      (this._heap = new ArrayBuffer(t.size)),
      (this._heap8 = new Uint8Array(this._heap)),
      (this._buffer = Br.from(this._heap)),
      this._reset(),
      (this._knownTags = Object.assign(
        {
          0: (r) => new Date(r),
          1: (r) => new Date(r * 1e3),
          2: (r) => it.arrayBufferToBignumber(r),
          3: (r) => Ue.NEG_ONE.minus(it.arrayBufferToBignumber(r)),
          4: (r) => Ue.TEN.pow(r[0]).times(r[1]),
          5: (r) => Ue.TWO.pow(r[0]).times(r[1]),
          32: (r) => new Ff(r),
          35: (r) => new RegExp(r),
        },
        t.tags,
      )),
      (this.parser = Of(
        Vr,
        {
          log: console.log.bind(console),
          pushInt: this.pushInt.bind(this),
          pushInt32: this.pushInt32.bind(this),
          pushInt32Neg: this.pushInt32Neg.bind(this),
          pushInt64: this.pushInt64.bind(this),
          pushInt64Neg: this.pushInt64Neg.bind(this),
          pushFloat: this.pushFloat.bind(this),
          pushFloatSingle: this.pushFloatSingle.bind(this),
          pushFloatDouble: this.pushFloatDouble.bind(this),
          pushTrue: this.pushTrue.bind(this),
          pushFalse: this.pushFalse.bind(this),
          pushUndefined: this.pushUndefined.bind(this),
          pushNull: this.pushNull.bind(this),
          pushInfinity: this.pushInfinity.bind(this),
          pushInfinityNeg: this.pushInfinityNeg.bind(this),
          pushNaN: this.pushNaN.bind(this),
          pushNaNNeg: this.pushNaNNeg.bind(this),
          pushArrayStart: this.pushArrayStart.bind(this),
          pushArrayStartFixed: this.pushArrayStartFixed.bind(this),
          pushArrayStartFixed32: this.pushArrayStartFixed32.bind(this),
          pushArrayStartFixed64: this.pushArrayStartFixed64.bind(this),
          pushObjectStart: this.pushObjectStart.bind(this),
          pushObjectStartFixed: this.pushObjectStartFixed.bind(this),
          pushObjectStartFixed32: this.pushObjectStartFixed32.bind(this),
          pushObjectStartFixed64: this.pushObjectStartFixed64.bind(this),
          pushByteString: this.pushByteString.bind(this),
          pushByteStringStart: this.pushByteStringStart.bind(this),
          pushUtf8String: this.pushUtf8String.bind(this),
          pushUtf8StringStart: this.pushUtf8StringStart.bind(this),
          pushSimpleUnassigned: this.pushSimpleUnassigned.bind(this),
          pushTagUnassigned: this.pushTagUnassigned.bind(this),
          pushTagStart: this.pushTagStart.bind(this),
          pushTagStart4: this.pushTagStart4.bind(this),
          pushTagStart8: this.pushTagStart8.bind(this),
          pushBreak: this.pushBreak.bind(this),
        },
        this._heap,
      ));
  }
  get _depth() {
    return this._parents.length;
  }
  get _currentParent() {
    return this._parents[this._depth - 1];
  }
  get _ref() {
    return this._currentParent.ref;
  }
  _closeParent() {
    var t = this._parents.pop();
    if (t.length > 0) throw new Error(`Missing ${t.length} elements`);
    switch (t.type) {
      case Ue.PARENT.TAG:
        this._push(this.createTag(t.ref[0], t.ref[1]));
        break;
      case Ue.PARENT.BYTE_STRING:
        this._push(this.createByteString(t.ref, t.length));
        break;
      case Ue.PARENT.UTF8_STRING:
        this._push(this.createUtf8String(t.ref, t.length));
        break;
      case Ue.PARENT.MAP:
        if (t.values % 2 > 0)
          throw new Error("Odd number of elements in the map");
        this._push(this.createMap(t.ref, t.length));
        break;
      case Ue.PARENT.OBJECT:
        if (t.values % 2 > 0)
          throw new Error("Odd number of elements in the map");
        this._push(this.createObject(t.ref, t.length));
        break;
      case Ue.PARENT.ARRAY:
        this._push(this.createArray(t.ref, t.length));
        break;
    }
    this._currentParent &&
      this._currentParent.type === Ue.PARENT.TAG &&
      this._dec();
  }
  _dec() {
    const t = this._currentParent;
    t.length < 0 || (t.length--, t.length === 0 && this._closeParent());
  }
  _push(t, r) {
    const n = this._currentParent;
    switch ((n.values++, n.type)) {
      case Ue.PARENT.ARRAY:
      case Ue.PARENT.BYTE_STRING:
      case Ue.PARENT.UTF8_STRING:
        n.length > -1
          ? (this._ref[this._ref.length - n.length] = t)
          : this._ref.push(t),
          this._dec();
        break;
      case Ue.PARENT.OBJECT:
        n.tmpKey != null
          ? ((this._ref[n.tmpKey] = t), (n.tmpKey = null), this._dec())
          : ((n.tmpKey = t),
            typeof n.tmpKey != "string" &&
              ((n.type = Ue.PARENT.MAP), (n.ref = it.buildMap(n.ref))));
        break;
      case Ue.PARENT.MAP:
        n.tmpKey != null
          ? (this._ref.set(n.tmpKey, t), (n.tmpKey = null), this._dec())
          : (n.tmpKey = t);
        break;
      case Ue.PARENT.TAG:
        this._ref.push(t), r || this._dec();
        break;
      default:
        throw new Error("Unknown parent type");
    }
  }
  _createParent(t, r, n) {
    this._parents[this._depth] = {
      type: r,
      length: n,
      ref: t,
      values: 0,
      tmpKey: null,
    };
  }
  _reset() {
    (this._res = []),
      (this._parents = [
        {
          type: Ue.PARENT.ARRAY,
          length: -1,
          ref: this._res,
          values: 0,
          tmpKey: null,
        },
      ]);
  }
  createTag(t, r) {
    const n = this._knownTags[t];
    return n ? n(r) : new Uf(t, r);
  }
  createMap(t, r) {
    return t;
  }
  createObject(t, r) {
    return t;
  }
  createArray(t, r) {
    return t;
  }
  createByteString(t, r) {
    return Br.concat(t);
  }
  createByteStringFromHeap(t, r) {
    return t === r ? Br.alloc(0) : Br.from(this._heap.slice(t, r));
  }
  createInt(t) {
    return t;
  }
  createInt32(t, r) {
    return it.buildInt32(t, r);
  }
  createInt64(t, r, n, i) {
    return it.buildInt64(t, r, n, i);
  }
  createFloat(t) {
    return t;
  }
  createFloatSingle(t, r, n, i) {
    return Js.read([t, r, n, i], 0, !1, 23, 4);
  }
  createFloatDouble(t, r, n, i, a, d, c, w) {
    return Js.read([t, r, n, i, a, d, c, w], 0, !1, 52, 8);
  }
  createInt32Neg(t, r) {
    return -1 - it.buildInt32(t, r);
  }
  createInt64Neg(t, r, n, i) {
    const a = it.buildInt32(t, r),
      d = it.buildInt32(n, i);
    return a > Ue.MAX_SAFE_HIGH
      ? Ue.NEG_ONE.minus(new Sf(a).times(Ue.SHIFT32).plus(d))
      : -1 - (a * Ue.SHIFT32 + d);
  }
  createTrue() {
    return !0;
  }
  createFalse() {
    return !1;
  }
  createNull() {
    return null;
  }
  createUndefined() {}
  createInfinity() {
    return 1 / 0;
  }
  createInfinityNeg() {
    return -1 / 0;
  }
  createNaN() {
    return NaN;
  }
  createNaNNeg() {
    return NaN;
  }
  createUtf8String(t, r) {
    return t.join("");
  }
  createUtf8StringFromHeap(t, r) {
    return t === r ? "" : this._buffer.toString("utf8", t, r);
  }
  createSimpleUnassigned(t) {
    return new Rf(t);
  }
  pushInt(t) {
    this._push(this.createInt(t));
  }
  pushInt32(t, r) {
    this._push(this.createInt32(t, r));
  }
  pushInt64(t, r, n, i) {
    this._push(this.createInt64(t, r, n, i));
  }
  pushFloat(t) {
    this._push(this.createFloat(t));
  }
  pushFloatSingle(t, r, n, i) {
    this._push(this.createFloatSingle(t, r, n, i));
  }
  pushFloatDouble(t, r, n, i, a, d, c, w) {
    this._push(this.createFloatDouble(t, r, n, i, a, d, c, w));
  }
  pushInt32Neg(t, r) {
    this._push(this.createInt32Neg(t, r));
  }
  pushInt64Neg(t, r, n, i) {
    this._push(this.createInt64Neg(t, r, n, i));
  }
  pushTrue() {
    this._push(this.createTrue());
  }
  pushFalse() {
    this._push(this.createFalse());
  }
  pushNull() {
    this._push(this.createNull());
  }
  pushUndefined() {
    this._push(this.createUndefined());
  }
  pushInfinity() {
    this._push(this.createInfinity());
  }
  pushInfinityNeg() {
    this._push(this.createInfinityNeg());
  }
  pushNaN() {
    this._push(this.createNaN());
  }
  pushNaNNeg() {
    this._push(this.createNaNNeg());
  }
  pushArrayStart() {
    this._createParent([], Ue.PARENT.ARRAY, -1);
  }
  pushArrayStartFixed(t) {
    this._createArrayStartFixed(t);
  }
  pushArrayStartFixed32(t, r) {
    const n = it.buildInt32(t, r);
    this._createArrayStartFixed(n);
  }
  pushArrayStartFixed64(t, r, n, i) {
    const a = it.buildInt64(t, r, n, i);
    this._createArrayStartFixed(a);
  }
  pushObjectStart() {
    this._createObjectStartFixed(-1);
  }
  pushObjectStartFixed(t) {
    this._createObjectStartFixed(t);
  }
  pushObjectStartFixed32(t, r) {
    const n = it.buildInt32(t, r);
    this._createObjectStartFixed(n);
  }
  pushObjectStartFixed64(t, r, n, i) {
    const a = it.buildInt64(t, r, n, i);
    this._createObjectStartFixed(a);
  }
  pushByteStringStart() {
    this._parents[this._depth] = {
      type: Ue.PARENT.BYTE_STRING,
      length: -1,
      ref: [],
      values: 0,
      tmpKey: null,
    };
  }
  pushByteString(t, r) {
    this._push(this.createByteStringFromHeap(t, r));
  }
  pushUtf8StringStart() {
    this._parents[this._depth] = {
      type: Ue.PARENT.UTF8_STRING,
      length: -1,
      ref: [],
      values: 0,
      tmpKey: null,
    };
  }
  pushUtf8String(t, r) {
    this._push(this.createUtf8StringFromHeap(t, r));
  }
  pushSimpleUnassigned(t) {
    this._push(this.createSimpleUnassigned(t));
  }
  pushTagStart(t) {
    this._parents[this._depth] = { type: Ue.PARENT.TAG, length: 1, ref: [t] };
  }
  pushTagStart4(t, r) {
    this.pushTagStart(it.buildInt32(t, r));
  }
  pushTagStart8(t, r, n, i) {
    this.pushTagStart(it.buildInt64(t, r, n, i));
  }
  pushTagUnassigned(t) {
    this._push(this.createTag(t));
  }
  pushBreak() {
    if (this._currentParent.length > -1) throw new Error("Unexpected break");
    this._closeParent();
  }
  _createObjectStartFixed(t) {
    if (t === 0) {
      this._push(this.createObject({}));
      return;
    }
    this._createParent({}, Ue.PARENT.OBJECT, t);
  }
  _createArrayStartFixed(t) {
    if (t === 0) {
      this._push(this.createArray([]));
      return;
    }
    this._createParent(new Array(t), Ue.PARENT.ARRAY, t);
  }
  _decode(t) {
    if (t.byteLength === 0) throw new Error("Input too short");
    this._reset(), this._heap8.set(t);
    const r = this.parser.parse(t.byteLength);
    if (this._depth > 1) {
      for (; this._currentParent.length === 0; ) this._closeParent();
      if (this._depth > 1) throw new Error("Undeterminated nesting");
    }
    if (r > 0) throw new Error("Failed to parse");
    if (this._res.length === 0) throw new Error("No valid result");
  }
  decodeFirst(t) {
    return this._decode(t), this._res[0];
  }
  decodeAll(t) {
    return this._decode(t), this._res;
  }
  static decode(t, r) {
    return (
      typeof t == "string" && (t = Br.from(t, r || "hex")),
      new ls({ size: t.length }).decodeFirst(t)
    );
  }
  static decodeAll(t, r) {
    return (
      typeof t == "string" && (t = Br.from(t, r || "hex")),
      new ls({ size: t.length }).decodeAll(t)
    );
  }
};
fs.decodeFirst = fs.decode;
var Do = fs;
const { Buffer: Vi } = bn,
  Pf = Do,
  kf = Ii;
class Ps extends Pf {
  createTag(t, r) {
    return `${t}(${r})`;
  }
  createInt(t) {
    return super.createInt(t).toString();
  }
  createInt32(t, r) {
    return super.createInt32(t, r).toString();
  }
  createInt64(t, r, n, i) {
    return super.createInt64(t, r, n, i).toString();
  }
  createInt32Neg(t, r) {
    return super.createInt32Neg(t, r).toString();
  }
  createInt64Neg(t, r, n, i) {
    return super.createInt64Neg(t, r, n, i).toString();
  }
  createTrue() {
    return "true";
  }
  createFalse() {
    return "false";
  }
  createFloat(t) {
    const r = super.createFloat(t);
    return kf.isNegativeZero(t) ? "-0_1" : `${r}_1`;
  }
  createFloatSingle(t, r, n, i) {
    return `${super.createFloatSingle(t, r, n, i)}_2`;
  }
  createFloatDouble(t, r, n, i, a, d, c, w) {
    return `${super.createFloatDouble(t, r, n, i, a, d, c, w)}_3`;
  }
  createByteString(t, r) {
    const n = t.join(", ");
    return r === -1 ? `(_ ${n})` : `h'${n}`;
  }
  createByteStringFromHeap(t, r) {
    return `h'${Vi.from(super.createByteStringFromHeap(t, r)).toString("hex")}'`;
  }
  createInfinity() {
    return "Infinity_1";
  }
  createInfinityNeg() {
    return "-Infinity_1";
  }
  createNaN() {
    return "NaN_1";
  }
  createNaNNeg() {
    return "-NaN_1";
  }
  createNull() {
    return "null";
  }
  createUndefined() {
    return "undefined";
  }
  createSimpleUnassigned(t) {
    return `simple(${t})`;
  }
  createArray(t, r) {
    const n = super.createArray(t, r);
    return r === -1 ? `[_ ${n.join(", ")}]` : `[${n.join(", ")}]`;
  }
  createMap(t, r) {
    const n = super.createMap(t),
      i = Array.from(n.keys()).reduce(Qs(n), "");
    return r === -1 ? `{_ ${i}}` : `{${i}}`;
  }
  createObject(t, r) {
    const n = super.createObject(t),
      i = Object.keys(n).reduce(Qs(n), "");
    return r === -1 ? `{_ ${i}}` : `{${i}}`;
  }
  createUtf8String(t, r) {
    const n = t.join(", ");
    return r === -1 ? `(_ ${n})` : `"${n}"`;
  }
  createUtf8StringFromHeap(t, r) {
    return `"${Vi.from(super.createUtf8StringFromHeap(t, r)).toString("utf8")}"`;
  }
  static diagnose(t, r) {
    return (
      typeof t == "string" && (t = Vi.from(t, r || "hex")),
      new Ps().decodeFirst(t)
    );
  }
}
var Cf = Ps;
function Qs(e) {
  return (t, r) => (t ? `${t}, ${r}: ${e[r]}` : `${r}: ${e[r]}`);
}
const { Buffer: Ut } = bn,
  { URL: $f } = Ho,
  ds = Ni.BigNumber,
  qi = Ii,
  ze = nt,
  mt = ze.MT,
  Bn = ze.NUMBYTES,
  ea = ze.SHIFT32,
  ta = ze.SYMS,
  Ar = ze.TAG,
  Mf = (ze.MT.SIMPLE_FLOAT << 5) | ze.NUMBYTES.TWO,
  Vf = (ze.MT.SIMPLE_FLOAT << 5) | ze.NUMBYTES.FOUR,
  qf = (ze.MT.SIMPLE_FLOAT << 5) | ze.NUMBYTES.EIGHT,
  Gf = (ze.MT.SIMPLE_FLOAT << 5) | ze.SIMPLE.TRUE,
  jf = (ze.MT.SIMPLE_FLOAT << 5) | ze.SIMPLE.FALSE,
  Lf = (ze.MT.SIMPLE_FLOAT << 5) | ze.SIMPLE.UNDEFINED,
  ra = (ze.MT.SIMPLE_FLOAT << 5) | ze.SIMPLE.NULL,
  Hf = new ds("0x20000000000000"),
  Df = Ut.from("f97e00", "hex"),
  Kf = Ut.from("f9fc00", "hex"),
  zf = Ut.from("f97c00", "hex");
function Wf(e) {
  return {}.toString.call(e).slice(8, -1);
}
class ci {
  constructor(t) {
    (t = t || {}),
      (this.streaming = typeof t.stream == "function"),
      (this.onData = t.stream),
      (this.semanticTypes = [
        [$f, this._pushUrl],
        [ds, this._pushBigNumber],
      ]);
    const r = t.genTypes || [],
      n = r.length;
    for (let i = 0; i < n; i++) this.addSemanticType(r[i][0], r[i][1]);
    this._reset();
  }
  addSemanticType(t, r) {
    const n = this.semanticTypes.length;
    for (let i = 0; i < n; i++)
      if (this.semanticTypes[i][0] === t) {
        const d = this.semanticTypes[i][1];
        return (this.semanticTypes[i][1] = r), d;
      }
    return this.semanticTypes.push([t, r]), null;
  }
  push(t) {
    return (
      t &&
        ((this.result[this.offset] = t),
        (this.resultMethod[this.offset] = 0),
        (this.resultLength[this.offset] = t.length),
        this.offset++,
        this.streaming && this.onData(this.finalize())),
      !0
    );
  }
  pushWrite(t, r, n) {
    return (
      (this.result[this.offset] = t),
      (this.resultMethod[this.offset] = r),
      (this.resultLength[this.offset] = n),
      this.offset++,
      this.streaming && this.onData(this.finalize()),
      !0
    );
  }
  _pushUInt8(t) {
    return this.pushWrite(t, 1, 1);
  }
  _pushUInt16BE(t) {
    return this.pushWrite(t, 2, 2);
  }
  _pushUInt32BE(t) {
    return this.pushWrite(t, 3, 4);
  }
  _pushDoubleBE(t) {
    return this.pushWrite(t, 4, 8);
  }
  _pushNaN() {
    return this.push(Df);
  }
  _pushInfinity(t) {
    const r = t < 0 ? Kf : zf;
    return this.push(r);
  }
  _pushFloat(t) {
    const r = Ut.allocUnsafe(2);
    if (qi.writeHalf(r, t) && qi.parseHalf(r) === t)
      return this._pushUInt8(Mf) && this.push(r);
    const n = Ut.allocUnsafe(4);
    return (
      n.writeFloatBE(t, 0),
      n.readFloatBE(0) === t
        ? this._pushUInt8(Vf) && this.push(n)
        : this._pushUInt8(qf) && this._pushDoubleBE(t)
    );
  }
  _pushInt(t, r, n) {
    const i = r << 5;
    return t < 24
      ? this._pushUInt8(i | t)
      : t <= 255
        ? this._pushUInt8(i | Bn.ONE) && this._pushUInt8(t)
        : t <= 65535
          ? this._pushUInt8(i | Bn.TWO) && this._pushUInt16BE(t)
          : t <= 4294967295
            ? this._pushUInt8(i | Bn.FOUR) && this._pushUInt32BE(t)
            : t <= Number.MAX_SAFE_INTEGER
              ? this._pushUInt8(i | Bn.EIGHT) &&
                this._pushUInt32BE(Math.floor(t / ea)) &&
                this._pushUInt32BE(t % ea)
              : r === mt.NEG_INT
                ? this._pushFloat(n)
                : this._pushFloat(t);
  }
  _pushIntNum(t) {
    return t < 0
      ? this._pushInt(-t - 1, mt.NEG_INT, t)
      : this._pushInt(t, mt.POS_INT);
  }
  _pushNumber(t) {
    switch (!1) {
      case t === t:
        return this._pushNaN(t);
      case isFinite(t):
        return this._pushInfinity(t);
      case t % 1 !== 0:
        return this._pushIntNum(t);
      default:
        return this._pushFloat(t);
    }
  }
  _pushString(t) {
    const r = Ut.byteLength(t, "utf8");
    return this._pushInt(r, mt.UTF8_STRING) && this.pushWrite(t, 5, r);
  }
  _pushBoolean(t) {
    return this._pushUInt8(t ? Gf : jf);
  }
  _pushUndefined(t) {
    return this._pushUInt8(Lf);
  }
  _pushArray(t, r) {
    const n = r.length;
    if (!t._pushInt(n, mt.ARRAY)) return !1;
    for (let i = 0; i < n; i++) if (!t.pushAny(r[i])) return !1;
    return !0;
  }
  _pushTag(t) {
    return this._pushInt(t, mt.TAG);
  }
  _pushDate(t, r) {
    return t._pushTag(Ar.DATE_EPOCH) && t.pushAny(Math.round(r / 1e3));
  }
  _pushBuffer(t, r) {
    return t._pushInt(r.length, mt.BYTE_STRING) && t.push(r);
  }
  _pushNoFilter(t, r) {
    return t._pushBuffer(t, r.slice());
  }
  _pushRegexp(t, r) {
    return t._pushTag(Ar.REGEXP) && t.pushAny(r.source);
  }
  _pushSet(t, r) {
    if (!t._pushInt(r.size, mt.ARRAY)) return !1;
    for (const n of r) if (!t.pushAny(n)) return !1;
    return !0;
  }
  _pushUrl(t, r) {
    return t._pushTag(Ar.URI) && t.pushAny(r.format());
  }
  _pushBigint(t) {
    let r = Ar.POS_BIGINT;
    t.isNegative() && ((t = t.negated().minus(1)), (r = Ar.NEG_BIGINT));
    let n = t.toString(16);
    n.length % 2 && (n = "0" + n);
    const i = Ut.from(n, "hex");
    return this._pushTag(r) && this._pushBuffer(this, i);
  }
  _pushBigNumber(t, r) {
    if (r.isNaN()) return t._pushNaN();
    if (!r.isFinite()) return t._pushInfinity(r.isNegative() ? -1 / 0 : 1 / 0);
    if (r.isInteger()) return t._pushBigint(r);
    if (!(t._pushTag(Ar.DECIMAL_FRAC) && t._pushInt(2, mt.ARRAY))) return !1;
    const n = r.decimalPlaces(),
      i = r.multipliedBy(new ds(10).pow(n));
    return t._pushIntNum(-n)
      ? i.abs().isLessThan(Hf)
        ? t._pushIntNum(i.toNumber())
        : t._pushBigint(i)
      : !1;
  }
  _pushMap(t, r) {
    return t._pushInt(r.size, mt.MAP)
      ? this._pushRawMap(r.size, Array.from(r))
      : !1;
  }
  _pushObject(t) {
    if (!t) return this._pushUInt8(ra);
    for (var r = this.semanticTypes.length, n = 0; n < r; n++)
      if (t instanceof this.semanticTypes[n][0])
        return this.semanticTypes[n][1].call(t, this, t);
    var i = t.encodeCBOR;
    if (typeof i == "function") return i.call(t, this);
    var a = Object.keys(t),
      d = a.length;
    return this._pushInt(d, mt.MAP)
      ? this._pushRawMap(
          d,
          a.map((c) => [c, t[c]]),
        )
      : !1;
  }
  _pushRawMap(t, r) {
    r = r
      .map(function (i) {
        return (i[0] = ci.encode(i[0])), i;
      })
      .sort(qi.keySorter);
    for (var n = 0; n < t; n++)
      if (!this.push(r[n][0]) || !this.pushAny(r[n][1])) return !1;
    return !0;
  }
  write(t) {
    return this.pushAny(t);
  }
  pushAny(t) {
    var r = Wf(t);
    switch (r) {
      case "Number":
        return this._pushNumber(t);
      case "String":
        return this._pushString(t);
      case "Boolean":
        return this._pushBoolean(t);
      case "Object":
        return this._pushObject(t);
      case "Array":
        return this._pushArray(this, t);
      case "Uint8Array":
        return this._pushBuffer(this, Ut.isBuffer(t) ? t : Ut.from(t));
      case "Null":
        return this._pushUInt8(ra);
      case "Undefined":
        return this._pushUndefined(t);
      case "Map":
        return this._pushMap(this, t);
      case "Set":
        return this._pushSet(this, t);
      case "URL":
        return this._pushUrl(this, t);
      case "BigNumber":
        return this._pushBigNumber(this, t);
      case "Date":
        return this._pushDate(this, t);
      case "RegExp":
        return this._pushRegexp(this, t);
      case "Symbol":
        switch (t) {
          case ta.NULL:
            return this._pushObject(null);
          case ta.UNDEFINED:
            return this._pushUndefined(void 0);
          default:
            throw new Error("Unknown symbol: " + t.toString());
        }
      default:
        throw new Error(
          "Unknown type: " + typeof t + ", " + (t ? t.toString() : ""),
        );
    }
  }
  finalize() {
    if (this.offset === 0) return null;
    for (
      var t = this.result,
        r = this.resultLength,
        n = this.resultMethod,
        i = this.offset,
        a = 0,
        d = 0;
      d < i;
      d++
    )
      a += r[d];
    var c = Ut.allocUnsafe(a),
      w = 0,
      x = 0;
    for (d = 0; d < i; d++) {
      switch (((x = r[d]), n[d])) {
        case 0:
          t[d].copy(c, w);
          break;
        case 1:
          c.writeUInt8(t[d], w, !0);
          break;
        case 2:
          c.writeUInt16BE(t[d], w, !0);
          break;
        case 3:
          c.writeUInt32BE(t[d], w, !0);
          break;
        case 4:
          c.writeDoubleBE(t[d], w, !0);
          break;
        case 5:
          c.write(t[d], w, x, "utf8");
          break;
        default:
          throw new Error("unkown method");
      }
      w += x;
    }
    var B = c;
    return this._reset(), B;
  }
  _reset() {
    (this.result = []),
      (this.resultMethod = []),
      (this.resultLength = []),
      (this.offset = 0);
  }
  static encode(t) {
    const r = new ci();
    if (!r.pushAny(t)) throw new Error("Failed to encode input");
    return r.finalize();
  }
}
var Yf = ci;
(function (e) {
  (e.Diagnose = Cf),
    (e.Decoder = Do),
    (e.Encoder = Yf),
    (e.Simple = qo),
    (e.Tagged = Go),
    (e.decodeAll = e.Decoder.decodeAll),
    (e.decodeFirst = e.Decoder.decodeFirst),
    (e.diagnose = e.Diagnose.diagnose),
    (e.encode = e.Encoder.encode),
    (e.decode = e.Decoder.decode),
    (e.leveldb = {
      decode: e.Decoder.decodeAll,
      encode: e.Encoder.encode,
      buffer: !0,
      name: "cbor",
    });
})(Mo);
const Ko = Eu(Mo);
function Tt(e) {
  return nn(Ns.create().update(new Uint8Array(e)).digest());
}
function Cn(e) {
  if (e instanceof Ko.Tagged) return Cn(e.value);
  if (typeof e == "string") return zo(e);
  if (typeof e == "number") return Tt(Ve(e));
  if (e instanceof ArrayBuffer || ArrayBuffer.isView(e)) return Tt(e);
  if (Array.isArray(e)) {
    const t = e.map(Cn);
    return Tt(Bt(...t));
  } else {
    if (e && typeof e == "object" && e._isPrincipal)
      return Tt(e.toUint8Array());
    if (typeof e == "object" && e !== null && typeof e.toHash == "function")
      return Cn(e.toHash());
    if (typeof e == "object") return ui(e);
    if (typeof e == "bigint") return Tt(Ve(e));
  }
  throw Object.assign(
    new Error(`Attempt to hash a value of unsupported type: ${e}`),
    { value: e },
  );
}
const zo = (e) => {
  const t = new TextEncoder().encode(e);
  return Tt(t);
};
function fn(e) {
  return ui(e);
}
function ui(e) {
  const n = Object.entries(e)
      .filter(([, d]) => d !== void 0)
      .map(([d, c]) => {
        const w = zo(d),
          x = Cn(c);
        return [w, x];
      })
      .sort(([d], [c]) => Xa(d, c)),
    i = Bt(...n.map((d) => Bt(...d)));
  return Tt(i);
}
var Zf = function (e, t) {
  var r = {};
  for (var n in e)
    Object.prototype.hasOwnProperty.call(e, n) &&
      t.indexOf(n) < 0 &&
      (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var i = 0, n = Object.getOwnPropertySymbols(e); i < n.length; i++)
      t.indexOf(n[i]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(e, n[i]) &&
        (r[n[i]] = e[n[i]]);
  return r;
};
const Xf = new TextEncoder().encode(`
ic-request`);
class ks {
  getPrincipal() {
    return (
      this._principal ||
        (this._principal = Te.selfAuthenticating(
          new Uint8Array(this.getPublicKey().toDer()),
        )),
      this._principal
    );
  }
  async transformRequest(t) {
    const { body: r } = t,
      n = Zf(t, ["body"]),
      i = await fn(r);
    return Object.assign(Object.assign({}, n), {
      body: {
        content: r,
        sender_pubkey: this.getPublicKey().toDer(),
        sender_sig: await this.sign(Bt(Xf, i)),
      },
    });
  }
}
class fi {
  getPrincipal() {
    return Te.anonymous();
  }
  async transformRequest(t) {
    return Object.assign(Object.assign({}, t), { body: { content: t.body } });
  }
}
var lt = {},
  Dr = {},
  Pe = {};
Object.defineProperty(Pe, "__esModule", { value: !0 });
const Jf = 9007199254740992;
function Ht(e, ...t) {
  const r = new Uint8Array(
    e.byteLength + t.reduce((i, a) => i + a.byteLength, 0),
  );
  r.set(new Uint8Array(e), 0);
  let n = e.byteLength;
  for (const i of t) r.set(new Uint8Array(i), n), (n += i.byteLength);
  return r.buffer;
}
function At(e, t, r) {
  r = r.replace(/[^0-9a-fA-F]/g, "");
  const n = 2 ** (t - 24);
  r = r.slice(-n * 2).padStart(n * 2, "0");
  const i = [(e << 5) + t].concat(r.match(/../g).map((a) => parseInt(a, 16)));
  return new Uint8Array(i).buffer;
}
function Si(e, t) {
  if (t < 24) return new Uint8Array([(e << 5) + t]).buffer;
  {
    const r = t <= 255 ? 24 : t <= 65535 ? 25 : t <= 4294967295 ? 26 : 27;
    return At(e, r, t.toString(16));
  }
}
function Wo(e) {
  const t = [];
  for (let r = 0; r < e.length; r++) {
    let n = e.charCodeAt(r);
    n < 128
      ? t.push(n)
      : n < 2048
        ? t.push(192 | (n >> 6), 128 | (n & 63))
        : n < 55296 || n >= 57344
          ? t.push(224 | (n >> 12), 128 | ((n >> 6) & 63), 128 | (n & 63))
          : (r++,
            (n = ((n & 1023) << 10) | (e.charCodeAt(r) & 1023)),
            t.push(
              240 | (n >> 18),
              128 | ((n >> 12) & 63),
              128 | ((n >> 6) & 63),
              128 | (n & 63),
            ));
  }
  return Ht(new Uint8Array(Si(3, e.length)), new Uint8Array(t));
}
function Qf(e, t) {
  if (e == 14277111) return Ht(new Uint8Array([217, 217, 247]), t);
  if (e < 24) return Ht(new Uint8Array([192 + e]), t);
  {
    const r = e <= 255 ? 24 : e <= 65535 ? 25 : e <= 4294967295 ? 26 : 27,
      n = 2 ** (r - 24),
      i = e
        .toString(16)
        .slice(-n * 2)
        .padStart(n * 2, "0"),
      a = [192 + r].concat(i.match(/../g).map((d) => parseInt(d, 16)));
    return new Uint8Array(a).buffer;
  }
}
Pe.tagged = Qf;
function _n(e) {
  return new Uint8Array(e).buffer;
}
Pe.raw = _n;
function Cs(e) {
  if (isNaN(e)) throw new RangeError("Invalid number.");
  e = Math.min(Math.max(0, e), 23);
  const t = [0 + e];
  return new Uint8Array(t).buffer;
}
Pe.uSmall = Cs;
function Yo(e, t) {
  if (((e = parseInt("" + e, t)), isNaN(e)))
    throw new RangeError("Invalid number.");
  return (
    (e = Math.min(Math.max(0, e), 255)), (e = e.toString(16)), At(0, 24, e)
  );
}
Pe.u8 = Yo;
function Zo(e, t) {
  if (((e = parseInt("" + e, t)), isNaN(e)))
    throw new RangeError("Invalid number.");
  return (
    (e = Math.min(Math.max(0, e), 65535)), (e = e.toString(16)), At(0, 25, e)
  );
}
Pe.u16 = Zo;
function Xo(e, t) {
  if (((e = parseInt("" + e, t)), isNaN(e)))
    throw new RangeError("Invalid number.");
  return (
    (e = Math.min(Math.max(0, e), 4294967295)),
    (e = e.toString(16)),
    At(0, 26, e)
  );
}
Pe.u32 = Xo;
function $s(e, t) {
  if (typeof e == "string" && t == 16) {
    if (e.match(/[^0-9a-fA-F]/)) throw new RangeError("Invalid number.");
    return At(0, 27, e);
  }
  if (((e = parseInt("" + e, t)), isNaN(e)))
    throw new RangeError("Invalid number.");
  return (e = Math.min(Math.max(0, e), Jf)), (e = e.toString(16)), At(0, 27, e);
}
Pe.u64 = $s;
function Jo(e) {
  if (isNaN(e)) throw new RangeError("Invalid number.");
  if (e === 0) return Cs(0);
  e = Math.min(Math.max(0, -e), 24) - 1;
  const t = [32 + e];
  return new Uint8Array(t).buffer;
}
Pe.iSmall = Jo;
function Qo(e, t) {
  if (((e = parseInt("" + e, t)), isNaN(e)))
    throw new RangeError("Invalid number.");
  return (
    (e = Math.min(Math.max(0, -e - 1), 255)), (e = e.toString(16)), At(1, 24, e)
  );
}
Pe.i8 = Qo;
function ec(e, t) {
  if (((e = parseInt("" + e, t)), isNaN(e)))
    throw new RangeError("Invalid number.");
  return (
    (e = Math.min(Math.max(0, -e - 1), 65535)),
    (e = e.toString(16)),
    At(1, 25, e)
  );
}
Pe.i16 = ec;
function tc(e, t) {
  if (((e = parseInt("" + e, t)), isNaN(e)))
    throw new RangeError("Invalid number.");
  return (
    (e = Math.min(Math.max(0, -e - 1), 4294967295)),
    (e = e.toString(16)),
    At(1, 26, e)
  );
}
Pe.i32 = tc;
function rc(e, t) {
  if (typeof e == "string" && t == 16) {
    if (
      (e.startsWith("-") ? (e = e.slice(1)) : (e = "0"),
      e.match(/[^0-9a-fA-F]/) || e.length > 16)
    )
      throw new RangeError("Invalid number.");
    let r = !1,
      n = e.split("").reduceRight((i, a) => {
        if (r) return a + i;
        let d = parseInt(a, 16) - 1;
        return d >= 0 ? ((r = !0), d.toString(16) + i) : "f" + i;
      }, "");
    return r ? At(1, 27, n) : $s(0);
  }
  if (((e = parseInt("" + e, t)), isNaN(e)))
    throw new RangeError("Invalid number.");
  return (
    (e = Math.min(Math.max(0, -e - 1), 9007199254740992)),
    (e = e.toString(16)),
    At(1, 27, e)
  );
}
Pe.i64 = rc;
function el(e) {
  return e >= 0
    ? e < 24
      ? Cs(e)
      : e <= 255
        ? Yo(e)
        : e <= 65535
          ? Zo(e)
          : e <= 4294967295
            ? Xo(e)
            : $s(e)
    : e >= -24
      ? Jo(e)
      : e >= -255
        ? Qo(e)
        : e >= -65535
          ? ec(e)
          : e >= -4294967295
            ? tc(e)
            : rc(e);
}
Pe.number = el;
function tl(e) {
  return Ht(Si(2, e.byteLength), e);
}
Pe.bytes = tl;
function rl(e) {
  return Wo(e);
}
Pe.string = rl;
function nl(e) {
  return Ht(Si(4, e.length), ...e);
}
Pe.array = nl;
function il(e, t = !1) {
  e instanceof Map || (e = new Map(Object.entries(e)));
  let r = Array.from(e.entries());
  return (
    t && (r = r.sort(([n], [i]) => n.localeCompare(i))),
    Ht(Si(5, e.size), ...r.map(([n, i]) => Ht(Wo(n), i)))
  );
}
Pe.map = il;
function sl(e) {
  const t = new Float32Array([e]);
  return Ht(new Uint8Array([250]), new Uint8Array(t.buffer));
}
Pe.singleFloat = sl;
function al(e) {
  const t = new Float64Array([e]);
  return Ht(new Uint8Array([251]), new Uint8Array(t.buffer));
}
Pe.doubleFloat = al;
function ol(e) {
  return e ? nc() : ic();
}
Pe.bool = ol;
function nc() {
  return _n(new Uint8Array([245]));
}
Pe.true_ = nc;
function ic() {
  return _n(new Uint8Array([244]));
}
Pe.false_ = ic;
function cl() {
  return _n(new Uint8Array([246]));
}
Pe.null_ = cl;
function ul() {
  return _n(new Uint8Array([247]));
}
Pe.undefined_ = ul;
var fl =
  (Vr && Vr.__importStar) ||
  function (e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (e != null)
      for (var r in e) Object.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return (t.default = e), t;
  };
Object.defineProperty(Dr, "__esModule", { value: !0 });
const _t = fl(Pe),
  ll = [
    ArrayBuffer,
    Uint8Array,
    Uint16Array,
    Uint32Array,
    Int8Array,
    Int16Array,
    Int32Array,
    Float32Array,
    Float64Array,
  ];
class sc {
  constructor(t, r = !1) {
    (this._serializer = t),
      (this._stable = r),
      (this.name = "jsonDefault"),
      (this.priority = -100);
  }
  match(t) {
    return (
      ["undefined", "boolean", "number", "string", "object"].indexOf(
        typeof t,
      ) != -1
    );
  }
  encode(t) {
    switch (typeof t) {
      case "undefined":
        return _t.undefined_();
      case "boolean":
        return _t.bool(t);
      case "number":
        return Math.floor(t) === t ? _t.number(t) : _t.doubleFloat(t);
      case "string":
        return _t.string(t);
      case "object":
        if (t === null) return _t.null_();
        if (Array.isArray(t))
          return _t.array(t.map((r) => this._serializer.serializeValue(r)));
        if (ll.find((r) => t instanceof r)) return _t.bytes(t.buffer);
        if (Object.getOwnPropertyNames(t).indexOf("toJSON") !== -1)
          return this.encode(t.toJSON());
        if (t instanceof Map) {
          const r = new Map();
          for (const [n, i] of t.entries())
            r.set(n, this._serializer.serializeValue(i));
          return _t.map(r, this._stable);
        } else {
          const r = new Map();
          for (const [n, i] of Object.entries(t))
            r.set(n, this._serializer.serializeValue(i));
          return _t.map(r, this._stable);
        }
      default:
        throw new Error("Invalid value.");
    }
  }
}
Dr.JsonDefaultCborEncoder = sc;
class ac {
  constructor() {
    (this.name = "cborEncoder"), (this.priority = -90);
  }
  match(t) {
    return typeof t == "object" && typeof t.toCBOR == "function";
  }
  encode(t) {
    return t.toCBOR();
  }
}
Dr.ToCborEncoder = ac;
class oc {
  constructor() {
    this._encoders = new Set();
  }
  static withDefaultEncoders(t = !1) {
    const r = new this();
    return r.addEncoder(new sc(r, t)), r.addEncoder(new ac()), r;
  }
  removeEncoder(t) {
    for (const r of this._encoders.values())
      r.name == t && this._encoders.delete(r);
  }
  addEncoder(t) {
    this._encoders.add(t);
  }
  getEncoderFor(t) {
    let r = null;
    for (const n of this._encoders)
      (!r || n.priority > r.priority) && n.match(t) && (r = n);
    if (r === null) throw new Error("Could not find an encoder for value.");
    return r;
  }
  serializeValue(t) {
    return this.getEncoderFor(t).encode(t);
  }
  serialize(t) {
    return this.serializeValue(t);
  }
}
Dr.CborSerializer = oc;
class dl extends oc {
  serialize(t) {
    return _t.raw(
      new Uint8Array([
        ...new Uint8Array([217, 217, 247]),
        ...new Uint8Array(super.serializeValue(t)),
      ]),
    );
  }
}
Dr.SelfDescribeCborSerializer = dl;
(function (e) {
  function t(i) {
    for (var a in i) e.hasOwnProperty(a) || (e[a] = i[a]);
  }
  var r =
    (Vr && Vr.__importStar) ||
    function (i) {
      if (i && i.__esModule) return i;
      var a = {};
      if (i != null)
        for (var d in i) Object.hasOwnProperty.call(i, d) && (a[d] = i[d]);
      return (a.default = i), a;
    };
  Object.defineProperty(e, "__esModule", { value: !0 }), t(Dr);
  const n = r(Pe);
  e.value = n;
})(lt);
class hl {
  get name() {
    return "Principal";
  }
  get priority() {
    return 0;
  }
  match(t) {
    return t && t._isPrincipal === !0;
  }
  encode(t) {
    return lt.value.bytes(t.toUint8Array());
  }
}
class pl {
  get name() {
    return "Buffer";
  }
  get priority() {
    return 1;
  }
  match(t) {
    return t instanceof ArrayBuffer || ArrayBuffer.isView(t);
  }
  encode(t) {
    return lt.value.bytes(new Uint8Array(t));
  }
}
class yl {
  get name() {
    return "BigInt";
  }
  get priority() {
    return 1;
  }
  match(t) {
    return typeof t == "bigint";
  }
  encode(t) {
    return t > BigInt(0)
      ? lt.value.tagged(2, lt.value.bytes(Lt(t.toString(16))))
      : lt.value.tagged(3, lt.value.bytes(Lt((BigInt("-1") * t).toString(16))));
  }
}
const Oi = lt.SelfDescribeCborSerializer.withDefaultEncoders(!0);
Oi.addEncoder(new hl());
Oi.addEncoder(new pl());
Oi.addEncoder(new yl());
var hs;
(function (e) {
  (e[(e.Uint64LittleEndian = 71)] = "Uint64LittleEndian"),
    (e[(e.Semantic = 55799)] = "Semantic");
})(hs || (hs = {}));
function Gi(e) {
  return Oi.serialize(e);
}
function na(e) {
  const t = e.byteLength;
  let r = BigInt(0);
  for (let n = 0; n < t; n++) r = r * BigInt(256) + BigInt(e[n]);
  return r;
}
class gl extends Ko.Decoder {
  createByteString(t) {
    return Bt(...t);
  }
  createByteStringFromHeap(t, r) {
    return t === r
      ? new ArrayBuffer(0)
      : new Uint8Array(this._heap.slice(t, r));
  }
}
function Gt(e) {
  const t = new Uint8Array(e),
    r = new gl({
      size: t.byteLength,
      tags: { 2: (n) => na(n), 3: (n) => -na(n), [hs.Semantic]: (n) => n },
    });
  try {
    return r.decodeFirst(t);
  } catch (n) {
    throw new Error(`Failed to decode CBOR: ${n}, input: ${et(t)}`);
  }
}
const An = () => {
  if (typeof window < "u" && window.crypto && window.crypto.getRandomValues) {
    const e = new Uint32Array(1);
    return window.crypto.getRandomValues(e), e[0];
  }
  if (typeof crypto < "u" && crypto.getRandomValues) {
    const e = new Uint32Array(1);
    return crypto.getRandomValues(e), e[0];
  }
  return typeof crypto < "u" && crypto.randomInt
    ? crypto.randomInt(0, 4294967295)
    : Math.floor(Math.random() * 4294967295);
};
var ps;
(function (e) {
  e.Call = "call";
})(ps || (ps = {}));
function ys() {
  const e = new ArrayBuffer(16),
    t = new DataView(e),
    r = An(),
    n = An(),
    i = An(),
    a = An();
  return (
    t.setUint32(0, r),
    t.setUint32(4, n),
    t.setUint32(8, i),
    t.setUint32(12, a),
    e
  );
}
const ia = BigInt(1e6),
  wl = 60 * 1e3;
class Ir {
  constructor(t) {
    if (t < 90 * 1e3) {
      const c = (BigInt(Date.now() + t) * ia) / BigInt(1e9);
      this._value = c * BigInt(1e9);
      return;
    }
    const a =
      ((BigInt(Math.floor(Date.now() + t - wl)) * ia) /
        BigInt(1e9) /
        BigInt(60)) *
      BigInt(60) *
      BigInt(1e9);
    this._value = a;
  }
  toCBOR() {
    return lt.value.u64(this._value.toString(16), 16);
  }
  toHash() {
    return Ve(this._value);
  }
}
function sa(e = ys) {
  return async (t) => {
    const r = t.request.headers;
    (t.request.headers = r), t.endpoint === "call" && (t.body.nonce = e());
  };
}
function Zr(e) {
  const t = [];
  return (
    e.forEach((r, n) => {
      t.push([n, r]);
    }),
    t
  );
}
class ji extends De {
  constructor(t, r) {
    super(t),
      (this.response = r),
      (this.name = this.constructor.name),
      Object.setPrototypeOf(this, new.target.prototype);
  }
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const cc =
    BigInt(0),
  Ms = BigInt(1),
  ml = BigInt(2);
function Ri(e) {
  return (
    e instanceof Uint8Array ||
    (e != null && typeof e == "object" && e.constructor.name === "Uint8Array")
  );
}
function ur(e) {
  if (!Ri(e)) throw new Error("Uint8Array expected");
}
function sn(e, t) {
  if (typeof t != "boolean")
    throw new Error(`${e} must be valid boolean, got "${t}".`);
}
const bl = Array.from({ length: 256 }, (e, t) =>
  t.toString(16).padStart(2, "0"),
);
function xr(e) {
  ur(e);
  let t = "";
  for (let r = 0; r < e.length; r++) t += bl[e[r]];
  return t;
}
function uc(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  return BigInt(e === "" ? "0" : `0x${e}`);
}
const $t = { _0: 48, _9: 57, _A: 65, _F: 70, _a: 97, _f: 102 };
function aa(e) {
  if (e >= $t._0 && e <= $t._9) return e - $t._0;
  if (e >= $t._A && e <= $t._F) return e - ($t._A - 10);
  if (e >= $t._a && e <= $t._f) return e - ($t._a - 10);
}
function fc(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  const t = e.length,
    r = t / 2;
  if (t % 2)
    throw new Error(
      "padded hex string expected, got unpadded hex of length " + t,
    );
  const n = new Uint8Array(r);
  for (let i = 0, a = 0; i < r; i++, a += 2) {
    const d = aa(e.charCodeAt(a)),
      c = aa(e.charCodeAt(a + 1));
    if (d === void 0 || c === void 0) {
      const w = e[a] + e[a + 1];
      throw new Error(
        'hex string expected, got non-hex character "' + w + '" at index ' + a,
      );
    }
    n[i] = d * 16 + c;
  }
  return n;
}
function vt(e) {
  return uc(xr(e));
}
function an(e) {
  return ur(e), uc(xr(Uint8Array.from(e).reverse()));
}
function Qe(e, t) {
  return fc(e.toString(16).padStart(t * 2, "0"));
}
function li(e, t) {
  return Qe(e, t).reverse();
}
function ft(e, t, r) {
  let n;
  if (typeof t == "string")
    try {
      n = fc(t);
    } catch (a) {
      throw new Error(`${e} must be valid hex string, got "${t}". Cause: ${a}`);
    }
  else if (Ri(t)) n = Uint8Array.from(t);
  else throw new Error(`${e} must be hex string or Uint8Array`);
  const i = n.length;
  if (typeof r == "number" && i !== r)
    throw new Error(`${e} expected ${r} bytes, got ${i}`);
  return n;
}
function Le(...e) {
  let t = 0;
  for (let n = 0; n < e.length; n++) {
    const i = e[n];
    ur(i), (t += i.length);
  }
  const r = new Uint8Array(t);
  for (let n = 0, i = 0; n < e.length; n++) {
    const a = e[n];
    r.set(a, i), (i += a.length);
  }
  return r;
}
function Vs(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
const Li = (e) => typeof e == "bigint" && cc <= e;
function lc(e, t, r) {
  return Li(e) && Li(t) && Li(r) && t <= e && e < r;
}
function nr(e, t, r, n) {
  if (!lc(t, r, n))
    throw new Error(
      `expected valid ${e}: ${r} <= n < ${n}, got ${typeof t} ${t}`,
    );
}
function on(e) {
  let t;
  for (t = 0; e > cc; e >>= Ms, t += 1);
  return t;
}
function _l(e, t) {
  return (e >> BigInt(t)) & Ms;
}
const $n = (e) => (ml << BigInt(e - 1)) - Ms,
  xl = {
    bigint: (e) => typeof e == "bigint",
    function: (e) => typeof e == "function",
    boolean: (e) => typeof e == "boolean",
    string: (e) => typeof e == "string",
    stringOrUint8Array: (e) => typeof e == "string" || Ri(e),
    isSafeInteger: (e) => Number.isSafeInteger(e),
    array: (e) => Array.isArray(e),
    field: (e, t) => t.Fp.isValid(e),
    hash: (e) => typeof e == "function" && Number.isSafeInteger(e.outputLen),
  };
function xn(e, t, r = {}) {
  const n = (i, a, d) => {
    const c = xl[a];
    if (typeof c != "function")
      throw new Error(`Invalid validator "${a}", expected function`);
    const w = e[i];
    if (!(d && w === void 0) && !c(w, e))
      throw new Error(
        `Invalid param ${String(i)}=${w} (${typeof w}), expected ${a}`,
      );
  };
  for (const [i, a] of Object.entries(t)) n(i, a, !1);
  for (const [i, a] of Object.entries(r)) n(i, a, !0);
  return e;
}
const oa = () => {
  throw new Error("not implemented");
};
function ln(e) {
  const t = new WeakMap();
  return (r, ...n) => {
    const i = t.get(r);
    if (i !== void 0) return i;
    const a = e(r, ...n);
    return t.set(r, a), a;
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const Je =
    BigInt(0),
  Ce = BigInt(1),
  ir = BigInt(2),
  El = BigInt(3),
  gs = BigInt(4),
  ca = BigInt(5),
  ua = BigInt(8);
BigInt(9);
BigInt(16);
function Me(e, t) {
  const r = e % t;
  return r >= Je ? r : t + r;
}
function vl(e, t, r) {
  if (r <= Je || t < Je) throw new Error("Expected power/modulo > 0");
  if (r === Ce) return Je;
  let n = Ce;
  for (; t > Je; ) t & Ce && (n = (n * e) % r), (e = (e * e) % r), (t >>= Ce);
  return n;
}
function It(e, t, r) {
  let n = e;
  for (; t-- > Je; ) (n *= n), (n %= r);
  return n;
}
function fa(e, t) {
  if (e === Je || t <= Je)
    throw new Error(`invert: expected positive integers, got n=${e} mod=${t}`);
  let r = Me(e, t),
    n = t,
    i = Je,
    a = Ce;
  for (; r !== Je; ) {
    const c = n / r,
      w = n % r,
      x = i - a * c;
    (n = r), (r = w), (i = a), (a = x);
  }
  if (n !== Ce) throw new Error("invert: does not exist");
  return Me(i, t);
}
function Tl(e) {
  const t = (e - Ce) / ir;
  let r, n, i;
  for (r = e - Ce, n = 0; r % ir === Je; r /= ir, n++);
  for (i = ir; i < e && vl(i, t, e) !== e - Ce; i++);
  if (n === 1) {
    const d = (e + Ce) / gs;
    return function (w, x) {
      const B = w.pow(x, d);
      if (!w.eql(w.sqr(B), x)) throw new Error("Cannot find square root");
      return B;
    };
  }
  const a = (r + Ce) / ir;
  return function (c, w) {
    if (c.pow(w, t) === c.neg(c.ONE))
      throw new Error("Cannot find square root");
    let x = n,
      B = c.pow(c.mul(c.ONE, i), r),
      N = c.pow(w, a),
      I = c.pow(w, r);
    for (; !c.eql(I, c.ONE); ) {
      if (c.eql(I, c.ZERO)) return c.ZERO;
      let S = 1;
      for (let C = c.sqr(I); S < x && !c.eql(C, c.ONE); S++) C = c.sqr(C);
      const b = c.pow(B, Ce << BigInt(x - S - 1));
      (B = c.sqr(b)), (N = c.mul(N, b)), (I = c.mul(I, B)), (x = S);
    }
    return N;
  };
}
function Bl(e) {
  if (e % gs === El) {
    const t = (e + Ce) / gs;
    return function (n, i) {
      const a = n.pow(i, t);
      if (!n.eql(n.sqr(a), i)) throw new Error("Cannot find square root");
      return a;
    };
  }
  if (e % ua === ca) {
    const t = (e - ca) / ua;
    return function (n, i) {
      const a = n.mul(i, ir),
        d = n.pow(a, t),
        c = n.mul(i, d),
        w = n.mul(n.mul(c, ir), d),
        x = n.mul(c, n.sub(w, n.ONE));
      if (!n.eql(n.sqr(x), i)) throw new Error("Cannot find square root");
      return x;
    };
  }
  return Tl(e);
}
const Al = (e, t) => (Me(e, t) & Ce) === Ce,
  Nl = [
    "create",
    "isValid",
    "is0",
    "neg",
    "inv",
    "sqrt",
    "sqr",
    "eql",
    "add",
    "sub",
    "mul",
    "pow",
    "div",
    "addN",
    "subN",
    "mulN",
    "sqrN",
  ];
function dc(e) {
  const t = {
      ORDER: "bigint",
      MASK: "bigint",
      BYTES: "isSafeInteger",
      BITS: "isSafeInteger",
    },
    r = Nl.reduce((n, i) => ((n[i] = "function"), n), t);
  return xn(e, r);
}
function Mn(e, t, r) {
  if (r < Je) throw new Error("Expected power > 0");
  if (r === Je) return e.ONE;
  if (r === Ce) return t;
  let n = e.ONE,
    i = t;
  for (; r > Je; ) r & Ce && (n = e.mul(n, i)), (i = e.sqr(i)), (r >>= Ce);
  return n;
}
function Vn(e, t) {
  const r = new Array(t.length),
    n = t.reduce(
      (a, d, c) => (e.is0(d) ? a : ((r[c] = a), e.mul(a, d))),
      e.ONE,
    ),
    i = e.inv(n);
  return (
    t.reduceRight(
      (a, d, c) => (e.is0(d) ? a : ((r[c] = e.mul(a, r[c])), e.mul(a, d))),
      i,
    ),
    r
  );
}
function Il(e) {
  const t = (e - Ce) / ir;
  return (r, n) => r.pow(n, t);
}
function hc(e, t) {
  const r = t !== void 0 ? t : e.toString(2).length,
    n = Math.ceil(r / 8);
  return { nBitLength: r, nByteLength: n };
}
function En(e, t, r = !1, n = {}) {
  if (e <= Je) throw new Error(`Expected Field ORDER > 0, got ${e}`);
  const { nBitLength: i, nByteLength: a } = hc(e, t);
  if (a > 2048)
    throw new Error("Field lengths over 2048 bytes are not supported");
  const d = Bl(e),
    c = Object.freeze({
      ORDER: e,
      BITS: i,
      BYTES: a,
      MASK: $n(i),
      ZERO: Je,
      ONE: Ce,
      create: (w) => Me(w, e),
      isValid: (w) => {
        if (typeof w != "bigint")
          throw new Error(
            `Invalid field element: expected bigint, got ${typeof w}`,
          );
        return Je <= w && w < e;
      },
      is0: (w) => w === Je,
      isOdd: (w) => (w & Ce) === Ce,
      neg: (w) => Me(-w, e),
      eql: (w, x) => w === x,
      sqr: (w) => Me(w * w, e),
      add: (w, x) => Me(w + x, e),
      sub: (w, x) => Me(w - x, e),
      mul: (w, x) => Me(w * x, e),
      pow: (w, x) => Mn(c, w, x),
      div: (w, x) => Me(w * fa(x, e), e),
      sqrN: (w) => w * w,
      addN: (w, x) => w + x,
      subN: (w, x) => w - x,
      mulN: (w, x) => w * x,
      inv: (w) => fa(w, e),
      sqrt: n.sqrt || ((w) => d(c, w)),
      invertBatch: (w) => Vn(c, w),
      cmov: (w, x, B) => (B ? x : w),
      toBytes: (w) => (r ? li(w, a) : Qe(w, a)),
      fromBytes: (w) => {
        if (w.length !== a)
          throw new Error(`Fp.fromBytes: expected ${a}, got ${w.length}`);
        return r ? an(w) : vt(w);
      },
    });
  return Object.freeze(c);
}
function pc(e) {
  if (typeof e != "bigint") throw new Error("field order must be bigint");
  const t = e.toString(2).length;
  return Math.ceil(t / 8);
}
function yc(e) {
  const t = pc(e);
  return t + Math.ceil(t / 2);
}
function Sl(e, t, r = !1) {
  const n = e.length,
    i = pc(t),
    a = yc(t);
  if (n < 16 || n < a || n > 1024)
    throw new Error(`expected ${a}-1024 bytes of input, got ${n}`);
  const d = r ? vt(e) : an(e),
    c = Me(d, t - Ce) + Ce;
  return r ? li(c, i) : Qe(c, i);
}
const Ol = vt;
function Jt(e, t) {
  if ((dn(e), dn(t), e < 0 || e >= 1 << (8 * t)))
    throw new Error(`bad I2OSP call: value=${e} length=${t}`);
  const r = Array.from({ length: t }).fill(0);
  for (let n = t - 1; n >= 0; n--) (r[n] = e & 255), (e >>>= 8);
  return new Uint8Array(r);
}
function Rl(e, t) {
  const r = new Uint8Array(e.length);
  for (let n = 0; n < e.length; n++) r[n] = e[n] ^ t[n];
  return r;
}
function dn(e) {
  if (!Number.isSafeInteger(e)) throw new Error("number expected");
}
function Ul(e, t, r, n) {
  ur(e),
    ur(t),
    dn(r),
    t.length > 255 && (t = n(Le(Vs("H2C-OVERSIZE-DST-"), t)));
  const { outputLen: i, blockLen: a } = n,
    d = Math.ceil(r / i);
  if (r > 65535 || d > 255)
    throw new Error("expand_message_xmd: invalid lenInBytes");
  const c = Le(t, Jt(t.length, 1)),
    w = Jt(0, a),
    x = Jt(r, 2),
    B = new Array(d),
    N = n(Le(w, e, x, Jt(0, 1), c));
  B[0] = n(Le(N, Jt(1, 1), c));
  for (let S = 1; S <= d; S++) {
    const b = [Rl(N, B[S - 1]), Jt(S + 1, 1), c];
    B[S] = n(Le(...b));
  }
  return Le(...B).slice(0, r);
}
function Fl(e, t, r, n, i) {
  if ((ur(e), ur(t), dn(r), t.length > 255)) {
    const a = Math.ceil((2 * n) / 8);
    t = i
      .create({ dkLen: a })
      .update(Vs("H2C-OVERSIZE-DST-"))
      .update(t)
      .digest();
  }
  if (r > 65535 || t.length > 255)
    throw new Error("expand_message_xof: invalid lenInBytes");
  return i
    .create({ dkLen: r })
    .update(e)
    .update(Jt(r, 2))
    .update(t)
    .update(Jt(t.length, 1))
    .digest();
}
function la(e, t, r) {
  xn(r, {
    DST: "stringOrUint8Array",
    p: "bigint",
    m: "isSafeInteger",
    k: "isSafeInteger",
    hash: "hash",
  });
  const { p: n, k: i, m: a, hash: d, expand: c, DST: w } = r;
  ur(e), dn(t);
  const x = typeof w == "string" ? Vs(w) : w,
    B = n.toString(2).length,
    N = Math.ceil((B + i) / 8),
    I = t * a * N;
  let S;
  if (c === "xmd") S = Ul(e, x, I, d);
  else if (c === "xof") S = Fl(e, x, I, i, d);
  else if (c === "_internal_pass") S = e;
  else throw new Error('expand must be "xmd" or "xof"');
  const b = new Array(t);
  for (let C = 0; C < t; C++) {
    const V = new Array(a);
    for (let K = 0; K < a; K++) {
      const L = N * (K + C * a),
        W = S.subarray(L, L + N);
      V[K] = Me(Ol(W), n);
    }
    b[C] = V;
  }
  return b;
}
function gc(e, t) {
  const r = t.map((n) => Array.from(n).reverse());
  return (n, i) => {
    const [a, d, c, w] = r.map((x) =>
      x.reduce((B, N) => e.add(e.mul(B, n), N)),
    );
    return (n = e.div(a, d)), (i = e.mul(i, e.div(c, w))), { x: n, y: i };
  };
}
function da(e, t, r) {
  if (typeof t != "function") throw new Error("mapToCurve() must be defined");
  return {
    hashToCurve(n, i) {
      const a = la(n, 2, { ...r, DST: r.DST, ...i }),
        d = e.fromAffine(t(a[0])),
        c = e.fromAffine(t(a[1])),
        w = d.add(c).clearCofactor();
      return w.assertValidity(), w;
    },
    encodeToCurve(n, i) {
      const a = la(n, 1, { ...r, DST: r.encodeDST, ...i }),
        d = e.fromAffine(t(a[0])).clearCofactor();
      return d.assertValidity(), d;
    },
    mapToCurve(n) {
      if (!Array.isArray(n))
        throw new Error("mapToCurve: expected array of bigints");
      for (const a of n)
        if (typeof a != "bigint")
          throw new Error(
            `mapToCurve: expected array of bigints, got ${a} in array`,
          );
      const i = e.fromAffine(t(n)).clearCofactor();
      return i.assertValidity(), i;
    },
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const Pl =
    BigInt(0),
  Hi = BigInt(1),
  Di = new WeakMap(),
  ha = new WeakMap();
function wc(e, t) {
  const r = (a, d) => {
      const c = d.negate();
      return a ? c : d;
    },
    n = (a) => {
      if (!Number.isSafeInteger(a) || a <= 0 || a > t)
        throw new Error(`Wrong window size=${a}, should be [1..${t}]`);
    },
    i = (a) => {
      n(a);
      const d = Math.ceil(t / a) + 1,
        c = 2 ** (a - 1);
      return { windows: d, windowSize: c };
    };
  return {
    constTimeNegate: r,
    unsafeLadder(a, d) {
      let c = e.ZERO,
        w = a;
      for (; d > Pl; ) d & Hi && (c = c.add(w)), (w = w.double()), (d >>= Hi);
      return c;
    },
    precomputeWindow(a, d) {
      const { windows: c, windowSize: w } = i(d),
        x = [];
      let B = a,
        N = B;
      for (let I = 0; I < c; I++) {
        (N = B), x.push(N);
        for (let S = 1; S < w; S++) (N = N.add(B)), x.push(N);
        B = N.double();
      }
      return x;
    },
    wNAF(a, d, c) {
      const { windows: w, windowSize: x } = i(a);
      let B = e.ZERO,
        N = e.BASE;
      const I = BigInt(2 ** a - 1),
        S = 2 ** a,
        b = BigInt(a);
      for (let C = 0; C < w; C++) {
        const V = C * x;
        let K = Number(c & I);
        (c >>= b), K > x && ((K -= S), (c += Hi));
        const L = V,
          W = V + Math.abs(K) - 1,
          te = C % 2 !== 0,
          $ = K < 0;
        K === 0 ? (N = N.add(r(te, d[L]))) : (B = B.add(r($, d[W])));
      }
      return { p: B, f: N };
    },
    wNAFCached(a, d, c) {
      const w = ha.get(a) || 1;
      let x = Di.get(a);
      return (
        x || ((x = this.precomputeWindow(a, w)), w !== 1 && Di.set(a, c(x))),
        this.wNAF(w, x, d)
      );
    },
    setWindowSize(a, d) {
      n(d), ha.set(a, d), Di.delete(a);
    },
  };
}
function mc(e, t, r, n) {
  if (!Array.isArray(r) || !Array.isArray(n) || n.length !== r.length)
    throw new Error("arrays of points and scalars must have equal length");
  n.forEach((B, N) => {
    if (!t.isValid(B)) throw new Error(`wrong scalar at index ${N}`);
  }),
    r.forEach((B, N) => {
      if (!(B instanceof e)) throw new Error(`wrong point at index ${N}`);
    });
  const i = on(BigInt(r.length)),
    a = i > 12 ? i - 3 : i > 4 ? i - 2 : i ? 2 : 1,
    d = (1 << a) - 1,
    c = new Array(d + 1).fill(e.ZERO),
    w = Math.floor((t.BITS - 1) / a) * a;
  let x = e.ZERO;
  for (let B = w; B >= 0; B -= a) {
    c.fill(e.ZERO);
    for (let I = 0; I < n.length; I++) {
      const S = n[I],
        b = Number((S >> BigInt(B)) & BigInt(d));
      c[b] = c[b].add(r[I]);
    }
    let N = e.ZERO;
    for (let I = c.length - 1, S = e.ZERO; I > 0; I--)
      (S = S.add(c[I])), (N = N.add(S));
    if (((x = x.add(N)), B !== 0)) for (let I = 0; I < a; I++) x = x.double();
  }
  return x;
}
function bc(e) {
  return (
    dc(e.Fp),
    xn(
      e,
      { n: "bigint", h: "bigint", Gx: "field", Gy: "field" },
      { nBitLength: "isSafeInteger", nByteLength: "isSafeInteger" },
    ),
    Object.freeze({ ...hc(e.n, e.nBitLength), ...e, p: e.Fp.ORDER })
  );
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ function kl(
  e,
) {
  const t = bc(e);
  xn(
    t,
    { a: "field", b: "field" },
    {
      allowedPrivateKeyLengths: "array",
      wrapPrivateKey: "boolean",
      isTorsionFree: "function",
      clearCofactor: "function",
      allowInfinityPoint: "boolean",
      fromBytes: "function",
      toBytes: "function",
    },
  );
  const { endo: r, Fp: n, a: i } = t;
  if (r) {
    if (!n.eql(i, n.ZERO))
      throw new Error(
        "Endomorphism can only be defined for Koblitz curves that have a=0",
      );
    if (
      typeof r != "object" ||
      typeof r.beta != "bigint" ||
      typeof r.splitScalar != "function"
    )
      throw new Error(
        "Expected endomorphism with beta: bigint and splitScalar: function",
      );
  }
  return Object.freeze({ ...t });
}
const yr = BigInt(0),
  qe = BigInt(1),
  zt = BigInt(2),
  di = BigInt(3),
  pa = BigInt(4);
function ya(e) {
  const t = kl(e),
    { Fp: r } = t,
    n = En(t.n, t.nBitLength),
    i =
      t.toBytes ||
      ((C, V, K) => {
        const L = V.toAffine();
        return Le(Uint8Array.from([4]), r.toBytes(L.x), r.toBytes(L.y));
      }),
    a =
      t.fromBytes ||
      ((C) => {
        const V = C.subarray(1),
          K = r.fromBytes(V.subarray(0, r.BYTES)),
          L = r.fromBytes(V.subarray(r.BYTES, 2 * r.BYTES));
        return { x: K, y: L };
      });
  function d(C) {
    const { a: V, b: K } = t,
      L = r.sqr(C),
      W = r.mul(L, C);
    return r.add(r.add(W, r.mul(C, V)), K);
  }
  if (!r.eql(r.sqr(t.Gy), d(t.Gx)))
    throw new Error("bad generator point: equation left != right");
  function c(C) {
    return lc(C, qe, t.n);
  }
  function w(C) {
    const {
      allowedPrivateKeyLengths: V,
      nByteLength: K,
      wrapPrivateKey: L,
      n: W,
    } = t;
    if (V && typeof C != "bigint") {
      if ((Ri(C) && (C = xr(C)), typeof C != "string" || !V.includes(C.length)))
        throw new Error("Invalid key");
      C = C.padStart(K * 2, "0");
    }
    let te;
    try {
      te = typeof C == "bigint" ? C : vt(ft("private key", C, K));
    } catch {
      throw new Error(
        `private key must be ${K} bytes, hex or bigint, not ${typeof C}`,
      );
    }
    return L && (te = Me(te, W)), nr("private key", te, qe, W), te;
  }
  function x(C) {
    if (!(C instanceof I)) throw new Error("ProjectivePoint expected");
  }
  const B = ln((C, V) => {
      const { px: K, py: L, pz: W } = C;
      if (r.eql(W, r.ONE)) return { x: K, y: L };
      const te = C.is0();
      V == null && (V = te ? r.ONE : r.inv(W));
      const $ = r.mul(K, V),
        X = r.mul(L, V),
        q = r.mul(W, V);
      if (te) return { x: r.ZERO, y: r.ZERO };
      if (!r.eql(q, r.ONE)) throw new Error("invZ was invalid");
      return { x: $, y: X };
    }),
    N = ln((C) => {
      if (C.is0()) {
        if (t.allowInfinityPoint && !r.is0(C.py)) return;
        throw new Error("bad point: ZERO");
      }
      const { x: V, y: K } = C.toAffine();
      if (!r.isValid(V) || !r.isValid(K))
        throw new Error("bad point: x or y not FE");
      const L = r.sqr(K),
        W = d(V);
      if (!r.eql(L, W)) throw new Error("bad point: equation left != right");
      if (!C.isTorsionFree())
        throw new Error("bad point: not in prime-order subgroup");
      return !0;
    });
  class I {
    constructor(V, K, L) {
      if (
        ((this.px = V),
        (this.py = K),
        (this.pz = L),
        V == null || !r.isValid(V))
      )
        throw new Error("x required");
      if (K == null || !r.isValid(K)) throw new Error("y required");
      if (L == null || !r.isValid(L)) throw new Error("z required");
      Object.freeze(this);
    }
    static fromAffine(V) {
      const { x: K, y: L } = V || {};
      if (!V || !r.isValid(K) || !r.isValid(L))
        throw new Error("invalid affine point");
      if (V instanceof I) throw new Error("projective point not allowed");
      const W = (te) => r.eql(te, r.ZERO);
      return W(K) && W(L) ? I.ZERO : new I(K, L, r.ONE);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    static normalizeZ(V) {
      const K = r.invertBatch(V.map((L) => L.pz));
      return V.map((L, W) => L.toAffine(K[W])).map(I.fromAffine);
    }
    static fromHex(V) {
      const K = I.fromAffine(a(ft("pointHex", V)));
      return K.assertValidity(), K;
    }
    static fromPrivateKey(V) {
      return I.BASE.multiply(w(V));
    }
    static msm(V, K) {
      return mc(I, n, V, K);
    }
    _setWindowSize(V) {
      b.setWindowSize(this, V);
    }
    assertValidity() {
      N(this);
    }
    hasEvenY() {
      const { y: V } = this.toAffine();
      if (r.isOdd) return !r.isOdd(V);
      throw new Error("Field doesn't support isOdd");
    }
    equals(V) {
      x(V);
      const { px: K, py: L, pz: W } = this,
        { px: te, py: $, pz: X } = V,
        q = r.eql(r.mul(K, X), r.mul(te, W)),
        ee = r.eql(r.mul(L, X), r.mul($, W));
      return q && ee;
    }
    negate() {
      return new I(this.px, r.neg(this.py), this.pz);
    }
    double() {
      const { a: V, b: K } = t,
        L = r.mul(K, di),
        { px: W, py: te, pz: $ } = this;
      let X = r.ZERO,
        q = r.ZERO,
        ee = r.ZERO,
        ne = r.mul(W, W),
        J = r.mul(te, te),
        he = r.mul($, $),
        ue = r.mul(W, te);
      return (
        (ue = r.add(ue, ue)),
        (ee = r.mul(W, $)),
        (ee = r.add(ee, ee)),
        (X = r.mul(V, ee)),
        (q = r.mul(L, he)),
        (q = r.add(X, q)),
        (X = r.sub(J, q)),
        (q = r.add(J, q)),
        (q = r.mul(X, q)),
        (X = r.mul(ue, X)),
        (ee = r.mul(L, ee)),
        (he = r.mul(V, he)),
        (ue = r.sub(ne, he)),
        (ue = r.mul(V, ue)),
        (ue = r.add(ue, ee)),
        (ee = r.add(ne, ne)),
        (ne = r.add(ee, ne)),
        (ne = r.add(ne, he)),
        (ne = r.mul(ne, ue)),
        (q = r.add(q, ne)),
        (he = r.mul(te, $)),
        (he = r.add(he, he)),
        (ne = r.mul(he, ue)),
        (X = r.sub(X, ne)),
        (ee = r.mul(he, J)),
        (ee = r.add(ee, ee)),
        (ee = r.add(ee, ee)),
        new I(X, q, ee)
      );
    }
    add(V) {
      x(V);
      const { px: K, py: L, pz: W } = this,
        { px: te, py: $, pz: X } = V;
      let q = r.ZERO,
        ee = r.ZERO,
        ne = r.ZERO;
      const J = t.a,
        he = r.mul(t.b, di);
      let ue = r.mul(K, te),
        R = r.mul(L, $),
        P = r.mul(W, X),
        z = r.add(K, L),
        M = r.add(te, $);
      (z = r.mul(z, M)),
        (M = r.add(ue, R)),
        (z = r.sub(z, M)),
        (M = r.add(K, W));
      let G = r.add(te, X);
      return (
        (M = r.mul(M, G)),
        (G = r.add(ue, P)),
        (M = r.sub(M, G)),
        (G = r.add(L, W)),
        (q = r.add($, X)),
        (G = r.mul(G, q)),
        (q = r.add(R, P)),
        (G = r.sub(G, q)),
        (ne = r.mul(J, M)),
        (q = r.mul(he, P)),
        (ne = r.add(q, ne)),
        (q = r.sub(R, ne)),
        (ne = r.add(R, ne)),
        (ee = r.mul(q, ne)),
        (R = r.add(ue, ue)),
        (R = r.add(R, ue)),
        (P = r.mul(J, P)),
        (M = r.mul(he, M)),
        (R = r.add(R, P)),
        (P = r.sub(ue, P)),
        (P = r.mul(J, P)),
        (M = r.add(M, P)),
        (ue = r.mul(R, M)),
        (ee = r.add(ee, ue)),
        (ue = r.mul(G, M)),
        (q = r.mul(z, q)),
        (q = r.sub(q, ue)),
        (ue = r.mul(z, R)),
        (ne = r.mul(G, ne)),
        (ne = r.add(ne, ue)),
        new I(q, ee, ne)
      );
    }
    subtract(V) {
      return this.add(V.negate());
    }
    is0() {
      return this.equals(I.ZERO);
    }
    wNAF(V) {
      return b.wNAFCached(this, V, I.normalizeZ);
    }
    multiplyUnsafe(V) {
      nr("scalar", V, yr, t.n);
      const K = I.ZERO;
      if (V === yr) return K;
      if (V === qe) return this;
      const { endo: L } = t;
      if (!L) return b.unsafeLadder(this, V);
      let { k1neg: W, k1: te, k2neg: $, k2: X } = L.splitScalar(V),
        q = K,
        ee = K,
        ne = this;
      for (; te > yr || X > yr; )
        te & qe && (q = q.add(ne)),
          X & qe && (ee = ee.add(ne)),
          (ne = ne.double()),
          (te >>= qe),
          (X >>= qe);
      return (
        W && (q = q.negate()),
        $ && (ee = ee.negate()),
        (ee = new I(r.mul(ee.px, L.beta), ee.py, ee.pz)),
        q.add(ee)
      );
    }
    multiply(V) {
      const { endo: K, n: L } = t;
      nr("scalar", V, qe, L);
      let W, te;
      if (K) {
        const { k1neg: $, k1: X, k2neg: q, k2: ee } = K.splitScalar(V);
        let { p: ne, f: J } = this.wNAF(X),
          { p: he, f: ue } = this.wNAF(ee);
        (ne = b.constTimeNegate($, ne)),
          (he = b.constTimeNegate(q, he)),
          (he = new I(r.mul(he.px, K.beta), he.py, he.pz)),
          (W = ne.add(he)),
          (te = J.add(ue));
      } else {
        const { p: $, f: X } = this.wNAF(V);
        (W = $), (te = X);
      }
      return I.normalizeZ([W, te])[0];
    }
    multiplyAndAddUnsafe(V, K, L) {
      const W = I.BASE,
        te = (X, q) =>
          q === yr || q === qe || !X.equals(W)
            ? X.multiplyUnsafe(q)
            : X.multiply(q),
        $ = te(this, K).add(te(V, L));
      return $.is0() ? void 0 : $;
    }
    toAffine(V) {
      return B(this, V);
    }
    isTorsionFree() {
      const { h: V, isTorsionFree: K } = t;
      if (V === qe) return !0;
      if (K) return K(I, this);
      throw new Error(
        "isTorsionFree() has not been declared for the elliptic curve",
      );
    }
    clearCofactor() {
      const { h: V, clearCofactor: K } = t;
      return V === qe ? this : K ? K(I, this) : this.multiplyUnsafe(t.h);
    }
    toRawBytes(V = !0) {
      return sn("isCompressed", V), this.assertValidity(), i(I, this, V);
    }
    toHex(V = !0) {
      return sn("isCompressed", V), xr(this.toRawBytes(V));
    }
  }
  (I.BASE = new I(t.Gx, t.Gy, r.ONE)), (I.ZERO = new I(r.ZERO, r.ONE, r.ZERO));
  const S = t.nBitLength,
    b = wc(I, t.endo ? Math.ceil(S / 2) : S);
  return {
    CURVE: t,
    ProjectivePoint: I,
    normPrivateKeyToScalar: w,
    weierstrassEquation: d,
    isWithinCurveOrder: c,
  };
}
function Cl(e, t) {
  const r = e.ORDER;
  let n = yr;
  for (let b = r - qe; b % zt === yr; b /= zt) n += qe;
  const i = n,
    a = zt << (i - qe - qe),
    d = a * zt,
    c = (r - qe) / d,
    w = (c - qe) / zt,
    x = d - qe,
    B = a,
    N = e.pow(t, c),
    I = e.pow(t, (c + qe) / zt);
  let S = (b, C) => {
    let V = N,
      K = e.pow(C, x),
      L = e.sqr(K);
    L = e.mul(L, C);
    let W = e.mul(b, L);
    (W = e.pow(W, w)), (W = e.mul(W, K)), (K = e.mul(W, C)), (L = e.mul(W, b));
    let te = e.mul(L, K);
    W = e.pow(te, B);
    let $ = e.eql(W, e.ONE);
    (K = e.mul(L, I)),
      (W = e.mul(te, V)),
      (L = e.cmov(K, L, $)),
      (te = e.cmov(W, te, $));
    for (let X = i; X > qe; X--) {
      let q = X - zt;
      q = zt << (q - qe);
      let ee = e.pow(te, q);
      const ne = e.eql(ee, e.ONE);
      (K = e.mul(L, V)),
        (V = e.mul(V, V)),
        (ee = e.mul(te, V)),
        (L = e.cmov(K, L, ne)),
        (te = e.cmov(ee, te, ne));
    }
    return { isValid: $, value: L };
  };
  if (e.ORDER % pa === di) {
    const b = (e.ORDER - di) / pa,
      C = e.sqrt(e.neg(t));
    S = (V, K) => {
      let L = e.sqr(K);
      const W = e.mul(V, K);
      L = e.mul(L, W);
      let te = e.pow(L, b);
      te = e.mul(te, W);
      const $ = e.mul(te, C),
        X = e.mul(e.sqr(te), K),
        q = e.eql(X, V);
      let ee = e.cmov($, te, q);
      return { isValid: q, value: ee };
    };
  }
  return S;
}
function _c(e, t) {
  if ((dc(e), !e.isValid(t.A) || !e.isValid(t.B) || !e.isValid(t.Z)))
    throw new Error("mapToCurveSimpleSWU: invalid opts");
  const r = Cl(e, t.Z);
  if (!e.isOdd) throw new Error("Fp.isOdd is not implemented!");
  return (n) => {
    let i, a, d, c, w, x, B, N;
    (i = e.sqr(n)),
      (i = e.mul(i, t.Z)),
      (a = e.sqr(i)),
      (a = e.add(a, i)),
      (d = e.add(a, e.ONE)),
      (d = e.mul(d, t.B)),
      (c = e.cmov(t.Z, e.neg(a), !e.eql(a, e.ZERO))),
      (c = e.mul(c, t.A)),
      (a = e.sqr(d)),
      (x = e.sqr(c)),
      (w = e.mul(x, t.A)),
      (a = e.add(a, w)),
      (a = e.mul(a, d)),
      (x = e.mul(x, c)),
      (w = e.mul(x, t.B)),
      (a = e.add(a, w)),
      (B = e.mul(i, d));
    const { isValid: I, value: S } = r(a, x);
    (N = e.mul(i, n)),
      (N = e.mul(N, S)),
      (B = e.cmov(B, d, I)),
      (N = e.cmov(N, S, I));
    const b = e.isOdd(n) === e.isOdd(N);
    return (N = e.cmov(e.neg(N), N, b)), (B = e.div(B, c)), { x: B, y: N };
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const $l =
    BigInt(0),
  Nn = BigInt(1),
  ga = BigInt(2),
  kr = BigInt(3);
function Ml(e) {
  const t = [];
  for (; e > Nn; e >>= Nn)
    (e & Nn) === $l
      ? t.unshift(0)
      : (e & kr) === kr
        ? (t.unshift(-1), (e += Nn))
        : t.unshift(1);
  return t;
}
function Vl(e) {
  const { Fp: t, Fr: r, Fp2: n, Fp6: i, Fp12: a } = e.fields,
    d = e.params.xNegative,
    c = e.params.twistType,
    w = ya({ n: r.ORDER, ...e.G1 }),
    x = Object.assign(
      w,
      da(w.ProjectivePoint, e.G1.mapToCurve, {
        ...e.htfDefaults,
        ...e.G1.htfDefaults,
      }),
    ),
    B = ya({ n: r.ORDER, ...e.G2 }),
    N = Object.assign(
      B,
      da(B.ProjectivePoint, e.G2.mapToCurve, {
        ...e.htfDefaults,
        ...e.G2.htfDefaults,
      }),
    );
  let I;
  if (c === "multiplicative")
    I = (Y, le, _, oe, fe, we) => a.mul014(oe, Y, n.mul(le, fe), n.mul(_, we));
  else if (c === "divisive")
    I = (Y, le, _, oe, fe, we) => a.mul034(oe, n.mul(_, we), n.mul(le, fe), Y);
  else throw new Error("bls: unknown twist type");
  const S = n.div(n.ONE, n.mul(n.ONE, ga));
  function b(Y, le, _, oe) {
    const fe = n.sqr(_),
      we = n.sqr(oe),
      ie = n.mulByB(n.mul(we, kr)),
      se = n.mul(ie, kr),
      m = n.sub(n.sub(n.sqr(n.add(_, oe)), we), fe),
      s = n.sub(ie, fe),
      h = n.mul(n.sqr(le), kr),
      E = n.neg(m);
    return (
      Y.push([s, h, E]),
      (le = n.mul(n.mul(n.mul(n.sub(fe, se), le), _), S)),
      (_ = n.sub(n.sqr(n.mul(n.add(fe, se), S)), n.mul(n.sqr(ie), kr))),
      (oe = n.mul(fe, m)),
      { Rx: le, Ry: _, Rz: oe }
    );
  }
  function C(Y, le, _, oe, fe, we) {
    const ie = n.sub(_, n.mul(we, oe)),
      se = n.sub(le, n.mul(fe, oe)),
      m = n.sub(n.mul(ie, fe), n.mul(se, we)),
      s = n.neg(ie),
      h = se;
    Y.push([m, s, h]);
    const E = n.sqr(se),
      T = n.mul(E, se),
      U = n.mul(E, le),
      p = n.add(n.sub(T, n.mul(U, ga)), n.mul(n.sqr(ie), oe));
    return (
      (le = n.mul(se, p)),
      (_ = n.sub(n.mul(n.sub(U, p), ie), n.mul(T, _))),
      (oe = n.mul(oe, T)),
      { Rx: le, Ry: _, Rz: oe }
    );
  }
  const V = Ml(e.params.ateLoopSize),
    K = ln((Y) => {
      const le = Y,
        { x: _, y: oe } = le.toAffine(),
        fe = _,
        we = oe,
        ie = n.neg(oe);
      let se = fe,
        m = we,
        s = n.ONE;
      const h = [];
      for (const E of V) {
        const T = [];
        ({ Rx: se, Ry: m, Rz: s } = b(T, se, m, s)),
          E &&
            ({ Rx: se, Ry: m, Rz: s } = C(T, se, m, s, fe, E === -1 ? ie : we)),
          h.push(T);
      }
      if (e.postPrecompute) {
        const E = h[h.length - 1];
        e.postPrecompute(se, m, s, fe, we, C.bind(null, E));
      }
      return h;
    });
  function L(Y, le = !1) {
    let _ = a.ONE;
    if (Y.length) {
      const oe = Y[0][0].length;
      for (let fe = 0; fe < oe; fe++) {
        _ = a.sqr(_);
        for (const [we, ie, se] of Y)
          for (const [m, s, h] of we[fe]) _ = I(m, s, h, _, ie, se);
      }
    }
    return d && (_ = a.conjugate(_)), le ? a.finalExponentiate(_) : _;
  }
  function W(Y, le = !0) {
    const _ = [];
    x.ProjectivePoint.normalizeZ(Y.map(({ g1: oe }) => oe)),
      N.ProjectivePoint.normalizeZ(Y.map(({ g2: oe }) => oe));
    for (const { g1: oe, g2: fe } of Y) {
      if (
        oe.equals(x.ProjectivePoint.ZERO) ||
        fe.equals(N.ProjectivePoint.ZERO)
      )
        throw new Error("pairing is not available for ZERO point");
      oe.assertValidity(), fe.assertValidity();
      const we = oe.toAffine();
      _.push([K(fe), we.x, we.y]);
    }
    return L(_, le);
  }
  function te(Y, le, _ = !0) {
    return W([{ g1: Y, g2: le }], _);
  }
  const $ = {
      randomPrivateKey: () => {
        const Y = yc(r.ORDER);
        return Sl(e.randomBytes(Y), r.ORDER);
      },
      calcPairingPrecomputes: K,
    },
    { ShortSignature: X } = e.G1,
    { Signature: q } = e.G2;
  function ee(Y) {
    return Y instanceof x.ProjectivePoint ? Y : x.ProjectivePoint.fromHex(Y);
  }
  function ne(Y, le) {
    return Y instanceof x.ProjectivePoint
      ? Y
      : x.hashToCurve(ft("point", Y), le);
  }
  function J(Y) {
    return Y instanceof N.ProjectivePoint ? Y : q.fromHex(Y);
  }
  function he(Y, le) {
    return Y instanceof N.ProjectivePoint
      ? Y
      : N.hashToCurve(ft("point", Y), le);
  }
  function ue(Y) {
    return x.ProjectivePoint.fromPrivateKey(Y).toRawBytes(!0);
  }
  function R(Y) {
    return N.ProjectivePoint.fromPrivateKey(Y).toRawBytes(!0);
  }
  function P(Y, le, _) {
    const oe = he(Y, _);
    oe.assertValidity();
    const fe = oe.multiply(x.normPrivateKeyToScalar(le));
    return Y instanceof N.ProjectivePoint ? fe : q.toRawBytes(fe);
  }
  function z(Y, le, _) {
    const oe = ne(Y, _);
    oe.assertValidity();
    const fe = oe.multiply(x.normPrivateKeyToScalar(le));
    return Y instanceof x.ProjectivePoint ? fe : X.toRawBytes(fe);
  }
  function M(Y, le, _, oe) {
    const fe = ee(_),
      we = he(le, oe),
      ie = x.ProjectivePoint.BASE,
      se = J(Y),
      m = W([
        { g1: fe.negate(), g2: we },
        { g1: ie, g2: se },
      ]);
    return a.eql(m, a.ONE);
  }
  function G(Y, le, _, oe) {
    const fe = J(_),
      we = ne(le, oe),
      ie = N.ProjectivePoint.BASE,
      se = ee(Y),
      m = W([
        { g1: we, g2: fe },
        { g1: se, g2: ie.negate() },
      ]);
    return a.eql(m, a.ONE);
  }
  function Q(Y) {
    if (!Y.length) throw new Error("Expected non-empty array");
    const _ = Y.map(ee).reduce((oe, fe) => oe.add(fe), x.ProjectivePoint.ZERO);
    return Y[0] instanceof x.ProjectivePoint
      ? (_.assertValidity(), _)
      : _.toRawBytes(!0);
  }
  function re(Y) {
    if (!Y.length) throw new Error("Expected non-empty array");
    const _ = Y.map(J).reduce((oe, fe) => oe.add(fe), N.ProjectivePoint.ZERO);
    return Y[0] instanceof N.ProjectivePoint
      ? (_.assertValidity(), _)
      : q.toRawBytes(_);
  }
  function ye(Y) {
    if (!Y.length) throw new Error("Expected non-empty array");
    const _ = Y.map(ee).reduce((oe, fe) => oe.add(fe), x.ProjectivePoint.ZERO);
    return Y[0] instanceof x.ProjectivePoint
      ? (_.assertValidity(), _)
      : X.toRawBytes(_);
  }
  function ae(Y, le, _, oe) {
    if (!le.length) throw new Error("Expected non-empty messages array");
    if (_.length !== le.length)
      throw new Error("Pubkey count should equal msg count");
    const fe = J(Y),
      we = le.map((s) => he(s, oe)),
      ie = _.map(ee),
      se = new Map();
    for (let s = 0; s < ie.length; s++) {
      const h = ie[s],
        E = we[s];
      let T = se.get(E);
      T === void 0 && ((T = []), se.set(E, T)), T.push(h);
    }
    const m = [];
    try {
      for (const [s, h] of se) {
        const E = h.reduce((T, U) => T.add(U));
        m.push({ g1: E, g2: s });
      }
      return (
        m.push({ g1: x.ProjectivePoint.BASE.negate(), g2: fe }),
        a.eql(W(m), a.ONE)
      );
    } catch {
      return !1;
    }
  }
  return (
    x.ProjectivePoint.BASE._setWindowSize(4),
    {
      getPublicKey: ue,
      getPublicKeyForShortSignatures: R,
      sign: P,
      signShortSignature: z,
      verify: M,
      verifyBatch: ae,
      verifyShortSignature: G,
      aggregatePublicKeys: Q,
      aggregateSignatures: re,
      aggregateShortSignatures: ye,
      millerLoopBatch: L,
      pairing: te,
      pairingBatch: W,
      G1: x,
      G2: N,
      Signature: q,
      ShortSignature: X,
      fields: { Fr: r, Fp: t, Fp2: n, Fp6: i, Fp12: a },
      params: {
        ateLoopSize: e.params.ateLoopSize,
        r: e.params.r,
        G1b: e.G1.b,
        G2b: e.G2.b,
      },
      utils: $,
    }
  );
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const ql =
    BigInt(0),
  Cr = BigInt(1),
  Vt = BigInt(2),
  wa = BigInt(3);
function Ki(e, t, r, n, i = 1, a) {
  const d = BigInt(a === void 0 ? n : a),
    c = r ** BigInt(n),
    w = [];
  for (let x = 0; x < i; x++) {
    const B = BigInt(x + 1),
      N = [];
    for (let I = 0, S = Cr; I < n; I++) {
      const b = ((B * S - B) / d) % c;
      N.push(e.pow(t, b)), (S *= r);
    }
    w.push(N);
  }
  return w;
}
function Gl(e, t, r) {
  const n = t.pow(r, (e.ORDER - Cr) / wa),
    i = t.pow(r, (e.ORDER - Cr) / Vt);
  function a(I, S) {
    const b = t.mul(t.frobeniusMap(I, 1), n),
      C = t.mul(t.frobeniusMap(S, 1), i);
    return [b, C];
  }
  const d = t.pow(r, (e.ORDER ** Vt - Cr) / wa),
    c = t.pow(r, (e.ORDER ** Vt - Cr) / Vt);
  if (!t.eql(c, t.neg(t.ONE))) throw new Error("psiFrobenius: PSI2_Y!==-1");
  function w(I, S) {
    return [t.mul(I, d), t.neg(S)];
  }
  const x = (I) => (S, b) => {
      const C = b.toAffine(),
        V = I(C.x, C.y);
      return S.fromAffine({ x: V[0], y: V[1] });
    },
    B = x(a),
    N = x(w);
  return {
    psi: a,
    psi2: w,
    G2psi: B,
    G2psi2: N,
    PSI_X: n,
    PSI_Y: i,
    PSI2_X: d,
    PSI2_Y: c,
  };
}
function jl(e) {
  const { ORDER: t } = e,
    r = En(t),
    n = r.create(e.NONRESIDUE || BigInt(-1)),
    i = Il(t),
    a = r.div(r.ONE, Vt),
    d = Ki(r, n, r.ORDER, 2)[0],
    c = ({ c0: R, c1: P }, { c0: z, c1: M }) => ({
      c0: r.add(R, z),
      c1: r.add(P, M),
    }),
    w = ({ c0: R, c1: P }, { c0: z, c1: M }) => ({
      c0: r.sub(R, z),
      c1: r.sub(P, M),
    }),
    x = ({ c0: R, c1: P }, z) => {
      if (typeof z == "bigint") return { c0: r.mul(R, z), c1: r.mul(P, z) };
      const { c0: M, c1: G } = z;
      let Q = r.mul(R, M),
        re = r.mul(P, G);
      const ye = r.sub(Q, re),
        ae = r.sub(r.mul(r.add(R, P), r.add(M, G)), r.add(Q, re));
      return { c0: ye, c1: ae };
    },
    B = ({ c0: R, c1: P }) => {
      const z = r.add(R, P),
        M = r.sub(R, P),
        G = r.add(R, R);
      return { c0: r.mul(z, M), c1: r.mul(G, P) };
    },
    N = (R) => {
      if (R.length !== 2) throw new Error("Invalid tuple");
      const P = R.map((z) => r.create(z));
      return { c0: P[0], c1: P[1] };
    },
    I = t * t,
    S = N(e.FP2_NONRESIDUE),
    b = {
      ORDER: I,
      NONRESIDUE: S,
      BITS: on(I),
      BYTES: Math.ceil(on(I) / 8),
      MASK: $n(on(I)),
      ZERO: { c0: r.ZERO, c1: r.ZERO },
      ONE: { c0: r.ONE, c1: r.ZERO },
      create: (R) => R,
      isValid: ({ c0: R, c1: P }) =>
        typeof R == "bigint" && typeof P == "bigint",
      is0: ({ c0: R, c1: P }) => r.is0(R) && r.is0(P),
      eql: ({ c0: R, c1: P }, { c0: z, c1: M }) => r.eql(R, z) && r.eql(P, M),
      neg: ({ c0: R, c1: P }) => ({ c0: r.neg(R), c1: r.neg(P) }),
      pow: (R, P) => Mn(b, R, P),
      invertBatch: (R) => Vn(b, R),
      add: c,
      sub: w,
      mul: x,
      sqr: B,
      addN: c,
      subN: w,
      mulN: x,
      sqrN: B,
      div: (R, P) =>
        b.mul(R, typeof P == "bigint" ? r.inv(r.create(P)) : b.inv(P)),
      inv: ({ c0: R, c1: P }) => {
        const z = r.inv(r.create(R * R + P * P));
        return { c0: r.mul(z, r.create(R)), c1: r.mul(z, r.create(-P)) };
      },
      sqrt: (R) => {
        if (e.Fp2sqrt) return e.Fp2sqrt(R);
        const { c0: P, c1: z } = R;
        if (r.is0(z))
          return r.eql(i(r, P), r.ONE)
            ? b.create({ c0: r.sqrt(P), c1: r.ZERO })
            : b.create({ c0: r.ZERO, c1: r.sqrt(r.div(P, n)) });
        const M = r.sqrt(r.sub(r.sqr(P), r.mul(r.sqr(z), n)));
        let G = r.mul(r.add(M, P), a);
        const Q = i(r, G);
        !r.is0(Q) && !r.eql(Q, r.ONE) && (G = r.sub(G, M));
        const re = r.sqrt(G),
          ye = b.create({ c0: re, c1: r.div(r.mul(z, a), re) });
        if (!b.eql(b.sqr(ye), R)) throw new Error("Cannot find square root");
        const ae = ye,
          Y = b.neg(ae),
          { re: le, im: _ } = b.reim(ae),
          { re: oe, im: fe } = b.reim(Y);
        return _ > fe || (_ === fe && le > oe) ? ae : Y;
      },
      isOdd: (R) => {
        const { re: P, im: z } = b.reim(R),
          M = P % Vt,
          G = P === ql,
          Q = z % Vt;
        return BigInt(M || (G && Q)) == Cr;
      },
      fromBytes(R) {
        if (R.length !== b.BYTES)
          throw new Error(`fromBytes wrong length=${R.length}`);
        return {
          c0: r.fromBytes(R.subarray(0, r.BYTES)),
          c1: r.fromBytes(R.subarray(r.BYTES)),
        };
      },
      toBytes: ({ c0: R, c1: P }) => Le(r.toBytes(R), r.toBytes(P)),
      cmov: ({ c0: R, c1: P }, { c0: z, c1: M }, G) => ({
        c0: r.cmov(R, z, G),
        c1: r.cmov(P, M, G),
      }),
      reim: ({ c0: R, c1: P }) => ({ re: R, im: P }),
      mulByNonresidue: ({ c0: R, c1: P }) => b.mul({ c0: R, c1: P }, S),
      mulByB: e.Fp2mulByB,
      fromBigTuple: N,
      frobeniusMap: ({ c0: R, c1: P }, z) => ({
        c0: R,
        c1: r.mul(P, d[z % 2]),
      }),
    },
    C = ({ c0: R, c1: P, c2: z }, { c0: M, c1: G, c2: Q }) => ({
      c0: b.add(R, M),
      c1: b.add(P, G),
      c2: b.add(z, Q),
    }),
    V = ({ c0: R, c1: P, c2: z }, { c0: M, c1: G, c2: Q }) => ({
      c0: b.sub(R, M),
      c1: b.sub(P, G),
      c2: b.sub(z, Q),
    }),
    K = ({ c0: R, c1: P, c2: z }, M) => {
      if (typeof M == "bigint")
        return { c0: b.mul(R, M), c1: b.mul(P, M), c2: b.mul(z, M) };
      const { c0: G, c1: Q, c2: re } = M,
        ye = b.mul(R, G),
        ae = b.mul(P, Q),
        Y = b.mul(z, re);
      return {
        c0: b.add(
          ye,
          b.mulByNonresidue(
            b.sub(b.mul(b.add(P, z), b.add(Q, re)), b.add(ae, Y)),
          ),
        ),
        c1: b.add(
          b.sub(b.mul(b.add(R, P), b.add(G, Q)), b.add(ye, ae)),
          b.mulByNonresidue(Y),
        ),
        c2: b.sub(b.add(ae, b.mul(b.add(R, z), b.add(G, re))), b.add(ye, Y)),
      };
    },
    L = ({ c0: R, c1: P, c2: z }) => {
      let M = b.sqr(R),
        G = b.mul(b.mul(R, P), Vt),
        Q = b.mul(b.mul(P, z), Vt),
        re = b.sqr(z);
      return {
        c0: b.add(b.mulByNonresidue(Q), M),
        c1: b.add(b.mulByNonresidue(re), G),
        c2: b.sub(
          b.sub(b.add(b.add(G, b.sqr(b.add(b.sub(R, P), z))), Q), M),
          re,
        ),
      };
    },
    [W, te] = Ki(b, S, r.ORDER, 6, 2, 3),
    $ = {
      ORDER: b.ORDER,
      BITS: 3 * b.BITS,
      BYTES: 3 * b.BYTES,
      MASK: $n(3 * b.BITS),
      ZERO: { c0: b.ZERO, c1: b.ZERO, c2: b.ZERO },
      ONE: { c0: b.ONE, c1: b.ZERO, c2: b.ZERO },
      create: (R) => R,
      isValid: ({ c0: R, c1: P, c2: z }) =>
        b.isValid(R) && b.isValid(P) && b.isValid(z),
      is0: ({ c0: R, c1: P, c2: z }) => b.is0(R) && b.is0(P) && b.is0(z),
      neg: ({ c0: R, c1: P, c2: z }) => ({
        c0: b.neg(R),
        c1: b.neg(P),
        c2: b.neg(z),
      }),
      eql: ({ c0: R, c1: P, c2: z }, { c0: M, c1: G, c2: Q }) =>
        b.eql(R, M) && b.eql(P, G) && b.eql(z, Q),
      sqrt: oa,
      div: (R, P) =>
        $.mul(R, typeof P == "bigint" ? r.inv(r.create(P)) : $.inv(P)),
      pow: (R, P) => Mn($, R, P),
      invertBatch: (R) => Vn($, R),
      add: C,
      sub: V,
      mul: K,
      sqr: L,
      addN: C,
      subN: V,
      mulN: K,
      sqrN: L,
      inv: ({ c0: R, c1: P, c2: z }) => {
        let M = b.sub(b.sqr(R), b.mulByNonresidue(b.mul(z, P))),
          G = b.sub(b.mulByNonresidue(b.sqr(z)), b.mul(R, P)),
          Q = b.sub(b.sqr(P), b.mul(R, z)),
          re = b.inv(
            b.add(
              b.mulByNonresidue(b.add(b.mul(z, G), b.mul(P, Q))),
              b.mul(R, M),
            ),
          );
        return { c0: b.mul(re, M), c1: b.mul(re, G), c2: b.mul(re, Q) };
      },
      fromBytes: (R) => {
        if (R.length !== $.BYTES)
          throw new Error(`fromBytes wrong length=${R.length}`);
        return {
          c0: b.fromBytes(R.subarray(0, b.BYTES)),
          c1: b.fromBytes(R.subarray(b.BYTES, 2 * b.BYTES)),
          c2: b.fromBytes(R.subarray(2 * b.BYTES)),
        };
      },
      toBytes: ({ c0: R, c1: P, c2: z }) =>
        Le(b.toBytes(R), b.toBytes(P), b.toBytes(z)),
      cmov: ({ c0: R, c1: P, c2: z }, { c0: M, c1: G, c2: Q }, re) => ({
        c0: b.cmov(R, M, re),
        c1: b.cmov(P, G, re),
        c2: b.cmov(z, Q, re),
      }),
      fromBigSix: (R) => {
        if (!Array.isArray(R) || R.length !== 6)
          throw new Error("Invalid Fp6 usage");
        return {
          c0: b.fromBigTuple(R.slice(0, 2)),
          c1: b.fromBigTuple(R.slice(2, 4)),
          c2: b.fromBigTuple(R.slice(4, 6)),
        };
      },
      frobeniusMap: ({ c0: R, c1: P, c2: z }, M) => ({
        c0: b.frobeniusMap(R, M),
        c1: b.mul(b.frobeniusMap(P, M), W[M % 6]),
        c2: b.mul(b.frobeniusMap(z, M), te[M % 6]),
      }),
      mulByFp2: ({ c0: R, c1: P, c2: z }, M) => ({
        c0: b.mul(R, M),
        c1: b.mul(P, M),
        c2: b.mul(z, M),
      }),
      mulByNonresidue: ({ c0: R, c1: P, c2: z }) => ({
        c0: b.mulByNonresidue(z),
        c1: R,
        c2: P,
      }),
      mul1: ({ c0: R, c1: P, c2: z }, M) => ({
        c0: b.mulByNonresidue(b.mul(z, M)),
        c1: b.mul(R, M),
        c2: b.mul(P, M),
      }),
      mul01({ c0: R, c1: P, c2: z }, M, G) {
        let Q = b.mul(R, M),
          re = b.mul(P, G);
        return {
          c0: b.add(b.mulByNonresidue(b.sub(b.mul(b.add(P, z), G), re)), Q),
          c1: b.sub(b.sub(b.mul(b.add(M, G), b.add(R, P)), Q), re),
          c2: b.add(b.sub(b.mul(b.add(R, z), M), Q), re),
        };
      },
    },
    X = Ki(b, S, r.ORDER, 12, 1, 6)[0],
    q = ({ c0: R, c1: P }, { c0: z, c1: M }) => ({
      c0: $.add(R, z),
      c1: $.add(P, M),
    }),
    ee = ({ c0: R, c1: P }, { c0: z, c1: M }) => ({
      c0: $.sub(R, z),
      c1: $.sub(P, M),
    }),
    ne = ({ c0: R, c1: P }, z) => {
      if (typeof z == "bigint") return { c0: $.mul(R, z), c1: $.mul(P, z) };
      let { c0: M, c1: G } = z,
        Q = $.mul(R, M),
        re = $.mul(P, G);
      return {
        c0: $.add(Q, $.mulByNonresidue(re)),
        c1: $.sub($.mul($.add(R, P), $.add(M, G)), $.add(Q, re)),
      };
    },
    J = ({ c0: R, c1: P }) => {
      let z = $.mul(R, P);
      return {
        c0: $.sub(
          $.sub($.mul($.add($.mulByNonresidue(P), R), $.add(R, P)), z),
          $.mulByNonresidue(z),
        ),
        c1: $.add(z, z),
      };
    };
  function he(R, P) {
    const z = b.sqr(R),
      M = b.sqr(P);
    return {
      first: b.add(b.mulByNonresidue(M), z),
      second: b.sub(b.sub(b.sqr(b.add(R, P)), z), M),
    };
  }
  const ue = {
    ORDER: b.ORDER,
    BITS: 2 * b.BITS,
    BYTES: 2 * b.BYTES,
    MASK: $n(2 * b.BITS),
    ZERO: { c0: $.ZERO, c1: $.ZERO },
    ONE: { c0: $.ONE, c1: $.ZERO },
    create: (R) => R,
    isValid: ({ c0: R, c1: P }) => $.isValid(R) && $.isValid(P),
    is0: ({ c0: R, c1: P }) => $.is0(R) && $.is0(P),
    neg: ({ c0: R, c1: P }) => ({ c0: $.neg(R), c1: $.neg(P) }),
    eql: ({ c0: R, c1: P }, { c0: z, c1: M }) => $.eql(R, z) && $.eql(P, M),
    sqrt: oa,
    inv: ({ c0: R, c1: P }) => {
      let z = $.inv($.sub($.sqr(R), $.mulByNonresidue($.sqr(P))));
      return { c0: $.mul(R, z), c1: $.neg($.mul(P, z)) };
    },
    div: (R, P) =>
      ue.mul(R, typeof P == "bigint" ? r.inv(r.create(P)) : ue.inv(P)),
    pow: (R, P) => Mn(ue, R, P),
    invertBatch: (R) => Vn(ue, R),
    add: q,
    sub: ee,
    mul: ne,
    sqr: J,
    addN: q,
    subN: ee,
    mulN: ne,
    sqrN: J,
    fromBytes: (R) => {
      if (R.length !== ue.BYTES)
        throw new Error(`fromBytes wrong length=${R.length}`);
      return {
        c0: $.fromBytes(R.subarray(0, $.BYTES)),
        c1: $.fromBytes(R.subarray($.BYTES)),
      };
    },
    toBytes: ({ c0: R, c1: P }) => Le($.toBytes(R), $.toBytes(P)),
    cmov: ({ c0: R, c1: P }, { c0: z, c1: M }, G) => ({
      c0: $.cmov(R, z, G),
      c1: $.cmov(P, M, G),
    }),
    fromBigTwelve: (R) => ({
      c0: $.fromBigSix(R.slice(0, 6)),
      c1: $.fromBigSix(R.slice(6, 12)),
    }),
    frobeniusMap(R, P) {
      const { c0: z, c1: M, c2: G } = $.frobeniusMap(R.c1, P),
        Q = X[P % 12];
      return {
        c0: $.frobeniusMap(R.c0, P),
        c1: $.create({ c0: b.mul(z, Q), c1: b.mul(M, Q), c2: b.mul(G, Q) }),
      };
    },
    mulByFp2: ({ c0: R, c1: P }, z) => ({
      c0: $.mulByFp2(R, z),
      c1: $.mulByFp2(P, z),
    }),
    conjugate: ({ c0: R, c1: P }) => ({ c0: R, c1: $.neg(P) }),
    mul014: ({ c0: R, c1: P }, z, M, G) => {
      let Q = $.mul01(R, z, M),
        re = $.mul1(P, G);
      return {
        c0: $.add($.mulByNonresidue(re), Q),
        c1: $.sub($.sub($.mul01($.add(P, R), z, b.add(M, G)), Q), re),
      };
    },
    mul034: ({ c0: R, c1: P }, z, M, G) => {
      const Q = $.create({
          c0: b.mul(R.c0, z),
          c1: b.mul(R.c1, z),
          c2: b.mul(R.c2, z),
        }),
        re = $.mul01(P, M, G),
        ye = $.mul01($.add(R, P), b.add(z, M), G);
      return {
        c0: $.add($.mulByNonresidue(re), Q),
        c1: $.sub(ye, $.add(Q, re)),
      };
    },
    _cyclotomicSquare: e.Fp12cyclotomicSquare,
    _cyclotomicExp: e.Fp12cyclotomicExp,
    finalExponentiate: e.Fp12finalExponentiate,
  };
  return { Fp: r, Fp2: b, Fp6: $, Fp4Square: he, Fp12: ue };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const ot =
    BigInt(0),
  hi = BigInt(1),
  Ze = BigInt(2),
  In = BigInt(3),
  cn = BigInt(4),
  Qt = BigInt("0xd201000000010000"),
  Ll = on(Qt),
  {
    Fp: ge,
    Fp2: be,
    Fp6: ws,
    Fp4Square: zi,
    Fp12: Ne,
  } = jl({
    ORDER: BigInt(
      "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaab",
    ),
    FP2_NONRESIDUE: [hi, hi],
    Fp2mulByB: ({ c0: e, c1: t }) => {
      const r = ge.mul(e, cn),
        n = ge.mul(t, cn);
      return { c0: ge.sub(r, n), c1: ge.add(r, n) };
    },
    Fp12cyclotomicSquare: ({ c0: e, c1: t }) => {
      const { c0: r, c1: n, c2: i } = e,
        { c0: a, c1: d, c2: c } = t,
        { first: w, second: x } = zi(r, d),
        { first: B, second: N } = zi(a, i),
        { first: I, second: S } = zi(n, c),
        b = be.mulByNonresidue(S);
      return {
        c0: ws.create({
          c0: be.add(be.mul(be.sub(w, r), Ze), w),
          c1: be.add(be.mul(be.sub(B, n), Ze), B),
          c2: be.add(be.mul(be.sub(I, i), Ze), I),
        }),
        c1: ws.create({
          c0: be.add(be.mul(be.add(b, a), Ze), b),
          c1: be.add(be.mul(be.add(x, d), Ze), x),
          c2: be.add(be.mul(be.add(N, c), Ze), N),
        }),
      };
    },
    Fp12cyclotomicExp(e, t) {
      let r = Ne.ONE;
      for (let n = Ll - 1; n >= 0; n--)
        (r = Ne._cyclotomicSquare(r)), _l(t, n) && (r = Ne.mul(r, e));
      return r;
    },
    Fp12finalExponentiate: (e) => {
      const t = Qt,
        r = Ne.div(Ne.frobeniusMap(e, 6), e),
        n = Ne.mul(Ne.frobeniusMap(r, 2), r),
        i = Ne.conjugate(Ne._cyclotomicExp(n, t)),
        a = Ne.mul(Ne.conjugate(Ne._cyclotomicSquare(n)), i),
        d = Ne.conjugate(Ne._cyclotomicExp(a, t)),
        c = Ne.conjugate(Ne._cyclotomicExp(d, t)),
        w = Ne.mul(
          Ne.conjugate(Ne._cyclotomicExp(c, t)),
          Ne._cyclotomicSquare(i),
        ),
        x = Ne.conjugate(Ne._cyclotomicExp(w, t)),
        B = Ne.frobeniusMap(Ne.mul(i, c), 2),
        N = Ne.frobeniusMap(Ne.mul(d, n), 3),
        I = Ne.frobeniusMap(Ne.mul(w, Ne.conjugate(n)), 1),
        S = Ne.mul(Ne.mul(x, Ne.conjugate(a)), n);
      return Ne.mul(Ne.mul(Ne.mul(B, N), I), S);
    },
  }),
  ma = En(
    BigInt(
      "0x73eda753299d7d483339d80809a1d80553bda402fffe5bfeffffffff00000001",
    ),
  ),
  Hl = gc(
    be,
    [
      [
        [
          "0x5c759507e8e333ebb5b7a9a47d7ed8532c52d39fd3a042a88b58423c50ae15d5c2638e343d9c71c6238aaaaaaaa97d6",
          "0x5c759507e8e333ebb5b7a9a47d7ed8532c52d39fd3a042a88b58423c50ae15d5c2638e343d9c71c6238aaaaaaaa97d6",
        ],
        [
          "0x0",
          "0x11560bf17baa99bc32126fced787c88f984f87adf7ae0c7f9a208c6b4f20a4181472aaa9cb8d555526a9ffffffffc71a",
        ],
        [
          "0x11560bf17baa99bc32126fced787c88f984f87adf7ae0c7f9a208c6b4f20a4181472aaa9cb8d555526a9ffffffffc71e",
          "0x8ab05f8bdd54cde190937e76bc3e447cc27c3d6fbd7063fcd104635a790520c0a395554e5c6aaaa9354ffffffffe38d",
        ],
        [
          "0x171d6541fa38ccfaed6dea691f5fb614cb14b4e7f4e810aa22d6108f142b85757098e38d0f671c7188e2aaaaaaaa5ed1",
          "0x0",
        ],
      ],
      [
        [
          "0x0",
          "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa63",
        ],
        [
          "0xc",
          "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa9f",
        ],
        ["0x1", "0x0"],
      ],
      [
        [
          "0x1530477c7ab4113b59a4c18b076d11930f7da5d4a07f649bf54439d87d27e500fc8c25ebf8c92f6812cfc71c71c6d706",
          "0x1530477c7ab4113b59a4c18b076d11930f7da5d4a07f649bf54439d87d27e500fc8c25ebf8c92f6812cfc71c71c6d706",
        ],
        [
          "0x0",
          "0x5c759507e8e333ebb5b7a9a47d7ed8532c52d39fd3a042a88b58423c50ae15d5c2638e343d9c71c6238aaaaaaaa97be",
        ],
        [
          "0x11560bf17baa99bc32126fced787c88f984f87adf7ae0c7f9a208c6b4f20a4181472aaa9cb8d555526a9ffffffffc71c",
          "0x8ab05f8bdd54cde190937e76bc3e447cc27c3d6fbd7063fcd104635a790520c0a395554e5c6aaaa9354ffffffffe38f",
        ],
        [
          "0x124c9ad43b6cf79bfbf7043de3811ad0761b0f37a1e26286b0e977c69aa274524e79097a56dc4bd9e1b371c71c718b10",
          "0x0",
        ],
      ],
      [
        [
          "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffa8fb",
          "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffa8fb",
        ],
        [
          "0x0",
          "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffa9d3",
        ],
        [
          "0x12",
          "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa99",
        ],
        ["0x1", "0x0"],
      ],
    ].map((e) => e.map((t) => be.fromBigTuple(t.map(BigInt)))),
  ),
  Dl = gc(
    ge,
    [
      [
        "0x11a05f2b1e833340b809101dd99815856b303e88a2d7005ff2627b56cdb4e2c85610c2d5f2e62d6eaeac1662734649b7",
        "0x17294ed3e943ab2f0588bab22147a81c7c17e75b2f6a8417f565e33c70d1e86b4838f2a6f318c356e834eef1b3cb83bb",
        "0xd54005db97678ec1d1048c5d10a9a1bce032473295983e56878e501ec68e25c958c3e3d2a09729fe0179f9dac9edcb0",
        "0x1778e7166fcc6db74e0609d307e55412d7f5e4656a8dbf25f1b33289f1b330835336e25ce3107193c5b388641d9b6861",
        "0xe99726a3199f4436642b4b3e4118e5499db995a1257fb3f086eeb65982fac18985a286f301e77c451154ce9ac8895d9",
        "0x1630c3250d7313ff01d1201bf7a74ab5db3cb17dd952799b9ed3ab9097e68f90a0870d2dcae73d19cd13c1c66f652983",
        "0xd6ed6553fe44d296a3726c38ae652bfb11586264f0f8ce19008e218f9c86b2a8da25128c1052ecaddd7f225a139ed84",
        "0x17b81e7701abdbe2e8743884d1117e53356de5ab275b4db1a682c62ef0f2753339b7c8f8c8f475af9ccb5618e3f0c88e",
        "0x80d3cf1f9a78fc47b90b33563be990dc43b756ce79f5574a2c596c928c5d1de4fa295f296b74e956d71986a8497e317",
        "0x169b1f8e1bcfa7c42e0c37515d138f22dd2ecb803a0c5c99676314baf4bb1b7fa3190b2edc0327797f241067be390c9e",
        "0x10321da079ce07e272d8ec09d2565b0dfa7dccdde6787f96d50af36003b14866f69b771f8c285decca67df3f1605fb7b",
        "0x6e08c248e260e70bd1e962381edee3d31d79d7e22c837bc23c0bf1bc24c6b68c24b1b80b64d391fa9c8ba2e8ba2d229",
      ],
      [
        "0x8ca8d548cff19ae18b2e62f4bd3fa6f01d5ef4ba35b48ba9c9588617fc8ac62b558d681be343df8993cf9fa40d21b1c",
        "0x12561a5deb559c4348b4711298e536367041e8ca0cf0800c0126c2588c48bf5713daa8846cb026e9e5c8276ec82b3bff",
        "0xb2962fe57a3225e8137e629bff2991f6f89416f5a718cd1fca64e00b11aceacd6a3d0967c94fedcfcc239ba5cb83e19",
        "0x3425581a58ae2fec83aafef7c40eb545b08243f16b1655154cca8abc28d6fd04976d5243eecf5c4130de8938dc62cd8",
        "0x13a8e162022914a80a6f1d5f43e7a07dffdfc759a12062bb8d6b44e833b306da9bd29ba81f35781d539d395b3532a21e",
        "0xe7355f8e4e667b955390f7f0506c6e9395735e9ce9cad4d0a43bcef24b8982f7400d24bc4228f11c02df9a29f6304a5",
        "0x772caacf16936190f3e0c63e0596721570f5799af53a1894e2e073062aede9cea73b3538f0de06cec2574496ee84a3a",
        "0x14a7ac2a9d64a8b230b3f5b074cf01996e7f63c21bca68a81996e1cdf9822c580fa5b9489d11e2d311f7d99bbdcc5a5e",
        "0xa10ecf6ada54f825e920b3dafc7a3cce07f8d1d7161366b74100da67f39883503826692abba43704776ec3a79a1d641",
        "0x95fc13ab9e92ad4476d6e3eb3a56680f682b4ee96f7d03776df533978f31c1593174e4b4b7865002d6384d168ecdd0a",
        "0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001",
      ],
      [
        "0x90d97c81ba24ee0259d1f094980dcfa11ad138e48a869522b52af6c956543d3cd0c7aee9b3ba3c2be9845719707bb33",
        "0x134996a104ee5811d51036d776fb46831223e96c254f383d0f906343eb67ad34d6c56711962fa8bfe097e75a2e41c696",
        "0xcc786baa966e66f4a384c86a3b49942552e2d658a31ce2c344be4b91400da7d26d521628b00523b8dfe240c72de1f6",
        "0x1f86376e8981c217898751ad8746757d42aa7b90eeb791c09e4a3ec03251cf9de405aba9ec61deca6355c77b0e5f4cb",
        "0x8cc03fdefe0ff135caf4fe2a21529c4195536fbe3ce50b879833fd221351adc2ee7f8dc099040a841b6daecf2e8fedb",
        "0x16603fca40634b6a2211e11db8f0a6a074a7d0d4afadb7bd76505c3d3ad5544e203f6326c95a807299b23ab13633a5f0",
        "0x4ab0b9bcfac1bbcb2c977d027796b3ce75bb8ca2be184cb5231413c4d634f3747a87ac2460f415ec961f8855fe9d6f2",
        "0x987c8d5333ab86fde9926bd2ca6c674170a05bfe3bdd81ffd038da6c26c842642f64550fedfe935a15e4ca31870fb29",
        "0x9fc4018bd96684be88c9e221e4da1bb8f3abd16679dc26c1e8b6e6a1f20cabe69d65201c78607a360370e577bdba587",
        "0xe1bba7a1186bdb5223abde7ada14a23c42a0ca7915af6fe06985e7ed1e4d43b9b3f7055dd4eba6f2bafaaebca731c30",
        "0x19713e47937cd1be0dfd0b8f1d43fb93cd2fcbcb6caf493fd1183e416389e61031bf3a5cce3fbafce813711ad011c132",
        "0x18b46a908f36f6deb918c143fed2edcc523559b8aaf0c2462e6bfe7f911f643249d9cdf41b44d606ce07c8a4d0074d8e",
        "0xb182cac101b9399d155096004f53f447aa7b12a3426b08ec02710e807b4633f06c851c1919211f20d4c04f00b971ef8",
        "0x245a394ad1eca9b72fc00ae7be315dc757b3b080d4c158013e6632d3c40659cc6cf90ad1c232a6442d9d3f5db980133",
        "0x5c129645e44cf1102a159f748c4a3fc5e673d81d7e86568d9ab0f5d396a7ce46ba1049b6579afb7866b1e715475224b",
        "0x15e6be4e990f03ce4ea50b3b42df2eb5cb181d8f84965a3957add4fa95af01b2b665027efec01c7704b456be69c8b604",
      ],
      [
        "0x16112c4c3a9c98b252181140fad0eae9601a6de578980be6eec3232b5be72e7a07f3688ef60c206d01479253b03663c1",
        "0x1962d75c2381201e1a0cbd6c43c348b885c84ff731c4d59ca4a10356f453e01f78a4260763529e3532f6102c2e49a03d",
        "0x58df3306640da276faaae7d6e8eb15778c4855551ae7f310c35a5dd279cd2eca6757cd636f96f891e2538b53dbf67f2",
        "0x16b7d288798e5395f20d23bf89edb4d1d115c5dbddbcd30e123da489e726af41727364f2c28297ada8d26d98445f5416",
        "0xbe0e079545f43e4b00cc912f8228ddcc6d19c9f0f69bbb0542eda0fc9dec916a20b15dc0fd2ededda39142311a5001d",
        "0x8d9e5297186db2d9fb266eaac783182b70152c65550d881c5ecd87b6f0f5a6449f38db9dfa9cce202c6477faaf9b7ac",
        "0x166007c08a99db2fc3ba8734ace9824b5eecfdfa8d0cf8ef5dd365bc400a0051d5fa9c01a58b1fb93d1a1399126a775c",
        "0x16a3ef08be3ea7ea03bcddfabba6ff6ee5a4375efa1f4fd7feb34fd206357132b920f5b00801dee460ee415a15812ed9",
        "0x1866c8ed336c61231a1be54fd1d74cc4f9fb0ce4c6af5920abc5750c4bf39b4852cfe2f7bb9248836b233d9d55535d4a",
        "0x167a55cda70a6e1cea820597d94a84903216f763e13d87bb5308592e7ea7d4fbc7385ea3d529b35e346ef48bb8913f55",
        "0x4d2f259eea405bd48f010a01ad2911d9c6dd039bb61a6290e591b36e636a5c871a5c29f4f83060400f8b49cba8f6aa8",
        "0xaccbb67481d033ff5852c1e48c50c477f94ff8aefce42d28c0f9a88cea7913516f968986f7ebbea9684b529e2561092",
        "0xad6b9514c767fe3c3613144b45f1496543346d98adf02267d5ceef9a00d9b8693000763e3b90ac11e99b138573345cc",
        "0x2660400eb2e4f3b628bdd0d53cd76f2bf565b94e72927c1cb748df27942480e420517bd8714cc80d1fadc1326ed06f7",
        "0xe0fa1d816ddc03e6b24255e0d7819c171c40f65e273b853324efcd6356caa205ca2f570f13497804415473a1d634b8f",
        "0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001",
      ],
    ].map((e) => e.map((t) => BigInt(t))),
  ),
  Kl = _c(be, {
    A: be.create({ c0: ge.create(ot), c1: ge.create(BigInt(240)) }),
    B: be.create({ c0: ge.create(BigInt(1012)), c1: ge.create(BigInt(1012)) }),
    Z: be.create({ c0: ge.create(BigInt(-2)), c1: ge.create(BigInt(-1)) }),
  }),
  zl = _c(ge, {
    A: ge.create(
      BigInt(
        "0x144698a3b8e9433d693a02c96d4982b0ea985383ee66a8d8e8981aefd881ac98936f8da0e0f97f5cf428082d584c1d",
      ),
    ),
    B: ge.create(
      BigInt(
        "0x12e2908d11688030018b12e8753eee3b2016c1f0f24f4070a0b9c14fcef35ef55a23215a316ceaa5d1cc48e98e172be0",
      ),
    ),
    Z: ge.create(BigInt(11)),
  }),
  { G2psi: ba, G2psi2: Wl } = Gl(ge, be, be.div(be.ONE, be.NONRESIDUE)),
  Wi = Object.freeze({
    DST: "BLS_SIG_BLS12381G2_XMD:SHA-256_SSWU_RO_NUL_",
    encodeDST: "BLS_SIG_BLS12381G2_XMD:SHA-256_SSWU_RO_NUL_",
    p: ge.ORDER,
    m: 2,
    k: 128,
    expand: "xmd",
    hash: Ns,
  }),
  pi = hn(ge.toBytes(ot), { infinity: !0, compressed: !0 });
function Sn(e) {
  e = e.slice();
  const t = e[0] & 224,
    r = !!((t >> 7) & 1),
    n = !!((t >> 6) & 1),
    i = !!((t >> 5) & 1);
  return (e[0] &= 31), { compressed: r, infinity: n, sort: i, value: e };
}
function hn(e, t) {
  if (e[0] & 224) throw new Error("setMask: non-empty mask");
  return (
    t.compressed && (e[0] |= 128),
    t.infinity && (e[0] |= 64),
    t.sort && (e[0] |= 32),
    e
  );
}
function _a(e) {
  e.assertValidity();
  const t = e.equals(pt.G1.ProjectivePoint.ZERO),
    { x: r, y: n } = e.toAffine();
  if (t) return pi.slice();
  const i = ge.ORDER,
    a = !!((n * Ze) / i);
  return hn(Qe(r, ge.BYTES), { compressed: !0, sort: a });
}
function xa(e) {
  e.assertValidity();
  const t = ge.BYTES;
  if (e.equals(pt.G2.ProjectivePoint.ZERO)) return Le(pi, Qe(ot, t));
  const { x: r, y: n } = e.toAffine(),
    { re: i, im: a } = be.reim(r),
    { re: d, im: c } = be.reim(n),
    x = !!(((c > ot ? c * Ze : d * Ze) / ge.ORDER) & hi),
    B = i;
  return Le(hn(Qe(a, t), { sort: x, compressed: !0 }), Qe(B, t));
}
const pt = Vl({
  fields: { Fp: ge, Fp2: be, Fp6: ws, Fp12: Ne, Fr: ma },
  G1: {
    Fp: ge,
    h: BigInt("0x396c8c005555e1568c00aaab0000aaab"),
    Gx: BigInt(
      "0x17f1d3a73197d7942695638c4fa9ac0fc3688c4f9774b905a14e3a3f171bac586c55e83ff97a1aeffb3af00adb22c6bb",
    ),
    Gy: BigInt(
      "0x08b3f481e3aaa0f1a09e30ed741d8ae4fcf5e095d5d00af600db18cb2c04b3edd03cc744a2888ae40caa232946c5e7e1",
    ),
    a: ge.ZERO,
    b: cn,
    htfDefaults: {
      ...Wi,
      m: 1,
      DST: "BLS_SIG_BLS12381G1_XMD:SHA-256_SSWU_RO_NUL_",
    },
    wrapPrivateKey: !0,
    allowInfinityPoint: !0,
    isTorsionFree: (e, t) => {
      const r = BigInt(
          "0x5f19672fdf76ce51ba69c6076a0f77eaddb3a93be6f89688de17d813620a00022e01fffffffefffe",
        ),
        n = new e(ge.mul(t.px, r), t.py, t.pz);
      return t.multiplyUnsafe(Qt).negate().multiplyUnsafe(Qt).equals(n);
    },
    clearCofactor: (e, t) => t.multiplyUnsafe(Qt).add(t),
    mapToCurve: (e) => {
      const { x: t, y: r } = zl(ge.create(e[0]));
      return Dl(t, r);
    },
    fromBytes: (e) => {
      const { compressed: t, infinity: r, sort: n, value: i } = Sn(e);
      if (i.length === 48 && t) {
        const a = ge.ORDER,
          d = vt(i),
          c = ge.create(d & ge.MASK);
        if (r) {
          if (c !== ot)
            throw new Error("G1: non-empty compressed point at infinity");
          return { x: ot, y: ot };
        }
        const w = ge.add(ge.pow(c, In), ge.create(pt.params.G1b));
        let x = ge.sqrt(w);
        if (!x) throw new Error("Invalid compressed G1 point");
        return (
          (x * Ze) / a !== BigInt(n) && (x = ge.neg(x)),
          { x: ge.create(c), y: ge.create(x) }
        );
      } else if (i.length === 96 && !t) {
        const a = vt(i.subarray(0, ge.BYTES)),
          d = vt(i.subarray(ge.BYTES));
        if (r) {
          if (a !== ot || d !== ot)
            throw new Error("G1: non-empty point at infinity");
          return pt.G1.ProjectivePoint.ZERO.toAffine();
        }
        return { x: ge.create(a), y: ge.create(d) };
      } else throw new Error("Invalid point G1, expected 48/96 bytes");
    },
    toBytes: (e, t, r) => {
      const n = t.equals(e.ZERO),
        { x: i, y: a } = t.toAffine();
      if (r) {
        if (n) return pi.slice();
        const d = ge.ORDER,
          c = !!((a * Ze) / d);
        return hn(Qe(i, ge.BYTES), { compressed: !0, sort: c });
      } else
        return n
          ? Le(new Uint8Array([64]), new Uint8Array(2 * ge.BYTES - 1))
          : Le(Qe(i, ge.BYTES), Qe(a, ge.BYTES));
    },
    ShortSignature: {
      fromHex(e) {
        const {
            infinity: t,
            sort: r,
            value: n,
          } = Sn(ft("signatureHex", e, 48)),
          i = ge.ORDER,
          a = vt(n);
        if (t) return pt.G1.ProjectivePoint.ZERO;
        const d = ge.create(a & ge.MASK),
          c = ge.add(ge.pow(d, In), ge.create(pt.params.G1b));
        let w = ge.sqrt(c);
        if (!w) throw new Error("Invalid compressed G1 point");
        const x = BigInt(r);
        (w * Ze) / i !== x && (w = ge.neg(w));
        const B = pt.G1.ProjectivePoint.fromAffine({ x: d, y: w });
        return B.assertValidity(), B;
      },
      toRawBytes(e) {
        return _a(e);
      },
      toHex(e) {
        return xr(_a(e));
      },
    },
  },
  G2: {
    Fp: be,
    h: BigInt(
      "0x5d543a95414e7f1091d50792876a202cd91de4547085abaa68a205b2e5a7ddfa628f1cb4d9e82ef21537e293a6691ae1616ec6e786f0c70cf1c38e31c7238e5",
    ),
    Gx: be.fromBigTuple([
      BigInt(
        "0x024aa2b2f08f0a91260805272dc51051c6e47ad4fa403b02b4510b647ae3d1770bac0326a805bbefd48056c8c121bdb8",
      ),
      BigInt(
        "0x13e02b6052719f607dacd3a088274f65596bd0d09920b61ab5da61bbdc7f5049334cf11213945d57e5ac7d055d042b7e",
      ),
    ]),
    Gy: be.fromBigTuple([
      BigInt(
        "0x0ce5d527727d6e118cc9cdc6da2e351aadfd9baa8cbdd3a76d429a695160d12c923ac9cc3baca289e193548608b82801",
      ),
      BigInt(
        "0x0606c4a02ea734cc32acd2b02bc28b99cb3e287e85a763af267492ab572e99ab3f370d275cec1da1aaa9075ff05f79be",
      ),
    ]),
    a: be.ZERO,
    b: be.fromBigTuple([cn, cn]),
    hEff: BigInt(
      "0xbc69f08f2ee75b3584c6a0ea91b352888e2a8e9145ad7689986ff031508ffe1329c2f178731db956d82bf015d1212b02ec0ec69d7477c1ae954cbc06689f6a359894c0adebbf6b4e8020005aaa95551",
    ),
    htfDefaults: { ...Wi },
    wrapPrivateKey: !0,
    allowInfinityPoint: !0,
    mapToCurve: (e) => {
      const { x: t, y: r } = Kl(be.fromBigTuple(e));
      return Hl(t, r);
    },
    isTorsionFree: (e, t) => t.multiplyUnsafe(Qt).negate().equals(ba(e, t)),
    clearCofactor: (e, t) => {
      const r = Qt;
      let n = t.multiplyUnsafe(r).negate(),
        i = ba(e, t),
        a = t.double();
      return (
        (a = Wl(e, a)),
        (a = a.subtract(i)),
        (i = n.add(i)),
        (i = i.multiplyUnsafe(r).negate()),
        (a = a.add(i)),
        (a = a.subtract(n)),
        a.subtract(t)
      );
    },
    fromBytes: (e) => {
      const { compressed: t, infinity: r, sort: n, value: i } = Sn(e);
      if ((!t && !r && n) || (!t && r && n) || (n && r && t))
        throw new Error("Invalid encoding flag: " + (e[0] & 224));
      const a = ge.BYTES,
        d = (c, w, x) => vt(c.slice(w, x));
      if (i.length === 96 && t) {
        const c = pt.params.G2b,
          w = ge.ORDER;
        if (r) {
          if (i.reduce((C, V) => (C !== 0 ? V + 1 : V), 0) > 0)
            throw new Error("Invalid compressed G2 point");
          return { x: be.ZERO, y: be.ZERO };
        }
        const x = d(i, 0, a),
          B = d(i, a, 2 * a),
          N = be.create({ c0: ge.create(B), c1: ge.create(x) }),
          I = be.add(be.pow(N, In), c);
        let S = be.sqrt(I);
        const b = S.c1 === ot ? (S.c0 * Ze) / w : (S.c1 * Ze) / w ? hi : ot;
        return (S = n && b > 0 ? S : be.neg(S)), { x: N, y: S };
      } else if (i.length === 192 && !t) {
        if (r) {
          if (i.reduce((N, I) => (N !== 0 ? I + 1 : I), 0) > 0)
            throw new Error("Invalid uncompressed G2 point");
          return { x: be.ZERO, y: be.ZERO };
        }
        const c = d(i, 0, a),
          w = d(i, a, 2 * a),
          x = d(i, 2 * a, 3 * a),
          B = d(i, 3 * a, 4 * a);
        return { x: be.fromBigTuple([w, c]), y: be.fromBigTuple([B, x]) };
      } else throw new Error("Invalid point G2, expected 96/192 bytes");
    },
    toBytes: (e, t, r) => {
      const { BYTES: n, ORDER: i } = ge,
        a = t.equals(e.ZERO),
        { x: d, y: c } = t.toAffine();
      if (r) {
        if (a) return Le(pi, Qe(ot, n));
        const w = !!(c.c1 === ot ? (c.c0 * Ze) / i : (c.c1 * Ze) / i);
        return Le(hn(Qe(d.c1, n), { compressed: !0, sort: w }), Qe(d.c0, n));
      } else {
        if (a) return Le(new Uint8Array([64]), new Uint8Array(4 * n - 1));
        const { re: w, im: x } = be.reim(d),
          { re: B, im: N } = be.reim(c);
        return Le(Qe(x, n), Qe(w, n), Qe(N, n), Qe(B, n));
      }
    },
    Signature: {
      fromHex(e) {
        const { infinity: t, sort: r, value: n } = Sn(ft("signatureHex", e)),
          i = ge.ORDER,
          a = n.length / 2;
        if (a !== 48 && a !== 96)
          throw new Error(
            "Invalid compressed signature length, must be 96 or 192",
          );
        const d = vt(n.slice(0, a)),
          c = vt(n.slice(a));
        if (t) return pt.G2.ProjectivePoint.ZERO;
        const w = ge.create(d & ge.MASK),
          x = ge.create(c),
          B = be.create({ c0: x, c1: w }),
          N = be.add(be.pow(B, In), pt.params.G2b);
        let I = be.sqrt(N);
        if (!I) throw new Error("Failed to find a square root");
        const { re: S, im: b } = be.reim(I),
          C = BigInt(r),
          V = b > ot && (b * Ze) / i !== C,
          K = b === ot && (S * Ze) / i !== C;
        (V || K) && (I = be.neg(I));
        const L = pt.G2.ProjectivePoint.fromAffine({ x: B, y: I });
        return L.assertValidity(), L;
      },
      toRawBytes(e) {
        return xa(e);
      },
      toHex(e) {
        return xr(xa(e));
      },
    },
  },
  params: {
    ateLoopSize: Qt,
    r: ma.ORDER,
    xNegative: !0,
    twistType: "multiplicative",
  },
  htfDefaults: Wi,
  hash: Ns,
  randomBytes: Wa,
});
function Yl(e, t, r) {
  const n = typeof e == "string" ? e : et(e),
    i = typeof t == "string" ? t : et(t),
    a = typeof r == "string" ? r : et(r);
  return pt.verifyShortSignature(i, a, n);
}
const xc = (e) => Ye(new Hr(e)),
  qs = (e) => {
    const t = xc(e);
    return new Date(Number(t) / 1e6);
  };
class Ft extends De {
  constructor(t) {
    super(`Invalid certificate: ${t}`);
  }
}
var dt;
(function (e) {
  (e[(e.Empty = 0)] = "Empty"),
    (e[(e.Fork = 1)] = "Fork"),
    (e[(e.Labeled = 2)] = "Labeled"),
    (e[(e.Leaf = 3)] = "Leaf"),
    (e[(e.Pruned = 4)] = "Pruned");
})(dt || (dt = {}));
function Zl(e, t) {
  const r = new Uint8Array(e),
    n = new Uint8Array(t);
  for (let i = 0; i < r.length; i++) if (r[i] > n[i]) return !0;
  return !1;
}
class wr {
  constructor(t, r, n, i, a = 5) {
    (this._rootKey = r),
      (this._canisterId = n),
      (this._blsVerify = i),
      (this._maxAgeInMinutes = a),
      (this.cert = Gt(new Uint8Array(t)));
  }
  static async create(t) {
    const r = wr.createUnverified(t);
    return await r.verify(), r;
  }
  static createUnverified(t) {
    let r = t.blsVerify;
    return (
      r || (r = Yl),
      new wr(t.certificate, t.rootKey, t.canisterId, r, t.maxAgeInMinutes)
    );
  }
  lookup(t) {
    return jr(t, this.cert.tree);
  }
  lookup_label(t) {
    return this.lookup([t]);
  }
  async verify() {
    const t = await qn(this.cert.tree),
      r = await this._checkDelegationAndGetKey(this.cert.delegation),
      n = this.cert.signature,
      i = Jl(r),
      a = Bt(Xr("ic-state-root"), t);
    let d = !1;
    const c = gt(this.lookup(["time"]));
    if (!c) throw new Ft("Certificate does not contain a time");
    const w = 5 * 60 * 1e3,
      x = this._maxAgeInMinutes * 60 * 1e3,
      B = Date.now(),
      N = B - x,
      I = B + w,
      S = qs(c);
    if (S.getTime() < N)
      throw new Ft(
        `Certificate is signed more than ${this._maxAgeInMinutes} minutes in the past. Certificate time: ` +
          S.toISOString() +
          " Current time: " +
          new Date(B).toISOString(),
      );
    if (S.getTime() > I)
      throw new Ft(
        "Certificate is signed more than 5 minutes in the future. Certificate time: " +
          S.toISOString() +
          " Current time: " +
          new Date(B).toISOString(),
      );
    try {
      d = await this._blsVerify(
        new Uint8Array(i),
        new Uint8Array(n),
        new Uint8Array(a),
      );
    } catch {
      d = !1;
    }
    if (!d) throw new Ft("Signature verification failed");
  }
  async _checkDelegationAndGetKey(t) {
    if (!t) return this._rootKey;
    const r = await wr.createUnverified({
      certificate: t.certificate,
      rootKey: this._rootKey,
      canisterId: this._canisterId,
      blsVerify: this._blsVerify,
      maxAgeInMinutes: 1 / 0,
    });
    if (r.cert.delegation)
      throw new Ft("Delegation certificates cannot be nested");
    if (
      (await r.verify(),
      this._canisterId.toString() !== D0 &&
        !Ec({
          canisterId: this._canisterId,
          subnetId: Te.fromUint8Array(new Uint8Array(t.subnet_id)),
          tree: r.cert.tree,
        }))
    )
      throw new Ft(
        `Canister ${this._canisterId} not in range of delegations for subnet 0x${et(t.subnet_id)}`,
      );
    const n = gt(r.lookup(["subnet", t.subnet_id, "public_key"]));
    if (!n)
      throw new Error(
        `Could not find subnet key for subnet 0x${et(t.subnet_id)}`,
      );
    return n;
  }
}
const zr = Lt(
    "308182301d060d2b0601040182dc7c0503010201060c2b0601040182dc7c05030201036100",
  ),
  Xl = 96;
function Jl(e) {
  const t = zr.byteLength + Xl;
  if (e.byteLength !== t)
    throw new TypeError(`BLS DER-encoded public key must be ${t} bytes long`);
  const r = e.slice(0, zr.byteLength);
  if (!Ei(r, zr))
    throw new TypeError(
      `BLS DER-encoded public key is invalid. Expect the following prefix: ${zr}, but get ${r}`,
    );
  return e.slice(zr.byteLength);
}
function gt(e) {
  if (e.status === He.Found) {
    if (e.value instanceof ArrayBuffer) return e.value;
    if (e.value instanceof Uint8Array) return e.value.buffer;
  }
}
async function qn(e) {
  switch (e[0]) {
    case dt.Empty:
      return Tt(Xr("ic-hashtree-empty"));
    case dt.Pruned:
      return e[1];
    case dt.Leaf:
      return Tt(Bt(Xr("ic-hashtree-leaf"), e[1]));
    case dt.Labeled:
      return Tt(Bt(Xr("ic-hashtree-labeled"), e[1], await qn(e[2])));
    case dt.Fork:
      return Tt(Bt(Xr("ic-hashtree-fork"), await qn(e[1]), await qn(e[2])));
    default:
      throw new Error("unreachable");
  }
}
function Xr(e) {
  const t = new Uint8Array([e.length]),
    r = new TextEncoder().encode(e);
  return Bt(t, r);
}
var He;
(function (e) {
  (e.Unknown = "unknown"), (e.Absent = "absent"), (e.Found = "found");
})(He || (He = {}));
var qt;
(function (e) {
  (e.Less = "less"), (e.Greater = "greater");
})(qt || (qt = {}));
function jr(e, t) {
  if (e.length === 0)
    switch (t[0]) {
      case dt.Leaf: {
        if (!t[1]) throw new Error("Invalid tree structure for leaf");
        return t[1] instanceof ArrayBuffer
          ? { status: He.Found, value: t[1] }
          : t[1] instanceof Uint8Array
            ? { status: He.Found, value: t[1].buffer }
            : { status: He.Found, value: t[1] };
      }
      default:
        return { status: He.Found, value: t };
    }
  const r = typeof e[0] == "string" ? new TextEncoder().encode(e[0]) : e[0],
    n = Gn(r, t);
  switch (n.status) {
    case He.Found:
      return jr(e.slice(1), n.value);
    case qt.Greater:
    case qt.Less:
      return { status: He.Absent };
    default:
      return n;
  }
}
function ms(e) {
  switch (e[0]) {
    case dt.Empty:
      return [];
    case dt.Fork:
      return ms(e[1]).concat(ms(e[2]));
    default:
      return [e];
  }
}
function Gn(e, t) {
  switch (t[0]) {
    case dt.Labeled:
      return Zl(e, t[1])
        ? { status: qt.Greater }
        : Ei(e, t[1])
          ? { status: He.Found, value: t[2] }
          : { status: qt.Less };
    case dt.Fork:
      const r = Gn(e, t[1]);
      switch (r.status) {
        case qt.Greater: {
          const n = Gn(e, t[2]);
          return n.status === qt.Less ? { status: He.Absent } : n;
        }
        case He.Unknown: {
          let n = Gn(e, t[2]);
          return n.status === qt.Less ? { status: He.Unknown } : n;
        }
        default:
          return r;
      }
    case dt.Pruned:
      return { status: He.Unknown };
    default:
      return { status: He.Absent };
  }
}
function Ec(e) {
  const { canisterId: t, subnetId: r, tree: n } = e,
    i = jr(["subnet", r.toUint8Array(), "canister_ranges"], n);
  if (i.status !== He.Found || !(i.value instanceof ArrayBuffer))
    throw new Error(`Could not find canister ranges for subnet ${r}`);
  return Gt(i.value)
    .map((w) => [Te.fromUint8Array(w[0]), Te.fromUint8Array(w[1])])
    .some((w) => w[0].ltEq(t) && w[1].gtEq(t));
}
class Ql {
  constructor(t, r, n) {
    (this.key = t), (this.path = r), (this.decodeStrategy = n);
  }
}
const vc = async (e) => {
    const { agent: t, paths: r } = e,
      n = Te.from(e.canisterId),
      i = [...new Set(r)],
      a = i.map((w) => bs(w, n)),
      d = new Map(),
      c = i.map((w, x) =>
        (async () => {
          var B;
          try {
            const N = await t.readState(n, { paths: [a[x]] }),
              I = await wr.create({
                certificate: N.certificate,
                rootKey: t.rootKey,
                canisterId: n,
              }),
              S = (V, K) => {
                if (K === "subnet") {
                  const L = Tc(N.certificate, n, t.rootKey);
                  return { path: K, data: L };
                } else return { path: K, data: gt(V.lookup(bs(K, n))) };
              },
              { path: b, data: C } = S(I, i[x]);
            if (!C)
              console.warn(
                `Expected to find result for path ${b}, but instead found nothing.`,
              ),
                typeof b == "string" ? d.set(b, null) : d.set(b.key, null);
            else
              switch (b) {
                case "time": {
                  d.set(b, qs(C));
                  break;
                }
                case "controllers": {
                  d.set(b, t0(C));
                  break;
                }
                case "module_hash": {
                  d.set(b, Ea(C));
                  break;
                }
                case "subnet": {
                  d.set(b, C);
                  break;
                }
                case "candid": {
                  d.set(b, new TextDecoder().decode(C));
                  break;
                }
                default:
                  if (typeof b != "string" && "key" in b && "path" in b)
                    switch (b.decodeStrategy) {
                      case "raw":
                        d.set(b.key, C);
                        break;
                      case "leb128": {
                        d.set(b.key, xc(C));
                        break;
                      }
                      case "cbor": {
                        d.set(b.key, Bc(C));
                        break;
                      }
                      case "hex": {
                        d.set(b.key, Ea(C));
                        break;
                      }
                      case "utf-8":
                        d.set(b.key, e0(C));
                    }
              }
          } catch (N) {
            if (
              !((B = N?.message) === null || B === void 0) &&
              B.includes("Invalid certificate")
            )
              throw new De(N.message);
            typeof w != "string" && "key" in w && "path" in w
              ? d.set(w.key, null)
              : d.set(w, null),
              console.group(),
              console.warn(
                `Expected to find result for path ${w}, but instead found nothing.`,
              ),
              console.warn(N),
              console.groupEnd();
          }
        })(),
      );
    return await Promise.all(c), d;
  },
  Tc = (e, t, r) => {
    if (!t._isPrincipal) throw new Error("Invalid canisterId");
    const n = Gt(new Uint8Array(e)),
      i = n.tree;
    let a = n.delegation,
      d;
    if (
      (a && a.subnet_id
        ? (d = Te.fromUint8Array(new Uint8Array(a.subnet_id)))
        : !a && typeof r < "u"
          ? ((d = Te.selfAuthenticating(new Uint8Array(r))),
            (a = {
              subnet_id: d.toUint8Array(),
              certificate: new ArrayBuffer(0),
            }))
          : ((d = Te.selfAuthenticating(
              Te.fromText(
                "tdb26-jop6k-aogll-7ltgs-eruif-6kk7m-qpktf-gdiqx-mxtrf-vb5e6-eqe",
              ).toUint8Array(),
            )),
            (a = {
              subnet_id: d.toUint8Array(),
              certificate: new ArrayBuffer(0),
            })),
      !Ec({ canisterId: t, subnetId: d, tree: i }))
    )
      throw new Error("Canister not in range");
    const w = jr(["subnet", a.subnet_id, "node"], i);
    if (w.status !== He.Found) throw new Error("Node not found");
    if (w.value instanceof ArrayBuffer) throw new Error("Invalid node tree");
    const x = ms(w.value),
      B = new Map();
    return (
      x.forEach((N) => {
        const I = Te.from(new Uint8Array(N[1])).toText(),
          S = jr(["public_key"], N[2]);
        if (S.status !== He.Found) throw new Error("Public key not found");
        const b = S.value;
        if (b.byteLength !== 44) throw new Error("Invalid public key length");
        B.set(I, b);
      }),
      {
        subnetId: Te.fromUint8Array(new Uint8Array(a.subnet_id)).toText(),
        nodeKeys: B,
      }
    );
  },
  bs = (e, t) => {
    const r = new TextEncoder(),
      n = (a) => new DataView(r.encode(a).buffer).buffer,
      i = new DataView(t.toUint8Array().buffer).buffer;
    switch (e) {
      case "time":
        return [n("time")];
      case "controllers":
        return [n("canister"), i, n("controllers")];
      case "module_hash":
        return [n("canister"), i, n("module_hash")];
      case "subnet":
        return [n("subnet")];
      case "candid":
        return [n("canister"), i, n("metadata"), n("candid:service")];
      default:
        if ("key" in e && "path" in e)
          if (typeof e.path == "string" || e.path instanceof ArrayBuffer) {
            const a = e.path,
              d = typeof a == "string" ? n(a) : a;
            return [n("canister"), i, n("metadata"), d];
          } else return e.path;
    }
    throw new Error(
      `An unexpeected error was encountered while encoding your path for canister status. Please ensure that your path, ${e} was formatted correctly.`,
    );
  },
  Ea = (e) => et(e),
  Bc = (e) => Gt(e),
  e0 = (e) => new TextDecoder().decode(e),
  t0 = (e) => Bc(e).map((r) => Te.fromUint8Array(new Uint8Array(r))),
  r0 = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        CustomPath: Ql,
        encodePath: bs,
        fetchNodeKeys: Tc,
        request: vc,
      },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  ),
  On = BigInt(2 ** 32 - 1),
  _s = BigInt(32);
function Ac(e, t = !1) {
  return t
    ? { h: Number(e & On), l: Number((e >> _s) & On) }
    : { h: Number((e >> _s) & On) | 0, l: Number(e & On) | 0 };
}
function n0(e, t = !1) {
  let r = new Uint32Array(e.length),
    n = new Uint32Array(e.length);
  for (let i = 0; i < e.length; i++) {
    const { h: a, l: d } = Ac(e[i], t);
    [r[i], n[i]] = [a, d];
  }
  return [r, n];
}
const i0 = (e, t) => (BigInt(e >>> 0) << _s) | BigInt(t >>> 0),
  s0 = (e, t, r) => e >>> r,
  a0 = (e, t, r) => (e << (32 - r)) | (t >>> r),
  o0 = (e, t, r) => (e >>> r) | (t << (32 - r)),
  c0 = (e, t, r) => (e << (32 - r)) | (t >>> r),
  u0 = (e, t, r) => (e << (64 - r)) | (t >>> (r - 32)),
  f0 = (e, t, r) => (e >>> (r - 32)) | (t << (64 - r)),
  l0 = (e, t) => t,
  d0 = (e, t) => e,
  h0 = (e, t, r) => (e << r) | (t >>> (32 - r)),
  p0 = (e, t, r) => (t << r) | (e >>> (32 - r)),
  y0 = (e, t, r) => (t << (r - 32)) | (e >>> (64 - r)),
  g0 = (e, t, r) => (e << (r - 32)) | (t >>> (64 - r));
function w0(e, t, r, n) {
  const i = (t >>> 0) + (n >>> 0);
  return { h: (e + r + ((i / 2 ** 32) | 0)) | 0, l: i | 0 };
}
const m0 = (e, t, r) => (e >>> 0) + (t >>> 0) + (r >>> 0),
  b0 = (e, t, r, n) => (t + r + n + ((e / 2 ** 32) | 0)) | 0,
  _0 = (e, t, r, n) => (e >>> 0) + (t >>> 0) + (r >>> 0) + (n >>> 0),
  x0 = (e, t, r, n, i) => (t + r + n + i + ((e / 2 ** 32) | 0)) | 0,
  E0 = (e, t, r, n, i) =>
    (e >>> 0) + (t >>> 0) + (r >>> 0) + (n >>> 0) + (i >>> 0),
  v0 = (e, t, r, n, i, a) => (t + r + n + i + a + ((e / 2 ** 32) | 0)) | 0,
  ve = {
    fromBig: Ac,
    split: n0,
    toBig: i0,
    shrSH: s0,
    shrSL: a0,
    rotrSH: o0,
    rotrSL: c0,
    rotrBH: u0,
    rotrBL: f0,
    rotr32H: l0,
    rotr32L: d0,
    rotlSH: h0,
    rotlSL: p0,
    rotlBH: y0,
    rotlBL: g0,
    add: w0,
    add3L: m0,
    add3H: b0,
    add4L: _0,
    add4H: x0,
    add5H: v0,
    add5L: E0,
  },
  [T0, B0] = ve.split(
    [
      "0x428a2f98d728ae22",
      "0x7137449123ef65cd",
      "0xb5c0fbcfec4d3b2f",
      "0xe9b5dba58189dbbc",
      "0x3956c25bf348b538",
      "0x59f111f1b605d019",
      "0x923f82a4af194f9b",
      "0xab1c5ed5da6d8118",
      "0xd807aa98a3030242",
      "0x12835b0145706fbe",
      "0x243185be4ee4b28c",
      "0x550c7dc3d5ffb4e2",
      "0x72be5d74f27b896f",
      "0x80deb1fe3b1696b1",
      "0x9bdc06a725c71235",
      "0xc19bf174cf692694",
      "0xe49b69c19ef14ad2",
      "0xefbe4786384f25e3",
      "0x0fc19dc68b8cd5b5",
      "0x240ca1cc77ac9c65",
      "0x2de92c6f592b0275",
      "0x4a7484aa6ea6e483",
      "0x5cb0a9dcbd41fbd4",
      "0x76f988da831153b5",
      "0x983e5152ee66dfab",
      "0xa831c66d2db43210",
      "0xb00327c898fb213f",
      "0xbf597fc7beef0ee4",
      "0xc6e00bf33da88fc2",
      "0xd5a79147930aa725",
      "0x06ca6351e003826f",
      "0x142929670a0e6e70",
      "0x27b70a8546d22ffc",
      "0x2e1b21385c26c926",
      "0x4d2c6dfc5ac42aed",
      "0x53380d139d95b3df",
      "0x650a73548baf63de",
      "0x766a0abb3c77b2a8",
      "0x81c2c92e47edaee6",
      "0x92722c851482353b",
      "0xa2bfe8a14cf10364",
      "0xa81a664bbc423001",
      "0xc24b8b70d0f89791",
      "0xc76c51a30654be30",
      "0xd192e819d6ef5218",
      "0xd69906245565a910",
      "0xf40e35855771202a",
      "0x106aa07032bbd1b8",
      "0x19a4c116b8d2d0c8",
      "0x1e376c085141ab53",
      "0x2748774cdf8eeb99",
      "0x34b0bcb5e19b48a8",
      "0x391c0cb3c5c95a63",
      "0x4ed8aa4ae3418acb",
      "0x5b9cca4f7763e373",
      "0x682e6ff3d6b2b8a3",
      "0x748f82ee5defb2fc",
      "0x78a5636f43172f60",
      "0x84c87814a1f0ab72",
      "0x8cc702081a6439ec",
      "0x90befffa23631e28",
      "0xa4506cebde82bde9",
      "0xbef9a3f7b2c67915",
      "0xc67178f2e372532b",
      "0xca273eceea26619c",
      "0xd186b8c721c0c207",
      "0xeada7dd6cde0eb1e",
      "0xf57d4f7fee6ed178",
      "0x06f067aa72176fba",
      "0x0a637dc5a2c898a6",
      "0x113f9804bef90dae",
      "0x1b710b35131c471b",
      "0x28db77f523047d84",
      "0x32caab7b40c72493",
      "0x3c9ebe0a15c9bebc",
      "0x431d67c49c100d4c",
      "0x4cc5d4becb3e42b6",
      "0x597f299cfc657e2a",
      "0x5fcb6fab3ad6faec",
      "0x6c44198c4a475817",
    ].map((e) => BigInt(e)),
  ),
  Wt = new Uint32Array(80),
  Yt = new Uint32Array(80);
class A0 extends Ya {
  constructor() {
    super(128, 64, 16, !1),
      (this.Ah = 1779033703),
      (this.Al = -205731576),
      (this.Bh = -1150833019),
      (this.Bl = -2067093701),
      (this.Ch = 1013904242),
      (this.Cl = -23791573),
      (this.Dh = -1521486534),
      (this.Dl = 1595750129),
      (this.Eh = 1359893119),
      (this.El = -1377402159),
      (this.Fh = -1694144372),
      (this.Fl = 725511199),
      (this.Gh = 528734635),
      (this.Gl = -79577749),
      (this.Hh = 1541459225),
      (this.Hl = 327033209);
  }
  get() {
    const {
      Ah: t,
      Al: r,
      Bh: n,
      Bl: i,
      Ch: a,
      Cl: d,
      Dh: c,
      Dl: w,
      Eh: x,
      El: B,
      Fh: N,
      Fl: I,
      Gh: S,
      Gl: b,
      Hh: C,
      Hl: V,
    } = this;
    return [t, r, n, i, a, d, c, w, x, B, N, I, S, b, C, V];
  }
  set(t, r, n, i, a, d, c, w, x, B, N, I, S, b, C, V) {
    (this.Ah = t | 0),
      (this.Al = r | 0),
      (this.Bh = n | 0),
      (this.Bl = i | 0),
      (this.Ch = a | 0),
      (this.Cl = d | 0),
      (this.Dh = c | 0),
      (this.Dl = w | 0),
      (this.Eh = x | 0),
      (this.El = B | 0),
      (this.Fh = N | 0),
      (this.Fl = I | 0),
      (this.Gh = S | 0),
      (this.Gl = b | 0),
      (this.Hh = C | 0),
      (this.Hl = V | 0);
  }
  process(t, r) {
    for (let W = 0; W < 16; W++, r += 4)
      (Wt[W] = t.getUint32(r)), (Yt[W] = t.getUint32((r += 4)));
    for (let W = 16; W < 80; W++) {
      const te = Wt[W - 15] | 0,
        $ = Yt[W - 15] | 0,
        X = ve.rotrSH(te, $, 1) ^ ve.rotrSH(te, $, 8) ^ ve.shrSH(te, $, 7),
        q = ve.rotrSL(te, $, 1) ^ ve.rotrSL(te, $, 8) ^ ve.shrSL(te, $, 7),
        ee = Wt[W - 2] | 0,
        ne = Yt[W - 2] | 0,
        J = ve.rotrSH(ee, ne, 19) ^ ve.rotrBH(ee, ne, 61) ^ ve.shrSH(ee, ne, 6),
        he =
          ve.rotrSL(ee, ne, 19) ^ ve.rotrBL(ee, ne, 61) ^ ve.shrSL(ee, ne, 6),
        ue = ve.add4L(q, he, Yt[W - 7], Yt[W - 16]),
        R = ve.add4H(ue, X, J, Wt[W - 7], Wt[W - 16]);
      (Wt[W] = R | 0), (Yt[W] = ue | 0);
    }
    let {
      Ah: n,
      Al: i,
      Bh: a,
      Bl: d,
      Ch: c,
      Cl: w,
      Dh: x,
      Dl: B,
      Eh: N,
      El: I,
      Fh: S,
      Fl: b,
      Gh: C,
      Gl: V,
      Hh: K,
      Hl: L,
    } = this;
    for (let W = 0; W < 80; W++) {
      const te =
          ve.rotrSH(N, I, 14) ^ ve.rotrSH(N, I, 18) ^ ve.rotrBH(N, I, 41),
        $ = ve.rotrSL(N, I, 14) ^ ve.rotrSL(N, I, 18) ^ ve.rotrBL(N, I, 41),
        X = (N & S) ^ (~N & C),
        q = (I & b) ^ (~I & V),
        ee = ve.add5L(L, $, q, B0[W], Yt[W]),
        ne = ve.add5H(ee, K, te, X, T0[W], Wt[W]),
        J = ee | 0,
        he = ve.rotrSH(n, i, 28) ^ ve.rotrBH(n, i, 34) ^ ve.rotrBH(n, i, 39),
        ue = ve.rotrSL(n, i, 28) ^ ve.rotrBL(n, i, 34) ^ ve.rotrBL(n, i, 39),
        R = (n & a) ^ (n & c) ^ (a & c),
        P = (i & d) ^ (i & w) ^ (d & w);
      (K = C | 0),
        (L = V | 0),
        (C = S | 0),
        (V = b | 0),
        (S = N | 0),
        (b = I | 0),
        ({ h: N, l: I } = ve.add(x | 0, B | 0, ne | 0, J | 0)),
        (x = c | 0),
        (B = w | 0),
        (c = a | 0),
        (w = d | 0),
        (a = n | 0),
        (d = i | 0);
      const z = ve.add3L(J, ue, P);
      (n = ve.add3H(z, ne, he, R)), (i = z | 0);
    }
    ({ h: n, l: i } = ve.add(this.Ah | 0, this.Al | 0, n | 0, i | 0)),
      ({ h: a, l: d } = ve.add(this.Bh | 0, this.Bl | 0, a | 0, d | 0)),
      ({ h: c, l: w } = ve.add(this.Ch | 0, this.Cl | 0, c | 0, w | 0)),
      ({ h: x, l: B } = ve.add(this.Dh | 0, this.Dl | 0, x | 0, B | 0)),
      ({ h: N, l: I } = ve.add(this.Eh | 0, this.El | 0, N | 0, I | 0)),
      ({ h: S, l: b } = ve.add(this.Fh | 0, this.Fl | 0, S | 0, b | 0)),
      ({ h: C, l: V } = ve.add(this.Gh | 0, this.Gl | 0, C | 0, V | 0)),
      ({ h: K, l: L } = ve.add(this.Hh | 0, this.Hl | 0, K | 0, L | 0)),
      this.set(n, i, a, d, c, w, x, B, N, I, S, b, C, V, K, L);
  }
  roundClean() {
    Wt.fill(0), Yt.fill(0);
  }
  destroy() {
    this.buffer.fill(0),
      this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
const N0 = As(() => new A0());
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const bt =
    BigInt(0),
  ut = BigInt(1),
  Rn = BigInt(2),
  I0 = BigInt(8),
  S0 = { zip215: !0 };
function O0(e) {
  const t = bc(e);
  return (
    xn(
      e,
      { hash: "function", a: "bigint", d: "bigint", randomBytes: "function" },
      {
        adjustScalarBytes: "function",
        domain: "function",
        uvRatio: "function",
        mapToCurve: "function",
      },
    ),
    Object.freeze({ ...t })
  );
}
function R0(e) {
  const t = O0(e),
    { Fp: r, n, prehash: i, hash: a, randomBytes: d, nByteLength: c, h: w } = t,
    x = Rn << (BigInt(c * 8) - ut),
    B = r.create,
    N = En(t.n, t.nBitLength),
    I =
      t.uvRatio ||
      ((M, G) => {
        try {
          return { isValid: !0, value: r.sqrt(M * r.inv(G)) };
        } catch {
          return { isValid: !1, value: bt };
        }
      }),
    S = t.adjustScalarBytes || ((M) => M),
    b =
      t.domain ||
      ((M, G, Q) => {
        if ((sn("phflag", Q), G.length || Q))
          throw new Error("Contexts/pre-hash are not supported");
        return M;
      });
  function C(M, G) {
    nr("coordinate " + M, G, bt, x);
  }
  function V(M) {
    if (!(M instanceof W)) throw new Error("ExtendedPoint expected");
  }
  const K = ln((M, G) => {
      const { ex: Q, ey: re, ez: ye } = M,
        ae = M.is0();
      G == null && (G = ae ? I0 : r.inv(ye));
      const Y = B(Q * G),
        le = B(re * G),
        _ = B(ye * G);
      if (ae) return { x: bt, y: ut };
      if (_ !== ut) throw new Error("invZ was invalid");
      return { x: Y, y: le };
    }),
    L = ln((M) => {
      const { a: G, d: Q } = t;
      if (M.is0()) throw new Error("bad point: ZERO");
      const { ex: re, ey: ye, ez: ae, et: Y } = M,
        le = B(re * re),
        _ = B(ye * ye),
        oe = B(ae * ae),
        fe = B(oe * oe),
        we = B(le * G),
        ie = B(oe * B(we + _)),
        se = B(fe + B(Q * B(le * _)));
      if (ie !== se) throw new Error("bad point: equation left != right (1)");
      const m = B(re * ye),
        s = B(ae * Y);
      if (m !== s) throw new Error("bad point: equation left != right (2)");
      return !0;
    });
  class W {
    constructor(G, Q, re, ye) {
      (this.ex = G),
        (this.ey = Q),
        (this.ez = re),
        (this.et = ye),
        C("x", G),
        C("y", Q),
        C("z", re),
        C("t", ye),
        Object.freeze(this);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    static fromAffine(G) {
      if (G instanceof W) throw new Error("extended point not allowed");
      const { x: Q, y: re } = G || {};
      return C("x", Q), C("y", re), new W(Q, re, ut, B(Q * re));
    }
    static normalizeZ(G) {
      const Q = r.invertBatch(G.map((re) => re.ez));
      return G.map((re, ye) => re.toAffine(Q[ye])).map(W.fromAffine);
    }
    static msm(G, Q) {
      return mc(W, N, G, Q);
    }
    _setWindowSize(G) {
      X.setWindowSize(this, G);
    }
    assertValidity() {
      L(this);
    }
    equals(G) {
      V(G);
      const { ex: Q, ey: re, ez: ye } = this,
        { ex: ae, ey: Y, ez: le } = G,
        _ = B(Q * le),
        oe = B(ae * ye),
        fe = B(re * le),
        we = B(Y * ye);
      return _ === oe && fe === we;
    }
    is0() {
      return this.equals(W.ZERO);
    }
    negate() {
      return new W(B(-this.ex), this.ey, this.ez, B(-this.et));
    }
    double() {
      const { a: G } = t,
        { ex: Q, ey: re, ez: ye } = this,
        ae = B(Q * Q),
        Y = B(re * re),
        le = B(Rn * B(ye * ye)),
        _ = B(G * ae),
        oe = Q + re,
        fe = B(B(oe * oe) - ae - Y),
        we = _ + Y,
        ie = we - le,
        se = _ - Y,
        m = B(fe * ie),
        s = B(we * se),
        h = B(fe * se),
        E = B(ie * we);
      return new W(m, s, E, h);
    }
    add(G) {
      V(G);
      const { a: Q, d: re } = t,
        { ex: ye, ey: ae, ez: Y, et: le } = this,
        { ex: _, ey: oe, ez: fe, et: we } = G;
      if (Q === BigInt(-1)) {
        const v = B((ae - ye) * (oe + _)),
          O = B((ae + ye) * (oe - _)),
          j = B(O - v);
        if (j === bt) return this.double();
        const Z = B(Y * Rn * we),
          ce = B(le * Rn * fe),
          de = ce + Z,
          me = O + v,
          y = ce - Z,
          f = B(de * j),
          l = B(me * y),
          A = B(de * y),
          k = B(j * me);
        return new W(f, l, k, A);
      }
      const ie = B(ye * _),
        se = B(ae * oe),
        m = B(le * re * we),
        s = B(Y * fe),
        h = B((ye + ae) * (_ + oe) - ie - se),
        E = s - m,
        T = s + m,
        U = B(se - Q * ie),
        p = B(h * E),
        o = B(T * U),
        u = B(h * U),
        g = B(E * T);
      return new W(p, o, g, u);
    }
    subtract(G) {
      return this.add(G.negate());
    }
    wNAF(G) {
      return X.wNAFCached(this, G, W.normalizeZ);
    }
    multiply(G) {
      const Q = G;
      nr("scalar", Q, ut, n);
      const { p: re, f: ye } = this.wNAF(Q);
      return W.normalizeZ([re, ye])[0];
    }
    multiplyUnsafe(G) {
      const Q = G;
      return (
        nr("scalar", Q, bt, n),
        Q === bt
          ? $
          : this.equals($) || Q === ut
            ? this
            : this.equals(te)
              ? this.wNAF(Q).p
              : X.unsafeLadder(this, Q)
      );
    }
    isSmallOrder() {
      return this.multiplyUnsafe(w).is0();
    }
    isTorsionFree() {
      return X.unsafeLadder(this, n).is0();
    }
    toAffine(G) {
      return K(this, G);
    }
    clearCofactor() {
      const { h: G } = t;
      return G === ut ? this : this.multiplyUnsafe(G);
    }
    static fromHex(G, Q = !1) {
      const { d: re, a: ye } = t,
        ae = r.BYTES;
      (G = ft("pointHex", G, ae)), sn("zip215", Q);
      const Y = G.slice(),
        le = G[ae - 1];
      Y[ae - 1] = le & -129;
      const _ = an(Y),
        oe = Q ? x : r.ORDER;
      nr("pointHex.y", _, bt, oe);
      const fe = B(_ * _),
        we = B(fe - ut),
        ie = B(re * fe - ye);
      let { isValid: se, value: m } = I(we, ie);
      if (!se) throw new Error("Point.fromHex: invalid y coordinate");
      const s = (m & ut) === ut,
        h = (le & 128) !== 0;
      if (!Q && m === bt && h) throw new Error("Point.fromHex: x=0 and x_0=1");
      return h !== s && (m = B(-m)), W.fromAffine({ x: m, y: _ });
    }
    static fromPrivateKey(G) {
      return ne(G).point;
    }
    toRawBytes() {
      const { x: G, y: Q } = this.toAffine(),
        re = li(Q, r.BYTES);
      return (re[re.length - 1] |= G & ut ? 128 : 0), re;
    }
    toHex() {
      return xr(this.toRawBytes());
    }
  }
  (W.BASE = new W(t.Gx, t.Gy, ut, B(t.Gx * t.Gy))),
    (W.ZERO = new W(bt, ut, ut, bt));
  const { BASE: te, ZERO: $ } = W,
    X = wc(W, c * 8);
  function q(M) {
    return Me(M, n);
  }
  function ee(M) {
    return q(an(M));
  }
  function ne(M) {
    const G = c;
    M = ft("private key", M, G);
    const Q = ft("hashed private key", a(M), 2 * G),
      re = S(Q.slice(0, G)),
      ye = Q.slice(G, 2 * G),
      ae = ee(re),
      Y = te.multiply(ae),
      le = Y.toRawBytes();
    return { head: re, prefix: ye, scalar: ae, point: Y, pointBytes: le };
  }
  function J(M) {
    return ne(M).pointBytes;
  }
  function he(M = new Uint8Array(), ...G) {
    const Q = Le(...G);
    return ee(a(b(Q, ft("context", M), !!i)));
  }
  function ue(M, G, Q = {}) {
    (M = ft("message", M)), i && (M = i(M));
    const { prefix: re, scalar: ye, pointBytes: ae } = ne(G),
      Y = he(Q.context, re, M),
      le = te.multiply(Y).toRawBytes(),
      _ = he(Q.context, le, ae, M),
      oe = q(Y + _ * ye);
    nr("signature.s", oe, bt, n);
    const fe = Le(le, li(oe, r.BYTES));
    return ft("result", fe, c * 2);
  }
  const R = S0;
  function P(M, G, Q, re = R) {
    const { context: ye, zip215: ae } = re,
      Y = r.BYTES;
    (M = ft("signature", M, 2 * Y)),
      (G = ft("message", G)),
      ae !== void 0 && sn("zip215", ae),
      i && (G = i(G));
    const le = an(M.slice(Y, 2 * Y));
    let _, oe, fe;
    try {
      (_ = W.fromHex(Q, ae)),
        (oe = W.fromHex(M.slice(0, Y), ae)),
        (fe = te.multiplyUnsafe(le));
    } catch {
      return !1;
    }
    if (!ae && _.isSmallOrder()) return !1;
    const we = he(ye, oe.toRawBytes(), _.toRawBytes(), G);
    return oe
      .add(_.multiplyUnsafe(we))
      .subtract(fe)
      .clearCofactor()
      .equals(W.ZERO);
  }
  return (
    te._setWindowSize(8),
    {
      CURVE: t,
      getPublicKey: J,
      sign: ue,
      verify: P,
      ExtendedPoint: W,
      utils: {
        getExtendedPublicKey: ne,
        randomPrivateKey: () => d(r.BYTES),
        precompute(M = 8, G = W.BASE) {
          return G._setWindowSize(M), G.multiply(BigInt(3)), G;
        },
      },
    }
  );
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const Gs =
    BigInt(
      "57896044618658097711785492504343953926634992332820282019728792003956564819949",
    ),
  va = BigInt(
    "19681161376707505956807079304988542015446066515923890162744021073123829784752",
  );
BigInt(0);
const U0 = BigInt(1),
  Ta = BigInt(2);
BigInt(3);
const F0 = BigInt(5),
  P0 = BigInt(8);
function k0(e) {
  const t = BigInt(10),
    r = BigInt(20),
    n = BigInt(40),
    i = BigInt(80),
    a = Gs,
    c = (((e * e) % a) * e) % a,
    w = (It(c, Ta, a) * c) % a,
    x = (It(w, U0, a) * e) % a,
    B = (It(x, F0, a) * x) % a,
    N = (It(B, t, a) * B) % a,
    I = (It(N, r, a) * N) % a,
    S = (It(I, n, a) * I) % a,
    b = (It(S, i, a) * S) % a,
    C = (It(b, i, a) * S) % a,
    V = (It(C, t, a) * B) % a;
  return { pow_p_5_8: (It(V, Ta, a) * e) % a, b2: c };
}
function C0(e) {
  return (e[0] &= 248), (e[31] &= 127), (e[31] |= 64), e;
}
function $0(e, t) {
  const r = Gs,
    n = Me(t * t * t, r),
    i = Me(n * n * t, r),
    a = k0(e * i).pow_p_5_8;
  let d = Me(e * n * a, r);
  const c = Me(t * d * d, r),
    w = d,
    x = Me(d * va, r),
    B = c === e,
    N = c === Me(-e, r),
    I = c === Me(-e * va, r);
  return (
    B && (d = w),
    (N || I) && (d = x),
    Al(d, r) && (d = Me(-d, r)),
    { isValid: B || N, value: d }
  );
}
const M0 = En(Gs, void 0, !0),
  V0 = {
    a: BigInt(-1),
    d: BigInt(
      "37095705934669439343138083508754565189542113879843219016388785533085940283555",
    ),
    Fp: M0,
    n: BigInt(
      "7237005577332262213973186563042994240857116359379907606001950938285454250989",
    ),
    h: P0,
    Gx: BigInt(
      "15112221349535400772501151409588531511454012693041857206046113283949847762202",
    ),
    Gy: BigInt(
      "46316835694926478169428394003475163141307993866256225615783033603165251855960",
    ),
    hash: N0,
    randomBytes: Wa,
    adjustScalarBytes: C0,
    uvRatio: $0,
  },
  Sr = R0(V0);
var Ba = function (e, t, r, n, i) {
    if (n === "m") throw new TypeError("Private method is not writable");
    if (n === "a" && !i)
      throw new TypeError("Private accessor was defined without a setter");
    if (typeof t == "function" ? e !== t || !i : !t.has(e))
      throw new TypeError(
        "Cannot write private member to an object whose class did not declare it",
      );
    return n === "a" ? i.call(e, r) : i ? (i.value = r) : t.set(e, r), r;
  },
  st = function (e, t, r, n) {
    if (r === "a" && !n)
      throw new TypeError("Private accessor was defined without a getter");
    if (typeof t == "function" ? e !== t || !n : !t.has(e))
      throw new TypeError(
        "Cannot read private member from an object whose class did not declare it",
      );
    return r === "m" ? n : r === "a" ? n.call(e) : n ? n.value : t.get(e);
  },
  rt,
  Jr,
  Nc,
  Ic;
class q0 {
  constructor(t = {}) {
    rt.set(this, void 0),
      Jr.set(this, void 0),
      (this[Nc] = this.entries.bind(this)),
      (this[Ic] = "ExpirableMap");
    const { source: r = [], expirationTime: n = 10 * 60 * 1e3 } = t,
      i = Date.now();
    Ba(
      this,
      rt,
      new Map([...r].map(([a, d]) => [a, { value: d, timestamp: i }])),
      "f",
    ),
      Ba(this, Jr, n, "f");
  }
  prune() {
    const t = Date.now();
    for (const [r, n] of st(this, rt, "f").entries())
      t - n.timestamp > st(this, Jr, "f") && st(this, rt, "f").delete(r);
    return this;
  }
  set(t, r) {
    this.prune();
    const n = { value: r, timestamp: Date.now() };
    return st(this, rt, "f").set(t, n), this;
  }
  get(t) {
    const r = st(this, rt, "f").get(t);
    if (r !== void 0) {
      if (Date.now() - r.timestamp > st(this, Jr, "f")) {
        st(this, rt, "f").delete(t);
        return;
      }
      return r.value;
    }
  }
  clear() {
    st(this, rt, "f").clear();
  }
  entries() {
    const t = st(this, rt, "f").entries();
    return (function* () {
      for (const [n, i] of t) yield [n, i.value];
    })();
  }
  values() {
    const t = st(this, rt, "f").values();
    return (function* () {
      for (const n of t) yield n.value;
    })();
  }
  keys() {
    return st(this, rt, "f").keys();
  }
  forEach(t, r) {
    for (const [n, i] of st(this, rt, "f").entries())
      t.call(r, i.value, n, this);
  }
  has(t) {
    return st(this, rt, "f").has(t);
  }
  delete(t) {
    return st(this, rt, "f").delete(t);
  }
  get size() {
    return st(this, rt, "f").size;
  }
}
(rt = new WeakMap()),
  (Jr = new WeakMap()),
  (Nc = Symbol.iterator),
  (Ic = Symbol.toStringTag);
const Aa = (e) => {
    if (e <= 127) return 1;
    if (e <= 255) return 2;
    if (e <= 65535) return 3;
    if (e <= 16777215) return 4;
    throw new Error("Length too long (> 4 bytes)");
  },
  Na = (e, t, r) => {
    if (r <= 127) return (e[t] = r), 1;
    if (r <= 255) return (e[t] = 129), (e[t + 1] = r), 2;
    if (r <= 65535) return (e[t] = 130), (e[t + 1] = r >> 8), (e[t + 2] = r), 3;
    if (r <= 16777215)
      return (
        (e[t] = 131),
        (e[t + 1] = r >> 16),
        (e[t + 2] = r >> 8),
        (e[t + 3] = r),
        4
      );
    throw new Error("Length too long (> 4 bytes)");
  },
  xs = (e, t) => {
    if (e[t] < 128) return 1;
    if (e[t] === 128) throw new Error("Invalid length 0");
    if (e[t] === 129) return 2;
    if (e[t] === 130) return 3;
    if (e[t] === 131) return 4;
    throw new Error("Length too long (> 4 bytes)");
  },
  G0 = (e, t) => {
    const r = xs(e, t);
    if (r === 1) return e[t];
    if (r === 2) return e[t + 1];
    if (r === 3) return (e[t + 1] << 8) + e[t + 2];
    if (r === 4) return (e[t + 1] << 16) + (e[t + 2] << 8) + e[t + 3];
    throw new Error("Length too long (> 4 bytes)");
  };
Uint8Array.from([48, 12, 6, 10, 43, 6, 1, 4, 1, 131, 184, 67, 1, 1]);
const yi = Uint8Array.from([48, 5, 6, 3, 43, 101, 112]);
Uint8Array.from([
  48, 16, 6, 7, 42, 134, 72, 206, 61, 2, 1, 6, 5, 43, 129, 4, 0, 10,
]);
function Sc(e, t) {
  const r = 2 + Aa(e.byteLength + 1),
    n = t.byteLength + r + e.byteLength;
  let i = 0;
  const a = new Uint8Array(1 + Aa(n) + n);
  return (
    (a[i++] = 48),
    (i += Na(a, i, n)),
    a.set(t, i),
    (i += t.byteLength),
    (a[i++] = 3),
    (i += Na(a, i, e.byteLength + 1)),
    (a[i++] = 0),
    a.set(new Uint8Array(e), i),
    a
  );
}
const Oc = (e, t) => {
  let r = 0;
  const n = (c, w) => {
      if (i[r++] !== c) throw new Error("Expected: " + w);
    },
    i = new Uint8Array(e);
  if (
    (n(48, "sequence"), (r += xs(i, r)), !Ei(i.slice(r, r + t.byteLength), t))
  )
    throw new Error("Not the expected OID.");
  (r += t.byteLength), n(3, "bit string");
  const a = G0(i, r) - 1;
  (r += xs(i, r)), n(0, "0 padding");
  const d = i.slice(r);
  if (a !== d.length)
    throw new Error(
      `DER payload mismatch: Expected length ${a} actual length ${d.length}`,
    );
  return d;
};
var Ia = function (e, t, r, n, i) {
    if (n === "m") throw new TypeError("Private method is not writable");
    if (n === "a" && !i)
      throw new TypeError("Private accessor was defined without a setter");
    if (typeof t == "function" ? e !== t || !i : !t.has(e))
      throw new TypeError(
        "Cannot write private member to an object whose class did not declare it",
      );
    return n === "a" ? i.call(e, r) : i ? (i.value = r) : t.set(e, r), r;
  },
  Sa = function (e, t, r, n) {
    if (r === "a" && !n)
      throw new TypeError("Private accessor was defined without a getter");
    if (typeof t == "function" ? e !== t || !n : !t.has(e))
      throw new TypeError(
        "Cannot read private member from an object whose class did not declare it",
      );
    return r === "m" ? n : r === "a" ? n.call(e) : n ? n.value : t.get(e);
  },
  jn,
  Ln;
let Rc = class Qr {
  constructor(t) {
    if (
      (jn.set(this, void 0),
      Ln.set(this, void 0),
      t.byteLength !== Qr.RAW_KEY_LENGTH)
    )
      throw new Error("An Ed25519 public key must be exactly 32bytes long");
    Ia(this, jn, t, "f"), Ia(this, Ln, Qr.derEncode(t), "f");
  }
  static from(t) {
    return this.fromDer(t.toDer());
  }
  static fromRaw(t) {
    return new Qr(t);
  }
  static fromDer(t) {
    return new Qr(this.derDecode(t));
  }
  static derEncode(t) {
    return Sc(t, yi).buffer;
  }
  static derDecode(t) {
    const r = Oc(t, yi);
    if (r.length !== this.RAW_KEY_LENGTH)
      throw new Error("An Ed25519 public key must be exactly 32bytes long");
    return r;
  }
  get rawKey() {
    return Sa(this, jn, "f");
  }
  get derKey() {
    return Sa(this, Ln, "f");
  }
  toDer() {
    return this.derKey;
  }
  toRaw() {
    return this.rawKey;
  }
};
(jn = new WeakMap()), (Ln = new WeakMap());
Rc.RAW_KEY_LENGTH = 32;
class j0 {
  constructor() {
    this.observers = [];
  }
  subscribe(t) {
    this.observers.push(t);
  }
  unsubscribe(t) {
    this.observers = this.observers.filter((r) => r !== t);
  }
  notify(t, ...r) {
    this.observers.forEach((n) => n(t, ...r));
  }
}
class L0 extends j0 {
  constructor() {
    super();
  }
  print(t, ...r) {
    this.notify({ message: t, level: "info" }, ...r);
  }
  warn(t, ...r) {
    this.notify({ message: t, level: "warn" }, ...r);
  }
  error(t, r, ...n) {
    this.notify({ message: t, level: "error", error: r }, ...n);
  }
}
var St = function (e, t, r, n, i) {
    if (n === "m") throw new TypeError("Private method is not writable");
    if (n === "a" && !i)
      throw new TypeError("Private accessor was defined without a setter");
    if (typeof t == "function" ? e !== t || !i : !t.has(e))
      throw new TypeError(
        "Cannot write private member to an object whose class did not declare it",
      );
    return n === "a" ? i.call(e, r) : i ? (i.value = r) : t.set(e, r), r;
  },
  tt = function (e, t, r, n) {
    if (r === "a" && !n)
      throw new TypeError("Private accessor was defined without a getter");
    if (typeof t == "function" ? e !== t || !n : !t.has(e))
      throw new TypeError(
        "Cannot read private member from an object whose class did not declare it",
      );
    return r === "m" ? n : r === "a" ? n.call(e) : n ? n.value : t.get(e);
  },
  Ot,
  Hn,
  Dn,
  Kn,
  zn,
  Wn,
  Yn,
  Zn,
  Or;
const Uc = 0.5,
  Fc = 1.5,
  Pc = 500,
  kc = 6e4,
  Cc = 9e5,
  $c = 10;
class Ui {
  constructor(t = Ui.default) {
    Ot.set(this, void 0),
      Hn.set(this, void 0),
      Dn.set(this, void 0),
      Kn.set(this, void 0),
      zn.set(this, void 0),
      Wn.set(this, void 0),
      Yn.set(this, void 0),
      Zn.set(this, void 0),
      Or.set(this, 0);
    const {
      initialInterval: r = Pc,
      randomizationFactor: n = Uc,
      multiplier: i = Fc,
      maxInterval: a = kc,
      maxElapsedTime: d = Cc,
      maxIterations: c = $c,
      date: w = Date,
    } = t;
    St(this, Ot, r, "f"),
      St(this, Hn, n, "f"),
      St(this, Dn, i, "f"),
      St(this, Kn, a, "f"),
      St(this, Zn, w, "f"),
      St(this, zn, w.now(), "f"),
      St(this, Wn, d, "f"),
      St(this, Yn, c, "f");
  }
  get ellapsedTimeInMsec() {
    return tt(this, Zn, "f").now() - tt(this, zn, "f");
  }
  get currentInterval() {
    return tt(this, Ot, "f");
  }
  get count() {
    return tt(this, Or, "f");
  }
  get randomValueFromInterval() {
    const t = tt(this, Hn, "f") * tt(this, Ot, "f"),
      r = tt(this, Ot, "f") - t,
      n = tt(this, Ot, "f") + t;
    return Math.random() * (n - r) + r;
  }
  incrementCurrentInterval() {
    var t;
    return (
      St(
        this,
        Ot,
        Math.min(tt(this, Ot, "f") * tt(this, Dn, "f"), tt(this, Kn, "f")),
        "f",
      ),
      St(this, Or, ((t = tt(this, Or, "f")), t++, t), "f"),
      tt(this, Ot, "f")
    );
  }
  next() {
    return this.ellapsedTimeInMsec >= tt(this, Wn, "f") ||
      tt(this, Or, "f") >= tt(this, Yn, "f")
      ? null
      : (this.incrementCurrentInterval(), this.randomValueFromInterval);
  }
}
(Ot = new WeakMap()),
  (Hn = new WeakMap()),
  (Dn = new WeakMap()),
  (Kn = new WeakMap()),
  (zn = new WeakMap()),
  (Wn = new WeakMap()),
  (Yn = new WeakMap()),
  (Zn = new WeakMap()),
  (Or = new WeakMap());
Ui.default = {
  initialInterval: Pc,
  randomizationFactor: Uc,
  multiplier: Fc,
  maxInterval: kc,
  maxElapsedTime: Cc,
  maxIterations: $c,
  date: Date,
};
const Mc = 5 * 60 * 1e3;
var at = function (e, t, r, n, i) {
    if (n === "m") throw new TypeError("Private method is not writable");
    if (n === "a" && !i)
      throw new TypeError("Private accessor was defined without a setter");
    if (typeof t == "function" ? e !== t || !i : !t.has(e))
      throw new TypeError(
        "Cannot write private member to an object whose class did not declare it",
      );
    return n === "a" ? i.call(e, r) : i ? (i.value = r) : t.set(e, r), r;
  },
  pe = function (e, t, r, n) {
    if (r === "a" && !n)
      throw new TypeError("Private accessor was defined without a getter");
    if (typeof t == "function" ? e !== t || !n : !t.has(e))
      throw new TypeError(
        "Cannot read private member from an object whose class did not declare it",
      );
    return r === "m" ? n : r === "a" ? n.call(e) : n ? n.value : t.get(e);
  },
  Ct,
  Rt,
  er,
  $r,
  en,
  tn,
  xt,
  Xn,
  Et,
  dr,
  hr,
  rn,
  Rr,
  Ur,
  pr,
  gr,
  Vc,
  Jn,
  Qn,
  Mt;
(function (e) {
  (e.Received = "received"),
    (e.Processing = "processing"),
    (e.Replied = "replied"),
    (e.Rejected = "rejected"),
    (e.Unknown = "unknown"),
    (e.Done = "done");
})(Mt || (Mt = {}));
const Un = 60 * 1e3,
  H0 =
    "308182301d060d2b0601040182dc7c0503010201060c2b0601040182dc7c05030201036100814c0e6ec71fab583b08bd81373c255c3c371b2e84863c98a4f1e08b74235d14fb5d9c0cd546d9685f913a0c0b2cc5341583bf4b4392e467db96d65b9bb4cb717112f8472e0d5a4d14505ffd7484b01291091c5f87b98883463f98091a0baaae",
  D0 = "aaaaa-aa",
  K0 = "ic0.app",
  z0 = ".ic0.app",
  W0 = "icp0.io",
  Y0 = ".icp0.io",
  Z0 = "icp-api.io",
  X0 = ".icp-api.io";
class Yi extends De {
  constructor(t) {
    super(t), (this.message = t);
  }
}
class Fn extends De {
  constructor(t) {
    super(t), (this.message = t);
  }
}
function J0() {
  let e;
  if (typeof window < "u")
    if (window.fetch) e = window.fetch.bind(window);
    else
      throw new Yi(
        "Fetch implementation was not available. You appear to be in a browser context, but window.fetch was not present.",
      );
  else if (typeof global < "u")
    if (global.fetch) e = global.fetch.bind(global);
    else
      throw new Yi(
        "Fetch implementation was not available. You appear to be in a Node.js context, but global.fetch was not available.",
      );
  else typeof self < "u" && self.fetch && (e = self.fetch.bind(self));
  if (e) return e;
  throw new Yi(
    "Fetch implementation was not available. Please provide fetch to the HttpAgent constructor, or ensure it is available in the window or global context.",
  );
}
function Q0(e) {
  let t;
  if (e !== void 0)
    !e.match(/^[a-z]+:/) && typeof window < "u"
      ? (t = new URL(window.location.protocol + "//" + e))
      : (t = new URL(e));
  else {
    const r = ["ic0.app", "icp0.io", "127.0.0.1", "localhost"],
      n = [".github.dev", ".gitpod.io"],
      i = typeof window < "u" ? window.location : void 0,
      a = i?.hostname;
    let d;
    a &&
      typeof a == "string" &&
      (n.some((c) => a.endsWith(c))
        ? (d = a)
        : (d = r.find((c) => a.endsWith(c)))),
      i && d
        ? (t = new URL(`${i.protocol}//${d}${i.port ? ":" + i.port : ""}`))
        : (t = new URL("https://icp-api.io"));
  }
  return t.toString();
}
class Mr {
  constructor(t = {}) {
    var r;
    Ct.add(this),
      Rt.set(this, void 0),
      er.set(this, void 0),
      $r.set(this, void 0),
      en.set(this, void 0),
      tn.set(this, 0),
      xt.set(this, void 0),
      Xn.set(this, !1),
      Et.set(this, void 0),
      dr.set(this, void 0),
      hr.set(this, void 0),
      (this._isAgent = !0),
      (this.config = {}),
      rn.set(this, 0),
      (this.log = new L0()),
      Rr.set(this, []),
      Ur.set(this, []),
      pr.set(this, new q0({ expirationTime: 5 * 60 * 1e3 })),
      gr.set(this, !0),
      Qn.set(this, (a, d) => {
        if (pe(this, gr, "f") === !1) return a;
        if (!d)
          throw new Ft(
            "Invalid signature from replica signed query: no matching node key found.",
          );
        const { status: c, signatures: w = [], requestId: x } = a,
          B = new TextEncoder().encode("\vic-response");
        for (const N of w) {
          const { timestamp: I, identity: S } = N,
            b = Te.fromUint8Array(S).toText();
          let C;
          if (c === "replied") {
            const { reply: te } = a;
            C = ui({
              status: c,
              reply: te,
              timestamp: BigInt(I),
              request_id: x,
            });
          } else if (c === "rejected") {
            const { reject_code: te, reject_message: $, error_code: X } = a;
            C = ui({
              status: c,
              reject_code: te,
              reject_message: $,
              error_code: X,
              timestamp: BigInt(I),
              request_id: x,
            });
          } else throw new Error(`Unknown status: ${c}`);
          const V = Bt(B, new Uint8Array(C)),
            K = d?.nodeKeys.get(b);
          if (!K)
            throw new Ft(
              "Invalid signature from replica signed query: no matching node key found.",
            );
          const L = Rc.fromDer(K).rawKey;
          if (Sr.verify(N.signature, new Uint8Array(V), new Uint8Array(L)))
            return a;
          throw new Ft(`Invalid signature from replica ${b} signed query.`);
        }
        return a;
      }),
      (this.config = t),
      at(this, er, t.fetch || J0() || fetch.bind(global), "f"),
      at(this, $r, t.fetchOptions, "f"),
      at(this, en, t.callOptions, "f"),
      (this.rootKey = t.rootKey ? t.rootKey : Lt(H0));
    const n = Q0(t.host);
    (this.host = new URL(n)),
      t.verifyQuerySignatures !== void 0 &&
        at(this, gr, t.verifyQuerySignatures, "f"),
      at(this, Et, (r = t.retryTimes) !== null && r !== void 0 ? r : 3, "f");
    const i = () => new Ui({ maxIterations: pe(this, Et, "f") });
    if (
      (at(this, dr, t.backoffStrategy || i, "f"),
      this.host.hostname.endsWith(z0)
        ? (this.host.hostname = K0)
        : this.host.hostname.endsWith(Y0)
          ? (this.host.hostname = W0)
          : this.host.hostname.endsWith(X0) && (this.host.hostname = Z0),
      t.credentials)
    ) {
      const { name: a, password: d } = t.credentials;
      at(this, xt, `${a}${d ? ":" + d : ""}`, "f");
    }
    if (
      (at(this, Rt, Promise.resolve(t.identity || new fi()), "f"),
      t.ingressExpiryInMinutes && t.ingressExpiryInMinutes > 5)
    )
      throw new De(
        `The maximum ingress expiry time is 5 minutes. Provided ingress expiry time is ${t.ingressExpiryInMinutes} minutes.`,
      );
    if (t.ingressExpiryInMinutes && t.ingressExpiryInMinutes <= 0)
      throw new De(
        `Ingress expiry time must be greater than 0. Provided ingress expiry time is ${t.ingressExpiryInMinutes} minutes.`,
      );
    at(this, hr, t.ingressExpiryInMinutes || 5, "f"),
      this.addTransform("update", sa(ys)),
      t.useQueryNonces && this.addTransform("query", sa(ys)),
      t.logToConsole &&
        this.log.subscribe((a) => {
          a.level === "error"
            ? console.error(a.message)
            : a.level === "warn"
              ? console.warn(a.message)
              : console.log(a.message);
        });
  }
  get waterMark() {
    return pe(this, rn, "f");
  }
  static createSync(t = {}) {
    return new this(Object.assign({}, t));
  }
  static async create(t = { shouldFetchRootKey: !1 }) {
    const r = Mr.createSync(t),
      n = [r.syncTime()];
    return (
      r.host.toString() !== "https://icp-api.io" &&
        t.shouldFetchRootKey &&
        n.push(r.fetchRootKey()),
      await Promise.all(n),
      r
    );
  }
  static async from(t) {
    var r;
    try {
      return "config" in t
        ? await Mr.create(t.config)
        : await Mr.create({
            fetch: t._fetch,
            fetchOptions: t._fetchOptions,
            callOptions: t._callOptions,
            host: t._host.toString(),
            identity: (r = t._identity) !== null && r !== void 0 ? r : void 0,
          });
    } catch {
      throw new De("Failed to create agent from provided agent");
    }
  }
  isLocal() {
    const t = this.host.hostname;
    return t === "127.0.0.1" || t.endsWith("127.0.0.1");
  }
  addTransform(t, r, n = r.priority || 0) {
    if (t === "update") {
      const i = pe(this, Ur, "f").findIndex((a) => (a.priority || 0) < n);
      pe(this, Ur, "f").splice(
        i >= 0 ? i : pe(this, Ur, "f").length,
        0,
        Object.assign(r, { priority: n }),
      );
    } else if (t === "query") {
      const i = pe(this, Rr, "f").findIndex((a) => (a.priority || 0) < n);
      pe(this, Rr, "f").splice(
        i >= 0 ? i : pe(this, Rr, "f").length,
        0,
        Object.assign(r, { priority: n }),
      );
    }
  }
  async getPrincipal() {
    if (!pe(this, Rt, "f"))
      throw new Fn(
        "This identity has expired due this application's security policy. Please refresh your authentication.",
      );
    return (await pe(this, Rt, "f")).getPrincipal();
  }
  async call(t, r, n) {
    var i;
    const a = (i = r.callSync) !== null && i !== void 0 ? i : !0,
      d = await (n !== void 0 ? await n : await pe(this, Rt, "f"));
    if (!d)
      throw new Fn(
        "This identity has expired due this application's security policy. Please refresh your authentication.",
      );
    const c = Te.from(t),
      w = r.effectiveCanisterId ? Te.from(r.effectiveCanisterId) : c,
      x = d.getPrincipal() || Te.anonymous();
    let B = new Ir(pe(this, hr, "f") * Un);
    Math.abs(pe(this, tn, "f")) > 1e3 * 30 &&
      (B = new Ir(pe(this, hr, "f") * Un + pe(this, tn, "f")));
    const N = {
      request_type: ps.Call,
      canister_id: c,
      method_name: r.methodName,
      arg: r.arg,
      sender: x,
      ingress_expiry: B,
    };
    let I = await this._transform({
      request: {
        body: null,
        method: "POST",
        headers: Object.assign(
          { "Content-Type": "application/cbor" },
          pe(this, xt, "f")
            ? { Authorization: "Basic " + btoa(pe(this, xt, "f")) }
            : {},
        ),
      },
      endpoint: "call",
      body: N,
    });
    const S = I.body.nonce ? b(I.body.nonce) : void 0;
    N.nonce = S;
    function b(K) {
      return new Uint8Array(K);
    }
    I = await d.transformRequest(I);
    const C = Gi(I.body),
      V = pe(this, dr, "f").call(this);
    try {
      const K = () => (
          this.log.print(
            `fetching "/api/v3/canister/${w.toText()}/call" with request:`,
            I,
          ),
          pe(this, er, "f").call(
            this,
            "" + new URL(`/api/v3/canister/${w.toText()}/call`, this.host),
            Object.assign(
              Object.assign(Object.assign({}, pe(this, en, "f")), I.request),
              { body: C },
            ),
          )
        ),
        L = () => (
          this.log.print(
            `fetching "/api/v2/canister/${w.toText()}/call" with request:`,
            I,
          ),
          pe(this, er, "f").call(
            this,
            "" + new URL(`/api/v2/canister/${w.toText()}/call`, this.host),
            Object.assign(
              Object.assign(Object.assign({}, pe(this, en, "f")), I.request),
              { body: C },
            ),
          )
        ),
        W = pe(this, Ct, "m", Jn).call(this, {
          request: a ? K : L,
          backoff: V,
          tries: 0,
        }),
        [te, $] = await Promise.all([W, fn(N)]),
        X = await te.arrayBuffer(),
        q = te.status === 200 && X.byteLength > 0 ? Gt(X) : null;
      if (q && "certificate" in q) {
        const ee = await this.parseTimeFromResponse({
          certificate: q.certificate,
        });
        at(this, rn, ee, "f");
      }
      return {
        requestId: $,
        response: {
          ok: te.ok,
          status: te.status,
          statusText: te.statusText,
          body: q,
          headers: Zr(te.headers),
        },
        requestDetails: N,
      };
    } catch (K) {
      if (K.message.includes("v3 api not supported."))
        return (
          this.log.warn("v3 api not supported. Fall back to v2"),
          this.call(t, Object.assign(Object.assign({}, r), { callSync: !1 }), n)
        );
      throw (this.log.error("Error while making call:", K), K);
    }
  }
  async query(t, r, n) {
    const i = pe(this, dr, "f").call(this),
      a = r.effectiveCanisterId ? Te.from(r.effectiveCanisterId) : Te.from(t);
    this.log.print(`ecid ${a.toString()}`),
      this.log.print(`canisterId ${t.toString()}`);
    const d = async () => {
        const S = await (n !== void 0 ? n : pe(this, Rt, "f"));
        if (!S)
          throw new Fn(
            "This identity has expired due this application's security policy. Please refresh your authentication.",
          );
        const b = Te.from(t),
          C = S?.getPrincipal() || Te.anonymous(),
          V = {
            request_type: "query",
            canister_id: b,
            method_name: r.methodName,
            arg: r.arg,
            sender: C,
            ingress_expiry: new Ir(pe(this, hr, "f") * Un),
          },
          K = await fn(V);
        let L = await this._transform({
          request: {
            method: "POST",
            headers: Object.assign(
              { "Content-Type": "application/cbor" },
              pe(this, xt, "f")
                ? { Authorization: "Basic " + btoa(pe(this, xt, "f")) }
                : {},
            ),
          },
          endpoint: "read",
          body: V,
        });
        L = await S?.transformRequest(L);
        const W = Gi(L.body),
          te = {
            canister: b.toText(),
            ecid: a,
            transformedRequest: L,
            body: W,
            requestId: K,
            backoff: i,
            tries: 0,
          };
        return {
          requestDetails: V,
          query: await pe(this, Ct, "m", Vc).call(this, te),
        };
      },
      c = async () => {
        if (!pe(this, gr, "f")) return;
        const S = pe(this, pr, "f").get(a.toString());
        return (
          S ||
          (await this.fetchSubnetKeys(a.toString()),
          pe(this, pr, "f").get(a.toString()))
        );
      },
      [w, x] = await Promise.all([d(), c()]),
      { requestDetails: B, query: N } = w,
      I = Object.assign(Object.assign({}, N), { requestDetails: B });
    if ((this.log.print("Query response:", I), !pe(this, gr, "f"))) return I;
    try {
      return pe(this, Qn, "f").call(this, I, x);
    } catch {
      this.log.warn(
        "Query response verification failed. Retrying with fresh subnet keys.",
      ),
        pe(this, pr, "f").delete(t.toString()),
        await this.fetchSubnetKeys(a.toString());
      const b = pe(this, pr, "f").get(t.toString());
      if (!b)
        throw new Ft(
          "Invalid signature from replica signed query: no matching node key found.",
        );
      return pe(this, Qn, "f").call(this, I, b);
    }
  }
  async createReadStateRequest(t, r) {
    const n = await (r !== void 0 ? await r : await pe(this, Rt, "f"));
    if (!n)
      throw new Fn(
        "This identity has expired due this application's security policy. Please refresh your authentication.",
      );
    const i = n?.getPrincipal() || Te.anonymous(),
      a = await this._transform({
        request: {
          method: "POST",
          headers: Object.assign(
            { "Content-Type": "application/cbor" },
            pe(this, xt, "f")
              ? { Authorization: "Basic " + btoa(pe(this, xt, "f")) }
              : {},
          ),
        },
        endpoint: "read_state",
        body: {
          request_type: "read_state",
          paths: t.paths,
          sender: i,
          ingress_expiry: new Ir(pe(this, hr, "f") * Un),
        },
      });
    return n?.transformRequest(a);
  }
  async readState(t, r, n, i) {
    const a = typeof t == "string" ? Te.fromText(t) : t,
      d = i ?? (await this.createReadStateRequest(r, n)),
      c = Object.assign(Object.assign({}, d.body), {
        ingress_expiry: new Ir(Mc),
      }),
      w = Gi(c);
    this.log.print(
      `fetching "/api/v2/canister/${a}/read_state" with request:`,
      d,
    );
    const x = pe(this, dr, "f").call(this);
    try {
      const B = await pe(this, Ct, "m", Jn).call(this, {
        request: () =>
          pe(this, er, "f").call(
            this,
            "" +
              new URL(`/api/v2/canister/${a.toString()}/read_state`, this.host),
            Object.assign(
              Object.assign(Object.assign({}, pe(this, $r, "f")), d.request),
              { body: w },
            ),
          ),
        backoff: x,
        tries: 0,
      });
      if (!B.ok)
        throw new Error(`Server returned an error:
  Code: ${B.status} (${B.statusText})
  Body: ${await B.text()}
`);
      const N = Gt(await B.arrayBuffer());
      this.log.print("Read state response:", N);
      const I = await this.parseTimeFromResponse(N);
      return (
        I > 0 &&
          (this.log.print("Read state response time:", I),
          at(this, rn, I, "f")),
        N
      );
    } catch (B) {
      throw (
        (this.log.error("Caught exception while attempting to read state", B),
        B)
      );
    }
  }
  async parseTimeFromResponse(t) {
    let r;
    if (t.certificate) {
      const n = Gt(t.certificate);
      if (n && "tree" in n) r = n.tree;
      else throw new Error("Could not decode time from response");
      const i = jr(["time"], r);
      if (i.status !== He.Found)
        throw new Error(
          "Time was not found in the response or was not in its expected format.",
        );
      if (!(i.value instanceof ArrayBuffer) && !ArrayBuffer.isView(i))
        throw new Error(
          "Time was not found in the response or was not in its expected format.",
        );
      const a = qs(Is(i.value));
      return (
        this.log.print("Time from response:", a),
        this.log.print("Time from response in milliseconds:", Number(a)),
        Number(a)
      );
    } else this.log.warn("No certificate found in response");
    return 0;
  }
  async syncTime(t) {
    const r = await vu(
        () => Promise.resolve().then(() => r0),
        void 0,
        import.meta.url,
      ),
      n = Date.now();
    try {
      t ||
        this.log.print(
          "Syncing time with the IC. No canisterId provided, so falling back to ryjl3-tyaaa-aaaaa-aaaba-cai",
        );
      const a = (
        await r.request({
          canisterId: t ?? Te.from("ryjl3-tyaaa-aaaaa-aaaba-cai"),
          agent: this,
          paths: ["time"],
        })
      ).get("time");
      a && at(this, tn, Number(a) - Number(n), "f");
    } catch (i) {
      this.log.error("Caught exception while attempting to sync time", i);
    }
  }
  async status() {
    const t = pe(this, xt, "f")
      ? { Authorization: "Basic " + btoa(pe(this, xt, "f")) }
      : {};
    this.log.print('fetching "/api/v2/status"');
    const r = pe(this, dr, "f").call(this),
      n = await pe(this, Ct, "m", Jn).call(this, {
        backoff: r,
        request: () =>
          pe(this, er, "f").call(
            this,
            "" + new URL("/api/v2/status", this.host),
            Object.assign({ headers: t }, pe(this, $r, "f")),
          ),
        tries: 0,
      });
    return Gt(await n.arrayBuffer());
  }
  async fetchRootKey() {
    if (!pe(this, Xn, "f")) {
      const t = await this.status();
      (this.rootKey = t.root_key), at(this, Xn, !0, "f");
    }
    return this.rootKey;
  }
  invalidateIdentity() {
    at(this, Rt, null, "f");
  }
  replaceIdentity(t) {
    at(this, Rt, Promise.resolve(t), "f");
  }
  async fetchSubnetKeys(t) {
    const r = Te.from(t),
      i = (await vc({ canisterId: r, paths: ["subnet"], agent: this })).get(
        "subnet",
      );
    if (i && typeof i == "object" && "nodeKeys" in i)
      return pe(this, pr, "f").set(r.toText(), i), i;
  }
  _transform(t) {
    let r = Promise.resolve(t);
    if (t.endpoint === "call")
      for (const n of pe(this, Ur, "f"))
        r = r.then((i) => n(i).then((a) => a || i));
    else
      for (const n of pe(this, Rr, "f"))
        r = r.then((i) => n(i).then((a) => a || i));
    return r;
  }
}
(Rt = new WeakMap()),
  (er = new WeakMap()),
  ($r = new WeakMap()),
  (en = new WeakMap()),
  (tn = new WeakMap()),
  (xt = new WeakMap()),
  (Xn = new WeakMap()),
  (Et = new WeakMap()),
  (dr = new WeakMap()),
  (hr = new WeakMap()),
  (rn = new WeakMap()),
  (Rr = new WeakMap()),
  (Ur = new WeakMap()),
  (pr = new WeakMap()),
  (gr = new WeakMap()),
  (Qn = new WeakMap()),
  (Ct = new WeakSet()),
  (Vc = async function e(t) {
    var r, n;
    const {
        ecid: i,
        transformedRequest: a,
        body: d,
        requestId: c,
        backoff: w,
        tries: x,
      } = t,
      B = x === 0 ? 0 : w.next();
    if (
      (this.log.print(
        `fetching "/api/v2/canister/${i.toString()}/query" with tries:`,
        { tries: x, backoff: w, delay: B },
      ),
      B === null)
    )
      throw new De(
        `Timestamp failed to pass the watermark after retrying the configured ${pe(this, Et, "f")} times. We cannot guarantee the integrity of the response since it could be a replay attack.`,
      );
    B > 0 && (await new Promise((b) => setTimeout(b, B)));
    let N;
    try {
      this.log.print(
        `fetching "/api/v2/canister/${i.toString()}/query" with request:`,
        a,
      );
      const b = await pe(this, er, "f").call(
        this,
        "" + new URL(`/api/v2/canister/${i.toString()}/query`, this.host),
        Object.assign(
          Object.assign(Object.assign({}, pe(this, $r, "f")), a.request),
          { body: d },
        ),
      );
      if (b.status === 200) {
        const C = Gt(await b.arrayBuffer());
        N = Object.assign(Object.assign({}, C), {
          httpDetails: {
            ok: b.ok,
            status: b.status,
            statusText: b.statusText,
            headers: Zr(b.headers),
          },
          requestId: c,
        });
      } else
        throw new ji(
          `Gateway returned an error:
  Code: ${b.status} (${b.statusText})
  Body: ${await b.text()}
`,
          {
            ok: b.ok,
            status: b.status,
            statusText: b.statusText,
            headers: Zr(b.headers),
          },
        );
    } catch (b) {
      if (x < pe(this, Et, "f"))
        return (
          this.log.warn(`Caught exception while attempting to make query:
  ${b}
  Retrying query.`),
          await pe(this, Ct, "m", e).call(
            this,
            Object.assign(Object.assign({}, t), { tries: x + 1 }),
          )
        );
      throw b;
    }
    const I =
      (n = (r = N.signatures) === null || r === void 0 ? void 0 : r[0]) ===
        null || n === void 0
        ? void 0
        : n.timestamp;
    if (!pe(this, gr, "f")) return N;
    if (!I)
      throw new Error(
        "Timestamp not found in query response. This suggests a malformed or malicious response.",
      );
    const S = Number(BigInt(I) / BigInt(1e6));
    if (
      (this.log.print("watermark and timestamp", {
        waterMark: this.waterMark,
        timestamp: S,
      }),
      Number(this.waterMark) > S)
    ) {
      const b = new De("Timestamp is below the watermark. Retrying query.");
      if (
        (this.log.error("Timestamp is below", b, {
          timestamp: I,
          waterMark: this.waterMark,
        }),
        x < pe(this, Et, "f"))
      )
        return await pe(this, Ct, "m", e).call(
          this,
          Object.assign(Object.assign({}, t), { tries: x + 1 }),
        );
      throw new De(
        `Timestamp failed to pass the watermark after retrying the configured ${pe(this, Et, "f")} times. We cannot guarantee the integrity of the response since it could be a replay attack.`,
      );
    }
    return N;
  }),
  (Jn = async function e(t) {
    const { request: r, backoff: n, tries: i } = t,
      a = i === 0 ? 0 : n.next();
    if (a === null)
      throw new De(
        `Timestamp failed to pass the watermark after retrying the configured ${pe(this, Et, "f")} times. We cannot guarantee the integrity of the response since it could be a replay attack.`,
      );
    a > 0 && (await new Promise((x) => setTimeout(x, a)));
    let d;
    try {
      d = await r();
    } catch (x) {
      if (pe(this, Et, "f") > i)
        return (
          this.log.warn(`Caught exception while attempting to make request:
  ${x}
  Retrying request.`),
          await pe(this, Ct, "m", e).call(this, {
            request: r,
            backoff: n,
            tries: i + 1,
          })
        );
      throw x;
    }
    if (d.ok) return d;
    const c = await d.clone().text(),
      w = `Server returned an error:
  Code: ${d.status} (${d.statusText})
  Body: ${c}
`;
    if (d.status === 404 && d.url.includes("api/v3"))
      throw new ji("v3 api not supported. Fall back to v2", {
        ok: d.ok,
        status: d.status,
        statusText: d.statusText,
        headers: Zr(d.headers),
      });
    if (i < pe(this, Et, "f"))
      return await pe(this, Ct, "m", e).call(this, {
        request: r,
        backoff: n,
        tries: i + 1,
      });
    throw new ji(w, {
      ok: d.ok,
      status: d.status,
      statusText: d.statusText,
      headers: Zr(d.headers),
    });
  });
var Oa;
(function (e) {
  (e.Error = "err"),
    (e.GetPrincipal = "gp"),
    (e.GetPrincipalResponse = "gpr"),
    (e.Query = "q"),
    (e.QueryResponse = "qr"),
    (e.Call = "c"),
    (e.CallResponse = "cr"),
    (e.ReadState = "rs"),
    (e.ReadStateResponse = "rsr"),
    (e.Status = "s"),
    (e.StatusResponse = "sr");
})(Oa || (Oa = {}));
function Ra() {
  const e =
    typeof window > "u"
      ? typeof global > "u"
        ? typeof self > "u"
          ? void 0
          : self.ic.agent
        : global.ic.agent
      : window.ic.agent;
  if (!e) throw new Error("No Agent could be found.");
  return e;
}
const ed = 5 * 60 * 1e3;
function qc() {
  return sd(rd(td(), 1e3), id(1e3, 1.2), nd(ed));
}
function td() {
  let e = !0;
  return async () => (e ? ((e = !1), !0) : !1);
}
function rd(e, t) {
  return async (r, n, i) => {
    if (await e(r, n, i)) return new Promise((a) => setTimeout(a, t));
  };
}
function nd(e) {
  const t = Date.now() + e;
  return async (r, n, i) => {
    if (Date.now() > t)
      throw new Error(`Request timed out after ${e} msec:
  Request ID: ${et(n)}
  Request status: ${i}
`);
  };
}
function id(e, t) {
  let r = e;
  return () =>
    new Promise((n) =>
      setTimeout(() => {
        (r *= t), n();
      }, r),
    );
}
function sd(...e) {
  return async (t, r, n) => {
    for (const i of e) await i(t, r, n);
  };
}
async function Gc(e, t, r, n = qc(), i, a) {
  var d;
  const c = [new TextEncoder().encode("request_status"), r],
    w =
      i ??
      (await ((d = e.createReadStateRequest) === null || d === void 0
        ? void 0
        : d.call(e, { paths: [c] })));
  w.body.content.ingress_expiry = new Ir(Mc);
  const x = await e.readState(t, { paths: [c] }, void 0, w);
  if (e.rootKey == null)
    throw new Error("Agent root key not initialized before polling");
  const B = await wr.create({
      certificate: x.certificate,
      rootKey: e.rootKey,
      canisterId: t,
      blsVerify: a,
    }),
    N = gt(B.lookup([...c, new TextEncoder().encode("status")]));
  let I;
  switch (
    (typeof N > "u" ? (I = Mt.Unknown) : (I = new TextDecoder().decode(N)), I)
  ) {
    case Mt.Replied:
      return { reply: gt(B.lookup([...c, "reply"])), certificate: B };
    case Mt.Received:
    case Mt.Unknown:
    case Mt.Processing:
      return await n(t, r, I), Gc(e, t, r, n, w, a);
    case Mt.Rejected: {
      const S = new Uint8Array(gt(B.lookup([...c, "reject_code"])))[0],
        b = new TextDecoder().decode(gt(B.lookup([...c, "reject_message"])));
      throw new Error(`Call was rejected:
  Request ID: ${et(r)}
  Reject code: ${S}
  Reject text: ${b}
`);
    }
    case Mt.Done:
      throw new Error(`Call was marked as done but we never saw the reply:
  Request ID: ${et(r)}
`);
  }
  throw new Error("unreachable");
}
const ad = ({ IDL: e }) => {
  const t = e.Variant({ mainnet: e.Null, testnet: e.Null }),
    r = e.Text,
    n = e.Record({ network: t, address: r, min_confirmations: e.Opt(e.Nat32) }),
    i = e.Nat64,
    a = i,
    d = e.Record({ network: t }),
    c = e.Nat64,
    w = e.Vec(c),
    x = e.Record({
      network: t,
      filter: e.Opt(
        e.Variant({ page: e.Vec(e.Nat8), min_confirmations: e.Nat32 }),
      ),
      address: r,
    }),
    B = e.Vec(e.Nat8),
    N = e.Record({ txid: e.Vec(e.Nat8), vout: e.Nat32 }),
    I = e.Record({ height: e.Nat32, value: i, outpoint: N }),
    S = e.Record({
      next_page: e.Opt(e.Vec(e.Nat8)),
      tip_height: e.Nat32,
      tip_block_hash: B,
      utxos: e.Vec(I),
    }),
    b = e.Record({ transaction: e.Vec(e.Nat8), network: t }),
    C = e.Principal,
    V = e.Record({ canister_id: C, num_requested_changes: e.Opt(e.Nat64) }),
    K = e.Variant({
      from_user: e.Record({ user_id: e.Principal }),
      from_canister: e.Record({
        canister_version: e.Opt(e.Nat64),
        canister_id: e.Principal,
      }),
    }),
    L = e.Variant({
      creation: e.Record({ controllers: e.Vec(e.Principal) }),
      code_deployment: e.Record({
        mode: e.Variant({
          reinstall: e.Null,
          upgrade: e.Null,
          install: e.Null,
        }),
        module_hash: e.Vec(e.Nat8),
      }),
      controllers_change: e.Record({ controllers: e.Vec(e.Principal) }),
      code_uninstall: e.Null,
    }),
    W = e.Record({
      timestamp_nanos: e.Nat64,
      canister_version: e.Nat64,
      origin: K,
      details: L,
    }),
    te = e.Record({
      controllers: e.Vec(e.Principal),
      module_hash: e.Opt(e.Vec(e.Nat8)),
      recent_changes: e.Vec(W),
      total_num_changes: e.Nat64,
    }),
    $ = e.Record({ canister_id: C }),
    X = e.Variant({ controllers: e.Null, public: e.Null }),
    q = e.Record({
      freezing_threshold: e.Nat,
      controllers: e.Vec(e.Principal),
      reserved_cycles_limit: e.Nat,
      log_visibility: X,
      wasm_memory_limit: e.Nat,
      memory_allocation: e.Nat,
      compute_allocation: e.Nat,
    }),
    ee = e.Record({
      status: e.Variant({ stopped: e.Null, stopping: e.Null, running: e.Null }),
      memory_size: e.Nat,
      cycles: e.Nat,
      settings: q,
      query_stats: e.Record({
        response_payload_bytes_total: e.Nat,
        num_instructions_total: e.Nat,
        num_calls_total: e.Nat,
        request_payload_bytes_total: e.Nat,
      }),
      idle_cycles_burned_per_day: e.Nat,
      module_hash: e.Opt(e.Vec(e.Nat8)),
      reserved_cycles: e.Nat,
    }),
    ne = e.Record({ canister_id: C }),
    J = e.Record({
      freezing_threshold: e.Opt(e.Nat),
      controllers: e.Opt(e.Vec(e.Principal)),
      reserved_cycles_limit: e.Opt(e.Nat),
      log_visibility: e.Opt(X),
      wasm_memory_limit: e.Opt(e.Nat),
      memory_allocation: e.Opt(e.Nat),
      compute_allocation: e.Opt(e.Nat),
    }),
    he = e.Record({
      settings: e.Opt(J),
      sender_canister_version: e.Opt(e.Nat64),
    }),
    ue = e.Record({ canister_id: C }),
    R = e.Record({ canister_id: C }),
    P = e.Record({ canister_id: C }),
    z = e.Variant({ secp256k1: e.Null }),
    M = e.Record({
      key_id: e.Record({ name: e.Text, curve: z }),
      canister_id: e.Opt(C),
      derivation_path: e.Vec(e.Vec(e.Nat8)),
    }),
    G = e.Record({ public_key: e.Vec(e.Nat8), chain_code: e.Vec(e.Nat8) }),
    Q = e.Record({ canister_id: C }),
    re = e.Record({
      idx: e.Nat64,
      timestamp_nanos: e.Nat64,
      content: e.Vec(e.Nat8),
    }),
    ye = e.Record({ canister_log_records: e.Vec(re) }),
    ae = e.Record({ value: e.Text, name: e.Text }),
    Y = e.Record({ status: e.Nat, body: e.Vec(e.Nat8), headers: e.Vec(ae) }),
    le = e.Record({
      url: e.Text,
      method: e.Variant({ get: e.Null, head: e.Null, post: e.Null }),
      max_response_bytes: e.Opt(e.Nat64),
      body: e.Opt(e.Vec(e.Nat8)),
      transform: e.Opt(
        e.Record({
          function: e.Func(
            [e.Record({ context: e.Vec(e.Nat8), response: Y })],
            [Y],
            ["query"],
          ),
          context: e.Vec(e.Nat8),
        }),
      ),
      headers: e.Vec(ae),
    }),
    _ = e.Variant({
      reinstall: e.Null,
      upgrade: e.Opt(
        e.Record({
          wasm_memory_persistence: e.Opt(
            e.Variant({ keep: e.Null, replace: e.Null }),
          ),
          skip_pre_upgrade: e.Opt(e.Bool),
        }),
      ),
      install: e.Null,
    }),
    oe = e.Record({ hash: e.Vec(e.Nat8) }),
    fe = e.Record({
      arg: e.Vec(e.Nat8),
      wasm_module_hash: e.Vec(e.Nat8),
      mode: _,
      chunk_hashes_list: e.Vec(oe),
      target_canister: C,
      store_canister: e.Opt(C),
      sender_canister_version: e.Opt(e.Nat64),
    }),
    we = e.Vec(e.Nat8),
    ie = e.Record({
      arg: e.Vec(e.Nat8),
      wasm_module: we,
      mode: _,
      canister_id: C,
      sender_canister_version: e.Opt(e.Nat64),
    }),
    se = e.Record({
      start_at_timestamp_nanos: e.Nat64,
      subnet_id: e.Principal,
    }),
    m = e.Record({
      num_block_failures_total: e.Nat64,
      node_id: e.Principal,
      num_blocks_proposed_total: e.Nat64,
    }),
    s = e.Vec(e.Record({ timestamp_nanos: e.Nat64, node_metrics: e.Vec(m) })),
    h = e.Record({
      settings: e.Opt(J),
      specified_id: e.Opt(C),
      amount: e.Opt(e.Nat),
      sender_canister_version: e.Opt(e.Nat64),
    }),
    E = e.Record({ canister_id: C }),
    T = e.Record({ canister_id: C, amount: e.Nat }),
    U = e.Vec(e.Nat8),
    p = e.Variant({ ed25519: e.Null, bip340secp256k1: e.Null }),
    o = e.Record({
      key_id: e.Record({ algorithm: p, name: e.Text }),
      canister_id: e.Opt(C),
      derivation_path: e.Vec(e.Vec(e.Nat8)),
    }),
    u = e.Record({ public_key: e.Vec(e.Nat8), chain_code: e.Vec(e.Nat8) }),
    g = e.Record({
      key_id: e.Record({ name: e.Text, curve: z }),
      derivation_path: e.Vec(e.Vec(e.Nat8)),
      message_hash: e.Vec(e.Nat8),
    }),
    v = e.Record({ signature: e.Vec(e.Nat8) }),
    O = e.Record({
      key_id: e.Record({ algorithm: p, name: e.Text }),
      derivation_path: e.Vec(e.Vec(e.Nat8)),
      message: e.Vec(e.Nat8),
    }),
    j = e.Record({ signature: e.Vec(e.Nat8) }),
    Z = e.Record({ canister_id: C }),
    ce = e.Record({ canister_id: C }),
    de = e.Record({ canister_id: C }),
    me = e.Vec(oe),
    y = e.Record({ canister_id: C, sender_canister_version: e.Opt(e.Nat64) }),
    f = e.Record({
      canister_id: e.Principal,
      settings: J,
      sender_canister_version: e.Opt(e.Nat64),
    }),
    l = e.Record({ chunk: e.Vec(e.Nat8), canister_id: e.Principal }),
    A = oe;
  return e.Service({
    bitcoin_get_balance: e.Func([n], [a], []),
    bitcoin_get_current_fee_percentiles: e.Func([d], [w], []),
    bitcoin_get_utxos: e.Func([x], [S], []),
    bitcoin_send_transaction: e.Func([b], [], []),
    canister_info: e.Func([V], [te], []),
    canister_status: e.Func([$], [ee], []),
    clear_chunk_store: e.Func([ne], [], []),
    create_canister: e.Func([he], [ue], []),
    delete_canister: e.Func([R], [], []),
    deposit_cycles: e.Func([P], [], []),
    ecdsa_public_key: e.Func([M], [G], []),
    fetch_canister_logs: e.Func([Q], [ye], ["query"]),
    http_request: e.Func([le], [Y], []),
    install_chunked_code: e.Func([fe], [], []),
    install_code: e.Func([ie], [], []),
    node_metrics_history: e.Func([se], [s], []),
    provisional_create_canister_with_cycles: e.Func([h], [E], []),
    provisional_top_up_canister: e.Func([T], [], []),
    raw_rand: e.Func([], [U], []),
    schnorr_public_key: e.Func([o], [u], []),
    sign_with_ecdsa: e.Func([g], [v], []),
    sign_with_schnorr: e.Func([O], [j], []),
    start_canister: e.Func([Z], [], []),
    stop_canister: e.Func([ce], [], []),
    stored_chunks: e.Func([de], [me], []),
    uninstall_code: e.Func([y], [], []),
    update_settings: e.Func([f], [], []),
    upload_chunk: e.Func([l], [A], []),
  });
};
class jc extends De {
  constructor(t, r, n, i) {
    super(
      [
        "Call failed:",
        `  Canister: ${t.toText()}`,
        `  Method: ${r} (${n})`,
        ...Object.getOwnPropertyNames(i).map(
          (a) => `  "${a}": ${JSON.stringify(i[a])}`,
        ),
      ].join(`
`),
    ),
      (this.canisterId = t),
      (this.methodName = r),
      (this.type = n),
      (this.props = i);
  }
}
class od extends jc {
  constructor(t, r, n) {
    var i;
    super(t, r, "query", {
      Status: n.status,
      Code:
        (i = is[n.reject_code]) !== null && i !== void 0
          ? i
          : `Unknown Code "${n.reject_code}"`,
      Message: n.reject_message,
    }),
      (this.result = n);
  }
}
class Ua extends jc {
  constructor(t, r, n, i, a, d, c) {
    super(
      t,
      r,
      "update",
      Object.assign(
        { "Request ID": et(n) },
        i.body
          ? Object.assign(Object.assign({}, c ? { "Error code": c } : {}), {
              "Reject code": String(a),
              "Reject message": d,
            })
          : {
              "HTTP status code": i.status.toString(),
              "HTTP status text": i.statusText,
            },
      ),
    ),
      (this.requestId = n),
      (this.response = i),
      (this.reject_code = a),
      (this.reject_message = d),
      (this.error_code = c);
  }
}
const yt = Symbol.for("ic-agent-metadata");
class pn {
  constructor(t) {
    this[yt] = Object.freeze(t);
  }
  static agentOf(t) {
    return t[yt].config.agent;
  }
  static interfaceOf(t) {
    return t[yt].service;
  }
  static canisterIdOf(t) {
    return Te.from(t[yt].config.canisterId);
  }
  static async install(t, r) {
    const n = t.mode === void 0 ? { install: null } : t.mode,
      i = t.arg ? [...new Uint8Array(t.arg)] : [],
      a = [...new Uint8Array(t.module)],
      d =
        typeof r.canisterId == "string"
          ? Te.fromText(r.canisterId)
          : r.canisterId;
    await Fa(r).install_code({
      mode: n,
      arg: i,
      wasm_module: a,
      canister_id: d,
      sender_canister_version: [],
    });
  }
  static async createCanister(t, r) {
    function n(a) {
      return [
        {
          controllers: a.controllers ? [a.controllers] : [],
          compute_allocation: a.compute_allocation
            ? [a.compute_allocation]
            : [],
          freezing_threshold: a.freezing_threshold
            ? [a.freezing_threshold]
            : [],
          memory_allocation: a.memory_allocation ? [a.memory_allocation] : [],
          reserved_cycles_limit: [],
          log_visibility: [],
          wasm_memory_limit: [],
        },
      ];
    }
    const { canister_id: i } = await Fa(
      t || {},
    ).provisional_create_canister_with_cycles({
      amount: [],
      settings: n(r || {}),
      specified_id: [],
      sender_canister_version: [],
    });
    return i;
  }
  static async createAndInstallCanister(t, r, n) {
    const i = await this.createCanister(n);
    return (
      await this.install(
        Object.assign({}, r),
        Object.assign(Object.assign({}, n), { canisterId: i }),
      ),
      this.createActor(
        t,
        Object.assign(Object.assign({}, n), { canisterId: i }),
      )
    );
  }
  static createActorClass(t, r) {
    const n = t({ IDL: yf });
    class i extends pn {
      constructor(d) {
        if (!d.canisterId)
          throw new De(
            `Canister ID is required, but received ${typeof d.canisterId} instead. If you are using automatically generated declarations, this may be because your application is not setting the canister ID in process.env correctly.`,
          );
        const c =
          typeof d.canisterId == "string"
            ? Te.fromText(d.canisterId)
            : d.canisterId;
        super({
          config: Object.assign(Object.assign(Object.assign({}, Lc), d), {
            canisterId: c,
          }),
          service: n,
        });
        for (const [w, x] of n._fields)
          r?.httpDetails && x.annotations.push(Es),
            r?.certificate && x.annotations.push(Hc),
            (this[w] = cd(this, w, x, d.blsVerify));
      }
    }
    return i;
  }
  static createActor(t, r) {
    if (!r.canisterId)
      throw new De(
        `Canister ID is required, but received ${typeof r.canisterId} instead. If you are using automatically generated declarations, this may be because your application is not setting the canister ID in process.env correctly.`,
      );
    return new (this.createActorClass(t))(r);
  }
  static createActorWithHttpDetails(t, r) {
    return new (this.createActorClass(t, { httpDetails: !0 }))(r);
  }
  static createActorWithExtendedDetails(
    t,
    r,
    n = { httpDetails: !0, certificate: !0 },
  ) {
    return new (this.createActorClass(t, n))(r);
  }
}
function Nr(e, t) {
  const r = fo(e, Ha.Buffer.from(t));
  switch (r.length) {
    case 0:
      return;
    case 1:
      return r[0];
    default:
      return r;
  }
}
const Lc = { pollingStrategyFactory: qc },
  Es = "http-details",
  Hc = "certificate";
function cd(e, t, r, n) {
  let i;
  r.annotations.includes("query") || r.annotations.includes("composite_query")
    ? (i = async (d, ...c) => {
        var w, x;
        d = Object.assign(
          Object.assign({}, d),
          (x = (w = e[yt].config).queryTransform) === null || x === void 0
            ? void 0
            : x.call(
                w,
                t,
                c,
                Object.assign(Object.assign({}, e[yt].config), d),
              ),
        );
        const B = d.agent || e[yt].config.agent || Ra(),
          N = Te.from(d.canisterId || e[yt].config.canisterId),
          I = as(r.argTypes, c),
          S = await B.query(N, {
            methodName: t,
            arg: I,
            effectiveCanisterId: d.effectiveCanisterId,
          }),
          b = Object.assign(Object.assign({}, S.httpDetails), {
            requestDetails: S.requestDetails,
          });
        switch (S.status) {
          case "rejected":
            throw new od(N, t, S);
          case "replied":
            return r.annotations.includes(Es)
              ? { httpDetails: b, result: Nr(r.retTypes, S.reply.arg) }
              : Nr(r.retTypes, S.reply.arg);
        }
      })
    : (i = async (d, ...c) => {
        var w, x;
        d = Object.assign(
          Object.assign({}, d),
          (x = (w = e[yt].config).callTransform) === null || x === void 0
            ? void 0
            : x.call(
                w,
                t,
                c,
                Object.assign(Object.assign({}, e[yt].config), d),
              ),
        );
        const B = d.agent || e[yt].config.agent || Ra(),
          {
            canisterId: N,
            effectiveCanisterId: I,
            pollingStrategyFactory: S,
          } = Object.assign(
            Object.assign(Object.assign({}, Lc), e[yt].config),
            d,
          ),
          b = Te.from(N),
          C = I !== void 0 ? Te.from(I) : b,
          V = as(r.argTypes, c);
        if (B.rootKey == null)
          throw new De("Agent root key not initialized before making call");
        const {
          requestId: K,
          response: L,
          requestDetails: W,
        } = await B.call(b, { methodName: t, arg: V, effectiveCanisterId: C });
        let te, $;
        if (L.body && L.body.certificate) {
          const ne = L.body.certificate;
          $ = await wr.create({
            certificate: ai(ne),
            rootKey: B.rootKey,
            canisterId: Te.from(N),
            blsVerify: n,
          });
          const J = [new TextEncoder().encode("request_status"), K];
          switch (new TextDecoder().decode(gt($.lookup([...J, "status"])))) {
            case "replied":
              te = gt($.lookup([...J, "reply"]));
              break;
            case "rejected": {
              const ue = new Uint8Array(gt($.lookup([...J, "reject_code"])))[0],
                R = new TextDecoder().decode(
                  gt($.lookup([...J, "reject_message"])),
                ),
                P = gt($.lookup([...J, "error_code"])),
                z = P ? new TextDecoder().decode(P) : void 0;
              throw new Ua(b, t, K, L, ue, R, z);
            }
          }
        } else if (L.body && "reject_message" in L.body) {
          const { reject_code: ne, reject_message: J, error_code: he } = L.body;
          throw new Ua(b, t, K, L, ne, J, he);
        }
        if (L.status === 202) {
          const ne = S(),
            J = await Gc(B, C, K, ne, n);
          ($ = J.certificate), (te = J.reply);
        }
        const X = r.annotations.includes(Es),
          q = r.annotations.includes(Hc),
          ee = Object.assign(Object.assign({}, L), { requestDetails: W });
        if (te !== void 0)
          return X && q
            ? { httpDetails: ee, certificate: $, result: Nr(r.retTypes, te) }
            : q
              ? { certificate: $, result: Nr(r.retTypes, te) }
              : X
                ? { httpDetails: ee, result: Nr(r.retTypes, te) }
                : Nr(r.retTypes, te);
        if (r.retTypes.length === 0)
          return X ? { httpDetails: L, result: void 0 } : void 0;
        throw new Error(
          `Call was returned undefined, but type [${r.retTypes.join(",")}].`,
        );
      });
  const a = (...d) => i({}, ...d);
  return (
    (a.withOptions =
      (d) =>
      (...c) =>
        i(d, ...c)),
    a
  );
}
function Fa(e) {
  function t(r, n) {
    if (e.effectiveCanisterId)
      return { effectiveCanisterId: Te.from(e.effectiveCanisterId) };
    const i = n[0];
    let a = Te.fromHex("");
    return (
      i &&
        typeof i == "object" &&
        i.canister_id &&
        (a = Te.from(i.canister_id)),
      { effectiveCanisterId: a }
    );
  }
  return pn.createActor(
    ad,
    Object.assign(
      Object.assign(Object.assign({}, e), { canisterId: Te.fromHex("") }),
      { callTransform: t, queryTransform: t },
    ),
  );
}
var gi = function (e, t, r, n, i) {
    if (n === "m") throw new TypeError("Private method is not writable");
    if (n === "a" && !i)
      throw new TypeError("Private accessor was defined without a setter");
    if (typeof t == "function" ? e !== t || !i : !t.has(e))
      throw new TypeError(
        "Cannot write private member to an object whose class did not declare it",
      );
    return n === "a" ? i.call(e, r) : i ? (i.value = r) : t.set(e, r), r;
  },
  tr = function (e, t, r, n) {
    if (r === "a" && !n)
      throw new TypeError("Private accessor was defined without a getter");
    if (typeof t == "function" ? e !== t || !n : !t.has(e))
      throw new TypeError(
        "Cannot read private member from an object whose class did not declare it",
      );
    return r === "m" ? n : r === "a" ? n.call(e) : n ? n.value : t.get(e);
  },
  ei,
  ti,
  Fr,
  Pr;
function Pa(e) {
  return e !== null && typeof e == "object";
}
class jt {
  constructor(t) {
    if (
      (ei.set(this, void 0),
      ti.set(this, void 0),
      t.byteLength !== jt.RAW_KEY_LENGTH)
    )
      throw new Error("An Ed25519 public key must be exactly 32bytes long");
    gi(this, ei, t, "f"), gi(this, ti, jt.derEncode(t), "f");
  }
  static from(t) {
    if (typeof t == "string") {
      const r = Lt(t);
      return this.fromRaw(r);
    } else if (Pa(t)) {
      const r = t;
      if (Pa(r) && Object.hasOwnProperty.call(r, "__derEncodedPublicKey__"))
        return this.fromDer(r);
      if (ArrayBuffer.isView(r)) {
        const n = r;
        return this.fromRaw(Is(n.buffer));
      } else {
        if (r instanceof ArrayBuffer) return this.fromRaw(r);
        if ("rawKey" in r) return this.fromRaw(r.rawKey);
        if ("derKey" in r) return this.fromDer(r.derKey);
        if ("toDer" in r) return this.fromDer(r.toDer());
      }
    }
    throw new Error("Cannot construct Ed25519PublicKey from the provided key.");
  }
  static fromRaw(t) {
    return new jt(t);
  }
  static fromDer(t) {
    return new jt(this.derDecode(t));
  }
  static derEncode(t) {
    const r = Sc(t, yi).buffer;
    return (r.__derEncodedPublicKey__ = void 0), r;
  }
  static derDecode(t) {
    const r = Oc(t, yi);
    if (r.length !== this.RAW_KEY_LENGTH)
      throw new Error("An Ed25519 public key must be exactly 32bytes long");
    return r;
  }
  get rawKey() {
    return tr(this, ei, "f");
  }
  get derKey() {
    return tr(this, ti, "f");
  }
  toDer() {
    return this.derKey;
  }
  toRaw() {
    return this.rawKey;
  }
}
(ei = new WeakMap()), (ti = new WeakMap());
jt.RAW_KEY_LENGTH = 32;
class ar extends ks {
  constructor(t, r) {
    super(),
      Fr.set(this, void 0),
      Pr.set(this, void 0),
      gi(this, Fr, jt.from(t), "f"),
      gi(this, Pr, new Uint8Array(r), "f");
  }
  static generate(t) {
    if (t && t.length !== 32)
      throw new Error("Ed25519 Seed needs to be 32 bytes long.");
    t || (t = Sr.utils.randomPrivateKey()),
      Ei(t, new Uint8Array(new Array(32).fill(0))) &&
        console.warn(
          "Seed is all zeros. This is not a secure seed. Please provide a seed with sufficient entropy if this is a production environment.",
        );
    const r = new Uint8Array(32);
    for (let i = 0; i < 32; i++) r[i] = new Uint8Array(t)[i];
    const n = Sr.getPublicKey(r);
    return ar.fromKeyPair(n, r);
  }
  static fromParsedJson(t) {
    const [r, n] = t;
    return new ar(jt.fromDer(Lt(r)), Lt(n));
  }
  static fromJSON(t) {
    const r = JSON.parse(t);
    if (Array.isArray(r)) {
      if (typeof r[0] == "string" && typeof r[1] == "string")
        return this.fromParsedJson([r[0], r[1]]);
      throw new Error(
        "Deserialization error: JSON must have at least 2 items.",
      );
    }
    throw new Error(
      `Deserialization error: Invalid JSON type for string: ${JSON.stringify(t)}`,
    );
  }
  static fromKeyPair(t, r) {
    return new ar(jt.fromRaw(t), r);
  }
  static fromSecretKey(t) {
    const r = Sr.getPublicKey(new Uint8Array(t));
    return ar.fromKeyPair(r, t);
  }
  toJSON() {
    return [et(tr(this, Fr, "f").toDer()), et(tr(this, Pr, "f"))];
  }
  getKeyPair() {
    return { secretKey: tr(this, Pr, "f"), publicKey: tr(this, Fr, "f") };
  }
  getPublicKey() {
    return tr(this, Fr, "f");
  }
  async sign(t) {
    const r = new Uint8Array(t),
      n = nn(Sr.sign(r, tr(this, Pr, "f").slice(0, 32)));
    return (
      Object.defineProperty(n, "__signature__", {
        enumerable: !1,
        value: void 0,
      }),
      n
    );
  }
  static verify(t, r, n) {
    const [i, a, d] = [t, r, n].map(
      (c) => (
        typeof c == "string" && (c = Lt(c)),
        c instanceof Uint8Array && (c = c.buffer),
        new Uint8Array(c)
      ),
    );
    return Sr.verify(a, i, d);
  }
}
(Fr = new WeakMap()), (Pr = new WeakMap());
class js extends Error {
  constructor(t) {
    super(t), (this.message = t), Object.setPrototypeOf(this, js.prototype);
  }
}
function ka(e) {
  if (typeof global < "u" && global.crypto && global.crypto.subtle)
    return global.crypto.subtle;
  if (e) return e;
  if (typeof crypto < "u" && crypto.subtle) return crypto.subtle;
  throw new js(
    "Global crypto was not available and none was provided. Please inlcude a SubtleCrypto implementation. See https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto",
  );
}
class wi extends ks {
  constructor(t, r, n) {
    super(), (this._keyPair = t), (this._derKey = r), (this._subtleCrypto = n);
  }
  static async generate(t) {
    const {
        extractable: r = !1,
        keyUsages: n = ["sign", "verify"],
        subtleCrypto: i,
      } = t ?? {},
      a = ka(i),
      d = await a.generateKey({ name: "ECDSA", namedCurve: "P-256" }, r, n),
      c = await a.exportKey("spki", d.publicKey);
    return new this(d, c, a);
  }
  static async fromKeyPair(t, r) {
    const n = ka(r),
      i = await n.exportKey("spki", t.publicKey);
    return new wi(t, i, n);
  }
  getKeyPair() {
    return this._keyPair;
  }
  getPublicKey() {
    const t = this._derKey,
      r = Object.create(this._keyPair.publicKey);
    return (
      (r.toDer = function () {
        return t;
      }),
      r
    );
  }
  async sign(t) {
    const r = { name: "ECDSA", hash: { name: "SHA-256" } };
    return await this._subtleCrypto.sign(r, this._keyPair.privateKey, t);
  }
}
var ud = function (e, t, r, n, i) {
    if (n === "m") throw new TypeError("Private method is not writable");
    if (n === "a" && !i)
      throw new TypeError("Private accessor was defined without a setter");
    if (typeof t == "function" ? e !== t || !i : !t.has(e))
      throw new TypeError(
        "Cannot write private member to an object whose class did not declare it",
      );
    return n === "a" ? i.call(e, r) : i ? (i.value = r) : t.set(e, r), r;
  },
  Wr = function (e, t, r, n) {
    if (r === "a" && !n)
      throw new TypeError("Private accessor was defined without a getter");
    if (typeof t == "function" ? e !== t || !n : !t.has(e))
      throw new TypeError(
        "Cannot read private member from an object whose class did not declare it",
      );
    return r === "m" ? n : r === "a" ? n.call(e) : n ? n.value : t.get(e);
  },
  Xt;
class fd {
  constructor(t) {
    Xt.set(this, void 0), ud(this, Xt, t, "f");
  }
  get rawKey() {
    return Wr(this, Xt, "f").rawKey;
  }
  get derKey() {
    return Wr(this, Xt, "f").derKey;
  }
  toDer() {
    return Wr(this, Xt, "f").toDer();
  }
  getPublicKey() {
    return Wr(this, Xt, "f");
  }
  getPrincipal() {
    return Te.from(Wr(this, Xt, "f").rawKey);
  }
  transformRequest() {
    return Promise.reject(
      "Not implemented. You are attempting to use a partial identity to sign calls, but this identity only has access to the public key.To sign calls, use a DelegationIdentity instead.",
    );
  }
}
Xt = new WeakMap();
var ld = function (e, t, r, n, i) {
    if (n === "m") throw new TypeError("Private method is not writable");
    if (n === "a" && !i)
      throw new TypeError("Private accessor was defined without a setter");
    if (typeof t == "function" ? e !== t || !i : !t.has(e))
      throw new TypeError(
        "Cannot write private member to an object whose class did not declare it",
      );
    return n === "a" ? i.call(e, r) : i ? (i.value = r) : t.set(e, r), r;
  },
  dd = function (e, t, r, n) {
    if (r === "a" && !n)
      throw new TypeError("Private accessor was defined without a getter");
    if (typeof t == "function" ? e !== t || !n : !t.has(e))
      throw new TypeError(
        "Cannot read private member from an object whose class did not declare it",
      );
    return r === "m" ? n : r === "a" ? n.call(e) : n ? n.value : t.get(e);
  },
  hd = function (e, t) {
    var r = {};
    for (var n in e)
      Object.prototype.hasOwnProperty.call(e, n) &&
        t.indexOf(n) < 0 &&
        (r[n] = e[n]);
    if (e != null && typeof Object.getOwnPropertySymbols == "function")
      for (var i = 0, n = Object.getOwnPropertySymbols(e); i < n.length; i++)
        t.indexOf(n[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, n[i]) &&
          (r[n[i]] = e[n[i]]);
    return r;
  },
  ri;
const pd = new TextEncoder().encode("ic-request-auth-delegation"),
  yd = new TextEncoder().encode(`
ic-request`);
function Zi(e) {
  if (typeof e != "string" || e.length < 64)
    throw new Error("Invalid public key.");
  return Lt(e);
}
class Ls {
  constructor(t, r, n) {
    (this.pubkey = t), (this.expiration = r), (this.targets = n);
  }
  toCBOR() {
    return lt.value.map(
      Object.assign(
        {
          pubkey: lt.value.bytes(this.pubkey),
          expiration: lt.value.u64(this.expiration.toString(16), 16),
        },
        this.targets && {
          targets: lt.value.array(
            this.targets.map((t) => lt.value.bytes(t.toUint8Array())),
          ),
        },
      ),
    );
  }
  toJSON() {
    return Object.assign(
      { expiration: this.expiration.toString(16), pubkey: et(this.pubkey) },
      this.targets && { targets: this.targets.map((t) => t.toHex()) },
    );
  }
}
async function gd(e, t, r, n) {
  const i = new Ls(t.toDer(), BigInt(+r) * BigInt(1e6), n),
    a = new Uint8Array([...pd, ...new Uint8Array(fn(i))]),
    d = await e.sign(a);
  return { delegation: i, signature: d };
}
class mi {
  constructor(t, r) {
    (this.delegations = t), (this.publicKey = r);
  }
  static async create(t, r, n = new Date(Date.now() + 15 * 60 * 1e3), i = {}) {
    var a, d;
    const c = await gd(t, r, n, i.targets);
    return new mi(
      [
        ...(((a = i.previous) === null || a === void 0
          ? void 0
          : a.delegations) || []),
        c,
      ],
      ((d = i.previous) === null || d === void 0 ? void 0 : d.publicKey) ||
        t.getPublicKey().toDer(),
    );
  }
  static fromJSON(t) {
    const { publicKey: r, delegations: n } =
      typeof t == "string" ? JSON.parse(t) : t;
    if (!Array.isArray(n)) throw new Error("Invalid delegations.");
    const i = n.map((a) => {
      const { delegation: d, signature: c } = a,
        { pubkey: w, expiration: x, targets: B } = d;
      if (B !== void 0 && !Array.isArray(B))
        throw new Error("Invalid targets.");
      return {
        delegation: new Ls(
          Zi(w),
          BigInt("0x" + x),
          B &&
            B.map((N) => {
              if (typeof N != "string") throw new Error("Invalid target.");
              return Te.fromHex(N);
            }),
        ),
        signature: Zi(c),
      };
    });
    return new this(i, Zi(r));
  }
  static fromDelegations(t, r) {
    return new this(t, r);
  }
  toJSON() {
    return {
      delegations: this.delegations.map((t) => {
        const { delegation: r, signature: n } = t,
          { targets: i } = r;
        return {
          delegation: Object.assign(
            { expiration: r.expiration.toString(16), pubkey: et(r.pubkey) },
            i && { targets: i.map((a) => a.toHex()) },
          ),
          signature: et(n),
        };
      }),
      publicKey: et(this.publicKey),
    };
  }
}
class Ca extends ks {
  constructor(t, r) {
    super(), (this._inner = t), (this._delegation = r);
  }
  static fromDelegation(t, r) {
    return new this(t, r);
  }
  getDelegation() {
    return this._delegation;
  }
  getPublicKey() {
    return {
      derKey: this._delegation.publicKey,
      toDer: () => this._delegation.publicKey,
    };
  }
  sign(t) {
    return this._inner.sign(t);
  }
  async transformRequest(t) {
    const { body: r } = t,
      n = hd(t, ["body"]),
      i = await fn(r);
    return Object.assign(Object.assign({}, n), {
      body: {
        content: r,
        sender_sig: await this.sign(
          new Uint8Array([...yd, ...new Uint8Array(i)]),
        ),
        sender_delegation: this._delegation.delegations,
        sender_pubkey: this._delegation.publicKey,
      },
    });
  }
}
class bi extends fd {
  constructor(t, r) {
    super(t), ri.set(this, void 0), ld(this, ri, r, "f");
  }
  get delegation() {
    return dd(this, ri, "f");
  }
  static fromDelegation(t, r) {
    return new bi(t, r);
  }
}
ri = new WeakMap();
function wd(e, t) {
  for (const { delegation: n } of e.delegations)
    if (+new Date(Number(n.expiration / BigInt(1e6))) <= +Date.now()) return !1;
  const r = [];
  for (const n of r) {
    const i = n.toText();
    for (const { delegation: a } of e.delegations) {
      if (a.targets === void 0) continue;
      let d = !0;
      for (const c of a.targets)
        if (c.toText() === i) {
          d = !1;
          break;
        }
      if (d) return !1;
    }
  }
  return !0;
}
var $a;
(function (e) {
  e[(e.ECDSA_WITH_SHA256 = -7)] = "ECDSA_WITH_SHA256";
})($a || ($a = {}));
const Ma = ["mousedown", "mousemove", "keydown", "touchstart", "wheel"];
class Va {
  constructor(t = {}) {
    var r;
    (this.callbacks = []),
      (this.idleTimeout = 10 * 60 * 1e3),
      (this.timeoutID = void 0);
    const { onIdle: n, idleTimeout: i = 10 * 60 * 1e3 } = t || {};
    (this.callbacks = n ? [n] : []), (this.idleTimeout = i);
    const a = this._resetTimer.bind(this);
    window.addEventListener("load", a, !0),
      Ma.forEach(function (c) {
        document.addEventListener(c, a, !0);
      });
    const d = (c, w) => {
      let x;
      return (...B) => {
        const N = this,
          I = function () {
            (x = void 0), c.apply(N, B);
          };
        clearTimeout(x), (x = window.setTimeout(I, w));
      };
    };
    if (t?.captureScroll) {
      const c = d(
        a,
        (r = t?.scrollDebounce) !== null && r !== void 0 ? r : 100,
      );
      window.addEventListener("scroll", c, !0);
    }
    a();
  }
  static create(t = {}) {
    return new this(t);
  }
  registerCallback(t) {
    this.callbacks.push(t);
  }
  exit() {
    clearTimeout(this.timeoutID),
      window.removeEventListener("load", this._resetTimer, !0);
    const t = this._resetTimer.bind(this);
    Ma.forEach(function (r) {
      document.removeEventListener(r, t, !0);
    }),
      this.callbacks.forEach((r) => r());
  }
  _resetTimer() {
    const t = this.exit.bind(this);
    window.clearTimeout(this.timeoutID),
      (this.timeoutID = window.setTimeout(t, this.idleTimeout));
  }
}
const md = (e, t) => t.some((r) => e instanceof r);
let qa, Ga;
function bd() {
  return (
    qa ||
    (qa = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction])
  );
}
function _d() {
  return (
    Ga ||
    (Ga = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const Dc = new WeakMap(),
  vs = new WeakMap(),
  Kc = new WeakMap(),
  Xi = new WeakMap(),
  Hs = new WeakMap();
function xd(e) {
  const t = new Promise((r, n) => {
    const i = () => {
        e.removeEventListener("success", a), e.removeEventListener("error", d);
      },
      a = () => {
        r(cr(e.result)), i();
      },
      d = () => {
        n(e.error), i();
      };
    e.addEventListener("success", a), e.addEventListener("error", d);
  });
  return (
    t
      .then((r) => {
        r instanceof IDBCursor && Dc.set(r, e);
      })
      .catch(() => {}),
    Hs.set(t, e),
    t
  );
}
function Ed(e) {
  if (vs.has(e)) return;
  const t = new Promise((r, n) => {
    const i = () => {
        e.removeEventListener("complete", a),
          e.removeEventListener("error", d),
          e.removeEventListener("abort", d);
      },
      a = () => {
        r(), i();
      },
      d = () => {
        n(e.error || new DOMException("AbortError", "AbortError")), i();
      };
    e.addEventListener("complete", a),
      e.addEventListener("error", d),
      e.addEventListener("abort", d);
  });
  vs.set(e, t);
}
let Ts = {
  get(e, t, r) {
    if (e instanceof IDBTransaction) {
      if (t === "done") return vs.get(e);
      if (t === "objectStoreNames") return e.objectStoreNames || Kc.get(e);
      if (t === "store")
        return r.objectStoreNames[1]
          ? void 0
          : r.objectStore(r.objectStoreNames[0]);
    }
    return cr(e[t]);
  },
  set(e, t, r) {
    return (e[t] = r), !0;
  },
  has(e, t) {
    return e instanceof IDBTransaction && (t === "done" || t === "store")
      ? !0
      : t in e;
  },
};
function vd(e) {
  Ts = e(Ts);
}
function Td(e) {
  return e === IDBDatabase.prototype.transaction &&
    !("objectStoreNames" in IDBTransaction.prototype)
    ? function (t, ...r) {
        const n = e.call(Ji(this), t, ...r);
        return Kc.set(n, t.sort ? t.sort() : [t]), cr(n);
      }
    : _d().includes(e)
      ? function (...t) {
          return e.apply(Ji(this), t), cr(Dc.get(this));
        }
      : function (...t) {
          return cr(e.apply(Ji(this), t));
        };
}
function Bd(e) {
  return typeof e == "function"
    ? Td(e)
    : (e instanceof IDBTransaction && Ed(e),
      md(e, bd()) ? new Proxy(e, Ts) : e);
}
function cr(e) {
  if (e instanceof IDBRequest) return xd(e);
  if (Xi.has(e)) return Xi.get(e);
  const t = Bd(e);
  return t !== e && (Xi.set(e, t), Hs.set(t, e)), t;
}
const Ji = (e) => Hs.get(e);
function Ad(e, t, { blocked: r, upgrade: n, blocking: i, terminated: a } = {}) {
  const d = indexedDB.open(e, t),
    c = cr(d);
  return (
    n &&
      d.addEventListener("upgradeneeded", (w) => {
        n(cr(d.result), w.oldVersion, w.newVersion, cr(d.transaction), w);
      }),
    r && d.addEventListener("blocked", (w) => r(w.oldVersion, w.newVersion, w)),
    c
      .then((w) => {
        a && w.addEventListener("close", () => a()),
          i &&
            w.addEventListener("versionchange", (x) =>
              i(x.oldVersion, x.newVersion, x),
            );
      })
      .catch(() => {}),
    c
  );
}
const Nd = ["get", "getKey", "getAll", "getAllKeys", "count"],
  Id = ["put", "add", "delete", "clear"],
  Qi = new Map();
function ja(e, t) {
  if (!(e instanceof IDBDatabase && !(t in e) && typeof t == "string")) return;
  if (Qi.get(t)) return Qi.get(t);
  const r = t.replace(/FromIndex$/, ""),
    n = t !== r,
    i = Id.includes(r);
  if (
    !(r in (n ? IDBIndex : IDBObjectStore).prototype) ||
    !(i || Nd.includes(r))
  )
    return;
  const a = async function (d, ...c) {
    const w = this.transaction(d, i ? "readwrite" : "readonly");
    let x = w.store;
    return (
      n && (x = x.index(c.shift())),
      (await Promise.all([x[r](...c), i && w.done]))[0]
    );
  };
  return Qi.set(t, a), a;
}
vd((e) => ({
  ...e,
  get: (t, r, n) => ja(t, r) || e.get(t, r, n),
  has: (t, r) => !!ja(t, r) || e.has(t, r),
}));
const zc = "auth-client-db",
  Wc = "ic-keyval",
  Sd = async (e = zc, t = Wc, r) => (
    Yc &&
      localStorage != null &&
      localStorage.getItem(sr) &&
      (localStorage.removeItem(sr), localStorage.removeItem(rr)),
    await Ad(e, r, {
      upgrade: (n) => {
        n.objectStoreNames.contains(t) && n.clear(t), n.createObjectStore(t);
      },
    })
  );
async function Od(e, t, r) {
  return await e.get(t, r);
}
async function Rd(e, t, r, n) {
  return await e.put(t, n, r);
}
async function Ud(e, t, r) {
  return await e.delete(t, r);
}
class Ds {
  constructor(t, r) {
    (this._db = t), (this._storeName = r);
  }
  static async create(t) {
    const { dbName: r = zc, storeName: n = Wc, version: i = Cd } = t ?? {},
      a = await Sd(r, n, i);
    return new Ds(a, n);
  }
  async set(t, r) {
    return await Rd(this._db, this._storeName, t, r);
  }
  async get(t) {
    var r;
    return (r = await Od(this._db, this._storeName, t)) !== null && r !== void 0
      ? r
      : null;
  }
  async remove(t) {
    return await Ud(this._db, this._storeName, t);
  }
}
var Fd = function (e, t, r, n, i) {
    if (n === "m") throw new TypeError("Private method is not writable");
    if (n === "a" && !i)
      throw new TypeError("Private accessor was defined without a setter");
    if (typeof t == "function" ? e !== t || !i : !t.has(e))
      throw new TypeError(
        "Cannot write private member to an object whose class did not declare it",
      );
    return n === "a" ? i.call(e, r) : i ? (i.value = r) : t.set(e, r), r;
  },
  Pd = function (e, t, r, n) {
    if (r === "a" && !n)
      throw new TypeError("Private accessor was defined without a getter");
    if (typeof t == "function" ? e !== t || !n : !t.has(e))
      throw new TypeError(
        "Cannot read private member from an object whose class did not declare it",
      );
    return r === "m" ? n : r === "a" ? n.call(e) : n ? n.value : t.get(e);
  },
  ni;
const rr = "identity",
  sr = "delegation",
  kd = "iv",
  Cd = 1,
  Yc = typeof window < "u";
class $d {
  constructor(t = "ic-", r) {
    (this.prefix = t), (this._localStorage = r);
  }
  get(t) {
    return Promise.resolve(this._getLocalStorage().getItem(this.prefix + t));
  }
  set(t, r) {
    return (
      this._getLocalStorage().setItem(this.prefix + t, r), Promise.resolve()
    );
  }
  remove(t) {
    return (
      this._getLocalStorage().removeItem(this.prefix + t), Promise.resolve()
    );
  }
  _getLocalStorage() {
    if (this._localStorage) return this._localStorage;
    const t =
      typeof window > "u"
        ? typeof global > "u"
          ? typeof self > "u"
            ? void 0
            : self.localStorage
          : global.localStorage
        : window.localStorage;
    if (!t) throw new Error("Could not find local storage.");
    return t;
  }
}
class Md {
  constructor(t) {
    ni.set(this, void 0), Fd(this, ni, t ?? {}, "f");
  }
  get _db() {
    return new Promise((t) => {
      if (this.initializedDb) {
        t(this.initializedDb);
        return;
      }
      Ds.create(Pd(this, ni, "f")).then((r) => {
        (this.initializedDb = r), t(r);
      });
    });
  }
  async get(t) {
    return await (await this._db).get(t);
  }
  async set(t, r) {
    await (await this._db).set(t, r);
  }
  async remove(t) {
    await (await this._db).remove(t);
  }
}
ni = new WeakMap();
const Vd = "https://identity.ic0.app",
  qd = "#authorize",
  es = "ECDSA",
  ts = "Ed25519",
  Gd = 500,
  jd = "UserInterrupt";
class Ph {
  constructor(t, r, n, i, a, d, c, w) {
    (this._identity = t),
      (this._key = r),
      (this._chain = n),
      (this._storage = i),
      (this.idleManager = a),
      (this._createOptions = d),
      (this._idpWindow = c),
      (this._eventHandler = w),
      this._registerDefaultIdleCallback();
  }
  static async create(t = {}) {
    var r, n, i;
    const a = (r = t.storage) !== null && r !== void 0 ? r : new Md(),
      d = (n = t.keyType) !== null && n !== void 0 ? n : es;
    let c = null;
    if (t.identity) c = t.identity;
    else {
      let N = await a.get(rr);
      if (!N && Yc)
        try {
          const I = new $d(),
            S = await I.get(sr),
            b = await I.get(rr);
          S &&
            b &&
            d === es &&
            (console.log(
              "Discovered an identity stored in localstorage. Migrating to IndexedDB",
            ),
            await a.set(sr, S),
            await a.set(rr, b),
            (N = S),
            await I.remove(sr),
            await I.remove(rr));
        } catch (I) {
          console.error("error while attempting to recover localstorage: " + I);
        }
      if (N)
        try {
          typeof N == "object"
            ? d === ts && typeof N == "string"
              ? (c = await ar.fromJSON(N))
              : (c = await wi.fromKeyPair(N))
            : typeof N == "string" && (c = ar.fromJSON(N));
        } catch {}
    }
    let w = new fi(),
      x = null;
    if (c)
      try {
        const N = await a.get(sr);
        if (typeof N == "object" && N !== null)
          throw new Error(
            "Delegation chain is incorrectly stored. A delegation chain should be stored as a string.",
          );
        t.identity
          ? (w = t.identity)
          : N &&
            ((x = mi.fromJSON(N)),
            wd(x)
              ? "toDer" in c
                ? (w = bi.fromDelegation(c, x))
                : (w = Ca.fromDelegation(c, x))
              : (await rs(a), (c = null)));
      } catch (N) {
        console.error(N), await rs(a), (c = null);
      }
    let B;
    return (
      !((i = t.idleOptions) === null || i === void 0) && i.disableIdle
        ? (B = void 0)
        : (x || t.identity) && (B = Va.create(t.idleOptions)),
      c ||
        (d === ts
          ? ((c = await ar.generate()),
            await a.set(rr, JSON.stringify(c.toJSON())))
          : (t.storage &&
              d === es &&
              console.warn(
                `You are using a custom storage provider that may not support CryptoKey storage. If you are using a custom storage provider that does not support CryptoKey storage, you should use '${ts}' as the key type, as it can serialize to a string`,
              ),
            (c = await wi.generate()),
            await a.set(rr, c.getKeyPair()))),
      new this(w, c, x, a, B, t)
    );
  }
  _registerDefaultIdleCallback() {
    var t, r;
    const n =
      (t = this._createOptions) === null || t === void 0
        ? void 0
        : t.idleOptions;
    !n?.onIdle &&
      !n?.disableDefaultIdleCallback &&
      ((r = this.idleManager) === null ||
        r === void 0 ||
        r.registerCallback(() => {
          this.logout(), location.reload();
        }));
  }
  async _handleSuccess(t, r) {
    var n, i;
    const a = t.delegations.map((x) => ({
        delegation: new Ls(
          x.delegation.pubkey,
          x.delegation.expiration,
          x.delegation.targets,
        ),
        signature: x.signature.buffer,
      })),
      d = mi.fromDelegations(a, t.userPublicKey.buffer),
      c = this._key;
    if (!c) return;
    (this._chain = d),
      "toDer" in c
        ? (this._identity = bi.fromDelegation(c, this._chain))
        : (this._identity = Ca.fromDelegation(c, this._chain)),
      (n = this._idpWindow) === null || n === void 0 || n.close();
    const w =
      (i = this._createOptions) === null || i === void 0
        ? void 0
        : i.idleOptions;
    !this.idleManager &&
      !w?.disableIdle &&
      ((this.idleManager = Va.create(w)), this._registerDefaultIdleCallback()),
      this._removeEventListener(),
      delete this._idpWindow,
      this._chain &&
        (await this._storage.set(sr, JSON.stringify(this._chain.toJSON()))),
      r?.(t);
  }
  getIdentity() {
    return this._identity;
  }
  async isAuthenticated() {
    return (
      !this.getIdentity().getPrincipal().isAnonymous() && this._chain !== null
    );
  }
  async login(t) {
    var r, n, i, a;
    const d = BigInt(8) * BigInt(36e11),
      c = new URL(
        ((r = t?.identityProvider) === null || r === void 0
          ? void 0
          : r.toString()) || Vd,
      );
    (c.hash = qd),
      (n = this._idpWindow) === null || n === void 0 || n.close(),
      this._removeEventListener(),
      (this._eventHandler = this._getEventHandler(
        c,
        Object.assign(
          {
            maxTimeToLive:
              (i = t?.maxTimeToLive) !== null && i !== void 0 ? i : d,
          },
          t,
        ),
      )),
      window.addEventListener("message", this._eventHandler),
      (this._idpWindow =
        (a = window.open(
          c.toString(),
          "idpWindow",
          t?.windowOpenerFeatures,
        )) !== null && a !== void 0
          ? a
          : void 0);
    const w = () => {
      this._idpWindow &&
        (this._idpWindow.closed
          ? this._handleFailure(jd, t?.onError)
          : setTimeout(w, Gd));
    };
    w();
  }
  _getEventHandler(t, r) {
    return async (n) => {
      var i, a, d;
      if (n.origin !== t.origin) {
        console.warn(
          `WARNING: expected origin '${t.origin}', got '${n.origin}' (ignoring)`,
        );
        return;
      }
      const c = n.data;
      switch (c.kind) {
        case "authorize-ready": {
          const w = Object.assign(
            {
              kind: "authorize-client",
              sessionPublicKey: new Uint8Array(
                (i = this._key) === null || i === void 0
                  ? void 0
                  : i.getPublicKey().toDer(),
              ),
              maxTimeToLive: r?.maxTimeToLive,
              allowPinAuthentication: r?.allowPinAuthentication,
              derivationOrigin:
                (a = r?.derivationOrigin) === null || a === void 0
                  ? void 0
                  : a.toString(),
            },
            r?.customValues,
          );
          (d = this._idpWindow) === null ||
            d === void 0 ||
            d.postMessage(w, t.origin);
          break;
        }
        case "authorize-client-success":
          try {
            await this._handleSuccess(c, r?.onSuccess);
          } catch (w) {
            this._handleFailure(w.message, r?.onError);
          }
          break;
        case "authorize-client-failure":
          this._handleFailure(c.text, r?.onError);
          break;
      }
    };
  }
  _handleFailure(t, r) {
    var n;
    (n = this._idpWindow) === null || n === void 0 || n.close(),
      r?.(t),
      this._removeEventListener(),
      delete this._idpWindow;
  }
  _removeEventListener() {
    this._eventHandler &&
      window.removeEventListener("message", this._eventHandler),
      (this._eventHandler = void 0);
  }
  async logout(t = {}) {
    if (
      (await rs(this._storage),
      (this._identity = new fi()),
      (this._chain = null),
      t.returnTo)
    )
      try {
        window.history.pushState({}, "", t.returnTo);
      } catch {
        window.location.href = t.returnTo;
      }
  }
}
async function rs(e) {
  await e.remove(rr), await e.remove(sr), await e.remove(kd);
}
var Ld = ((e) => (
  (e[(e.FractionalMoreThan8Decimals = 0)] = "FractionalMoreThan8Decimals"),
  (e[(e.InvalidFormat = 1)] = "InvalidFormat"),
  (e[(e.FractionalTooManyDecimals = 2)] = "FractionalTooManyDecimals"),
  e
))(Ld || {});
BigInt(1e8);
var Hd = class {
    constructor(e, t, r) {
      (this.id = e),
        (this.service = t),
        (this.certifiedService = r),
        (this.caller = ({ certified: n = !0 }) =>
          n ? this.certifiedService : this.service);
    }
    get canisterId() {
      return this.id;
    }
  },
  Zc = (e) => e == null,
  Bs = (e) => !Zc(e),
  Dd = () => Mr.createSync({ host: "https://icp-api.io", identity: new fi() }),
  kh = async ({
    identity: e,
    host: t,
    fetchRootKey: r = !1,
    verifyQuerySignatures: n = !1,
    retryTimes: i,
  }) =>
    await Mr.create({
      identity: e,
      ...(Bs(t) && { host: t }),
      verifyQuerySignatures: n,
      ...(Bs(i) && { retryTimes: i }),
      shouldFetchRootKey: r,
    }),
  Kd = ({
    options: {
      canisterId: e,
      serviceOverride: t,
      certifiedServiceOverride: r,
      agent: n,
      callTransform: i,
      queryTransform: a,
    },
    idlFactory: d,
    certifiedIdlFactory: c,
  }) => {
    let w = n ?? Dd(),
      x =
        t ??
        pn.createActor(d, {
          agent: w,
          canisterId: e,
          callTransform: i,
          queryTransform: a,
        }),
      B =
        r ??
        pn.createActor(c, {
          agent: w,
          canisterId: e,
          callTransform: i,
          queryTransform: a,
        });
    return { service: x, certifiedService: B, agent: w, canisterId: e };
  },
  La = "abcdefghijklmnopqrstuvwxyz234567",
  yn = Object.create(null);
for (let e = 0; e < La.length; e++) yn[La[e]] = e;
yn[0] = yn.o;
yn[1] = yn.i;
var Xe = (e) => (Bs(e) ? [e] : []),
  zd = ({ IDL: e }) => {
    let t = e.Rec(),
      r = e.Rec(),
      n = e.Rec(),
      i = e.Record({
        num_blocks_to_archive: e.Opt(e.Nat64),
        max_transactions_per_response: e.Opt(e.Nat64),
        trigger_threshold: e.Opt(e.Nat64),
        more_controller_ids: e.Opt(e.Vec(e.Principal)),
        max_message_size_bytes: e.Opt(e.Nat64),
        cycles_for_archive_creation: e.Opt(e.Nat64),
        node_max_memory_size_bytes: e.Opt(e.Nat64),
        controller_id: e.Opt(e.Principal),
      }),
      a = e.Variant({
        Int: e.Int,
        Nat: e.Nat,
        Blob: e.Vec(e.Nat8),
        Text: e.Text,
      }),
      d = e.Vec(e.Nat8),
      c = e.Record({ owner: e.Principal, subaccount: e.Opt(d) }),
      w = e.Variant({ SetTo: c, Unset: e.Null }),
      x = e.Record({ icrc2: e.Bool }),
      B = e.Record({
        change_archive_options: e.Opt(i),
        token_symbol: e.Opt(e.Text),
        transfer_fee: e.Opt(e.Nat),
        metadata: e.Opt(e.Vec(e.Tuple(e.Text, a))),
        accounts_overflow_trim_quantity: e.Opt(e.Nat64),
        change_fee_collector: e.Opt(w),
        max_memo_length: e.Opt(e.Nat16),
        token_name: e.Opt(e.Text),
        feature_flags: e.Opt(x),
      }),
      N = e.Record({
        decimals: e.Opt(e.Nat8),
        token_symbol: e.Text,
        transfer_fee: e.Nat,
        metadata: e.Vec(e.Tuple(e.Text, a)),
        minting_account: c,
        initial_balances: e.Vec(e.Tuple(c, e.Nat)),
        maximum_number_of_accounts: e.Opt(e.Nat64),
        accounts_overflow_trim_quantity: e.Opt(e.Nat64),
        fee_collector_account: e.Opt(c),
        archive_options: e.Record({
          num_blocks_to_archive: e.Nat64,
          max_transactions_per_response: e.Opt(e.Nat64),
          trigger_threshold: e.Nat64,
          more_controller_ids: e.Opt(e.Vec(e.Principal)),
          max_message_size_bytes: e.Opt(e.Nat64),
          cycles_for_archive_creation: e.Opt(e.Nat64),
          node_max_memory_size_bytes: e.Opt(e.Nat64),
          controller_id: e.Principal,
        }),
        max_memo_length: e.Opt(e.Nat16),
        token_name: e.Text,
        feature_flags: e.Opt(x),
      });
    e.Variant({ Upgrade: e.Opt(B), Init: N });
    let I = e.Nat,
      S = e.Record({
        block_range_end: I,
        canister_id: e.Principal,
        block_range_start: I,
      }),
      b = e.Record({ start: I, length: e.Nat }),
      C = e.Vec(e.Tuple(e.Text, n));
    n.fill(
      e.Variant({
        Int: e.Int,
        Map: C,
        Nat: e.Nat,
        Nat64: e.Nat64,
        Blob: e.Vec(e.Nat8),
        Text: e.Text,
        Array: e.Vec(n),
      }),
    );
    let V = n,
      K = e.Record({ blocks: e.Vec(V) }),
      L = e.Func([b], [K], []),
      W = e.Record({
        certificate: e.Opt(e.Vec(e.Nat8)),
        first_index: I,
        blocks: e.Vec(V),
        chain_length: e.Nat64,
        archived_blocks: e.Vec(
          e.Record({ callback: L, start: I, length: e.Nat }),
        ),
      }),
      te = e.Record({
        certificate: e.Opt(e.Vec(e.Nat8)),
        hash_tree: e.Vec(e.Nat8),
      }),
      $ = e.Nat,
      X = e.Record({ start: $, length: e.Nat }),
      q = e.Nat64,
      ee = e.Record({
        from: c,
        memo: e.Opt(e.Vec(e.Nat8)),
        created_at_time: e.Opt(q),
        amount: e.Nat,
        spender: e.Opt(c),
      }),
      ne = e.Record({
        to: c,
        memo: e.Opt(e.Vec(e.Nat8)),
        created_at_time: e.Opt(q),
        amount: e.Nat,
      }),
      J = e.Record({
        fee: e.Opt(e.Nat),
        from: c,
        memo: e.Opt(e.Vec(e.Nat8)),
        created_at_time: e.Opt(q),
        amount: e.Nat,
        expected_allowance: e.Opt(e.Nat),
        expires_at: e.Opt(q),
        spender: c,
      }),
      he = e.Record({
        to: c,
        fee: e.Opt(e.Nat),
        from: c,
        memo: e.Opt(e.Vec(e.Nat8)),
        created_at_time: e.Opt(q),
        amount: e.Nat,
        spender: e.Opt(c),
      }),
      ue = e.Record({
        burn: e.Opt(ee),
        kind: e.Text,
        mint: e.Opt(ne),
        approve: e.Opt(J),
        timestamp: q,
        transfer: e.Opt(he),
      }),
      R = e.Record({ transactions: e.Vec(ue) }),
      P = e.Func([X], [R], []),
      z = e.Record({
        first_index: $,
        log_length: e.Nat,
        transactions: e.Vec(ue),
        archived_transactions: e.Vec(
          e.Record({ callback: P, start: $, length: e.Nat }),
        ),
      }),
      M = e.Nat,
      G = e.Record({ url: e.Text, name: e.Text }),
      Q = e.Record({
        to: c,
        fee: e.Opt(M),
        memo: e.Opt(e.Vec(e.Nat8)),
        from_subaccount: e.Opt(d),
        created_at_time: e.Opt(q),
        amount: M,
      }),
      re = e.Variant({
        GenericError: e.Record({ message: e.Text, error_code: e.Nat }),
        TemporarilyUnavailable: e.Null,
        BadBurn: e.Record({ min_burn_amount: M }),
        Duplicate: e.Record({ duplicate_of: I }),
        BadFee: e.Record({ expected_fee: M }),
        CreatedInFuture: e.Record({ ledger_time: q }),
        TooOld: e.Null,
        InsufficientFunds: e.Record({ balance: M }),
      }),
      ye = e.Variant({ Ok: I, Err: re }),
      ae = e.Record({ utc_offset_minutes: e.Opt(e.Int16), language: e.Text }),
      Y = e.Record({
        metadata: ae,
        device_spec: e.Opt(
          e.Variant({
            GenericDisplay: e.Null,
            LineDisplay: e.Record({
              characters_per_line: e.Nat16,
              lines_per_page: e.Nat16,
            }),
          }),
        ),
      }),
      le = e.Record({
        arg: e.Vec(e.Nat8),
        method: e.Text,
        user_preferences: Y,
      }),
      _ = e.Variant({
        LineDisplayMessage: e.Record({
          pages: e.Vec(e.Record({ lines: e.Vec(e.Text) })),
        }),
        GenericDisplayMessage: e.Text,
      }),
      oe = e.Record({ metadata: ae, consent_message: _ }),
      fe = e.Record({ description: e.Text }),
      we = e.Variant({
        GenericError: e.Record({ description: e.Text, error_code: e.Nat }),
        InsufficientPayment: fe,
        UnsupportedCanisterCall: fe,
        ConsentMessageUnavailable: fe,
      }),
      ie = e.Variant({ Ok: oe, Err: we }),
      se = e.Record({ account: c, spender: c }),
      m = e.Record({ allowance: e.Nat, expires_at: e.Opt(q) }),
      s = e.Record({
        fee: e.Opt(e.Nat),
        memo: e.Opt(e.Vec(e.Nat8)),
        from_subaccount: e.Opt(e.Vec(e.Nat8)),
        created_at_time: e.Opt(q),
        amount: e.Nat,
        expected_allowance: e.Opt(e.Nat),
        expires_at: e.Opt(q),
        spender: c,
      }),
      h = e.Variant({
        GenericError: e.Record({ message: e.Text, error_code: e.Nat }),
        TemporarilyUnavailable: e.Null,
        Duplicate: e.Record({ duplicate_of: I }),
        BadFee: e.Record({ expected_fee: e.Nat }),
        AllowanceChanged: e.Record({ current_allowance: e.Nat }),
        CreatedInFuture: e.Record({ ledger_time: q }),
        TooOld: e.Null,
        Expired: e.Record({ ledger_time: q }),
        InsufficientFunds: e.Record({ balance: e.Nat }),
      }),
      E = e.Variant({ Ok: I, Err: h }),
      T = e.Record({
        to: c,
        fee: e.Opt(M),
        spender_subaccount: e.Opt(d),
        from: c,
        memo: e.Opt(e.Vec(e.Nat8)),
        created_at_time: e.Opt(q),
        amount: M,
      }),
      U = e.Variant({
        GenericError: e.Record({ message: e.Text, error_code: e.Nat }),
        TemporarilyUnavailable: e.Null,
        InsufficientAllowance: e.Record({ allowance: M }),
        BadBurn: e.Record({ min_burn_amount: M }),
        Duplicate: e.Record({ duplicate_of: I }),
        BadFee: e.Record({ expected_fee: M }),
        CreatedInFuture: e.Record({ ledger_time: q }),
        TooOld: e.Null,
        InsufficientFunds: e.Record({ balance: M }),
      }),
      p = e.Variant({ Ok: I, Err: U }),
      o = e.Record({ from: e.Opt(e.Principal) }),
      u = e.Vec(
        e.Record({ end: e.Nat, canister_id: e.Principal, start: e.Nat }),
      );
    r.fill(
      e.Variant({
        Int: e.Int,
        Map: e.Vec(e.Tuple(e.Text, r)),
        Nat: e.Nat,
        Blob: e.Vec(e.Nat8),
        Text: e.Text,
        Array: e.Vec(r),
      }),
    ),
      t.fill(
        e.Record({
          log_length: e.Nat,
          blocks: e.Vec(e.Record({ id: e.Nat, block: r })),
          archived_blocks: e.Vec(
            e.Record({ args: e.Vec(b), callback: e.Func([e.Vec(b)], [t], []) }),
          ),
        }),
      );
    let g = e.Record({ certificate: e.Vec(e.Nat8), hash_tree: e.Vec(e.Nat8) });
    return e.Service({
      archives: e.Func([], [e.Vec(S)], []),
      get_blocks: e.Func([b], [W], []),
      get_data_certificate: e.Func([], [te], []),
      get_transactions: e.Func([X], [z], []),
      icrc10_supported_standards: e.Func(
        [],
        [e.Vec(e.Record({ url: e.Text, name: e.Text }))],
        [],
      ),
      icrc1_balance_of: e.Func([c], [M], []),
      icrc1_decimals: e.Func([], [e.Nat8], []),
      icrc1_fee: e.Func([], [M], []),
      icrc1_metadata: e.Func([], [e.Vec(e.Tuple(e.Text, a))], []),
      icrc1_minting_account: e.Func([], [e.Opt(c)], []),
      icrc1_name: e.Func([], [e.Text], []),
      icrc1_supported_standards: e.Func([], [e.Vec(G)], []),
      icrc1_symbol: e.Func([], [e.Text], []),
      icrc1_total_supply: e.Func([], [M], []),
      icrc1_transfer: e.Func([Q], [ye], []),
      icrc21_canister_call_consent_message: e.Func([le], [ie], []),
      icrc2_allowance: e.Func([se], [m], []),
      icrc2_approve: e.Func([s], [E], []),
      icrc2_transfer_from: e.Func([T], [p], []),
      icrc3_get_archives: e.Func([o], [u], []),
      icrc3_get_blocks: e.Func([e.Vec(b)], [t], []),
      icrc3_get_tip_certificate: e.Func([], [e.Opt(g)], []),
      icrc3_supported_block_types: e.Func(
        [],
        [e.Vec(e.Record({ url: e.Text, block_type: e.Text }))],
        [],
      ),
    });
  },
  Wd = ({ IDL: e }) => {
    let t = e.Rec(),
      r = e.Rec(),
      n = e.Rec(),
      i = e.Record({
        num_blocks_to_archive: e.Opt(e.Nat64),
        max_transactions_per_response: e.Opt(e.Nat64),
        trigger_threshold: e.Opt(e.Nat64),
        more_controller_ids: e.Opt(e.Vec(e.Principal)),
        max_message_size_bytes: e.Opt(e.Nat64),
        cycles_for_archive_creation: e.Opt(e.Nat64),
        node_max_memory_size_bytes: e.Opt(e.Nat64),
        controller_id: e.Opt(e.Principal),
      }),
      a = e.Variant({
        Int: e.Int,
        Nat: e.Nat,
        Blob: e.Vec(e.Nat8),
        Text: e.Text,
      }),
      d = e.Vec(e.Nat8),
      c = e.Record({ owner: e.Principal, subaccount: e.Opt(d) }),
      w = e.Variant({ SetTo: c, Unset: e.Null }),
      x = e.Record({ icrc2: e.Bool }),
      B = e.Record({
        change_archive_options: e.Opt(i),
        token_symbol: e.Opt(e.Text),
        transfer_fee: e.Opt(e.Nat),
        metadata: e.Opt(e.Vec(e.Tuple(e.Text, a))),
        accounts_overflow_trim_quantity: e.Opt(e.Nat64),
        change_fee_collector: e.Opt(w),
        max_memo_length: e.Opt(e.Nat16),
        token_name: e.Opt(e.Text),
        feature_flags: e.Opt(x),
      }),
      N = e.Record({
        decimals: e.Opt(e.Nat8),
        token_symbol: e.Text,
        transfer_fee: e.Nat,
        metadata: e.Vec(e.Tuple(e.Text, a)),
        minting_account: c,
        initial_balances: e.Vec(e.Tuple(c, e.Nat)),
        maximum_number_of_accounts: e.Opt(e.Nat64),
        accounts_overflow_trim_quantity: e.Opt(e.Nat64),
        fee_collector_account: e.Opt(c),
        archive_options: e.Record({
          num_blocks_to_archive: e.Nat64,
          max_transactions_per_response: e.Opt(e.Nat64),
          trigger_threshold: e.Nat64,
          more_controller_ids: e.Opt(e.Vec(e.Principal)),
          max_message_size_bytes: e.Opt(e.Nat64),
          cycles_for_archive_creation: e.Opt(e.Nat64),
          node_max_memory_size_bytes: e.Opt(e.Nat64),
          controller_id: e.Principal,
        }),
        max_memo_length: e.Opt(e.Nat16),
        token_name: e.Text,
        feature_flags: e.Opt(x),
      });
    e.Variant({ Upgrade: e.Opt(B), Init: N });
    let I = e.Nat,
      S = e.Record({
        block_range_end: I,
        canister_id: e.Principal,
        block_range_start: I,
      }),
      b = e.Record({ start: I, length: e.Nat }),
      C = e.Vec(e.Tuple(e.Text, n));
    n.fill(
      e.Variant({
        Int: e.Int,
        Map: C,
        Nat: e.Nat,
        Nat64: e.Nat64,
        Blob: e.Vec(e.Nat8),
        Text: e.Text,
        Array: e.Vec(n),
      }),
    );
    let V = n,
      K = e.Record({ blocks: e.Vec(V) }),
      L = e.Func([b], [K], ["query"]),
      W = e.Record({
        certificate: e.Opt(e.Vec(e.Nat8)),
        first_index: I,
        blocks: e.Vec(V),
        chain_length: e.Nat64,
        archived_blocks: e.Vec(
          e.Record({ callback: L, start: I, length: e.Nat }),
        ),
      }),
      te = e.Record({
        certificate: e.Opt(e.Vec(e.Nat8)),
        hash_tree: e.Vec(e.Nat8),
      }),
      $ = e.Nat,
      X = e.Record({ start: $, length: e.Nat }),
      q = e.Nat64,
      ee = e.Record({
        from: c,
        memo: e.Opt(e.Vec(e.Nat8)),
        created_at_time: e.Opt(q),
        amount: e.Nat,
        spender: e.Opt(c),
      }),
      ne = e.Record({
        to: c,
        memo: e.Opt(e.Vec(e.Nat8)),
        created_at_time: e.Opt(q),
        amount: e.Nat,
      }),
      J = e.Record({
        fee: e.Opt(e.Nat),
        from: c,
        memo: e.Opt(e.Vec(e.Nat8)),
        created_at_time: e.Opt(q),
        amount: e.Nat,
        expected_allowance: e.Opt(e.Nat),
        expires_at: e.Opt(q),
        spender: c,
      }),
      he = e.Record({
        to: c,
        fee: e.Opt(e.Nat),
        from: c,
        memo: e.Opt(e.Vec(e.Nat8)),
        created_at_time: e.Opt(q),
        amount: e.Nat,
        spender: e.Opt(c),
      }),
      ue = e.Record({
        burn: e.Opt(ee),
        kind: e.Text,
        mint: e.Opt(ne),
        approve: e.Opt(J),
        timestamp: q,
        transfer: e.Opt(he),
      }),
      R = e.Record({ transactions: e.Vec(ue) }),
      P = e.Func([X], [R], ["query"]),
      z = e.Record({
        first_index: $,
        log_length: e.Nat,
        transactions: e.Vec(ue),
        archived_transactions: e.Vec(
          e.Record({ callback: P, start: $, length: e.Nat }),
        ),
      }),
      M = e.Nat,
      G = e.Record({ url: e.Text, name: e.Text }),
      Q = e.Record({
        to: c,
        fee: e.Opt(M),
        memo: e.Opt(e.Vec(e.Nat8)),
        from_subaccount: e.Opt(d),
        created_at_time: e.Opt(q),
        amount: M,
      }),
      re = e.Variant({
        GenericError: e.Record({ message: e.Text, error_code: e.Nat }),
        TemporarilyUnavailable: e.Null,
        BadBurn: e.Record({ min_burn_amount: M }),
        Duplicate: e.Record({ duplicate_of: I }),
        BadFee: e.Record({ expected_fee: M }),
        CreatedInFuture: e.Record({ ledger_time: q }),
        TooOld: e.Null,
        InsufficientFunds: e.Record({ balance: M }),
      }),
      ye = e.Variant({ Ok: I, Err: re }),
      ae = e.Record({ utc_offset_minutes: e.Opt(e.Int16), language: e.Text }),
      Y = e.Record({
        metadata: ae,
        device_spec: e.Opt(
          e.Variant({
            GenericDisplay: e.Null,
            LineDisplay: e.Record({
              characters_per_line: e.Nat16,
              lines_per_page: e.Nat16,
            }),
          }),
        ),
      }),
      le = e.Record({
        arg: e.Vec(e.Nat8),
        method: e.Text,
        user_preferences: Y,
      }),
      _ = e.Variant({
        LineDisplayMessage: e.Record({
          pages: e.Vec(e.Record({ lines: e.Vec(e.Text) })),
        }),
        GenericDisplayMessage: e.Text,
      }),
      oe = e.Record({ metadata: ae, consent_message: _ }),
      fe = e.Record({ description: e.Text }),
      we = e.Variant({
        GenericError: e.Record({ description: e.Text, error_code: e.Nat }),
        InsufficientPayment: fe,
        UnsupportedCanisterCall: fe,
        ConsentMessageUnavailable: fe,
      }),
      ie = e.Variant({ Ok: oe, Err: we }),
      se = e.Record({ account: c, spender: c }),
      m = e.Record({ allowance: e.Nat, expires_at: e.Opt(q) }),
      s = e.Record({
        fee: e.Opt(e.Nat),
        memo: e.Opt(e.Vec(e.Nat8)),
        from_subaccount: e.Opt(e.Vec(e.Nat8)),
        created_at_time: e.Opt(q),
        amount: e.Nat,
        expected_allowance: e.Opt(e.Nat),
        expires_at: e.Opt(q),
        spender: c,
      }),
      h = e.Variant({
        GenericError: e.Record({ message: e.Text, error_code: e.Nat }),
        TemporarilyUnavailable: e.Null,
        Duplicate: e.Record({ duplicate_of: I }),
        BadFee: e.Record({ expected_fee: e.Nat }),
        AllowanceChanged: e.Record({ current_allowance: e.Nat }),
        CreatedInFuture: e.Record({ ledger_time: q }),
        TooOld: e.Null,
        Expired: e.Record({ ledger_time: q }),
        InsufficientFunds: e.Record({ balance: e.Nat }),
      }),
      E = e.Variant({ Ok: I, Err: h }),
      T = e.Record({
        to: c,
        fee: e.Opt(M),
        spender_subaccount: e.Opt(d),
        from: c,
        memo: e.Opt(e.Vec(e.Nat8)),
        created_at_time: e.Opt(q),
        amount: M,
      }),
      U = e.Variant({
        GenericError: e.Record({ message: e.Text, error_code: e.Nat }),
        TemporarilyUnavailable: e.Null,
        InsufficientAllowance: e.Record({ allowance: M }),
        BadBurn: e.Record({ min_burn_amount: M }),
        Duplicate: e.Record({ duplicate_of: I }),
        BadFee: e.Record({ expected_fee: M }),
        CreatedInFuture: e.Record({ ledger_time: q }),
        TooOld: e.Null,
        InsufficientFunds: e.Record({ balance: M }),
      }),
      p = e.Variant({ Ok: I, Err: U }),
      o = e.Record({ from: e.Opt(e.Principal) }),
      u = e.Vec(
        e.Record({ end: e.Nat, canister_id: e.Principal, start: e.Nat }),
      );
    r.fill(
      e.Variant({
        Int: e.Int,
        Map: e.Vec(e.Tuple(e.Text, r)),
        Nat: e.Nat,
        Blob: e.Vec(e.Nat8),
        Text: e.Text,
        Array: e.Vec(r),
      }),
    ),
      t.fill(
        e.Record({
          log_length: e.Nat,
          blocks: e.Vec(e.Record({ id: e.Nat, block: r })),
          archived_blocks: e.Vec(
            e.Record({
              args: e.Vec(b),
              callback: e.Func([e.Vec(b)], [t], ["query"]),
            }),
          ),
        }),
      );
    let g = e.Record({ certificate: e.Vec(e.Nat8), hash_tree: e.Vec(e.Nat8) });
    return e.Service({
      archives: e.Func([], [e.Vec(S)], ["query"]),
      get_blocks: e.Func([b], [W], ["query"]),
      get_data_certificate: e.Func([], [te], ["query"]),
      get_transactions: e.Func([X], [z], ["query"]),
      icrc10_supported_standards: e.Func(
        [],
        [e.Vec(e.Record({ url: e.Text, name: e.Text }))],
        ["query"],
      ),
      icrc1_balance_of: e.Func([c], [M], ["query"]),
      icrc1_decimals: e.Func([], [e.Nat8], ["query"]),
      icrc1_fee: e.Func([], [M], ["query"]),
      icrc1_metadata: e.Func([], [e.Vec(e.Tuple(e.Text, a))], ["query"]),
      icrc1_minting_account: e.Func([], [e.Opt(c)], ["query"]),
      icrc1_name: e.Func([], [e.Text], ["query"]),
      icrc1_supported_standards: e.Func([], [e.Vec(G)], ["query"]),
      icrc1_symbol: e.Func([], [e.Text], ["query"]),
      icrc1_total_supply: e.Func([], [M], ["query"]),
      icrc1_transfer: e.Func([Q], [ye], []),
      icrc21_canister_call_consent_message: e.Func([le], [ie], []),
      icrc2_allowance: e.Func([se], [m], ["query"]),
      icrc2_approve: e.Func([s], [E], []),
      icrc2_transfer_from: e.Func([T], [p], []),
      icrc3_get_archives: e.Func([o], [u], ["query"]),
      icrc3_get_blocks: e.Func([e.Vec(b)], [t], ["query"]),
      icrc3_get_tip_certificate: e.Func([], [e.Opt(g)], ["query"]),
      icrc3_supported_block_types: e.Func(
        [],
        [e.Vec(e.Record({ url: e.Text, block_type: e.Text }))],
        ["query"],
      ),
    });
  },
  Yd = ({ from_subaccount: e, fee: t, created_at_time: r, memo: n, ...i }) => ({
    ...i,
    fee: Xe(t),
    memo: Xe(n),
    from_subaccount: Xe(e),
    created_at_time: Xe(r),
  }),
  Zd = ({
    spender_subaccount: e,
    fee: t,
    created_at_time: r,
    memo: n,
    ...i
  }) => ({
    ...i,
    fee: Xe(t),
    memo: Xe(n),
    spender_subaccount: Xe(e),
    created_at_time: Xe(r),
  }),
  Xd = ({
    fee: e,
    created_at_time: t,
    memo: r,
    from_subaccount: n,
    expected_allowance: i,
    expires_at: a,
    ...d
  }) => ({
    ...d,
    fee: Xe(e),
    memo: Xe(r),
    from_subaccount: Xe(n),
    created_at_time: Xe(t),
    expected_allowance: Xe(i),
    expires_at: Xe(a),
  }),
  Jd = ({
    userPreferences: {
      metadata: { utcOffsetMinutes: e, language: t },
      deriveSpec: r,
    },
    ...n
  }) => ({
    ...n,
    user_preferences: {
      metadata: { language: t, utc_offset_minutes: Xe(e) },
      device_spec: Zc(r)
        ? Xe()
        : Xe(
            "GenericDisplay" in r
              ? { GenericDisplay: null }
              : {
                  LineDisplay: {
                    characters_per_line: r.LineDisplay.charactersPerLine,
                    lines_per_page: r.LineDisplay.linesPerPage,
                  },
                },
          ),
    },
  }),
  ns = class extends Error {
    constructor({ msg: e, errorType: t }) {
      super(e), (this.errorType = t);
    }
  },
  Qd = class extends Error {
    constructor(e, t) {
      super(), (this.message = e), (this.error_code = t);
    }
  },
  Fi = class extends Error {},
  eh = class extends Fi {},
  th = class extends Fi {},
  rh = class extends Fi {},
  nh = (e) =>
    "GenericError" in e
      ? new Qd(e.GenericError.description, e.GenericError.error_code)
      : "InsufficientPayment" in e
        ? new eh(e.InsufficientPayment.description)
        : "UnsupportedCanisterCall" in e
          ? new th(e.UnsupportedCanisterCall.description)
          : "ConsentMessageUnavailable" in e
            ? new rh(e.ConsentMessageUnavailable.description)
            : new Fi(`Unknown error type ${JSON.stringify(e)}`),
  Ch = class Xc extends Hd {
    constructor() {
      super(...arguments),
        (this.metadata = (t) => this.caller(t).icrc1_metadata()),
        (this.transactionFee = (t) => this.caller(t).icrc1_fee()),
        (this.balance = (t) =>
          this.caller({ certified: t.certified }).icrc1_balance_of({
            owner: t.owner,
            subaccount: Xe(t.subaccount),
          })),
        (this.transfer = async (t) => {
          let r = await this.caller({ certified: !0 }).icrc1_transfer(Yd(t));
          if ("Err" in r)
            throw new ns({ errorType: r.Err, msg: "Failed to transfer" });
          return r.Ok;
        }),
        (this.totalTokensSupply = (t) => this.caller(t).icrc1_total_supply()),
        (this.transferFrom = async (t) => {
          let r = await this.caller({ certified: !0 }).icrc2_transfer_from(
            Zd(t),
          );
          if ("Err" in r)
            throw new ns({ errorType: r.Err, msg: "Failed to transfer from" });
          return r.Ok;
        }),
        (this.approve = async (t) => {
          let r = await this.caller({ certified: !0 }).icrc2_approve(Xd(t));
          if ("Err" in r)
            throw new ns({
              errorType: r.Err,
              msg: "Failed to entitle the spender to transfer the amount",
            });
          return r.Ok;
        }),
        (this.allowance = async (t) => {
          let { certified: r, ...n } = t;
          return this.caller({ certified: r }).icrc2_allowance({ ...n });
        }),
        (this.consentMessage = async (t) => {
          let { icrc21_canister_call_consent_message: r } = this.caller({
              certified: !0,
            }),
            n = await r(Jd(t));
          if ("Err" in n) throw nh(n.Err);
          return n.Ok;
        });
    }
    static create(t) {
      let {
        service: r,
        certifiedService: n,
        canisterId: i,
      } = Kd({ options: t, idlFactory: Wd, certifiedIdlFactory: zd });
      return new Xc(i, r, n);
    }
  },
  ih = ((e) => (
    (e.SYMBOL = "icrc1:symbol"),
    (e.NAME = "icrc1:name"),
    (e.DECIMALS = "icrc1:decimals"),
    (e.FEE = "icrc1:fee"),
    (e.LOGO = "icrc1:logo"),
    e
  ))(ih || {}),
  sh = {};
const ah = Tu(of);
var ct = {};
Object.defineProperty(ct, "__esModule", { value: !0 });
ct.bufFromBufLike =
  ct.uint8ToBuf =
  ct.PipeArrayBuffer =
  ct.fromHexString =
  ct.toHexString =
  ct.concat =
    void 0;
function oh(...e) {
  const t = new Uint8Array(e.reduce((n, i) => n + i.byteLength, 0));
  let r = 0;
  for (const n of e) t.set(new Uint8Array(n), r), (r += n.byteLength);
  return t;
}
ct.concat = oh;
function ch(e) {
  return new Uint8Array(e).reduce(
    (t, r) => t + r.toString(16).padStart(2, "0"),
    "",
  );
}
ct.toHexString = ch;
function uh(e) {
  var t;
  return new Uint8Array(
    ((t = e.match(/.{1,2}/g)) !== null && t !== void 0 ? t : []).map((r) =>
      parseInt(r, 16),
    ),
  );
}
ct.fromHexString = uh;
class fh {
  constructor(t, r = t?.byteLength || 0) {
    (this._buffer = _i(t || new ArrayBuffer(0))),
      (this._view = new Uint8Array(this._buffer, 0, r));
  }
  get buffer() {
    return _i(this._view.slice());
  }
  get byteLength() {
    return this._view.byteLength;
  }
  read(t) {
    const r = this._view.subarray(0, t);
    return (this._view = this._view.subarray(t)), r.slice().buffer;
  }
  readUint8() {
    const t = this._view[0];
    return (this._view = this._view.subarray(1)), t;
  }
  write(t) {
    const r = new Uint8Array(t),
      n = this._view.byteLength;
    this._view.byteOffset + this._view.byteLength + r.byteLength >=
    this._buffer.byteLength
      ? this.alloc(r.byteLength)
      : (this._view = new Uint8Array(
          this._buffer,
          this._view.byteOffset,
          this._view.byteLength + r.byteLength,
        )),
      this._view.set(r, n);
  }
  get end() {
    return this._view.byteLength === 0;
  }
  alloc(t) {
    const r = new ArrayBuffer(((this._buffer.byteLength + t) * 1.2) | 0),
      n = new Uint8Array(r, 0, this._view.byteLength + t);
    n.set(this._view), (this._buffer = r), (this._view = n);
  }
}
ct.PipeArrayBuffer = fh;
function ii(e) {
  return new DataView(e.buffer, e.byteOffset, e.byteLength).buffer;
}
ct.uint8ToBuf = ii;
function _i(e) {
  return e instanceof Uint8Array
    ? ii(e)
    : e instanceof ArrayBuffer
      ? e
      : Array.isArray(e)
        ? ii(new Uint8Array(e))
        : "buffer" in e
          ? _i(e.buffer)
          : ii(new Uint8Array(e));
}
ct.bufFromBufLike = _i;
var Pi = {};
Object.defineProperty(Pi, "__esModule", { value: !0 });
Pi.idlLabelToId = void 0;
function lh(e) {
  const r = new TextEncoder().encode(e);
  let n = 0;
  for (const i of r) n = (n * 223 + i) % 2 ** 32;
  return n;
}
function dh(e) {
  if (/^_\d+_$/.test(e) || /^_0x[0-9a-fA-F]+_$/.test(e)) {
    const t = +e.slice(1, -1);
    if (Number.isSafeInteger(t) && t >= 0 && t < 2 ** 32) return t;
  }
  return lh(e);
}
Pi.idlLabelToId = dh;
var $e = {};
Object.defineProperty($e, "__esModule", { value: !0 });
$e.readIntLE =
  $e.readUIntLE =
  $e.writeIntLE =
  $e.writeUIntLE =
  $e.slebDecode =
  $e.slebEncode =
  $e.lebDecode =
  $e.lebEncode =
  $e.safeReadUint8 =
  $e.safeRead =
    void 0;
const Ks = ct;
function Jc() {
  throw new Error("unexpected end of buffer");
}
function Qc(e, t) {
  return e.byteLength < t && Jc(), e.read(t);
}
$e.safeRead = Qc;
function xi(e) {
  const t = e.readUint8();
  return t === void 0 && Jc(), t;
}
$e.safeReadUint8 = xi;
function hh(e) {
  if ((typeof e == "number" && (e = BigInt(e)), e < BigInt(0)))
    throw new Error("Cannot leb encode negative values.");
  const t = (e === BigInt(0) ? 0 : Math.ceil(Math.log2(Number(e)))) + 1,
    r = new Ks.PipeArrayBuffer(new ArrayBuffer(t), 0);
  for (;;) {
    const n = Number(e & BigInt(127));
    if (((e /= BigInt(128)), e === BigInt(0))) {
      r.write(new Uint8Array([n]));
      break;
    } else r.write(new Uint8Array([n | 128]));
  }
  return r.buffer;
}
$e.lebEncode = hh;
function eu(e) {
  let t = BigInt(1),
    r = BigInt(0),
    n;
  do (n = xi(e)), (r += BigInt(n & 127).valueOf() * t), (t *= BigInt(128));
  while (n >= 128);
  return r;
}
$e.lebDecode = eu;
function ph(e) {
  typeof e == "number" && (e = BigInt(e));
  const t = e < BigInt(0);
  t && (e = -e - BigInt(1));
  const r = (e === BigInt(0) ? 0 : Math.ceil(Math.log2(Number(e)))) + 1,
    n = new Ks.PipeArrayBuffer(new ArrayBuffer(r), 0);
  for (;;) {
    const a = i(e);
    if (
      ((e /= BigInt(128)),
      (t && e === BigInt(0) && a & 64) || (!t && e === BigInt(0) && !(a & 64)))
    ) {
      n.write(new Uint8Array([a]));
      break;
    } else n.write(new Uint8Array([a | 128]));
  }
  function i(a) {
    const d = a % BigInt(128);
    return Number(t ? BigInt(128) - d - BigInt(1) : d);
  }
  return n.buffer;
}
$e.slebEncode = ph;
function yh(e) {
  const t = new Uint8Array(e.buffer);
  let r = 0;
  for (; r < t.byteLength; r++)
    if (t[r] < 128) {
      if (!(t[r] & 64)) return eu(e);
      break;
    }
  const n = new Uint8Array(Qc(e, r + 1));
  let i = BigInt(0);
  for (let a = n.byteLength - 1; a >= 0; a--)
    i = i * BigInt(128) + BigInt(128 - (n[a] & 127) - 1);
  return -i - BigInt(1);
}
$e.slebDecode = yh;
function gh(e, t) {
  if (BigInt(e) < BigInt(0)) throw new Error("Cannot write negative values.");
  return tu(e, t);
}
$e.writeUIntLE = gh;
function tu(e, t) {
  e = BigInt(e);
  const r = new Ks.PipeArrayBuffer(new ArrayBuffer(Math.min(1, t)), 0);
  let n = 0,
    i = BigInt(256),
    a = BigInt(0),
    d = Number(e % i);
  for (r.write(new Uint8Array([d])); ++n < t; )
    e < 0 && a === BigInt(0) && d !== 0 && (a = BigInt(1)),
      (d = Number((e / i - a) % BigInt(256))),
      r.write(new Uint8Array([d])),
      (i *= BigInt(256));
  return r.buffer;
}
$e.writeIntLE = tu;
function ru(e, t) {
  let r = BigInt(xi(e)),
    n = BigInt(1),
    i = 0;
  for (; ++i < t; ) {
    n *= BigInt(256);
    const a = BigInt(xi(e));
    r = r + n * a;
  }
  return r;
}
$e.readUIntLE = ru;
function wh(e, t) {
  let r = ru(e, t);
  const n = BigInt(2) ** (BigInt(8) * BigInt(t - 1) + BigInt(7));
  return r >= n && (r -= n * BigInt(2)), r;
}
$e.readIntLE = wh;
var Lr = {};
Object.defineProperty(Lr, "__esModule", { value: !0 });
Lr.iexp2 = Lr.ilog2 = void 0;
function mh(e) {
  const t = BigInt(e);
  if (e <= 0) throw new RangeError("Input must be positive");
  return t.toString(2).length - 1;
}
Lr.ilog2 = mh;
function bh(e) {
  const t = BigInt(e);
  if (e < 0) throw new RangeError("Input must be non-negative");
  return BigInt(1) << t;
}
Lr.iexp2 = bh;
(function (e) {
  Object.defineProperty(e, "__esModule", { value: !0 }),
    (e.Variant =
      e.Record =
      e.Opt =
      e.Vec =
      e.Tuple =
      e.Principal =
      e.Nat64 =
      e.Nat32 =
      e.Nat16 =
      e.Nat8 =
      e.Int64 =
      e.Int32 =
      e.Int16 =
      e.Int8 =
      e.Float64 =
      e.Float32 =
      e.Nat =
      e.Int =
      e.Text =
      e.Null =
      e.Bool =
      e.Unknown =
      e.Reserved =
      e.Empty =
      e.decode =
      e.encode =
      e.ServiceClass =
      e.FuncClass =
      e.PrincipalClass =
      e.RecClass =
      e.VariantClass =
      e.TupleClass =
      e.RecordClass =
      e.OptClass =
      e.VecClass =
      e.FixedNatClass =
      e.FixedIntClass =
      e.FloatClass =
      e.NatClass =
      e.IntClass =
      e.TextClass =
      e.ReservedClass =
      e.NullClass =
      e.BoolClass =
      e.UnknownClass =
      e.EmptyClass =
      e.ConstructType =
      e.PrimitiveType =
      e.Type =
      e.Visitor =
        void 0),
    (e.Service = e.Func = e.Rec = void 0);
  const t = ah,
    r = ct,
    n = Pi,
    i = $e,
    a = Lr,
    d = "DIDL",
    c = 400;
  function w(m, s, h) {
    return m.map((E, T) => h(E, s[T]));
  }
  class x {
    constructor() {
      (this._typs = []), (this._idx = new Map());
    }
    has(s) {
      return this._idx.has(s.name);
    }
    add(s, h) {
      const E = this._typs.length;
      this._idx.set(s.name, E), this._typs.push(h);
    }
    merge(s, h) {
      const E = this._idx.get(s.name),
        T = this._idx.get(h);
      if (E === void 0) throw new Error("Missing type index for " + s);
      if (T === void 0) throw new Error("Missing type index for " + h);
      (this._typs[E] = this._typs[T]),
        this._typs.splice(T, 1),
        this._idx.delete(h);
    }
    encode() {
      const s = (0, i.lebEncode)(this._typs.length),
        h = (0, r.concat)(...this._typs);
      return (0, r.concat)(s, h);
    }
    indexOf(s) {
      if (!this._idx.has(s)) throw new Error("Missing type index for " + s);
      return (0, i.slebEncode)(this._idx.get(s) || 0);
    }
  }
  class B {
    visitType(s, h) {
      throw new Error("Not implemented");
    }
    visitPrimitive(s, h) {
      return this.visitType(s, h);
    }
    visitEmpty(s, h) {
      return this.visitPrimitive(s, h);
    }
    visitBool(s, h) {
      return this.visitPrimitive(s, h);
    }
    visitNull(s, h) {
      return this.visitPrimitive(s, h);
    }
    visitReserved(s, h) {
      return this.visitPrimitive(s, h);
    }
    visitText(s, h) {
      return this.visitPrimitive(s, h);
    }
    visitNumber(s, h) {
      return this.visitPrimitive(s, h);
    }
    visitInt(s, h) {
      return this.visitNumber(s, h);
    }
    visitNat(s, h) {
      return this.visitNumber(s, h);
    }
    visitFloat(s, h) {
      return this.visitPrimitive(s, h);
    }
    visitFixedInt(s, h) {
      return this.visitNumber(s, h);
    }
    visitFixedNat(s, h) {
      return this.visitNumber(s, h);
    }
    visitPrincipal(s, h) {
      return this.visitPrimitive(s, h);
    }
    visitConstruct(s, h) {
      return this.visitType(s, h);
    }
    visitVec(s, h, E) {
      return this.visitConstruct(s, E);
    }
    visitOpt(s, h, E) {
      return this.visitConstruct(s, E);
    }
    visitRecord(s, h, E) {
      return this.visitConstruct(s, E);
    }
    visitTuple(s, h, E) {
      const T = h.map((U, p) => [`_${p}_`, U]);
      return this.visitRecord(s, T, E);
    }
    visitVariant(s, h, E) {
      return this.visitConstruct(s, E);
    }
    visitRec(s, h, E) {
      return this.visitConstruct(h, E);
    }
    visitFunc(s, h) {
      return this.visitConstruct(s, h);
    }
    visitService(s, h) {
      return this.visitConstruct(s, h);
    }
  }
  e.Visitor = B;
  class N {
    display() {
      return this.name;
    }
    valueToString(s) {
      return re(s);
    }
    buildTypeTable(s) {
      s.has(this) || this._buildTypeTableImpl(s);
    }
  }
  e.Type = N;
  class I extends N {
    checkType(s) {
      if (this.name !== s.name)
        throw new Error(
          `type mismatch: type on the wire ${s.name}, expect type ${this.name}`,
        );
      return s;
    }
    _buildTypeTableImpl(s) {}
  }
  e.PrimitiveType = I;
  class S extends N {
    checkType(s) {
      if (s instanceof P) {
        const h = s.getType();
        if (typeof h > "u")
          throw new Error("type mismatch with uninitialized type");
        return h;
      }
      throw new Error(
        `type mismatch: type on the wire ${s.name}, expect type ${this.name}`,
      );
    }
    encodeType(s) {
      return s.indexOf(this.name);
    }
  }
  e.ConstructType = S;
  class b extends I {
    accept(s, h) {
      return s.visitEmpty(this, h);
    }
    covariant(s) {
      throw new Error(`Invalid ${this.display()} argument: ${re(s)}`);
    }
    encodeValue() {
      throw new Error("Empty cannot appear as a function argument");
    }
    valueToString() {
      throw new Error("Empty cannot appear as a value");
    }
    encodeType() {
      return (0, i.slebEncode)(-17);
    }
    decodeValue() {
      throw new Error("Empty cannot appear as an output");
    }
    get name() {
      return "empty";
    }
  }
  e.EmptyClass = b;
  class C extends N {
    checkType(s) {
      throw new Error("Method not implemented for unknown.");
    }
    accept(s, h) {
      throw s.visitType(this, h);
    }
    covariant(s) {
      throw new Error(`Invalid ${this.display()} argument: ${re(s)}`);
    }
    encodeValue() {
      throw new Error("Unknown cannot appear as a function argument");
    }
    valueToString() {
      throw new Error("Unknown cannot appear as a value");
    }
    encodeType() {
      throw new Error("Unknown cannot be serialized");
    }
    decodeValue(s, h) {
      let E = h.decodeValue(s, h);
      Object(E) !== E && (E = Object(E));
      let T;
      return (
        h instanceof P ? (T = () => h.getType()) : (T = () => h),
        Object.defineProperty(E, "type", {
          value: T,
          writable: !0,
          enumerable: !1,
          configurable: !0,
        }),
        E
      );
    }
    _buildTypeTableImpl() {
      throw new Error("Unknown cannot be serialized");
    }
    get name() {
      return "Unknown";
    }
  }
  e.UnknownClass = C;
  class V extends I {
    accept(s, h) {
      return s.visitBool(this, h);
    }
    covariant(s) {
      if (typeof s == "boolean") return !0;
      throw new Error(`Invalid ${this.display()} argument: ${re(s)}`);
    }
    encodeValue(s) {
      return new Uint8Array([s ? 1 : 0]);
    }
    encodeType() {
      return (0, i.slebEncode)(-2);
    }
    decodeValue(s, h) {
      switch ((this.checkType(h), (0, i.safeReadUint8)(s))) {
        case 0:
          return !1;
        case 1:
          return !0;
        default:
          throw new Error("Boolean value out of range");
      }
    }
    get name() {
      return "bool";
    }
  }
  e.BoolClass = V;
  class K extends I {
    accept(s, h) {
      return s.visitNull(this, h);
    }
    covariant(s) {
      if (s === null) return !0;
      throw new Error(`Invalid ${this.display()} argument: ${re(s)}`);
    }
    encodeValue() {
      return new ArrayBuffer(0);
    }
    encodeType() {
      return (0, i.slebEncode)(-1);
    }
    decodeValue(s, h) {
      return this.checkType(h), null;
    }
    get name() {
      return "null";
    }
  }
  e.NullClass = K;
  class L extends I {
    accept(s, h) {
      return s.visitReserved(this, h);
    }
    covariant(s) {
      return !0;
    }
    encodeValue() {
      return new ArrayBuffer(0);
    }
    encodeType() {
      return (0, i.slebEncode)(-16);
    }
    decodeValue(s, h) {
      return h.name !== this.name && h.decodeValue(s, h), null;
    }
    get name() {
      return "reserved";
    }
  }
  e.ReservedClass = L;
  class W extends I {
    accept(s, h) {
      return s.visitText(this, h);
    }
    covariant(s) {
      if (typeof s == "string") return !0;
      throw new Error(`Invalid ${this.display()} argument: ${re(s)}`);
    }
    encodeValue(s) {
      const h = new TextEncoder().encode(s),
        E = (0, i.lebEncode)(h.byteLength);
      return (0, r.concat)(E, h);
    }
    encodeType() {
      return (0, i.slebEncode)(-15);
    }
    decodeValue(s, h) {
      this.checkType(h);
      const E = (0, i.lebDecode)(s),
        T = (0, i.safeRead)(s, Number(E));
      return new TextDecoder("utf8", { fatal: !0 }).decode(T);
    }
    get name() {
      return "text";
    }
    valueToString(s) {
      return '"' + s + '"';
    }
  }
  e.TextClass = W;
  class te extends I {
    accept(s, h) {
      return s.visitInt(this, h);
    }
    covariant(s) {
      if (typeof s == "bigint" || Number.isInteger(s)) return !0;
      throw new Error(`Invalid ${this.display()} argument: ${re(s)}`);
    }
    encodeValue(s) {
      return (0, i.slebEncode)(s);
    }
    encodeType() {
      return (0, i.slebEncode)(-4);
    }
    decodeValue(s, h) {
      return this.checkType(h), (0, i.slebDecode)(s);
    }
    get name() {
      return "int";
    }
    valueToString(s) {
      return s.toString();
    }
  }
  e.IntClass = te;
  class $ extends I {
    accept(s, h) {
      return s.visitNat(this, h);
    }
    covariant(s) {
      if (
        (typeof s == "bigint" && s >= BigInt(0)) ||
        (Number.isInteger(s) && s >= 0)
      )
        return !0;
      throw new Error(`Invalid ${this.display()} argument: ${re(s)}`);
    }
    encodeValue(s) {
      return (0, i.lebEncode)(s);
    }
    encodeType() {
      return (0, i.slebEncode)(-3);
    }
    decodeValue(s, h) {
      return this.checkType(h), (0, i.lebDecode)(s);
    }
    get name() {
      return "nat";
    }
    valueToString(s) {
      return s.toString();
    }
  }
  e.NatClass = $;
  class X extends I {
    constructor(s) {
      if ((super(), (this._bits = s), s !== 32 && s !== 64))
        throw new Error("not a valid float type");
    }
    accept(s, h) {
      return s.visitFloat(this, h);
    }
    covariant(s) {
      if (typeof s == "number" || s instanceof Number) return !0;
      throw new Error(`Invalid ${this.display()} argument: ${re(s)}`);
    }
    encodeValue(s) {
      const h = new ArrayBuffer(this._bits / 8),
        E = new DataView(h);
      return (
        this._bits === 32 ? E.setFloat32(0, s, !0) : E.setFloat64(0, s, !0), h
      );
    }
    encodeType() {
      const s = this._bits === 32 ? -13 : -14;
      return (0, i.slebEncode)(s);
    }
    decodeValue(s, h) {
      this.checkType(h);
      const E = (0, i.safeRead)(s, this._bits / 8),
        T = new DataView(E);
      return this._bits === 32 ? T.getFloat32(0, !0) : T.getFloat64(0, !0);
    }
    get name() {
      return "float" + this._bits;
    }
    valueToString(s) {
      return s.toString();
    }
  }
  e.FloatClass = X;
  class q extends I {
    constructor(s) {
      super(), (this._bits = s);
    }
    accept(s, h) {
      return s.visitFixedInt(this, h);
    }
    covariant(s) {
      const h = (0, a.iexp2)(this._bits - 1) * BigInt(-1),
        E = (0, a.iexp2)(this._bits - 1) - BigInt(1);
      let T = !1;
      if (typeof s == "bigint") T = s >= h && s <= E;
      else if (Number.isInteger(s)) {
        const U = BigInt(s);
        T = U >= h && U <= E;
      } else T = !1;
      if (T) return !0;
      throw new Error(`Invalid ${this.display()} argument: ${re(s)}`);
    }
    encodeValue(s) {
      return (0, i.writeIntLE)(s, this._bits / 8);
    }
    encodeType() {
      const s = Math.log2(this._bits) - 3;
      return (0, i.slebEncode)(-9 - s);
    }
    decodeValue(s, h) {
      this.checkType(h);
      const E = (0, i.readIntLE)(s, this._bits / 8);
      return this._bits <= 32 ? Number(E) : E;
    }
    get name() {
      return `int${this._bits}`;
    }
    valueToString(s) {
      return s.toString();
    }
  }
  e.FixedIntClass = q;
  class ee extends I {
    constructor(s) {
      super(), (this._bits = s);
    }
    accept(s, h) {
      return s.visitFixedNat(this, h);
    }
    covariant(s) {
      const h = (0, a.iexp2)(this._bits);
      let E = !1;
      if (
        (typeof s == "bigint" && s >= BigInt(0)
          ? (E = s < h)
          : Number.isInteger(s) && s >= 0
            ? (E = BigInt(s) < h)
            : (E = !1),
        E)
      )
        return !0;
      throw new Error(`Invalid ${this.display()} argument: ${re(s)}`);
    }
    encodeValue(s) {
      return (0, i.writeUIntLE)(s, this._bits / 8);
    }
    encodeType() {
      const s = Math.log2(this._bits) - 3;
      return (0, i.slebEncode)(-5 - s);
    }
    decodeValue(s, h) {
      this.checkType(h);
      const E = (0, i.readUIntLE)(s, this._bits / 8);
      return this._bits <= 32 ? Number(E) : E;
    }
    get name() {
      return `nat${this._bits}`;
    }
    valueToString(s) {
      return s.toString();
    }
  }
  e.FixedNatClass = ee;
  class ne extends S {
    constructor(s) {
      super(),
        (this._type = s),
        (this._blobOptimization = !1),
        s instanceof ee && s._bits === 8 && (this._blobOptimization = !0);
    }
    accept(s, h) {
      return s.visitVec(this, this._type, h);
    }
    covariant(s) {
      const h =
        this._type instanceof ee
          ? this._type._bits
          : this._type instanceof q
            ? this._type._bits
            : 0;
      if (
        (ArrayBuffer.isView(s) && h == s.BYTES_PER_ELEMENT * 8) ||
        (Array.isArray(s) &&
          s.every((E, T) => {
            try {
              return this._type.covariant(E);
            } catch (U) {
              throw new Error(`Invalid ${this.display()} argument: 

index ${T} -> ${U.message}`);
            }
          }))
      )
        return !0;
      throw new Error(`Invalid ${this.display()} argument: ${re(s)}`);
    }
    encodeValue(s) {
      const h = (0, i.lebEncode)(s.length);
      if (this._blobOptimization) return (0, r.concat)(h, new Uint8Array(s));
      if (ArrayBuffer.isView(s))
        return (0, r.concat)(h, new Uint8Array(s.buffer));
      const E = new r.PipeArrayBuffer(
        new ArrayBuffer(h.byteLength + s.length),
        0,
      );
      E.write(h);
      for (const T of s) {
        const U = this._type.encodeValue(T);
        E.write(new Uint8Array(U));
      }
      return E.buffer;
    }
    _buildTypeTableImpl(s) {
      this._type.buildTypeTable(s);
      const h = (0, i.slebEncode)(-19),
        E = this._type.encodeType(s);
      s.add(this, (0, r.concat)(h, E));
    }
    decodeValue(s, h) {
      const E = this.checkType(h);
      if (!(E instanceof ne)) throw new Error("Not a vector type");
      const T = Number((0, i.lebDecode)(s));
      if (this._type instanceof ee) {
        if (this._type._bits == 8) return new Uint8Array(s.read(T));
        if (this._type._bits == 16) return new Uint16Array(s.read(T * 2));
        if (this._type._bits == 32) return new Uint32Array(s.read(T * 4));
        if (this._type._bits == 64) return new BigUint64Array(s.read(T * 8));
      }
      if (this._type instanceof q) {
        if (this._type._bits == 8) return new Int8Array(s.read(T));
        if (this._type._bits == 16) return new Int16Array(s.read(T * 2));
        if (this._type._bits == 32) return new Int32Array(s.read(T * 4));
        if (this._type._bits == 64) return new BigInt64Array(s.read(T * 8));
      }
      const U = [];
      for (let p = 0; p < T; p++) U.push(this._type.decodeValue(s, E._type));
      return U;
    }
    get name() {
      return `vec ${this._type.name}`;
    }
    display() {
      return `vec ${this._type.display()}`;
    }
    valueToString(s) {
      return (
        "vec {" + s.map((E) => this._type.valueToString(E)).join("; ") + "}"
      );
    }
  }
  e.VecClass = ne;
  class J extends S {
    constructor(s) {
      super(), (this._type = s);
    }
    accept(s, h) {
      return s.visitOpt(this, this._type, h);
    }
    covariant(s) {
      try {
        if (
          Array.isArray(s) &&
          (s.length === 0 || (s.length === 1 && this._type.covariant(s[0])))
        )
          return !0;
      } catch (h) {
        throw new Error(`Invalid ${this.display()} argument: ${re(s)} 

-> ${h.message}`);
      }
      throw new Error(`Invalid ${this.display()} argument: ${re(s)}`);
    }
    encodeValue(s) {
      return s.length === 0
        ? new Uint8Array([0])
        : (0, r.concat)(new Uint8Array([1]), this._type.encodeValue(s[0]));
    }
    _buildTypeTableImpl(s) {
      this._type.buildTypeTable(s);
      const h = (0, i.slebEncode)(-18),
        E = this._type.encodeType(s);
      s.add(this, (0, r.concat)(h, E));
    }
    decodeValue(s, h) {
      const E = this.checkType(h);
      if (!(E instanceof J)) throw new Error("Not an option type");
      switch ((0, i.safeReadUint8)(s)) {
        case 0:
          return [];
        case 1:
          return [this._type.decodeValue(s, E._type)];
        default:
          throw new Error("Not an option value");
      }
    }
    get name() {
      return `opt ${this._type.name}`;
    }
    display() {
      return `opt ${this._type.display()}`;
    }
    valueToString(s) {
      return s.length === 0 ? "null" : `opt ${this._type.valueToString(s[0])}`;
    }
  }
  e.OptClass = J;
  class he extends S {
    constructor(s = {}) {
      super(),
        (this._fields = Object.entries(s).sort(
          (h, E) => (0, n.idlLabelToId)(h[0]) - (0, n.idlLabelToId)(E[0]),
        ));
    }
    accept(s, h) {
      return s.visitRecord(this, this._fields, h);
    }
    tryAsTuple() {
      const s = [];
      for (let h = 0; h < this._fields.length; h++) {
        const [E, T] = this._fields[h];
        if (E !== `_${h}_`) return null;
        s.push(T);
      }
      return s;
    }
    covariant(s) {
      if (
        typeof s == "object" &&
        this._fields.every(([h, E]) => {
          if (!s.hasOwnProperty(h))
            throw new Error(`Record is missing key "${h}".`);
          try {
            return E.covariant(s[h]);
          } catch (T) {
            throw new Error(`Invalid ${this.display()} argument: 

field ${h} -> ${T.message}`);
          }
        })
      )
        return !0;
      throw new Error(`Invalid ${this.display()} argument: ${re(s)}`);
    }
    encodeValue(s) {
      const h = this._fields.map(([T]) => s[T]),
        E = w(this._fields, h, ([, T], U) => T.encodeValue(U));
      return (0, r.concat)(...E);
    }
    _buildTypeTableImpl(s) {
      this._fields.forEach(([U, p]) => p.buildTypeTable(s));
      const h = (0, i.slebEncode)(-20),
        E = (0, i.lebEncode)(this._fields.length),
        T = this._fields.map(([U, p]) =>
          (0, r.concat)(
            (0, i.lebEncode)((0, n.idlLabelToId)(U)),
            p.encodeType(s),
          ),
        );
      s.add(this, (0, r.concat)(h, E, (0, r.concat)(...T)));
    }
    decodeValue(s, h) {
      const E = this.checkType(h);
      if (!(E instanceof he)) throw new Error("Not a record type");
      const T = {};
      let U = 0,
        p = 0;
      for (; p < E._fields.length; ) {
        const [o, u] = E._fields[p];
        if (U >= this._fields.length) {
          u.decodeValue(s, u), p++;
          continue;
        }
        const [g, v] = this._fields[U],
          O = (0, n.idlLabelToId)(this._fields[U][0]),
          j = (0, n.idlLabelToId)(o);
        if (O === j) (T[g] = v.decodeValue(s, u)), U++, p++;
        else if (j > O)
          if (v instanceof J || v instanceof L) (T[g] = []), U++;
          else throw new Error("Cannot find required field " + g);
        else u.decodeValue(s, u), p++;
      }
      for (const [o, u] of this._fields.slice(U))
        if (u instanceof J || u instanceof L) T[o] = [];
        else throw new Error("Cannot find required field " + o);
      return T;
    }
    get name() {
      return `record {${this._fields.map(([h, E]) => h + ":" + E.name).join("; ")}}`;
    }
    display() {
      return `record {${this._fields.map(([h, E]) => h + ":" + E.display()).join("; ")}}`;
    }
    valueToString(s) {
      const h = this._fields.map(([T]) => s[T]);
      return `record {${w(this._fields, h, ([T, U], p) => T + "=" + U.valueToString(p)).join("; ")}}`;
    }
  }
  e.RecordClass = he;
  class ue extends he {
    constructor(s) {
      const h = {};
      s.forEach((E, T) => (h["_" + T + "_"] = E)),
        super(h),
        (this._components = s);
    }
    accept(s, h) {
      return s.visitTuple(this, this._components, h);
    }
    covariant(s) {
      if (
        Array.isArray(s) &&
        s.length >= this._fields.length &&
        this._components.every((h, E) => {
          try {
            return h.covariant(s[E]);
          } catch (T) {
            throw new Error(`Invalid ${this.display()} argument: 

index ${E} -> ${T.message}`);
          }
        })
      )
        return !0;
      throw new Error(`Invalid ${this.display()} argument: ${re(s)}`);
    }
    encodeValue(s) {
      const h = w(this._components, s, (E, T) => E.encodeValue(T));
      return (0, r.concat)(...h);
    }
    decodeValue(s, h) {
      const E = this.checkType(h);
      if (!(E instanceof ue)) throw new Error("not a tuple type");
      if (E._components.length < this._components.length)
        throw new Error("tuple mismatch");
      const T = [];
      for (const [U, p] of E._components.entries())
        U >= this._components.length
          ? p.decodeValue(s, p)
          : T.push(this._components[U].decodeValue(s, p));
      return T;
    }
    display() {
      return `record {${this._components.map((h) => h.display()).join("; ")}}`;
    }
    valueToString(s) {
      return `record {${w(this._components, s, (E, T) => E.valueToString(T)).join("; ")}}`;
    }
  }
  e.TupleClass = ue;
  class R extends S {
    constructor(s = {}) {
      super(),
        (this._fields = Object.entries(s).sort(
          (h, E) => (0, n.idlLabelToId)(h[0]) - (0, n.idlLabelToId)(E[0]),
        ));
    }
    accept(s, h) {
      return s.visitVariant(this, this._fields, h);
    }
    covariant(s) {
      if (
        typeof s == "object" &&
        Object.entries(s).length === 1 &&
        this._fields.every(([h, E]) => {
          try {
            return !s.hasOwnProperty(h) || E.covariant(s[h]);
          } catch (T) {
            throw new Error(`Invalid ${this.display()} argument: 

variant ${h} -> ${T.message}`);
          }
        })
      )
        return !0;
      throw new Error(`Invalid ${this.display()} argument: ${re(s)}`);
    }
    encodeValue(s) {
      for (let h = 0; h < this._fields.length; h++) {
        const [E, T] = this._fields[h];
        if (s.hasOwnProperty(E)) {
          const U = (0, i.lebEncode)(h),
            p = T.encodeValue(s[E]);
          return (0, r.concat)(U, p);
        }
      }
      throw Error("Variant has no data: " + s);
    }
    _buildTypeTableImpl(s) {
      this._fields.forEach(([, U]) => {
        U.buildTypeTable(s);
      });
      const h = (0, i.slebEncode)(-21),
        E = (0, i.lebEncode)(this._fields.length),
        T = this._fields.map(([U, p]) =>
          (0, r.concat)(
            (0, i.lebEncode)((0, n.idlLabelToId)(U)),
            p.encodeType(s),
          ),
        );
      s.add(this, (0, r.concat)(h, E, ...T));
    }
    decodeValue(s, h) {
      const E = this.checkType(h);
      if (!(E instanceof R)) throw new Error("Not a variant type");
      const T = Number((0, i.lebDecode)(s));
      if (T >= E._fields.length) throw Error("Invalid variant index: " + T);
      const [U, p] = E._fields[T];
      for (const [o, u] of this._fields)
        if ((0, n.idlLabelToId)(U) === (0, n.idlLabelToId)(o)) {
          const g = u.decodeValue(s, p);
          return { [o]: g };
        }
      throw new Error("Cannot find field hash " + U);
    }
    get name() {
      return `variant {${this._fields.map(([h, E]) => h + ":" + E.name).join("; ")}}`;
    }
    display() {
      return `variant {${this._fields.map(([h, E]) => h + (E.name === "null" ? "" : `:${E.display()}`)).join("; ")}}`;
    }
    valueToString(s) {
      for (const [h, E] of this._fields)
        if (s.hasOwnProperty(h)) {
          const T = E.valueToString(s[h]);
          return T === "null" ? `variant {${h}}` : `variant {${h}=${T}}`;
        }
      throw new Error("Variant has no data: " + s);
    }
  }
  e.VariantClass = R;
  class P extends S {
    constructor() {
      super(...arguments), (this._id = P._counter++), (this._type = void 0);
    }
    accept(s, h) {
      if (!this._type) throw Error("Recursive type uninitialized.");
      return s.visitRec(this, this._type, h);
    }
    fill(s) {
      this._type = s;
    }
    getType() {
      return this._type;
    }
    covariant(s) {
      if (this._type && this._type.covariant(s)) return !0;
      throw new Error(`Invalid ${this.display()} argument: ${re(s)}`);
    }
    encodeValue(s) {
      if (!this._type) throw Error("Recursive type uninitialized.");
      return this._type.encodeValue(s);
    }
    _buildTypeTableImpl(s) {
      if (!this._type) throw Error("Recursive type uninitialized.");
      s.add(this, new Uint8Array([])),
        this._type.buildTypeTable(s),
        s.merge(this, this._type.name);
    }
    decodeValue(s, h) {
      if (!this._type) throw Error("Recursive type uninitialized.");
      return this._type.decodeValue(s, h);
    }
    get name() {
      return `rec_${this._id}`;
    }
    display() {
      if (!this._type) throw Error("Recursive type uninitialized.");
      return `μ${this.name}.${this._type.name}`;
    }
    valueToString(s) {
      if (!this._type) throw Error("Recursive type uninitialized.");
      return this._type.valueToString(s);
    }
  }
  (e.RecClass = P), (P._counter = 0);
  function z(m) {
    if ((0, i.safeReadUint8)(m) !== 1)
      throw new Error("Cannot decode principal");
    const h = Number((0, i.lebDecode)(m));
    return t.Principal.fromUint8Array(new Uint8Array((0, i.safeRead)(m, h)));
  }
  class M extends I {
    accept(s, h) {
      return s.visitPrincipal(this, h);
    }
    covariant(s) {
      if (s && s._isPrincipal) return !0;
      throw new Error(`Invalid ${this.display()} argument: ${re(s)}`);
    }
    encodeValue(s) {
      const h = s.toUint8Array(),
        E = (0, i.lebEncode)(h.byteLength);
      return (0, r.concat)(new Uint8Array([1]), E, h);
    }
    encodeType() {
      return (0, i.slebEncode)(-24);
    }
    decodeValue(s, h) {
      return this.checkType(h), z(s);
    }
    get name() {
      return "principal";
    }
    valueToString(s) {
      return `${this.name} "${s.toText()}"`;
    }
  }
  e.PrincipalClass = M;
  class G extends S {
    constructor(s, h, E = []) {
      super(), (this.argTypes = s), (this.retTypes = h), (this.annotations = E);
    }
    static argsToString(s, h) {
      if (s.length !== h.length) throw new Error("arity mismatch");
      return "(" + s.map((E, T) => E.valueToString(h[T])).join(", ") + ")";
    }
    accept(s, h) {
      return s.visitFunc(this, h);
    }
    covariant(s) {
      if (
        Array.isArray(s) &&
        s.length === 2 &&
        s[0] &&
        s[0]._isPrincipal &&
        typeof s[1] == "string"
      )
        return !0;
      throw new Error(`Invalid ${this.display()} argument: ${re(s)}`);
    }
    encodeValue([s, h]) {
      const E = s.toUint8Array(),
        T = (0, i.lebEncode)(E.byteLength),
        U = (0, r.concat)(new Uint8Array([1]), T, E),
        p = new TextEncoder().encode(h),
        o = (0, i.lebEncode)(p.byteLength);
      return (0, r.concat)(new Uint8Array([1]), U, o, p);
    }
    _buildTypeTableImpl(s) {
      this.argTypes.forEach((g) => g.buildTypeTable(s)),
        this.retTypes.forEach((g) => g.buildTypeTable(s));
      const h = (0, i.slebEncode)(-22),
        E = (0, i.lebEncode)(this.argTypes.length),
        T = (0, r.concat)(...this.argTypes.map((g) => g.encodeType(s))),
        U = (0, i.lebEncode)(this.retTypes.length),
        p = (0, r.concat)(...this.retTypes.map((g) => g.encodeType(s))),
        o = (0, i.lebEncode)(this.annotations.length),
        u = (0, r.concat)(
          ...this.annotations.map((g) => this.encodeAnnotation(g)),
        );
      s.add(this, (0, r.concat)(h, E, T, U, p, o, u));
    }
    decodeValue(s) {
      if ((0, i.safeReadUint8)(s) !== 1)
        throw new Error("Cannot decode function reference");
      const E = z(s),
        T = Number((0, i.lebDecode)(s)),
        U = (0, i.safeRead)(s, T),
        o = new TextDecoder("utf8", { fatal: !0 }).decode(U);
      return [E, o];
    }
    get name() {
      const s = this.argTypes.map((T) => T.name).join(", "),
        h = this.retTypes.map((T) => T.name).join(", "),
        E = " " + this.annotations.join(" ");
      return `(${s}) -> (${h})${E}`;
    }
    valueToString([s, h]) {
      return `func "${s.toText()}".${h}`;
    }
    display() {
      const s = this.argTypes.map((T) => T.display()).join(", "),
        h = this.retTypes.map((T) => T.display()).join(", "),
        E = " " + this.annotations.join(" ");
      return `(${s}) → (${h})${E}`;
    }
    encodeAnnotation(s) {
      if (s === "query") return new Uint8Array([1]);
      if (s === "oneway") return new Uint8Array([2]);
      if (s === "composite_query") return new Uint8Array([3]);
      throw new Error("Illegal function annotation");
    }
  }
  e.FuncClass = G;
  class Q extends S {
    constructor(s) {
      super(),
        (this._fields = Object.entries(s).sort((h, E) =>
          h[0] < E[0] ? -1 : h[0] > E[0] ? 1 : 0,
        ));
    }
    accept(s, h) {
      return s.visitService(this, h);
    }
    covariant(s) {
      if (s && s._isPrincipal) return !0;
      throw new Error(`Invalid ${this.display()} argument: ${re(s)}`);
    }
    encodeValue(s) {
      const h = s.toUint8Array(),
        E = (0, i.lebEncode)(h.length);
      return (0, r.concat)(new Uint8Array([1]), E, h);
    }
    _buildTypeTableImpl(s) {
      this._fields.forEach(([U, p]) => p.buildTypeTable(s));
      const h = (0, i.slebEncode)(-23),
        E = (0, i.lebEncode)(this._fields.length),
        T = this._fields.map(([U, p]) => {
          const o = new TextEncoder().encode(U),
            u = (0, i.lebEncode)(o.length);
          return (0, r.concat)(u, o, p.encodeType(s));
        });
      s.add(this, (0, r.concat)(h, E, ...T));
    }
    decodeValue(s) {
      return z(s);
    }
    get name() {
      return `service {${this._fields.map(([h, E]) => h + ":" + E.name).join("; ")}}`;
    }
    valueToString(s) {
      return `service "${s.toText()}"`;
    }
  }
  e.ServiceClass = Q;
  function re(m) {
    const s = JSON.stringify(m, (h, E) =>
      typeof E == "bigint" ? `BigInt(${E})` : E,
    );
    return s && s.length > c ? s.substring(0, c - 3) + "..." : s;
  }
  function ye(m, s) {
    if (s.length < m.length) throw Error("Wrong number of message arguments");
    const h = new x();
    m.forEach((u) => u.buildTypeTable(h));
    const E = new TextEncoder().encode(d),
      T = h.encode(),
      U = (0, i.lebEncode)(s.length),
      p = (0, r.concat)(...m.map((u) => u.encodeType(h))),
      o = (0, r.concat)(
        ...w(m, s, (u, g) => {
          try {
            u.covariant(g);
          } catch (v) {
            throw new Error(
              v.message +
                `

`,
            );
          }
          return u.encodeValue(g);
        }),
      );
    return (0, r.concat)(E, T, U, p, o);
  }
  e.encode = ye;
  function ae(m, s) {
    const h = new r.PipeArrayBuffer(s);
    if (s.byteLength < d.length)
      throw new Error("Message length smaller than magic number");
    const E = (0, i.safeRead)(h, d.length),
      T = new TextDecoder().decode(E);
    if (T !== d) throw new Error("Wrong magic number: " + JSON.stringify(T));
    function U(Z) {
      const ce = [],
        de = Number((0, i.lebDecode)(Z));
      for (let f = 0; f < de; f++) {
        const l = Number((0, i.slebDecode)(Z));
        switch (l) {
          case -18:
          case -19: {
            const A = Number((0, i.slebDecode)(Z));
            ce.push([l, A]);
            break;
          }
          case -20:
          case -21: {
            const A = [];
            let k = Number((0, i.lebDecode)(Z)),
              D;
            for (; k--; ) {
              const H = Number((0, i.lebDecode)(Z));
              if (H >= Math.pow(2, 32))
                throw new Error("field id out of 32-bit range");
              if (typeof D == "number" && D >= H)
                throw new Error("field id collision or not sorted");
              D = H;
              const _e = Number((0, i.slebDecode)(Z));
              A.push([H, _e]);
            }
            ce.push([l, A]);
            break;
          }
          case -22: {
            const A = [];
            let k = Number((0, i.lebDecode)(Z));
            for (; k--; ) A.push(Number((0, i.slebDecode)(Z)));
            const D = [];
            let H = Number((0, i.lebDecode)(Z));
            for (; H--; ) D.push(Number((0, i.slebDecode)(Z)));
            const _e = [];
            let Be = Number((0, i.lebDecode)(Z));
            for (; Be--; )
              switch (Number((0, i.lebDecode)(Z))) {
                case 1: {
                  _e.push("query");
                  break;
                }
                case 2: {
                  _e.push("oneway");
                  break;
                }
                case 3: {
                  _e.push("composite_query");
                  break;
                }
                default:
                  throw new Error("unknown annotation");
              }
            ce.push([l, [A, D, _e]]);
            break;
          }
          case -23: {
            let A = Number((0, i.lebDecode)(Z));
            const k = [];
            for (; A--; ) {
              const D = Number((0, i.lebDecode)(Z)),
                H = new TextDecoder().decode((0, i.safeRead)(Z, D)),
                _e = (0, i.slebDecode)(Z);
              k.push([H, _e]);
            }
            ce.push([l, k]);
            break;
          }
          default:
            throw new Error("Illegal op_code: " + l);
        }
      }
      const me = [],
        y = Number((0, i.lebDecode)(Z));
      for (let f = 0; f < y; f++) me.push(Number((0, i.slebDecode)(Z)));
      return [ce, me];
    }
    const [p, o] = U(h);
    if (o.length < m.length) throw new Error("Wrong number of return values");
    const u = p.map((Z) => we());
    function g(Z) {
      if (Z < -24) throw new Error("future value not supported");
      if (Z < 0)
        switch (Z) {
          case -1:
            return e.Null;
          case -2:
            return e.Bool;
          case -3:
            return e.Nat;
          case -4:
            return e.Int;
          case -5:
            return e.Nat8;
          case -6:
            return e.Nat16;
          case -7:
            return e.Nat32;
          case -8:
            return e.Nat64;
          case -9:
            return e.Int8;
          case -10:
            return e.Int16;
          case -11:
            return e.Int32;
          case -12:
            return e.Int64;
          case -13:
            return e.Float32;
          case -14:
            return e.Float64;
          case -15:
            return e.Text;
          case -16:
            return e.Reserved;
          case -17:
            return e.Empty;
          case -24:
            return e.Principal;
          default:
            throw new Error("Illegal op_code: " + Z);
        }
      if (Z >= p.length) throw new Error("type index out of range");
      return u[Z];
    }
    function v(Z) {
      switch (Z[0]) {
        case -19: {
          const ce = g(Z[1]);
          return le(ce);
        }
        case -18: {
          const ce = g(Z[1]);
          return _(ce);
        }
        case -20: {
          const ce = {};
          for (const [y, f] of Z[1]) {
            const l = `_${y}_`;
            ce[l] = g(f);
          }
          const de = oe(ce),
            me = de.tryAsTuple();
          return Array.isArray(me) ? Y(...me) : de;
        }
        case -21: {
          const ce = {};
          for (const [de, me] of Z[1]) {
            const y = `_${de}_`;
            ce[y] = g(me);
          }
          return fe(ce);
        }
        case -22: {
          const [ce, de, me] = Z[1];
          return ie(
            ce.map((y) => g(y)),
            de.map((y) => g(y)),
            me,
          );
        }
        case -23: {
          const ce = {},
            de = Z[1];
          for (const [me, y] of de) {
            let f = g(y);
            if ((f instanceof P && (f = f.getType()), !(f instanceof G)))
              throw new Error(
                "Illegal service definition: services can only contain functions",
              );
            ce[me] = f;
          }
          return se(ce);
        }
        default:
          throw new Error("Illegal op_code: " + Z[0]);
      }
    }
    p.forEach((Z, ce) => {
      if (Z[0] === -22) {
        const de = v(Z);
        u[ce].fill(de);
      }
    }),
      p.forEach((Z, ce) => {
        if (Z[0] !== -22) {
          const de = v(Z);
          u[ce].fill(de);
        }
      });
    const O = o.map((Z) => g(Z)),
      j = m.map((Z, ce) => Z.decodeValue(h, O[ce]));
    for (let Z = m.length; Z < O.length; Z++) O[Z].decodeValue(h, O[Z]);
    if (h.byteLength > 0) throw new Error("decode: Left-over bytes");
    return j;
  }
  (e.decode = ae),
    (e.Empty = new b()),
    (e.Reserved = new L()),
    (e.Unknown = new C()),
    (e.Bool = new V()),
    (e.Null = new K()),
    (e.Text = new W()),
    (e.Int = new te()),
    (e.Nat = new $()),
    (e.Float32 = new X(32)),
    (e.Float64 = new X(64)),
    (e.Int8 = new q(8)),
    (e.Int16 = new q(16)),
    (e.Int32 = new q(32)),
    (e.Int64 = new q(64)),
    (e.Nat8 = new ee(8)),
    (e.Nat16 = new ee(16)),
    (e.Nat32 = new ee(32)),
    (e.Nat64 = new ee(64)),
    (e.Principal = new M());
  function Y(...m) {
    return new ue(m);
  }
  e.Tuple = Y;
  function le(m) {
    return new ne(m);
  }
  e.Vec = le;
  function _(m) {
    return new J(m);
  }
  e.Opt = _;
  function oe(m) {
    return new he(m);
  }
  e.Record = oe;
  function fe(m) {
    return new R(m);
  }
  e.Variant = fe;
  function we() {
    return new P();
  }
  e.Rec = we;
  function ie(m, s, h = []) {
    return new G(m, s, h);
  }
  e.Func = ie;
  function se(m) {
    return new Q(m);
  }
  e.Service = se;
})(sh);
export {
  Ph as A,
  Sh as D,
  Mr as H,
  Te as P,
  kh as V,
  pn as a,
  Zc as b,
  Ch as g,
  sh as i,
  Rh as u,
};
