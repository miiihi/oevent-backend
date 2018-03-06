import {modelBase} from './_modelBase';

export class OevCompetitor extends modelBase {
  public path = '/competitor';
  public table = 'oevCompetitor';
  public fields = ['FIRSTNAME', 'LASTNAME', 'CLUBID', 'CATEGORYID', 'YEAROFBIRTH', 'STARTNUMBER', 'ISVACANT', 'CHIPRENTED', 'ENTRYDATE'];
  public numbered_fields = ['CHIPNUMBER', 'STARTTIME', 'FINISHTIME', 'FINISHTYPE', 'PUNCHID', 'STARTTIMETYPE', 'NOTCLASSIFIED',
    'STARTTIMEBLOCK', 'COURSEID', 'COMPETITIONTIME', 'ISRUNNING', 'RESULTISREMOTE'];

  public getWhereFinished(numbered_field_num: number | number[]) {
    let ret = 'IsVacant=0';

    if (typeof numbered_field_num === 'object' && numbered_field_num.constructor === Array) {
      numbered_field_num.forEach(n => ret +=  ` AND FinishType${n}<> 0 AND NotClassified${n}=0`);
    } else if (numbered_field_num !== null) {
      ret +=  ` AND FinishType${numbered_field_num}<> 0 AND NotClassified${numbered_field_num}=0`;
    }

    return ret;
  }

  public getWhereStart(numbered_field_num: number | number[]) {
    let ret = 'IsVacant=0';

    if (typeof numbered_field_num === 'object' && numbered_field_num.constructor === Array) {
      numbered_field_num.forEach(n => ret +=  ` AND StartTimeType${n}<> 0`);
    } else if (numbered_field_num !== null) {
      ret +=  ` AND StartTimeType${numbered_field_num}<> 0 `;
    }

    return ret;
  }

  public getWhereStartCat(numbered_field_num: number | number[]) {
    return  `${this.getWhereStart(numbered_field_num)} AND CategoryID=?`;
  }

  public getWhereFinishedCat(numbered_field_num: number | number[]) {
    return  `${this.getWhereFinished(numbered_field_num)} AND CategoryID=?`;
  }

  public getSortFinished(numbered_field_num: number | number[]) {
    const f = [], c = [];

    if (typeof numbered_field_num === 'object' && numbered_field_num.constructor === Array) {
      numbered_field_num.forEach(n => {
        f.push(`FinishType${n} = 1`);
        c.push(`CompetitionTime${n}`);
      });
    } else if (numbered_field_num !== null) {
        f.push(`FinishType${numbered_field_num} = 1`);
        c.push(`CompetitionTime${numbered_field_num}`);
    }

    return `CategoryID, CASE WHEN (${f.join(' AND ')}) THEN 0 ELSE 1 END asc, ${c.join('+')}`;
  }

  public getSortStart(numbered_field_num: number | number[]) {
    const f = [], c = [];

    if (typeof numbered_field_num === 'object' && numbered_field_num.constructor === Array) {
      numbered_field_num.forEach(n => {
        f.push(`StartTimeType${n} = 1`);
        c.push(`StartTime${n}`);
      });
    } else if (numbered_field_num !== null) {
        f.push(`StartTimeType${numbered_field_num} = 1`);
        c.push(`StartTime${numbered_field_num}`);
    }

    return `CategoryID, CASE WHEN (${f.join(' AND ')}) THEN 0 ELSE 1 END asc, ${c.join('+')}`;
  }
}
