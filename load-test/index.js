import fetch from "node-fetch";
import util from 'util'
import child_process from 'child_process'
const exec = util.promisify(child_process.exec);

(async () => {
  const numberOfIterations = 100;
  const ip = (await exec('minikube ip')).stdout.split('\n')[0]
  const errCounter = 0;
  const start = Date.now();
  let duration = 0

  const promises = Array.from({ length: numberOfIterations }).map(async (_, i) => {
    const res = await fetch(`http://${ip}/api/root-service`);
    if (!res.ok) {
      errCounter++;
      console.log(
        `request ${i + 1} failed with status ${res.status} (${
          (Date.now() - start) / 1000
        })`
      );
    } else {
      console.log(`request ${i + 1} success (${(Date.now() - start) / 1000})`);
    }
    duration += (Date.now() - start) / 1000
  });

  await Promise.all(promises)

  console.log(
    `average duration: ${
      (duration) / numberOfIterations
    } seconds`
  );
  console.log(`${errCounter} from ${numberOfIterations} requests failed`);
})();
