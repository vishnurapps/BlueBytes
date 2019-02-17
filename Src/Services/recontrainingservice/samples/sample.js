// const http = require('http')

// const server = http.createServer((req, res)=>{
//     if(req.url = '/'){
//         console.log("Called");
//         res.write('Hello world');
//         res.end();
//     }

//     // if(req.url = '/api'){
//     //     res.write(JSON.stringify([1,2,3]));
//     //     res.end();
//     // }    
// });
// server.listen(3000)
// console.log("port")

// Use python shell
const {PythonShell} = require("python-shell")

var myPythonScriptPath = 'C:\Anoop\StudyTools\2.WorkFolders\Hackathon\BlueBytes\Src\Services\recontrainingservice\samples\sample1.py';
var myPythonScriptPath2 = 'sample2.py';


//var pyshell = new PythonShell(myPythonScriptPath);
//var pyshell2 = new PythonShell(myPythonScriptPath2);

/************WITHOUT ARG********* */
// pyshell.on('message', options, function (message) {
//     // received a message sent from the Python script (a simple "print" statement)
//     console.log(message);
// });

// // end the input stream and allow the process to exit
// pyshell.end(function (err) {
//     if (err){
//         throw err;
//     };

//     console.log('finished');
// });

/************WITH ARG********* */
 var options = {
     mode: 'text',
     args: ['my First Argument', 'My Second Argument', '--option=123']
 };

 PythonShell.run(myPythonScriptPath, options, function (err, results) {
     if (err) throw err;
     // results is an array consisting of messages collected during execution
     console.log('results: %j', results);
 });


/************PASSING ARG FROM NODE********* */

/*pyshell2.send(JSON.stringify([1,2,3,4,5]));

pyshell2.on('message', function (message) {
    // received a message sent from the Python script (a simple "print" statement)
    console.log(message);
});

// end the input stream and allow the process to exit
pyshell2.end(function (err) {
    if (err){
        throw err;
    };

    console.log('finished');
});*/