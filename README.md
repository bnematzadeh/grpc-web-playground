# A Vulnerable gRPC-Web Application for Bug Hunters
gRPC is an open-source, high-performance Remote Procedure Call (RPC) framework developed by Google. It enables efficient communication between client and server applications in a wide range of programming languages by utilizing Protocol Buffers (protobuf) for service definition and message serialization. The main goal of this repo is to learn about the gRPC communication patterns and hunt for vulnerabilities in the gRPC-Web app to improve your hunting skills

# gRPC Communication Patterns

- [Unary](https://github.com/bnematzadeh/grpc-web-playground/tree/main/1_Unary)
- [Server Streaming](https://github.com/bnematzadeh/grpc-web-playground/tree/main/2_Server%20Streaming)
- [Client Streaming](https://github.com/bnematzadeh/grpc-web-playground/tree/main/3_Client%20Streaming)
- [Bi-Directional](https://github.com/bnematzadeh/grpc-web-playground/tree/main/4_Bi-Directional)

# Vulnerable gRPC-Web Application

![Logo](https://github.com/bnematzadeh/grpc-web-playground/blob/main/5_gRPC-web/grpc-web.png)

I developed a vulnerable gRPC-Web application with the following vulnerabilities:

- Injection
- Information Disclosure
- SSRF
- Integer Overflow

# How to Run

Clone the repository:
```sh
git clone https://github.com/bnematzadeh/vulnerable-rest-api
```

Open the `grpc-web` folder in VSCode.

Open the gRPC server file `program.cs`.

Run everything using `F5`.

If you encounter errors like:
```sh
grpc-web-playground\5_gRPC-web\server\server.csproj : error NU1101: Unable to find package Grpc.AspNetCore. No packages exist with this id in source(s): Microsoft Visual Studio Offline Packages
grpc-web-playground\5_gRPC-web\server\server.csproj : error NU1101: Unable to find package Grpc.AspNetCore.Server.Reflection. No packages exist with this id in source(s): Microsoft Visual Studio Offline Packages
grpc-web-playground\5_gRPC-web\server\server.csproj : error NU1101: Unable to find package Grpc.AspNetCore.Web. No packages exist with this id in source(s): Microsoft Visual Studio Offline Packages
```

Open a command prompt and run this command to set the NuGet source for downloading the packages:
```sh
dotnet nuget update source nuget.org --source https://api.nuget.org/v3/index.json --proxy "http://proxyserver:port"
```

Run the project again using `F5`.

For running the client, just open `index.html` file and run it over `Live Server` in VSCode.
