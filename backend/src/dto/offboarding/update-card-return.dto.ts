import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCardReturnDto {
    @ApiProperty({ description: 'Whether access card is returned', example: true })
    @IsBoolean()
    cardReturned: boolean;
}
