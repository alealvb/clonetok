import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class EncoderService {
  /**
   * This function takes a password and a userPassword, and returns a promise
   * that resolves to a boolean.
   * @param {string} password - The password that the user is trying to log in with.
   * @param {string} userPassword - The password that was stored in the database.
   * @returns A promise that resolves to a boolean.
   * */
  checkPassword(password: string, userPassword: string): Promise<boolean> {
    return compare(password, userPassword);
  }

  /**
   * This function takes a password as a string, generates a salt, and then hashes
   * the password with the salt.
   * @param {string} password - The password to be hashed.
   * @returns The password is being hashed and salted.
   * */
  async encodePassword(password: string): Promise<string> {
    const salt = await genSalt();
    return hash(password, salt);
  }
}
