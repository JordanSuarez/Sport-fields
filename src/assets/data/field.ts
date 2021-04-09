import { FieldDistanceModel, FieldTypeModel } from 'src/app/models/field.model';
import { CityModel } from 'src/app/models/field.model';

export const fieldTypes: Array<FieldTypeModel> = [
  {name: 'Terrain de football'},
  {name: 'Terrain de basket-ball'},
  {name: 'Terrain de handball'},
  {name: 'Piste d\'athlétisme isolée'},
  {name: 'Court de tennis'},
  {name: 'Skate park'},
  {name: 'Structure Artificielle d\'Escalade'},
  {name: 'Plateau EPS/Multisports/city-stades'},
  {name: 'Salle multisports'},
  {name: 'Salle de musculation/cardiotraining'},
  {name: 'Dojo / Salle d\'arts martiaux'},
];

export const fieldsDistance: Array<FieldDistanceModel> = [
  {distance: 500, label: '500m'},
  {distance: 1000, label: '1km'},
  {distance: 5000, label: '5km'},
  {distance: 10000, label: '10km'},
  {distance: 20000, label: '20km'},
  {distance: 50000, label: '50km'},
];

export const cities: Array<CityModel> = [
  {name: 'Paris'},
  {name: 'Toulouse'},
  {name: 'Marseille'},
  {name: 'Reims'},
  {name: 'Strasbourg'},
  {name: 'Lyon'},
  {name: 'Dijon'},
  {name: 'Chalon-sur-Saône'},
  {name: 'Beaune'},
  {name: 'Bordeaux'},
];
