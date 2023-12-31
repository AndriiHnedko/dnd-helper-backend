import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { PrismaModule } from 'nestjs-prisma';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UniqueConstraint, ExistConstraint } from './validators';
import { CharactersModule } from './characters/characters.module';
import { CharacterClassModule } from './character-class/character-class.module';
import { CharacterSubClassModule } from './character-sub-class/character-sub-class.module';
import { SpellModule } from './spell/spell.module';
import { TranslatesModule } from './translates/translates.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        APP_SECRET: Joi.string(),
        DATABASE_URL: Joi.string(),
        PORT: Joi.number().default(3000),
      }),
    }),
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    CharactersModule,
    CharacterClassModule,
    CharacterSubClassModule,
    SpellModule,
    TranslatesModule,
  ],
  providers: [ExistConstraint, UniqueConstraint],
})
export class AppModule {}
