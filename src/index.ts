import * as chalk from "chalk";
import * as process from "child_process";
import * as figlet from "figlet";
import { aptInstall, input } from "./api";
import * as inq from "inquirer";
import { Script } from "./script";

(async () => {
    let pull: Script = await import(`${__dirname}/scripts/i3.js`);

    //@ts-expect-error
    let i3 = new pull();
    i3.install();
    // inq.prompt([{
    //     type: "checkbox",
    //     message: "Select дьоенгер sosig",
    //     name: "toppings",
    //     choices: [
    //         new inq.Separator("CUM"),
    //         { name: "meso", checked: true },
    //         "ketchuk",
    //         "kartofki",
    //         {
    //             name: "majoneza", disabled(ans) {
    //                 console.log(ans);
    //                 // if (ans.has("kartofki") > -1) return false;
    //                 // else return "You need karfel"
    //                 return false;
    //             }
    //         },
    //         "krastavica koqto sadarja 98% procent voda",
    //         "nekav domat tam"
    //     ],
    //     validate(ans) {
    //         if (ans.length < 1) return 'You must choose at least one topping!!1!';
    //         return true;
    //     }
    // }]).then((answers) => {
    //     console.log(answers.toppings.join(" "));
    // })
})();

// process.exec("sudo apt-get install gikjdfxghbakdljft", (err, stdout, stderr) => {
//     if (err) console.error(err.message);
//     console.log(`stdout: ${stdout}`);
//     console.log(`stderr: ${stderr}`);
// });

// console.log(figlet.textSync("uwu"))

// console.log(chalk.red("uwu") + " uwu")
