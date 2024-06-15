// import { DynamicModule, Module } from '@nestjs/common';
// import { JwtRefreshService } from './JwtRefreshService';
// 
// @Module({})
// export class JwtRefreshModule {
//   static register(options): DynamicModule {
//     return {
//       module: JwtRefreshModule,
//       providers: [
//         {
//           provide: 'REFRESH_SECRET',
//           useValue: options,
//         },
//         JwtRefreshService,
//       ],
//       exports: [JwtRefreshService],
//     };
//   }
// }
