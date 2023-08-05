/* Connection utilities using singleton pattern */

import pgPromise from 'pg-promise';
import { StorageClient } from '@supabase/storage-js';

function createSingleton<T>(name: string, create: () => T): T {
    const s = Symbol.for(name);
    let scope = (global as any)[s];
    if (!scope) {
        scope = {...create()};
        (global as any)[s] = scope;
    }
    return scope;
}

// Database connection
const pgp = pgPromise({});

interface IDatabaseScope {
    db: pgPromise.IDatabase<any>;
    pgp: pgPromise.IMain;
}

export function getDB(): IDatabaseScope {
    return createSingleton<IDatabaseScope>('database', () => {
        return {
            db: pgp(process.env.DATABASE_URL as string),
            pgp
        };
    });
}

// Bucket connection
interface IStorageClient {
    storageClient: StorageClient;
}

export function getStorage() {
    return createSingleton<IStorageClient>('storage',() => {
        return {
            storageClient: new StorageClient(process.env.STORAGE_URL as string, {
                apikey: process.env.SERVICE_KEY as string,
                Authorization: `Bearer ${process.env.SERVICE_KEY}`,
            })
        };
    });
}

