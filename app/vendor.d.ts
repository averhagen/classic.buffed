declare module NodeJS {
    interface Global {
        test_env: {
            __MONGO_URI__: string,
            __MONGO_DB_NAME__: string
        }
    }
}