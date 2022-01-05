import { exec } from "child_process";
import { createInterface } from "readline";

export function input(text = ""): Promise<string> {
    return new Promise((res, rej) => {
        const RL = createInterface({
            input: process.stdin,
            output: process.stdout
        });
        if (text != null || text != "") process.stdout.write(text);
        RL.on("line", (answer) => {
            RL.close();
            res(answer);
        })
    })
}

export function aptInstall(packageName: string): void {
    console.log("You may have to input root password on prompt");
    exec(`sudo apt-get install ${packageName}`, (_, out, err) => {
        console.log(out);
        if (err) throw err;
    });
}

export function command(cmd: string) {
    exec(cmd, (_, out, err) => {
        console.log(out);
        if (err) console.log(err);
    })
}
// process.exec("uname -r", (error, stdout, stderr) => {
//     if (error) {
//         console.error(error.message);
//         return;
//     }
//     if (stderr) {
//         console.error(stderr);
//         return;
//     }
//     console.log(`uname output: ${stdout}`);
// });
