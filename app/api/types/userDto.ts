import { DogDto } from "./dogDto";

/**
 * 
 * @export
 * @interface UserDto
 */
export interface UserDto {
    /**
     * 
     * @type {number}
     * @memberof UserDto
     */
    'id'?: number;
    /**
     * 
     * @type {string}
     * @memberof UserDto
     */
    'name'?: string;
    /**
     * 
     * @type {number}
     * @memberof UserDto
     */
    'age'?: number;
    /**
     * 
     * @type {string}
     * @memberof UserDto
     */
    'bio'?: string;
    /**
     * 
     * @type {DogDto}
     * @memberof UserDto
     */
    'dog'?: DogDto;
    /**
     * 
     * @type {string}
     * @memberof UserDto
     */
    'role'?: string;
}