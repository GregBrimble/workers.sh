import {
  Entity,
  IndexableColumn,
  Column,
  getRepository,
  PrimaryColumn,
} from "@kv-orm/core";
import { CloudflareDatastore } from "../datastores/CloudflareDatastore";
import { ContextualEntity } from "./ContextualEntity";
import { Context } from "../graphql/context";

export type CFUser = {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  username: string;
  telephone?: string;
  country?: string;
  zipcode?: string;
  created_on: string;
  modified_on: string;
  // two_factor_authentication_enabled
  // suspended
};

@Entity({ datastore: CloudflareDatastore, key: "User" })
class User extends ContextualEntity {
  @PrimaryColumn({ key: "id" })
  public id: string;

  @IndexableColumn({ key: "email" })
  public email: string;

  @Column({ key: "firstName" })
  public firstName: string;

  @Column({ key: "lastName" })
  public lastName: string;

  @Column({ key: "username" })
  public username: string;

  @Column({ key: "telephone" })
  public telephone: string;

  @Column({ key: "country" })
  public country: string;

  public zipcode: string;
  public createdOn?: Date;
  public modifiedOn?: Date;

  constructor(
    {
      id,
      email,
      first_name,
      last_name,
      username,
      telephone,
      country,
      zipcode,
      created_on,
      modified_on,
    }: CFUser,
    context: Context
  ) {
    super(context);
    this.id = id;
    this.email = email;
    this.firstName = first_name;
    this.lastName = last_name;
    this.username = username;
    this.telephone = telephone;
    this.country = country;
    this.zipcode = zipcode;
    this.createdOn = new Date(created_on);
    this.modifiedOn = new Date(modified_on);
  }
}

export { User };
export const UserRepository = getRepository(User);
