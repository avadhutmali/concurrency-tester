Neutralino.init();

async function runConcurrencyTest(totalRequests = 1000) {
    const statusDiv = document.getElementById('status');
    statusDiv.innerHTML = `Running ${totalRequests} concurrent native requests... Please wait.`;

    const command = 'echo Hello'; 
    const promises = [];
    
    const startTime = performance.now();

    for (let i = 0; i < totalRequests; i++) {
        promises.push(Neutralino.os.execCommand(command));
    }

    try {
        await Promise.all(promises);
        
        const endTime = performance.now();
        const totalTimeMs = (endTime - startTime).toFixed(2);
        const requestsPerSecond = ((totalRequests / (endTime - startTime)) * 1000).toFixed(2);

        statusDiv.innerHTML = `
            <strong>Benchmark Complete!</strong><br><br>
            Payload: ${totalRequests} OS commands<br>
            Time Taken: ${totalTimeMs} ms<br>
            Throughput: ${requestsPerSecond} requests/sec
        `;
    } catch (error) {
        statusDiv.innerHTML = `<span style="color: red;">Test Failed: ${error.message}</span>`;
    }
}

Neutralino.events.on("ready", () => {
    Neutralino.window.setSize({ width: 800, height: 600 });
    runConcurrencyTest(1000); 
});