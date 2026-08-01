import { createApp } from '../src/main';

let app: any;

export default async function handler(req: any, res: any) {
    if (!app) {
        const nest = await createApp();
        app = nest.getHttpAdapter().getInstance();
    }

    return app(req, res);
}