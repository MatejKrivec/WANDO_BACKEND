import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  create(@Body() data: any) {
    return this.profileService.createProfile(data);
  }

  @Get()
  findAll() {
    return this.profileService.getAllProfiles();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.profileService.getProfileById(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: any) {
    return this.profileService.updateProfile(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.profileService.deleteProfile(id);
  }
}
