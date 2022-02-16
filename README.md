# Welcome to your CDK TypeScript project!

This is a blank project for TypeScript development with CDK.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Version
- Node version: v14.19.0
- npm version: 8.5.0
- cdk version: 2.12.0

## Source Structure

```
├── bin
│   ├── app.js // Khởi tạo các Stacks và cross stack attributes
├── environments
│   ├── env.js // Khởi tạo các biến môi trường
├── layers
│   ├── package.json // cài đặt thư viện dùng làm layer cho lambda function
├── lib
│   ├── apigateway
│   │   ├── infra.ts // Khởi tạo các đối tượng aws services
│   │   ├── props.ts // Khai báo props
│   │   ├── **/*.ts // Khai báo các aws services
│   ├── database
│   │   ├── infra.ts // Khởi tạo các đối tượng aws services
│   │   ├── props.ts // Khai báo props
│   │   ├── **/*.ts // Khai báo các aws services
│   ├── lambda
│   │   ├── infra.ts // Khởi tạo các đối tượng aws services
│   │   ├── props.ts // Khai báo props
│   │   ├── **/*.ts // Khai báo các aws services
│   ├── monitor
│   │   ├── infra.ts // Khởi tạo các đối tượng aws services
│   │   ├── props.ts // Khai báo props
│   │   ├── **/*.ts // Khai báo các aws services
│   ├── ...
├── src
│   ├── common
│   │   ├── *.ts // Shared code, khai báo mấy hàm hay dùng, tái sử dụng
│   ├── lambda
│   │   ├── **/*.ts // Khai báo code xử lý handle cho các hàm lambda
│   ├── services
│   │   ├── *.ts // Phân nhỏ code xử lý logic để support cho các hàm handle ở lambda
```

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
