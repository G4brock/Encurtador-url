import { Controller, Get, Param, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':url')
  async get(
    @Param() params,
    @Res() res) {
    res.writeHead(301, {
      Location: `https://${await this.appService.find(params.url)}`
    }).end();
  }

  @Get()
  findAll(){
    return this.appService.findAll()
  }

  @Post('encurtar/:url')
  go(
    @Param() params
  ) {
    return this.appService.go(params.url);
  }
}
