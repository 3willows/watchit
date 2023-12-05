const { exec } = require('child_process');
const chalk=require("chalk"); 
// this is not supported in the latest version of chalk
// look into dynamic import later

const string = "hey there";

let proc;

setInterval((() => {
  proc = exec(`echo ${string}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(chalk.blue(`proc id = ${proc.pid} stdout: ${stdout}`));
    // checked that this is the correct pid by killing it in a separate terminal
  }), 1

}), 1000);