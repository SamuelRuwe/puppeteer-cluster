import { createCluster, createPngPath } from './utils';
import { CLUSTER_CONFIG, DIRECTORIES } from './config';
import { TaskFunction } from 'puppeteer-cluster/dist/Cluster';

const {screenshot} = DIRECTORIES;

export const clusterScreenshot = (directory: string) => {
    const pathPartial = createPngPath(directory);
    return async ({page, data: url}) => {
        await page.goto(url);
        const path = pathPartial(url);
        await page.screenshot({path});
    }
}

const screenshotTask = clusterScreenshot(screenshot);

const createClusterJob = (task: TaskFunction<any, any>) => {
    return async (urls: Array<String>, clusterOpts?: CLUSTER_CONFIG) => {
        if (urls.length < 1) throw new Error(`urls length must be greater than 0`);
        const cluster = await createCluster(clusterOpts);
        await cluster.task(task);

        for (const url of urls) {
            await cluster.queue(url);
        }

        await cluster.idle();
        await cluster.close();
    }
}

const screenshotCluster = createClusterJob(screenshotTask);

export const CLUSTER_TASKS = {
    screenshotCluster
}
