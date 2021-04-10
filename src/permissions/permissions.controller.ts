import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionFilterDto } from './dto/permission-filter.dto';
import { Permission } from './serializer/permission.serializer';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PermissionGuard } from '../common/guard/permission.guard';

@ApiTags('permissions')
@UseGuards(AuthGuard(), PermissionGuard)
@Controller('permissions')
@ApiBearerAuth()
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  store(@Body() createPermissionDto: CreatePermissionDto): Promise<Permission> {
    return this.permissionsService.store(createPermissionDto);
  }

  @Get()
  @ApiQuery({ type: PermissionFilterDto })
  index(
    @Query() permissionFilterDto: PermissionFilterDto
  ): Promise<Permission[]> {
    return this.permissionsService.findAll(permissionFilterDto);
  }

  @Get(':id')
  show(@Param('id') id: string): Promise<Permission> {
    return this.permissionsService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto
  ): Promise<Permission> {
    return this.permissionsService.update(+id, updatePermissionDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  destroy(@Param('id') id: string): Promise<void> {
    return this.permissionsService.remove(+id);
  }
}
