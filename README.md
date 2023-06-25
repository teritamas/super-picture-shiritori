# OASYS TOKYO HACKJAM

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## GCP の ServiceAccountKey の暗号化

GCP からダウンロードした秘密鍵を下記のコマンドで暗号化する。

```bash
openssl enc -aes-256-cbc -a -in ./keys/service-account-key.json -out encrypted.txt -k passphrase -p

salt=xxxxxxxxxxxxxxxx
key=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
iv =xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

出力された key, iv を それぞれ .env に設定する。

```bash
DECRYPT_KEY={出力されたkey}
DECRYPT_IV={出力されたiv}
```
