import pgPromise from 'pg-promise';

function createSingleton<T>(name: string, create: () => T): T {
    const s = Symbol.for(name);
    let scope = (global as any)[s];
    if (!scope) {
        scope = {...create()};
        (global as any)[s] = scope;
    }
    return scope;
}

const pgp = pgPromise({});

interface IDatabaseScope {
    db: pgPromise.IDatabase<any>;
    pgp: pgPromise.IMain;
}

export function getDB(): IDatabaseScope {
    return createSingleton<IDatabaseScope>('connector', () => {
        return {
            db: pgp(process.env.DATABASE_URL as string),
            pgp
        };
    });
}