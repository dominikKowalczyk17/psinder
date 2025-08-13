/**
 * 
 * @export
 * @interface CreateDogRequest
 */

export interface CreateDogRequest {
    /**
     * 
     * @type {string}
     * @memberof CreateDogRequest
     */
    'name': string;
    /**
     * 
     * @type {number}
     * @memberof CreateDogRequest
     */
    'age'?: number;
    /**
     * 
     * @type {string}
     * @memberof CreateDogRequest
     */
    'size': string;
    /**
     * 
     * @type {string}
     * @memberof CreateDogRequest
     */
    'energy': string;
    /**
     * 
     * @type {string}
     * @memberof CreateDogRequest
     */
    'breed'?: string;
    /**
     * 
     * @type {string}
     * @memberof CreateDogRequest
     */
    'bio'?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof CreateDogRequest
     */
    'photos'?: string[];
}