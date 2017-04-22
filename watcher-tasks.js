const exec = require('child_process').exec;

// generate docs
exec('npm run docs-generator', (err, stdout, stderr)=> {
    console.log(stdout);
    console.log(stderr);
});

// start mock server
exec('npm run mock-server', (err, stdout, stderr)=> {
    console.log(stdout);
    console.log(stderr);
});
