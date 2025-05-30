import { User } from '@entities/user/user.entity';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    UpdateDateColumn, JoinColumn,
    // OneToOne
    // RelationId,
} from 'typeorm';
import {
    E_Priority_Reminders,
    E_Status_Reminders,
    E_Types_Actions,
} from '@entities/enums/enums';
import { City } from '@entities/staticData/cities/cities.entity';

@Entity('reminders')
export class Reminders {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'title', type: 'varchar', length: 100 })
    title: string;

    @Column({ name: 'body', type: 'varchar', length: 9999 })
    body: string;

    @Column({ name: 'author', type: 'int' })
    author: number;

    @ManyToOne((type) => User, (user) => user.reminder, {
        cascade: ['insert'],
    })
    user: User;

    @Column({ nullable: true })
    userId: number;
    // @OneToOne((type) => User, (user) => user.reminders)
    // user: User;
    // @RelationId((reminders: Reminders) => reminders.user) // it still requires the presence of the `category` proeprty
    // userId: number;

    //   @Column({ name: "car_id", type: "varchar" })
    //   carId: string;
    @Column({
        name: 'status',
        type: 'enum',
        enum: E_Status_Reminders,
        default: E_Status_Reminders.wait,
    })
    status: E_Status_Reminders;

    @Column({
        name: 'priority_type',
        type: 'enum',
        enum: E_Priority_Reminders,
        default: E_Priority_Reminders.low,
    })
    priorityType: E_Priority_Reminders;

    @Column({
        name: 'type_action',
        type: 'enum',
        enum: E_Types_Actions,
        nullable: true,
    })
    typeAction: E_Types_Actions | null;

    @CreateDateColumn({ name: 'date_create', type: 'timestamp' })
    dateCreate: Date;

    @UpdateDateColumn({ name: 'date_update', type: 'timestamp' })
    dateUpdate: Date;

    @Column({ name: 'date_action', type: 'timestamp', nullable: true })
    dateAction: Date | string;

    @Column({ name: 'drop', type: 'boolean', default: false })
    drop: boolean;
}
