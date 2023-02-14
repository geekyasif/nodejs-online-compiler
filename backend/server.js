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

    try{

            const lang = req.body.lang;
            const input = req.body.input;
            const code = req.body.code;
        
        
            let filename;
            let compiler;
        
            if( lang == 'c' || lang == 'cpp'){
                filename = 'main.cpp';
                compiler = `g++ ${filename} -o main && main`
            }
            else if(lang == 'java'){
                filename = 'HelloWorld.java'
                compiler = `javac ${filename}`
            }
            else if( lang == 'python'){
                filename = 'script.py';
                compiler = `python ${filename}`
            }else if(lang == 'js'){
                filename = 'app.js';
                compiler = `node ${filename}`
            }
        
        
            require('fs').writeFileSync(filename , JSON.parse(code));
        
            exec(compiler, (error, stdout, stderr) => {
                
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
        
        
            }catch(error){
                console.log(error)
                res.json({error: error})
            }
   

})


app.listen(5000, () => {
    console.log("Server is running");
})

// ------------------------------------------------


// exec(`javac HelloWorld.java`, (error, stdout, stderr) => {
// // exec(`g++ test.cpp -o test && test`, (error, stdout, stderr) => {
//     if (error) {
//           console.error(`exec error: ${error}`);
//           return;
//         }
//         console.log(`stdout: ${stdout}`);
//         console.error(`stderr: ${stderr}`);
//       });


// const express = require("express");
// const { exec } = require('child_process');
// const cors = require('cors')

// const app = express();

// app.use(cors())


// app.use(express.json());

// app.get("/", (req, res) => {
//     res.send("Hello world");
// })

// app.post('/compile', (req, res) => {

//     try{

//     const lang = req.body.lang;
//     const input = req.body.input;
//     const code = req.body.code;


//     // let filename  = 'main.cpp';
//     // let compiler;

//     // if( lang == 'c' || lang == 'cpp'){
//     //     filename = 'main.cpp';
//     //     compiler = `g++ ${filename} -o main && main`
//     // }
//     // else if(lang == 'java'){
//     //     filename = 'HelloWorld.java'
//     //     compiler = `javac ${filename}`
//     // }
//     // else if( lang == 'python'){
//     //     filename = 'script.py';
//     //     compiler = `python ${filename}`
//     // }else if(lang == 'js'){
//     //     filename = 'app.js';
//     //     compiler = `node ${filename}`
//     // }


//     require('fs').writeFileSync('main.cpp' , JSON.parse(req.body.code));

//     exec(`g++ main.cpp -o main && main`, (error, stdout, stderr) => {
        
//         if (error) {
//             console.error(`exec error: ${error}`);
//             res.json({exec_error : error});
//             // return;
//         }
        
//         res.json({stdout : stdout});

//         // console.log(`stdout: ${stdout}`);
//         // console.error(`stderr: ${stderr}`);
//         // res.send(`stderr: ${stderr}`);
//     });


//     }catch(error){
//         console.log(error)
//         res.json({error: error})
//     }

// })


// app.listen(5000, () => {
//     console.log("Server is running");
// })






// // For Python code 
// // exec('python path/to/script.py', (error, stdout, stderr) => {
// //     if (error) {
// //       console.error(`exec error: ${error}`);
// //       return;
// //     }
// //     console.log(`stdout: ${stdout}`);
// //     console.error(`stderr: ${stderr}`);
// //   });


// // for javascript code 
// // exec(`javac HelloWorld.java`, (error, stdout, stderr) => {
// //     if (error) {
// //       console.error(`exec error: ${error}`);
// //       return;
// //     }
// //     console.log(`stdout: ${stdout}`);
// //     console.error(`stderr: ${stderr}`);
// //   });


// // exec(`node ${fileName}`, (error, stdout, stderr) => {
// //     if (error) {
// //       console.error(`exec error: ${error}`);
// //       return;
// //     }
  
// //     console.log(`stdout: ${stdout}`);
// //     console.error(`stderr: ${stderr}`);
// //   });
