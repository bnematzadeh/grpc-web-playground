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

function getUser(call, callback){
    var first_name = call.request.user.first_name;
    var last_name = call.request.user.last_name;
    var id = 1;
    var email = "test@gmail.com"

    callback(null, {result: {first_name, last_name, id, email}})
}


function main(){
    const server = new grpc.Server()
    server.addService(userPackageDefinition.UserService.service, {
        getUser: getUser
    })

    server.bind("127.0.0.1:50051",grpc.ServerCredentials.createInsecure())
    server.start()
    console.log("Server is running on port 50051");
}

main()

