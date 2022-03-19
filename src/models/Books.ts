import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("books")
class Books {
  @PrimaryColumn()
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
