import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tags')
export class Tags {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'text', type: 'varchar', length: 14 })
    text: string;

    @Column({ name: 'color', type: 'varchar', length: 7, nullable: true })
    color: string;

    @Column({ name: 'author_id', type: 'varchar' })
    authorId: string;
}
