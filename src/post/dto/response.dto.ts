export class ImageResponseDto {
  id: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

export class CommentInPostResponseDto {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export class PostResponseDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  images: ImageResponseDto[];
  comments: CommentInPostResponseDto[];
}

