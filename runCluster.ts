import { URLS } from './config';
import { CLUSTER_TASKS } from './clusterTasks';

const {google, wikipedia, github} = URLS;
const urls = [google, wikipedia, github];
const {screenshotCluster} = CLUSTER_TASKS;

screenshotCluster(urls);
