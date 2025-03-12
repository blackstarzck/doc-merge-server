import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateClientDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsString()
  @IsNotEmpty()
  client_name: string;
}
