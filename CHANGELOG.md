# Changelog

All notable changes to this project will be documented in this file.

## [3.5.1] - 2025-05-16

### 🐛 Bug Fixes

- Fixed glob patterns for ServiceWorker (#381)

## [3.5.0] - 2025-05-16

### 🚀 Features

- Added Win95 & Nintendo theme (#380)

## [3.4.0] - 2025-05-12

### 🚀 Features

- Added theme selector, fixed minor bugs (#379)

## [3.3.0] - 2025-05-08

### 🚀 Features

- Added endpoint to generate CV PDF (#378)

## [3.2.0] - 2025-04-28

### 🚀 Features

- Added ProjectEntry custom element (#377)

## [3.1.0] - 2025-04-24

### 🚀 Features

- Added /api/v1/project endpoint (#375)
- Extended cache headers, removed failing step in workflow (#376)

## [3.0.0] - 2025-04-18

### 🚀 Features

- [**breaking**] New website rewrite using Eleventy@v3 (#374)

## [2.0.0] - 2022-05-30

### 🚀 Features

- *(setup)* Initial commit
- *(layouts)* Added MDX and layouts support
- *(styles)* Added global styles
- *(styles)* Added colors
- *(index)* Added content to index page
- *(profile)* Added profile image
- *(profile)* Added image fallback
- *(index)* Added profile image animation
- *(feed)* Added JSON Feed option to configuration
- *(social)* Added social account information
- *(social)* Added social icons
- *(social)* Added social component styling
- *(footer)* Added GPG key element
- *(layout)* Added layout style
- *(next)* Added remark-slug to next config
- *(mdx)* Added custom MDX components
- *(navigation)* Added site navigation
- *(manifest)* Added web manifest
- *(seo)* Enhanced meta elements
- *(lighthouse)* Added lighthouse audits
- *(pages)* Added content to pages
- *(experience)* Added experience API endpoint
- *(about)* Added experience data to about page
- *(error)* Added error page
- *(serviceworker)* Added service worker
- *(API)* Updated API docs
- *(about)* Added AMP state to work experience
- *(app)* Added dark/light mode switch
- *(workbox)* Updated workbox
- Added eleventy base setup
- Added eleventy transforms, removed Next.js modules
- Added serviceworker config
- Added JSON Feed
- Added RSS feed
- *(css)* Added base styles
- Improved styles
- Added styles
- Added beach theme
- Added fire theme, fixed some color styles
- Created partials folder, added navigation
- Added header
- Refined header styles
- Included amp-sidebar in header
- *(navigation)* Fixed amp-sidebar handling
- Added svg, styled sidebar
- Added social icons, added social list to navigation
- Added content to sw.html
- Added footer
- *(themes)* Added theme selector
- *(themes)* Implemented theme selector using AMP state
- *(themes)* Enhanced theme selector
- Added 404 page
- Added code highlight
- *(api-docs)* Added API docs page
- Hide code blocks in api docs by default
- *(about)* Added about page
- Added styles for experience in about
- Polished about page
- *(blog)* Added blog page
- *(about)* Added world map
- *(index)* Added intro text
- Extended blog page
- Added tags page, added font files
- Added frame cards
- Added event handler to convert svg to jpeg
- Updated SEO icons and information
- Added projects data source
- Added featured container to index page
- Add package.json as data source
- Added legal notice
- Added styles for blockquote
- Finished teaser cards blog post
- Move from Next.js to 11ty #148
- Added webmention functionality
- Added AVIF WebAssembly article
- Enhanced AVIF WebAssembly article
- Added entry to featured projects, restyled featured template
- Added new blog post
- Finished Pages Full Stack SSR article

### 🐛 Bug Fixes

- *(README)* Fixed typo
- *(fullbleed)* Fixed full bleed styles
- *(styles)* Fixed color values
- *(styles)* Minor color changes
- *(html)* Added lang attribute
- *(next)* Fixed next _document
- *(lint)* Fixed linter warnings
- *(print)* Added print media queries
- *(blog)* Fixed blog folder structure
- *(setup)* Fixed netlify configuration
- *(serviceworker)* Fixed regexp for static pages
- *(styles)* Fixed contrast values in FullBleed, About
- *(favicon)* Replaced old favicons with new
- *(app)* Fixed typo
- *(footer)* Fixed active state for LightSwitch
- Fixed babel dependencies
- Fixed precache manifest injection
- Updated to next 9.4, disabled rewrites temporarily
- Fixed LD json to display correct education & worksFor data
- *(profile)* Updated srcset for profile image
- *(deps)* Bump next, bump @saschazar/next-mdx-extended (#130)
- *(ProfileImage)* Fixed styles for profile image
- Fixed helmet plugin configuration
- *(themes)* Inlined fonts, fixed width of themes
- Minor style fixes
- Enhanced accessibility of hyperlinks
- *(blog)* Fixed permalinks
- Added released collection
- Updated collections
- Excluded files from collections
- Fixed typo
- Fixed typo
- Fixed full-bleed container & reformatted styles
- Fixed list styles
- Fixed ESlint issues
- Fixed minor issues
- Minor fixes
- Removed public flag for post
- Fixed path of teaser cards
- Fixed font-size
- Fixed minor styling issues
- Fixed minor style issues
- Fixed blog post padding
- Fixed RSS feed collections loop
- Fixed domelementtype version in yarn.lock
- Fixed verbalizations
- Fixed display of featured posts
- Set blog post visibility to true
- Fixed absoluteURL filter
- Fixed service worker
- Fixed eleventy-plugin-pwa replacement

### 🚜 Refactor

- *(favicon)* Refactored favicon png
- *(app)* Refactor dark/light switching

### ⚡ Performance

- Improved styled-components babel config

### 🧪 Testing

- *(ProfileImage)* Fixed stylelint rule on amp-img

### ⚙️ Miscellaneous Tasks

- *(setup)* Updated dependency versions
- Removed @babel/compat-data
- Updated next-mdx-extended
- Fixed build scripts
- Removed Next.js remains
- Added nvmrc
- Fixed README
- Updated lint setup
- Downgraded sharp to 0.26
- Added sharp to resolutions list
- Resolved merge conflicts
- Rephrased sentence in teaser card post
- Moved markdown files in folders
- Merge branch 'master' into article-wasm-avif
- Fixed version of eleventy-plugin-pwa

<!-- generated by git-cliff -->
