import {modelBase} from './_modelBase';

export class OevCategory extends modelBase {
  public path = '/category';
  public table = 'oevCategory';
  public fields = ['CATEGORYNAME'];
  public numbered_fields = ['COURSEID'];
}
