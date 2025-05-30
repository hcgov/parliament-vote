// Used for workflow responses. It's easier to use EventEmitters than create a new Postgres table as workflows are just meant to take a second or two.
import { EventEmitter } from "node:events";

export default new EventEmitter(); 