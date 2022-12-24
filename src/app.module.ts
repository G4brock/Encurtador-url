import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { urlSchema } from './schemas/urls.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/encurtadorUrl'),
    MongooseModule.forFeature([{name: 'urls', schema: urlSchema}])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
