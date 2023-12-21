const {SearchUserRequest, SearchUserResponse, UserRequest, UrlRequest, NumRequest} = require('./greet_pb');
const {GreeterClient} = require('./greet_grpc_web_pb');

var client = new GreeterClient('http://localhost:5000');

var searchUserCall = new SearchUserRequest();

document.getElementById('btn').addEventListener('click',()=>{
    searchUserCall.setName(document.getElementById('q').value)

    client.searchUser(searchUserCall, {}, (err, response) => {
        document.getElementById('result').innerHTML = `Your Search Result: ${response}`;
    });
})

var getUserCall = new UserRequest();
getUserCall.setStatus(true);
client.getUsers(getUserCall, {}, (err, response) => {
    console.log(response);
});


document.getElementById('btn2').addEventListener('click',()=>{
    var getUrlContent = new UrlRequest();
    getUrlContent.setUrl(document.getElementById('qu').value);
    client.addUrl(getUrlContent, {}, (err, response) => {
        document.getElementById('result2').innerHTML = `URL: ${response}`;
    });
})

document.getElementById('btn3').addEventListener('click',()=>{
    var getSumContent = new NumRequest();
    getSumContent.setNumber(document.getElementById('n').value);
    client.addNum(getSumContent, {}, (err, response) => {
        document.getElementById('result3').innerHTML = `Sum: ${response}`;
    });
})
