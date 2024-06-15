// import { Injectable } from '@nestjs/common';
// 
// @Injectable()
// export class JwtRefreshService {
// 
//   constructor(@Inject('CONFIG_OPTIONS') private options: Record<string, any>) {
//     const options = { folder: './config' };
// 
//     const filePath = `${process.env.NODE_ENV || 'development'}.env`;
//     const envFile = path.resolve(__dirname, '../../', options.folder, filePath);
//     this.envConfig = dotenv.parse(fs.readFileSync(envFile));
//   }
// 
// 
// }