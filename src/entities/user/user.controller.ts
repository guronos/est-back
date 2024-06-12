import {
  Controller,
  Get,
  Req,
  Res,
  Post,
  Body,
  Put,
  // Patch,
  Param,
  // Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { UserService } from './user.service';
import { UpdateUserDTO } from './dto/updateUser.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async getAllUsers(@Req() req: any, @Res() res: Response) {
    console.log(req.user);
    const users = await this.userService.getAllUsers();
    return res.send({
      status: 'ok',
      data: users,
    });
  }

  @Get('/:id')
  async getUser(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const userData = await this.userService.getUserData(id);

    delete userData.password;

    return res.send({
      status: 'ok',
      data: userData,
    });
  }

  @Post('/')
  // @UseInterceptors(FileInterceptor(''))
  async createUser(@Req() req: Request, @Res() res: Response) {
    const dbStatus = await this.userService.createUser(req.body);
    console.log(dbStatus);
    return res.send({ body: 'rrr' });
  }

  @Put('/:id')
  async updateUser(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: UpdateUserDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.userService.updateUser(id, body);
    return res.send({
      status: 200,
    });
  }

  // @Patch('/:id')
  // async updateUserField(@Req() req: Request, @Res() res: Response) {}
}
