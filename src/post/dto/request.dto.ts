import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  imageUrls: string[];
}


export class UpdatePostDto extends PartialType(CreatePostDto) {}
