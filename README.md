# Welcome to your CDK TypeScript project!

This is a blank project for TypeScript development with CDK.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Version
- Node version: v14.19.0
- npm version: 8.5.0
- cdk version: 2.12.0

## Source structure

```
├── bin
│   ├── app.js // Khởi tạo đối tượng CloudFormation Stack
├── lib
│   ├── app
│   │   ├── **/*.ts // Khai báo các aws services
│   ├── infra
│   │   ├── **/*.ts // Khai báo các aws services
│   ├── app-stack.ts // Khởi tạo các đối tượng aws serivces đã khai báo trước đó
│   ├── infra-stack.ts // Khởi tạo các đối tượng aws services đã khai báo trước đó
├── src
│   ├── common
│   │   ├── *.ts // Shared code, khai báo mấy hàm hay dùng hoặc dùng chung
│   ├── lambdas
│   │   ├── **/handler.ts // Khai báo code xử lý handle cho các hàm lambda
│   ├── services
│   │   ├── **/*.ts // Phân nhỏ code xử lý logic để support cho các hàm handle ở lambda và có thể tái sử dụng
```

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
