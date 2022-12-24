import { Injectable, Redirect } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UrlDoc } from './schemas/urls.schema';
import { Model } from 'mongoose';
import { UrlDto } from './app.interfaces';

@Injectable()
export class AppService {
  constructor(@InjectModel("urls") private urlModel: Model<UrlDoc>) {}

  async go(url: string) {
    let newUrl = this.generateNewUrl()
    while(!(this.urlValid(newUrl))){
      newUrl = this.generateNewUrl()
    }
    await this.add(url, newUrl);

    return `http://localhost:3000/${newUrl}`;
  }

  async find(url: string) {
    let urlCatch = await this.urlModel.findOne({"newUrl": url})
    return urlCatch.urlBase
  }

  async add(url: string, newUrl:string) {
    let obs: UrlDto = {
      urlBase: url,
      newUrl,
    }

    console.log(obs)
    const create = new this.urlModel(obs)
    return create.save()
  }

  async urlValid(url:string) {
    let urlList = await this.urlModel.find({"newUrl": url})

    if(urlList.length == 0)
      return true;

    return false;
  }

  generateNewUrl(){
    let tam = Math.floor(Math.random() * (10-5)) + 5;
    let newUrl = ""
    
    for(let i = 0; i < tam; i++){
      let caractere = Math.floor(Math.random() * (122 - 65)) + 65;
      if(caractere >= 91 && caractere <= 96) {
        tam += 1;
      } else {
        newUrl += String.fromCharCode(caractere);
      }
    }

    return newUrl;
  }

  async findAll(){
    let urls = await this.urlModel.find();
    return urls;
  }

}
