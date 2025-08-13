import { CreateDogRequest } from "./createDogRequest";
/**
 * 
 * @export
 * @interface CreateUserRequest
 */

export interface CreateUserRequest {
    /**
     * 
     * @type {string}
     * @memberof CreateUserRequest
     */
    'name': string;
    /**
     * 
     * @type {string}
     * @memberof CreateUserRequest
     */
    'password': string;
    /**
     * 
     * @type {number}
     * @memberof CreateUserRequest
     */
    'age'?: number;
    /**
     * 
     * @type {string}
     * @memberof CreateUserRequest
     */
    'bio'?: string;
    /**
     * 
     * @type {CreateDogRequest}
     * @memberof CreateUserRequest
     */
    'dog': CreateDogRequest;
}