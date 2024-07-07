import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    OneToMany,
    CreateDateColumn, ManyToOne, JoinColumn
} from 'typeorm';
import { E_Role, E_Sex } from './types';
import { Reminders } from '@entities/reminders/reminders.entity';
import { City } from '@entities/staticData/cities/cities.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'email', type: 'varchar', unique: true })
    email: string;

    @Column({ name: 'phone', type: 'varchar' })
    phone: string;

    @Column({ name: 'phoneUponReg', type: 'varchar' })
    phoneUponReg: string;

    @Column({ name: 'password', type: 'varchar' })
    password: string;

    @Column({ name: 'first_name', type: 'varchar' })
    firstName: string;

    @Column({ name: 'last_name', type: 'varchar' })
    lastName: string;

    @Column({ name: 'middle_name', type: 'varchar', nullable: true })
    middleName: string;

    @Column({ name: 'birth_date', type: 'timestamp', nullable: true })
    birthDate: Date;

    @CreateDateColumn({ name: 'date_create', type: 'timestamp' })
    dateCreate: Date;

    @Column({ name: 'sex', type: 'enum', enum: E_Sex, nullable: true })
    sex: E_Sex | null;

    @Column({ name: 'role', type: 'enum', enum: E_Role, default: E_Role.User })
    role: E_Role;

    @Column({ name: 'is_accepted_cookies', type: 'boolean', default: false })
    isAcceptedCookies: boolean;

    @Column({ name: 'is_accept_license', type: 'boolean', default: false })
    isAcceptLicense: boolean;

    @Column({ name: 'refresh_hash', type: 'varchar', nullable: true })
    refreshHash: string;

    @OneToMany(() => Reminders, (reminder) => reminder.user)
    reminder: Reminders[];

    // @ManyToOne(() => City)
    // @JoinColumn() // this decorator is optional for @ManyToOne, but required for @OneToOne
    // city: City;
}
