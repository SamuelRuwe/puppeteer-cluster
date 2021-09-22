import { CLUSTER_CONFIG, DEFAULT_CLUSTER_CONFIG } from './config';
import { Cluster } from 'puppeteer-cluster';

export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
}

const urlToFile = (url: string) => url.replace(/[^a-zA-Z]/g, '_');
export const createPngPath = (directory: string) => (url: string) => `${directory}/${urlToFile(url)}.png`;

export const createCluster = async (clusterOpts?: CLUSTER_CONFIG) => {
    const opts = clusterOpts ?? DEFAULT_CLUSTER_CONFIG;
    return Cluster.launch(opts);
}
