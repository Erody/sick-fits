import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';

const databaseUrl =
    process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits';

const sessionConfig = {
    maxAge: 60 * 60 * 24 * 30, // how long should they signed in
    secret: process.env.COOKIE_SECRET,
};

export default config({
    server: {
        cors: {
            origin: [process.env.FRONTEND_URL],
            credentials: true,
        },
    },
    db: {
        adapter: 'mongoose',
        url: databaseUrl,
        // TODO: Add data seeding here
    },
    lists: createSchema({
        // Schema items go in here
    }),
    ui: {
        // TODO: change this for roles
        isAccessAllowed: () => true,
    },
    // TODO: add session values here
});
