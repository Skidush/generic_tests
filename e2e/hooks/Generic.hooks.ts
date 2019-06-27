import { BeforeAll, Before, After, setDefaultTimeout } from 'cucumber';
import { browser } from 'protractor';
import * as request from 'request';



BeforeAll(() => {
    browser.waitForAngularEnabled(false);
    setDefaultTimeout(60 * 10000);
})

Before(async (scenario) => {
    console.log('\n\n===============================================================');
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    console.log('SCENARIO: ' + scenario.pickle.name);
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    console.time('\nScenario done in');


    request.get('http://localhost:4200/api/login?user=dev&pass=test', {
        headers: {
            ['Accept']:'application/json'
        }
    }, (err, res, body) =>{
        const auth = res.headers["set-cookie"][0].split(';')[0];
        request.get('http://localhost:4200/api/item/6ed194e1-46d5-4149-b458-60454eaaa001/master', {
            headers: {
                ['Accept']:'application/json',
                ['Cookie']: auth
            }
        }, (err, res, body)=>{
            console.log(body)
            console.log(res.headers["user-agent"])
        })
    })


    // request(, (e,r,b)=>{
    //     console.log(r.body)
    // })
    // await get('http://localhost:4200/api/login?user=dev&pass=test', {
    //     headers: {
    //         ['Accept']:'application/json'
    //     }
    // }, async login => {
    //     if(login.statusCode === 200){
    //         console.log(login.headers["set-cookie"][0])
    //         const auth = login.headers["set-cookie"][0].split(';')[0];
    //         console.log(auth);

    //         await get('http://localhost:4200/api/item/6ed194e1-46d5-4149-b458-60454eaaa001/master',{
    //             headers: {
    //                 ['Cookie']: auth,
    //                 ['Accept']:'application/json'
    //             }
    //         }, response =>{
    //             response.on('data', buffer=>{
    //                 // const data = new String(buffer);
    //                 const data = JSON.parse(buffer.toString())
    //                 console.log(data)

    //             });
    //         })
    //     }



    // })
    // request.setHeader('Accept', 'application/json')
    // await request.on('data', buffer=>{
    //     const data = new String(buffer);
    //     console.log(data)
    // })



    // await get('http://localhost:4200/api/login?user=dev&pass=test',
    // { headers:
    // , (response) =>{
    //     // console.log(response);
    //     // get('http://localhost:4200/api/domain/hmws', response =>{
    //         // const auth = response.headers["set-cookie"][0].split[';'][0];
    //         // console.log(response.read())

    //         // console.log();
    //         // response.headers
    //     // });
    //     response.once('data', (data) =>{
    //         const d = new String(data);
    //         console.log(d)
    //     })
    // });




    await browser.sleep(10000);
    throw "throw away";
});

After(() => {
    // Reset to default
    browser.params.itemDetails = {};
    //TODO Clean up of created items in the reporting DB and cristal
    console.timeEnd('\nScenario done in');
    console.log('===============================================================');
});