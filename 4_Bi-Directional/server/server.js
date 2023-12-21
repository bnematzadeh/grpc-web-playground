const path = require('path')
const protoLoader = require('@grpc/proto-loader')
const grpc = require('grpc')

// grpc service definition
const userProtoPath = path.join(__dirname, "..", "Protos", "user.proto")
const userProtoDefinition = protoLoader.loadSync(userProtoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
})


async function sleep(interval) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), interval);
  });
}

// Create the package definition
const userPackageDefinition = grpc.loadPackageDefinition(userProtoDefinition).user;

function getUser(call, callback){
    var first_name = call.request.user.first_name;
    var last_name = call.request.user.last_name;
    var id = 1;
    var email = "test@gmail.com"

    callback(null, {result: {first_name, last_name, id, email}})
}


function getManyUsers(call, callback){
    var firstName = call.request.user.first_name;

    let count = 0,
    intervalID = setInterval(function() {

    call.write({result: firstName});
    if (++count > 7) {
        clearInterval(intervalID);
        call.end();
      }
    }, 1000);
}

function longMessage(call, callback){
    call.on("data", request => {
        console.log(request.user.first_name)
        var fullName =
        request.user.first_name +
          " " +
          request.user.last_name;

        console.log("Hello " + fullName);
      });

      call.on("error", error => {
        console.error(error);
      });

      call.on("end", () => {
        callback(null, {result: "Client Streaming Ended!"})
      });
}

 async function messageToEveryone(call, callback){
  call.on("data", response => {
    var fullName =
      response.user.first_name;

    console.log("Hello " + fullName);
  });

  call.on("error", error => {
    console.error(error);
  });

  call.on("end", () => {
    console.log("Server The End...");
  });

  for (var i = 0; i < 10; i++) {

    var request = {
      user: {
        first_name: 'ADMIN'
      }
    }

    call.write({result: request.user.first_name});
    await sleep(1000);
  }

  call.end();
}

function main(){
    const server = new grpc.Server()
    server.addService(userPackageDefinition.UserService.service, {
        getUser: getUser,
        getManyUsers: getManyUsers,
        longMessage: longMessage,
        messageToEveryone: messageToEveryone
    })

    server.bind("127.0.0.1:50051",grpc.ServerCredentials.createInsecure())
    server.start()
    console.log("Server is running on port 50051");
}

main()

