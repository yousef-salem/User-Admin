import { UserDto } from "../DTO/user-dto";
import { IUser } from "../Model/iuser";

export class UserMapper {
    static mapUserToUserDto(user: IUser): UserDto {
        const id  = user.id ;
        const name = `${user.firstName} ${user.maidenName[0]}.${user.lastName}`;
        const age = user.age;
        const city = user.address.city;

        const userDto: UserDto = {
            id,
            name,
            age,
            city,
        };

        return userDto;
    }
}
