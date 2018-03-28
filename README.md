# wolkenkit-boards

wolkenkit-boards is a tool for collaboratively organizing notes.

It allows you to mount public and private boards and attach notes and images to them. Its backend is powered by [wolkenkit](https://www.wolkenkit.io/).

## What is wolkenkit?

> wolkenkit is a CQRS and event-sourcing framework for JavaScript and Node.js. wolkenkit uses an event-driven model based on DDD to setup an API for your business in no time. This way, wolkenkit bridges the language gap between your domain and technology.
>
> [wolkenkit.io](https://www.wolkenkit.io/)

For more details on wolkenkit see the [wolkenkit documentation](https://docs.wolkenkit.io).

## Preparing the application

As wolkenkit-boards uses authentication, you first need to setup an identity provider. In this section we are going to configure [Auth0](https://auth0.com), but you can use any identity provider - as long as it supports OpenID Connect.

### Setting up the identity provider

Now, create an account at Auth0. For your first steps, the free plan is fine, so there is no need to add your credit card right now.

Once you have created your account you need to register a client application that represents your instance of wolkenkit-boards:

- Login to Auth0, which takes you to the dashboard.
- Click `Clients` in the navigation.
- Click `Create client`.
- Select `Single Page Applications`.
- Add `http://local.wolkenkit.io:8080/` to the list of `Allowed Callback URLs`.

### Getting the required information

In the view that shows your client, you can find the `Client ID`. Copy its value, you will need it later.

Additionally, you need to get the certificate for your client:

- In the `Clients` view, scroll down, and click `Show Advanced Settings`.
- Scroll to the `Certificates` section and copy the contents of the `Signing Certificate` field.
- Paste the copied content into the `server/keys/auth0/certificate.pem` file.

## Running the application

To run a wolkenkit application, you first need to install wolkenkit. For this, see the installation guide for [macOS](https://docs.wolkenkit.io/latest/getting-started/installing-wolkenkit/installing-on-macos/), [Linux](https://docs.wolkenkit.io/latest/getting-started/installing-wolkenkit/installing-on-linux/), [Windows](https://docs.wolkenkit.io/latest/getting-started/installing-wolkenkit/installing-on-windows/), or [Docker Machine](https://docs.wolkenkit.io/latest/getting-started/installing-wolkenkit/installing-using-docker-machine/).

### Running the backend

Before you can run the backend, you need to adjust the `identityProvider` section in the application's `package.json` file. Set its `name` property to the domain of your Auth0 account, so that it looks like this:

```json
"identityProvider": {
  "name": "https://<username>.eu.auth0.com/",
  "certificate": "/server/keys/auth0"
}
```

Finally, now it's time to run the backend. For that, run the `start` command using the wolkenkit CLI from inside the application's directory:

```shell
$ wolkenkit start
```

### Running the frontend

Once the backend is running you are almost ready to run the frontend. First, change to the `client` directory and install any missing dependencies:

```shell
$ cd ./client
$ npm install
```

As roboter is used for build automation it is recommended to install roboter-cli globally. This way you can easily run roboter by simply typing `bot`. To install roboter-cli, run the following command:

```shell
$ npm install -g roboter-cli
```

Then, run `bot` and set the environment variables `AUTH_IDENTITY_PROVIDER_URL` and `AUTH_CLIENT_ID` accordingly:

```shell
$ AUTH_IDENTITY_PROVIDER_URL=https://<username>.eu.auth0.com/authorize AUTH_CLIENT_ID=<clientid> bot serve
```

After a short time, the frontend is running at `http://local.wolkenkit.io:8080/`. Point your browser to this url, identify yourself, and start to mount boards and pin some posts!

## License

Copyright (c) 2015-2018 the native web.

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with this program. If not, see [GNU Licenses](http://www.gnu.org/licenses/).
