const express = require("express");
const { exec } = require('child_process');
const cors = require('cors')

const app = express();

app.use(cors())


app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello world");
})

app.post('/compile', (req, res) => {

    const code = req.body;



    const test = 'test.cpp';
    require('fs').writeFileSync(test, JSON.parse(code.code));

    exec(`g++ test.cpp -o test && test`, (error, stdout, stderr) => {
        
        if (error) {
            console.error(`exec error: ${error}`);
            res.json({exec_error : error});
            // return;
        }
        
        res.json({stdout : stdout});

        // console.log(`stdout: ${stdout}`);
        // console.error(`stderr: ${stderr}`);
        // res.send(`stderr: ${stderr}`);
    });

})


app.listen(5000, () => {
    console.log("Server is running");
})




// exec(`javac HelloWorld.java`, (error, stdout, stderr) => {
// // exec(`g++ test.cpp -o test && test`, (error, stdout, stderr) => {
//     if (error) {
//           console.error(`exec error: ${error}`);
//           return;
//         }
//         console.log(`stdout: ${stdout}`);
//         console.error(`stderr: ${stderr}`);
//       });
