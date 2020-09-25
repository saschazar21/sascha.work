---
cover:
  alt: A random image from Unsplash
  src: https://source.unsplash.com/random/1920x480
  width: 1920
  height: 480
tags:
  - initial
  - first
  - blog
  - post
  - react
  - mdx
---

# Initial blog post

There it is, the initial blog post.

## Contents

Illo eligendi earum enim. Tenetur itaque itaque in ipsa odio. Vitae cum et quia. Totam quae eum et et optio.

Sed excepturi aperiam quas rerum quas vel. Amet culpa officia accusantium quia voluptatibus provident eum. Quaerat ut dolores rerum deserunt. Qui minus non saepe molestiae fuga. Esse maxime ex itaque.

<section class="full-bleed">
<amp-img alt="A random image from unsplash" src="https://source.unsplash.com/random/1920x600" height="600" width="1920" layout="responsive" />
</section>

Suscipit vel fugiat vitae. Eius saepe facere quos minima perferendis ut. Et dolorem inventore hic vel. Nihil unde non accusantium omnis autem. Natus itaque iste et quia quis qui sequi eos. Cumque quia quibusdam vitae in blanditiis non quos qui.

Aspernatur occaecati sed cupiditate sit. Excepturi voluptas quis distinctio et saepe maiores vero. Dolores itaque consectetur adipisci laboriosam.

Dignissimos non non nulla eos. Consequuntur enim expedita adipisci inventore asperiores iure magni quo. Aut sit excepturi consequatur et natus magnam ut. Quaerat quo quod laudantium. Aliquid aut ipsa illo. Expedita doloremque est ex et tenetur eos veritatis laborum.

![A random image from Unsplash](https://source.unsplash.com/random/800x600)

```javascript
const width = 160;
const height = 120;
const cellSize = 5;
const distribution = 0.618;

const canvas = document.querySelector('canvas');
canvas.height = height * cellSize;
canvas.width = width * cellSize;

const ctx = canvas.getContext('2d');

let world = new Array(width * height)
  .fill(false)
  .map(v => Math.random() < distribution);
let newWorld = world.slice();

const position = (x, y) => {
  const absX = (x < 0 ? Math.abs(width + x) : x) % width;
  const absY = (y < 0 ? Math.abs(height + y) : y) % height;
  return absY * width + absX;
};

const coords = pos => {
  const y = Math.floor(pos / width);
  const x = pos % width;

  return [x, y];
};

const check = (x, y) => {
  const i = world[position(x, y)];
  const neighbors = [
    world[position(x - 1, y - 1)],
    world[position(x, y - 1)],
    world[position(x + 1, y - 1)],
    world[position(x - 1, y)],
    world[position(x + 1, y)],
    world[position(x - 1, y + 1)],
    world[position(x, y + 1)],
    world[position(x + 1, y + 1)]
  ];

  const aliveNeighbors = neighbors.reduceRight((count, neighbor) => {
    const alive = !isNaN(parseInt(count, 10)) ? count : count ? 1 : 0;
    return neighbor ? alive + 1 : alive;
  });

  return aliveNeighbors === 2 ? i : aliveNeighbors === 3;
};

const paint = theme =>
  world.forEach((cell, pos) => {
    const [x, y] = coords(pos);
    const state = check(x, y);

    newWorld[pos] = !!state;

    ctx.fillStyle = state ? 'RGBA(0,0,0,0.667)' : 'RGBA(255,255,255,0.667)';
    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
  });

const loop = () =>
  setTimeout(() => {
    paint();
    world = newWorld.slice();
    window.requestAnimationFrame(loop);
  }, 100);

window.requestAnimationFrame(loop);
```
