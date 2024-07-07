import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { City } from '@entities/staticData/cities/cities.entity';

@Entity('regions')
export class Region {
	@PrimaryGeneratedColumn()
	id: number

	@Column({name: 'region_name', type: 'varchar'})
	regionName: string

	@OneToMany(() => City, (city) => city.region)
	cities: City[]
}
