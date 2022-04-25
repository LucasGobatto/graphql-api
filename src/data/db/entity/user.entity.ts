import { Entity, Column } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity("user")
export class UserEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phone?: string;
}
