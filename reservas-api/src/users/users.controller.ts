import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { FindByParams, UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Permissions } from 'src/auth/decorators/permissions.decorator';

interface FindByQueryStrings extends Omit<FindByParams, 'includeDeleted'> {
  includeDeleted?: string;
}

interface FindByQueryStrings extends Omit<FindByParams, 'includeDeleted'> {
  includeDeleted?: string;
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Permissions('users.view')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('find')
  @Permissions('users.findId')
  findBy(@Query() query: FindByQueryStrings) {
    const isDeletedUsers = (query.deletedUsers?.toString() ?? '') === 'true';

    const filters: FindByParams = {
      ...query,
      deletedUsers: isDeletedUsers,
    };

    return this.usersService.findBy(filters);
  }

  @Get(':id')
  @Permissions('users.view')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  @Permissions('users.create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  @Permissions('users.edit')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Permissions('users.delete')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }

  @Patch(':id/restore')
  @Permissions('users.restore')
  restore(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.restore(id);
  }
}
