---
page:
  title: AVIF and WebAssembly
public: false
tags:
  - post
  - AVIF
  - image
  - WebAssembly
tldr: Encoding AVIF images in WebAssembly is slow and error-prone. Out of aom & rav1e, aom seems to produce a faster and smaller outcome — mainly due to 4:2:0 subsampling.
---

# AVIF and WebAssembly: a comparison of codecs

AVIF is a new image format that's gaining more and more support in web browsers lately. It's capable of compressing image files up to **half the size of a JPEG** and save roughly a fifth of the size of a WebP image — all by maintaining a similar image quality (see [Daniel Aleksandersen's article](https://www.ctrl.blog/entry/webp-avif-comparison.html) for a detailed comparison).

As of February 2021, it's supported on the latest Chrome, Opera and Firefox browser versions — although only on desktop (see [AVIF support on Can I Use](https://caniuse.com/?search=AVIF)). That makes a global share of just around 25%, however it's worth taking a look already.

## AOM & rav1e — what's the deal?

Due to AVIF being designed as a royalty-free image format, multiple Open Source encoders and decoders have been developed as an enhancement to the [aom](https://aomedia.googlesource.com/aom/) reference codec. One of those is [rav1e](https://github.com/xiph/rav1e), an AV1 encoder written in Rust, claiming to be the "fastest and safest AV1 encoder".

While _aom_ includes both a decoder and an encoder, _rav1e_ only does the latter. That's why I am mainly concentrating on encoding, instead of a two-way conversion in this article.

## The WebAssembly part

Both aom and rav1e have not been designed specifically for use in a WebAssembly environment. Part of their strengths in terms of compression is their ability to allocate heavy tasks to multiple threads — which WebAssembly cannot provide, as it is designed to run in a virtualized environment, where there's no access to system threads.

By limiting both encoders to a single thread and disabling SIMD at the same time, lots of the performance gains already remain deactivated right from the start. However, SIMD is starting to gain traction, as the [WebAssembly/simd](https://github.com/WebAssembly/simd)-repository shows (see the respective [article](https://v8.dev/features/simd) on v8.dev).

One challenge remains though; aom is written in C/C++ and needs [emscripten](https://emscripten.org/) for being compiled to WebAssembly, whereas rav1e is entirely written in Rust and therefore can be compiled to WebAssembly using [wasm-pack](https://rustwasm.github.io/wasm-pack/).

> ⚠️ Both environments produce a different outcome in terms of JavaScript glue code and therefore provide their own API. _emscripten_ produces a Promise-based, universal glue code for Node.js-, WebWorker- and browser-usage — _wasm-pack_ needs a specific `--target` flag at compile time, for producing a specified glue code that's usable in the desired environment.

The following snippet provides an example for instantiating a package using the emscripten API:

```javascript
// emscripten example
const wasm_avif = require('@saschazar/wasm-avif');
const defaultOptions = require('@saschazar/wasm-avif/options');

wasm_avif({ noInitialRun: true }).then((avif) =>
  avif.encode(
    new Uint8Array([]), // RGBA pixel array
    640, // width
    480, // height
    4, // channels
    defaultOptions,
    3, // 4:2:0 subsampling
  ),
);
```

Of course, the resulting `.wasm` binary can as well be instantiated without any glue code, but I'd consider that as rather advanced.

## Comparison

First of all, this is no "fair" comparison between aom and rav1e. It is mainly because of both supporting only one chroma subsampling mode for _YCbCr_, and on top of that, it's not even the same:

- aom currently only supports _4:2:0_ subsampling without throwing an exception.
- rav1e only supports _4:4:4_ chroma sampling (therefore no subsampling at all) without producing a corrupt file.

### Initial Situation

The source file is a JPEG image with dimensions of 4096\*3072 pixels that's 5.5 MB in size. Straight out of the smartphone camera, it hasn't been optimized at all.
