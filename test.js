const { exec } = require('child_process');
const string = "hey bye there";

// Execute "echo hello world" using exec
exec(`echo ${string}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout:${stdout}`);
});
