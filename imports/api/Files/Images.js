import { Mongo } from 'meteor/mongo';
import Files from './Files';

const Images = new Mongo.Collection('Images');

Images.attachSchema(Files.schema);

export default Images;