# Turborepo starter

This is an official starter Turborepo.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)

```
test-again
├─ .git
│  ├─ COMMIT_EDITMSG
│  ├─ config
│  ├─ description
│  ├─ FETCH_HEAD
│  ├─ HEAD
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  ├─ sendemail-validate.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ logs
│  │  ├─ HEAD
│  │  └─ refs
│  │     └─ heads
│  │        └─ main
│  ├─ objects
│  │  ├─ 01
│  │  │  └─ 64ddc5ad9db8a097651e72e9fe9c9caf6e394a
│  │  ├─ 0a
│  │  │  └─ c1e2010ff2d1e85bad7fd2b67f424be81b4bb3
│  │  ├─ 0c
│  │  │  └─ c8b1d39af761fd40af13e0d04ceb0b20194abe
│  │  ├─ 15
│  │  │  └─ 74369ee275d00d4b99e1a51be03dd8aadd0e84
│  │  ├─ 19
│  │  │  ├─ 170f88edaf8893fdc80d2c616c081f2d838861
│  │  │  └─ 97af7b6469e91967f0cd47b461c9eaf3fb7a77
│  │  ├─ 1b
│  │  │  └─ 62daacff96dad6584e71cd962051b82957c313
│  │  ├─ 23
│  │  │  └─ 069f2b276d1f76335ab0a879d3261f0fab7470
│  │  ├─ 27
│  │  │  └─ c0e60436aac79bd14661e016c8c5721c5db6d6
│  │  ├─ 2f
│  │  │  └─ dd05d06ed5989f3267167133a5cf2dfbaa9a28
│  │  ├─ 31
│  │  │  └─ f5f43d5c3684a9ba361454e7b607a988d3c21f
│  │  ├─ 33
│  │  │  └─ 68d6535c560d5dd9067f3d099e87dd035297be
│  │  ├─ 34
│  │  │  └─ 924457186e5f0cc14b460e88d66f01d70e251b
│  │  ├─ 36
│  │  │  └─ 30662c6f3119c94bea5a7fdeb98d99df322f2f
│  │  ├─ 3d
│  │  │  └─ acd49fcfa5cb0ae2ea2beac6410d010a5b15dd
│  │  ├─ 3f
│  │  │  └─ f5faaaf5f139c707e338e7e89e51606e9e0ace
│  │  ├─ 40
│  │  │  └─ 100baa62a61cc7156438194d5e5079482b9397
│  │  ├─ 42
│  │  │  └─ 30a3d2071c406b7e4c7b297d247fc194be540c
│  │  ├─ 46
│  │  │  └─ 78774e6d606704bce1897a5dab960cd798bf66
│  │  ├─ 47
│  │  │  └─ cea313b5541e32818db0b7fad0c6893661c24c
│  │  ├─ 4a
│  │  │  ├─ c12dadfb98442d2f96b2dee2ae25b3405d13fe
│  │  │  └─ c80a0f94a9cd122dd61ac5eabc5d751c2a0101
│  │  ├─ 51
│  │  │  ├─ 17f2a3d1c5fe54a344a7152acbe366fe63cdda
│  │  │  └─ 74b28c565c285e3e312ec5178be64fbeca8398
│  │  ├─ 58
│  │  │  └─ 15dfa4678df16082bc289d66c8ca5df9ac816d
│  │  ├─ 5b
│  │  │  └─ b6afba56b8dce7b8ffdda4bf5339b28e2564b7
│  │  ├─ 69
│  │  │  └─ ecdf3e5b1ca8bbbc5f1791cb4b2c27370e81db
│  │  ├─ 6a
│  │  │  └─ f7ecbbb8656b1295acccd1b6cdd1da88d6c855
│  │  ├─ 71
│  │  │  └─ 8d6fea4835ec2d246af9800eddb7ffb276240c
│  │  ├─ 76
│  │  │  └─ d785210d80cd66901a9c7993ca6b9bfa67db5d
│  │  ├─ 78
│  │  │  └─ e5420c3f606fcc5959ef45cf9c930148d1ec73
│  │  ├─ 7a
│  │  │  └─ ef056980d5671f71555aa0fe6abd88f6be8305
│  │  ├─ 7b
│  │  │  ├─ 988937b9a1d98eca18d2b87fdba837a4fe3dd0
│  │  │  └─ d37e0a86768ee328f13fec69599a04c88c7f77
│  │  ├─ 80
│  │  │  └─ 1640176c1ddddd3a5f9395010918383ed8ccd9
│  │  ├─ 81
│  │  │  └─ a2a16806cf271d3f9b174831d7190e019d2805
│  │  ├─ 82
│  │  │  └─ 8709ac171879e7da65f29d157890d5f597c4fa
│  │  ├─ 83
│  │  │  └─ 5c5c9544bed4c8220fd749bd70e81d93d8c40f
│  │  ├─ 84
│  │  │  └─ 69537555ad68b14377be257758ab1876d3ff5b
│  │  ├─ 85
│  │  │  └─ 707a14efe44f2c42878fb5c898d5421c4fef73
│  │  ├─ 87
│  │  │  └─ 4491080b9f703ce7c338d7f6323df9a3ee7df2
│  │  ├─ 8b
│  │  │  └─ 42d901b0e8dee2e21313ec0442c50e9fef038a
│  │  ├─ 96
│  │  │  ├─ 209e4212f95e5b6a5ab7639b094cf3973dc3ec
│  │  │  └─ fab4fed3424d27f8a5bc04d045afd56574a2d5
│  │  ├─ 97
│  │  │  └─ dd5d48f625b365f6b225c88a7f59054ae1bcac
│  │  ├─ 9c
│  │  │  └─ fb3c98674c3553ae58854c31f9302cc1f72a24
│  │  ├─ 9f
│  │  │  └─ 336784ba4bb208170630b0c7c10e3d093ef0b1
│  │  ├─ a3
│  │  │  └─ f992e2c8e37ddbdcf0a491157df8d99490e5ff
│  │  ├─ a9
│  │  │  └─ 8bfa8140e14c75a3675f1666a6f587d4d25fe5
│  │  ├─ ac
│  │  │  ├─ abbce0704641e149d81c961decf6d4f6d1b8b3
│  │  │  └─ d1bfba0fdad29f64adc3992b44ec819c080a07
│  │  ├─ b5
│  │  │  ├─ 09205e46944bde39ab42f064133d7a4e09e68f
│  │  │  └─ 60f1901f6898ce0da856d65879ae1be138a55e
│  │  ├─ bb
│  │  │  └─ c780069c332dbf9b048a30e7d1f5358921c534
│  │  ├─ c1
│  │  │  ├─ 657eb69d421b622430cbbd91e38ccba8ee4ee9
│  │  │  └─ 8fd2d9ddfc86d10d70cdf9ef245c9f8e2bf694
│  │  ├─ c3
│  │  │  └─ a1b26fbb3b6ad5d606836247a8ca3a1be051c6
│  │  ├─ c5
│  │  │  └─ e150ec764f1ec2277a0ce1a3306b060a42b646
│  │  ├─ ca
│  │  │  └─ 86687c4bb77d8aed541bc31f9e81156880764a
│  │  ├─ cf
│  │  │  └─ 9eef051393a6be92adc2613734b5d7eb117429
│  │  ├─ d1
│  │  │  └─ c44ffe9cb35ce6fcc8d2bd33b4e3326072931c
│  │  ├─ d2
│  │  │  └─ 5f090489dc1481228876e58a30ed5e58b00d3b
│  │  ├─ d6
│  │  │  └─ a7fe0554393cb94fa5273d6f3821e3c7e23ecb
│  │  ├─ d9
│  │  │  └─ 68b9e3a84521fce4547d220beba178f67ec9eb
│  │  ├─ da
│  │  │  └─ e38fed549745d94f3380a9280864ae0f797c1f
│  │  ├─ dd
│  │  │  └─ ea915815874759a0cd6dd54dbd197b874c3c99
│  │  ├─ e6
│  │  │  ├─ 9de29bb2d1d6434b8b29ae775ad8c2e48c5391
│  │  │  └─ defa48fce860cf5570f268d4880161a74789c8
│  │  ├─ e8
│  │  │  ├─ 759ff50fbca5c63fbaac5154b7a7d5876f72be
│  │  │  └─ 85bbb6becdee6f593020b023306c2e7f850046
│  │  ├─ ea
│  │  │  └─ 1d474b8fb37098c7ec9f91ebb31dd2a615cd06
│  │  ├─ f2
│  │  │  └─ ae185cbfd16946a534d819e9eb03924abbcc49
│  │  ├─ f6
│  │  │  └─ 528679db044170012c33994dec7e9c1b39b793
│  │  ├─ f7
│  │  │  └─ cbd22a8618fcb6dca4341cc15dccfb48c0e74d
│  │  ├─ f8
│  │  │  ├─ 571b7dce76d81da02fb40f0912eb5558f9493e
│  │  │  └─ 86745c5216623d70058427ddd40ecf6ebf84f7
│  │  ├─ fc
│  │  │  └─ b741a341df889205f9868e01cdef51cc530ae9
│  │  ├─ info
│  │  └─ pack
│  └─ refs
│     ├─ heads
│     │  └─ main
│     └─ tags
├─ .gitignore
├─ .npmrc
├─ apps
│  ├─ api
│  │  ├─ .eslintrc.js
│  │  ├─ .gitignore
│  │  ├─ .prettierrc
│  │  ├─ nest-cli.json
│  │  ├─ package.json
│  │  ├─ README.md
│  │  ├─ src
│  │  │  ├─ app.controller.spec.ts
│  │  │  ├─ app.controller.ts
│  │  │  ├─ app.module.ts
│  │  │  ├─ app.service.ts
│  │  │  └─ main.ts
│  │  ├─ test
│  │  │  ├─ app.e2e-spec.ts
│  │  │  └─ jest-e2e.json
│  │  └─ tsconfig.json
│  └─ web
│     ├─ .eslintrc.json
│     ├─ .gitignore
│     ├─ next-env.d.ts
│     ├─ next.config.mjs
│     ├─ package.json
│     ├─ postcss.config.mjs
│     ├─ README.md
│     ├─ src
│     │  └─ app
│     │     ├─ favicon.ico
│     │     ├─ fonts
│     │     │  ├─ GeistMonoVF.woff
│     │     │  └─ GeistVF.woff
│     │     ├─ globals.css
│     │     ├─ layout.tsx
│     │     └─ page.tsx
│     ├─ tailwind.config.ts
│     └─ tsconfig.json
├─ package.json
├─ packages
│  ├─ eslint-config
│  │  ├─ base.js
│  │  ├─ next.js
│  │  ├─ package.json
│  │  ├─ react-internal.js
│  │  └─ README.md
│  ├─ typescript-config
│  │  ├─ base.json
│  │  ├─ nextjs.json
│  │  ├─ package.json
│  │  └─ react-library.json
│  └─ ui
│     ├─ eslint.config.js
│     ├─ package.json
│     ├─ src
│     │  ├─ button.tsx
│     │  ├─ card.tsx
│     │  └─ code.tsx
│     ├─ tsconfig.json
│     └─ turbo
│        └─ generators
│           ├─ config.ts
│           └─ templates
│              └─ component.hbs
├─ README.md
├─ turbo.json
├─ vercel.json
└─ yarn.lock

```