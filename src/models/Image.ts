import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Foyer from './Foyer';

@Entity('images')
export default class Image {
    
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
	path: string;
	
	@ManyToOne(() => Foyer, foyer => foyer.images)
	@JoinColumn({ name: 'foyer_id' })
	foyer: Foyer;
}