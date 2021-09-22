import { Cluster } from 'puppeteer-cluster';
import { ConcurrencyImplementationClassType } from 'puppeteer-cluster/dist/concurrency/ConcurrencyImplementation';
import { LaunchOptions } from 'puppeteer/lib/cjs/puppeteer/node/LaunchOptions';
import { DeepPartial } from './utils';

const GOOGLE_URL = 'https://www.google.com';
const WIKIPEDIA_URL = 'https://www.wikipedia.org';
const GITHUB_URL = 'https://github.com/';

export const URLS = {
    google: GOOGLE_URL,
    wikipedia: WIKIPEDIA_URL,
    github: GITHUB_URL
}

const SCREENSHOT_DIR = 'screenshots';

export const DIRECTORIES = {
    screenshot: SCREENSHOT_DIR
}

const CONCURRENCY = Cluster.CONCURRENCY_CONTEXT;
const MAX_CONCURRENCY = 2;

interface CLUSTER_MODEL {
    concurrency: number | ConcurrencyImplementationClassType;
    maxConcurrency: number;
    workerCreationDelay: number;
    puppeteerOptions: LaunchOptions;
    perBrowserOptions: LaunchOptions[] | undefined;
    monitor: boolean;
    timeout: number;
    retryLimit: number;
    retryDelay: number;
    skipDuplicateUrls: boolean;
    sameDomainDelay: number;
    puppeteer: any;
}

export type CLUSTER_CONFIG = DeepPartial<CLUSTER_MODEL>;

export const DEFAULT_CLUSTER_CONFIG: CLUSTER_CONFIG = {
    concurrency: CONCURRENCY,
    maxConcurrency: MAX_CONCURRENCY
}
