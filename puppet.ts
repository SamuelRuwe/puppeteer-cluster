const {Cluster} = require('puppeteer-cluster');

(async () => {
// Create a cluster with 2 workers
    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_BROWSER,
        maxConcurrency: 3,
        monitor: true, //true,
        puppeteerOptions: {

            // args: [
            //     "--proxy-server=http://gate.smartproxy.com:7000",
            //     "--incognito",
            // ],
            headless: false,
            sameDomainDelay: 1000,
            retryDelay: 3000,
            workerCreationDelay: 3000,
            ignoreDefaultArgs: ['--enable-automation']
        }
    });
    // Event handler to be called in case of problems
    cluster.on('taskerror', (err, data, willRetry) => {
        if (willRetry) {
            console.warn(`Encountered an error while crawling ${data}. ${err.message}\nThis job will be retried`);
        } else {
            console.log(`Error crawling ${data}: ${err.message}`);
        }

    });
    // Define a task
    // await cluster.task(async ({page, data: url}) => {
    //     extract(url, page); //call the extract
    // });

    //task
    const extract = async ({page, data: dataJson}) => {
        // page.setExtraHTTPHeaders({headers})

        // await page.authenticate({
        //     username: 'sp39864586',
        //     password: 'Test123'
        // });

        //Randomized Delay
        //await delay(2000 + (Math.floor(Math.random() * 998) + 1));
        const response = await page.goto(dataJson.url, {waitUntil: 'domcontentloaded'});

        // await browser.close();
    }

    var dataJson = {
        url: 'www.example.com'
    };

    cluster.queue(dataJson, extract);

    // Shutdown after everything is done
    await cluster.idle();
    await cluster.close();
})();
