

export abstract class modelBase {
  abstract path: string;

  abstract table: string;

  abstract fields: string[];

  abstract numbered_fields: string[];

  protected id_field = 'ID'
  protected numbered_field_min = 1;
  protected numbered_field_max = 10;

  public getAllSQL(numbered_field_num: number | number[] = null): string {
    return `SELECT ${this._getFields(numbered_field_num).join(', ')} FROM ${this.table}`;
  }

  public getOneSQL(numbered_field_num = null) {
    return `SELECT ${this._getFields(numbered_field_num).join(', ')} FROM ${this.table} WHERE ${this.id_field}=?`;
  }

  private _getFields(numbered_field_num: number|number[] = null) {
    let flds = [this.id_field].concat(this.fields);

    if (numbered_field_num === null) {
      return flds;
    }

    if (typeof numbered_field_num === 'object' && numbered_field_num.constructor === Array) {
      numbered_field_num.forEach(n => flds = flds.concat(this._getNumberedFields(n)));
    } else {
      flds = flds.concat(this._getNumberedFields(<number>numbered_field_num));
    }
    return flds;
  }

  private _getNumberedFields(numbered_field_num: number = null): string[] {
    const ret: string[] = [];

    const min = numbered_field_num == null ? this.numbered_field_min : numbered_field_num;
    const max = numbered_field_num == null ? this.numbered_field_max : numbered_field_num;

    const numbers = [];
    for (let i = min; i <= max; i++) {
      numbers.push(i);
    }

    this.numbered_fields.forEach( f => ret.push(...numbers.map(n => `${f}${n}`)));
    return ret;
  }
}
