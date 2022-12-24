import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UrlDoc = UrlClass & Document;

@Schema()
export class UrlClass{
    @Prop({required: true})
    urlBase: string

    @Prop({required: true})
    newUrl: string
}

export const urlSchema = SchemaFactory.createForClass(UrlClass)