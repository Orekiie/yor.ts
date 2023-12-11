<p align="center">
  <img src="https://us-east-1.tixte.net/uploads/the-brake.wants.solutions/Banner.webp" alt="Yor.ts">
</p>

<div align="center">
  <h1>Yor.ts</h1>
  <p>A highly performant and typed library to make discord http based bots</p>
</div>

<p align="center">
  <a href="https://github.com/OreOreki/yor.ts/blob/main/LICENSE"><img alt="GitHub License" src="https://img.shields.io/github/license/OreOreki/yor.ts?style=for-the-badge&labelColor=000000&color=8B0000"></a>
  <a href="https://npmjs.com/package/yor.ts"><img alt="npm" src="https://img.shields.io/npm/v/yor.ts?style=for-the-badge&labelColor=000000&color=8B0000"></a>
  <a href="https://discord.gg/HXVMArbsX7"><img alt="Discord" src="https://img.shields.io/discord/1178575007845199882?style=for-the-badge&labelColor=000000&color=8B0000"></a>
  <a href="https://github.com/OreOreki/yor.ts/issues"><img src="https://img.shields.io/github/issues-raw/OreOreki/yor.ts?label=issues&style=for-the-badge&labelColor=000000&color=8B0000"></a>
  <a href="https://github.com/OreOreki/yor.ts/pulls"><img src="https://img.shields.io/github/issues-pr-raw/OreOreki/yor.ts?label=pull%20requests&style=for-the-badge&labelColor=000000&color=8B0000"></a>
  <a href="https://github.com/OreOreki/yor.ts"><img src="https://img.shields.io/github/forks/OreOreki/yor.ts?style=for-the-badge&labelColor=000000&color=8B0000"></a>
  <a href="https://github.com/OreOreki/yor.ts"><img src="https://img.shields.io/github/stars/OreOreki/yor.ts?style=for-the-badge&labelColor=000000&color=8B0000"></a>
  <img src="https://img.shields.io/github/languages/top/OreOreki/yor.ts?style=for-the-badge&logo=typescript&logoColor=FF6347&labelColor=000000&color=8B0000">
</p>

## Features
* **Performance:** Designed to be highly efficient and performant, reducing the load on your server.
* **Type Safety:** Fully typed with TypeScript, providing better developer experience and catching errors at compile time.
* **HTTP Based:** Bypasses the traditional websocket connection, providing more stability and scalability.
* **Easy to Use:** Clear and comprehensive documentation, allowing developers of all experience levels to get started easily.
* **Modular Design:** The library is designed to be modular, letting you pick and choose the components you need for your bot.
* **Cloudflare Workers Support:** Capable of running on Cloudflare Workers, providing you with more hosting options.
* **Interaction Support:** Full support for Discord's new interaction features, including buttons and select menus.

## Getting Started
Install Yor.ts using npm/yarn/pnpm/bun:

```bash
npm i yor.ts
yarn add yor.ts
pnpm add yor.ts
bun add yor.ts
```

## Note
Depending on where you're hosting your bot and what kind of provider you're using, you might need to polyfill some of the node libs to make it work. For example on cloudflare workers you will need to polyfill `node:util` and `node:url` in order to work. When you come across something like this, use [esbuild](https://esbuild.github.io/) and [esbuild-node-polyfill](https://github.com/cyco130/esbuild-plugin-polyfill-node/) to polyfill it.

## Contributing
See [contributing guide](https://github.com/OreOreki/yor.ts/blob/main/.github/CONTRIBUTING.md)

## Issues
See [issues](https://github.com/OreOreki/yor.ts/issues)

## Pull Requests
See [pull requests](https://github.com/OreOreki/yor.ts/pulls)

## Support
Join our discord server: [Discord](https://discord.gg/HXVMArbsX7)

## Documentation
See [documentation guide](https://yor.mintlify.app)

## Changelog
See [changelog](https://github.com/OreOreki/yor.ts/blob/main/CHANGELOG.md)

## License
MIT

## Special Thanks
* [discordjs](https://github.com/discordjs/discord.js) for creating beautiful packages like `rest`/`core`

## Maintainers
* [OreOreki](https://github.com/OreOreki)
