declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            PORT?: string;
            APP_TOKEN: string;
            SIGNING_SECRET: string;

            NGROK_TOKEN?: string;
            NGROK_DOMAIN?: string;

            CHAMBER_CHANNEL_ID: string;
            LIST_ID: string;
            FETCH_WORKFLOW: string;
            EDIT_WORKFLOW: string;
        }
    }
}

export { }