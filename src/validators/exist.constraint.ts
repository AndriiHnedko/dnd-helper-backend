import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { PrismaService } from 'nestjs-prisma';

@ValidatorConstraint({ name: 'Exist', async: true })
@Injectable()
export class ExistConstraint implements ValidatorConstraintInterface {
  constructor(private readonly prisma: PrismaService) {}

  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    const [model, property = 'id'] = args.constraints;

    if (!value || !model) return false;

    if (Array.isArray(value)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const rows = await this.prisma[model].findMany({
        where: {
          [property]: {
            in: value,
          },
        },
        select: {
          [property]: true,
        },
      });

      const existingValues = rows.map((row) => row[property]);
      return value.every((v) => existingValues.includes(v));
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const record = await this.prisma[model].findFirst({
      where: {
        [property]: value,
      },
    });

    return record !== null;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} should exist in ${args.constraints[1]}`;
  }
}

export function Exist(
  model: string,
  uniqueField?: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [model, uniqueField],
      validator: ExistConstraint,
    });
  };
}
