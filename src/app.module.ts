import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { Block, BlockSchema } from './schema/block.schema';
import { Listing, ListingSchema } from './schema/listing.schema';
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://username:password@host:port/database?options...',
    ),
    MongooseModule.forFeature([
      { name: Block.name, schema: BlockSchema },
      { name: Listing.name, schema: ListingSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
