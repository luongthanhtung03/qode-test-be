import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto, PostResponseDto } from './dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto) : Promise<PostResponseDto> {
    return this.prisma.post.create({
      data: {
        images: {
          create: createPostDto.imageUrls.map((url) => ({ url })),
        },
      },
      include: {
        images: true,
        comments: true,
      },
    });
  }

  async findAll() : Promise<PostResponseDto[]> {
    return this.prisma.post.findMany({
      include: {
        images: true,
        comments: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string): Promise<PostResponseDto | null> {
    return this.prisma.post.findUnique({
      where: { id },
      include: {
        images: true,
        comments: true,
      },
    });
  }
}