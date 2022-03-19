import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("books")
class Books {
  @PrimaryGeneratedColumn("uuid")
  sbn: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  author: string;
  @Column("int")
  stock: number;
}

export default Books;
