import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CommentResponseDto, CreateCommentDto } from './dto';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async create(createCommentDto: CreateCommentDto) : Promise<CommentResponseDto> {
    // Check if post exists
    const post = await this.prisma.post.findUnique({
      where: { id: createCommentDto.post_id },
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${createCommentDto.post_id} not found`);
    }

    return this.prisma.comment.create({
      data: {
        content: createCommentDto.content,
        post_id: createCommentDto.post_id,
      },
    });
  }

  async findByPostId(postId: string) : Promise<CommentResponseDto[]> {
    return this.prisma.comment.findMany({
      where: { post_id: postId },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
