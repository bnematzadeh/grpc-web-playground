# Vulnerable gRPC-Web Application for Bug Hunters
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
