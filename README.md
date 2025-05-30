# Hack Club Parliament Vote Bot
A Slack bot that handles voting for Hack Club's mock parliament.

## Installation
1. Clone the repository:
```sh
$ git clone https://github.com/hcgov/parliament-vote.git
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

### Parliament Vote specific variables ###

CHAMBER_CHANNEL_ID="C0000000000"
LIST_ID="F0000000000"
FETCH_WORKFLOW="https://hooks.slack.com/triggers/T0266FRGM/..."
EDIT_WORKFLOW="https://hooks.slack.com/triggers/T0266FRGM/..."
```

3. Install dependencies:
```sh
$ pnpm i
```

4. Create a Postgres database and edit `postgres.ts` with information about said database. Create a table called `votes` (which can easily be done by copy-pasting this into a Postgres REPL like `psql`):
```sql
CREATE TABLE votes (
    list_row_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    seats INTEGER NOT NULL,
    in_favour BOOLEAN NOT NULL,

    UNIQUE (list_row_id, user_id)
);
```

5. Edit `config.ts` and add workflow URLs for:
    - fetching from the "Bills and Propositions" list
    - editing the "Bills and Propositions" list

    For testing cases, you can message in the `#dosem` channel on the Hack Club Slack and get a copy of the workflows for use on a dummy list.

6. The bot should now be set up! 

## License
This repository and the [underlying template](https://github.com/DaInfLoop/boltjs-template) is licensed under the MIT License. A copy of the license can be viewed at [LICENSE](/LICENSE).
