import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Region } from '@entities/staticData/regions/regions.entity';

@Entity('cities')
export class City {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ name: 'city_name', type: 'varchar'})
	cityName: string

	@ManyToOne(() => Region, (region) => region.cities )
	region: Region
}
