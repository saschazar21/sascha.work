---
page:
  title: AVIF and WebAssembly
public: true
related:
  - author: Daniel Aleksandersen
    title: Comparing AVIF vs WebP file sizes at the same DSSIM
    url: https://www.ctrl.blog/entry/webp-avif-comparison.html
  - author: Jake Archibald
    title: AVIF has landed
    url: https://jakearchibald.com/2020/avif-has-landed/
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

While _aom_ includes both a decoder and an encoder, _rav1e_ only does the latter. That's why this article is concentrating solely on encoding, instead of a two-way conversion.

In this article the following AVIF encoder implementations are used for comparison:

- **aom**: part of [saschazar21/webassembly](https://github.com/saschazar21/webassembly/tree/master/packages/avif) on Github
- **rav1e**: [saschazar21/wasm-rav1e](https://github.com/saschazar21/wasm-rav1e) on Github

## The WebAssembly part

Both aom and rav1e have not been designed specifically for use in a WebAssembly environment. Part of their strengths in terms of compression is their ability to allocate heavy tasks to multiple threads — which WebAssembly cannot provide, as it is designed to run in a virtualized environment, where there's no access to system threads.

By limiting both encoders to a single thread and disabling SIMD at the same time, lots of the performance gains are already lost right from the start. However, SIMD is starting to gain traction, as the [WebAssembly/simd](https://github.com/WebAssembly/simd)-repository shows (see the respective [article](https://v8.dev/features/simd) on v8.dev).

One challenge remains though; aom is written in C/C++ and needs [emscripten](https://emscripten.org/) for being compiled to WebAssembly, whereas rav1e is entirely written in Rust and therefore may be compiled to WebAssembly using [wasm-pack](https://rustwasm.github.io/wasm-pack/).

|                  | language | environment                  | `.wasm` size |
| ---------------- | :------- | :--------------------------- | -----------: |
| **aom** v2.0.2   | C/C++    | Node.js, WebWorker & Browser |       1.9 MB |
| **rav1e** v0.4.0 | Rust     | one at a time                |       699 KB |

By looking at the table above, it's appearant, that there are some distinct differences between both codecs — neither do the `.wasm` binaries of 1.9 MB and 699 KB in size play in the same ballpark, nor do the supported environments of the generated glue codes.

> ⚠️ Both environments produce a different outcome in terms of JavaScript glue code and therefore provide their own API. _emscripten_ produces a Promise-based, universal glue code for Node.js-, WebWorker- and browser-usage — _wasm-pack_ needs a specific `--target` flag at compile time, for producing a specified glue code that's tailor-made for the desired environment.

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

Of course, the resulting `.wasm` binary can as well be instantiated without any glue code, but that's considered as rather advanced.

## Comparison

First of all, this is no "fair" comparison between aom and rav1e. It is mainly because of both supporting only one chroma subsampling mode for _YCbCr_, and on top of that, it's not even the same:

- aom currently only supports _4:2:0_ subsampling without throwing an exception.
- rav1e only supports _4:4:4_ chroma sampling (therefore no subsampling at all) without producing a corrupt file.

### Initial Situation

The source file is a JPEG image with dimensions of 4096\*3072 pixels that's 5.5 MB in size. Straight out of the smartphone camera, it hasn't been optimized at all.

### First Round

As a first comparison, the original file is encoded using the fastest speed setting and a quality preset of 75%:

|           | speed | quality |    size |   duration |
| --------- | ----: | ------: | ------: | ---------: |
| **aom**   |    10 |     75% | 2.67 MB |  64.90 sec |
| **rav1e** |    10 |     75% | 3.02 MB | 140.62 sec |

One thing that's immediately visible is the duration — slightly over a minute for aom and an incredible 2 minutes and 20 seconds for rav1e. Moreover, the file size produced by aom is 12% smaller than rav1e and therefore roughly half the size of the original JPEG. One reason for that might be the different chroma subsampling rate of 4:2:0 by aom vs. 4:4:4 by rav1e.

Nevertheless, those numbers are by far not satisfying at all — encoding durations of more than 10 seconds are already likely breaking the bank of a single serverless function (and we're not even talking about durations below 1 minute here!).

### MozJPEG?

While the comparison above only covers an unoptimized source JPEG file, it might be tempting to contrast the encoded AVIF files with an optimized JPEG file that's been encoded using the [MozJPEG](https://github.com/mozilla/mozjpeg) encoder.

The results for the same parameters (75% quality, 4:2:0 subsampling) look quite promising, as the following table shows:

|             | quality |    size | duration |
| ----------- | ------: | ------: | -------: |
| **mozjpeg** |     75% | 1.36 MB |  3.3 sec |

With a `.wasm` binary size of just **362 KB** and the produced numbers above, the AVIF encoders do not seem to get anywhere near the benchmarks set by MozJPEG — contrary to the initial promises of producing an outcome of 50% the size of a JPEG file.

But that's not the end of the story.

### Tweaking the Configuration

Since AVIF promises to provide an acceptable image quality even in lower quality presets (without containing any of the well-known JPEG artifacts), a subsequent run with the quality preset lowered to 35% produced the following outcome:

|             | speed | quality |   size |   duration |
| ----------- | ----: | ------: | -----: | ---------: |
| **aom**     |    10 |     35% | 244 KB |  35.56 sec |
| **rav1e**   |    10 |     35% | 237 KB | 136.08 sec |
| **mozjpeg** |     - |     35% | 479 KB |   2.15 sec |

While the encoding duration is still out of mozjpeg's league, the resulting AVIF file size is suddenly roughly 50% smaller than JPEG, and more interestingly; rav1e needs nearly 4 times longer than aom for producing a similar outcome.

### Native Encoding

For further comparison, the following table contains the results for encoding the same source image using [cavif](https://github.com/kornelski/cavif-rs) (a 64-bit precompiled rav1e encoder) natively on a quad-core notebook:

|           | speed | quality |   size | duration |
| --------- | ----: | ------: | -----: | -------: |
| **cavif** |    10 |     35% | 299 KB | 9.84 sec |

Using a native quad-core CPU, at the fastest speed setting, the encoding process is not only **13 times faster**, it is also the only possibility for staying within that 10-second time barrier.

## Conclusion

The reason why WebAssembly was chosen as the target architecture is its versatility — once compiled to a `.wasm` binary, an application may be used in a multitude of environments, like Node.js, Workers (incl. [Cloudflare Workers](https://workers.cloudflare.com/)) and even locally in the browser. All without any external dependencies, which makes it perfect for platforms, where a certain external library may not be preinstalled, or is simply not supported at all.

AVIF encoding has its advantages, undoubtedly — but in WebAssembly. A codec specialized in both producing high image quality and high compression rates at the same time seems to be hungry for resources as well.

While the bespoke image quality often times justifies longer encoding durations, an average AVIF encoding process is certainly not suitable for usage in single-threaded environments, let alone environments lacking any form of parallelization (such as SIMD). A good benchmark for maximum execution durations is to not exceed 10 seconds, as this is the time frame where certain serverless functions are shutting down themselves by force.

If a standalone image compression codec is needed (e.g for saving bandwidth when uploading data to a remote API), WebAssembly packages such as [MozJPEG](https://github.com/saschazar21/webassembly/tree/master/packages/mozjpeg) and [WebP](https://github.com/saschazar21/webassembly/tree/master/packages/webp) may be the better option, as long as AVIF hasn't been optimized for single-threaded use and/or WebAssembly doesn't broadly support any kind of multi-threading or parallelization.
