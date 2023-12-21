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

// Create the package definition
const userPackageDefinition = grpc.loadPackageDefinition(userProtoDefinition).user;

const client = new userPackageDefinition.UserService("localhost:50051",
    grpc.credentials.createInsecure()
)

function getUserInfo(){
    var request = {
        user: {
            first_name: "Borna",
            last_name: "Nematzadeh"
        }
    }

    client.getUser(request, (error, response) => {
        if(!error){
            console.log("Server Response:", response.result)
        }else{
            console.error(error)
        }
    })
}

function callGetManyUsers(){

    var request = {
        user: {
            first_name: "Borna"
        }
    }

    var call = client.getManyUsers(request, () => {});
    call.on("data", response => {
        console.log("Server Streaming Response: ", response.result);
      });

    call.on("end", () => {
        console.log("Streaming Ended!");
      });

}

function callLongMessage(){
    var request = {
        user: {
            first_name: "Borna",
            last_name: "Nematzadeh"
        }
    }


  var call = client.LongMessage(request, (error, response) => {
    if(!error){
        console.log("Server Response:", response.result)
    }else{
        console.error(error)
    }
})

  let count = 0,
    intervalID = setInterval(function() {
    console.log("Sending message " + count);

      console.log(request.user.first_name)
      call.write(request);
      if (++count > 3) {
        clearInterval(intervalID);
        call.end();
      }
    }, 1000);
}

function main(){
    // getUserInfo()
    // callGetManyUsers()
    callLongMessage()
}

main()