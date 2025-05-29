# Slack Bolt.js Template
A basic and dynamic template for Bolt.js apps using Typescript and pnpm.

## Installation
1. Clone the template:
```sh
$ git clone https://github.com/DaInfLoop/boltjs-template.git
```

2. Rename `.env.example` to `.env` and fill in the necessary details:
```ini
# NODE_ENV can be either development or production. Make sure to change this before you ship your bot!
NODE_ENV=development

# What port do you want the app to listen on?
PORT=3000

# Your app token usually starts with "xoxb-...."
APP_TOKEN=""

# Your Slack App signing secret.
SIGNING_SECRET=""

### vvv Only really matter when NODE_ENV is "development"! vvv ###

# Your ngrok API token, or "NONE" if you want to disable ngrok functionality
NGROK_TOKEN=""

# A configured ngrok domain to proxy via, this is optional!
NGROK_DOMAIN=""
```

3. Install dependencies:
```sh
$ pnpm i
```

4. The template is now set up! 

Create files in `src/<interaction type>` following the templates in each folder and go code on!

Your file name should be `<command/action/view/event/... name>.ts` in order for it to be loaded properly.

## License
This template is licensed under the MIT License. A copy of the license can be viewed at [LICENSE](/LICENSE).