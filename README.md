<div align="center">

![Vencord Logo](https://github.com/D3SOX/vencord-userplugins/assets/24937357/f5c06f0e-9d8c-4cca-b990-953d675ec71d)

## My Vencord plugins

</div>

<!--These can be installed by following the guide [here](https://github.com/Vendicated/Vencord/blob/main/docs/1_INSTALLING.md) -->

### Install

1. Install [Node.js](https://nodejs.org/)
2. Install [Git](https://git-scm.com/downloads)
3. Execute this command and follow the instructions by the prompt:
```bash
npm i -g pnpm && git clone https://github.com/Vendicated/Vencord && cd Vencord && npm i -g pnpm && pnpm i && cd src && mkdir userplugins && cd userplugins && git clone https://github.com/wakatime/vencord-wakatime && cd ../.. && pnpm build && pnpm inject
```

4. Add your [API Key](https://wakatime.com/api-key) to the plugin settings menu, then use Discord like you normally do and your stats will display on the [WakaTime Dashboard](https://wakatime.com).

> [!TIP]
> There's also [this video by Syncxv](https://youtu.be/8wexjSo8fNw) which shows how to install a userplugin on Windows.
> Just be sure to replace the `git clone` command with the one from below
