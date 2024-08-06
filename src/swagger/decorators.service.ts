import {
  applyDecorators,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Put,
  Type,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ClassConstructor } from 'class-transformer';
import { UseCookieGuard } from 'src/api/auth/cookies/middleware/m.cookie.cookie';
import { Public } from 'src/api/auth/guard/auth.public';

interface SwaggerOptions<BodyParams extends object> {
  method: 'POST' | 'GET' | 'PUT' | 'PATCH';
  tags?: string;
  public?: boolean;
  cookieGuard?: boolean;
  httpCode?: HttpStatus;
  consumes?: string;
  operationSummary?: string;
  route?: string;
  query?: { name: string; type: Type<any>; description?: string }[];
  params?: { name: string; type: Type<any>; description?: string }[];
  body?: ClassConstructor<BodyParams>;
}

export function SwaggerMethod<T extends object>(options: SwaggerOptions<T>) {
  const {
    method,
    tags,
    public: isPublic,
    cookieGuard,
    httpCode,
    consumes,
    operationSummary,
    route,
    query,
    params,
    body,
  } = options;

  const decorators = [];

  if (isPublic) {
    decorators.push(Public());
  }

  if (cookieGuard) {
    decorators.push(UseCookieGuard());
  }

  if (tags) {
    decorators.push(ApiTags(tags));
  }

  if (httpCode) {
    decorators.push(HttpCode(httpCode));
  }

  if (consumes) {
    decorators.push(ApiConsumes(consumes));
  }

  if (operationSummary) {
    decorators.push(ApiOperation({ summary: operationSummary }));
  }

  if (body) {
    decorators.push(ApiBody({ type: body }));
  }

  if (query) {
    query.forEach((q) => {
      decorators.push(
        ApiQuery({ name: q.name, type: q.type, description: q.description }),
      );
    });
  }

  if (params) {
    params.forEach((p) => {
      decorators.push(
        ApiParam({ name: p.name, type: p.type, description: p.description }),
      );
    });
  }

  switch (method) {
    case 'POST':
      decorators.push(Post(route || '/'));
      break;
    case 'GET':
      decorators.push(Get(route || '/'));
      break;
    case 'PUT':
      decorators.push(Put(route || '/'));
      break;
    case 'PATCH':
      decorators.push(Patch(route || '/'));
      break;
  }

  return applyDecorators(...decorators);
}
